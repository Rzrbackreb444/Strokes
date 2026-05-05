export default function Privacy() {
  return (
    <div className="py-16 bg-background" data-testid="section-privacy">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: January 1, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">1. Who we are</h2>
            <p>
              Stroke Lyfe Inc. ("Stroke Lyfe," "we," "our," or "us") is a 501(c)(3) nonprofit organization (EIN: 99-1313589).
              This Privacy Policy explains how we collect, use, and protect information when you visit strokelyfe.org or interact with our programs.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">2. Information we collect</h2>
            <p>We collect information you give us directly, including:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Name and email address when you donate, sign up for our mailing list, or contact us</li>
              <li>Payment information (processed by Stripe — we do not store card numbers)</li>
              <li>Story submissions and personal recovery information you choose to share</li>
              <li>Messages you send through our contact form</li>
            </ul>
            <p className="mt-3">We also collect limited data automatically, including IP address, browser type, and pages visited, for security and analytics purposes.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">3. How we use your information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process donations and send tax receipts</li>
              <li>To send program updates and newsletters (with your consent)</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To publish survivor stories (only with your explicit written permission)</li>
              <li>To improve our website and programs</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">4. We do not sell your data</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Ever. We share information only with service providers who help us operate our programs (such as our payment processor and email platform), under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">5. Data retention</h2>
            <p>
              We retain donor records for seven years as required by IRS regulations. Email subscribers can unsubscribe at any time. Contact messages are retained for three years. You may request deletion of your personal data at any time by emailing hello@strokelyfe.org.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">6. Cookies</h2>
            <p>
              Our website uses minimal cookies for session management and basic analytics. We do not use advertising cookies or third-party tracking pixels.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">7. Your rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Contact us at hello@strokelyfe.org to exercise these rights. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">8. Contact</h2>
            <p>
              Questions about this policy? Email <a href="mailto:hello@strokelyfe.org" className="text-primary hover:underline">hello@strokelyfe.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
