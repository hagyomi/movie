import { twMerge } from "tailwind-merge";
import { MotionWrapper } from "../ui/MotionWrapper";

const MovieListToggler = ({ list, onToggle }) => {
  return (
    // 상세 페이지 전환시 부드럽게 페이드모션을 적용하기 위한 wrapper
    <MotionWrapper
      custom={{ type: "scale", value: 3 }}
      className={twMerge(
        // listToggler 테일윈드 컴포넌트 클래스 연결
        "listToggler max-sm:right-[8vw] max-sm:scale-90",
        //list 상태값에 따라 토글러 스타일 변경
        list ? "on" : ""
      )}
      onClick={onToggle}
    >
      <span>Toggle List</span>
    </MotionWrapper>
  );
};

export default MovieListToggler;
