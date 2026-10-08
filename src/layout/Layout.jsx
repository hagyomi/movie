import Header from './header/Header';

const Layout = ({ children }) => {
    return (
        <main className="site-main w-full min-h-screen">
            <Header />
            {children}
        </main>
    );
};

export default Layout;
