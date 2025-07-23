import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { navigation } from '@/routes/navigation';
import { FontAwesomeIcon } from '@/icons';

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-header flex justify-between items-center border-y-4 border-dgray border-b-ured px-8 py-4">
      {/* Lab Name */}
      <Link to="/"><p className="text-2xl font-bold text-nowrap">ARIA Lab</p></Link>

      {/* Mobile hamburger menu (smaller screens) */}
      <div className="md:hidden" ref={menuRef}>
        {/* Bars Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-2xl"
          aria-label="Toggle menu"
        >
          {mobileMenu 
          ? <FontAwesomeIcon icon="xmark" /> 
            : <FontAwesomeIcon icon="bars" />}
        </button>
        
        {/* Drop Nav Menu */}
        <ul
          className={`absolute flex flex-col items-center text-md mt-1 bg-white top-full inset-x-0 shadow-md z-10 border-b-2 transform ease-in-out origin-top ${mobileMenu ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
        >
          {navigation.map(item => (
            <li key={item.key} className="font-bold py-4 w-full text-center">
              <Link
                to={item.to}
                onClick={() => setMobileMenu(false)}
                className="hover:text-ured"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop nav */}
      <ul className="hidden md:flex flex-1 items-center justify-center gap-sm text-lg lg:text-xl">
        {navigation.map(item => (
          <li key={item.key} className="font-bold">
            <Link to={item.to} className={`p-2 hover:text-ured flex gap-xs items-center`}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* U Logo (right) */}
      <a href="https://www.utah.edu" className="hidden lg:block">
        <img src="/UofU.png" alt="UofU" className="h-10 md:h-16 flex-shrink-0 max-w-none" />
      </a>

    </header>
  );
};

export default Header;