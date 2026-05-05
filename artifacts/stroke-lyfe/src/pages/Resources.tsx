import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, Heart, Users } from "lucide-react";

const resourceGroups = [
  {
    icon: BookOpen,
    title: "Understanding Your Recovery",
    resources: [
      { name: "What is neuroplasticity?", description: "How your brain rewires itself — and why recovery years after a stroke is not only possible but expected." },
      { name: "The 'too recovered' problem", description: "Why insurance and rehab systems cut survivors off long before recovery is complete, and what to do instead." },
      { name: "Drop foot and mobility", description: "Nick's personal experience rebuilding gait function years after his stroke, and what worked." },
    ],
  },
  {
    icon: Heart,
    title: "For Caregivers and Families",
    resources: [
      { name: "Caregiver grief is real", description: "The grief of watching someone you love change is valid. Acknowledgment and resources for partners, children, and parents." },
      { name: "How to support without enabling", description: "A guide to being a present caregiver without preventing the survivor from building independence." },
      { name: "Family communication after stroke", description: "Practical tools for navigating personality changes, fatigue, and the emotional shifts that come with stroke recovery." },
    ],
  },
  {
    icon: Users,
    title: "Navigating the System",
    resources: [
      { name: "After discharge: the drop-off", description: "What happens when hospital rehab ends — and why you don't have to stop there." },
      { name: "Applying for a scholarship", description: "How to apply for a Stroke Lyfe scholarship into Stroke Recovery Academy. No fees, no complex forms." },
      { name: "Financial aid and stroke resources", description: "A curated list of assistance programs, foundations, and resources for survivors managing financial hardship." },
    ],
  },
];

export default function Resources() {
  return (
    <div>
      <section className="py-20 bg-foreground text-background" data-testid="section-resources-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Resources</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Real information for real recovery.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            Everything here comes from lived experience — not just clinical guidelines. Nick and the survivors in this community have been where you are.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-resources-list">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          {resourceGroups.map((group) => (
            <div key={group.title}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <group.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground">{group.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {group.resources.map((r) => (
                  <Card key={r.name} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-5">
                      <h3 className="font-medium text-foreground mb-1 text-sm">{r.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Can't find what you're looking for? We answer every message personally.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild data-testid="button-resources-contact">
              <Link href="/contact">Ask us directly</Link>
            </Button>
            <Button asChild variant="outline" data-testid="button-resources-sra">
              <a href="https://strokerecoveryacademy.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                Stroke Recovery Academy <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
