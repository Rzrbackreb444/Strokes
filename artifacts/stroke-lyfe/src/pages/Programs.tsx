import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Heart, Library, CheckCircle2, Brain } from "lucide-react";
import SEO from "@/components/SEO";

const programs = [
  {
    icon: <Heart className="h-7 w-7 text-accent" />,
    title: "Survivor Scholarships",
    subtitle: "Remove the cost barrier",
    body: "We fund access to recovery programs, coaching, and tools for survivors who can't afford them. Scholarships cover Stroke Recovery Academy tiers ($97–$997) as well as other vetted programs and products. No application fees. No waitlist games. We work through the list in order and publish every allocation.",
    features: ["Recovery program access", "AI coaching tools", "Community membership", "Monthly check-ins", "Research-backed resources"],
    testId: "card-program-scholarships",
  },
  {
    icon: <Brain className="h-7 w-7 text-accent" />,
    title: "Mindset & Motivation",
    subtitle: "The inner work matters as much as the physical",
    body: "Stroke reshapes identity. The person who woke up in that hospital bed — their career, their role as a parent or partner, their sense of self — is changed. We address that directly: daily motivation tools, mindset frameworks drawn from Nick's own recovery, and honest programming about purpose and life after stroke. Because functional recovery without psychological recovery isn't enough.",
    features: ["Daily motivation content", "Identity & purpose programming", "Mindset coaching frameworks", "Young survivor resources", "Post-stroke fatigue guidance"],
    testId: "card-program-mindset",
  },
  {
    icon: <Users className="h-7 w-7 text-accent" />,
    title: "Survivor Connect",
    subtitle: "Real connection with real survivors",
    body: "Peer-to-peer matching for stroke survivors. We connect you with someone who had a similar stroke profile, similar age, similar life. Not a therapist. Not a volunteer. A person who woke up one day and had to figure out the same things you're figuring out.",
    features: ["Profile-matched pairing", "Weekly video calls", "Private messaging", "Group events quarterly", "No time limit on connection"],
    testId: "card-program-connect",
  },
  {
    icon: <Heart className="h-7 w-7 text-accent" />,
    title: "Family Support",
    subtitle: "Because caregivers need care too",
    body: "Stroke doesn't just happen to the person in the hospital bed. We provide guides, toolkits, and a private community for the partners, parents, and children navigating this alongside survivors. Your grief is real. Your questions deserve answers.",
    features: ["Caregiver resource library", "Private support community", "Role-specific guides", "Monthly webinars", "Crisis line referrals"],
    testId: "card-program-family",
  },
  {
    icon: <Library className="h-7 w-7 text-accent" />,
    title: "Resource Library",
    subtitle: "Organized. Vetted. Free.",
    body: "A curated library of recovery resources, research summaries, exercise guides, and therapy tools — all reviewed for accuracy and organized by recovery phase. No SEO garbage, no supplement ads, no wellness influencers. Just the stuff that works.",
    features: ["Evidence-based resources only", "Organized by recovery phase", "Updated quarterly", "Downloadable guides", "Free forever"],
    testId: "card-program-library",
  },
];

export default function Programs() {
  return (
    <div>
      <SEO
        title="Programs — Scholarships, Coaching & Research"
        description="Stroke Lyfe funds survivor scholarships into Stroke Recovery Academy, caregiver support programs, and neuroplasticity research. Every dollar goes to work."
        path="/programs"
      />
      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-programs-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">What We Do</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Five programs.<br />One mission.
          </h1>
          <p className="mt-6 text-background/70 max-w-xl text-lg leading-relaxed">
            Stroke doesn't just take physical function. It takes social life, identity, motivation, and purpose. Every program we run addresses a different dimension of that loss — because recovery that stops at "functional" isn't enough.
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 bg-background" data-testid="section-programs-list">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          {programs.map((program, idx) => (
            <Card key={program.title} className="overflow-hidden" data-testid={program.testId}>
              <CardContent className="p-0">
                <div className={`grid grid-cols-1 md:grid-cols-2 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      {program.icon}
                    </div>
                    <p className="text-primary font-semibold uppercase tracking-wide text-xs mb-1">{program.subtitle}</p>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">{program.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{program.body}</p>
                    <Button asChild variant="outline" className="self-start" data-testid={`button-program-${program.title.replace(/\s+/g, "-").toLowerCase()}`}>
                      <Link href="/donate">Support this program</Link>
                    </Button>
                  </div>
                  <div className="bg-muted p-8 md:p-10 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">What's included</h4>
                    <ul className="space-y-3">
                      {program.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted border-t border-border" data-testid="section-programs-cta">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Every dollar funds a real program.
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            87 cents of every dollar goes directly to programs. We publish our financials. We run a lean ship.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" data-testid="button-programs-donate">
              <Link href="/donate">Donate to our programs</Link>
            </Button>
            <Button asChild size="lg" variant="outline" data-testid="button-programs-transparency">
              <Link href="/transparency">See how we spend it</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
