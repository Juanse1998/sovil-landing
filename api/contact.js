import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, stage, message, stages } = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'juansesosa98@gmail.com',
      replyTo: email,
      subject: `Nuevo contacto: ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="margin-bottom: 24px;">Nuevo mensaje desde sovil.co</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #686868; width: 120px;">Nombre</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #686868;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #686868;">Empresa</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${company}</td></tr>` : ''}
            ${stages ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #686868;">Etapa</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${stages[stage] ?? stage}</td></tr>` : ''}
          </table>
          <div style="margin-top: 24px;">
            <div style="color: #686868; margin-bottom: 8px;">Mensaje</div>
            <div style="background: #f4f4f4; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error enviando el email' });
  }
}
