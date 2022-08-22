import React, { useState } from 'react';
import { ImgDiv, ImgSvg } from './Loader.styled';
import LoaderWhite from './loader-white.svg';
import LoaderBlack from './loader-black.svg';

function Loader() {
  const [theme] = useState(() => {
    const saved = localStorage.getItem('theme');
    const initialValue = JSON.parse(saved);
    if (initialValue === 'dark') {
      return 'dark';
    } else if (initialValue === 'light') {
      return 'light';
    } else {
      return 'dark';
    }
  });

  const svgVariants = {
    animate: {
      scale: 1.2,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
        when: 'beforeChildren',
      },
    },
  };

  return (
    <>
      <ImgDiv>
        <ImgSvg
          src={theme === 'dark' ? LoaderWhite : LoaderBlack}
          alt='Loading...'
          variants={svgVariants}
          animate='animate'
        ></ImgSvg>
      </ImgDiv>
    </>
  );
}

export default Loader;
