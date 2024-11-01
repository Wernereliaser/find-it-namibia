import { useCallback, useEffect, useState } from "react";
import Drawer from "../shared/nav/Drawer";
import { observer } from "mobx-react-lite";
import AdminLayout from "./layout/AdminLayout";
import "../styles/Index.scss";
import { toast } from "react-toastify";
import { useAppContext } from "../shared/context/Context";

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
    </div>
  );
});

export default LoggedInAdmin;

