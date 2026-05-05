export default function DonorRights() {
  return (
    <div className="py-16 bg-background" data-testid="section-donor-rights">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Donor Bill of Rights</h1>
        <p className="text-sm text-muted-foreground mb-10">Adopted from the Association of Fundraising Professionals (AFP) Donor Bill of Rights</p>

        <div className="bg-muted rounded-lg p-6 mb-10">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Stroke Lyfe Inc. is committed to the highest ethical standards in fundraising. We have adopted the AFP Donor Bill of Rights and pledge to honor each of the following rights for every person who supports our mission.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              num: "I",
              right: "To be informed of the organization's mission, of the way the organization intends to use donated resources, and of its capacity to use donations effectively for their intended purposes.",
            },
            {
              num: "II",
              right: "To be informed of the identity of those serving on the organization's governing board, and to expect the board to exercise prudent judgment in its stewardship responsibilities.",
            },
            {
              num: "III",
              right: "To have access to the organization's most recent financial statements.",
            },
            {
              num: "IV",
              right: "To be assured their gifts will be used for the purposes for which they were given.",
            },
            {
              num: "V",
              right: "To receive appropriate acknowledgment and recognition.",
            },
            {
              num: "VI",
              right: "To be assured that information about their donations is handled with respect and with confidentiality to the extent provided by law.",
            },
            {
              num: "VII",
              right: "To expect that all relationships with individuals representing organizations of interest to the donor will be professional in nature.",
            },
            {
              num: "VIII",
              right: "To be informed whether those seeking donations are volunteers, employees of the organization, or hired solicitors.",
            },
            {
              num: "IX",
              right: "To have the opportunity for their names to be deleted from mailing lists that an organization may intend to share.",
            },
            {
              num: "X",
              right: "To feel free to ask questions when making a donation and to receive prompt, truthful, and forthright answers.",
            },
          ].map((item) => (
            <div key={item.num} className="flex gap-5 p-5 rounded-lg border border-border bg-background" data-testid={`card-right-${item.num}`}>
              <div className="font-serif font-bold text-primary text-lg w-8 shrink-0 pt-0.5">{item.num}.</div>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.right}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-muted rounded-lg">
          <h2 className="font-serif text-lg font-bold text-foreground mb-2">Questions about your rights as a donor?</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Contact us at any time. We welcome questions and will respond promptly.
          </p>
          <a href="mailto:hello@strokelyfe.org" className="text-sm text-primary font-medium hover:underline" data-testid="link-donor-rights-email">
            hello@strokelyfe.org
          </a>
        </div>
      </div>
    </div>
  );
}
