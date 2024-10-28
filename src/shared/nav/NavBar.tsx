import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/Context';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { store, api } = useAppContext()
  const user = store.auth.meJson

  useEffect(() => {
    const handleClick = (e: any) => {
      if (window.innerWidth < 1280 && e.target.closest('.navbar-dropdown')) {
        setIsNavOpen(false);
      }
    };
    const onWindowResize = () => {
      if (window.innerWidth >= 1280) {
        if (!isNavOpen) {
          setIsNavOpen(true);
        }
      } else {
        setIsNavOpen(false);
      }
    };
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const logOut = async () => {
    api.auth.logout();
    navigate('/login');
  };

  return (
    <nav className="ml-auto relative flex items-center justify-end gap-2 xl:gap-6">
      {isNavOpen ? (
        user ? (
          <ul className="navbar-dropdown xl:flex xl:items-center xl:justify-end xl:gap-6 xl:static xl:py-0 xl:mt-0 absolute top-full right-0 w-64 xl:w-auto z-50 py-4 bg-white shadow-lg  rounded-md border xl:border-none xl:shadow-none border-gray-200 mt-2">
            <li>
              <Link to="/profile" className="xl:px-0 px-4 nav-link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/create" className="xl:px-0 px-4 nav-link">
                Create listing
              </Link>
            </li>
            <li>
              <Link to="/listing" className="xl:px-0 px-4 nav-link">
                My listings
              </Link>
            </li>
            <li>
              <Link to="/messages" className="xl:px-0 px-4 nav-link">
                Messages
              </Link>
            </li>
            <li>
              <button onClick={logOut} type="button" className="xl:px-0 px-4 nav-link">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-dropdown xl:flex xl:items-center xl:justify-end xl:gap-6 xl:static xl:py-0 xl:mt-0 absolute top-full right-0 w-64 xl:w-auto z-50 py-4 bg-white shadow-lg  rounded-md border xl:border-none xl:shadow-none border-gray-200 mt-2">
            {/* <li>
              <Link to="/listings" className="xl:px-0 px-4 nav-link">
                All
              </Link>
            </li> */}
            <li>
              <Link to="category/sale" className="xl:px-0 px-4 nav-link">
                For Sale
              </Link>
            </li>
            <li>
              <Link to="category/rent" className="xl:px-0 px-4 nav-link">
                For Rent
              </Link>
            </li>
            <li>
              <Link to="/login" className="xl:px-0 px-4 nav-link">
                Log in
              </Link>
            </li>
          </ul>
        )
      ) : null}
      {!user && (
        <Link to="/register" type='button' className="btn btn-primary">
          Sign up
        </Link>
      )}
      <button
        type="button"
        onClick={toggleNav}
        className="btn btn-ghost border border-gray-200 ml-auto xl:hidden">
        {isNavOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>
    </nav>
  );
}

export default Navbar;
