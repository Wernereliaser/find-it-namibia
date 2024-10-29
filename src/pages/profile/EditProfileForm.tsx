import { FormEvent, useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TextInput from '../../components/TextInput';
import { auth, db } from '../../shared/db/config';
import { defaultUser, IUser } from '../../shared/model/User';
import { useAppContext } from '../../shared/context/Context';

function EditProfileForm() {

  const { store } = useAppContext()
  const [user, setUser] = useState<IUser>(store.auth.meJson!!);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: user?.displayName
        });
        await updateDoc(doc(db, "users", user?.uid), { ...user });
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error(`error.message`);
    }
  };

  // useEffect(() => {
  //   if (store.auth.meJson) {
  //     setUser(store.auth.meJson);
  //   }
  // }, [store.auth.meJson]);

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <TextInput
          label="Name"
          name="fullname"
          id="edit-user-fullname"
          type="text"
          required
          value={user?.displayName}
          onChange={(e) =>
            setUser({ ...user, displayName: e.target.value })
          } />
      </div>
      <div className="mb-4">
        <TextInput
          label="Email"
          id="edit-user-email"
          name="email"
          type="email"
          disabled
          value={user?.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          } />
      </div>
      <div className="mb-4">
        <TextInput
          label="Phone Number"
          id="edit-user-phoneNumber"
          name="title"
          type="text"
          required
          value={user?.phoneNumber}
          onChange={(e) =>
            setUser({ ...user, phoneNumber: e.target.value })
          } />
      </div>
      <div className="mb-2">
        <label className="label" htmlFor="edit-user-town">
          Town
        </label>
        <select
          className="select select-bordered w-full"
          id="edit-user-town"
          value={user?.town}
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
      <button
        type="submit"
        className="btn btn-primary btn-block mx-0">
        Update
      </button>
    </form>
  );
}

export default EditProfileForm;
