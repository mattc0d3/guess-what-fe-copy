'use client';
import { Footer } from '@/components/Footer';
import Gameboard from '@/components/Gameboard';
import { Header } from '@/components/Header';
import LobbyModal from '@/components/LobbyModal';
import OpponentCard from '@/components/OpponentCard';
import QuestionCard from '@/components/QuestionCard';
import UserStats from '@/components/UserStats';
import UsersCard from '@/components/UsersCard';
import EndGameModal from '@/components/EndGameModal';
import { useState, useEffect, useContext } from 'react';
import { getAliens } from '../utils/getAliens';
import chooseSecretAlien from '../utils/chooseSecretAlien';
import ScoreTwoPlayer from '@/components/ScoreTwoPlayer';
import { UsersContext } from '@/contexts/User';
import { SocketContext } from '@/contexts/Socket';
import { ThisUserContext } from '@/contexts/ThisUser';
import { UserStatsContext } from '@/contexts/UserStats';

const { io } = require('socket.io-client');

const socket = io('https://guess-what-copy.onrender.com/');


export default function TwoPlayerDisplay() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alienObjects, setAlienObjects] = useState([]);
  const [chosenAlien, setChosenAlien] = useState();
  const [hasWon, setHasWon] = useState(null);
  const [displayLobby, setDisplayLobby] = useState(true);
  const { users, setUsers } = useContext(UsersContext);
  const { yourSocket, setYourSocket } = useContext(SocketContext);
  const { thisUser, setThisUser } = useContext(ThisUserContext);
  const { statsObject, setStatsObject } = useContext(UserStatsContext)

  useEffect(() => {
    if (!isGameFinished) {

      socket.emit('reset')
    }
  }, [isGameFinished])

  useEffect(() => {
    if (!isGameFinished) {
      getAliens().then((res) => {
        socket.emit('reset', res)
        socket.on("reset", (e) => {
          console.log(e, "<<<<<<< e")
          let obj = { ...users };
          obj.p1.p1alien = e.newBoard.p1alien;
          obj.p2.p2alien = e.newBoard.p2alien;
          obj.allAliens = e.newBoard.alienArray;
          console.log(obj, "<<<<< obj")
          setUsers(obj);
        })
        setAlienObjects(res);
        setIsLoading(false);
      });
    }
  }, [isGameFinished]);

  useEffect(() => {
    if (yourSocket === users.p1.p1socketId) {
      setChosenAlien(users.p2.p2alien);
    } else {
      setChosenAlien(users.p1.p1alien);
    }
  }, [users]);

  useEffect(() => {
    console.log("in local storage get")
    const storageUser = JSON.parse(localStorage.getItem('thisUser'));
    const storageUsers = JSON.parse(localStorage.getItem('users'));
    const storageStats = JSON.parse(localStorage.getItem('statsObject'))
    console.log(users, "<<<<<<< storage users")
    setUsers(storageUsers)
    console.log(storageStats, "<<<<<<<< storage stats")
    setStatsObject(storageStats)
    if (storageUser) {
      console.log(storageUser, "<<<<<<< storage user")
      setThisUser(storageUser);
    }
  }, []);

  // console.log(thisUser, "<<<<<< this user in two player display")
  return (
    <main>
      <Header />
      <div className="two-player-game-wrapper">
        {displayLobby ? (
          <LobbyModal
            setIsLoading={setIsLoading}
            alienObjects={alienObjects}
            setAlienObjects={setAlienObjects}
            chosenAlien={chosenAlien}
            setChosenAlien={setChosenAlien}
            chooseSecretAlien={chooseSecretAlien}
            setDisplayLobby={setDisplayLobby}
          />
        ) : null}
        {isGameFinished && (
          <EndGameModal
            chosenAlien={chosenAlien}
            setIsGameFinished={setIsGameFinished}
            setHasWon={setHasWon}
          />
        )}
        <Gameboard
          alienObjects={alienObjects}
          setAlienObjects={setAlienObjects}
          className="two-player-gameboard"
        />
        <QuestionCard
          alienObjects={alienObjects}
          setAlienObjects={setAlienObjects}
          setIsGameFinished={setIsGameFinished}
          chosenAlien={chosenAlien}
          hasWon={hasWon}
          setHasWon={setHasWon}
        />
        <OpponentCard />
        <UsersCard isLoading={isLoading} />
        <UserStats alienObjects={alienObjects} isGameFinished={isGameFinished} isLoading={isLoading} />
        <ScoreTwoPlayer />
      </div>
      <Footer className='footer' />
    </main>
  );
}
