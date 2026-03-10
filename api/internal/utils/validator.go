package utils

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

const (
	messageTag   = "errorMsg"
	validateTag = "validate" // Added to grab the validate rules
)

func errorTagFunc[T any](obj any, snp string, fieldname, actualTag string) error {
	o := obj.(T)

	if !strings.Contains(snp, fieldname) {
		return nil
	}

	fieldArr := strings.Split(snp, ".")
	rsf := reflect.TypeOf(o)

	for i := 1; i < len(fieldArr); i++ {
		field, found := rsf.FieldByName(fieldArr[i])
		if found {
			if fieldArr[i] == fieldname {
				validateTag := field.Tag.Get(validateTag)
				customMessageTag := field.Tag.Get(messageTag)

				if customMessageTag != "" {
					// Split tags into slices by comma
					validateRules := strings.Split(validateTag, ",")
					errorMsgs := strings.Split(customMessageTag, ",")

					targetIndex := -1
					// Find the index of the failed rule in the validate tag
					for idx, rule := range validateRules {
						// Strip arguments from rules (e.g., "min=5" becomes "min")
						ruleName := strings.Split(rule, "=")[0]
						if ruleName == actualTag {
							targetIndex = idx
							break
						}
					}

					// If the rule index is found and we have a corresponding error message at that index
					if targetIndex != -1 && targetIndex < len(errorMsgs) {
						msg := strings.TrimSpace(errorMsgs[targetIndex])
						if msg != "" {
							return fmt.Errorf("%s", msg)
						}
					}

					// Fallback: If the arrays don't match in length, return the first custom message + the actual tag
					fallbackMsg := strings.TrimSpace(errorMsgs[0])
					return fmt.Errorf("%s (%s)", fallbackMsg, actualTag)
				}
				return nil
			} else {
				if field.Type.Kind() == reflect.Ptr {
					// If the field type is a pointer, dereference it
					rsf = field.Type.Elem()
				} else {
					rsf = field.Type
				}
			}
		}
	}
	return nil
}

func ValidateFunc[T interface{}](obj interface{}, validate *validator.Validate) (errs error) {
	o := obj.(T)

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in Validate:", r)
			errs = fmt.Errorf("can't validate %+v", r)
		}
	}()

	if err := validate.Struct(o); err != nil {
		errorValid := err.(validator.ValidationErrors)
		for _, e := range errorValid {
			// snp  X.Y.Z
			snp := e.StructNamespace()
			errmgs := errorTagFunc[T](obj, snp, e.Field(), e.ActualTag())
			if errmgs != nil {
				errs = errors.Join(errs, fmt.Errorf("%w", errmgs))
			} else {
				errs = errors.Join(errs, fmt.Errorf("%w", e))
			}
		}
	}

	if errs != nil {
		return errs
	}

	return nil
}
