import { useState } from 'react';
import LoaderWhite from 'assets/svg/loader-white.svg';
import LoaderBlack from 'assets/svg/loader-black.svg';
import { svgVariants } from 'components/animations';
import { ImgDiv, ImgSvg } from './Loader.styled';

function Loader() {
    const [theme] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('theme'));
        if (!saved) {
            return 'dark';
        }
        return saved === 'dark' ? 'dark' : 'light';
    });

    return (
        <ImgDiv>
            <ImgSvg
              src={theme === 'dark' ? LoaderWhite : LoaderBlack}
              alt="Loading..."
              variants={svgVariants}
              animate="animate"
            />
        </ImgDiv>
    );
}

export default Loader;
