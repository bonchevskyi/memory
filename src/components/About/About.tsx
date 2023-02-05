import useSounds from 'hooks/useSounds';
import Backdrop from 'components/Backdrop/Backdrop';
import mouseClickSound from 'assets/sounds/mouseclick.mp3';
import hoverSound from 'assets/sounds/hover2.mp3';
import { dropIn } from 'components/animations';
import { ModalButton } from 'GlobalStyles';
import AboutDiv from './About.styled';

interface Props {
    handleClose(): void,
}

function About({ handleClose }: Props) {
    const { sounds } = useSounds();

    const playHover = () => {
        if (sounds) {
            const sound = new Audio(hoverSound);
            sound.volume = 0.15;
            sound.play();
        }
    };

    const playClick = () => {
        if (sounds) {
            const sound = new Audio(mouseClickSound);
            sound.volume = 0.05;
            sound.play();
        }
    };

    return (
        <Backdrop onClick={handleClose}>
            <AboutDiv
              onAnimationStart={() => { document.body.style.overflow = 'hidden'; }}
              onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
              className="modal"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
                <h1>About game:</h1>
                <p>
                    Hi, this game is about matching cards! Here some rules:
                    {' '}
                    <br />
                    {' '}
                    <br />
                    {' '}
&nbsp; &#10112; Peek a card ☝
                    <br />
                    {' '}
                    &nbsp; &#10113; Find a
                    matching card to it 🔎
                    <br />
                    {' '}
&nbsp; &#10114; Enjoy 🙂
                    <br />
                    {' '}
                    <br />
                    Also you can choose a number or cards in a pool to adjust game
                    difficulty as well as their type to match your preffereces.
                    <br />
                    <span>
                        PS: theme changer and sound toggle buttons are also there :)
                        {' '}
                    </span>
                </p>
                <ModalButton
                  onMouseDown={playClick}
                  onMouseEnter={playHover}
                  hoverColor="rgba(40, 40, 40, 0.5)"
                  onClick={handleClose}
                >
                    Close
                </ModalButton>
            </AboutDiv>
        </Backdrop>
    );
}

export default About;
