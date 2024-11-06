import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useState } from "react";
import { useAppContext } from "../context/Context";
import { MODAL_NAMES } from "../model/Constants";
import { defaultUser, IUser } from "../model/User";
import { hideModalFromId } from "../modal/ModalShow";

const UserModal = observer(() => {

  const { store, api } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser>(defaultUser);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await api.user.update(user);
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
    <div className="admin-user-modal uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <button
        className="uk-modal-close-default"
        type="button"
        data-uk-close
      ></button>
      <div className="dialog-content uk-position-relative">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="label" htmlFor="admin-user-role">
              Role
            </label>
            <select
              className="select select-bordered w-full"
              id="admin-user-role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value as "Landlord" | "Tenant" | "Admin" })}
              required>
              <option value={"Landlord"}>Landlord</option>
              <option value={"Tenant"}>Tenant</option>
              <option value={"Admin"}>Admin</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="admin-user-gender">
              Gender
            </label>
            <select
              className="select select-bordered w-full"
              id="admin-user-gender"
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              required>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="admin-user-fullname">
              Full Name
            </label>
            <input
              className="input input-bordered w-full"
              id="admin-user-fullname"
              type="text"
              value={user.displayName}
              onChange={(e) =>
                setUser({ ...user, displayName: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="admin-user-email">
              Email Address
            </label>
            <input
              className="input input-bordered w-full"
              id="admin-user-email"
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="admin-user-phoneNumber">
              Phone Number
            </label>
            <input
              className="input input-bordered w-full"
              id="admin-user-phoneNumber"
              type="tel"
              placeholder="+264"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="admin-user-town">
              Town
            </label>
            <select
              className="select select-bordered w-full"
              id="admin-user-region"
              value={user.town}
              onChange={(e) => setUser({ ...user, town: e.target.value })}
              required>
              <option value={"Walvis Bay"}>Walvis Bay</option>
              <option value={"Swakopmund"}>Swakopmund</option>
              <option value={"Luderitz"}>Luderitz</option>
              <option value={"Keetmanshoop"}>Keetmanshoop</option>
              <option value={"Noordoewer"}>Noordoewer</option>
              <option value={"Oshakati"}>Oshakati</option>
              <option value={"Otjiwarongo"}>Otjiwarongo</option>
              <option value={"Okahandja"}>Okahandja</option>
              <option value={"Tsumeb"}>Tsumeb</option>
              <option value={"Rundu"}>Rundu</option>
              <option value={"Windhoek"}>Windhoek</option>
            </select>
          </div>
          <div className="mb-2">
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={loading}
            >Submit</button>
          </div>
          <div className="mb-2">
            <button
              className="btn btn-accent w-full"
              type="button"
              onClick={onCancel}
              disabled={loading}
            >Close</button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default UserModal;
