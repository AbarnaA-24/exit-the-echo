import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="synthwave-bg">
      <div className="grid-lines"></div>
      <div className="intro-screen">
        <div className="intro-content">
          <h1 className="title">EXIT THE ECHO</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mb-8"></div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-cyan-400/20">
            <h2 className="text-2xl font-semibold text-pink-400 mb-6">🚨 DIGITAL PRISON BREAK 🚨</h2>
            
            <div className="text-lg leading-relaxed space-y-4 text-gray-300">
              <p>Trapped in <span className="text-red-400 font-bold">The Echo Chamber</span> - where misinformation spreads like wildfire.</p>
              <p className="text-cyan-400 font-semibold">Navigate 5 challenges to escape: fake news, bots, deepfakes, bias, and viral hoaxes.</p>
              <p className="text-pink-400">Your mission: <span className="font-bold">Break free and restore truth.</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="start-button" onClick={onStart}>
              🚪 ENTER THE CHAMBER
            </button>
            <div className="text-sm text-gray-400">
              <p>Use critical thinking to identify:</p>
              <p>• Fake posts • Bot accounts • Deepfakes • Media bias • Viral hoaxes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
