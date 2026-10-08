import { AnimatePresence } from "motion/react";
import { MotionWrapper } from './MotionWrapper';

const Spinner = ({ loading }) => {
    return (
        // 퇴장 애니메이션을 위한 Wrapper 설정
        <AnimatePresence>
            {loading && (
                // props로 전달된 loading 상태값에 따라 자체 조건부 렌더링
                <MotionWrapper className="flex-center bg-theme-[0.5] fixed backdrop-blur z-40">
                    <div className="size-20 border-4 border-theme3 border-t-transparent rounded-full animate-spin" />
                </MotionWrapper>
            )}
        </AnimatePresence>
    );
};

export default Spinner;
