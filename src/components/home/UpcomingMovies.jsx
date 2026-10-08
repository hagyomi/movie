import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w1280';

const UpcomingMovies = ({ movies }) => {
    const navigate = useNavigate();
    const featured = movies.find((movie) => movie.poster_path) ?? movies[0];
    const secondary = movies.find((movie) => movie.id !== featured?.id && movie.backdrop_path) ?? featured;

    const openMovie = (movie) => {
        if (movie?.id) navigate(`/${movie.id}`);
    };

    return (
        <section className="upcoming-movies" aria-labelledby="upcoming-movies-title">
            <header className="upcoming-movies-header">
                <h2 id="upcoming-movies-title">Upcoming</h2>
                <p>Discover upcoming<br />stories on the big screen</p>
            </header>

            <div className="upcoming-movies-grid">
                <button
                    className="upcoming-movies-poster upcoming-movies-card"
                    type="button"
                    onClick={() => openMovie(featured)}
                    aria-label={`${featured?.title ?? 'Featured movie'} 자세히 보기`}
                >
                    {featured?.poster_path ? (
                        <img src={`${IMAGE_BASE}${featured.poster_path}`} alt="" />
                    ) : null}
                </button>

                <article className="upcoming-movies-date upcoming-movies-card">
                    <p>{featured?.release_date?.replaceAll('-', '. ') ?? 'COMING SOON'}</p>
                    <h3>{featured?.title ?? 'A New Story Awaits'}</h3>
                    <span>WORLD PREMIERE</span>
                </article>

                <button
                    className="upcoming-movies-trailer upcoming-movies-card"
                    type="button"
                    onClick={() => openMovie(secondary)}
                    aria-label={`${secondary?.title ?? 'Featured movie'} 예고편 보기`}
                >
                    {secondary?.backdrop_path ? (
                        <img src={`${IMAGE_BASE}${secondary.backdrop_path}`} alt="" />
                    ) : null}
                    <span className="upcoming-movies-play" aria-hidden="true" />
                </button>

                <article className="upcoming-movies-info upcoming-movies-card">
                    <div className="upcoming-movies-orb" aria-hidden="true" />
                    <p>이번 시즌 가장 기대되는<br />이야기를 만나보세요.</p>
                    <h3>{featured?.title ?? 'Featured Premiere'}</h3>
                    <div className="upcoming-movies-info-bottom">
                        <div>
                            <strong>Premiere</strong>
                            <span>{featured?.original_title ?? 'Coming Soon'}</span>
                        </div>
                        <Button onClick={() => openMovie(featured)}>View Movie</Button>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default UpcomingMovies;
