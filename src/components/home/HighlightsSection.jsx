import CategoryTabs from './CategoryTabs';
import MovieScroll from './MovieScroll';

const HighlightsSection = ({
    categories,
    movies,
    loading,
    selectedCategory,
    onCategoryChange,
}) => (
    <section className="home-movie-scroll-section" aria-labelledby="highlights-title">
        <header className="home-movie-scroll-header">
            <h2 id="highlights-title">Highlights</h2>
            <p>Explore curated<br />movie highlights</p>
        </header>

        <CategoryTabs
            className="home-movie-scroll-categories"
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={onCategoryChange}
        />

        <MovieScroll
            data={movies}
            loading={loading}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={onCategoryChange}
        />
    </section>
);

export default HighlightsSection;
