import './ProjectCard.css'

function ProjectCard() {
  return (
    <div className='project-card-div'>
      <div className="project-header">
        <div className="project-title">title</div>
        <div className="project-badge" style={{
          // eslint-disable-next-line react-hooks/purity
          backgroundColor: Math.random() < 0.5 ? 'red' : 'green'
        }}></div>
      </div>
      <p className="project-description">description</p>
      <div className="project-avatar">
        <img className='project-avatar-image' src="images.jpeg" alt="avatar" />
      </div>
    </div>
  )
}

export default ProjectCard