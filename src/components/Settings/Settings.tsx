import { useState } from 'react';
import useSound from 'use-sound';
import useSounds from 'hooks/useSounds';
import EnumCardNumber from 'enums/EnumCardNumber';
import Backdrop from 'components/Backdrop/Backdrop';
import hoverSound from 'assets/sounds/hover2.mp3';
import mouseClickSound from 'assets/sounds/mouseclick.mp3';
import { ModalButton } from 'GlobalStyles';
import EnumCardType from 'enums/EnumCardType';
import { GridDiv, SettingsDiv, SetDiv } from './Settings.styled';

function Settings({
    handleClose,
    handleCardsPool,
    handleCardsType,
    handleSettingsSave,
}) {
    const { sounds } = useSounds();

    const [playHover] = useSound(hoverSound, {
        volume: 0.15,
        soundEnabled: sounds,
    });

    const [playClick] = useSound(mouseClickSound, {
        volume: 0.05,
        soundEnabled: sounds,
    });

    const handleRadioCardsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleCardsPool(e.target.value);
    };

    const handleRadioTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleCardsType(e.target.value);
    };

    const handleClick = () => {
        handleSettingsSave();
    };

    const [prevCardsPoolValue] = useState(() => {
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

    const [prevCardsTypeValue] = useState(() => {
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

    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0,
        },
        visible: {
            y: '0',
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: '100vh',
            opacity: 0,
        },
    };

    return (
        <Backdrop onClick={handleClose}>
            <SettingsDiv
              onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
              onAnimationStart={() => { document.body.style.overflow = 'hidden'; }}
              className="modal"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
                <h1>Settings</h1>
                {/* <p>Here are settings!</p> */}
                <GridDiv>
                    <SetDiv onChange={handleRadioCardsChange}>
                        <p>Cards in pool:</p>
                        <label className="radio-label">
                            <input
                              type="radio"
                              className="radio-input"
                              name="radio-cards"
                              value="four"
                              defaultChecked={prevCardsPoolValue === EnumCardNumber.FOUR}
                            />
                            <div className="radio-design" />
                            <div className="radio-text">4 CARDS</div>
                        </label>
                        <label className="radio-label">
                            <input
                              type="radio"
                              className="radio-input"
                              name="radio-cards"
                              value="six"
                              defaultChecked={prevCardsPoolValue === EnumCardNumber.SIX}
                            />
                            <div className="radio-design" />
                            <div className="radio-text">6 CARDS</div>
                        </label>
                        <label className="radio-label">
                            <input
                              type="radio"
                              className="radio-input"
                              name="radio-cards"
                              value="eight"
                              defaultChecked={prevCardsPoolValue === EnumCardNumber.EIGHT}
                            />
                            <div className="radio-design" />
                            <div className="radio-text">8 CARDS</div>
                        </label>
                    </SetDiv>
                    <SetDiv onChange={handleRadioTypeChange}>
                        <p>Card sets:</p>
                        <label className="radio-label">
                            <input
                              type="radio"
                              className="radio-input"
                              name="radio-type"
                              value="shapes"
                              defaultChecked={prevCardsTypeValue === 'shapes'}
                            />
                            <div className="radio-design" />
                            <div className="radio-text">SHAPES &#160;</div>
                        </label>
                        <label className="radio-label">
                            <input
                              type="radio"
                              className="radio-input"
                              name="radio-type"
                              value="animals"
                              defaultChecked={prevCardsTypeValue === 'animals'}
                            />
                            <div className="radio-design" />
                            <div className="radio-text">ANIMALS</div>
                        </label>
                        <label className="radio-label">
                            <input
                              type="radio"
                              className="radio-input"
                              name="radio-type"
                              value="letters"
                              defaultChecked={prevCardsTypeValue === 'letters'}
                            />
                            <div className="radio-design" />
                            <div className="radio-text">LETTERS</div>
                        </label>
                    </SetDiv>
                </GridDiv>

                <ModalButton
                  onMouseDown={playClick}
                  onMouseEnter={playHover}
                  hovercolor="rgba(40, 40, 40, 0.5)"
                  onClick={handleClick}
                >
                    Save &amp; Exit
                </ModalButton>
            </SettingsDiv>
        </Backdrop>
    );
}

export default Settings;
