import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../shared/loading/Loading";
import { observer } from "mobx-react-lite";
import "../styles/Index.scss";

interface IProps {
  fetchingData: boolean;
}
const AdminLayout = observer((props: IProps) => {
  const { fetchingData } = props;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/admin") navigate("/admin/dashboard");
  }, [navigate, pathname]);

  return (
    <main className="layout">
      {!fetchingData && <Outlet />}
      {fetchingData && <Loading fullHeight />}
    </main>
  );
});

export default AdminLayout;