import AirMonitoring from "@pages/AirMonitoring/AirMonitoring";
import DashboardLayout from "@layouts/DashboardLayout";
import { Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const { pathname } = useLocation();
  
  return (
    <DashboardLayout>
      {pathname === "/admin" && <AirMonitoring />}
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;
