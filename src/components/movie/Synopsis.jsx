import { useNavigate } from 'react-router-dom';
import Text from '../ui/Text';
import Button from '../ui/Button';
import MovieMeta from './MovieMeta';
import { Motion, MotionWrapper } from '../ui/MotionWrapper';

const Synopsis = ({ movieDataById }) => {
    const navigate = useNavigate();
    const releaseDate = movieDataById.release_date?.split('-').join('.') || '개봉 예정';

    return (
        <MotionWrapper
            disabled
            custom={{ type: 'horizontal', delay: 1, stagger: 0.2 }}
            tag="section"
            className="movie-synopsis"
        >
            <Motion disabled custom={{ type: 'horizontal' }} className="movie-synopsis-poster-column">
                <img
                    src={`https://image.tmdb.org/t/p/w342${movieDataById.poster_path}`}
                    alt={movieDataById.title}
                    loading="lazy"
                    className="movie-synopsis-poster"
                />
                <div className="movie-synopsis-meta">
                    <MovieMeta arr={movieDataById.genres.map((genre) => genre.name)} />
                    <MovieMeta>{releaseDate}</MovieMeta>
                    <MovieMeta>{movieDataById.runtime}분</MovieMeta>
                    <MovieMeta>{movieDataById.vote_average.toFixed(1)} / 10</MovieMeta>
                </div>
            </Motion>

            <Motion disabled custom={{ type: 'horizontal' }} className="movie-synopsis-copy">
                {movieDataById.tagline && (
                    <Text tag="h3" className="movie-synopsis-tagline">
                        {movieDataById.tagline}
                    </Text>
                )}
                <Text className="movie-synopsis-overview">
                    {movieDataById.overview || '해당 영화의 줄거리 요약이 없습니다.'}
                </Text>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Motion>
        </MotionWrapper>
    );
};

export default Synopsis;
