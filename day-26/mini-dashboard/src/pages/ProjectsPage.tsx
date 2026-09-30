import { useState } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { useProjectStore } from "../hooks/useProjectStore";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function ProjectsPage() {
  const { errorMessage, projects } = useProjectStore();
  const [loading, setLoading] = useState(true);
  useDocumentTitle("Projects");

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return (
      <>
        <div className="no-items">
          <div className="no-issues-found">Loading...</div>
        </div>
      </>
    );
  }

  if (projects && projects.length === 0) {
    return <>no projects found</>;
  }

  if (errorMessage) {
    console.log(errorMessage);
    return <>{errorMessage}</>;
  }
  console.log("here");
  return (
    <>
      {projects &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </>
  );
}

export default ProjectsPage;
