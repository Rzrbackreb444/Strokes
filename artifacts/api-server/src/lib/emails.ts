import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Stroke Lyfe <noreply@strokelyfe.org>";
const EIN = "99-1313589";
const ADDRESS = "622 South River Rd., Lavaca, AR 72941";

function dollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function baseStyle() {
  return `font-family: Georgia, serif; background: #fdf8f0; padding: 0; margin: 0;`;
}

function containerStyle() {
  return `max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;`;
}

function headerHtml(title: string) {
  return `
    <div style="background: #1a1a18; padding: 32px 40px;">
      <p style="color: #b8940a; font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 8px;">Stroke Lyfe Inc.</p>
      <h1 style="color: #ffffff; font-size: 26px; margin: 0; line-height: 1.3;">${title}</h1>
    </div>`;
}

function footerHtml() {
  return `
    <div style="background: #f5f0e8; padding: 24px 40px; border-top: 1px solid #e8e0d0;">
      <p style="font-size: 11px; color: #888; margin: 0 0 4px;">Stroke Lyfe Inc. is a 501(c)(3) public charity (EIN: ${EIN}).</p>
      <p style="font-size: 11px; color: #888; margin: 0 0 4px;">Your donation is tax-deductible to the fullest extent of the law. No goods or services were provided in exchange for this gift.</p>
      <p style="font-size: 11px; color: #888; margin: 0;">${ADDRESS}</p>
    </div>`;
}

export async function sendDonationReceipt(opts: {
  to: string;
  donorName: string;
  amountCents: number;
  isRecurring: boolean;
  tributeOf?: string | null;
}) {
  const { to, donorName, amountCents, isRecurring, tributeOf } = opts;
  const amt = dollars(amountCents);
  const freq = isRecurring ? "monthly" : "one-time";
  const name = donorName || "Friend";

  const impactLine = (() => {
    const c = amountCents;
    if (c >= 99700) return "funds an Elite scholarship — 1:1 coaching with Nick and a custom recovery plan.";
    if (c >= 29700) return "sponsors a Mentored scholarship — 3 months of group coaching for one survivor.";
    if (c >= 9700) return "funds one full Survivor Scholarship into Stroke Recovery Academy.";
    if (c >= 5000) return "covers transportation support for multiple therapy appointments.";
    if (c >= 2500) return "funds one week of AI coaching tools for a survivor.";
    return "goes directly to survivor programs.";
  })();

  const html = `
<html><body style="${baseStyle()}">
<div style="${containerStyle()}">
  ${headerHtml("Your donation receipt")}
  <div style="padding: 32px 40px;">
    <p style="font-size: 16px; color: #1a1a18; margin: 0 0 16px;">Dear ${name},</p>
    <p style="font-size: 15px; color: #444; margin: 0 0 24px; line-height: 1.6;">
      Thank you for your ${freq} donation of <strong style="color: #1a1a18;">${amt}</strong>.
      This gift ${impactLine}
    </p>
    ${tributeOf ? `<p style="font-size: 14px; color: #666; background: #f9f5ed; padding: 12px 16px; border-radius: 6px; margin: 0 0 24px;">This donation was made in honor of <strong>${tributeOf}</strong>.</p>` : ""}
    <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Amount</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #1a1a18; font-size: 14px;">${amt}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Frequency</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; color: #1a1a18; font-size: 14px; text-transform: capitalize;">${freq}</td></tr>
      <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Organization</td><td style="padding: 10px 0; text-align: right; color: #1a1a18; font-size: 14px;">Stroke Lyfe Inc.</td></tr>
    </table>
    <p style="font-size: 14px; color: #444; line-height: 1.6; margin: 0 0 20px;">
      We read every donor name personally. When a survivor activates their scholarship because of your gift, we want you to know.
    </p>
    <a href="https://strokerecoveryacademy.com?utm_source=receipt&utm_medium=email&utm_campaign=donation" style="display: inline-block; background: #b8940a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: bold;">Visit Stroke Recovery Academy →</a>
  </div>
  ${footerHtml()}
</div>
</body></html>`;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Your ${amt} donation receipt — Stroke Lyfe Inc.`,
    html,
  });
}

export async function sendGiftDonorConfirmation(opts: {
  to: string;
  giverName: string;
  recipientName: string;
  amountCents: number;
  tierName: string;
}) {
  const { to, giverName, recipientName, amountCents, tierName } = opts;
  const amt = dollars(amountCents);

  const html = `
<html><body style="${baseStyle()}">
<div style="${containerStyle()}">
  ${headerHtml("You've gifted a scholarship")}
  <div style="padding: 32px 40px;">
    <p style="font-size: 16px; color: #1a1a18; margin: 0 0 16px;">Dear ${giverName || "Friend"},</p>
    <p style="font-size: 15px; color: #444; margin: 0 0 24px; line-height: 1.6;">
      Your gift has been received. <strong>${recipientName}</strong> will receive a personalized notification with everything they need to activate their scholarship.
    </p>
    <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Gift recipient</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #1a1a18; font-size: 14px;">${recipientName}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Scholarship tier</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; color: #1a1a18; font-size: 14px;">${tierName}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Amount</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #1a1a18; font-size: 14px;">${amt}</td></tr>
      <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Organization</td><td style="padding: 10px 0; text-align: right; color: #1a1a18; font-size: 14px;">Stroke Lyfe Inc.</td></tr>
    </table>
    <p style="font-size: 14px; color: #444; line-height: 1.6;">
      This is a tax-deductible donation. No goods or services were provided in exchange for this gift.
    </p>
  </div>
  ${footerHtml()}
</div>
</body></html>`;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Gift confirmed — ${tierName} Scholarship for ${recipientName}`,
    html,
  });
}

export async function sendTributeNotification(opts: {
  to: string;
  donorName: string;
  honoredName: string;
  amountCents: number;
}) {
  const { to, donorName, honoredName, amountCents } = opts;
  const amt = dollars(amountCents);

  const html = `
<html><body style="${baseStyle()}">
<div style="${containerStyle()}">
  ${headerHtml("A donation was made in their honor")}
  <div style="padding: 32px 40px;">
    <p style="font-size: 15px; color: #444; margin: 0 0 24px; line-height: 1.6;">
      <strong>${donorName || "Someone"}</strong> made a <strong>${amt}</strong> donation to Stroke Lyfe Inc. in honor of <strong>${honoredName}</strong>.
    </p>
    <p style="font-size: 15px; color: #444; margin: 0 0 24px; line-height: 1.6;">
      Stroke Lyfe Inc. is a 501(c)(3) public charity (EIN ${EIN}) dedicated to helping stroke survivors access recovery resources.
    </p>
    <a href="https://strokelyfe.org?utm_source=tributenotification&utm_medium=email&utm_campaign=tribute" style="display: inline-block; background: #b8940a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: bold;">Learn more about Stroke Lyfe →</a>
  </div>
  ${footerHtml()}
</div>
</body></html>`;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `${donorName || "Someone"} made a donation in honor of ${honoredName} — Stroke Lyfe Inc.`,
    html,
  });
}

export async function sendGiftRecipientNotification(opts: {
  to: string;
  recipientName: string;
  giverName: string;
  tierName: string;
  amountCents: number;
  message?: string | null;
}) {
  const { to, recipientName, giverName, tierName, amountCents, message } = opts;
  const amt = dollars(amountCents);
  const activateUrl = `https://strokerecoveryacademy.com?utm_source=giftnotification&utm_medium=email&utm_campaign=gift&utm_content=${tierName.toLowerCase()}`;

  const tierDesc = (() => {
    if (amountCents >= 99700) return "Elite — 1:1 coaching with Nick Kremers, a custom recovery plan, and lifetime Academy access.";
    if (amountCents >= 29700) return "Mentored — 3 months of Academy access plus weekly group coaching sessions.";
    return "Survivor — Full Stroke Recovery Academy access including daily routines, AI coaching, exercise library, and community.";
  })();

  const html = `
<html><body style="${baseStyle()}">
<div style="${containerStyle()}">
  ${headerHtml("Someone gifted you a scholarship")}
  <div style="padding: 32px 40px;">
    <p style="font-size: 16px; color: #1a1a18; margin: 0 0 16px;">Dear ${recipientName || "Friend"},</p>
    <p style="font-size: 15px; color: #444; margin: 0 0 20px; line-height: 1.6;">
      <strong>${giverName}</strong> has gifted you a <strong>${tierName} Scholarship</strong> (${amt}) through Stroke Lyfe Inc. — a 501(c)(3) nonprofit dedicated to helping stroke survivors access real recovery resources regardless of income or insurance.
    </p>
    ${message ? `<div style="background: #f9f5ed; border-left: 3px solid #b8940a; padding: 16px 20px; margin: 0 0 24px; border-radius: 0 6px 6px 0;"><p style="font-size: 14px; color: #444; margin: 0; line-height: 1.6; font-style: italic;">"${message}"</p><p style="font-size: 12px; color: #888; margin: 8px 0 0;">— ${giverName}</p></div>` : ""}
    <div style="background: #f0f7f5; border-radius: 8px; padding: 20px 24px; margin: 0 0 24px;">
      <p style="font-size: 13px; font-weight: bold; color: #1a3a30; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Your scholarship includes:</p>
      <p style="font-size: 14px; color: #2d5244; margin: 0; line-height: 1.6;">${tierDesc}</p>
    </div>
    <p style="font-size: 15px; color: #444; margin: 0 0 24px; line-height: 1.6;">To activate your scholarship, visit Stroke Recovery Academy and use the link below:</p>
    <a href="${activateUrl}" style="display: inline-block; background: #b8940a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 15px; font-weight: bold;">Activate your scholarship →</a>
    <p style="font-size: 12px; color: #888; margin: 16px 0 0;">Or copy this link: ${activateUrl}</p>
  </div>
  ${footerHtml()}
</div>
</body></html>`;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `${giverName} gifted you a ${tierName} Scholarship — Stroke Lyfe`,
    html,
  });
}
