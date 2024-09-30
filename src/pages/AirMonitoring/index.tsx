import AirMonitoring from "@components/dashboard/airMonitoring/AirMonitoring";
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
