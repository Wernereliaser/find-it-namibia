
import { observer } from "mobx-react-lite";
import { IProperty } from "../../shared/model/Property"
import PropertiesTableRowItem from "./PropertiesTableRowItem";

interface IProps {
  items: IProperty[]
}

const PropertiesTable = observer((props: IProps) => {

  const { items } = props;

  return (
    <table className="uk-table uk-table-small uk-table-responsive uk-table-striped uk-table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Status</th>
          <th>Availability</th>
          <th className="uk-text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <PropertiesTableRowItem
            key={item.id}
            item={item} />
        ))}
      </tbody>
    </table>
  );
});

export default PropertiesTable