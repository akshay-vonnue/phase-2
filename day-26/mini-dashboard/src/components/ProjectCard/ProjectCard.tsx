import type { Project } from "../../utils/types";
import "./ProjectCard.css";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card-div" key={project.id}>
      <div className="project-header">
        <div className="project-title">{project.title}</div>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-avatar">
        <img className="project-avatar-image" src="images.jpeg" alt="avatar" />
      </div>
    </div>
  );
}

export default ProjectCard;
