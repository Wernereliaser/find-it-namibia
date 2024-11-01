import { observer } from "mobx-react-lite";
import { useAppContext } from "../../shared/context/Context";
import useTitle from "../../shared/hooks/useTitle";

const Dashboard = observer(() => {

  const { store } = useAppContext();
  useTitle("Dashboard");

  const me = store.auth.meJson;
  const displayName = me ? me.displayName : " ";

  return (
    <div className="uk-section dashboard">
      <div className="uk-container uk-container-large">
        <h4 className="uk-heading"> Welcome, {displayName}</h4>
      </div>
    </div>
  );
});

export default Dashboard;
