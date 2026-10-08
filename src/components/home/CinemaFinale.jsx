import Button from '../ui/Button';
import CinemaGallery from './CinemaGallery';
import PortfolioFooter from './PortfolioFooter';

const scrollToSection = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
};

const CinemaFinale = ({ movies }) => (
    <section className="cinema-finale" aria-labelledby="cinema-finale-title">
        <div className="cinema-finale-content">
            <p className="cinema-finale-eyebrow">INTERACTION · MOTION · DEVELOPMENT</p>
            <h2 id="cinema-finale-title">
                Stories Move,<br />Interfaces Stay With Us
            </h2>
            <Button className="cinema-finale-button" onClick={() => scrollToSection('.home-movie-scroll-section')}>
                Explore the Project
            </Button>
        </div>

        <CinemaGallery movies={movies} />
        <PortfolioFooter onNavigate={scrollToSection} />
    </section>
);

export default CinemaFinale;
