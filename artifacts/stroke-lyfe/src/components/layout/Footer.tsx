import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEmailSignup } from "@workspace/api-client-react";
import { SiFacebook, SiInstagram, SiYoutube, SiTiktok } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
const logo = `${import.meta.env.BASE_URL}assets/logo.png`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const signup = useEmailSignup({
    mutation: {
      onSuccess: () => {
        toast({ title: "You're in.", description: "One update per month. No noise." });
        setEmail("");
      },
      onError: (err: unknown) => {
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        if (msg.includes("409") || msg.toLowerCase().includes("already")) {
          toast({ title: "Already subscribed", description: "You're on the list." });
        } else {
          toast({ title: "Couldn't sign up", description: "Try again in a moment.", variant: "destructive" });
        }
      },
    },
  });

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    signup.mutate({ data: { email, source: "footer" } });
  }

  return (
    <footer className="bg-foreground text-background/90" data-testid="footer">
      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Org info */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Stroke Lyfe logo" className="h-14 w-auto object-contain mb-3 brightness-200" />
            <p className="text-sm font-semibold text-background/90">Stroke Lyfe Inc.</p>
            <p className="text-sm text-background/60 mt-1">501(c)(3) Nonprofit</p>
            <p className="text-sm text-background/60" data-testid="text-ein">EIN: 99-1313589</p>
            <p className="text-sm text-background/60 mt-2">622 South River Rd.<br />Lavaca, AR 72941</p>
            {/* Email signup */}
            <form onSubmit={handleSignup} className="mt-4 flex gap-2" data-testid="form-email-signup">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 text-sm"
                aria-label="Email address for mailing list"
                data-testid="input-email-signup"
                required
              />
              <Button
                type="submit"
                size="sm"
                variant="outline"
                disabled={signup.isPending}
                className="border-background/30 text-background hover:bg-background/10 shrink-0"
                data-testid="button-email-signup"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-background mb-3 uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2">
              <li><Link href="/programs" className="text-sm text-background/60 hover:text-background transition-colors">Survivor Scholarships</Link></li>
              <li><Link href="/programs" className="text-sm text-background/60 hover:text-background transition-colors">Survivor Connect</Link></li>
              <li><Link href="/programs" className="text-sm text-background/60 hover:text-background transition-colors">Family Support</Link></li>
              <li><Link href="/programs" className="text-sm text-background/60 hover:text-background transition-colors">Resource Library</Link></li>
              <li><Link href="/gift" className="text-sm text-background/60 hover:text-background transition-colors">Gift a Scholarship</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-background mb-3 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/stories" className="text-sm text-background/60 hover:text-background transition-colors">Story Library</Link></li>
              <li><Link href="/submit-story" className="text-sm text-background/60 hover:text-background transition-colors">Share Your Story</Link></li>
              <li><Link href="/faq" className="text-sm text-background/60 hover:text-background transition-colors">FAQ</Link></li>
              <li><Link href="/programs" className="text-sm text-background/60 hover:text-background transition-colors">Family Support Guides</Link></li>
              <li>
                <a
                  href="https://strokerecoveryacademy.com?utm_source=strokelyfe&utm_medium=site&utm_campaign=footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  Recovery Academy ↗
                </a>
              </li>
              <li><Link href="/contact" className="text-sm text-background/60 hover:text-background transition-colors">Get Help</Link></li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h4 className="text-sm font-semibold text-background mb-3 uppercase tracking-wider">Organization</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-background/60 hover:text-background transition-colors">About Us</Link></li>
              <li><Link href="/vision" className="text-sm text-background/60 hover:text-background transition-colors">Our Vision</Link></li>
              <li><Link href="/stories" className="text-sm text-background/60 hover:text-background transition-colors">Survivor Stories</Link></li>
              <li><Link href="/transparency" className="text-sm text-background/60 hover:text-background transition-colors">Transparency</Link></li>
              <li><Link href="/contact" className="text-sm text-background/60 hover:text-background transition-colors">Contact Nick</Link></li>
              <li><Link href="/donate" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">Donate</Link></li>
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-8 flex gap-4" aria-label="Social media links">
          <a href="https://linkedin.com/company/strokelyfe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-background/50 hover:text-background transition-colors" data-testid="link-social-linkedin">
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a href="https://tiktok.com/@nickkremers" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-background/50 hover:text-background transition-colors" data-testid="link-social-tiktok">
            <SiTiktok className="h-5 w-5" />
          </a>
          <a href="https://facebook.com/NicholasKremersSr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-background/50 hover:text-background transition-colors" data-testid="link-social-facebook">
            <SiFacebook className="h-5 w-5" />
          </a>
          <a href="https://instagram.com/strokelyfe" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-background/50 hover:text-background transition-colors" data-testid="link-social-instagram">
            <SiInstagram className="h-5 w-5" />
          </a>
          <a href="https://youtube.com/@strokelyfe" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-background/50 hover:text-background transition-colors" data-testid="link-social-youtube">
            <SiYoutube className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-background/50">© 2026 Stroke Lyfe Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/legal/privacy" className="text-xs text-background/50 hover:text-background transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="text-xs text-background/50 hover:text-background transition-colors">Terms</Link>
            <Link href="/legal/donor-rights" className="text-xs text-background/50 hover:text-background transition-colors">Donor Bill of Rights</Link>
          </div>
          <p className="text-xs text-background/40 text-center sm:text-right">Donations are tax-deductible to the fullest extent of the law.</p>
        </div>
      </div>
    </footer>
  );
}
