import { Outlet } from "react-router";
import Navbar from "./component/layout/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
