import { MotionWrapper } from '../ui/MotionWrapper';
import '../styles/background.css';

const MovieBackdrop = ({ src, overlay, disabled = false }) => {
    return (
        <MotionWrapper className="background" custom={{ duration: 1 }} disabled={disabled}>
            <img className="background-image" src={src} alt="" />
            {overlay && <div className="background-overlay" />}
        </MotionWrapper>
    );
};

export default MovieBackdrop;
