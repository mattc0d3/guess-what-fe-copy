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
    getAliens().then((res) => {
      let obj = { ...users };
      obj.allAliens = res;
      setUsers(obj);
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
                console.log(e.target.value, "<<<<<< input value")
                let obj = { ...thisUser };
                obj.name = e.target.value;
                console.log(obj, "<<<<<< obj to be assigned")
                setThisUser(obj);
                console.log(thisUser, "<<<< thisUser after context set")
                const currentUserStats = { ...statsObject };
                currentUserStats.username = e.target.value;
                setStatsObject(currentUserStats);
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
        <button  className='lcbtn'>
          
          <Link href="/leaderboarddisplay">View Leaderboard</Link>
        </button>
      </form>
    </div>
  );
};
