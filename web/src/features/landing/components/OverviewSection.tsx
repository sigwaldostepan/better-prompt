import { Container } from "@/components/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type OverviewSectionData = {
  title: string;
  description: string;
  content: string;
};

const overviewSectionData: OverviewSectionData[] = [
  {
    title: "Input your task",
    description:
      "Drop in your rough idea, as messy or brief as you like. Set your target model, tone, format, and any constraints.",
    content: "",
  },
  {
    title: "Get your optimized prompt",
    description:
      "Receive a precision-crafted prompt. Copy and paste it directly into any AI tool and watch the difference.",
    content: "",
  },
  {
    title: "Evaluate & refine",
    description:
      "Not satisfied? Score the output, describe the gap, and we'll refine the prompt until it hits exactly what you need.",
    content: "",
  },
];

const OverviewSectionCard = ({
  title,
  description,
  content,
  index,
}: OverviewSectionData & { index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <Card className="grid-cols-1 gap-0 overflow-hidden rounded-2xl p-0 md:grid md:grid-cols-12">
      <CardHeader
        className={cn(
          "col-span-12 flex flex-col justify-center gap-2 p-6 md:col-span-4 lg:col-span-3",
          isReversed && "md:order-last",
        )}
      >
        <CardTitle className="text-foreground text-lg leading-tight font-bold md:text-xl">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base leading-tight">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "col-span-12 p-0 md:col-span-8 lg:col-span-9",
          isReversed && "md:order-first",
        )}
      >
        <div className="bg-muted/10 relative aspect-video h-full w-full overflow-hidden">
          {content ? (
            <video
              src={content}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-8 text-center">
              <span className="text-muted-foreground font-medium italic">
                Simulation Preview Coming Soon
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const OverviewSection = () => {
  return (
    <Container as="section" className="space-y-12">
      {/* Section Header */}
      <div className="mx-auto space-y-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          From rough idea to perfect prompt, in minutes.
        </h2>
      </div>

      {/* Section Content */}
      <div className="mx-auto space-y-8">
        {overviewSectionData.map((item, index) => (
          <OverviewSectionCard key={index} index={index} {...item} />
        ))}
      </div>
    </Container>
  );
};
