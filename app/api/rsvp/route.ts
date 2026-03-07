import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'Trinhpham95@gmail.com';

export async function POST(req: NextRequest) {
  const { name, phone, attend, guests, message } = await req.json();

  const attendLabel: Record<string, string> = {
    yes:   '✓ Vâng, tôi sẽ đến',
    no:    '✕ Rất tiếc, tôi không đến được',
    maybe: '? Có thể tôi sẽ đến',
  };

  try {
    await resend.emails.send({
      from:    'Wedding RSVP <onboarding@resend.dev>',
      to:      TO_EMAIL,
      subject: `RSVP từ ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px;background:#faf8f4;color:#3a3028;">
          <h2 style="color:#c9a254;font-size:1.6rem;margin-bottom:24px;border-bottom:1px solid #c9a254;padding-bottom:12px;">
            Thông tin xác nhận tham dự
          </h2>
          <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">
            <tr><td style="padding:8px 0;color:#8a7d6e;width:40%;">Họ và tên</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#8a7d6e;">Số điện thoại</td><td style="padding:8px 0;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#8a7d6e;">Tham dự</td><td style="padding:8px 0;">${attendLabel[attend] ?? attend}</td></tr>
            <tr><td style="padding:8px 0;color:#8a7d6e;">Số người</td><td style="padding:8px 0;">${guests || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#8a7d6e;vertical-align:top;">Lời nhắn</td><td style="padding:8px 0;">${message || '—'}</td></tr>
          </table>
          <p style="margin-top:32px;font-size:0.8rem;color:#8a7d6e;text-align:center;">
            Quốc Thịnh &amp; Đoan Trinh · 14 . 03 . 2026
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
