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
        <h4 className="uk-heading"> Welcome, {displayName}
        </h4>
        <h4>Vehicles</h4>
        <div className="uk-grid-small uk-animation-fade uk-flex-middle uk-child-width-1-9 uk-child-width-1-2@m uk-child-width-1-3@l uk-grid-match" data-uk-grid>
        
        </div>
        <h4>Requests</h4>
        <div
          className="uk-grid-small uk-animation-fade uk-flex-middle uk-child-width-1-9 uk-child-width-1-2@m uk-child-width-1-4@l uk-grid-match" data-uk-grid >

        </div>

      </div>
    </div>
  );
});

export default Dashboard;
