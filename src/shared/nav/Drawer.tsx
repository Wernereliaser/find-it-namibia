import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/Context";
import { observer } from "mobx-react-lite";
import { USER_ROLES } from "../model/Constants";

export const Account = () => {
  return (
    <div className="brand uk-margin">
      <img src={`${process.env.PUBLIC_URL}/images/wbcglogo.png`} alt="WBCG" />
    </div>
  );
};

const ADMIN_DRAWER_ROUTES = () => {

  return (
    <div className="drawer-list">
      <ul className="main-list uk-nav-default" data-uk-nav>
        <li className="list-item">
          <NavLink to={`dashboard`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Dashboard
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`admin`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Admin
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`vehicles`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Vehicles
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`donors`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Donors
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`requests`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Requests
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`allocations`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Allocations
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const EMPLOYEE_DRAWER_ROUTES = () => {

  return (
    <div className="drawer-list">
      <ul className="main-list uk-nav-default" data-uk-nav>
        <li className="list-item">
          <NavLink to={`dashboard`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Dashboard
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`vehicles`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Vehicles
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`requests`} className="navlink">
            <span data-uk-icon="chevron-double-right" className="uk-margin-small-right"></span>
            Requests
          </NavLink>
        </li>
      </ul>
    </div>
  );
};


const DRAWER_ROUTES = observer(() => {
  const { store } = useAppContext();
  const role = store.auth.role;

  switch (role) {
    case USER_ROLES.ADMIN_USER:
      return <ADMIN_DRAWER_ROUTES />;
    case USER_ROLES.EMPLOYEE_USER:
      return <EMPLOYEE_DRAWER_ROUTES />;
    default:
      return <EMPLOYEE_DRAWER_ROUTES />;
  }
});

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
          <Account />
          <DRAWER_ROUTES />
        </div>
      </div>
      <div className="fixed-drawer uk-visible@s">
        <Account />
        <DRAWER_ROUTES />
      </div>
    </div>
  );
};

export default Drawer;

