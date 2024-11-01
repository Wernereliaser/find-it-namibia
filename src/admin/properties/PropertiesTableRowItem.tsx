import { Fragment } from "react"
import { observer } from "mobx-react-lite";
import { IProperty } from "../../shared/model/Property";

interface IProps {
  item: IProperty,
}

const PropertiesTableRowItem = observer((props: IProps) => {

  const { item } = props;

  return (
    <Fragment>
      <tr>
        <td>
          {item.title}
        </td>
        <td>
          {item.type}
        </td>
        <td>
          {item.status}
        </td>
        <td>
          {item.availability}
        </td>
      </tr>
    </Fragment>
  );
});

export default PropertiesTableRowItem

///when admin approves the property, the the status automatically changes to available.