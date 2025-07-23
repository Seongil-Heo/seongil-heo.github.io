import { useState } from 'react';
import { ButtonR, Title } from '@/components'
import { publications } from '@/data';

const data = [...publications].reverse().map(({ ArXiv, PDF, Website, Code, BibTeX, ...rest }) => ({
    ...rest,
    Links: { ArXiv, PDF, Website, Code, BibTeX }
}));

const Thumbnail = ({ id, year, author }) => {
    const exts = ['png', 'gif', 'jpg', 'jpeg'];
    const fileName = `${id}-${year}${author.split(/\s+/)[0]}`;
    const placeholder = '/images/placeholder.png';
    const [extIndex, setExtIndex] = useState(0);
    const [src, setSrc] = useState(`/images/publications/${fileName}.${exts[0]}`);

    const handleError = () => {
        if (extIndex + 1 < exts.length) {
            const nextIndex = extIndex + 1;
            setExtIndex(nextIndex);
            setSrc(`/images/publications/${fileName}.${exts[nextIndex]}`);
        } else {
            setSrc(placeholder);
        }
    };

    return (
        <img
            src={src}
            alt={`publication-image-${id}`}
            onError={handleError}
            className="h-50 aspect-[4/3] object-contain rounded-xl"
        />
    );
}

const Publications = () => {
    return (
        <div className="pages">
            <Title name="Publications" />

            {/* Publication */}
            <section className="space-y-md">
                {data.map(item => (
                    <ul key={`publication-${item.Id}`} className="flex flex-col md:flex-row gap-md">
                        {/* Thumbnail */}
                        <Thumbnail id={item.Id} year={item.Year} author={item.Authors[0]} />
                        {/* Content */}
                        <li className="space-y-xs md:space-y-sm">
                            {/* Title */}
                            <h3>{item.Title}</h3>
                            {/* Authors */}
                            <p className="font-bold">
                                {Array.isArray(item.Authors)
                                    ? item.Authors.join(', ')
                                    : item.Authors}
                            </p>
                            {/* Conference, Month Year. */}
                            {item.Conference && <p className="italic">
                                {item.Workshop && `${item.Workshop} on `}
                                <span>{item.Conference && item.Conference}</span>
                                <span>
                                    {item.Year
                                        ? item.Month
                                            ? `, ${item.Month} ${item.Year}.`
                                            : `, ${item.Year}.`
                                        : `.`}
                                </span>
                            </p>}
                            {/* Links */}
                            {Object.values(item.Links).some(value => value) && (
                                <div className="flex gap-2">
                                    {Object.entries(item.Links).map(([key, value]) =>
                                        value && <ButtonR key={key} title={key} link={value} />
                                    )}
                                </div>
                            )}
                            {/* Note */}
                            <p className="text-xs text-gray-600">{item.Note}</p>
                        </li>
                    </ul>

                ))}
            </section>
        </div>
    );
};

export default Publications;
