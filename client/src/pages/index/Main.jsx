import { useEffect } from "react";
import Header from "./Header";
import Features from "./Features";
import FAQ from "./FAQ";
import Footer from "../../components/common/Footer";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
};

export default Main;
