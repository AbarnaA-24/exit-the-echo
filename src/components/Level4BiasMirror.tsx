import React from 'react';
import { GameState } from '../App';

interface Level4BiasMirrorProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onComplete: (message: string, emoji: string) => void;
}

const Level4BiasMirror: React.FC<Level4BiasMirrorProps> = ({ gameState, setGameState, onComplete }) => {
  const headlines = [
    {
      id: 1,
      text: "Government announces new environmental regulations to combat climate change",
      bias: 'left',
      explanation: "🚨 LEFT BIAS: Uses 'combat' (action-oriented), focuses on government intervention, environmental protection"
    },
    {
      id: 2,
      text: "New study shows economic impact of proposed tax changes on small businesses",
      bias: 'neutral',
      explanation: "✅ NEUTRAL: Factual reporting, cites study, presents information without opinion or emotional language"
    },
    {
      id: 3,
      text: "Liberal policies continue to destroy American jobs and economy, experts say",
      bias: 'right',
      explanation: "🚨 RIGHT BIAS: Uses 'destroy' (negative emotion), 'liberal' (partisan), blames specific political group"
    }
  ];

  const selectBias = (headlineId: number, bias: string) => {
    const headline = headlines.find(h => h.id === headlineId);
    if (headline && headline.bias === bias) {
      setGameState(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1
      }));

      if (gameState.correctAnswers + 1 >= 3) {
        setTimeout(() => {
          onComplete("BIAS EXPOSED!", "🪞");
        }, 1000);
      }
    }
  };

  return (
    <div className="level-container">
      <h1 className="level-title">LEVEL 4: BIAS MIRROR</h1>
      
      <div className="progress-bar">
        <div className="progress-stats">
          <span className="stat">⬅️ Left Bias</span>
          <span className="stat">⚖️ Neutral</span>
          <span className="stat fake">➡️ Right Bias</span>
          <span className="stat found">🎯 Correct: {gameState.correctAnswers}/3</span>
        </div>
      </div>

      <div className="posts-container">
        {headlines.map(headline => (
          <div key={headline.id} className="post-card">
            <div className="post-header">
              <div className="avatar">📰</div>
              <div className="post-info">
                <h3>Headline {headline.id}</h3>
                <span>Bias Analysis</span>
              </div>
            </div>
            <div className="post-content">"{headline.text}"</div>
            <div className="bias-buttons">
              <button 
                className="bias-btn left" 
                onClick={() => selectBias(headline.id, 'left')}
              >
                ⬅️ Left
              </button>
              <button 
                className="bias-btn neutral" 
                onClick={() => selectBias(headline.id, 'neutral')}
              >
                ⚖️ Neutral
              </button>
              <button 
                className="bias-btn right" 
                onClick={() => selectBias(headline.id, 'right')}
              >
                ➡️ Right
              </button>
            </div>
            <div className="hint hidden">{headline.explanation}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level4BiasMirror;
