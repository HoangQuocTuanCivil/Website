"use client";

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Đang gửi...');
        
        const form = e.target;
        const data = new FormData(form);
        const jsonData = Object.fromEntries(data);
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                setStatus('Gửi thành công! Chúng tôi sẽ liên hệ sớm.');
                form.reset();
            } else {
                setStatus('Có lỗi xảy ra. Hãy thử lại.');
            }
        } catch (error) {
            setStatus('Lỗi kết nối.');
        }
    };

    return (
        <section className="cta">
            <div className="container cta-container">
                <h2 className="cta-title" data-i18n="cta.title" suppressHydrationWarning>Sẵn sàng để bắt đầu dự án mới?</h2>
                <p className="cta-desc" data-i18n="cta.desc" suppressHydrationWarning>Hãy kết nối với chúng tôi ngay hôm nay để nhận được sự tư vấn chuyên sâu về giải pháp phù hợp nhất.</p>
                
                <form onSubmit={handleSubmit} style={{
                    display: 'flex', flexDirection: 'column', gap: '1rem', 
                    maxWidth: '500px', margin: '2rem auto 0', 
                    background: 'white', padding: '2.5rem', 
                    borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                    <input type="text" name="name" placeholder="Họ và tên" required style={{
                        padding: '1rem', outline: 'none', border: '1px solid #ddd', 
                        borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit'
                    }} />
                    <input type="email" name="email" placeholder="Email của bạn" required style={{
                        padding: '1rem', outline: 'none', border: '1px solid #ddd', 
                        borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit'
                    }} />
                    <textarea name="message" placeholder="Dự án của bạn..." required rows="4" style={{
                        padding: '1rem', outline: 'none', border: '1px solid #ddd', 
                        borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical'
                    }}></textarea>
                    
                    <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'Đang gửi...'} style={{marginTop: '1rem', width: '100%'}}>
                        {status === 'Đang gửi...' ? 'Đang xử lý...' : 'Gửi yêu cầu'}
                    </button>
                    {status && status !== 'Đang gửi...' && <p style={{color: status.includes('thành công') ? 'green' : 'red', marginTop: '1rem', fontWeight: 'bold'}} suppressHydrationWarning>{status}</p>}
                </form>
            </div>
        </section>
    );
}
