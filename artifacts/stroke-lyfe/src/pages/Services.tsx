import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, MessageCircle } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Stroke Recovery Academy Scholarships",
    description:
      "We fund survivor access to Stroke Recovery Academy — a structured recovery platform built by Nick Kremers. Scholarships cover the Survivor ($97), Mentored ($297), and Elite ($997) tiers based on each survivor's needs.",
  },
  {
    icon: Users,
    title: "Family Support Program",
    description:
      "Recovery doesn't happen in isolation. Caregivers, partners, and children navigate their own grief and confusion. We provide guides, toolkits, and a private peer community for families supporting a survivor.",
  },
  {
    icon: Heart,
    title: "Survivor Peer Network",
    description:
      "Connecting survivors with others at similar stages of recovery. Early recovery, years-in, and 'too recovered to still struggle' — all stages deserve community. Moderated and trauma-informed.",
  },
  {
    icon: MessageCircle,
    title: "Navigator Support",
    description:
      "A real human who helps survivors and families understand what resources exist, how to apply for a scholarship, and how to take the next step. No automated systems. No forms for forms' sake.",
  },
];

export default function Services() {
  return (
    <div>
      <section className="py-20 bg-foreground text-background" data-testid="section-services-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">What We Offer</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Services for survivors and families.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            Every service we offer starts from the same place: what do survivors actually need that they're not getting?
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-services-list">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Card key={s.title} className="p-2">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <s.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center border border-primary/10">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Need help figuring out next steps?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
              We answer every message personally. Scholarship inquiries get same-day responses.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild data-testid="button-services-contact">
                <Link href="/contact">Reach out</Link>
              </Button>
              <Button asChild variant="outline" data-testid="button-services-donate">
                <Link href="/donate">Fund a scholarship</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
