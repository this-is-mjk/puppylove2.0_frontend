export const RightSlide = {
    initial: {
        x: 100,
        opacity: 0,
    },
    whileInView: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 0.85
        }
    }

}

export const LeftSlide = {
    initial: {
        x: -100,
        opacity: 0,
    },
    whileInView: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 0.85
        }
    }

}