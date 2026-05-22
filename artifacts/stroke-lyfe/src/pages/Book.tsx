import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { BookOpen, Mic, Building2, Heart, CheckCircle2, ArrowRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const parts = [
  {
    label: "Part I — The Storm",
    desc: "Breakdown to Breakthrough — Nick's stroke, ICU, the wheelchair, and the decision to refuse the prognosis.",
  },
  {
    label: "Part II — The Curriculum",
    desc: "The Science of Impossible Recovery — neuroplasticity, the 66-Day framework, the Sasquatch Formula (T.L.E.C.A.).",
  },
  {
    label: "Part III — The Arsenal",
    desc: "Breakthrough Techniques — baseball bat therapy, mirror therapy, drop foot destruction, arm and hand recovery, speech comeback.",
  },
  {
    label: "Part IV — Mental Mastery",
    desc: "The Psychology of Comeback — the motivation engine, emotional warfare, crushing depression and isolation, the plateau wars.",
  },
  {
    label: "Part V — Living the Recovery",
    desc: "Beyond Comeback — daily life, caregivers, returning to purpose, building your tribe.",
  },
  {
    label: "Part VI — Mastery",
    desc: "Inspiring Others — building the Stroke Lyfe Empire, the Caregiver's Field Manual, the Sasquatch Doctrine.",
  },
  {
    label: "Part VII — Stories from the Tribe",
    desc: "Nine survivor case studies plus closing pattern analysis — proof that the method works across deficit types and timelines.",
  },
];

const hospitalTiers = [
  { amount: "$25", label: "1 book to a hospital rehab unit", icon: "📖" },
  { amount: "$125", label: "5 books — enough for a stroke unit floor", icon: "📚" },
  { amount: "$250", label: "10 books — a full unit and PT department", icon: "🏥" },
  { amount: "$500", label: "20 books — a regional stroke center", icon: "🌟" },
  { amount: "$1,000", label: "40+ books — a hospital system partnership", icon: "🏆" },
];

export default function Book() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE}api/email-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "book-notify" }),
      });
      if (res.ok || res.status === 409) {
        setNotified(true);
      } else {
        toast({ title: "Something went wrong", description: "Try again or email nick@strokelyfe.org", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Check your connection and try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SEO
        title="The Stroke Recovery Revolution — Nick Kremers's Upcoming Book"
        description="The Stroke Recovery Revolution by Nicholas 'Stroked-Out Sasquatch' Kremers — the battle-tested blueprint from 0% to 90%+ recovery. Coming soon. Hospital donation program and speaking engagements available."
        path="/book"
      />

      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-book-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Coming Soon — 2026</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
                The Stroke Recovery Revolution
              </h1>
              <p className="text-background/70 text-lg font-medium mb-2 italic">
                From 0% to 90%+ and Still Rising — The Battle-Tested Blueprint Defying Every "Never"
              </p>
              <p className="text-background/60 text-base leading-relaxed mb-6">
                By Nicholas "Stroked-Out Sasquatch" Kremers — Founder, Stroke Recovery Academy &amp; Stroke Lyfe Inc.
              </p>
              <p className="text-background/80 leading-relaxed mb-8">
                December 3, 2018: wheelchair, 50 staples, 30% prognosis, and a medical system that was done with me after 60 days. This book is what happened when I refused every "never" they handed me — and the exact methods that took me from 0% to 90%+ function over seven and a half years.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#notify" className="bg-primary text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
                  Notify me when it's published
                </a>
                <Link href="/donate" className="border border-background/30 text-background px-5 py-3 rounded-lg font-semibold text-sm hover:bg-background/10 transition-colors">
                  Donate a book to a hospital →
                </Link>
              </div>
            </div>
            <div className="bg-background/10 rounded-2xl p-8 border border-background/20">
              <div className="text-center mb-6">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-xs text-background/40 uppercase tracking-widest font-semibold mb-1">The book inside</p>
                <p className="font-serif text-2xl font-bold text-background">30 chapters. 7 parts.</p>
                <p className="text-background/60 text-sm mt-1">Paired with the <em>Hostile Construction</em> album by Stroked Out Sasquatch.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                {[
                  { n: "30", label: "Chapters" },
                  { n: "7", label: "Parts" },
                  { n: "23", label: "Appendices" },
                  { n: "12", label: "Album tracks" },
                ].map((s) => (
                  <div key={s.label} className="bg-background/5 rounded-lg p-3">
                    <p className="font-serif text-2xl font-bold text-primary">{s.n}</p>
                    <p className="text-xs text-background/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-10 bg-muted border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <blockquote className="font-serif text-xl md:text-2xl text-foreground font-medium leading-relaxed">
            "The impossible is only impossible until someone proves it's not."
          </blockquote>
          <p className="text-muted-foreground text-sm mt-3">— Nick Kremers, Founder · Stroke Lyfe Inc.</p>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-foreground">What's inside the book</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">From the ICU to the seven-year breakthrough. This is the full blueprint — not the edited version a publisher would have softened.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parts.map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/40 transition-all">
                <span className="font-bold text-primary text-sm shrink-0 w-8 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{p.label}</p>
                  <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-muted rounded-xl p-6 text-center">
            <p className="text-sm font-medium text-foreground mb-1">Plus 23 appendices including:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">Emergency stroke recognition (FAST + BE-FAST) · Full exercise protocol library · The 90-Day Breakthrough Program · The Survivor's Bill of Rights · Letters to the Old Me · The Forty Questions to Ask Your Stroke Care Team · For Clinicians &amp; Therapists · and more.</p>
          </div>
        </div>
      </section>

      {/* NOTIFY + HOSPITAL DONATION */}
      <section className="py-16 bg-muted" id="notify">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Notification signup */}
            <Card data-testid="card-book-notify">
              <CardContent className="p-6 md:p-8">
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Get notified when it's published</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  The book ships in 2026. Enter your email and we'll notify you the moment it's available — no spam, no newsletter unless you want one. Just the notification and a direct link to order.
                </p>
                {notified ? (
                  <div className="flex items-center gap-3 bg-accent/10 text-accent rounded-lg px-4 py-3" data-testid="book-notify-success">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <p className="text-sm font-medium">You're on the list. We'll email you the moment it's live.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNotify} className="flex flex-col gap-3" data-testid="form-book-notify">
                    <div>
                      <Label htmlFor="notify-email">Email address</Label>
                      <Input
                        id="notify-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1"
                        data-testid="input-book-email"
                      />
                    </div>
                    <Button type="submit" disabled={loading} data-testid="button-book-notify">
                      {loading ? "Saving…" : "Notify me when it's published"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Hospital donation */}
            <Card data-testid="card-book-hospital">
              <CardContent className="p-6 md:p-8">
                <Building2 className="h-8 w-8 text-primary mb-4" />
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Donate a book to a hospital</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Survivors get discharged with a stack of papers and no real roadmap. The Stroke Recovery Revolution changes that. Donate to put a copy in the hands of every survivor before they go home — starting with River Valley Arkansas facilities and scaling nationwide.
                </p>
                <div className="space-y-2 mb-5">
                  {hospitalTiers.map((t) => (
                    <div key={t.amount} className="flex items-center gap-3 text-sm">
                      <span className="text-lg">{t.icon}</span>
                      <span className="font-bold text-foreground w-16 shrink-0">{t.amount}</span>
                      <span className="text-muted-foreground">{t.label}</span>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full" data-testid="button-hospital-donate">
                  <Link href="/donate">Donate to fund hospital books</Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">Tax-deductible. EIN 99-1313589.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SPEAKING ENGAGEMENTS */}
      <section className="py-16 bg-background" data-testid="section-speaking">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Mic className="h-10 w-10 text-primary mb-4" />
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Speaking engagements</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nick is available to speak at hospitals, rehabilitation facilities, stroke support groups, nonprofits, civic organizations, churches, and corporate wellness programs — throughout the Arkansas River Valley and nationally.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The talk covers Nick's story, the neuroscience behind the recovery model, and the practical principles that any survivor — regardless of deficit type, time post-stroke, or medical prognosis — can begin applying immediately. It's not a motivational speech. It's a technical briefing on what's actually possible and why most survivors are operating under an artificial ceiling.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  "Hospital stroke units and inpatient rehab facilities",
                  "Outpatient therapy clinics and neurological practices",
                  "Survivor support groups and caregiver organizations",
                  "Nonprofit events and fundraisers",
                  "Medical conferences and CME events",
                  "Corporate wellness programs and employer benefits events",
                  "River Valley civic organizations, churches, and community groups",
                ].map((venue, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                    {venue}
                  </div>
                ))}
              </div>
              <a
                href="mailto:nick@strokelyfe.org?subject=Speaking engagement inquiry"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
                data-testid="link-speaking-inquiry"
              >
                <Mic className="h-4 w-4" />
                Inquire about a speaking engagement
              </a>
              <p className="text-xs text-muted-foreground mt-2">Fees are negotiable and may be waived for nonprofits and survivor groups.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-muted rounded-xl p-6">
                <h3 className="font-serif font-bold text-foreground mb-3">What the talk covers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Nick's story — from ICU to 90%+ function in 7.5 years",
                    "The neuroplasticity science behind long-term recovery",
                    "The six-month plateau myth — what the research actually says",
                    "The techniques that worked when insurance stopped paying",
                    "What survivors need to hear before discharge — not six months later",
                    "How communities, hospitals, and nonprofits can close the recovery gap",
                    "Q&A with one of the most documented stroke recovery journeys in the country",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-foreground text-background rounded-xl p-6">
                <Heart className="h-6 w-6 text-primary mb-3" />
                <p className="font-serif font-bold text-lg mb-2">Donate to fund a speaking visit</p>
                <p className="text-sm text-background/70 leading-relaxed mb-4">For smaller organizations or facilities that can't cover a speaking fee, donations to Stroke Lyfe help subsidize visits — especially at River Valley Arkansas facilities.</p>
                <Button asChild size="sm" className="w-full">
                  <Link href="/donate">Support the mission</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GIVEAWAYS */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Book giveaways through social media</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                As donations grow, so do the giveaways. Nick runs regular social media giveaways through <strong>@nickkremers</strong> on TikTok and <strong>@NicholasKremersSr</strong> on Facebook — recovery products, program access, adaptive equipment, and signed copies of The Stroke Recovery Revolution when it launches. The bigger the community, the bigger the giveaways.
              </p>
              <p className="text-muted-foreground text-sm">Follow along and share the mission — that's how survivors who can't donate still benefit.</p>
            </div>
            <div className="bg-background rounded-xl p-5 border border-border text-center">
              <p className="text-3xl mb-2">🎁</p>
              <p className="font-serif font-bold text-foreground mb-1">Community giveaways</p>
              <p className="text-xs text-muted-foreground mb-4">Growing with every donation</p>
              <Button asChild size="sm" className="w-full">
                <Link href="/donate">Donate to grow the giveaways</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">The revolution is already underway.</h2>
          <p className="text-background/70 max-w-xl mx-auto mb-8 leading-relaxed">
            7.5 years. 30% prognosis. 90%+ achieved. This book is the blueprint. Your donation puts it in the hands of the survivors who need it most.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" data-testid="button-book-donate">
              <Link href="/donate">Donate to the mission</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10">
              <Link href="/apply">Apply for a scholarship</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
