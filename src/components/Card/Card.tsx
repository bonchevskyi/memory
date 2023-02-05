import { AnimatePresence } from 'framer-motion';
import { CardIT } from 'types';
import useSounds from 'hooks/useSounds';
import cardSound from 'assets/sounds/card.mp3';
import { cardVariants } from 'components/animations';
import { CardBack, CardFront, CardMain } from './Card.styled';

interface Props {
    card: CardIT,
    handlePick(card: CardIT): void,
    flipped: boolean,
    disabled: boolean,
    cardsAnimationState: string,
}

function Card({
    card, handlePick, flipped, disabled, cardsAnimationState,
}: Props) {
    const { sounds } = useSounds();

    const play = () => {
        if (sounds) {
            const sound = new Audio(cardSound);
            sound.volume = 0.25;
            sound.play();
        }
    };

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
