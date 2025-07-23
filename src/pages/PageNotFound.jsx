import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@/icons';

const PageNotFound = () => {
  return (
    <div className="pages max-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-ured">404</h1>
      <h2>Page Not Found :(</h2>
      <p className="text-ugray">
        The requested page could not be found. <br />
      </p>

      <Link to="/" className="flex gap-sm items-center text-white bg-ured hover:text-ured hover:bg-white border-2 border-ured rounded-md py-2 px-4">
        <FontAwesomeIcon icon='house' />
        Home
      </Link>
    </div>
  );
};

export default PageNotFound;
