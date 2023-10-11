import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />

      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route index key={index} element={route.element} />
              ) : (
                <Route path={route.path} key={index} element={route.element} />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
