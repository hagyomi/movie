import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

import './index.css';
//페이지 컴포넌트 언마운트시 모션 애니메이션 적용을 위한 Wrapper
import { AnimatePresence } from 'motion/react';

const App = () => {
    // 현재 라우트 경로 가져오기
    const location = useLocation();

    return (
        <Layout>
            <AnimatePresence mode="wait">
                {/* 라우트 경로 변경 시 애니메이션 적용 */}
                <Routes location={location} key={location.pathname}>
                    {/* Home 페이지 컴포넌트 라우터 연결 */}
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<MovieDetail />} />
                </Routes>
            </AnimatePresence>
        </Layout>
    );
};

export default App;
