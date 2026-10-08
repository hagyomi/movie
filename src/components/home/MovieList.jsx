import { useEffect, useState, useDeferredValue, useTransition } from "react";

import MovieCard from "./MovieCard";
import Spinner from "../ui/Spinner";
import MovieFilter from "./MovieFilter";
import { Motion, MotionWrapper } from "../ui/MotionWrapper";
import { AnimatePresence } from "motion/react";
import { TMDB_API_KEY } from '../../config/tmdb';

const MovieList = ({ list }) => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const pageNum = 3;

  // 페이지별 영화 데이터 호출 후 병합후 상태저장
  useEffect(() => {
    //페이지별 영화 데이터 fetch 함수
    const fetchMoviesByPage = async page => {
      const BASE_URL = "https://api.themoviedb.org/3/movie/popular";
      const LANGUAGE = "ko-KR";

      const REQ_URL = `${BASE_URL}?api_key=${TMDB_API_KEY}&language=${LANGUAGE}&page=${page}`;
      const response = await fetch(REQ_URL);
      const data = await response.json();
      return data.results;
    };

    //feching된 페이지별 영화 데이터 병합 함수
    const fetchMovieData = async num => {
      setLoading(true);

      try {
        const pages = await Promise.all(
          Array.from({ length: num }, (_, idx) => fetchMoviesByPage(idx + 1))
        );

        setMovieData(pages.flat());
      } catch (error) {
        console.error("영화 데이터를 가져오는데 실패했습니다: ", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    //pageNum갯수만큼 페이지 데이터 병합
    fetchMovieData(pageNum);
  }, []);

  // 검색히 지연된 input값으로 영화 데이터 필터링 요청
  // 필러팅을 통한 업데이트 상태 로직 자체의 우선 순위 낮춤
  useEffect(() => {
    startTransition(() => {
      const filtered = movieData.filter(movie =>
        movie.title.toLowerCase().includes(deferredQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    });
  }, [deferredQuery, movieData]);

  return (
    // 페이지 전환시 페이드 모션 적용을 위한 wrapper
    <MotionWrapper>
      {/* 페이지 전환이 아닌 리스트 컴포넌트 토글 시의 내부 콘텐츠 퇴장 모션 지연 적용  */}
      <AnimatePresence>
        {list && (
          // 내부 콘텐츠의 stagger 모션 설정을 부모인 Wrapper에서 설정
          <MotionWrapper
            custom={{
              type: "horizontal",
              value: "100%",
              stagger: 0.3,
            }}
            className="fixed w-1/2 h-screen px-[5vw] py-30 backdrop-blur-xl shadow-2xl bg-theme-[0.5] overflow-y-auto z-90 max-2xl:w-3/4 max-md:w-full max-md:p-[10vw] max-md:pt-30"
          >
            {/* stagger 적용될 자식 컴포넌트 */}
            <Motion
              custom={{ type: "horizontal" }}
              className="mb-2 text-center"
            >
              <MovieFilter
                query={query}
                setQuery={setQuery}
                color="text-white"
              />
            </Motion>

            {/* loading, isPending 상태정보를 props로 전달 */}
            <Spinner loading={loading && isPending} />

            {/* stagger 적용될 자식 컴포넌트 */}
            <Motion
              custom={{ type: "horizontal" }}
              className="mt-12 grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1"
            >
              {filteredMovies.map((data, idx) => {
                return <MovieCard key={`${data.id}-${idx}`} data={data} />;
              })}
            </Motion>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </MotionWrapper>
  );
};

export default MovieList;
