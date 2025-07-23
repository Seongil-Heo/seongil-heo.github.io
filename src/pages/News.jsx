import { Title } from '@/components';
import { news } from '@/data';

const data = news.reverse();

const News = () => {
    return (
        <div className="pages">
            <Title name='News' />

            {/* News */}
            <ul className="list-disc ml-8 space-y-md">
                {data.map((item, index) => (
                    <li key={`news-${index}`}>
                        {item.Content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default News;
