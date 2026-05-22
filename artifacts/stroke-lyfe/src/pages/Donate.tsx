import { useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const presets = [25, 50, 100, 250, 500, 1000];

const impactMap = [
  { amount: 25, label: "Provides one week of mindset tools, daily motivation content, and social connection resources for a survivor." },
  { amount: 50, label: "Funds a survivor's access to peer community and social programming for a full month." },
  { amount: 97, label: "Funds one full Survivor Scholarship — coaching, community, motivation, and recovery tools for a month." },
  { amount: 100, label: "Supports research into stroke recovery advances — helping raise the ceiling for every future survivor." },
  { amount: 150, label: "Connects a survivor with a peer mentor who's lived what they're living — real match, real relationship." },
  { amount: 250, label: "Funds 3 months of group coaching, peer motivation, and social programming for one survivor." },
  { amount: 297, label: "Sponsors a Mentored Scholarship — structured coaching, accountability, and identity work for one survivor." },
  { amount: 500, label: "Enriches the lives of 5 survivors for a month — mindset, social connection, coaching, and community." },
  { amount: 997, label: "Funds an Elite Scholarship — personalized 1:1 coaching, custom recovery plan, and lifetime program access." },
  { amount: 1000, label: "Ten survivors. One month. Full access to every Stroke Lyfe program. Names are real. We'll send them to you." },
];

function getImpact(amt: number) {
  const sorted = [...impactMap].sort((a, b) => a.amount - b.amount);
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (amt >= sorted[i].amount) return sorted[i].label;
  }
  return "Every dollar goes directly to survivor programs.";
}

export default function Donate() {
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [coverFee, setCoverFee] = useState(false);
  const [tributeName, setTributeName] = useState("");
  const [inHonorOf, setInHonorOf] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount = custom ? parseFloat(custom) || 0 : amount;
  const processingFee = coverFee ? +(effectiveAmount * 0.029 + 0.30).toFixed(2) : 0;
  const totalAmount = effectiveAmount + processingFee;

  async function handleCheckout() {
    if (effectiveAmount < 1) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}api/donations/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          isRecurring,
          coverFee,
          inHonorOf: inHonorOf || undefined,
          tributeNotifyEmail: tributeName || undefined,
          donorName: donorName || undefined,
          donorEmail: donorEmail || undefined,
        }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SEO
        title="Donate to Stroke Lyfe — Support Stroke Survivor Recovery"
        description="Your donation to Stroke Lyfe Inc. funds survivor scholarships, recovery coaching, and neuroplasticity research. Tax-deductible. EIN 99-1313589. Give for any reason."
        path="/donate"
      />
      {/* HERO */}
      <section className="py-16 bg-foreground text-background" data-testid="section-donate-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Make a Difference</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Give for any reason. Every dollar enriches the life of a stroke survivor.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg">
            Stroke Lyfe's mission is to enrich the lives of stroke survivors through motivation and to further research in recovery advances. Your gift — whatever the reason — directly funds that mission: scholarships, coaching, community, and the science that brings better recoveries within reach.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-donate-form">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 md:p-8">
                  {/* One-time / monthly toggle */}
                  <div className="flex rounded-md border border-border overflow-hidden mb-6" role="group" aria-label="Donation frequency">
                    <button
                      onClick={() => setIsRecurring(false)}
                      className={`flex-1 py-2.5 text-sm font-medium transition-colors ${!isRecurring ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:bg-muted"}`}
                      data-testid="button-one-time"
                    >
                      One-time
                    </button>
                    <button
                      onClick={() => setIsRecurring(true)}
                      className={`flex-1 py-2.5 text-sm font-medium transition-colors ${isRecurring ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:bg-muted"}`}
                      data-testid="button-monthly"
                    >
                      Monthly
                    </button>
                  </div>

                  {/* Preset amounts */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Select an amount</Label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {presets.map((p) => (
                        <button
                          key={p}
                          onClick={() => { setAmount(p); setCustom(""); }}
                          className={`py-2.5 rounded-md border text-sm font-semibold transition-colors ${amount === p && !custom ? "bg-primary text-white border-primary" : "border-border hover:border-primary hover:text-primary"}`}
                          data-testid={`button-amount-${p}`}
                        >
                          ${p.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="custom-amount" className="text-xs text-muted-foreground">Or enter a custom amount</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min="1"
                          placeholder="Other amount"
                          value={custom}
                          onChange={(e) => { setCustom(e.target.value); setAmount(0); }}
                          className="pl-7"
                          data-testid="input-custom-amount"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Impact preview */}
                  {effectiveAmount > 0 && (
                    <p className="text-sm text-accent font-medium mt-3 bg-accent/5 px-3 py-2 rounded-md" data-testid="text-impact-preview">
                      {getImpact(effectiveAmount)}
                    </p>
                  )}

                  {/* Cover fee */}
                  <div className="flex items-center gap-2 mt-4">
                    <Checkbox
                      id="cover-fee"
                      checked={coverFee}
                      onCheckedChange={(v) => setCoverFee(!!v)}
                      data-testid="checkbox-cover-fee"
                    />
                    <Label htmlFor="cover-fee" className="text-sm text-muted-foreground cursor-pointer">
                      Cover the 2.9% + $0.30 processing fee (+${processingFee.toFixed(2)})
                    </Label>
                  </div>

                  {/* Donor info */}
                  <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="donor-name" className="text-sm">Your name (optional)</Label>
                      <Input
                        id="donor-name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Jane Smith"
                        className="mt-1"
                        data-testid="input-donor-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="donor-email" className="text-sm">Email for receipt (optional)</Label>
                      <Input
                        id="donor-email"
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1"
                        data-testid="input-donor-email"
                      />
                    </div>
                  </div>

                  {/* Tribute fields */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-3">Tribute gift (optional)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="in-honor-of" className="text-xs text-muted-foreground">In honor / memory of</Label>
                        <Input
                          id="in-honor-of"
                          value={inHonorOf}
                          onChange={(e) => setInHonorOf(e.target.value)}
                          placeholder="Name (optional)"
                          className="mt-1"
                          data-testid="input-in-honor-of"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tribute-email" className="text-xs text-muted-foreground">Notify by email (optional)</Label>
                        <Input
                          id="tribute-email"
                          type="email"
                          value={tributeName}
                          onChange={(e) => setTributeName(e.target.value)}
                          placeholder="notification@email.com"
                          className="mt-1"
                          data-testid="input-tribute-email"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="mt-4 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md" data-testid="error-donate">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <div className="mt-6">
                    {effectiveAmount > 0 && (
                      <p className="text-xs text-muted-foreground mb-3">
                        Total: <strong>${totalAmount.toFixed(2)}</strong> {isRecurring ? "/ month" : "one-time"}
                      </p>
                    )}
                    <Button
                      size="lg"
                      className="w-full"
                      disabled={loading || effectiveAmount < 1}
                      onClick={handleCheckout}
                      data-testid="button-continue-payment"
                    >
                      {loading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Redirecting to Stripe…</>
                      ) : (
                        "Continue to payment →"
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Secure checkout via Stripe. Tax-deductible. EIN 99-1313589.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Impact sidebar */}
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-4">What your gift does</h3>
                <div className="space-y-3">
                  {[
                    { amount: "$25", label: "One week of motivation tools & resources" },
                    { amount: "$97", label: "One full Survivor Scholarship" },
                    { amount: "$297", label: "3 months of coaching & community" },
                    { amount: "$1,000", label: "10 survivors supported for a full month" },
                  ].map((item) => (
                    <div key={item.amount} className="flex items-start gap-3">
                      <span className="font-bold text-primary text-sm shrink-0 w-14">{item.amount}</span>
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">How this works</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You donate to Stroke Lyfe Inc. (the 501(c)(3) nonprofit) for any reason — in honor of someone, in support of a survivor, or simply because the mission resonates. We use every dollar to motivate survivors, fund scholarships, and advance recovery research.
                </p>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">Secure & tax-deductible</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stroke Lyfe Inc. is a 501(c)(3) public charity (EIN: 99-1313589). Your donation is tax-deductible to the fullest extent of the law.
                </p>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <p className="text-sm font-semibold text-foreground mb-1">Questions?</p>
                <p className="text-sm text-muted-foreground">
                  Email <a href="mailto:donate@strokelyfe.org" className="text-primary hover:underline">donate@strokelyfe.org</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT DONATIONS UNLOCK */}
      <section className="py-16 bg-foreground text-background" data-testid="section-outcomes">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">No ceiling on this mission</p>
            <h2 className="font-serif text-3xl font-bold text-background">What growing donations unlock</h2>
            <p className="text-background/60 mt-3 max-w-xl mx-auto">There is no cap on what you can give — and no cap on what it builds. Here's what happens as the community grows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎓",
                title: "Survivor Scholarships",
                desc: "Every $97 in donations funds one survivor's access to coaching, community, and recovery programs — for an entire month. The waitlist shrinks with every gift.",
              },
              {
                icon: "🚗",
                title: "Vehicle Independence",
                desc: "Adaptive driving evaluations and vehicle modifications cost $800–$5,000 — and insurance won't pay. Your donations fund the program that gives survivors their independence back.",
              },
              {
                icon: "📖",
                title: "Hospital Book Program",
                desc: "A $25 donation puts The Stroke Recovery Revolution on a rehab unit bedside table before a survivor goes home. River Valley Arkansas facilities first — then nationwide.",
              },
              {
                icon: "🧠",
                title: "Recovery Research",
                desc: "Neuroplasticity research, experimental treatment access, and the technology that will define what's possible in year five, six, and seven of recovery.",
              },
              {
                icon: "🤝",
                title: "Peer Mentor Network",
                desc: "Survivor-to-survivor coaching from people who have lived the same deficits, the same grief, and the same fight. Nothing replaces that.",
              },
              {
                icon: "🏥",
                title: "Recovery Center",
                desc: "The long-range vision: a purpose-built facility with experimental recovery technology, community programming, and a social environment for long-term survivors.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-background/5 border border-background/10 rounded-xl p-5 hover:border-primary/40 transition-colors">
                <p className="text-3xl mb-3">{item.icon}</p>
                <h3 className="font-serif font-bold text-background mb-2">{item.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIVEAWAY MILESTONES */}
      <section className="py-16 bg-muted border-t border-border" data-testid="section-giveaways">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Donation-powered giveaways</p>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">The more the community gives, the bigger the giveaways</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As Stroke Lyfe grows, so does what we give back. Through <strong>@nickkremers</strong> on TikTok and <strong>@NicholasKremersSr</strong> on Facebook — reaching 90,000+ survivors and caregivers — Nick runs community giveaways that put recovery products, adaptive equipment, program access, books, and more directly in the hands of survivors who need them.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Giveaways scale with donations. Bigger community giving means bigger prizes, more frequent giveaways, and more survivors reached through social media. This isn't a loyalty program — it's what happens when a nonprofit is run by a survivor who remembers exactly what it felt like to need resources and not be able to afford them.
              </p>
              <p className="text-sm text-muted-foreground">
                Follow along even if you can't donate — sharing the mission is how survivors who can't give financially still benefit.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { threshold: "Community giving: any level", prize: "Monthly digital giveaway — recovery resources, templates, and program content", icon: "🎁" },
                { threshold: "Community giving: growing", prize: "Product giveaways — recovery equipment and adaptive tools through social media", icon: "📦" },
                { threshold: "Community giving: milestone", prize: "Major product packages — larger adaptive equipment and recovery technology", icon: "⚡" },
                { threshold: "Book launch milestone", prize: "Signed copies of The Stroke Recovery Revolution for survivors and caregivers", icon: "📖" },
                { threshold: "Major milestone", prize: "VIP survivor packages — program access, books, products, and personal coaching sessions", icon: "🏆" },
              ].map((tier, i) => (
                <div key={i} className="flex items-start gap-4 bg-background rounded-xl p-4 border border-border">
                  <span className="text-2xl shrink-0">{tier.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">{tier.threshold}</p>
                    <p className="text-sm text-foreground leading-relaxed">{tier.prize}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <a
                  href="https://www.tiktok.com/@nickkremers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mr-5"
                >
                  Follow @nickkremers on TikTok ↗
                </a>
                <a
                  href="https://www.facebook.com/NicholasKremersSr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Facebook @NicholasKremersSr ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
