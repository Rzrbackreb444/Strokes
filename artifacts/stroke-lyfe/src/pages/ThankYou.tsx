import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-[70vh] flex items-center" data-testid="section-thank-you">
      <div className="container mx-auto px-4 max-w-2xl py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Heart className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Thank you.
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          Your generosity is why this works. A real survivor on a real waitlist is going to be helped because of what you just did. We'll send you a receipt and — with your permission — let you know when they activate.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
          Stroke Lyfe Inc. is a 501(c)(3) nonprofit. EIN: 99-1313589. Your donation is tax-deductible to the fullest extent of the law.
        </p>

        <div className="bg-muted rounded-lg p-6 mb-8 text-left">
          <h2 className="font-serif text-lg font-bold text-foreground mb-2">Looking for day-to-day recovery tools?</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Stroke Recovery Academy is our partner platform — daily routines, AI coaching, exercise library, and a community of people who understand.
          </p>
          <a
            href="https://strokerecoveryacademy.com?utm_source=strokelyfe&utm_medium=site&utm_campaign=thankyou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-medium hover:underline"
            data-testid="link-academy-thankyou"
          >
            Visit Stroke Recovery Academy →
          </a>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild data-testid="button-thankyou-home">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" data-testid="button-thankyou-stories">
            <Link href="/stories">Read survivor stories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
