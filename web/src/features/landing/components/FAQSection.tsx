import { Container } from "@/components/layouts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQSectionData = {
  title: string;
  value: string;
  description: string;
};

const faqSectionData: FAQSectionData[] = [
  {
    title: "What AI models does BetterPrompt work with?",
    value: "what-ai-models",
    description:
      "Prompts are optimized for any major LLM, for example Claude, ChatGPT, Gemini, Llama, and etc. You specify your target model in the optimizer.",
  },
  {
    title: "Do I need prompt engineering knowledge?",
    value: "do-i-need-prompt-engineering-knowledge",
    description:
      "Not at all. BetterPrompt handles the technical craft. You describe what you want in plain language.",
  },
  {
    title: "Can I save and revisit past prompts?",
    value: "can-i-save-and-revisit-past-prompts",
    description:
      "Yes. Every optimized prompt is auto-saved as a draft. Revisit, compare, and re-optimize anytime.",
  },
  {
    title: "What if the AI output is still off?",
    value: "what-if-the-ai-output-is-still-off",
    description:
      "Use the Evaluation Loop. Score 1–5, describe the gap, and BetterPrompt will revise accordingly.",
  },
];

export const FAQSection = () => {
  return (
    <Container as="section" className="space-y-12 pb-24">
      {/* Section Header */}
      <div className="mx-auto space-y-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Section Content */}
      <div className="space-y-8">
        <Accordion>
          {faqSectionData.map((item, index) => (
            <AccordionItem key={index} value={item.value}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};
