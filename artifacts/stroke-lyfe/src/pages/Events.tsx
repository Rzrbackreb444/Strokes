import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function Events() {
  return (
    <div>
      <section className="py-20 bg-foreground text-background" data-testid="section-events-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Events</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Community events for survivors and families.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            Virtual and in-person gatherings — Q&As with Nick, peer roundtables, and caregiver workshops. We're just getting started.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-events-list">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="p-2">
            <CardContent className="p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Events coming soon.</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm leading-relaxed">
                We're planning our first virtual Q&A with Nick for stroke survivors and their families. Sign up for our newsletter to be the first to know.
              </p>
              <Button asChild data-testid="button-events-contact">
                <Link href="/contact">Get notified</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Virtual Q&A with Nick", "Caregiver Workshop", "Survivor Peer Roundtable"].map((name) => (
              <Card key={name} className="opacity-50">
                <CardContent className="p-6">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Coming soon</div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground">Details to be announced. Join our newsletter for updates.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
