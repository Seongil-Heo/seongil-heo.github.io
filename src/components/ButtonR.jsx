import { FontAwesomeIcon, iconMap } from '@/icons'

const ButtonR = ({title, link }) => {
  
  return (
    <button 
      onClick={() => window.open(link, '_blank')} 
      className={`bg-ured rounded-md py-1 px-2 text-white text-sm flex justify-center items-center gap-xs`}
    >
      <FontAwesomeIcon icon={iconMap[title]} />
      {title}
    </button>
  );
};

export default ButtonR;
