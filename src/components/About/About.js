import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { AboutDiv } from "./About.styled";
import { ModalButton } from "../../GlobalStyles";
import useSound from "use-sound";
import useSounds from "../../hooks/useSounds";
import mouseClickSound from "../../sounds/mouseclick.mp3";

function About({ handleClose }) {
  const { sounds } = useSounds();

  const [playClick] = useSound(mouseClickSound, {
    volume: 0.05,
    soundEnabled: sounds,
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
        <AboutDiv
          onAnimationStart={() => (document.body.style.overflow = "hidden")}
          onClick={(e) => e.stopPropagation()}
          className="modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h1>About game:</h1>
          <p>
            Hi, this game is about matching cards! Here some rules: <br />{" "}
            <br /> &nbsp; &#10112; Peek a card ☝ <br /> &nbsp; &#10113; Find a
            matching card to it 🔎 <br /> &nbsp; &#10114; Enjoy 🙂 <br /> <br />
            Also you can choose a number or cards in a pool to adjust game
            difficulty as well as their type to match your preffereces.
            <br />
            <span>
              PS: theme changer and sound toggle buttons are also there :){" "}
            </span>
          </p>
          <ModalButton
            onMouseDown={playClick}
            hovercolor="rgba(40, 40, 40, 0.5)"
            onClick={handleClose}
          >
            Close
          </ModalButton>
        </AboutDiv>
      </Backdrop>
    </>
  );
}

export default About;
