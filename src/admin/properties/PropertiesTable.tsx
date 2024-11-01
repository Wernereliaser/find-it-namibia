import PropertiesTableRowItem from "./PropertiesTableRowItem";
import { observer } from "mobx-react-lite";
import { IProperty } from "../../shared/model/Property";

interface IProps {
  items: IProperty[]
}

const PropertiesTable = observer((props: IProps) => {

  const { items } = props;

  const columnDefs = [
    {
      headerName: "Title",
    },
    {
      headerName: "Type",
    },
    {
      headerName: "Status",
    },
    {
      headerName: "Availability",
    }
  ]

  return (
    <table className="uk-table uk-table-small uk-table-responsive uk-table-striped uk-table-hover">
      <thead>
        <tr>
          {columnDefs.map((item) => (
            <th key={item.headerName}>{item.headerName}</th>
          ))}
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