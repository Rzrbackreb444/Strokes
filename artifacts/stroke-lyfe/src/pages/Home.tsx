import { Link } from "wouter";
import { ArrowRight, Heart, Users, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublicStats, useGetFeaturedStories } from "@workspace/api-client-react";
const BASE = import.meta.env.BASE_URL;
const heroImg = `${BASE}assets/hero.jpeg`;
const aboutImg = `${BASE}assets/about.jpeg`;
const nickNow = `${BASE}assets/nick-now.jpeg`;

export default function Home() {
  const { data: stats } = useGetPublicStats();
  const { data: featured, isLoading: loadingStories } = useGetFeaturedStories();

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center" data-testid="section-hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
          role="img"
          aria-label="A stroke survivor walking in a rehabilitation corridor with therapist support"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="relative container mx-auto px-4 max-w-6xl py-20">
          <div className="max-w-2xl">
            <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              501(c)(3) Nonprofit
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none mb-6" data-testid="text-hero-tagline">
              REBUILD.<br />REWIRE.<br />RISE.
            </h1>
            <p className="text-white/85 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              Stroke Lyfe is a 501(c)(3) nonprofit founded by survivor Nick Kremers to give every stroke survivor a real shot at recovery — regardless of income or insurance.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" asChild data-testid="button-donate-hero">
                <Link href="/donate">
                  Donate Now
                  <Heart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/60 text-white hover:bg-white/10 hover:text-white" data-testid="button-gift-hero">
                <Link href="/gift">
                  Gift a Survivor's Recovery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {/* Stats strip */}
            <div className="flex flex-wrap gap-6" data-testid="section-impact-stats">
              <div>
                <span className="text-2xl font-bold text-primary" data-testid="text-survivors-count">
                  {stats?.survivorsServed?.toLocaleString() ?? "1,247"}
                </span>
                <span className="text-white/70 text-sm ml-2">survivors served</span>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <span className="text-2xl font-bold text-primary" data-testid="text-scholarships-count">
                  {stats?.scholarshipsFunded?.toLocaleString() ?? "312"}
                </span>
                <span className="text-white/70 text-sm ml-2">scholarships funded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION STRIP */}
      <section className="py-16 bg-muted" data-testid="section-mission">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Education</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Stroke recovery is a process, not an event. We give survivors and families the knowledge to navigate it — what to expect, what to ask for, and when to push back.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Accountability</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Recovery doesn't happen alone. We pair survivors with tools, coaches, and peers who hold them accountable to the daily work that actually moves the needle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Community</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The isolation after a stroke is real. We connect survivors to others who get it — not because they read about it, but because they lived it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST — Nick's quote */}
      <section className="py-20 bg-background" data-testid="section-founder">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden">
              <img
                src={nickNow}
                alt="Nick Kremers, founder of Stroke Lyfe, today"
                className="w-full h-80 md:h-96 object-cover rounded-lg"
                style={{ objectPosition: "center 80%" }}
              />
            </div>
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">Why We Exist</p>
              <blockquote className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
                "They predicted 30% recovery and told me I'd never walk normally again. I'm at 90%+. The timeline they give you is a floor, not a ceiling."
              </blockquote>
              <p className="text-muted-foreground mb-2 font-medium">— Nick Kremers, Founder</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Nick had his stroke on December 3, 2018 at 36. Insurance discharged him while he was still in a wheelchair — "too recovered" to qualify for more therapy. He built what should have existed: a platform, a community, and now a nonprofit to fund access for every survivor who can't afford it.
              </p>
              <Button variant="outline" asChild data-testid="button-read-story">
                <Link href="/about">
                  Read Nick's story
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* GIFT TIERS */}
      <section className="py-20 bg-muted" data-testid="section-gift-tiers">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">What Your Gift Does</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Give a survivor a real shot</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                price: "$97",
                tier: "Survivor",
                features: ["Full Stroke Recovery Academy access", "1 month of daily recovery tools", "Exercise library + AI coaching"],
                testId: "card-tier-97",
              },
              {
                price: "$297",
                tier: "Mentored",
                features: ["Full Academy access", "3 months of group coaching", "Weekly accountability check-ins"],
                popular: true,
                testId: "card-tier-297",
              },
              {
                price: "$997",
                tier: "Elite",
                features: ["Full Academy access", "1:1 coaching with Nick", "Custom recovery plan", "Lifetime access"],
                testId: "card-tier-997",
              },
            ].map((tier) => (
              <Card key={tier.price} className={`relative ${tier.popular ? "border-primary shadow-md ring-1 ring-primary" : ""}`} data-testid={tier.testId}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white text-xs px-3">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-3xl font-serif font-bold text-foreground mb-1">{tier.price}</div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">{tier.tier} Scholarship</div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild data-testid={`button-gift-${tier.price.replace("$", "")}`}>
                    <Link href="/gift">Gift this →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STORY CAROUSEL */}
      <section className="py-20 bg-background" data-testid="section-stories">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-1">Real People</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Their words, not ours</h2>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex" data-testid="button-all-stories">
              <Link href="/stories">Read all stories <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingStories
              ? Array(3).fill(0).map((_, i) => (
                  <Card key={i}><CardContent className="p-0"><Skeleton className="h-48 rounded-t-lg" /><div className="p-4"><Skeleton className="h-4 w-3/4 mb-2" /><Skeleton className="h-3 w-1/2" /></div></CardContent></Card>
                ))
              : (featured && featured.length > 0 ? featured.slice(0, 3) : [
                  { id: 1, slug: "maria-s", pullQuote: "I got my voice back. It wasn't instant, but I got it back.", handle: "Maria S.", focusArea: "Speech", posterUrl: null },
                  { id: 2, slug: "devon-t", pullQuote: "Day 1 to day 200 — same survivor, completely different life.", handle: "Devon T.", focusArea: "Mobility", posterUrl: null },
                  { id: 3, slug: "aisha-r", pullQuote: "The people here saw me as me, not my MRI.", handle: "Aisha R.", focusArea: "Caregiver", posterUrl: null },
                ]).map((story) => (
                  <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-story-${story.id}`}>
                    <div
                      className="h-48 bg-accent/20 flex items-end p-4"
                      style={story.posterUrl ? { backgroundImage: `url(${story.posterUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                    >
                      {story.focusArea && (
                        <Badge variant="secondary" className="text-xs">{story.focusArea}</Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <blockquote className="font-serif text-base text-foreground leading-snug mb-3">
                        "{story.pullQuote}"
                      </blockquote>
                      <p className="text-sm text-muted-foreground">— {story.handle}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild><Link href="/stories">Read all stories</Link></Button>
          </div>
        </div>
      </section>

      {/* ACADEMY BRIDGE */}
      <section className="py-16 bg-accent text-white" data-testid="section-academy-bridge">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-white/60 uppercase tracking-wider text-sm mb-3">Looking for day-to-day tools?</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Stroke Recovery Academy is our partner platform.
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6 leading-relaxed">
            Daily routines, AI coaching, exercise library, and a community of people who get it. Built by the same team, for the same mission.
          </p>
          <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:text-white" asChild data-testid="button-academy-bridge">
            <a
              href="https://strokerecoveryacademy.com?utm_source=strokelyfe&utm_medium=site&utm_campaign=home"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Stroke Recovery Academy →
            </a>
          </Button>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-8 bg-muted border-y border-border" data-testid="section-trust">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="font-medium">GuideStar Profile</span>
            <span className="text-border">·</span>
            <span className="font-medium">Charity Navigator</span>
            <span className="text-border">·</span>
            <span className="font-medium">Candid</span>
            <span className="text-border">·</span>
            <span data-testid="text-trust-ein">501(c)(3) · EIN 99-1313589</span>
          </div>
        </div>
      </section>
    </div>
  );
}
