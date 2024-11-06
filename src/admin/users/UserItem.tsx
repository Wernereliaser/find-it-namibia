import { useAppContext } from "../../shared/context/Context";
import { IUser } from "../../shared/model/User";
import showModalFromId from "../../shared/modal/ModalShow";
import { MODAL_NAMES } from "../../shared/model/Constants";

interface IProps {
  user: IUser;
}
const UserItem = (props: IProps) => {
  const { store, api } = useAppContext();

  const { user } = props;

  const handleEdit = () => {
    store.user.select(user);
    showModalFromId(MODAL_NAMES.ADMIN.USER_MODAL);
  };
  const handleDelete = async () => {
    if (!window.confirm("Delete user")) return;
    await api.user.delete(user)
  }

  return (
    <div className={`user uk-card uk-card-body uk-card-small`}>
      <div className="uk-grid-small uk-grid-match" data-uk-grid>
        <div className="uk-flex uk-flex-middle uk-width-1-1 uk-width-expand@m">
          <h6 className="name">
            <span className="span-label">Name</span>
            {user.displayName}
          </h6>
        </div>
        <div className="uk-flex uk-flex-middle uk-width-1-2 uk-width-1-6@m">
          <p className="role">
            <span className="span-label">Role</span>
            {user.role}
          </p>
        </div>
        <div className="uk-flex uk-flex-middle uk-width-1-2 uk-width-1-6@m">
          <p className="role">
            <span className="span-label">Email Address</span>
            {user.email}
          </p>
        </div>
        <div className="uk-flex uk-flex-middle uk-width-1-2 uk-width-1-6@m">
          <p className="role">
            <span className="span-label">Cellphone</span>
            {user.phoneNumber}
          </p>
        </div>
        <div className="uk-flex uk-flex-middle uk-width-1-1 uk-width-1-6@m uk-text-right">
          <div className="controls">
            <button
              className="bttn primary"
              title="Save"
              onClick={handleEdit} >
              <span data-uk-icon="pencil"></span>
            </button>
            <button
              className="bttn warning"
              title="Delete"
              onClick={handleDelete}>
              <span data-uk-icon="trash"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
