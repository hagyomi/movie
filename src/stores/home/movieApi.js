import { TMDB_API_KEY } from '../../config/tmdb';

const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const LANGUAGE = 'ko-KR';

export async function fetchMoviesByGenre(genreId, signal) {
    const searchParams = new URLSearchParams({
        api_key: TMDB_API_KEY,
        language: LANGUAGE,
        with_genres: genreId,
    });

    const response = await fetch(`${BASE_URL}?${searchParams}`, { signal });

    if (!response.ok) {
        throw new Error(`영화 API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data.results ?? [];
}

