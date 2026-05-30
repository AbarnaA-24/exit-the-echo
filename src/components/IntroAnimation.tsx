import React from 'react';

interface IntroAnimationProps {
  onStart: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onStart }) => {
  return (
    <div className="synthwave-bg">
      <div className="grid-lines"></div>
      <div className="intro-screen">
        <div className="intro-content">
          <h1 className="title">EXIT THE ECHO</h1>
          <p className="subtitle">Digital Literacy Escape Room</p>
          <button className="start-button" onClick={onStart}>
            🚪 ENTER THE CHAMBER
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
