import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/IntroAnimation';
import GameRoom from './components/GameRoom';
import IntroScreen from './components/IntroScreen';
import GameContent from './components/GameContent';
import VictoryScreen from './components/VictoryScreen';
import './App.css';

export interface GameState {
  currentLevel: number;
  score: number;
  selectedPosts: number[];
  correctAnswers: number;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'intro-animation' | 'game-room' | 'intro-screen' | 'game-content' | 'victory'>('intro-animation');
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    selectedPosts: [],
    correctAnswers: 0
  });

  const startAnimation = () => {
    setCurrentScreen('game-room');
  };

  const showIntroScreen = () => {
    setCurrentScreen('intro-screen');
  };

  const startGame = () => {
    setCurrentScreen('game-content');
    setGameState(prev => ({ ...prev, currentLevel: 1 }));
  };

  const nextLevel = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      score: prev.score + 100,
      selectedPosts: [],
      correctAnswers: 0
    }));
  };

  const showVictory = () => {
    setCurrentScreen('victory');
  };

  const resetGame = () => {
    setCurrentScreen('intro-animation');
    setGameState({
      currentLevel: 0,
      score: 0,
      selectedPosts: [],
      correctAnswers: 0
    });
  };

  return (
    <div className="App">
      {currentScreen === 'intro-animation' && (
        <IntroAnimation onStart={startAnimation} />
      )}
      
      {currentScreen === 'game-room' && (
        <GameRoom onContinue={showIntroScreen} />
      )}
      
      {currentScreen === 'intro-screen' && (
        <IntroScreen onStart={startGame} />
      )}
      
      {currentScreen === 'game-content' && (
        <GameContent 
          gameState={gameState}
          setGameState={setGameState}
          onNextLevel={nextLevel}
          onVictory={showVictory}
        />
      )}
      
      {currentScreen === 'victory' && (
        <VictoryScreen gameState={gameState} onPlayAgain={resetGame} />
      )}
    </div>
  );
}

export default App;
