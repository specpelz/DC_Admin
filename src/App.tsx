import { ConfigProvider } from "antd";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

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
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
