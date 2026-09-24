import type { Page } from "../../utils/types";
import "./SideBar.css";

const sideBarComponents = [
  {
    name: "Dashboard",
  },
  {
    name: "Projects",
  },
  {
    name: "Issues",
  },
];

function sidebarButtons(
  name: string,
  changerFn: React.Dispatch<React.SetStateAction<Page>>,
  currentPage: Page,
  index: number
) {
  function changePage() {
    changerFn(name as Page);
  }

  if (currentPage === name) {
    return (
      <div key={index} className="sidebar-elements-selected" onClick={changePage}>
        <h4>{name}</h4>
      </div>
    );
  }

  return (
    <div key={index} className="sidebar-elements" onClick={changePage}>
      <h4>{name}</h4>
    </div>
  );
}

function SideBar({
  pageChanger,
  currentPage,
}: {
  pageChanger: React.Dispatch<React.SetStateAction<Page>>;
  currentPage: Page;
}) {
  return (
    <div className="sidebar-div">
      {sideBarComponents.map((component,index) =>
        sidebarButtons(component.name, pageChanger, currentPage,index),
      )}
    </div>
  );
}

export default SideBar;
