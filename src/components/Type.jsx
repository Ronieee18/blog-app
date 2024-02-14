// TypingEffect.js
import React, { useState, useEffect } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ text, typingSpeed, className, style }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;

    if (currentIndex < text.length) {
      interval = setInterval(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);
    }

    return () => clearInterval(interval);
  }, [currentIndex, text, typingSpeed]);

  return (
    <span className={`typing-text ${className}`} style={style}>
      {displayText}
      <span className="cursor" />
    </span>
  );
};

export default TypingEffect;
