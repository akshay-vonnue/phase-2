import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import type { Page } from "./utils/types";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Dashboard");
  console.log(currentPage);

  return (
    <div className="main-layout">
      <Header />
      <SideBar pageChanger={setCurrentPage} currentPage={currentPage} />
      <MainContent currentPage={currentPage}/>
    </div>
  );
}

export default App;
