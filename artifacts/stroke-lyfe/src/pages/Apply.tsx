import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";

const BASE = import.meta.env.BASE_URL;

const programs = [
  { id: "coaching", label: "Recovery coaching & community" },
  { id: "peer", label: "Peer mentor match" },
  { id: "social", label: "Social recovery programs" },
  { id: "vehicle", label: "Vehicle independence program (waitlist)" },
  { id: "research", label: "Research program participation" },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export default function Apply() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", state: "",
    timeSinceStroke: "", currentTherapy: "",
    incomeBracket: "", story: "", referralSource: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleProgram(id: string) {
    setSelectedPrograms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.story.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE}api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, programsInterested: selectedPrograms.join(", ") }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        toast({ title: "Something went wrong", description: "Try again or email nick@strokelyfe.org directly.", variant: "destructive" });
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
        title="Apply for a Survivor Scholarship — Stroke Lyfe"
        description="Stroke survivors can apply for Stroke Lyfe scholarships to recovery programs. No income minimum to apply. Nick reviews every application personally within 72 hours."
        path="/apply"
      />

      <section className="py-20 bg-foreground text-background" data-testid="section-apply-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Survivor Scholarships</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
            Apply for a Stroke Lyfe scholarship.
          </h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            No income minimum to apply. No documentation required. Nick reviews every application personally and matches available funding to individual need. If we can help you now, we will. If not yet, we'll tell you honestly and keep you on the waitlist.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-apply-form">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {submitted ? (
                <Card data-testid="card-apply-success">
                  <CardContent className="p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Application received.</h2>
                    <p className="text-muted-foreground mb-2">Nick reviews every application personally. You'll hear back within 72 hours.</p>
                    <p className="text-sm text-muted-foreground">
                      Urgent? Email <a href="mailto:nick@strokelyfe.org" className="text-primary hover:underline">nick@strokelyfe.org</a> directly.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} data-testid="form-apply" className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full name *</Label>
                          <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="mt-1" data-testid="input-apply-name" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email address *</Label>
                          <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="mt-1" data-testid="input-apply-email" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" className="mt-1" />
                        </div>
                        <div>
                          <Label>State</Label>
                          <Select value={form.state} onValueChange={(v) => setForm((p) => ({ ...p, state: v }))}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select state" /></SelectTrigger>
                            <SelectContent>
                              {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Time since stroke</Label>
                          <Select value={form.timeSinceStroke} onValueChange={(v) => setForm((p) => ({ ...p, timeSinceStroke: v }))}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="less-than-1-year">Less than 1 year</SelectItem>
                              <SelectItem value="1-3-years">1–3 years</SelectItem>
                              <SelectItem value="3-5-years">3–5 years</SelectItem>
                              <SelectItem value="5-10-years">5–10 years</SelectItem>
                              <SelectItem value="10-plus-years">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Current therapy access</Label>
                          <Select value={form.currentTherapy} onValueChange={(v) => setForm((p) => ({ ...p, currentTherapy: v }))}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes-full">Yes — regular access</SelectItem>
                              <SelectItem value="yes-limited">Yes — limited access</SelectItem>
                              <SelectItem value="no">No therapy currently</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block">Programs you're interested in</Label>
                        <div className="space-y-2">
                          {programs.map((p) => (
                            <div key={p.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`prog-${p.id}`}
                                checked={selectedPrograms.includes(p.id)}
                                onCheckedChange={() => toggleProgram(p.id)}
                              />
                              <Label htmlFor={`prog-${p.id}`} className="font-normal cursor-pointer">{p.label}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="story">Tell us your story *</Label>
                        <Textarea
                          id="story"
                          name="story"
                          required
                          value={form.story}
                          onChange={handleChange}
                          placeholder="When did you have your stroke? What are your current challenges? What does recovery look like for you right now? What would change if you had access to coaching and community?"
                          rows={6}
                          className="mt-1"
                          data-testid="input-apply-story"
                        />
                      </div>

                      <div>
                        <Label>How did you hear about Stroke Lyfe?</Label>
                        <Select value={form.referralSource} onValueChange={(v) => setForm((p) => ({ ...p, referralSource: v }))}>
                          <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google / web search</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="friend">Friend or family</SelectItem>
                            <SelectItem value="therapist">Therapist or doctor</SelectItem>
                            <SelectItem value="hospital">Hospital / rehab facility</SelectItem>
                            <SelectItem value="sra">Stroke Recovery Academy</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={loading} data-testid="button-apply-submit">
                        {loading ? "Submitting…" : "Submit application"}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">Nick reviews every application personally within 72 hours.</p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-5">
              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-3">What happens next</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
                  <li>Nick reviews your application personally</li>
                  <li>You'll hear back within 72 hours</li>
                  <li>If funding is available, you receive access immediately</li>
                  <li>If not, you're added to the waitlist and notified when a scholarship opens</li>
                </ol>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">Who qualifies?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Any stroke survivor who cannot afford the cost of recovery programs. We don't require income documentation — tell us your situation and we'll respond honestly about what we can offer.</p>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">What programs cover</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Recovery coaching & accountability</li>
                  <li>✓ Peer community access</li>
                  <li>✓ Mindset & motivation content</li>
                  <li>✓ Social recovery programming</li>
                  <li>✓ Caregiver resources</li>
                </ul>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">Questions?</h3>
                <p className="text-sm text-muted-foreground">Email Nick directly at <a href="mailto:nick@strokelyfe.org" className="text-primary hover:underline">nick@strokelyfe.org</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
