import { observer } from "mobx-react-lite";
import PropertiesTable from "./PropertiesTable";
import { useAppContext } from "../../shared/context/Context";
import { IProperty } from "../../shared/model/Property";

const AdminPropertiesView = observer(() => {

  const { store } = useAppContext();
  const items: IProperty[] = [...store.property.all];

  return (
    <div className="uk-section">
      <div className="uk-container uk-container-large">
        <h4>Items</h4>
        <PropertiesTable items={items} />
      </div>
    </div>
  )
})

export default AdminPropertiesView;