import React from 'react';
import { GameState } from '../App';

interface Level2BotArmyProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onComplete: (message: string, emoji: string) => void;
}

const Level2BotArmy: React.FC<Level2BotArmyProps> = ({ gameState, setGameState, onComplete }) => {
  const botMessages = [
    {
      id: 1,
      username: "Sarah_Johnson",
      message: "Hey everyone! Just finished reading that article about climate change. Really eye-opening stuff.",
      timestamp: "2:34 PM",
      isBot: false,
      hint: "✅ HUMAN: Natural conversation, varied language, personal opinion"
    },
    {
      id: 2,
      username: "TechBot2024",
      message: "Buy now! Limited time offer! Amazing deals! Don't miss out! Click here!",
      timestamp: "2:35 PM",
      isBot: true,
      hint: "🤖 BOT: Repetitive promotional language, excessive exclamation marks, generic spam"
    },
    {
      id: 3,
      username: "Mike_Chen",
      message: "I think the solution is more complex than what the article suggests. We need to consider multiple factors.",
      timestamp: "2:36 PM",
      isBot: false,
      hint: "✅ HUMAN: Thoughtful response, nuanced opinion, natural language"
    },
    {
      id: 4,
      username: "AutoReply_Service",
      message: "Thank you for your message. We will respond within 24 hours. Have a great day!",
      timestamp: "2:37 PM",
      isBot: true,
      hint: "🤖 BOT: Generic automated response, formal template language, no personal touch"
    },
    {
      id: 5,
      username: "Emma_Davis",
      message: "Has anyone tried that new restaurant downtown? I heard the pasta is amazing!",
      timestamp: "2:38 PM",
      isBot: false,
      hint: "✅ HUMAN: Personal question, natural curiosity, specific details"
    },
    {
      id: 6,
      username: "SpamMaster3000",
      message: "FREE MONEY! EARN $1000 DAILY! WORK FROM HOME! JOIN NOW!",
      timestamp: "2:39 PM",
      isBot: true,
      hint: "🤖 BOT: All caps, unrealistic promises, aggressive marketing language"
    }
  ];

  const handleBotClick = (message: any) => {
    if (gameState.selectedPosts.includes(message.id)) {
      setGameState(prev => ({
        ...prev,
        selectedPosts: prev.selectedPosts.filter(id => id !== message.id),
        correctAnswers: message.isBot ? prev.correctAnswers - 1 : prev.correctAnswers
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedPosts: [...prev.selectedPosts, message.id],
        correctAnswers: message.isBot ? prev.correctAnswers + 1 : prev.correctAnswers
      }));
    }

    // Check if level complete
    const newSelectedPosts = gameState.selectedPosts.includes(message.id) 
      ? gameState.selectedPosts.filter(id => id !== message.id)
      : [...gameState.selectedPosts, message.id];
    
    const newCorrectAnswers = message.isBot 
      ? (gameState.selectedPosts.includes(message.id) ? gameState.correctAnswers - 1 : gameState.correctAnswers + 1)
      : gameState.correctAnswers;

    if (newCorrectAnswers === 3 && newSelectedPosts.length >= 3) {
      setTimeout(() => {
        onComplete("BOTS DEFEATED!", "🤖");
      }, 1000);
    }
  };

  const isMessageSelected = (messageId: number) => gameState.selectedPosts.includes(messageId);

  return (
    <div className="level-container">
      <h1 className="level-title">LEVEL 2: BOT ARMY</h1>
      
      <div className="progress-bar">
        <div className="progress-stats">
          <span className="stat">✅ Humans: 3</span>
          <span className="stat fake">🤖 Bots: 3</span>
          <span className="stat found">🎯 Found: {gameState.correctAnswers}/3</span>
        </div>
      </div>

      <div className="posts-container">
        {botMessages.map(message => (
          <div
            key={message.id}
            className={`post-card ${isMessageSelected(message.id) ? 'selected' : ''} ${message.isBot ? 'fake' : ''}`}
            onClick={() => handleBotClick(message)}
          >
            <div className="post-header">
              <div className={`avatar ${message.isBot ? 'bot' : 'human'}`}>
                {message.username.charAt(0)}
              </div>
              <div className="post-info">
                <h3>{message.username} {message.isBot ? '🤖' : ''}</h3>
                <span>{message.timestamp}</span>
              </div>
            </div>
            <div className="post-content">{message.message}</div>
            {isMessageSelected(message.id) && (
              <div className={`hint ${message.isBot ? 'fake' : ''}`}>
                {message.hint}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level2BotArmy;
