import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle2, Users } from "lucide-react";
import nickNow from "@assets/IMG_1750_1777981406518.jpeg";
import beforeAfter from "@assets/2018_1777981175442.png";
import nick2018 from "@assets/2c4df2a8-eaa5-4937-8c7d-892af18196c2_1777981256069.jpeg";
import testimonyVideo from "@assets/v12044gd0000cfujmsbc77u1e71oqg7g_1777981256069.mp4";

export default function About() {
  return (
    <div>
      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-about-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">About Stroke Lyfe</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
            Why Stroke Lyfe exists.
          </h1>
          <p className="mt-6 text-background/70 max-w-2xl text-lg leading-relaxed">
            Empowering stroke survivors through education, accountability, and community — regardless of income or insurance status.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="py-20 bg-background" data-testid="section-founder-story">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <img
                src={nickNow}
                alt="Nick Kremers, founder of Stroke Lyfe — recovered"
                className="w-full rounded-lg object-cover mb-4"
                style={{ maxHeight: "560px", objectPosition: "center 80%" }}
              />
              <img
                src={beforeAfter}
                alt="Nick Kremers — before (2018, shortly after stroke) and after (2027, recovered)"
                className="w-full rounded-lg"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">2018 (shortly after stroke) → 2027 (today)</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">Nick's Story</p>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                "I was 36 years old. December 3, 2018. I had no idea what was about to happen."
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Nick Kremers had his stroke at 36. He had a young family, a career, a life moving fast — and then it stopped. The damage was real and the road back would take years. But the part that still makes him angry isn't the stroke itself.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                It's what happened after. After a few rounds of therapy, his insurance company reviewed his case and made a determination: Nick was too recovered to continue. They sent him home. He was still in a wheelchair.
              </p>

              <blockquote className="font-serif text-xl font-bold text-foreground border-l-4 border-primary pl-6 my-6">
                "Too recovered. I was still in a wheelchair when they said that. That sentence is why this organization exists."
              </blockquote>

              <p className="text-muted-foreground leading-relaxed mb-4">
                The system isn't broken by accident. It's built around what's measurable and billable, not around what recovery actually requires — which is consistency, community, and time. Nick got the discharge paperwork, the binder of exercises, and no real path forward. So he built one.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                That path became Stroke Recovery Academy — a platform that gives survivors daily structure, real coaching, and a community of people who understand the experience from the inside. But the Academy costs money, and not every survivor has it. Stroke Lyfe exists to close that gap. Every donation funds a real person on a real waitlist. When they get their scholarship, we tell you.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                If you're reading this as a survivor: you are not too recovered. You're not behind. What you're doing is hard and it takes as long as it takes. If you're reading this as a donor: Nick knows what it's like to be told you don't qualify anymore. Your gift says otherwise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NICK'S TESTIMONY VIDEO */}
      <section className="py-20 bg-muted" data-testid="section-testimony-video">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">In His Own Words</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Nick's Testimony</h2>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg aspect-video bg-black">
            <video
              src={testimonyVideo}
              controls
              poster={nick2018}
              className="w-full h-full"
              aria-label="Nick Kremers shares his stroke recovery testimony"
              data-testid="video-testimony"
            >
              Your browser does not support the video element.
            </video>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Nick shares his story — from the hospital to today.
          </p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-20 bg-background" data-testid="section-pillars">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Our Approach</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Three pillars. One mission.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-6 w-6 text-accent" />,
                title: "Education",
                body: "Stroke recovery is overwhelming. We break it down — what neuroplasticity actually means for your daily life, which therapies have evidence behind them, how to advocate for yourself in a system that moves too fast. Knowledge is the first tool.",
              },
              {
                icon: <CheckCircle2 className="h-6 w-6 text-accent" />,
                title: "Accountability",
                body: "Consistency is the mechanism of neuroplasticity. You can't do three sessions and stop. We provide structure — daily check-ins, coaching, a community that notices when you go quiet — because recovery requires showing up even on bad days.",
              },
              {
                icon: <Users className="h-6 w-6 text-accent" />,
                title: "Community",
                body: "The isolation that follows a stroke is as damaging as the physical deficits. We build connection between survivors who understand the experience from the inside — not from a textbook, not from a medical chart. From their own Wednesday morning.",
              },
            ].map((pillar) => (
              <Card key={pillar.title} className="border-0 bg-muted">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD */}
      <section className="py-20 bg-muted" data-testid="section-board">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Leadership</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Board of Directors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Nick Kremers", title: "Founder & Executive Director", bio: "Stroke survivor, recovery advocate, and founder of Stroke Recovery Academy." },
              { name: "[Board Chair]", title: "Board Chair", bio: "Placeholder — contact us to learn about board service." },
              { name: "[Treasurer]", title: "Treasurer", bio: "Placeholder — contact us to learn about board service." },
            ].map((member) => (
              <Card key={member.name} data-testid={`card-board-${member.name.replace(/\s+/g, "-").toLowerCase()}`}>
                <CardContent className="p-5 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                    <span className="font-serif font-bold text-accent text-lg">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground text-sm">{member.name}</p>
                  <p className="text-xs text-primary font-medium mt-0.5">{member.title}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-background" data-testid="section-timeline">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Our Journey</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {[
                { year: "2024", event: "Founded", detail: "Stroke Lyfe Inc. incorporated as a 501(c)(3) public charity in response to the gap Nick experienced firsthand." },
                { year: "2025", event: "First scholarship cohort", detail: "50 survivors received Academy scholarships in the first funded cohort. Average wait time: 2 weeks from application to activation." },
                { year: "2026", event: "1,000th survivor served", detail: "Milestone reached. The work continues. Every survivor on the waitlist gets a scholarship." },
              ].map((item) => (
                <div key={item.year} className="flex gap-6 pl-10 relative" data-testid={`card-timeline-${item.year}`}>
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-primary font-bold text-sm">{item.year}</span>
                      <span className="font-serif font-bold text-foreground">{item.event}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA ROW */}
      <section className="py-16 bg-accent text-white" data-testid="section-about-cta">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Ready to help?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild data-testid="button-about-donate">
              <Link href="/donate">Make a donation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:text-white" asChild>
              <Link href="/stories">Read survivor stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
