import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '../../shared/loading/Loading';
import { useAppContext } from '../../shared/context/Context';

function PrivateRoute() {

  const { store } = useAppContext();
  const user = store.auth.meJson

  if (store.auth.loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p><Loading fullHeight /></p>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
