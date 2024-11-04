import { Fragment, useState } from "react"
import { observer } from "mobx-react-lite";
import { IProperty } from "../../shared/model/Property";
import { useAppContext } from "../../shared/context/Context";

interface IProps {
  item: IProperty,
}

const PropertiesTableRowItem = observer((props: IProps) => {

  const { item } = props;
  const { store, api } = useAppContext()

  const [newStatus, setNewStatus] = useState(item.status)
  const [newAvailability, setNewAvailability] = useState(item.availability);

  const [loading, setLoading] = useState(false)

  async function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true)
    const newItem: IProperty = {
      ...item,
      status: newStatus,
      availability: newStatus === "approved" ? "available" : newAvailability
    }
    await api.property.update(newItem);
    store.property.load([newItem])
    setLoading(false)
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!window.confirm("Delete?")) return
    await api.property.delete(item)
  }

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
          <select
            className="uk-select"
            id="edit-status"
            value={newStatus}
            onChange={(e) =>
              setNewStatus(e.target.value as "approved" | "rejected" | "pending")
            }
            required>
            <option value={"approved"}>approved</option>
            <option value={"rejected"}>rejected</option>
            <option value={"pending"}>pending</option>
          </select>
        </td>
        <td>
          <select
            className="uk-select"
            id="edit-availability"
            value={newAvailability}
            onChange={(e) =>
              setNewAvailability(e.target.value as "pending" | "available" | "taken")
            }
            required>
            <option value={"taken"}>taken</option>
            <option value={"available"}>available</option>
            <option value={"pending"}>pending</option>
          </select>
        </td>
        <td className="uk-text-right">
          <button
            className="bttn primary"
            title="Save"
            onClick={handleSave}
            disabled={loading}
          >
            Save
          </button>
          <button
            className="bttn warning"
            title="Delete"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  );
});

export default PropertiesTableRowItem

///when admin approves the property, the the status automatically changes to available.