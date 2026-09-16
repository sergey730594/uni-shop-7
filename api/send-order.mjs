import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, message } = req.body || {};

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Tortebi.com <orders@tortebi.com>',
      to: ['photomagiamailru@gmail.com'],
      reply_to: 'orders@tortebi.com',
      subject: `ახალი შეკვეთა — ${name}`,
      text: message,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}