import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rating from '../ui/Rating';
import '../../movieScroll.css';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_CARDS_PER_CATEGORY = 20;
const CATEGORY_MOVEMENT_RATIO = 0.95;

const MovieScroll = ({
    data,
    loading,
    categories,
    selectedCategory,
    setSelectedCategory,
}) => {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const [failedImageIds, setFailedImageIds] = useState(() => new Set());
    const selectedCategoryRef = useRef(selectedCategory);
    const localProgressRef = useRef(0);
    const categoryKeys = useMemo(() => Object.keys(categories), [categories]);
    const categoryCount = categoryKeys.length;
    const visibleMovies = useMemo(
        () => data.filter(
            (movie) => movie.backdrop_path && !failedImageIds.has(movie.id)
        ),
        [data, failedImageIds]
    );
    const hasMovies = visibleMovies.length > 0;

    useEffect(() => {
        selectedCategoryRef.current = selectedCategory;
    }, [selectedCategory]);

    const moveTrack = (progress) => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);
        gsap.set(track, { x: -maxTranslate * progress });
    };

    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        const section = viewport?.closest('.home-movie-scroll-section');
        if (!viewport || !section || !hasMovies || !categoryCount) return undefined;

        const updateFromProgress = (progress) => {
            const movementProgress = Math.min(progress / CATEGORY_MOVEMENT_RATIO, 1);
            const scaledProgress = movementProgress * categoryCount;
            const categoryIndex = Math.min(Math.floor(scaledProgress), categoryCount - 1);
            const nextCategory = categoryKeys[categoryIndex];
            const localProgress = movementProgress === 1 ? 1 : scaledProgress - categoryIndex;

            localProgressRef.current = localProgress;
            moveTrack(localProgress);

            if (nextCategory !== selectedCategoryRef.current) {
                selectedCategoryRef.current = nextCategory;
                setSelectedCategory(nextCategory);
            }
        };

        let scrollTrigger;
        const context = gsap.context(() => {
            scrollTrigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: `+=${(SCROLL_CARDS_PER_CATEGORY - 1) * categoryCount * 180}`,
                pin: section,
                pinType: 'fixed',
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 0,
                refreshPriority: 10,
                invalidateOnRefresh: true,
                onUpdate: ({ progress }) => updateFromProgress(progress),
                onRefresh: ({ progress }) => updateFromProgress(progress),
            });
        }, section);

        const handleCategorySelect = (event) => {
            const categoryIndex = categoryKeys.indexOf(event.detail);
            if (categoryIndex < 0 || !scrollTrigger) return;

            const categoryProgress = (categoryIndex / categoryCount) * CATEGORY_MOVEMENT_RATIO;
            const targetScroll = scrollTrigger.start
                + (scrollTrigger.end - scrollTrigger.start) * categoryProgress
                + (categoryIndex > 0 ? 1 : 0);

            localProgressRef.current = 0;
            moveTrack(0);
            window.scrollTo({ top: targetScroll, behavior: 'auto' });
        };

        window.addEventListener('movie-category-select', handleCategorySelect);
        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => {
            window.removeEventListener('movie-category-select', handleCategorySelect);
            context.revert();
        };
    }, [categoryCount, categoryKeys, hasMovies, setSelectedCategory]);

    useLayoutEffect(() => {
        if (loading) return;
        requestAnimationFrame(() => moveTrack(localProgressRef.current));
    }, [data, loading]);

    return (
        <div ref={viewportRef} className="movie-scroll-viewport">
            <div ref={trackRef} className="movie-scroll-track">
                {visibleMovies.map((movie, index) => (
                    <article className="movie-scroll-card movie-feature-card" key={movie.id}>
                        <div className="movie-feature-media">
                            <img
                                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                alt={movie.title}
                                onError={() => {
                                    setFailedImageIds((currentIds) => {
                                        const nextIds = new Set(currentIds);
                                        nextIds.add(movie.id);
                                        return nextIds;
                                    });
                                }}
                            />
                            <h2 className="movie-feature-title">{movie.title}</h2>
                            <span className="movie-feature-index">{String(index + 1).padStart(2, '0')}</span>
                            <div className="movie-feature-rating-wrap">
                                <Rating value={movie.vote_average} className="movie-feature-rating" />
                            </div>
                            <Link className="movie-feature-link" to={`/${movie.id}`} aria-label={`${movie.title} 상세 보기`}>
                                <span>Read more</span><i aria-hidden="true">↗</i>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default MovieScroll;
