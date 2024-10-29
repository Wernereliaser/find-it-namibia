import { BrowserRouter } from "react-router-dom";
import { AppContext } from './shared/context/Context';
import { observer } from "mobx-react-lite";
import { MainApp } from "./shared/model/App";
import UserRoutes from "./pages/routes/UserRoutes";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./pages/routes/ScrollToTop";

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




