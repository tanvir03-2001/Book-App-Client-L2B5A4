import { Outlet } from "react-router";
import Footer from "./component/layout/Footer";
import Navbar from "./component/layout/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
