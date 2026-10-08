const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const CinemaGallery = ({ movies }) => {
    const galleryMovies = movies.filter((movie) => movie.poster_path || movie.backdrop_path).slice(0, 10);
    if (galleryMovies.length === 0) return null;

    return (
        <div className="cinema-finale-gallery" aria-label="프로젝트에 사용된 영화 갤러리">
            <div className="cinema-finale-track">
                {[0, 1].map((groupIndex) => (
                    <div
                        key={groupIndex}
                        className="cinema-finale-track-group"
                        aria-hidden={groupIndex === 1 ? 'true' : undefined}
                    >
                        {galleryMovies.map((movie) => (
                            <figure key={movie.id} className="cinema-finale-card">
                                <img
                                    src={`${IMAGE_BASE}${movie.poster_path ?? movie.backdrop_path}`}
                                    alt={groupIndex === 0 ? movie.title : ''}
                                />
                                <figcaption>{movie.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaGallery;
