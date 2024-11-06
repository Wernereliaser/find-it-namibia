import { observer } from "mobx-react-lite";
import PropertiesTable from "./PropertiesTable";
import { useAppContext } from "../../shared/context/Context";
import { IProperty } from "../../shared/model/Property";
import ErrorBoundary from "../../shared/error/ErrorBoundary";

const AdminPropertiesView = observer(() => {

  const { store } = useAppContext();
  const items: IProperty[] = [...store.property.all];

  return (
    <div className="uk-section">
      <div className="uk-container uk-container-xlarge">
        <div className="admin-properties-view">
          <ErrorBoundary>
            <PropertiesTable items={items} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
})

export default AdminPropertiesView;