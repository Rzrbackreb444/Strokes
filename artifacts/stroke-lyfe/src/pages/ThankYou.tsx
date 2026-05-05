import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, CheckCircle2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

interface VerifyResult {
  sessionId: string;
  amountCents: number;
  donorName: string | null;
  donorEmail: string | null;
  isRecurring: boolean;
  kind: string;
  tributeOf: string | null;
  recipientName: string | null;
  scholarshipTier: string | null;
  paymentStatus: string;
  receiptSent: boolean;
}

function dollars(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function impactStatement(cents: number, kind: string, tierName?: string | null): string {
  if (kind === "gift" && tierName) return `You've gifted a ${tierName} Scholarship at Stroke Recovery Academy.`;
  if (cents >= 99700) return "You've funded an Elite scholarship — 1:1 coaching with Nick and a custom recovery plan for one survivor.";
  if (cents >= 29700) return "You've sponsored a Mentored scholarship — 3 months of group coaching for one survivor.";
  if (cents >= 9700) return "You've funded a full Survivor Scholarship into Stroke Recovery Academy.";
  if (cents >= 5000) return "You've covered transportation support for multiple therapy appointments.";
  if (cents >= 2500) return "You've funded one week of AI coaching tools for a survivor.";
  return "Your gift goes directly to survivor programs.";
}

export default function ThankYou() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");

  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(!!sessionId);
  const [verifyError, setVerifyError] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`${BASE}api/donations/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data: VerifyResult) => {
        setResult(data);
        setLoading(false);
      })
      .catch(() => {
        setVerifyError(true);
        setLoading(false);
      });
  }, [sessionId]);

  return (
    <div className="min-h-[70vh] flex items-center" data-testid="section-thank-you">
      <div className="container mx-auto px-4 max-w-2xl py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Heart className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Thank you.
        </h1>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8" data-testid="loading-verify">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Confirming your payment…</span>
          </div>
        )}

        {!loading && result && (
          <div className="text-left bg-muted rounded-lg p-6 mb-6" data-testid="card-confirmation">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                {result.donorName && (
                  <p className="font-semibold text-foreground">{result.donorName}</p>
                )}
                <p className="text-2xl font-bold text-primary mt-0.5">
                  {dollars(result.amountCents)}
                  {result.isRecurring && <span className="text-base font-normal text-muted-foreground ml-1">/ month</span>}
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground font-medium mb-2">
              {impactStatement(result.amountCents, result.kind, result.scholarshipTier)}
            </p>
            {result.tributeOf && (
              <p className="text-sm text-muted-foreground mt-2">
                Given in honor of <strong>{result.tributeOf}</strong>.
              </p>
            )}
            {result.recipientName && result.kind === "gift" && (
              <p className="text-sm text-muted-foreground mt-2">
                Gifted to: <strong>{result.recipientName}</strong>. They'll receive an email with activation instructions.
              </p>
            )}
            {result.donorEmail && (
              <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                {result.receiptSent
                  ? <>A tax receipt has been sent to <strong>{result.donorEmail}</strong>.</>
                  : <>A tax receipt will be sent to <strong>{result.donorEmail}</strong> shortly.</>
                }
              </p>
            )}
          </div>
        )}

        {!loading && !result && !verifyError && (
          <>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Your generosity is why this works. A real survivor on a real waitlist is going to be helped because of what you just did. We'll send you a receipt and — with your permission — let you know when they activate.
            </p>
          </>
        )}

        {!loading && verifyError && (
          <p className="text-muted-foreground mb-4" data-testid="verify-error">
            Your payment was received. We're having trouble loading the confirmation details — please check your email for a receipt.
          </p>
        )}

        <p className="text-muted-foreground leading-relaxed mb-8 text-sm" data-testid="tax-statement">
          Stroke Lyfe Inc. is a 501(c)(3) nonprofit. EIN: 99-1313589. Your donation is tax-deductible to the fullest extent of the law. No goods or services were provided in exchange for this gift.
        </p>

        <div className="bg-muted rounded-lg p-6 mb-8 text-left" data-testid="card-academy-cta">
          <h2 className="font-serif text-lg font-bold text-foreground mb-2">Looking for day-to-day recovery tools?</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Stroke Recovery Academy is our partner platform — daily routines, AI coaching, exercise library, and a community of people who understand.
          </p>
          <a
            href="https://strokerecoveryacademy.com?utm_source=strokelyfe&utm_medium=site&utm_campaign=thankyou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-medium hover:underline"
            data-testid="link-academy-thankyou"
          >
            Visit Stroke Recovery Academy →
          </a>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild data-testid="button-thankyou-home">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" data-testid="button-thankyou-stories">
            <Link href="/stories">Read survivor stories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
