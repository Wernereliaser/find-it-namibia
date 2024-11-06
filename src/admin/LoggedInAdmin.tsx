import { useCallback, useEffect, useState } from "react";
import Drawer from "../shared/nav/Drawer";
import { observer } from "mobx-react-lite";
import AdminLayout from "./layout/AdminLayout";
import { toast } from "react-toastify";
import { useAppContext } from "../shared/context/Context";
import ErrorBoundary from "../shared/error/ErrorBoundary";
import Modal from "../shared/modal/Modal";
import { MODAL_NAMES } from "../shared/model/Constants";
import UserModal from "../shared/dialog/UserModal";
import "../styles/Index.scss";

const LoggedInAdmin = observer(() => {

  const { api } = useAppContext()
  const [fetchingData, setFetchingData] = useState(true);

  const loadData = useCallback(async () => {
    setFetchingData(true)
    try {
      await api.user.getAll();
      await api.property.getAll()

    } catch (error) {
      toast.error(`Error loading data`)
    } finally {
      setFetchingData(false)
    }
  }, [api.user, api.property])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="main-layout">
      <Drawer />
      <AdminLayout fetchingData={fetchingData} />

      <ErrorBoundary>
        <Modal modalId={MODAL_NAMES.ADMIN.USER_MODAL}>
          <UserModal />
        </Modal>
      </ErrorBoundary>
    </div>
  );
});

export default LoggedInAdmin;

