import React from 'react';
import { AwesomeButton } from 'react-awesome-button';

const GameOver = ({ score, handlePlayAgain }) => {
  return (
    <div id="game-over-container">
      <div>Game Over 😞 Thanks for Playing!</div>
      <div>Your Score was {score}</div>
      <AwesomeButton
        onPress={() => {
          handlePlayAgain();
        }}
      >
        {`Play Again ?`}
      </AwesomeButton>
    </div>
  );
};

export default GameOver;
