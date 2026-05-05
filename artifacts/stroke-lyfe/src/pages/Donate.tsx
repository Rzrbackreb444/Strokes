import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const presets = [25, 50, 100, 250, 500, 1000];

const impactMap = [
  { amount: 25, label: "Funds one week of AI coaching tools for a survivor." },
  { amount: 50, label: "Covers a survivor's resource library access for a month." },
  { amount: 97, label: "Funds one full Survivor Scholarship — Academy access + coaching." },
  { amount: 100, label: "Covers transportation support for two therapy appointments." },
  { amount: 250, label: "Funds a Mentored scholarship — 3 months of group coaching." },
  { amount: 297, label: "Sponsors a Mentored tier scholarship for one survivor." },
  { amount: 500, label: "Funds 5 Survivor scholarships — one for each person on the waitlist today." },
  { amount: 997, label: "Funds an Elite scholarship — 1:1 coaching with Nick + custom plan." },
  { amount: 1000, label: "Funds 10 survivors for a full month. Names are real. We'll send them." },
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
          tributeOf: tributeName || undefined,
          inHonorOf: inHonorOf || undefined,
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
      {/* HERO */}
      <section className="py-16 bg-foreground text-background" data-testid="section-donate-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Make a Difference</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">We're just getting started. That means your donation matters more right now.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg">
            Stroke Lyfe is a brand new 501(c)(3). Every early donor shapes what this org becomes. Your gift today funds the first scholarships, proves the model, and puts a real survivor on the path to recovery.
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
                    { amount: "$25", label: "One week of AI coaching" },
                    { amount: "$97", label: "One Survivor Scholarship" },
                    { amount: "$297", label: "Mentored Scholarship — 3 months" },
                    { amount: "$1,000", label: "10 survivors for a month" },
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
                  You donate to Stroke Lyfe Inc. (the 501(c)(3) nonprofit). We use that to fund a survivor's scholarship into Stroke Recovery Academy. That's it.
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
    </div>
  );
}
