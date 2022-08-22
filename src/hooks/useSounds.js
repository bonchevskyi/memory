import { useContext } from 'react';
import SoundContext from '../context/SoundProvider';

const useSounds = () => {
  return useContext(SoundContext);
};

export default useSounds;
