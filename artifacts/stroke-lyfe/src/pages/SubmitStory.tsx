import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSubmitStory } from "@workspace/api-client-react";
import { CheckCircle2 } from "lucide-react";

const FOCUS_AREAS = ["Speech", "Mobility", "Cognition", "Caregiver", "Emotional", "Other"];
const RECOVERY_STAGES = ["Early (0–6 months)", "Ongoing (6–18 months)", "Advanced (18+ months)", "Caregiver"];

export default function SubmitStory() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    handle: "",
    pullQuote: "",
    body: "",
    focusArea: "",
    recoveryStage: "",
    submitterEmail: "",
  });

  const submit = useSubmitStory({
    mutation: {
      onSuccess: () => setSubmitted(true),
      onError: () => {
        toast({
          title: "Couldn't submit story",
          description: "Please try again or email hello@strokelyfe.org.",
          variant: "destructive",
        });
      },
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit.mutate({
      data: {
        title: form.title,
        handle: form.handle,
        pullQuote: form.pullQuote,
        body: form.body,
        focusArea: form.focusArea || undefined,
        recoveryStage: form.recoveryStage || undefined,
        submitterEmail: form.submitterEmail || undefined,
      },
    });
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Story received.</h1>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Thank you. We read every submission personally. If we publish your story, we'll reach out to confirm before it goes live.
          </p>
          <p className="text-muted-foreground text-sm">
            Questions? Email <a href="mailto:hello@strokelyfe.org" className="text-primary hover:underline">hello@strokelyfe.org</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-20 bg-foreground text-background" data-testid="section-submit-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Share Your Story</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Your story might be the thing that gets someone else through tomorrow.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            We publish real recovery stories from real survivors. No polish required. Write it the way you'd tell it to a friend.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-submit-form">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit} data-testid="form-submit-story" className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="handle">Your name or handle <span className="text-primary">*</span></Label>
                    <Input
                      id="handle"
                      name="handle"
                      value={form.handle}
                      onChange={handleChange}
                      placeholder="e.g. Maria S. or just Maria"
                      required
                      className="mt-1"
                      data-testid="input-handle"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Use a first name and initial if you prefer privacy.</p>
                  </div>
                  <div>
                    <Label htmlFor="submitterEmail">Email (optional)</Label>
                    <Input
                      id="submitterEmail"
                      name="submitterEmail"
                      type="email"
                      value={form.submitterEmail}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="mt-1"
                      data-testid="input-submitter-email"
                    />
                    <p className="text-xs text-muted-foreground mt-1">So we can reach you before publishing.</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Story title <span className="text-primary">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder='e.g. "Getting My Voice Back" or "Day 1 to Day 200"'
                    required
                    className="mt-1"
                    data-testid="input-title"
                  />
                </div>

                <div>
                  <Label htmlFor="pullQuote">One sentence that captures your story <span className="text-primary">*</span></Label>
                  <Input
                    id="pullQuote"
                    name="pullQuote"
                    value={form.pullQuote}
                    onChange={handleChange}
                    placeholder="e.g. &quot;I got my voice back. It wasn't instant, but I got it back.&quot;"
                    required
                    className="mt-1"
                    data-testid="input-pull-quote"
                  />
                  <p className="text-xs text-muted-foreground mt-1">This appears as the preview quote on the Stories page.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="focusArea">Focus area</Label>
                    <Select value={form.focusArea} onValueChange={(v) => setForm((p) => ({ ...p, focusArea: v }))}>
                      <SelectTrigger id="focusArea" className="mt-1" data-testid="select-focus-area">
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent>
                        {FOCUS_AREAS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="recoveryStage">Where you are in recovery</Label>
                    <Select value={form.recoveryStage} onValueChange={(v) => setForm((p) => ({ ...p, recoveryStage: v }))}>
                      <SelectTrigger id="recoveryStage" className="mt-1" data-testid="select-recovery-stage">
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent>
                        {RECOVERY_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="body">Your story <span className="text-primary">*</span></Label>
                  <Textarea
                    id="body"
                    name="body"
                    value={form.body}
                    onChange={handleChange}
                    placeholder="Write your story here. It can be a few paragraphs or several pages. Write it the way you'd tell it."
                    rows={10}
                    required
                    className="mt-1"
                    data-testid="input-body"
                  />
                </div>

                <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                  <strong className="text-foreground">Before you submit:</strong> We review every story before publishing. We may edit for length with your approval but never change your words. Your contact info is never shared. By submitting you give Stroke Lyfe permission to publish your story on this site.
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={submit.isPending}
                  data-testid="button-submit-story"
                >
                  {submit.isPending ? "Submitting..." : "Submit your story →"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
