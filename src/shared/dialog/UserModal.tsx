import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useState } from "react";
import { useAppContext } from "../context/Context";
import { hideModalFromId } from "../modal/ModalShow";
import { MODAL_NAMES, USER_ROLES } from "../model/Constants";
import { defaultUser } from "../model/User";

const UserModal = observer(() => {
  const { api, store } = useAppContext();

  const [user, setUser] = useState({ ...defaultUser });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await api.user.update(user);;

    setLoading(false);
    onCancel();
  };

  const onCancel = () => {
    store.user.clearSelected();
    setUser({ ...defaultUser });
    hideModalFromId(MODAL_NAMES.ADMIN.USER_MODAL);
  };

  useEffect(() => {
    if (store.user.selected) setUser({ ...store.user.selected });
    else setUser({ ...defaultUser });
  }, [store.user.selected]);

  return (
    <div className="user-modal uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <button
        className="uk-modal-close-default"
        type="button"
        data-uk-close
      ></button>
      <h3 className="uk-modal-title">User</h3>
      <div className="dialog-content uk-position-relative">
        <form
          className="uk-form-stacked uk-grid-small"
          onSubmit={handleSubmit}
          data-uk-grid
        >
          <div className="uk-width-1-1">
            <label className="uk-form-label" htmlFor="user-fname">
              Full name
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-small"
                id="user-fname"
                type="text"
                value={user.displayName}
                onChange={(e) => setUser({ ...user, displayName: e.target.value })}
              />
            </div>
          </div>

          <div className="uk-width-1-1">
            <label className="uk-form-label" htmlFor="user-email">
              Email
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-small"
                id="user-email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
          <div className="uk-width-1-1">
            <label className="uk-form-label" htmlFor="user-role">
              Role
            </label>
            <div className="uk-form-controls">
              <select
                className="uk-select uk-form-medium"
                id="user-role"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value={USER_ROLES.MD_USER}>Managing Director</option>
                <option value={USER_ROLES.ADMIN_USER}>System Administrator</option>
                <option value={USER_ROLES.MANAGER_USER}>Manager</option>
                <option value={USER_ROLES.SUPERVISOR_USER}>Supervisor</option>
                <option value={USER_ROLES.EMPLOYEE_USER}>Employee</option>
                <option value={USER_ROLES.DRIVER_USER}>Driver</option>
              </select>
            </div>
          </div>
          <div className="uk-width-1-1 uk-text-right">
            <button
              className="btn-text uk-margin-right"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              Submit {loading && <div data-uk-spinner="ratio: .5"></div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default UserModal;
