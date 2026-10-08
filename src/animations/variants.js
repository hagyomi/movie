// 공통 hidden variant 함수
const getHiddenVariant = ({ type, value = type === 'scale' ? 1.2 : -50 } = {}) => {
    const base = { opacity: 0 };

    switch (type) {
        //세로 이동
        case 'vertical':
            return { ...base, y: value };
        //가로 이동
        case 'horizontal':
            return { ...base, x: value };
        //z축 이동
        case 'frontal':
            return { ...base, z: value, transformPerspective: 500 };
        //회전
        case 'rotate':
            return { ...base, rotate: value };
        //획대, 축소
        case 'scale':
            return { ...base, scale: value };
        //기본 투명도
        default:
            return base;
    }
};

//MotionWrapper용 variant
export const containerVariants = {
    hidden: getHiddenVariant,
    visible: ({ delay = 0, stagger = 0, duration = 0.5 } = {}) => ({
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotate: 0,
        scale: 1,
        transition: {
            duration,
            delay,
            delayChildren: duration + delay,
            staggerChildren: stagger,
        },
    }),
};

//Motion용 variant
export const innerVariants = {
    hidden: getHiddenVariant,
    //부모인 MotionWrapper의 stagger상속을 위해 transition은 제거
    //transition 적용시 부모의 stagger 속성까지 덮어쓰기 되므로 주의
    visible: () => ({
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotate: 0,
        scale: 1,
    }),
};
