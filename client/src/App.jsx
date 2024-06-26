import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import CssBaseline from "@mui/material/CssBaseline";
import themeConfigs from "./configs/theme.configs";
import PageWrapper from "./components/common/PageWrapper";
import Main from "./pages/index/Main";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position="top-right"
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
          <Route path="/" element={<Main />} />
          <Route path="/browse" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
