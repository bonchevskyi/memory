import { useContext } from 'react';
import SoundContext from 'context/SoundProvider';

interface SoundsITF {
    sounds: boolean,
    setSounds: React.Dispatch<React.SetStateAction<boolean>>
}

const useSounds = (): SoundsITF => useContext(SoundContext);

export default useSounds;
