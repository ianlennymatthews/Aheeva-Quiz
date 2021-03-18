import React, { useState, useEffect } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';

import GameOver from './GameOver.jsx';

const Quiz = () => {
  const [questionIds, setQuestionIds] = useState([...Array(100).keys()]); //[0,1,...99]
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isButtonDisabled, setisButtonDisabled] = useState(false);

  const randomId = () => {
    return Math.floor(Math.random() * questionIds.length);
  };

  const handleSelect = questionValue => {
    setCurrentAnswer(questionValue);
  };

  const getQuestion = questionId => {
    return axios.get('/question', { params: { id: questionId } });
  };

  const handlePlayAgain = () => {
    let newQuestionId = randomId();
    getQuestion(newQuestionId)
      .then(data => {
        let temp = [...questionIds];
        temp.splice(newQuestionId, 1);

        setisButtonDisabled(false);
        setQuestionIds(temp);
        setCurrentQuestion(data.data);
        setCurrentAnswer('');
        setCurrentScore(0);
        setGameOver(false);
      })
      .catch(err => console.error(err));
  };

  const validateAnswer = () => {
    if (currentAnswer === '') {
      toast.warning('⚠️ Please select an answer first', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      setisButtonDisabled(true);

      axios
        .post('/validate', { answer: currentAnswer })
        .then(data => {
          if (data.data) {
            toast.success('🎉 Wow so easy, keep going!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1800,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => {
                let newQuestionId = randomId();
                getQuestion(newQuestionId)
                  .then(data => {
                    let temp = [...questionIds];
                    temp.splice(newQuestionId, 1);

                    setisButtonDisabled(false);
                    setQuestionIds(temp);
                    setCurrentQuestion(data.data);
                    setCurrentAnswer('');
                  })
                  .catch(err => console.error(err));
              }
            });
            setCurrentScore(currentScore + 1);
          } else {
            toast.error('❌ You picked the wrong answer', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1800,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            setGameOver(true);
          }
        })
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    //Initial data fetch
    let questionId = randomId();
    getQuestion(questionId)
      .then(data => {
        let temp = [...questionIds];
        temp.splice(questionId, 1);

        setCurrentQuestion(data.data);
        setQuestionIds(temp);
        setIsLoaded(true);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    //If it is ever the rare case the user really likes the game and runs out of questions
    if (questionIds.length === 0) {
      //Thank them
      alert(
        "Thanks for playing!, you've answered all of the 100 questions correctly!"
      );
      //Reset the questions and see if they're willing to go double or nothing
      setQuestionIds([...Array(100).keys()]);
    }
  }, [questionIds]);

  return (
    <>
      {isLoaded ? (
        <>
          {gameOver ? (
            <GameOver score={currentScore} handlePlayAgain={handlePlayAgain} />
          ) : (
            <div id="quiz-container">
              <div>
                <div style={{ textAlign: 'center' }}>{currentScore}</div>
                <div style={{ textAlign: 'center' }} className="my-1">
                  {currentQuestion.question.replace(/&quot;/g, '"')}
                </div>
              </div>
              <div id="answers-container">
                {currentQuestion.options.map((question, i) => {
                  return (
                    <AwesomeButton
                      key={i}
                      className="quiz-question-item"
                      type="primary"
                      onPress={() => handleSelect(question.value)}
                    >
                      {question.value}
                    </AwesomeButton>
                  );
                })}
              </div>
              <div id="submit-container" className="my-3">
                <div>
                  {currentAnswer !== '' ? (
                    <AwesomeButton className="mx-1" type="secondary" disabled>
                      {currentAnswer.replace(/&quot;/g, '"')}
                    </AwesomeButton>
                  ) : null}
                  <AwesomeButton
                    className="mx-1"
                    type="secondary"
                    disabled={isButtonDisabled}
                    onPress={() => validateAnswer()}
                  >
                    Submit your answer!
                  </AwesomeButton>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Quiz;
