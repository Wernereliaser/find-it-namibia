import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useAppContext } from "../shared/context/Context";
import ErrorBoundary from "../shared/error/ErrorBoundary";
import useTitle from "../shared/hooks/useTitle";
import Modal from "../shared/modal/Modal";
import { MODAL_NAMES } from "../shared/model/Constants";
import UserList from "./users/UserList";
import UserModal from "../shared/dialog/UserModal";
import AdminPropertiesView from "./properties/AdminPropertiesView";

const Admin = observer(() => {
  const { store } = useAppContext();
  const [selectedTab, setselectedTab] = useState("USER");

  useTitle("Admin");

  return (
    <ErrorBoundary>
      <div className="uk-section settings">
        <div className="uk-container uk-container-large">
          <ErrorBoundary>
            <div className="uk-margin">
              {selectedTab === "USER" && <UserList />}
              {selectedTab === "PROPERTIES" && <AdminPropertiesView />}s
            </div>
          </ErrorBoundary>
        </div>
      </div>
      <ErrorBoundary>
        <Modal modalId={MODAL_NAMES.ADMIN.USER_MODAL}>
          <UserModal />
        </Modal>
      </ErrorBoundary>
    </ErrorBoundary>
  );
});

export default Admin;
