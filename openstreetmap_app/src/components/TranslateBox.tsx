// src/components/TranslateBox.tsx
import React, { useState } from 'react';
import { translateText } from '../services/Translator';

const TranslateBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLang, setDetectedLang] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const result = await translateText(inputText, 'vi');
    if (result.success) {
      setResultText(result.translated);
      setDetectedLang(result.sourceLang);
    } else {
      setResultText("Lỗi.");
    }
    setIsLoading(false);
  };

  // --- STYLE NÚT TRÒN (Giữ nguyên, chỉ tăng z-index cao hơn hẳn) ---
  const toggleButtonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: 2000, // Cao hơn hộp chính
    width: '44px', // Nhỏ hơn xíu
    height: '44px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  };

  // --- STYLE HỘP DỊCH CHÍNH (Tối ưu nhỏ gọn) ---
  const mainBoxStyle: React.CSSProperties = {
    position: 'fixed',
    // Dịch lên trên nút tròn
    bottom: '75px', 
    // Dịch sang phải một chút để không che góc sát lề
    left: '25px',
    zIndex: 1900,
    backgroundColor: '#222', // Màu nền tối như ảnh bạn gửi
    color: 'white',
    padding: '12px', // Padding nhỏ hơn
    border: '1px solid #444',
    borderRadius: '10px',
    width: '240px', // Chiều rộng nhỏ gọn hơn (cũ là 300px)
    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', // Khoảng cách giữa các phần tử nhỏ hơn
    
    // Hiệu ứng hiện ra
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)'
  };

  return (
    <>
      {/* --- PHẦN 1: HỘP DỊCH CHÍNH --- */}
      <div style={mainBoxStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Dịch nhanh</h3>
           <button onClick={() => setIsOpen(false)} style={{border: 'none', background: 'transparent', fontSize: '16px', cursor: 'pointer', color: '#888', padding: '0 4px'}}>×</button>
        </div>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập text..."
          style={{ 
            width: '100%', 
            height: '50px', // Cao vừa đủ 2 dòng
            padding: '4px', 
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#333',
            color: 'white',
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: '13px'
          }}
        />

        <button 
          onClick={handleTranslate} 
          disabled={isLoading || !inputText.trim()}
          style={{ 
            padding: '8px', // Padding nút nhỏ hơn
            backgroundColor: isLoading ? '#555' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: isLoading || !inputText.trim() ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            transition: 'background 0.2s'
          }}
        >
          {isLoading ? '...' : 'Dịch sang Tiếng Việt'}
        </button>

        {resultText && (
          <div style={{ 
            padding: '8px 10px', 
            backgroundColor: '#f1f3f4', // Nền sáng cho kết quả dễ đọc
            borderRadius: '6px',
            fontSize: '13px',
            borderLeft: '3px solid #28a745',
            color: '#202124',
            marginTop: '2px'
          }}>
            {detectedLang && <div style={{ fontSize: '10px', color: '#666', marginBottom: '2px', textTransform: 'uppercase' }}>Từ: {detectedLang}</div>}
            <div style={{ lineHeight: '1.3', fontWeight: '500' }}>{resultText}</div>
          </div>
        )}
      </div>

      {/* --- PHẦN 2: NÚT TRÒN NHỎ --- */}
      <div 
        style={toggleButtonStyle} 
        onClick={() => setIsOpen(!isOpen)}
        title="Mở hộp dịch"
      >
        {isOpen ? '✕' : <span style={{ fontSize: '18px' }}>文</span>} 
      </div>
    </>
  );
};

export default TranslateBox;