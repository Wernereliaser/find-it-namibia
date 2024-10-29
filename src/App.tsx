import { BrowserRouter } from "react-router-dom";
import { AppContext } from './shared/context/Context';
import { observer } from "mobx-react-lite";
import { MainApp } from "./shared/model/App";
import UserRoutes from "./pages/routes/UserRoutes";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./pages/routes/ScrollToTop";

// const LoggedInAdmin = lazy(() => import("./in/LoggedInAdmin"));
// interface IProps {
//   children: JSX.Element;
// }

// const PrivateRoute = observer((props: IProps) => {
//   const { children } = props;
//   const { store } = useAppContext();

//   return store.auth.me ? children : <Navigate to="/" />;
// });

// const LoggedInRoute = () => (
//   <PrivateRoute>
//     <Suspense fallback={<Loading fullHeight={true} />}>
//       <LoggedInAdmin />
//     </Suspense>
//   </PrivateRoute>
// );

// const ADMIN_USER_ROUTES = () => {
//   return (
//     <Routes>
//       <Route path="a" element={<LoggedInRoute />}>
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="users" element={<UserList />} />
//         <Route path="*" element={<Navigate to="/a/dashboard" />} />
//       </Route>
//       <Route path="/*" element={<UserRoutes />} >
//         <Route path="*" element={<Home />} />
//       </Route>
//     </Routes>
//   );
// };

// const LANDLORD_USER_ROUTES = () => {
//   return (
//     <Routes>
//       <Route path="/*" element={<UserRoutes />} >
//         <Route path="*" element={<Home />} />
//       </Route>
//       <Route path="/create" element={<CreateListing />} />
//       <Route path="/edit/:listingId" element={<EditListing />} />
//       <Route path="/messages" element={<Messages />} />
//       <Route path="/favorites" element={<SavedListings />} />
//     </Routes>
//   );
// };

// const TENANT_USER_ROUTES = () => {
//   return (
//     <Routes>
//       <Route path="/*" element={<UserRoutes />} >
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Route>
//     </Routes>
//   );
// };

// const MainRoutes = observer(() => {
//   const { store } = useAppContext();
//   const role = store.auth.role;

//   switch (role) {
//     case USER_ROLES.ADMIN_USER:
//       return <ADMIN_USER_ROUTES />;
//     case USER_ROLES.LANDLORD_USER:
//       return <LANDLORD_USER_ROUTES />;
//     case USER_ROLES.TENANT_USER:
//       return <TENANT_USER_ROUTES />;
//     default:
//       return <TENANT_USER_ROUTES />;
//   }
// });

const App = observer(() => {
  const app = new MainApp();
  const { store, api, ui } = app;

  return (
    <div className="font-sans">
      <AppContext.Provider value={{ store, api, ui }}>
        <BrowserRouter>
          <UserRoutes />
          <ScrollToTop />
        </BrowserRouter>
        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
});
export default App;




