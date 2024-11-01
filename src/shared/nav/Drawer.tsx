import { NavLink } from "react-router-dom";

const DRAWER_ROUTES = () => {

  return (
    <div className="list">
      <ul className="main uk-nav-default" data-uk-nav>
        <li className="item">
          <NavLink to={`dashboard`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Dashboard
          </NavLink>
        </li>
        <li className="item">
          <NavLink to={`properties`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Properties
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const Drawer = () => {
  return (
    <div className="drawer">
      <div id="navbar-drawer" data-uk-offcanvas="overlay: true">
        <div className="uk-offcanvas-bar">
          <button
            className="uk-offcanvas-close"
            type="button"
            data-uk-close
          ></button>
          <DRAWER_ROUTES />
        </div>
      </div>
      <div className="fixed-drawer uk-visible@s">
        <DRAWER_ROUTES />
      </div>
    </div>
  );
};

export default Drawer;

