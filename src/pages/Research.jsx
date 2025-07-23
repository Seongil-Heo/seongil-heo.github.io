import { Title } from '@/components';
import { research } from '@/data';

const Research = () => {
    const data = research.data;

    return (
        <div className="pages">
            <Title name="Research" />

            {/* Description */}
            <section>
                <p>{research.description}</p>
            </section>

            {/* Subjects */}
            <section className="space-y-sm container">
                {data.map((item, index) => (
                    <div key={`subject-${index}`} className="space-y-sm">
                        <h2>{item.Title}</h2>
                        <p>{item.Description}</p>
                        <ul className="ml-8 list-disc space-y-xs">
                            {/* Key Topics */}
                            <li>
                                <span className="font-bold">{'Key Topics: '}</span>
                                <span>
                                    {Array.isArray(item['Key Topics'])
                                        ? item['Key Topics'].join(', ')
                                        : item['Key Topics']}
                                </span>
                            </li>
                            {/* Current Projects */}
                            <li>
                                <span className="font-bold">{'Current Projects: '}</span>
                                <ul>
                                    {Object.entries(item['Current Project']).map(([key, value], index) =>
                                        <li key={`project-${index}`} className="list-[circle] ml-8">
                                            <span className="font-bold">{`${key}: `}</span>
                                            <span >{value}</span>
                                        </li>
                                    )}
                                </ul>
                            </li>
                            {/* Publications */}
                            <li>
                                <span className="font-bold">{'Publications: '}</span>
                                <span>
                                    {item.Publication.length > 0
                                        ? <ul>
                                            {Object.entries(item['Publication']).map(([key, value], index) =>
                                                <li key={`publication-${index}`} className="list-[circle] ml-8">
                                                    <span className="font-bold">{`${key}: `}</span>
                                                    <span >{value}</span>
                                                </li>
                                            )}
                                        </ul>
                                        : <span className="text-ugray italic">It will be updated soon.</span>
                                    }
                                </span>
                            </li>
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Research;
