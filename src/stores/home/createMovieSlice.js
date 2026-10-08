import { MOVIE_CATEGORIES } from './constants';
import { fetchMoviesByGenre } from './movieApi';

let activeRequestController;

export const createMovieSlice = (set, get) => ({
    movieData: [],
    loading: false,
    error: null,

    fetchMovies: async () => {
        activeRequestController?.abort();
        activeRequestController = new AbortController();

        const genreId = MOVIE_CATEGORIES[get().selectedCategory];
        set({ loading: true, error: null }, false, 'home/fetchMovies/pending');

        try {
            const movieData = await fetchMoviesByGenre(
                genreId,
                activeRequestController.signal
            );

            set(
                { movieData, loading: false },
                false,
                'home/fetchMovies/fulfilled'
            );
        } catch (error) {
            if (error.name === 'AbortError') return;

            console.error('영화 데이터를 가져오지 못했습니다.', error);
            set(
                {
                    movieData: [],
                    loading: false,
                    error: error.message,
                },
                false,
                'home/fetchMovies/rejected'
            );
        }
    },
});

