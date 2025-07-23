import { Title } from '@/components'
import { videos } from '@/data';
import { FontAwesomeIcon } from '@/icons';
const data = [...videos].reverse();

const YouTubeEmbed = ({ link }) => {
    return (
        <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={link}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
};

const PageEmbed = ({ image, link }) => {
    return (
        <div 
            className="relative aspect-[2/1] overflow-hidden rounded-lg hover:cursor-pointer"
            onClick={() => window.open(link, '_blank')}
        >
            <img
                src={image}
                alt={`video-preview`}
                className="w-full h-full object-cover"
                onError={e => {
                    e.currentTarget.onError = null;
                    e.currentTarget.src = "/images/placeholder.png";
                }}
            />
            <div className="absolute inset-0 bg-lgray opacity-0 hover:opacity-80 flex items-center justify-center gap-xs md:text-lg lg:text-2xl text-ugray rounded-lg">
                Move
                <FontAwesomeIcon icon="arrow-up-right-from-square" />
            </div>
        </div>
    );
};

const Videos = () => {
    return (
        <div className="pages">
            <Title name="Videos" />

            <section className="space-y-md">
                {data.map((item, index) => (
                    <div key={`video-${index}`}>
                        {/* Title */}
                        <h4 className="text-xl">
                            <span>{item.Title && item.Title}</span>
                            <span>{item.Conference
                                ? item.Year
                                    ? `, ${item.Conference} ${item.Year}. `
                                    : `, ${item.Conference}. `
                                : `. `
                            }
                            </span>
                            <span>
                                {item.Speaker && `Talk by ${item.Speaker}.`}
                            </span>
                        </h4>
                        {/* Youtube */}
                        {item.Image 
                        ? <PageEmbed image={item.Image} link={item.Link} />
                        : <YouTubeEmbed link={item.Link} />
                        }
                    </div>
                ))}
            </section>
        </div>
    )
};

export default Videos;
