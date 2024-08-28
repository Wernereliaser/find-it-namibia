import { useState } from "react";
import WebRouting from "./WebRouting";
import { observer } from "mobx-react-lite";
import ErrorBoundary from "../../shared/error/ErrorBoundary";
import { LoadingEllipsis } from "../../shared/loading/Loading";
import Footer from "../footer/Footer";
import NavBar from "../../shared/nav/NavBar";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

const UserRoutes = observer(() => {
  const [fetchingData, setFetchingData] = useState(false);

  return (
    <main>
      {fetchingData && <LoadingEllipsis fullHeight />}
      {!fetchingData &&
        <div className="mainpage">
          <header className="px-3">
            <div className="w-full max-w-7xl mx-auto flex items-center py-5">
              <Link
                to="/"
                className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-90">
                <Logo className="w-10 h-10 sm:w-7 sm:h-7 text-primary" />
                <span className="hidden sm:block">Rent or Sell</span>
              </Link>
              {!fetchingData && <NavBar />}
            </div>
          </header>
          <div className="content">
            <ErrorBoundary>
              <WebRouting />
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      }
    </main>
  );
});

export default UserRoutes;
