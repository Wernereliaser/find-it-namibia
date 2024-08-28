import { useState } from "react";
import Drawer from "../shared/nav/Drawer";
import Layout from "./layout/Layout";
import { observer } from "mobx-react-lite";

const LoggedInAdmin = observer(() => {

  const [fetchingData, setFetchingData] = useState(false);

  return (
    <div className="loggedin">
      <Drawer />
      <Layout fetchingData={fetchingData} />
    </div>
  );
});

export default LoggedInAdmin;
