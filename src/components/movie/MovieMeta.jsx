import { twMerge } from 'tailwind-merge';
import Text from '../ui/Text';

const MovieMeta = ({ children, className, arr }) => {
    return arr ? (
        <ul className="flex-wrap glass text-theme-[0.7]">
            {arr.map((el, idx) => (
                <li key={idx}>
                    {/* 첫 번째 요소 제외하고 슬래시(/) 구분자 출력 */}
                    {idx !== 0 && '/'}&nbsp;
                    {el}
                </li>
            ))}
        </ul>
    ) : (
        <Text tag="span" className={twMerge('glass text-theme-[0.7]', className)}>
            {children}
        </Text>
    );
};

export default MovieMeta;
