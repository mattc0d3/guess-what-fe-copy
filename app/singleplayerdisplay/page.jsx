"use client";

import EndGameModal from "@/components/EndGameModal";
import { Footer } from "@/components/Footer";
import Gameboard from "@/components/Gameboard";
import { Header } from "@/components/Header";
import OpponentCard from "@/components/OpponentCard";
import QuestionCard from "@/components/QuestionCard";
import UserStats from "@/components/UserStats";
import { useState, useEffect, useContext } from "react";
import { getAliens } from "../utils/getAliens";
import chooseSecretAlien from "../utils/chooseSecretAlien";
import { ThisUserContext } from '@/contexts/ThisUser';

export default function SinglePlayerDisplay() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alienObjects, setAlienObjects] = useState([]);
  const [chosenAlien, setChosenAlien] = useState();
  const [hasWon, setHasWon] = useState(null);
  const { thisUser, setThisUser } = useContext(ThisUserContext);

  console.log(thisUser, "<<<<<< this user in single player display")

  useEffect(() => {
    if (!isGameFinished) {
      getAliens().then((res) => {
        setAlienObjects(res);
        setIsLoading(false);
        setChosenAlien(chooseSecretAlien(res));
      });
    }
  }, [isGameFinished]);

  return (
    <main>
      <Header />
      <div className="game-wrapper">
        {isGameFinished && (
          <EndGameModal
            chosenAlien={chosenAlien}
            setIsGameFinished={setIsGameFinished}
            setHasWon={setHasWon}
            setIsLoading={setIsLoading}
          />
        )}
        <Gameboard
          isLoading={isLoading}
          alienObjects={alienObjects}
          setAlienObjects={setAlienObjects}
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
        <UserStats alienObjects={alienObjects} isGameFinished={isGameFinished} isLoading={isLoading}/>
      </div>
      <Footer />
    </main>
  );
}
