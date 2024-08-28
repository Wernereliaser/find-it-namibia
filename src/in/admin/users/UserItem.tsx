import { useAppContext } from "../../../shared/context/Context";
import { IUser } from "../../../shared/model/User";
import showModalFromId from "../../../shared/modal/ModalShow";
import { MODAL_NAMES } from "../../../shared/model/Constants";

interface IProps {
  user: IUser;
}
const UserItem = (props: IProps) => {
  const { store } = useAppContext();

  const { user } = props;

  const handleEdit = () => {
    store.user.select(user);
    showModalFromId(MODAL_NAMES.ADMIN.USER_MODAL);
  };

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
            <span className="span-label">User rights</span>
            {user.role}
          </p>
        </div>

        

        <div className="uk-flex uk-flex-middle uk-width-1-1 uk-width-1-6@m uk-text-right">
          <div className="controls">

            <button className="btn-icon" title="Edit" onClick={handleEdit}>
              <span data-uk-icon="pencil"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
