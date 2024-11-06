import { observer } from "mobx-react-lite";
import UserItem from "./UserItem";
import { useAppContext } from "../../shared/context/Context";
import ErrorBoundary from "../../shared/error/ErrorBoundary";
import { UserModel } from "../../shared/model/User";

const UserList = observer(() => {

  const { store } = useAppContext();

  const sortByName = (a: UserModel, b: UserModel) => {
    if ((a.asJson.displayName || "") < (b.asJson.displayName || "")) return -1;
    if ((a.asJson.displayName || "") > (b.asJson.displayName || "")) return 1;
    return 0;
  };

  const users: UserModel[] = [...store.user.all]

  return (
    <div className="uk-section">
      <div className="uk-container uk-container-large">
        <div className="admin-users-view">
          <ErrorBoundary>
            {users.sort(sortByName).map((user) => (
              <div key={user.asJson.uid}>
                <UserItem user={user.asJson} />
              </div>
            ))}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
});

export default UserList;
