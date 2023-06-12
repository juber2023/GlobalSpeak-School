import useTitle from '../Hooks/Usetitle';
import Banner from './Banner';
import MarqueeFast from './Marquee';
import PopularClasses from './PopularClasses';
import PopularInstructors from './PopularInstructors';

const Home = () => {
    useTitle('Home')
    return (
        <div>
            <Banner></Banner>
            <MarqueeFast></MarqueeFast>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;