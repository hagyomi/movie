import { useEffect } from 'react';

import HeroWords from '../components/home/HeroWords';
import Spinner from '../components/ui/Spinner';
import MovieListToggler from '../components/home/MovieListToggler';
import MovieList from '../components/home/MovieList';
import HighlightsSection from '../components/home/HighlightsSection';
import MovieStatement from '../components/home/MovieStatement';
import GenreFinale from '../components/home/GenreFinale';
import UpcomingMovies from '../components/home/UpcomingMovies';
import CinemaFinale from '../components/home/CinemaFinale';
import { MOVIE_CATEGORIES, useHomeStore } from '../stores/home';
import './style.css';

const Home = () => {
    const listOpen = useHomeStore((state) => state.listOpen);
    const movieData = useHomeStore((state) => state.movieData);
    const loading = useHomeStore((state) => state.loading);
    const selectedCategory = useHomeStore((state) => state.selectedCategory);
    const toggleList = useHomeStore((state) => state.toggleList);
    const setSelectedCategory = useHomeStore((state) => state.setSelectedCategory);
    const fetchMovies = useHomeStore((state) => state.fetchMovies);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies, selectedCategory]);

    return (
        <div id="top" className="home-page">
            <section className="home-hero" aria-labelledby="home-hero-title">
                <HeroWords />
            </section>

            <HighlightsSection
                categories={MOVIE_CATEGORIES}
                movies={movieData}
                loading={loading}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            <MovieStatement />
            <GenreFinale />
            <UpcomingMovies movies={movieData} />
            <CinemaFinale movies={movieData} />

            <MovieList list={listOpen} />
            <MovieListToggler list={listOpen} onToggle={toggleList} />
            <Spinner loading={loading && movieData.length === 0} />
        </div>
    );
};

export default Home;
