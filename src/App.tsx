import { ConfigProvider } from "antd";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { toastConf } from "./toastConfig";
import ScrollToTop from "@components/scrolltotop";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "0F7BEF",
        },
      }}
    >
      <BrowserRouter>
        <Toaster
          toastOptions={{ ...toastConf, className: "toastClass", icon: null }}
          position="top-center"
          reverseOrder={false}
        />
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
