import React, { useState } from 'react';
import { GameState } from '../App';

interface VictoryScreenProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ gameState, onPlayAgain }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handlePlayAgain = () => {
    // Add a small delay for visual feedback
    setTimeout(() => {
      onPlayAgain();
    }, 200);
  };

  return (
    <div className="synthwave-bg">
      <div className="grid-lines"></div>
      <div className="victory-screen">
        <div className="victory-content">
          <h1 className="victory-title">YOU ESCAPED!</h1>
          <p className="victory-message">Congratulations! You have successfully escaped The Echo Chamber!</p>
          
          <div className="victory-message-card">
            <h2>🎉 YOU ESCAPED THE ECHO CHAMBER! 🎉</h2>
            <p>Through your critical thinking and digital literacy skills, you've proven that truth can prevail over misinformation.</p>
            
            <div className="skills-grid">
              <div className="skill-item">
                <h3>✅ Skills Acquired:</h3>
                <ul>
                  <li>Fake news detection</li>
                  <li>Bot identification</li>
                  <li>Deepfake recognition</li>
                  <li>Media bias analysis</li>
                  <li>Source verification</li>
                </ul>
              </div>
              <div className="skill-item">
                <h3>🎯 Final Score:</h3>
                <div className="final-score">{gameState.score} points</div>
                <p>Perfect score achieved!</p>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button 
                className="play-again-btn" 
                onClick={handlePlayAgain}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                style={{
                  position: 'relative',
                  zIndex: 1000,
                  cursor: 'pointer',
                  pointerEvents: 'auto'
                }}
              >
                🔄 PLAY AGAIN
              </button>
              
              {isButtonHovered && (
                <div style={{ 
                  color: '#00ff00', 
                  marginTop: '1rem', 
                  fontSize: '1rem',
                  background: 'rgba(0,255,0,0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #00ff00',
                  animation: 'fadeIn 0.3s ease-in'
                }}>
                  🎮 Ready to challenge yourself again?
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;
