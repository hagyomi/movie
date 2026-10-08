import { Link } from "react-router-dom";
import { twMerge } from 'tailwind-merge';

const Pic = ({
    title, //대체 텍스트
    url, //링크 경로
    src, //이미지 경로
    shadow, //이미지 그림자
    className, //외부 스타일
    auto, //이미지 원본 비율 크기
    rounded, //둥근 테두리
}) => {
    return (
        <Link to={url} className={twMerge('block h-[20vw]', className)}>
            {shadow && (
                <img
                    className="absolute translate-x-4 translate-y-4 blur-xl saturate-150 opacity-70"
                    src={src}
                    alt={title}
                    loading="lazy"
                />
            )}
            <img
                className={twMerge('absolute', auto && 'relative', rounded && 'rounded-xl')}
                src={src}
                alt={title}
                loading="lazy"
            />
        </Link>
    );
};

export default Pic;
