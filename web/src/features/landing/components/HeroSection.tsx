import { Container } from "@/components/layouts";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export const HeroSection = () => {
  return (
    <Container
      as="section"
      className="relative flex items-center overflow-hidden pt-48 pb-16 md:pt-48 md:pb-24"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-4xl -translate-x-1/2">
        <div className="bg-primary/10 absolute top-[-10%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-[100%] blur-[120px]" />
      </div>

      <Container className="flex h-full flex-col items-center space-y-8 text-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="from-foreground to-foreground/70 bg-linear-to-b bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-7xl lg:text-8xl">
            Better prompts,
            <br />
            better results.
          </h1>
          <p className="text-muted-foreground mx-auto text-base md:text-lg">
            Turn rough ideas into precision-crafted prompts. Get richer, more
            accurate AI outputs without becoming a prompt engineering expert.
          </p>
        </div>

        <Link
          to={paths.app.index}
          className={cn(buttonVariants({ size: "xl" }), "text-base")}
        >
          Get Started
        </Link>

        {/* Optional: Social Proof or Feature Teaser */}
        {/* <div className='pt-16 w-full max-w-5xl'>
          <div className='aspect-video rounded-xl border bg-muted/30 backdrop-blur-sm overflow-hidden shadow-2xl relative group'>
            <div className='absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='flex items-center justify-center h-full text-muted-foreground italic'>
              [Interactive App Preview or Screenshot]
            </div>
          </div>
        </div> */}
      </Container>
    </Container>
  );
};
