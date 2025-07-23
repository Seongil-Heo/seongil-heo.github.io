import { Link } from 'react-router-dom';
import { home, news } from '@/data';
import { Carousel } from '@/components';

const Home = () => {
    // Slice to show only the top 3 items
    const topNews = news.reverse().slice(0, home.numNews);

    return (
        <div className="pages">
            {/* Bannar */}
            <section>
                <h1 className="text-center" >{home.Title}</h1>
                <Carousel imgList={home.BannerImages}/>
            </section>

            {/* About Us */}
            <section>
                <h2>About Us</h2>
                <p>{home.Description}</p>
            </section>

            {/* News */}
            <section>
                <Link to="/news" ><h2>Recent News</h2>
                    <ul className="space-y-sm ml-8 list-disc">
                        {topNews.map((item, index) => (
                            <li key={`news-${index}`}>
                                {item.Content}
                            </li>
                        ))}
                    </ul>
                </Link>
            </section>
        </div>
    );
};

export default Home;
