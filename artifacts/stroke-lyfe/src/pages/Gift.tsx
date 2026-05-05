import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    price: 97,
    name: "Survivor",
    description: "Full Stroke Recovery Academy access for one month — daily routines, exercise library, AI coaching, and community.",
    features: ["Full Academy access", "Exercise library", "AI coaching tools", "Community access"],
    popular: false,
  },
  {
    price: 297,
    name: "Mentored",
    description: "Three months of Academy access plus weekly group coaching sessions — for the survivor who needs real accountability.",
    features: ["Full Academy access", "3 months group coaching", "Weekly accountability calls", "Progress tracking"],
    popular: true,
  },
  {
    price: 997,
    name: "Elite",
    description: "The full experience — one-on-one coaching with Nick, a custom recovery plan, and lifetime Academy access.",
    features: ["1:1 coaching with Nick", "Custom recovery plan", "Lifetime Academy access", "Priority support"],
    popular: false,
  },
];

export default function Gift() {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [form, setForm] = useState({
    recipientName: "",
    recipientEmail: "",
    giverName: "",
    giverEmail: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({
      title: "Payment processing coming soon",
      description: "We're setting up our payment system. Email donate@strokelyfe.org to gift a scholarship today.",
    });
  }

  return (
    <div>
      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-gift-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Gift a Scholarship</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            Give a survivor a real shot at recovery.
          </h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            Select a tier, name your recipient, and we'll activate their scholarship and send them a personalized welcome. No waiting. No bureaucracy.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Tier selection */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6" data-testid="heading-select-tier">Choose a scholarship tier</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <Card
                  key={tier.price}
                  className={`relative cursor-pointer transition-all ${selectedTier === tier.price ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"} ${tier.popular ? "border-primary" : ""}`}
                  onClick={() => setSelectedTier(tier.price)}
                  data-testid={`card-gift-tier-${tier.price}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-white text-xs px-3">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-2xl font-bold text-foreground">${tier.price}</span>
                      {selectedTier === tier.price && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="font-semibold text-sm text-foreground mb-3">{tier.name} Scholarship</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tier.description}</p>
                    <ul className="space-y-1.5">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Checkout form */}
          <Card className="max-w-2xl mx-auto" data-testid="card-gift-checkout">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-foreground mb-6">Recipient details</h2>
              <form onSubmit={handleSubmit} data-testid="form-gift" className="space-y-4">
                <div>
                  <Label htmlFor="recipientName">Recipient's name</Label>
                  <Input
                    id="recipientName"
                    name="recipientName"
                    value={form.recipientName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                    className="mt-1"
                    data-testid="input-recipient-name"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientEmail">Recipient's email</Label>
                  <Input
                    id="recipientEmail"
                    name="recipientEmail"
                    type="email"
                    value={form.recipientEmail}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    className="mt-1"
                    data-testid="input-recipient-email"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Personal message (optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="I'm thinking of you and want to support your recovery..."
                    rows={3}
                    className="mt-1"
                    data-testid="input-gift-message"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-sm text-foreground mb-3">Your details</h3>
                </div>
                <div>
                  <Label htmlFor="giverName">Your name</Label>
                  <Input
                    id="giverName"
                    name="giverName"
                    value={form.giverName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="mt-1"
                    data-testid="input-giver-name"
                  />
                </div>
                <div>
                  <Label htmlFor="giverEmail">Your email</Label>
                  <Input
                    id="giverEmail"
                    name="giverEmail"
                    type="email"
                    value={form.giverEmail}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="mt-1"
                    data-testid="input-giver-email"
                  />
                </div>

                <div className="pt-2">
                  {selectedTier && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Gifting: <strong>${selectedTier} {tiers.find((t) => t.price === selectedTier)?.name} Scholarship</strong>
                    </p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!selectedTier}
                    data-testid="button-gift-checkout"
                  >
                    Continue to payment →
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Tax-deductible. EIN 99-1313589. Receipt sent to your email.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
