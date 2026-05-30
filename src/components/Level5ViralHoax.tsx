import React from 'react';
import { GameState } from '../App';

interface Level5ViralHoaxProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onComplete: (message: string, emoji: string) => void;
}

const Level5ViralHoax: React.FC<Level5ViralHoaxProps> = ({ gameState, setGameState, onComplete }) => {
  const sources = [
    {
      id: 1,
      name: "TruthSeeker Daily",
      url: "truthseeker-daily.com",
      description: "Independent news source bringing you the REAL stories the mainstream media won't cover!",
      isVerified: false,
      credibility: "🚨 LOW CREDIBILITY",
      redFlags: [
        "Uses sensationalist language ('REAL stories')",
        "Claims mainstream media conspiracy",
        "No professional credentials listed",
        "Anonymous authors",
        "No fact-checking process"
      ]
    },
    {
      id: 2,
      name: "Reuters",
      url: "reuters.com",
      description: "International news organization providing trusted, fact-checked reporting on global events.",
      isVerified: true,
      credibility: "✅ HIGH CREDIBILITY",
      redFlags: [
        "Established since 1851",
        "Professional journalists",
        "Fact-checking standards",
        "Multiple source verification",
        "Transparent editorial process"
      ]
    },
    {
      id: 3,
      name: "ViralNewsNow",
      url: "viralnewsnow.net",
      description: "Get the latest viral stories and trending topics! Share with friends for more views!",
      isVerified: false,
      credibility: "🚨 LOW CREDIBILITY",
      redFlags: [
        "Focuses on 'viral' content",
        "Encourages sharing for views",
        "No editorial standards",
        "Clickbait approach",
        "No author accountability"
      ]
    }
  ];

  const handleSourceClick = (source: any) => {
    if (gameState.selectedPosts.includes(source.id)) {
      setGameState(prev => ({
        ...prev,
        selectedPosts: prev.selectedPosts.filter(id => id !== source.id)
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedPosts: [source.id]
      }));
    }

    if (source.isVerified && !gameState.selectedPosts.includes(source.id)) {
      setTimeout(() => {
        onComplete("VIRAL HOAX STOPPED!", "🔥");
      }, 1500);
    }
  };

  const isSourceSelected = (sourceId: number) => gameState.selectedPosts.includes(sourceId);

  return (
    <div className="level-container">
      <h1 className="level-title">FINAL BOSS: VIRAL HOAX</h1>
      
      <div className="progress-bar">
        <div className="progress-stats">
          <span className="stat">✅ Verified Sources: 1</span>
          <span className="stat fake">🚨 Fake Sources: 2</span>
        </div>
      </div>

      <div className="posts-container">
        <div className="post-card viral-story">
          <div className="post-header">
            <div className="avatar">🔥</div>
            <div className="post-info">
              <h3>VIRAL STORY</h3>
              <span>Source Verification</span>
            </div>
          </div>
          <div className="post-content">
            <strong>"BREAKING: New Study Claims Drinking Coffee Extends Life by 20 Years!"</strong><br/><br/>
            Multiple sources are reporting this groundbreaking discovery, but which one can you trust? 
            Click on each source to analyze their credibility and find the verified information.
          </div>
        </div>

        {sources.map(source => (
          <div
            key={source.id}
            className={`post-card source-card ${isSourceSelected(source.id) ? 'selected' : ''}`}
            onClick={() => handleSourceClick(source)}
          >
            <div className="post-header">
              <div className="avatar">{source.isVerified ? '✅' : '🚨'}</div>
              <div className="post-info">
                <h3>{source.name}</h3>
                <span>{source.url}</span>
              </div>
            </div>
            <div className="post-content">{source.description}</div>
            {isSourceSelected(source.id) && (
              <div className={`hint ${source.isVerified ? '' : 'fake'}`}>
                <strong>{source.credibility}</strong><br/>
                <strong>{source.isVerified ? '✅ Credibility Factors:' : '🚨 Red Flags:'}</strong><br/>
                {source.redFlags.map((flag, index) => (
                  <span key={index}>• {flag}<br/></span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level5ViralHoax;
