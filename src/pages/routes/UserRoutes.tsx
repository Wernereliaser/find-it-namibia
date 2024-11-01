import { Fragment, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ErrorBoundary from "../../shared/error/ErrorBoundary";
import { Loading } from "../../shared/loading/Loading";
import Footer from "../footer/Footer";
import NavBar from "../../shared/nav/NavBar";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import CategoryView from "../category/CategoryView";
import ForgotPassword from "../forgot-password/ForgotPassword";
import Home from "../home/Home";
import Landing from "../landing/Landing";
import Login from "../login/Login";
import Register from "../register/Register";
import { useAppContext } from "../../shared/context/Context";
import ListingDetail from "../listing-detail/ListingDetail";
import PrivateRoute from "./PrivateRoute";
import CreateListing from "../user-listing/CreateListing";
import EditListing from "../edit-listing/EditListing";
import Messages from "../messages/Messages";
import SavedListings from "../user-listing/SavedListings";
import Profile from "../profile/Profile";
import MyListings from "../user-listing/MyListings";
import AdminPropertiesView from "../../admin/properties/AdminPropertiesView";
import Dashboard from "../../admin/dashboard/Dashboard";
import UserList from "../../admin/users/UserList";
import LoggedInAdmin from "../../admin/LoggedInAdmin";

const UserRoutes = observer(() => {
  const [fetchingData, setFetchingData] = useState(true);
  const { store } = useAppContext();
  const user = store.auth.meJson

  const checkUser = useCallback(async () => {
    setFetchingData(true)

    if (store.auth.me) {
      setFetchingData(false)
      return
    }
    setFetchingData(false)
  }, [store.auth])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  return (
    <Fragment>
      {fetchingData && <Loading />}
      {!fetchingData &&
        <div className="mainpage">
          <header className="px-3">
            <div className="w-full max-w-7xl mx-auto flex items-center py-5">
              <Link
                to="/home"
                className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-90">
                <Logo className="w-10 h-10 sm:w-7 sm:h-7 text-primary" />
                <span className="hidden sm:block">Rent or Sell</span>
              </Link>
              <NavBar />
            </div>
          </header>
          <div className="content">
            <ErrorBoundary>
              <Routes>

                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/category/:categoryName" element={<CategoryView />} />
                <Route path="/view/:listingId" element={<ListingDetail />} />
                <Route path="*/*" element={<Navigate to={"/"} />} />

                <Route path="/user" element={<PrivateRoute />}>
                  <Route path="/user/create" element={<CreateListing />} />
                  <Route path="/user/view" element={<MyListings />} />
                  <Route path="/user/edit/:listingId" element={<EditListing />} />
                  <Route path="/user/messages" element={<Messages />} />
                  <Route path="/user/favorites" element={<SavedListings />} />
                  <Route path="/user/profile" element={<Profile />} />
                </Route>

                {user && user.role === "Admin" ? (
                  <Route path="/admin" element={<LoggedInAdmin />}>
                    <Route path="/admin/users" element={<UserList />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/properties" element={<AdminPropertiesView />} />
                  </Route>
                ) : null}

              </Routes >
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      }
    </Fragment>
  );
});

export default UserRoutes;
