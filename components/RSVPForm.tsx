'use client';
import { useState } from 'react';

export default function RSVPForm() {
  const [toast, setToast]     = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [attend, setAttend]   = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setToast('sending');

    const fd = new FormData(e.currentTarget);
    const body = {
      name:    fd.get('name')    as string,
      phone:   fd.get('phone')   as string,
      attend:  fd.get('attend')  as string,
      guests:  fd.get('guests')  as string,
      message: fd.get('message') as string,
    };

    try {
      const res = await fetch('/api/rsvp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });
      setToast(res.ok ? 'ok' : 'err');
    } catch {
      setToast('err');
    }

    if (toast !== 'err') {
      (e.target as HTMLFormElement).reset();
      setAttend('');
    }
    setTimeout(() => setToast('idle'), 4000);
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>

        {/* Name */}
        <div className="form-group">
          <label className="form-label">Họ và tên</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Nguyễn Văn A"
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">Số điện thoại</label>
          <input
            className="form-input"
            type="tel"
            name="phone"
            placeholder="0912 345 678"
          />
        </div>

        {/* Attendance */}
        <div className="form-group">
          <label className="form-label">Bạn sẽ đến chứ?</label>
          <div className="form-radio-group">
            {[
              { value: 'yes',   label: '✓  Vâng, tôi sẽ đến' },
              { value: 'no',    label: '✕  Rất tiếc, tôi không đến được' },
              { value: 'maybe', label: '?  Có thể tôi sẽ đến' },
            ].map(opt => (
              <label key={opt.value} className={`form-radio-btn${attend === opt.value ? ' active' : ''}`}>
                <input
                  type="radio"
                  name="attend"
                  value={opt.value}
                  required
                  onChange={() => setAttend(opt.value)}
                  style={{ display: 'none' }}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div className="form-group">
          <label className="form-label">Số người tham dự</label>
          <div className="form-select-wrap">
            <select className="form-input form-select" name="guests" defaultValue="">
              <option value="" disabled>Chọn số người</option>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n} {n === 5 ? 'người trở lên' : 'người'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="form-group">
          <label className="form-label">Lời nhắn đến cô dâu chú rể</label>
          <textarea
            className="form-input form-textarea"
            name="message"
            placeholder="Chúc mừng hạnh phúc..."
          />
        </div>

        <button type="submit" className="btn-submit" disabled={toast === 'sending'}>
          {toast === 'sending' ? 'ĐANG GỬI...' : 'GỬI XÁC NHẬN & LỜI CHÚC'}
        </button>
      </form>

      {toast === 'ok'  && <div className="toast show">Đã gửi thành công! Cảm ơn bạn rất nhiều. 💌</div>}
      {toast === 'err' && <div className="toast show" style={{ background: '#8b3a2a' }}>Có lỗi xảy ra, vui lòng thử lại.</div>}
    </>
  );
}
