import React, { useState, useEffect, useRef } from 'react';

interface GameRoomProps {
  onContinue: () => void;
}

interface FakeNewsItem {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  width: number;
  height: number;
}

const GameRoom: React.FC<GameRoomProps> = ({ onContinue }) => {
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [characterState, setCharacterState] = useState<'enter' | 'cover'>('enter');
  const [fakeNewsItems, setFakeNewsItems] = useState<FakeNewsItem[]>([]);
  const [showBeacon, setShowBeacon] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  const fakeNewsTexts = [
    "BREAKING: Aliens Contact Earth! 👽",
    "Scientists Discover Time Travel! ⏰",
    "FREE MONEY! Click Here! 💰",
    "You Won't BELIEVE This! 😱",
    "Government Hiding Secrets! 🚨",
    "Miracle Cure Found! 💊",
    "Celebrity Scandal EXPOSED! 🎭",
    "World Ending Tomorrow! 🌍",
    "Secret Society Revealed! 🔐",
    "Unlimited Power Source! ⚡"
  ];

  // Check if two rectangles overlap
  const checkCollision = (rect1: {x: number, y: number, width: number, height: number}, 
                         rect2: {x: number, y: number, width: number, height: number}) => {
    return !(rect1.x + rect1.width < rect2.x || 
             rect2.x + rect2.width < rect1.x || 
             rect1.y + rect1.height < rect2.y || 
             rect2.y + rect2.height < rect1.y);
  };

  // Generate non-overlapping positions
  const generateNonOverlappingPositions = (count: number): FakeNewsItem[] => {
    const items: FakeNewsItem[] = [];
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let newItem: FakeNewsItem | null = null;
      
      while (attempts < 100 && !newItem) {
        const x = Math.random() * 75 + 5; // Keep within 5-80% of screen
        const y = Math.random() * 75 + 5;
        const fontSize = (Math.random() * 0.5 + 0.8) * 12;
        const width = Math.max(fontSize * 8, 80); // Approximate width based on text
        const height = fontSize * 2; // Approximate height
        
        // Check if this position overlaps with existing items
        let hasCollision = false;
        for (const existingItem of items) {
          if (checkCollision(
            {x, y, width, height},
            {x: existingItem.x, y: existingItem.y, width: existingItem.width, height: existingItem.height}
          )) {
            hasCollision = true;
            break;
          }
        }
        
        if (!hasCollision) {
          newItem = {
            id: i,
            text: fakeNewsTexts[i % fakeNewsTexts.length],
            x,
            y,
            fontSize,
            width,
            height
          };
        }
        
        attempts++;
      }
      
      // If we couldn't find a non-overlapping position, place it anyway but with some offset
      if (!newItem) {
        newItem = {
          id: i,
          text: fakeNewsTexts[i % fakeNewsTexts.length],
          x: Math.random() * 75 + 5,
          y: Math.random() * 75 + 5,
          fontSize: (Math.random() * 0.5 + 0.8) * 12,
          width: 80,
          height: 20
        };
      }
      
      items.push(newItem);
    }
    
    return items;
  };

  useEffect(() => {
    // Start character animation sequence
    const timer1 = setTimeout(() => {
      startNewsBombardment();
    }, 2000); // Reduced from 3000

    const timer2 = setTimeout(() => {
      setCharacterState('cover');
    }, 6000); // Reduced from 8000

    const timer3 = setTimeout(() => {
      setShowBeacon(true);
    }, 8000); // Reduced from 10000

    const timer4 = setTimeout(() => {
      console.log('Showing continue button');
      setShowContinueButton(true);
    }, 3000); // Reduced from 5000

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const startNewsBombardment = () => {
    const newItems = generateNonOverlappingPositions(12); // Reduced from 15 to prevent overcrowding
    setFakeNewsItems(newItems);
  };

  const handleNewsClick = (id: number) => {
    setFakeNewsItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (characterRef.current) {
      const rect = characterRef.current.getBoundingClientRect();
      const leftEye = characterRef.current.querySelector('.eye.left') as HTMLElement;
      const rightEye = characterRef.current.querySelector('.eye.right') as HTMLElement;
      
      if (leftEye && rightEye) {
        const x = e.clientX - rect.left - 40;
        const y = e.clientY - rect.top - 60;
        
        const moveX = Math.min(Math.max(x * 0.1, -5), 5);
        const moveY = Math.min(Math.max(y * 0.1, -5), 5);
        
        leftEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        rightEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    }
  };

  return (
    <div className="synthwave-bg" onMouseMove={handleMouseMove}>
      <div className="grid-lines"></div>
      <div className="game-room">
        <div className="room-content">
          <h2 className="room-title">The Echo Chamber</h2>
          
          {/* Debug info */}
          <div style={{ 
            color: '#00ffff', 
            fontSize: '1rem', 
            marginBottom: '2rem',
            background: 'rgba(0,0,0,0.5)',
            padding: '1rem',
            borderRadius: '10px'
          }}>
            <div>Character State: {characterState}</div>
            <div>Fake News Count: {fakeNewsItems.length}</div>
            <div>Show Beacon: {showBeacon ? 'Yes' : 'No'}</div>
            <div>Show Continue: {showContinueButton ? 'Yes' : 'No'}</div>
          </div>
          
          <div ref={characterRef} className={`character character-${characterState}`}>
            <div className="character-head">
              <div className="character-eyes">
                <div className="eye left"></div>
                <div className="eye right"></div>
              </div>
            </div>
            <div className="character-body">
              <div className="character-arms">
                <div className="arm left"></div>
                <div className="arm right"></div>
              </div>
            </div>
          </div>

          <div className="fake-news-container">
            {fakeNewsItems.map(item => (
              <div
                key={item.id}
                className="fake-news-item"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  fontSize: `${item.fontSize}px`,
                  minWidth: `${item.width}px`,
                  minHeight: `${item.height}px`
                }}
                onClick={() => handleNewsClick(item.id)}
              >
                {item.text}
              </div>
            ))}
          </div>
          
          {/* Continue button - now properly positioned and styled */}
          <button 
            className="continue-button" 
            onClick={onContinue}
            style={{ 
              position: 'relative', 
              zIndex: 1000,
              marginTop: '2rem',
              opacity: showContinueButton ? 1 : 0.3,
              pointerEvents: showContinueButton ? 'auto' : 'none',
              transition: 'all 0.5s ease'
            }}
          >
            🚪 CONTINUE TO GAME {showContinueButton ? '(READY)' : '(WAITING...)'}
          </button>
          
          {showContinueButton && (
            <div style={{ 
              color: '#00ff00', 
              marginTop: '1rem', 
              fontSize: '1.2rem',
              background: 'rgba(0,255,0,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid #00ff00'
            }}>
              ✅ Button is now active! Click to continue to the game.
            </div>
          )}
        </div>
      </div>

      {showBeacon && (
        <div className="beacon-light"></div>
      )}
    </div>
  );
};

export default GameRoom;
