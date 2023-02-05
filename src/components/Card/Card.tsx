import useSound from 'use-sound';
import { AnimatePresence } from 'framer-motion';
import useSounds from 'hooks/useSounds';
import cardSound from 'assets/sounds/card.mp3';
import { cardVariants } from 'components/animations';
import { CardBack, CardFront, CardMain } from './Card.styled';

function Card({
    card, handlePick, flipped, disabled, cardsAnimationState,
}) {
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

    return (
        <AnimatePresence exitBeforeEnter onExitComplete={() => null}>
            <CardMain
              className={flipped ? 'flipped' : ''}
              variants={cardVariants}
              initial="hidden"
              animate={cardsAnimationState}
              whileHover="hover"
              exit="exit"
            >
                <CardFront src={card.src} alt="card" />
                <CardBack onClick={handleClick} src="/images/cover.png" alt="cover" />
            </CardMain>
        </AnimatePresence>
    );
}

export default Card;
