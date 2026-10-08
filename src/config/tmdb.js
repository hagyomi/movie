export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
    throw new Error('VITE_TMDB_API_KEY 환경변수가 설정되지 않았습니다.');
}
