import React, { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { GridDiv, SettingsDiv, SetDiv } from "./Settings.styled";
import { ModalButton } from "../../GlobalStyles";
import useSound from "use-sound";
import useSounds from "../../hooks/useSounds";
import hoverSound from "../../sounds/hover2.mp3";
import mouseClickSound from "../../sounds/mouseclick.mp3";

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

  const handleRadioCardsChange = (e) => {
    handleCardsPool(e.target.value);
  };

  const handleRadioTypeChange = (e) => {
    handleCardsType(e.target.value);
  };

  const handleClick = () => {
    handleSettingsSave();
  };

  const [prevCardsPoolValue] = useState(() => {
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

  const [prevCardsTypeValue] = useState(() => {
    const saved = localStorage.getItem("cardsType");
    const initialValue = JSON.parse(saved);
    if (initialValue === "shapes") {
      return "shapes";
    } else if (initialValue === "animals") {
      return "animals";
    } else if (initialValue === "letters") {
      return "letters";
    } else {
      return "shapes";
    }
  });

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <>
      <Backdrop onClick={handleClose}>
        <SettingsDiv
          onClick={(e) => e.stopPropagation()}
          onAnimationStart={() => (document.body.style.overflow = "hidden")}
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
              <label
                className="radio-label"
                onMouseEnter={playHover}
                onMouseDown={playClick}
              >
                <input
                  type="radio"
                  className="radio-input"
                  name="radio-cards"
                  value="four"
                  defaultChecked={prevCardsPoolValue === "four"}
                />
                <div className="radio-design"></div>
                <div className="radio-text">4 CARDS</div>
              </label>
              <label
                className="radio-label"
                onMouseEnter={playHover}
                onMouseDown={playClick}
              >
                <input
                  type="radio"
                  className="radio-input"
                  name="radio-cards"
                  value="six"
                  defaultChecked={prevCardsPoolValue === "six"}
                />
                <div className="radio-design"></div>
                <div className="radio-text">6 CARDS</div>
              </label>
              <label
                className="radio-label"
                onMouseEnter={playHover}
                onMouseDown={playClick}
              >
                <input
                  type="radio"
                  className="radio-input"
                  name="radio-cards"
                  value="eight"
                  defaultChecked={prevCardsPoolValue === "eight"}
                />
                <div className="radio-design"></div>
                <div className="radio-text">8 CARDS</div>
              </label>
            </SetDiv>
            <SetDiv onChange={handleRadioTypeChange}>
              <p>Card sets:</p>
              <label
                className="radio-label"
                onMouseEnter={playHover}
                onMouseDown={playClick}
              >
                <input
                  type="radio"
                  className="radio-input"
                  name="radio-type"
                  value="shapes"
                  defaultChecked={prevCardsTypeValue === "shapes"}
                />
                <div className="radio-design"></div>
                <div className="radio-text">SHAPES &#160;</div>
              </label>
              <label
                className="radio-label"
                onMouseEnter={playHover}
                onMouseDown={playClick}
              >
                <input
                  type="radio"
                  className="radio-input"
                  name="radio-type"
                  value="animals"
                  defaultChecked={prevCardsTypeValue === "animals"}
                />
                <div className="radio-design"></div>
                <div className="radio-text">ANIMALS</div>
              </label>
              <label
                className="radio-label"
                onMouseEnter={playHover}
                onMouseDown={playClick}
              >
                <input
                  type="radio"
                  className="radio-input"
                  name="radio-type"
                  value="letters"
                  defaultChecked={prevCardsTypeValue === "letters"}
                />
                <div className="radio-design"></div>
                <div className="radio-text">LETTERS</div>
              </label>
            </SetDiv>
          </GridDiv>

          <ModalButton
            onMouseDown={playClick}
            hovercolor="rgba(40, 40, 40, 0.5)"
            onClick={handleClick}
          >
            Save &amp; Exit
          </ModalButton>
        </SettingsDiv>
      </Backdrop>
    </>
  );
}

export default Settings;
