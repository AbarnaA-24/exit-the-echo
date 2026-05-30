import React from 'react';

interface LevelCompleteModalProps {
  message: string;
  emoji: string;
  onContinue: () => void;
  isFinalLevel: boolean;
}

const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({ 
  message, 
  emoji, 
  onContinue, 
  isFinalLevel 
}) => {
  return (
    <div className="level-complete-overlay">
      <div className="level-complete-modal">
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">{message}</h2>
        <p className="text-gray-300 mb-6">
          {isFinalLevel ? 'All levels completed! Ready for victory?' : 'Level completed! Ready for the next challenge?'}
        </p>
        <button className="continue-btn" onClick={onContinue}>
          {isFinalLevel ? '🏆 CLAIM VICTORY' : '🚪 ENTER NEXT CHAMBER'}
        </button>
      </div>
    </div>
  );
};

export default LevelCompleteModal;
