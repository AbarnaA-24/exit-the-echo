import React from 'react';
import { GameState } from '../App';

interface Level1FakeFeedProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onComplete: (message: string, emoji: string) => void;
}

const Level1FakeFeed: React.FC<Level1FakeFeedProps> = ({ gameState, setGameState, onComplete }) => {
  const posts = [
    {
      id: 1,
      content: "BREAKING: Scientists discover that drinking hot water with lemon cures cancer! Share this with everyone you know! 🍋💪",
      author: "HealthGuru2024",
      timestamp: "2 hours ago",
      isFake: true,
      hint: "🚨 FAKE: No credible medical source, sensationalist language, asks for sharing"
    },
    {
      id: 2,
      content: "NASA confirms new exoplanet discovery in the Kepler-442 system. The planet shows potential for supporting life forms.",
      author: "SpaceNews",
      timestamp: "5 hours ago",
      isFake: false,
      hint: "✅ REAL: Credible source (NASA), factual reporting, no sensationalism"
    },
    {
      id: 3,
      content: "OMG! You won't BELIEVE what happened! This video will SHOCK you! Click here to see the AMAZING transformation! 😱",
      author: "ViralVideosDaily",
      timestamp: "1 hour ago",
      isFake: true,
      hint: "🚨 FAKE: Clickbait language, excessive emojis, no specific information"
    },
    {
      id: 4,
      content: "Local weather update: Rain expected this weekend with temperatures ranging from 15-20°C. Stay dry everyone! ☔",
      author: "WeatherStation",
      timestamp: "3 hours ago",
      isFake: false,
      hint: "✅ REAL: Specific, factual information, credible source"
    },
    {
      id: 5,
      content: "The government is hiding aliens! I have PROOF! They're building secret bases underground! Don't let them silence the truth! 👽",
      author: "TruthSeeker99",
      timestamp: "30 minutes ago",
      isFake: true,
      hint: "🚨 FAKE: Conspiracy theory, no evidence, emotional manipulation"
    }
  ];

  const handlePostClick = (post: any) => {
    if (gameState.selectedPosts.includes(post.id)) {
      // Deselect
      setGameState(prev => ({
        ...prev,
        selectedPosts: prev.selectedPosts.filter(id => id !== post.id),
        correctAnswers: post.isFake ? prev.correctAnswers - 1 : prev.correctAnswers
      }));
    } else {
      // Select
      setGameState(prev => ({
        ...prev,
        selectedPosts: [...prev.selectedPosts, post.id],
        correctAnswers: post.isFake ? prev.correctAnswers + 1 : prev.correctAnswers
      }));
    }

    // Check if level complete
    const newSelectedPosts = gameState.selectedPosts.includes(post.id) 
      ? gameState.selectedPosts.filter(id => id !== post.id)
      : [...gameState.selectedPosts, post.id];
    
    const newCorrectAnswers = post.isFake 
      ? (gameState.selectedPosts.includes(post.id) ? gameState.correctAnswers - 1 : gameState.correctAnswers + 1)
      : gameState.correctAnswers;

    if (newCorrectAnswers === 3 && newSelectedPosts.length >= 3) {
      setTimeout(() => {
        onComplete("FAKE POSTS IDENTIFIED!", "🎉");
      }, 1000);
    }
  };

  const isPostSelected = (postId: number) => gameState.selectedPosts.includes(postId);

  return (
    <div className="level-container">
      <h1 className="level-title">LEVEL 1: FAKE FEED</h1>
      
      <div className="progress-bar">
        <div className="progress-stats">
          <span className="stat">✅ Real Posts: 2</span>
          <span className="stat fake">🚨 Fake Posts: 3</span>
          <span className="stat found">🎯 Found: {gameState.correctAnswers}/3</span>
        </div>
      </div>

      <div className="posts-container">
        {posts.map(post => (
          <div
            key={post.id}
            className={`post-card ${isPostSelected(post.id) ? 'selected' : ''} ${post.isFake ? 'fake' : ''}`}
            onClick={() => handlePostClick(post)}
          >
            <div className="post-header">
              <div className="avatar">{post.author.charAt(0)}</div>
              <div className="post-info">
                <h3>{post.author}</h3>
                <span>{post.timestamp}</span>
              </div>
            </div>
            <div className="post-content">{post.content}</div>
            {isPostSelected(post.id) && (
              <div className={`hint ${post.isFake ? 'fake' : ''}`}>
                {post.hint}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level1FakeFeed;
