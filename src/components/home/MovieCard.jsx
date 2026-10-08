import Text from '../ui/Text';
import Pic from './Pic';
import Rating from '../ui/Rating';
import { twMerge } from 'tailwind-merge';

const MovieCard = ({
    data, // 카드에 표시할 콘텐츠 객체 (id, title, poster_path, vote_average)
    className, // 외부에서 전달되는 추가 스타일 클래스
}) => {
    return (
        <article className={twMerge('w-full text-theme', className)}>
            <Pic
                className="h-[22vw] max-2xl:h-[30vw] max-xl:h-[40vw] max-md:h-[50vw] max-sm:h-[110vw]"
                title={data.title}
                url={`/${data.id}`}
                src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                shadow
                rounded
            />
            <Text tag="h2" className="text-3xl font-dongle mt-3" url={`/${data.id}`}>
                {data.title}
            </Text>
            <Rating value={data.vote_average} total={10} rates={5} />
        </article>
    );
};

export default MovieCard;
