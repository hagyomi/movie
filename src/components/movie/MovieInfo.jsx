import Text from '../ui/Text';
import Button from '../ui/Button';
import { Motion, MotionWrapper } from '../ui/MotionWrapper';

const MovieInfo = ({ movieDataById, vid, setOpen }) => {
    return (
        <MotionWrapper disabled custom={{ stagger: 0.3 }} tag="section" className="movie-info">
            <Motion disabled custom={{ type: 'vertical' }} className="movie-info-heading">
                <Text tag="h1" className="movie-info-title">{movieDataById.title}</Text>
                {movieDataById.original_title && (
                    <Text tag="h2" className="movie-info-original-title">
                        {movieDataById.original_title}
                    </Text>
                )}
            </Motion>

            {vid && (
                <Motion disabled custom={{ type: 'vertical' }}>
                    <Button className="movie-trailer-button" onClick={() => setOpen(true)}>
                        WATCH TRAILER
                    </Button>
                </Motion>
            )}
        </MotionWrapper>
    );
};

export default MovieInfo;
