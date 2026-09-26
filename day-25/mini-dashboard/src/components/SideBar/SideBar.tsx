// import type { Page } from "../../utils/types";
import { NavLink } from "react-router";
import "./SideBar.css";

const sideBarComponents = [
  {
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    name: "Projects",
    url: "/projects",
  },
  {
    name: "Issues",
    url: "/issues",
  },
  {
    name: 'Profile',
    url: "/profile"
  }
];

function sidebarButtons(name: string, url: string, index: number) {
  // function changePage() {
  //   changerFn(name as Page);
  // }

  // if (currentPage === name) {
  //   // return (
  //   //   <div key={index} className="sidebar-elements-selected" onClick={changePage}>
  //   //     <h4>{name}</h4>
  //   //   </div>
  //   // );

  //   return (
  //     <a key={index} className="sidebar-elements-selected" href={`/${name}`}>
  //       <h4>{name}</h4>
  //     </a>
  //   );
  // }

  return (
    <NavLink className="sidebar-elements-selected" key={index} to={`${url}`}>
      {name}
    </NavLink>
  );
}

function SideBar() {
  return (
    <div className="sidebar-div">
      {sideBarComponents.map((component, index) =>
        sidebarButtons(component.name, component.url, index),
      )}
    </div>
  );
}

export default SideBar;
