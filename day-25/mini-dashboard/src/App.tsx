import "./App.css";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { Outlet } from "react-router";

function App() {
  console.log("rendering app");

  return (
    <>
      <div className="main-layout">
        <Header />
        <SideBar />
        <Outlet/>
      </div>
    </>
  );
}

export default App;
