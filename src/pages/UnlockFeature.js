import React, { useState } from 'react';
import './css/UnlockFeature.css';

const UnlockFeature = () => {
  const [inputCode, setInputCode] = useState('');

  const handleInputChange = (event) => {
    setInputCode(event.target.value);
  };

  const handleUnlock = () => {
    if (inputCode === 'yourSecretCode') {
      console.log('解鎖成功！');
    } else {
      console.log('解鎖失敗，請輸入正確代碼。');
    }
  };

  return (
    <div className="unlock-container">
      <input
        type="text"
        placeholder="輸入兌換代碼"
        value={inputCode}
        onChange={handleInputChange}
      />
      <button onClick={handleUnlock}>解鎖</button>
    </div>
  );
};

export default UnlockFeature;
