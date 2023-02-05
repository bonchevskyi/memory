import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import useSound from 'use-sound';
import useSounds from 'hooks/useSounds';
import shuffleSound from 'assets/sounds/shuffle.mp3';
import hoverSound from 'assets/sounds/hover2.mp3';
import mouseClickSound from 'assets/sounds/mouseclick.mp3';
import correctSound from 'assets/sounds/correct.mp3';
import wrongSound from 'assets/sounds/wrong.mp3';
import gameEndedSound from 'assets/sounds/end.mp3';

import Card from 'components/Card/Card';
import GameOver from 'components/GameOver/GameOver';
import Loader from 'components/Loader/Loader';
import About from 'components/About/About';
import Settings from 'components/Settings/Settings';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io';

import EnumCardType from 'enums/EnumCardType';
import EnumCardNumber from 'enums/EnumCardNumber';
import { lightTheme, darkTheme } from './themes';
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
} from './components/cardSets';
import {
    headerVariants,
    buttonVariants,
    gameDivVariants,
} from './components/animations';
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
} from './GlobalStyles';

function App() {
    const { sounds, setSounds } = useSounds();
    const [pickedSounds, setPickedSounds] = useState(null);
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [settings, setSettings] = useState(false);
    const [about, setAbout] = useState(false);
    const [loading, setLoading] = useState(true);

    const [pickedCards, setPickedCards] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('cardsSet'));
        if (!saved || saved === EnumCardNumber.SIX) {
            return EnumCardNumber.SIX;
        }
        if (saved === EnumCardNumber.FOUR) {
            return EnumCardNumber.FOUR;
        }
        if (saved === EnumCardNumber.EIGHT) {
            return EnumCardNumber.EIGHT;
        }
    });

    const [cardsType, setCardsType] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('cardsType'));
        if (!saved || saved === EnumCardType.SHAPES) {
            return EnumCardType.SHAPES;
        }
        if (saved === EnumCardType.ANIMALS) {
            return EnumCardType.ANIMALS;
        }
        if (saved === EnumCardType.LETTERS) {
            return EnumCardType.LETTERS;
        }
    });

    const [cardsPool, setCardsPool] = useState(() => {
        const savedValue = JSON.parse(localStorage.getItem('cardsSet'));
        return savedValue || EnumCardNumber.SIX;
    });

    const [cardsImg, setCardsImg] = useState(() => {
        const savedValue = JSON.parse(localStorage.getItem('cardsSet'));
        const savedType = JSON.parse(localStorage.getItem('cardsType')) || EnumCardType.SHAPES;

        if (savedType === EnumCardType.SHAPES) {
            if (!savedValue || savedValue === EnumCardNumber.SIX) {
                return cardsShapesImgSix;
            }
            if (savedValue === EnumCardNumber.FOUR) {
                return cardsShapesImgFour;
            }
            if (savedValue === EnumCardNumber.EIGHT) {
                return cardsShapesImgEight;
            }
        } else if (savedType === EnumCardType.ANIMALS) {
            if (!savedValue || savedValue === EnumCardNumber.SIX) {
                return cardsAnimalsImgSix;
            }
            if (savedValue === EnumCardNumber.FOUR) {
                return cardsAnimalsImgFour;
            }
            if (savedValue === EnumCardNumber.EIGHT) {
                return cardsAnimalsImgEight;
            }
        } else if (savedType === EnumCardType.LETTERS) {
            if (!savedValue || savedValue === EnumCardNumber.SIX) {
                return cardsLettersImgSix;
            }
            if (savedValue === EnumCardNumber.FOUR) {
                return cardsLettersImgFour;
            }
            if (savedValue === EnumCardNumber.EIGHT) {
                return cardsLettersImgEight;
            }
        }
    });

    const [bestScore, setBestScore] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('bestScore'));
        return saved || 'TBD';
    });

    const [headerAnimationState, setHeaderAnimationState] = useState('visibleStart');

    const [gameDivAnimationState, setGameDivAnimationState] = useState('visible');
    const [cardsAnimationState, setCardsAnimationState] = useState('visible');

    const [rerender, setRerender] = useState(false);
    const [theme, setTheme] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('theme'));
        if (!saved) {
            return 'dark';
        }
        return saved === 'dark' ? 'dark' : 'light';
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
        playClick();
        if (theme === 'dark') {
            setTheme('light');
            localStorage.setItem('theme', JSON.stringify('light'));
        } else {
            setTheme('dark');
            localStorage.setItem('theme', JSON.stringify('dark'));
        }
    };

    const toggleSounds = () => {
        playClick();
        if (sounds === true) {
            setSounds(false);
            localStorage.setItem('sounds', JSON.stringify(false));
        } else if (sounds === false) {
            setSounds(true);
            localStorage.setItem('sounds', JSON.stringify(true));
        }
    };

    // shuffle cards for new game

    const shuffleCards = () => {
        setCardsAnimationState('out');
        setGameDivAnimationState('out');
        setTimeout(() => {
            setCardsAnimationState('visible');
            setGameDivAnimationState('visible');
        }, 1000);

        playShuffle();
        setCards([]);

        const shuffledCards = [...cardsImg, ...cardsImg]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setFirstCard(null);
        setSecondCard(null);
        setCards(shuffledCards);
        setHeaderAnimationState('visibleEnd2');
        setTimeout(() => {
            setTurns(0);
        }, 1000);
    };

    const checkEnd = () => {
        const isEnd = cards.every((card) => card.matched === true);

        if (isEnd && cards.length > 0) {
            setGameOver(true);
            playEnd();
            if (typeof bestScore === 'string') {
                setBestScore(turns);
                localStorage.setItem('bestScore', JSON.stringify(turns));
                return;
            }
            if (bestScore > turns) {
                setBestScore(turns);
                localStorage.setItem('bestScore', JSON.stringify(turns));
            }
        }
    };

    const handlePick = (card) => {
        if (firstCard) {
            setSecondCard(card);
        } else {
            setFirstCard(card);
        }
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

    const rerenderCards = () => {
        setRerender(!rerender);
    };

    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    const handleSettingsSave = () => {
        setSettings(false);
        const savedCards = JSON.parse(localStorage.getItem('cardsSet'));
        const savedType = JSON.parse(localStorage.getItem('cardsType'));

        if (savedCards !== pickedCards || savedType !== cardsType) {
            if (pickedCards === EnumCardNumber.FOUR) {
                if (cardsType === 'shapes') {
                    setCardsImg(cardsShapesImgFour);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                if (cardsType === 'animals') {
                    setCardsImg(cardsAnimalsImgFour);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                if (cardsType === 'letters') {
                    setCardsImg(cardsLettersImgFour);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                setCardsPool(EnumCardNumber.FOUR);
                localStorage.setItem('cardsSet', JSON.stringify(pickedCards));
            }
            if (pickedCards === EnumCardNumber.SIX) {
                if (cardsType === 'shapes') {
                    setCardsImg(cardsShapesImgSix);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                if (cardsType === 'animals') {
                    setCardsImg(cardsAnimalsImgSix);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                if (cardsType === 'letters') {
                    setCardsImg(cardsLettersImgSix);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                setCardsPool(EnumCardNumber.SIX);
                localStorage.setItem('cardsSet', JSON.stringify(pickedCards));
            }
            if (pickedCards === EnumCardNumber.EIGHT) {
                if (cardsType === 'shapes') {
                    setCardsImg(cardsShapesImgEight);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                if (cardsType === 'animals') {
                    setCardsImg(cardsAnimalsImgEight);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                if (cardsType === 'letters') {
                    setCardsImg(cardsLettersImgEight);
                    localStorage.setItem('cardsType', JSON.stringify(cardsType));
                }
                setCardsPool(EnumCardNumber.EIGHT);
                localStorage.setItem('cardsSet', JSON.stringify(pickedCards));
            }

            if (cards.length > 0) {
                rerenderCards();
            }
        }

        if (pickedSounds === 'sound-on') {
            setSounds(true);
            localStorage.setItem('sounds', JSON.stringify(true));
        }
        if (pickedSounds === 'sound-off') {
            setSounds(false);
            localStorage.setItem('sounds', JSON.stringify(false));
        }
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
                setTimeout(() => {
                    playCorrect();
                }, 500);
                setCards((prevCards) => prevCards.map((card) => {
                    if (card.src !== firstCard.src) {
                        return card;
                    }
                    return { ...card, matched: true };
                }));
                setTimeout(() => resetTurn(), 1000);
            } else {
                setTimeout(() => {
                    playWrong();
                }, 500);
                setTimeout(() => resetTurn(), 1000);
            }
        }
        checkEnd();
    }, [firstCard, secondCard]);

    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
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
                                {theme === 'dark' ? (
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

                    <AnimatePresence exitBeforeEnter>
                        {cards.length > 0 && (
                            <GameDiv
                              variants={gameDivVariants}
                              initial="hidden"
                              animate={gameDivAnimationState}
                              exit="exit"
                            >
                                <Scoreboard>
                                    <p>
                                        Turns:
                                        {turns}
                                    </p>
                                    <p>
                                        Best:
                                        {bestScore}
                                    </p>
                                </Scoreboard>

                                <Grid className={cardsPool}>
                                    {cards.map((card) => (
                                        <Card
                                          key={card.id}
                                          card={card}
                                          handlePick={handlePick}
                                          flipped={
                                                card === firstCard
                          || card === secondCard
                          || card.matched
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
                      exitBeforeEnter
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
                      exitBeforeEnter
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
                      exitBeforeEnter
                      onExitComplete={() => null}
                    >
                        {about && (
                            <About about={about} handleClose={() => setAbout(false)} />
                        )}
                    </AnimatePresence>
                    <Footer>
                        made with &hearts; by
                        {' '}
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
    );
}

export default App;
