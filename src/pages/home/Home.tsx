import { useEffect } from 'react';
import HeroSection from './HeroSection';
import BrowseByCateogry from './BrowseByCateogry';

function Home() {
    useEffect(() => {
        document.title = 'Rent or Sell';
    }, []);

    return (
        <main>
            <HeroSection />
            <section className="max-w-5xl mx-auto px-3 lg:pb-24 py-20">
                <BrowseByCateogry />
            </section>
        </main>
    );
}

export default Home;
