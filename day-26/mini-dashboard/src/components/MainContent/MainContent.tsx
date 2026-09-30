import type { Page } from "../../utils/types";
import "./Maincontent.css";

function MainContent({ currentPage }: { currentPage: Page }) {
  console.log("rendering page with", currentPage);

  const projects = [
    {
      id: 1,
      title: "project_1",
      description: "project_1_description",
    },
    {
      id: 2,
      title: "project_2",
      description: "project_2_description",
    },
  ];

  console.log(projects);

  if (currentPage == "Dashboard") {
    return <div className="main-content-div">Dashboard</div>;
  }

  return <div className="main-content-div">Dashboard</div>;
}

export default MainContent;
