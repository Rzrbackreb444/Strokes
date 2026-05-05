import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center" data-testid="section-404">
      <div className="container mx-auto px-4 max-w-lg py-20 text-center">
        <p className="font-serif text-8xl font-bold text-primary/20 mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          This page doesn't exist or may have been moved. Recovery takes wrong turns sometimes — so does navigation.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild data-testid="button-404-home">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" data-testid="button-404-stories">
            <Link href="/stories">Read stories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
