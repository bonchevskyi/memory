import GlobalStyles, {
  GameDiv,
  Grid,
  HeaderDiv,
  Btn,
  ThemeIcon,
  GlobalWrap,
  IconsBar,
  Scoreboard,
  Footer,
} from "./GlobalStyles";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import useSound from "use-sound";
import useSounds from "./hooks/useSounds";
import shuffleSound from "./sounds/shuffle.mp3";
import hoverSound from "./sounds/hover2.mp3";
import mouseClickSound from "./sounds/mouseclick.mp3";
import correctSound from "./sounds/correct.mp3";
import wrongSound from "./sounds/wrong.mp3";
import gameEndedSound from "./sounds/end.mp3";

import Card from "./components/Card/Card";
import GameOver from "./components/GameOver/GameOver";
import Loader from "./components/Loader/Loader";
import About from "./components/About/About";
import Settings from "./components/Settings/Settings";

import { MdDarkMode, MdLightMode } from "react-icons/md";

import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

import {
  cardsShapesImgFour,
  cardsShapesImgSix,
  cardsShapesImgEight,
  cardsAnimalsImgFour,
  cardsAnimalsImgSix,
  cardsAnimalsImgEight,
  cardsLettersImgFour,
  cardsLettersImgSix,
  cardsLettersImgEight,
} from "./CardSets";

import {
  headerVariants,
  buttonVariants,
  gameDivVariants,
} from "./MainAnimations";

function App() {
  const { sounds, setSounds } = useSounds();
  const [pickedSounds, setPickedSounds] = useState(null);
  const [pickedCards, setPickedCards] = useState(() => {
    const saved = localStorage.getItem("cardsSet");
    const initialValue = JSON.parse(saved);
    if (initialValue === "four") {
      return "four";
    } else if (initialValue === "six") {
      return "six";
    } else if (initialValue === "eight") {
      return "eight";
    } else {
      return "six";
    }
  });

  const [cardsType, setCardsType] = useState(() => {
    const saved = localStorage.getItem("cardsType");
    const initialValue = JSON.parse(saved);
    if (initialValue === "shapes") {
      return "shapes";
    } else if (initialValue === "animals") {
      return "animals";
    } else {
      return "shapes";
    }
  });

  const [cardsPool, setCardsPool] = useState(() => {
    const saved = localStorage.getItem("cardsSet");
    const initialValue = JSON.parse(saved);
    return initialValue || "six";
  });

  const [cardsImg, setCardsImg] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem("cardsSet"));
    const savedType = JSON.parse(localStorage.getItem("cardsType")) || "shapes";

    if (savedType === "shapes") {
      if (savedValue === "four") {
        return cardsShapesImgFour;
      } else if (savedValue === "six") {
        return cardsShapesImgSix;
      } else if (savedValue === "eight") {
        return cardsShapesImgEight;
      } else {
        return cardsShapesImgSix;
      }
    } else if (savedType === "animals") {
      if (savedValue === "four") {
        return cardsAnimalsImgFour;
      } else if (savedValue === "six") {
        return cardsAnimalsImgSix;
      } else if (savedValue === "eight") {
        return cardsAnimalsImgEight;
      } else {
        return cardsAnimalsImgSix;
      }
    } else if (savedType === "letters") {
      if (savedValue === "four") {
        return cardsLettersImgFour;
      } else if (savedValue === "six") {
        return cardsLettersImgSix;
      } else if (savedValue === "eight") {
        return cardsLettersImgEight;
      } else {
        return cardsLettersImgSix;
      }
    }
  });

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("bestScore");
    const initialValue = JSON.parse(saved);
    return initialValue || "TBD";
  });
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [settings, setSettings] = useState(false);
  const [about, setAbout] = useState(false);
  const [loading, setLoading] = useState(true);

  const [headerAnimationState, setHeaderAnimationState] =
    useState("visibleStart");

  const [gameDivAnimationState, setGameDivAnimationState] = useState("visible");
  const [cardsAnimationState, setCardsAnimationState] = useState("visible");

  const [rerender, setRerender] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    const initialValue = JSON.parse(saved);
    if (initialValue === "dark") {
      return "dark";
    } else if (initialValue === "light") {
      return "light";
    } else {
      return "dark";
    }
  });

  const [playShuffle] = useSound(shuffleSound, {
    volume: 0.15,
    soundEnabled: sounds,
  });

  const [playHover] = useSound(hoverSound, {
    volume: 0.15,
    soundEnabled: sounds,
  });

  const [playClick] = useSound(mouseClickSound, {
    volume: 0.05,
    soundEnabled: sounds,
  });

  const [playCorrect] = useSound(correctSound, {
    volume: 0.05,
    soundEnabled: sounds,
  });

  const [playWrong] = useSound(wrongSound, {
    volume: 0.05,
    soundEnabled: sounds,
  });

  const [playEnd] = useSound(gameEndedSound, {
    volume: 0.05,
    soundEnabled: sounds,
  });

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", JSON.stringify("light"));
    } else {
      setTheme("dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
    }
  };

  const toggleSounds = () => {
    if (sounds === true) {
      setSounds(false);
      localStorage.setItem("sounds", JSON.stringify(false));
    } else if (sounds === false) {
      setSounds(true);
      localStorage.setItem("sounds", JSON.stringify(true));
    }
  };

  // shuffle cards for new game

  const shuffleCards = () => {
    setCardsAnimationState("out");
    setGameDivAnimationState("out");
    setTimeout(() => {
      setCardsAnimationState("visible");
      setGameDivAnimationState("visible");
    }, 1000);

    playShuffle();
    setCards([]);
    const shuffledCards = [...cardsImg, ...cardsImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setFirstCard(null);
    setSecondCard(null);
    setCards(shuffledCards);
    setHeaderAnimationState("visibleEnd2");
    setTimeout(() => {
      setTurns(0);
    }, 1000);
  };

  const checkEnd = () => {
    const isEnd = cards.every((card) => card.matched === true);
    if (isEnd && cards.length > 0) {
      setGameOver(true);
      playEnd();
      const saved = localStorage.getItem("bestScore");
      const initialValue = JSON.parse(saved);
      if (initialValue) {
        if (bestScore > turns) {
          setBestScore(turns);
          localStorage.setItem("bestScore", JSON.stringify(turns));
        }
      } else {
        setBestScore(turns);
        localStorage.setItem("bestScore", JSON.stringify(turns));
      }
    }
  };

  const handlePick = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  const handleCardsPool = (val) => {
    setPickedCards(val);
  };

  const handleCardsType = (val) => {
    setCardsType(val);
  };

  const handleSounds = (val) => {
    setPickedSounds(val);
  };

  const handleSettingsSave = () => {
    setSettings(false);
    const savedCards = localStorage.getItem("cardsSet");
    const initialValueCards = JSON.parse(savedCards);

    const savedType = localStorage.getItem("cardsType");
    const initialValueType = JSON.parse(savedType);

    if (initialValueCards !== pickedCards || initialValueType !== cardsType) {
      if (pickedCards === "four") {
        if (cardsType === "shapes") {
          setCardsImg(cardsShapesImgFour);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        if (cardsType === "animals") {
          setCardsImg(cardsAnimalsImgFour);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        if (cardsType === "letters") {
          setCardsImg(cardsLettersImgFour);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        setCardsPool("four");
        localStorage.setItem("cardsSet", JSON.stringify(pickedCards));
      }
      if (pickedCards === "six") {
        if (cardsType === "shapes") {
          setCardsImg(cardsShapesImgSix);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        if (cardsType === "animals") {
          setCardsImg(cardsAnimalsImgSix);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        if (cardsType === "letters") {
          setCardsImg(cardsLettersImgSix);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        setCardsPool("six");
        localStorage.setItem("cardsSet", JSON.stringify(pickedCards));
      }
      if (pickedCards === "eight") {
        if (cardsType === "shapes") {
          setCardsImg(cardsShapesImgEight);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        if (cardsType === "animals") {
          setCardsImg(cardsAnimalsImgEight);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        if (cardsType === "letters") {
          setCardsImg(cardsLettersImgEight);
          localStorage.setItem("cardsType", JSON.stringify(cardsType));
        }
        setCardsPool("eight");
        localStorage.setItem("cardsSet", JSON.stringify(pickedCards));
      }

      if (cards.length > 0) {
        rerenderCards();
      }
    }

    if (pickedSounds === "sound-on") {
      setSounds(true);
      localStorage.setItem("sounds", JSON.stringify(true));
    }
    if (pickedSounds === "sound-off") {
      setSounds(false);
      localStorage.setItem("sounds", JSON.stringify(false));
    }
  };

  const rerenderCards = () => {
    setRerender(!rerender);
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (rerender === true) {
      shuffleCards();
      setRerender(false);
    }
  }, [rerender]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.src === secondCard.src) {
        //console.log("CARDS DO MATCH!");
        setTimeout(() => {
          playCorrect();
        }, 500);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => resetTurn(), 1000);
      } else {
        setTimeout(() => {
          playWrong();
        }, 500);
        //console.log("CARDS DO NOT MATCH!");
        setTimeout(() => resetTurn(), 1000);
      }
    }
    checkEnd();
  }, [firstCard, secondCard]);

  return (
    <>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyles />

        {loading ? (
          <Loader />
        ) : (
          <div className="App">
            <GlobalWrap
              variants={headerVariants}
              initial="hidden"
              animate={headerAnimationState}
            >
              <HeaderDiv>
                <h1>Memory</h1>
                <h1>Match</h1>

                <Btn
                  onMouseDown={playClick}
                  onMouseEnter={playHover}
                  hovercolor="rgba(27, 92, 62, 1)"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={shuffleCards}
                  whileHover="hover"
                >
                  New Game
                </Btn>
                <Btn
                  onMouseDown={playClick}
                  onMouseEnter={playHover}
                  hovercolor="coral"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setSettings(true)}
                  whileHover="hover"
                >
                  Settings
                </Btn>
                <Btn
                  onMouseDown={playClick}
                  onMouseEnter={playHover}
                  hovercolor="grey"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setAbout(true)}
                  whileHover="hover"
                >
                  About
                </Btn>
              </HeaderDiv>

              <IconsBar>
                <ThemeIcon onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <MdDarkMode color="white" />
                  ) : (
                    <MdLightMode color="black" />
                  )}
                </ThemeIcon>
                <ThemeIcon onClick={toggleSounds}>
                  {sounds === true ? (
                    <IoMdVolumeHigh color="green" />
                  ) : (
                    <IoMdVolumeOff color="red" />
                  )}
                </ThemeIcon>
              </IconsBar>
            </GlobalWrap>

            <AnimatePresence exitBeforeEnter={true}>
              {cards.length > 0 && (
                <GameDiv
                  variants={gameDivVariants}
                  initial="hidden"
                  animate={gameDivAnimationState}
                  exit="exit"
                >
                  <Scoreboard>
                    <p>Turns: {turns}</p>
                    <p>Best: {bestScore}</p>
                  </Scoreboard>

                  <Grid className={cardsPool}>
                    {cards.map((card) => (
                      <Card
                        key={card.id}
                        card={card}
                        handlePick={handlePick}
                        flipped={
                          card === firstCard ||
                          card === secondCard ||
                          card.matched
                        }
                        disabled={disabled}
                        cardsAnimationState={cardsAnimationState}
                      />
                    ))}
                  </Grid>
                </GameDiv>
              )}
            </AnimatePresence>

            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {settings && (
                <Settings
                  handleSettingsSave={handleSettingsSave}
                  handleCardsPool={handleCardsPool}
                  handleCardsType={handleCardsType}
                  handleSounds={handleSounds}
                  settings={settings}
                  handleClose={() => setSettings(false)}
                  newGame={() => {
                    setSettings(false);
                    shuffleCards();
                  }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {gameOver && (
                <GameOver
                  gameOver={gameOver}
                  handleClose={() => setGameOver(false)}
                  turns={turns}
                  newGame={() => {
                    setGameOver(false);
                    shuffleCards();
                  }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {about && (
                <About about={about} handleClose={() => setAbout(false)} />
              )}
            </AnimatePresence>
            <Footer>
              made with &hearts; by{" "}
              <a
                href="https://github.com/bonchevskyi"
                target="_blank"
                rel="noreferrer"
              >
                Roman Bonchevskyi
              </a>
            </Footer>
          </div>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
