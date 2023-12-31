import { useContext, useEffect, useRef } from 'react';
import { UsersContext } from '@/contexts/User';

export const OpponentResponse = ({ answer, hasWon }) => {
  const { users, setUsers } = useContext(UsersContext);
  const positiveResponse = [
    'Yes!',
    'How did you know?',
    "You're right!",
    'Correct!',
  ];
  const negativeResponse = ['Nope!', 'No...sorry!', 'False', 'Wrong'];
  const responseDiv = useRef();

  useEffect(() => {
    if (answer === null) {
      responseDiv.current.className = 'response-div';
    } else {
      responseDiv.current.className = 'response-div-show';
    }

    if (hasWon !== null) {
      responseDiv.current.className = 'response-div-show';
    }
  }, [answer, hasWon]);

  const guessResponse = () => {
    if (hasWon === null) {
    } else if (hasWon) {
      return <p>YOU WIN!</p>;
    } else if (!hasWon) {
      return <p>Nope!</p>;
    }
  };

  return (
    <div className="opponent-response">
      <div className="response-div" ref={responseDiv}>
        <img src="./assets/speech-bubble-w.png" className="w-40" />
        <div className="response-text">
          {/* {answer === null && <p>Welcome {`${userOne}`}</p>} */}
          {guessResponse()}
          {answer && (
            <p>
              {
                positiveResponse[
                  Math.floor(Math.random() * positiveResponse.length)
                ]
              }
            </p>
          )}

          {answer !== null && !answer && (
            <p>
              {
                negativeResponse[
                  Math.floor(Math.random() * negativeResponse.length)
                ]
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
