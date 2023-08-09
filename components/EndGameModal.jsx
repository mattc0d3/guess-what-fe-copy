"use client";
import { UserStatsContext } from "@/contexts/UserStats";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { OpponentContext } from '@/contexts/OpponentObject';
import { ThisUserContext } from '@/contexts/ThisUser';

export default function EndGameModal({
  chosenAlien,
  setIsGameFinished,
  setHasWon,
  setIsLoading
}) {
  const { opponentObject, setOpponentObject } = useContext(OpponentContext);
  const [clicked, setClicked] = useState(false);
  const { statsObject, setStatsObject } = useContext(UserStatsContext);
  const { thisUser, setThisUser } = useContext(ThisUserContext);

  const winnerAlien = chosenAlien;

  const router = useRouter();

  function handlePlayAgain(e) {
    // console.log()
    e.preventDefault();
    setIsLoading(true)
    setIsGameFinished(false);
    setClicked(true);
    setHasWon(null);
    const currentStats = { ...statsObject };
    currentStats.score = 0;
    setStatsObject(currentStats);
    setOpponentObject({});
  }

  function handleHome(e) {
    e.preventDefault();
    setClicked(true);
    router.push("/");
  }

  function handleLeaderboard(e) {
    router.push("/leaderboarddisplay");
  }

  return (
    <div className="modal">
      <div className="text-box">
        <h1>The winner is {}</h1>
        <div className="aliencard winner-card">
          <img
            className="alien-planet"
            src={`assets/alien-layers/planet-${winnerAlien.planet}.png`}
          />
          <img
            className="alien-body"
            src={`assets/alien-layers/body-${winnerAlien.skinColour}-${winnerAlien.skinTexture}.png`}
          />
          <img
            className="alien-eyes"
            src={`assets/alien-layers/eyes-${winnerAlien.eyeColour}-${winnerAlien.eyes}.png`}
          />
          <img
            className="alien-mouth"
            src={`assets/alien-layers/mouth-${
              winnerAlien.isFriendly ? "friendly" : "unfriendly-a"
            }.png`}
          />
          {winnerAlien.horns ? (
            <img
              className="alien-horns"
              src={`assets/alien-layers/horns-${winnerAlien.horns}.png`}
            />
          ) : null}
          {winnerAlien.hasAntenna ? (
            <img
              className="alien-antenna"
              src={"assets/alien-layers/antenna.png"}
            />
          ) : null}
        </div>
        <div id="stats-container">
          <p>Congratulations {statsObject.username}, you win!</p>
          <p>Score {statsObject.score}</p>
          <p>Time</p>
          <p>
            {String(statsObject.minutes).length < 2 && 0}
            {statsObject.minutes}:{String(statsObject.seconds).length < 2 && 0}
            {statsObject.seconds}
          </p>
        </div>
        <button
          onClick={(e) => {
            handlePlayAgain(e);
          }}
        >
          Play again
        </button>
        <br />
        <button
          onClick={(e) => {
            handleHome(e);
          }}
        >
          Home
        </button>
        <button onClick={handleLeaderboard}>Show Leaderboard</button>
      </div>
    </div>
  );
}
