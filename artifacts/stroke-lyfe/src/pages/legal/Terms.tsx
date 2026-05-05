export default function Terms() {
  return (
    <div className="py-16 bg-background" data-testid="section-terms">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Terms of Use</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: January 1, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">1. Agreement</h2>
            <p>
              By using strokelyfe.org, you agree to these Terms of Use. If you do not agree, please do not use the site. These terms apply to all visitors, donors, and users of our programs.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">2. Use of the site</h2>
            <p>You may use this site for lawful purposes only. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Submit false or misleading information</li>
              <li>Impersonate any person or organization</li>
              <li>Use the site in any way that could damage or impair its operation</li>
              <li>Attempt to gain unauthorized access to any part of the site or its related systems</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">3. Donations</h2>
            <p>
              Donations to Stroke Lyfe Inc. are final and non-refundable except at our discretion. All donations are tax-deductible to the fullest extent of the law. EIN: 99-1313589. Tax receipts are provided automatically via email for donations of any amount.
            </p>
            <p className="mt-2">
              Donations do not create a contractual obligation for us to deliver any specific outcome. We use donations according to our published allocation: 87% programs, 9% operations, 4% fundraising.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">4. Story submissions</h2>
            <p>
              By submitting your story to Stroke Lyfe, you grant us a non-exclusive, royalty-free license to publish and share your story on our website, social media, and in fundraising materials. We will never publish your story without your explicit written consent. You may request removal of your story at any time by contacting hello@strokelyfe.org.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">5. Medical disclaimer</h2>
            <p>
              The information on this site is for educational and informational purposes only. It is not medical advice and should not be treated as such. Always consult a qualified healthcare professional before making any decisions about your health or recovery.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">6. Intellectual property</h2>
            <p>
              All content on this site — including text, graphics, logos, and images — is owned by Stroke Lyfe Inc. unless otherwise noted. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">7. Limitation of liability</h2>
            <p>
              Stroke Lyfe Inc. is not liable for any indirect, incidental, or consequential damages arising from your use of this site. Our total liability to you for any claim shall not exceed the amount you donated to us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">8. Changes to these terms</h2>
            <p>We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground">9. Contact</h2>
            <p>Questions? Email <a href="mailto:hello@strokelyfe.org" className="text-primary hover:underline">hello@strokelyfe.org</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
