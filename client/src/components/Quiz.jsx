import React, { useState, useEffect } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Quiz = () => {
  const idArray = [...Array(100).keys()]; //[0,1,...99]
  const [questionIds, setQuestionIds] = useState(idArray);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const randomId = () => {
    return Math.floor(Math.random() * questionIds.length);
  };

  const handleSelect = questionValue => {
    setCurrentAnswer(questionValue);
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
      axios
        .post('/validate', { answer: currentAnswer })
        .then(data => {
          if (data.data) {
            toast.success('🎉 Wow so easy!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1800,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            setCurrentScore(currentScore + 1);
            //get new question

            //set current answer to be empty
          } else {
            toast.error('😞 You picked the wrong answer :(', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1800,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            setCurrentScore(0);
            setCurrentAnswer('');
          }
        })
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    let questionId = randomId();
    axios
      .get('/question', { params: { id: questionId } })
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

  return (
    <>
      {isLoaded ? (
        <div id="quiz-container">
          <div>
            <div>{currentScore}</div>
            <div>{currentQuestion.question.replace(/&quot;/g, '"')}</div>
            {/* <div>HIGHSCORE</div> */}
          </div>
          <div id="question-container">
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
          <div id="answer-container">
            {currentAnswer !== '' ? (
              <AwesomeButton type="secondary" size="medium" disabled>
                {currentAnswer.replace(/&quot;/g, '"')}
              </AwesomeButton>
            ) : null}
            <AwesomeButton type="secondary" onPress={() => validateAnswer()}>
              Submit your answer!
            </AwesomeButton>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Quiz;
