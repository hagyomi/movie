import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieBackdrop from '../components/movie/MovieBackdrop';
import Spinner from '../components/ui/Spinner';
import MovieInfo from '../components/movie/MovieInfo';
import Synopsis from '../components/movie/Synopsis';
import Review from '../components/movie/Review';
import Trailer from '../components/movie/Trailer';
import { TMDB_API_KEY } from '../config/tmdb';
import './movieDetail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movieDataById, setMovieDataById] = useState(null);
    const [loading, setLoading] = useState(true);
    const [vid, setVid] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const baseUrl = 'https://api.themoviedb.org/3/movie';
            try {
                const [movieResponse, trailerResponse] = await Promise.all([
                    fetch(`${baseUrl}/${id}?api_key=${TMDB_API_KEY}&language=ko-KR`),
                    fetch(`${baseUrl}/${id}/videos?api_key=${TMDB_API_KEY}`),
                ]);
                const movie = await movieResponse.json();
                const trailers = await trailerResponse.json();
                setMovieDataById(movie);
                setVid(trailers.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube') ?? null);
            } catch (error) {
                console.error('영화 정보를 불러오지 못했습니다.', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <main className="movie-detail-page">
            <Spinner loading={loading} />
            {movieDataById && (
                <>
                    <section className="movie-detail-visual">
                        <MovieBackdrop
                            src={`https://image.tmdb.org/t/p/w1280${movieDataById.backdrop_path}`}
                            overlay
                            disabled
                        />
                        <MovieInfo movieDataById={movieDataById} vid={vid} setOpen={setOpen} />
                        <aside className="movie-detail-review">
                            <Review />
                        </aside>
                    </section>

                    <section className="movie-detail-content">
                        <Synopsis movieDataById={movieDataById} />
                    </section>

                    <Trailer open={open} setOpen={setOpen} vid={vid} />
                </>
            )}
        </main>
    );
};

export default MovieDetail;
