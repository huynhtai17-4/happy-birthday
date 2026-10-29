import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../../utils/soundEffects';

interface TypewriterTextProps {
  paragraphs: string[];
  speed?: number;
  isCompleted: boolean;
  onComplete: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  paragraphs,
  speed = 28,
  isCompleted,
  onComplete,
}) => {
  const fullText = paragraphs.join('\n\n');
  const [displayedLength, setDisplayedLength] = useState(isCompleted ? fullText.length : 0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isCompleted) {
      setDisplayedLength(fullText.length);
      return;
    }

    setDisplayedLength(0);
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx += 2; // Type 2 chars per tick for natural reading rhythm
      if (currentIdx >= fullText.length) {
        setDisplayedLength(fullText.length);
        clearInterval(interval);
        onCompleteRef.current();
      } else {
        setDisplayedLength(currentIdx);
        // Play soft sparkle sound intermittently
        if (currentIdx % 30 === 0) {
          soundEngine.playTypewriterSparkle();
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed, isCompleted]);

  const visibleText = fullText.slice(0, displayedLength);
  const visibleParagraphs = visibleText.split('\n\n');

  return (
    <div className="space-y-4 text-justify sm:text-left">
      {visibleParagraphs.map((para, idx) => (
        <p key={idx} className="font-serif text-base sm:text-lg text-amber-950 leading-relaxed font-normal whitespace-pre-line">
          {para}
          {idx === visibleParagraphs.length - 1 && displayedLength < fullText.length && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-pink-700 animate-pulse" />
          )}
        </p>
      ))}
    </div>
  );
};

