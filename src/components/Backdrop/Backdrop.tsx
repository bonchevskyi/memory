import BackdropDiv from './Backdrop.styled';

interface Props {
    children: React.ReactNode,
    onClick(): void,
}

function Backdrop({ children, onClick }: Props) {
    return (
        <BackdropDiv
          className="backdrop"
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
            {children}
        </BackdropDiv>
    );
}

export default Backdrop;
