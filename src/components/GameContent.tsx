import React, { useState } from 'react';
import { GameState } from '../App';
import Level1FakeFeed from './Level1FakeFeed';
import Level2BotArmy from './Level2BotArmy';
import Level3DeepfakeDungeon from './Level3DeepfakeDungeon';
import Level4BiasMirror from './Level4BiasMirror';
import Level5ViralHoax from './Level5ViralHoax';
import LevelCompleteModal from './LevelCompleteModal';

interface GameContentProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onNextLevel: () => void;
  onVictory: () => void;
}

const GameContent: React.FC<GameContentProps> = ({ 
  gameState, 
  setGameState, 
  onNextLevel, 
  onVictory 
}) => {
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [levelCompleteMessage, setLevelCompleteMessage] = useState('');
  const [levelCompleteEmoji, setLevelCompleteEmoji] = useState('');

  const handleLevelComplete = (message: string, emoji: string) => {
    setLevelCompleteMessage(message);
    setLevelCompleteEmoji(emoji);
    setShowLevelComplete(true);
  };

  const handleNextLevel = () => {
    setShowLevelComplete(false);
    if (gameState.currentLevel >= 5) {
      onVictory();
    } else {
      onNextLevel();
    }
  };

  const renderCurrentLevel = () => {
    switch (gameState.currentLevel) {
      case 1:
        return (
          <Level1FakeFeed 
            gameState={gameState}
            setGameState={setGameState}
            onComplete={handleLevelComplete}
          />
        );
      case 2:
        return (
          <Level2BotArmy 
            gameState={gameState}
            setGameState={setGameState}
            onComplete={handleLevelComplete}
          />
        );
      case 3:
        return (
          <Level3DeepfakeDungeon 
            gameState={gameState}
            setGameState={setGameState}
            onComplete={handleLevelComplete}
          />
        );
      case 4:
        return (
          <Level4BiasMirror 
            gameState={gameState}
            setGameState={setGameState}
            onComplete={handleLevelComplete}
          />
        );
      case 5:
        return (
          <Level5ViralHoax 
            gameState={gameState}
            setGameState={setGameState}
            onComplete={handleLevelComplete}
          />
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="synthwave-bg">
      <div className="grid-lines"></div>
      <div className="game-content">
        {renderCurrentLevel()}
      </div>

      {showLevelComplete && (
        <LevelCompleteModal
          message={levelCompleteMessage}
          emoji={levelCompleteEmoji}
          onContinue={handleNextLevel}
          isFinalLevel={gameState.currentLevel >= 5}
        />
      )}
    </div>
  );
};

export default GameContent;
