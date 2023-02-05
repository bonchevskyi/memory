import { createContext, useState } from 'react';

interface Props {
    children: React.ReactNode,
}

const useValue = () => {
    const [sounds, setSounds] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('sounds'));
        if (saved) {
            localStorage.setItem('sounds', JSON.stringify(true));
            return true;
        }
        return saved;
    });

    return {
        sounds,
        setSounds,
    };
};

export const SoundContext = createContext({} as ReturnType<typeof useValue>);

export function SoundProvider({ children }: Props) {
    return (
        <SoundContext.Provider value={useValue()}>{ children }</SoundContext.Provider>
    );
}

export default SoundContext;
