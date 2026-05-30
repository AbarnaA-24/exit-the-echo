import React from 'react';
import { GameState } from '../App';

interface Level3DeepfakeDungeonProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onComplete: (message: string, emoji: string) => void;
}

const Level3DeepfakeDungeon: React.FC<Level3DeepfakeDungeonProps> = ({ gameState, setGameState, onComplete }) => {
  const mediaItems = [
    {
      id: 1,
      title: "Celebrity Interview",
      description: "A famous actor discussing their latest movie role in a studio interview.",
      type: 'video',
      isDeepfake: false,
      hint: "✅ REAL: Natural facial movements, consistent lighting, authentic voice patterns"
    },
    {
      id: 2,
      title: "Political Speech",
      description: "A politician giving a speech about new policies at a press conference.",
      type: 'video',
      isDeepfake: true,
      hint: "🚨 DEEPFAKE: Unnatural lip sync, inconsistent lighting on face vs background, artificial voice modulation"
    },
    {
      id: 3,
      title: "News Report",
      description: "A news anchor reporting on current events from a studio.",
      type: 'video',
      isDeepfake: false,
      hint: "✅ REAL: Professional quality, consistent audio, natural gestures and expressions"
    }
  ];

  const handleDeepfakeClick = (item: any) => {
    if (gameState.selectedPosts.includes(item.id)) {
      setGameState(prev => ({
        ...prev,
        selectedPosts: prev.selectedPosts.filter(id => id !== item.id)
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedPosts: [item.id]
      }));
    }

    if (item.isDeepfake && !gameState.selectedPosts.includes(item.id)) {
      setTimeout(() => {
        onComplete("DEEPFAKE EXPOSED!", "🎭");
      }, 1500);
    }
  };

  const isItemSelected = (itemId: number) => gameState.selectedPosts.includes(itemId);

  return (
    <div className="level-container">
      <h1 className="level-title">LEVEL 3: DEEPFAKE DUNGEON</h1>
      
      <div className="progress-bar">
        <div className="progress-stats">
          <span className="stat">✅ Real Content: 2</span>
          <span className="stat fake">🚨 Deepfake: 1</span>
        </div>
      </div>

      <div className="posts-container">
        {mediaItems.map(item => (
          <div
            key={item.id}
            className={`post-card ${isItemSelected(item.id) ? 'selected' : ''} ${item.isDeepfake ? 'fake' : ''}`}
            onClick={() => handleDeepfakeClick(item)}
          >
            <div className="post-header">
              <div className="avatar">🎥</div>
              <div className="post-info">
                <h3>{item.title}</h3>
                <span>Media Analysis</span>
              </div>
            </div>
            <div className="post-content">{item.description}</div>
            {isItemSelected(item.id) && (
              <div className={`hint ${item.isDeepfake ? 'fake' : ''}`}>
                {item.hint}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level3DeepfakeDungeon;
