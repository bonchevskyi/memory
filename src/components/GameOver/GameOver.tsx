import useSound from 'use-sound';
import useSounds from 'hooks/useSounds';
import Backdrop from 'components/Backdrop/Backdrop';
import mouseClickSound from 'assets/sounds/mouseclick.mp3';
import { ModalButton } from 'GlobalStyles';
import { ButtonsWrap, GameOverDiv } from './GameOver.styled';

function GameOver({ handleClose, turns, newGame }) {
    const { sounds } = useSounds();

    const [playClick] = useSound(mouseClickSound, {
        volume: 0.05,
        soundEnabled: sounds,
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
            <GameOverDiv
              onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
              className="modal"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
                <h1>Game Over</h1>
                <p>
                    Congratulation! You finished with
                    {turns}
                    {' '}
                    turns!
                </p>
                <ButtonsWrap>
                    <ModalButton
                      onMouseDown={playClick}
                      hovercolor="#282828"
                      onClick={handleClose}
                    >
                        Close
                    </ModalButton>
                    <ModalButton
                      onMouseDown={playClick}
                      hovercolor="rgba(40, 40, 40, 0.5)"
                      onClick={newGame}
                    >
                        Retry
                    </ModalButton>
                </ButtonsWrap>
            </GameOverDiv>
        </Backdrop>
    );
}

export default GameOver;
