import { Variants } from 'framer-motion';

declare module '*.mp3';

type Props = {
    onMouseEnter?(): void,
    onMouseDown?(): void,
    onClick?(): void,

    variants?: Variants,
    initial?: string,
    animate?: string,
    whileHover?: string,

    hoverColor?: string,
};

interface CardIT {
    src: string,
    matched: boolean,
}
