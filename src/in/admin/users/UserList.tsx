import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import UserItem from "./UserItem";
import { useAppContext } from "../../../shared/context/Context";
import EmptyError from "../../../shared/error/EmptyError";
import ErrorBoundary from "../../../shared/error/ErrorBoundary";
import { UserModel } from "../../../shared/model/User";
import SingleSelect, { IOption } from "../../../shared/select/SingleSelect";
import Toolbar from "../../../shared/toolbar/Toolbar";

const UserList = observer(() => {
  const { store } = useAppContext();
  const [search, setSearch] = useState("");

  const sortByName = (a: UserModel, b: UserModel) => {
    if ((a.asJson.displayName || "") < (b.asJson.displayName || "")) return -1;
    if ((a.asJson.displayName || "") > (b.asJson.displayName || "")) return 1;
    return 0;
  };

  const users = useMemo(() => {
    const _users = store.user.all
    return search !== "" ? _users.filter((u) => u.asJson.uid === search) : _users;
  }, [search, store.user.all]);

  const options: IOption[] = useMemo(() =>
    users.map((user) => {
      return { label: user.asJson.displayName || "", value: user.asJson.uid };
    }),
    [users]);

  const onSearch = (value: string) => setSearch(value);

  return (
    <ErrorBoundary>
      <div className="sticky-top">
        <ErrorBoundary>
          <Toolbar
            rightControls={
              <ErrorBoundary>
                <SingleSelect
                  name="search-team"
                  options={options}
                  width="250px"
                  onChange={onSearch}
                />
              </ErrorBoundary>
            }
          />
        </ErrorBoundary>
      </div>
      <div className="users-list">
        <ErrorBoundary>
          {users.sort(sortByName).map((user) => (
            <div key={user.asJson.uid}>
              <UserItem user={user.asJson} />
            </div>
          ))}
        </ErrorBoundary>
        <ErrorBoundary>
          {!store.user.all.length && (
            <EmptyError errorMessage="No users found" />
          )}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
});

export default UserList;
