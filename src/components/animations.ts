export const headerVariants = {
    hidden: {
        opacity: 0,
        y: '-100vh',
    },
    visibleStart: {
        opacity: 1,
        y: '30vh',
        transition: {
            delay: 0.5,
            duration: 1,
            ease: 'easeInOut',
        },
    },
    visibleEnd: {
        opacity: 1,
        y: '80%',
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
    visibleEnd2: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};

export const gameDivVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 1,
        },
    },
    out: {
        opacity: 0,
        transition: {
            delay: 0,
            duration: 1,
        },
    },
    exit: {
    // y: '100vh',
    // transition: {
    //   delay: 0.5,
    //   duration: 2,
    // },
    },
};

export const buttonVariants = {
    hidden: {
        y: '100vh',
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        x: [0, -10, 10, 0],
        transition: {
            duration: 2,
        },
    },
    hover: {
        scale: 1.1,
        transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 0.5,
        },
    },
};

export const cardVariants = {
    hidden: {
        x: 0,
        opacity: 0,
        transition: {
            delay: 0,
            duration: 2,
        },
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 0,
            duration: 1.2,
            ease: 'easeInOut',
        },
    },
    out: {
        x: '-100vw',
        opacity: 1,
        transition: {
            delay: 0,
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
    exit: {
        x: '100vw',
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 2,
        },
    },
    hover: {
        scale: 1.05,
    },
};

export const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

export const svgVariants = {
    animate: {
        scale: 1.2,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
            when: 'beforeChildren',
        },
    },
};
