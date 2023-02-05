import { createContext, useState } from 'react';

const useValue = () => {
    const [sounds, setSounds] = useState<T>(() => {
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

export function SoundProvider({ children }) {
    return (
        <SoundContext.Provider value={useValue()}>{children}</SoundContext.Provider>
    );
}

export default SoundContext;
