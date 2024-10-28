import { useEffect } from 'react';
import HeroSection from './HeroSection';
import BrowseByCateogry from './BrowseByCateogry';
import { observer } from 'mobx-react-lite';
import ForRentSection from './ForRentSection';
import ForSaleSection from './ForSaleSection';

const Home = observer(() => {

    useEffect(() => {
        document.title = 'Find It Namibia';
    }, []);

    return (
        <main>
            <HeroSection />
            <section className="max-w-5xl mx-auto px-3 lg:pb-24 py-20">
                <BrowseByCateogry />
            </section>
            <section className="max-w-7xl mx-auto px-3 lg:pb-24 pb-20">
                <ForSaleSection />
            </section>
            <section className="max-w-7xl mx-auto px-3 lg:pb-24 pb-20">
                <ForRentSection />
            </section>
        </main>
    );
})

export default Home;
