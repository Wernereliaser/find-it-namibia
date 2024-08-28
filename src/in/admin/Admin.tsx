import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useAppContext } from "../../shared/context/Context";
import Dropdown from "../../shared/dropdown/Dropdown";
import ErrorBoundary from "../../shared/error/ErrorBoundary";
import useTitle from "../../shared/hooks/useTitle";
import Modal from "../../shared/modal/Modal";
import { MODAL_NAMES } from "../../shared/model/Constants";
import Toolbar from "../../shared/toolbar/Toolbar";
import UserList from "./users/UserList";
import AdminTabs from "./AdminTabs";
import UserModal from "../../shared/dialog/UserModal";

const Admin = observer(() => {
  const { store } = useAppContext();
  const [selectedTab, setselectedTab] = useState("USER");

  useTitle("Admin");

  return (
    <ErrorBoundary>
      <div className="uk-section settings">
        <div className="uk-container uk-container-large">
          <div className="sticky-top">
            <ErrorBoundary>
              <Toolbar
                leftControls={
                  <AdminTabs
                    selectedTab={selectedTab}
                    setselectedTab={setselectedTab}
                  />
                }
                rightControls={
                  <div className="uk-inline">
                    <button className="btn btn-primary">
                      <span data-uk-icon="icon: plus-circle; ratio:.8"></span>{" "}
                      Add
                    </button>
                    <Dropdown pos="bottom-right">
                      <li>
                        <button className="btn btn-primary">
                          <span data-uk-icon="icon: plus-circle; ratio:.8"></span>
                          Vehicle
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-primary" >
                          <span data-uk-icon="icon: plus-circle; ratio:.8"></span>
                          Department
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-primary">
                          <span data-uk-icon="icon: plus-circle; ratio:.8"></span>
                          Donor
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-primary">
                          <span data-uk-icon="icon: plus-circle; ratio:.8"></span>
                          Organisation
                        </button>
                      </li>
                    </Dropdown>
                  </div>
                }
              />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <div className="uk-margin">
              {selectedTab === "USER" && <UserList />}
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
