import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppContext, useAppContext } from './shared/context/Context';
import { Loading } from './shared/loading/Loading';
import Dashboard from './in/dashboard/Dashboard';
import { observer } from "mobx-react-lite";
import { USER_ROLES } from "./shared/model/Constants";
import UserList from "./in/admin/users/UserList";
import { MainApp } from "./shared/model/App";
import Home from "./pages/home/Home";
import UserRoutes from "./pages/routes/UserRoutes";
import CreateListing from "./pages/create-listing/CreateListing";
import { ToastContainer } from "react-toastify";
const LoggedInAdmin = lazy(() => import("./in/LoggedInAdmin"));
interface IProps {
  children: JSX.Element;
}

const PrivateRoute = observer((props: IProps) => {
  const { children } = props;
  const { store } = useAppContext();

  return store.auth.me ? children : <Navigate to="/" />;
});

const LoggedInRoute = () => (
  <PrivateRoute>
    <Suspense fallback={<Loading fullHeight={true} />}>
      <LoggedInAdmin />
    </Suspense>
  </PrivateRoute>
);


const ADMIN_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="a" element={<LoggedInRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="*" element={<Navigate to="/a/dashboard" />} />
        </Route>
        <Route path="/*" element={<UserRoutes />} >
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const LANDLORD_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} >
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/create" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
  );
};

const TENANT_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} >
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const MainRoutes = observer(() => {
  const { store } = useAppContext();
  const role = store.auth.role;


  switch (role) {
    case USER_ROLES.ADMIN_USER:
      return <ADMIN_USER_ROUTES />;
    case USER_ROLES.LANDLORD_USER:
      return <LANDLORD_USER_ROUTES />;
    case USER_ROLES.TENANT_USER:
      return <TENANT_USER_ROUTES />;
    default:
      return <TENANT_USER_ROUTES />;
  }
});

const App = observer(() => {
  const app = new MainApp();
  const { store, api, ui } = app;

  return (
    <div className="font-sans">
      <AppContext.Provider value={{ store, api, ui }}>
        <MainRoutes />
        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
});
export default App;




