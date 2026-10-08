import Button from '../ui/Button';

const PROJECT_SECTIONS = [
    ['Highlights', '.home-movie-scroll-section'],
    ['Motion', '.movie-statement'],
    ['Art Direction', '.genre-finale'],
    ['Editorial UI', '.upcoming-movies'],
];

const PortfolioFooter = ({ onNavigate }) => (
    <footer className="cinema-finale-footer">
        <div className="cinema-footer-brand">
            <strong>SE</strong>
            <p>UI/UX thinking.<br />Frontend execution.</p>
        </div>

        <nav className="cinema-footer-nav" aria-label="프로젝트 섹션 메뉴">
            <span>CASE STUDY</span>
            {PROJECT_SECTIONS.map(([label, selector]) => (
                <button key={selector} type="button" onClick={() => onNavigate(selector)}>
                    {label}
                </button>
            ))}
        </nav>

        <div className="cinema-footer-promotion">
            <span>FRONTEND PORTFOLIO · 2026</span>
            <h3>Designed to feel.<br />Built to perform.</h3>
            <p>React 19 · Zustand · GSAP · TMDB API</p>
            <Button onClick={() => onNavigate('.home-movie-scroll-section')}>View Project</Button>
        </div>

        <div className="cinema-footer-bottom">
            <span>UI/UX DESIGN · FRONTEND</span>
            <span>DESIGNED &amp; DEVELOPED BY SE</span>
            <button type="button" onClick={() => onNavigate('#top')}>BACK TO TOP ↑</button>
        </div>
    </footer>
);

export default PortfolioFooter;
