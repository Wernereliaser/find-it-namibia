import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../shared/loading/Loading";
import { observer } from "mobx-react-lite";
import NavBar  from "../../shared/nav/NavBar";
interface IProps {
  fetchingData: boolean;
}
const Layout = observer((props: IProps) => {
  const { fetchingData } = props;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/user") navigate("/dashboard");
  }, [navigate, pathname]);


  return (
    <main className="layout">
      <NavBar />
      {!fetchingData && <Outlet />}
      {fetchingData && <Loading fullHeight />}
    </main>
  );
});

export default Layout;