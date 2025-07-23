import { useState } from 'react'
import { Title, Button } from '@/components'
import { people } from '@/data';

const data = people.map(({ Homepage, Scholar, Github, Twitter, LinkedIn, ...rest }) => ({
    ...rest,
    Links: { Homepage, Scholar, Github, Twitter, LinkedIn }
}));

const alumni = data.filter(person => person.Alumni);
const regulars = data.filter(person => !person.Alumni);

const Thumbnail = ({ id, name }) => {
  const exts = ['jpg', 'jpeg', 'png'];
  const fileName = `${id}-${name.replace(/ /g, '')}`;
  const placeholder = '/images/people/placeholder.png';
  const [extIndex, setExtIndex] = useState(0);
  const [src, setSrc] = useState(`/images/people/${fileName}.${exts[0]}`);

  const handleError = () => {
    if (extIndex + 1 < exts.length) {
      const nextIndex = extIndex + 1;
      setExtIndex(nextIndex);
      setSrc(`/images/people/${fileName}.${exts[nextIndex]}`);
    } else {
      setSrc(placeholder);
    }
  };

  return (
    <img
      src={src}
      alt={name}
      onError={handleError}
          className="w-1/2 mx-auto md:mx-0 md:w-40 md:h-40 aspect-square object-cover rounded-xl"
    />
  );
}


const People = () => {
    const groupedByRole = regulars.reduce((acc, person) => {
        if (!acc[person.Role]) {
            acc[person.Role] = [];
        }
        acc[person.Role].push(person);
        return acc;
    }, {});

    return (
        <div className="pages">
            <Title name="People" />

            {/* Faculty Members & PhD, Graduate, Undergraduate Students */}
            {Object.entries(groupedByRole).map(([role, items]) => (
                <section key={role}>
                    {/* Role */}
                    <h2>{role}</h2>
                    {/* Groups */}
                    <ul className="space-y-md">
                        {/* People */}
                        {items.map(item => (
                            <li key={item.Id} className="flex flex-col md:flex-row gap-md">
                                {/* Thumbnail */}
                                <Thumbnail id={item.Id} name={item.Name} />
                                {/* Content */}
                                <div className="space-y-xs">
                                    {/* Name */}
                                    <h3 className="text-ured">{item.Name}</h3>
                                    {/* Bio */}
                                    <p>{item.Bio}</p>
                                    {/* Links */}
                                    <div className="flex gap-sm">
                                        {Object.entries(item.Links).map(([key, value]) =>
                                            value && <Button key={key} title={key} link={value} />
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            {/* Alumni */}
            {alumni.length > 0 && (
                <section key="Alumni">
                    <h2>Alumni</h2>
                    <ul className="space-y-md">
                        {alumni.map(item => (
                            <li key={item.Id} className="flex flex-col md:flex-row gap-md">
                                <Thumbnail id={item.Id} name={item.Name} />
                                <div className="space-y-xs">
                                    <h3 className="text-ured">{item.Name}</h3>
                                    <p className="font-bold">{item.Role}</p>
                                    <p>{item.Bio}</p>
                                    <div className="flex gap-sm">
                                        {Object.entries(item.Links).map(([key, value]) =>
                                            value && <Button key={key} title={key} link={value} />
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default People;