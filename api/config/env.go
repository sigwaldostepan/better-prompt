package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type EnvConfig struct {
	AppEnv string // [production, development]
	AppPort int
	DBUrl string
}

func LoadEnv() EnvConfig {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load .env file")
	}

	return EnvConfig{
		AppEnv: getEnv("APP_ENV"),
		AppPort:    getEnvAsInt("APP_PORT"),
		DBUrl: getEnv("DB_URL"),
	}
}

func getEnv(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists { 
		log.Fatalf("Env key %s is not provided", key)
	}

	return value
}

func getEnvAsInt(key string) int {
	valueStr := getEnv(key)
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		log.Fatalf("Env key %s is invalid", key)
	}

	return  value
}