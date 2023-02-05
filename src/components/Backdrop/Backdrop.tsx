import BackdropDiv from './Backdrop.styled';

function Backdrop({ children, onClick }) {
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
