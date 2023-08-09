'use client';

import Link from 'next/link';
import { UsersContext } from '@/contexts/User';
import { UserStatsContext } from '../contexts/UserStats';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThisUserContext } from '@/contexts/ThisUser';
import { getAliens } from '@/app/utils/getAliens';
import { SocketContext } from '@/contexts/Socket';

export const LandingCard = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { yourSocket, setYourSocket } = useContext(SocketContext);
  const { statsObject, setStatsObject } = useContext(UserStatsContext);
  const { thisUser, setThisUser } = useContext(ThisUserContext);
  const [clicked, setClicked] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('thisUser', JSON.stringify(thisUser))
    // localStorage.setItem('users', JSON.stringify(users))
  }, [thisUser, users, yourSocket]
  )

  useEffect(() => {
    if (users.allAliens.length) {
      console.log(users, "<<<<< users, setting")
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users])

  useEffect(() => {
    console.log(statsObject, "<<<<<< setting stats object")
    localStorage.setItem('statsObject', JSON.stringify(statsObject))
  }, [statsObject])

  useEffect(() => {
    getAliens().then((res) => {
      console.log(res, "<<<<< api res")
      let obj = { ...users };
      obj.allAliens = res;
      setUsers(obj);
      // console.log(users, "<<<<< users, setting")
      // localStorage.setItem('users', JSON.stringify(users))
    });
  }, []);

  function handleSinglePlayerClick(e) {
    e.preventDefault();
    setClicked(true);
    router.push('/singleplayerdisplay');
  }

  function handleTwoPlayerClick(e) {
    e.preventDefault();
    setClicked(true);

    router.push('/twoplayerdisplay');
  }

  return (
    <div className="landing-text-box">
      <h2>Welcome!</h2>

      <p>
        Ask yes or no questions to find out which randomly generated alien your
        opponent has chosen
      </p>

      <form className="sign-in-form" id="sign-in">
        <div className="input-boxes">
          <p>Please enter your name</p>
          <div className="flex flex-col">
            <label htmlFor="username"> </label>
            <input className='name-input'
              type="text"
              id="username"
              value={thisUser.name}
              onChange={(e) => {
                let obj = { ...thisUser };
                obj.name = e.target.value;
                setThisUser(obj);
                const currentUserStats = { ...statsObject };
                currentUserStats.username = e.target.value;
                setStatsObject(currentUserStats);
              }}
              required
            />
            <label htmlFor="room-input"> </label>
            <input className='name-input'
              type="text"
              id="room-input"
              value={thisUser.room}
              onChange={(e) => {
                let obj = { ...thisUser };
                obj.room = e.target.value;
                setThisUser(obj);
              }}
              required
            />
          </div>

        </div>

        <div className="flex gap-4">
          <button className='lcbtn'
            id="singleplayer-btn"
            // disabled={clicked || userName === ''}
            onClick={(e) => {
              handleSinglePlayerClick(e);
            }}
          >
            1 player
          </button>
          <button className='lcbtn'
            id="multiplayer-btn"
            onClick={(e) => {
              handleTwoPlayerClick(e);
            }}
          >
            2 player
          </button>
        </div>
        <button className='lcbtn'>

          <Link href="/leaderboarddisplay">View Leaderboard</Link>
        </button>
      </form>
    </div>
  );
};
