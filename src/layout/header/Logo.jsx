import { Link, useLocation } from 'react-router-dom';
import './style.css';

const Logo = () => {
    const { pathname } = useLocation();
    const handleLogoClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: pathname === '/' ? 'smooth' : 'auto' });
    };

    return (
        <Link className="header-logo" to="/" aria-label="WE 홈으로 이동" onClick={handleLogoClick}>
            <img className="header-logo-image" src="/images/we-logo.svg" alt="WE 캐릭터 로고" width="510" height="500" />
        </Link>
    );
};

export default Logo;

