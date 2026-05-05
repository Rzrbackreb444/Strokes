import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

export default function Transparency() {
  return (
    <div>
      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-transparency-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Financial Transparency</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Where the money goes.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            We run an open book. EIN 99-1313589. 501(c)(3) public charity. Every dollar accounted for.
          </p>
        </div>
      </section>

      {/* STATUS BANNER */}
      <section className="py-20 bg-background" data-testid="section-financials">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Newly registered callout */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-16 flex flex-col sm:flex-row gap-4 items-start">
            <div className="shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
              <span className="text-accent font-bold text-lg">!</span>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">We're just getting started.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stroke Lyfe Inc. is a newly registered 501(c)(3) — EIN 99-1313589, verified on GuideStar / Candid. We currently have $0 in gross receipts and $0 in assets. This page will update as we raise and spend our first dollars. We commit to publishing our Form 990 and annual financials as soon as they are available.
              </p>
            </div>
          </div>

          {/* Intended allocation */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Intended allocation — how we plan to spend every dollar raised</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-16">
            {[
              { pct: "87%", label: "Programs", detail: "Directly funds scholarships, coaching, and survivor support." },
              { pct: "9%", label: "Operations", detail: "Staff, technology, and infrastructure to run our programs." },
              { pct: "4%", label: "Fundraising", detail: "Costs of donor communication and campaign management." },
            ].map((item) => (
              <div key={item.pct} className="bg-muted rounded-lg p-8" data-testid={`card-allocation-${item.label.toLowerCase()}`}>
                <div className="font-serif text-5xl font-bold text-primary mb-2">{item.pct}</div>
                <div className="font-semibold text-foreground text-lg mb-2">{item.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Legal status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-muted rounded-lg p-6">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">Legal Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Organization type</span>
                  <span className="font-medium text-foreground">501(c)(3) Public Charity</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">EIN</span>
                  <span className="font-mono font-medium text-foreground" data-testid="text-transparency-ein">99-1313589</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Incorporated</span>
                  <span className="font-medium text-foreground">2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fiscal year</span>
                  <span className="font-medium text-foreground">January – December</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax deductibility</span>
                  <span className="font-medium text-foreground">Yes, full extent of law</span>
                </div>
              </div>
            </div>

            {/* Financials documents */}
            <div className="bg-muted rounded-lg p-6">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">Documents</h2>
              <div className="space-y-3">
                {[
                  { label: "Form 990", note: "Available after first full fiscal year" },
                  { label: "Annual Report", note: "Coming end of 2026" },
                  { label: "Audited Financial Statements", note: "Available after first full fiscal year" },
                ].map((doc) => (
                  <div
                    key={doc.label}
                    className="flex items-center justify-between w-full p-3 rounded-md border border-border bg-background text-sm"
                    data-testid={`button-download-${doc.label.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <div>
                      <span className="text-foreground font-medium block">{doc.label}</span>
                      <span className="text-xs text-muted-foreground">{doc.note}</span>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">We will publish all financial documents as they become available. No secrets.</p>
            </div>
          </div>

          {/* Board */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6" data-testid="heading-board">Board of Directors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Nick Kremers", title: "Executive Director", note: "Founder" },
                { name: "Lisa Kremers", title: "Board Member", note: "" },
                { name: "Debbie Kremers", title: "Board Member", note: "" },
              ].map((member) => (
                <Card key={member.name} data-testid={`card-board-transparency-${member.name.replace(/\s+/g, "-").toLowerCase()}`}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-foreground text-sm">{member.name}</p>
                    <p className="text-xs text-primary font-medium">{member.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{member.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Third-party ratings */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Third-party verification</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "GuideStar / Candid", desc: "Nonprofit transparency profile", href: "https://www.guidestar.org" },
                { name: "Charity Navigator", desc: "Independent financial ratings", href: "https://www.charitynavigator.org" },
                { name: "Candid", desc: "Foundation & nonprofit data", href: "https://candid.org" },
              ].map((org) => (
                <Card key={org.name} data-testid={`card-thirdparty-${org.name.replace(/\s+/g, "-").toLowerCase()}`}>
                  <CardContent className="p-5">
                    <p className="font-semibold text-foreground text-sm mb-1">{org.name}</p>
                    <p className="text-xs text-muted-foreground mb-3">{org.desc}</p>
                    <a
                      href={org.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      View profile <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Questions about our finances?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">We welcome scrutiny. Email us, request documents, or reach out to our board directly.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild data-testid="button-transparency-contact">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
