import type { Page } from "../../utils/types";
import IssueCard from "../IssueCard/IssueCard";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./Maincontent.css";

function MainContent({ currentPage }: { currentPage: Page }) {
  
  const projects = [
    {
      id: 1,
      title: 'project_1',
      description:'project_1_description'
    },
    {
      id: 2,
      title: 'project_2',
      description:'project_2_description'
    }
  ]

  const issues = [
    // {
    //   id: 1,
    //   title: 'error_1',
    //   description:'error_1_description'
    // },
    // {
    //   id: 2,
    //   title: 'error_2',
    //   description:'error_2_description'
    // }
  ]

  if (projects.length === 0 && currentPage === 'Projects') {
    return (
      <div>No projects found</div>
    )
  }

  if (issues.length === 0 && currentPage === 'Issues') {
    return (
      <div>No issue found.</div>
    )
  }

  if (currentPage == "Projects") {
    return (
      <div className="main-content-div">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    );
  }

  if (currentPage == "Issues") {
    return (
      <div className="main-content-div">
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
      </div>
    );
  }

  return <div className="main-content-div">Dashboard</div>;
}

export default MainContent;
