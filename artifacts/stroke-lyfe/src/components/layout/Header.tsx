import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const logo = `${import.meta.env.BASE_URL}assets/logo.png`;

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Blog" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border" data-testid="header">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-logo">
          <img src={logo} alt="Stroke Lyfe logo" className="h-12 w-auto object-contain" />
          <div className="hidden sm:block">
            <div className="font-serif font-bold text-lg leading-tight text-foreground">Stroke Lyfe</div>
            <div className="text-xs text-muted-foreground leading-tight">501(c)(3) Nonprofit</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-foreground/80"
              }`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild size="sm" data-testid="button-donate-header">
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open navigation menu" data-testid="button-hamburger">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-6 pt-6">
              <Button asChild className="w-full" data-testid="button-donate-mobile">
                <Link href="/donate" onClick={() => setOpen(false)}>Donate Now</Link>
              </Button>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted ${
                      location === link.href ? "text-primary bg-muted" : "text-foreground"
                    }`}
                    data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
