import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { CardBack, CardFront, CardMain } from './Card.styled';
import useSound from 'use-sound';
import cardSound from '../../sounds/card.mp3';
import useSounds from '../../hooks/useSounds';

function Card({ card, handlePick, flipped, disabled, cardsAnimationState }) {
  const { sounds } = useSounds();

  const [play] = useSound(cardSound, {
    volume: 0.25,
    soundEnabled: sounds,
  });

  const handleClick = () => {
    if (!disabled) {
      play();
      handlePick(card);
    }
  };

  const cardVariants = {
    hidden: {
      x: 0,
      opacity: 0,
      transition: {
        delay: 0,
        duration: 2,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0,
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
    out: {
      x: '-100vw',
      opacity: 1,
      transition: {
        delay: 0,
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      x: '100vw',
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 2,
      },
    },
    hover: {
      scale: 1.05,
    },
  };

  return (
    <>
      <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
        <CardMain
          className={flipped ? 'flipped' : ''}
          variants={cardVariants}
          initial='hidden'
          animate={cardsAnimationState}
          whileHover='hover'
          exit='exit'
        >
          <CardFront src={card.src} alt='card front' />
          <CardBack onClick={handleClick} src='/images/cover.png' alt='cover' />
        </CardMain>
      </AnimatePresence>
    </>
  );
}

export default Card;
