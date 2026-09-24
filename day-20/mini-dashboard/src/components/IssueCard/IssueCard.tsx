import './IssueCard.css'

function IssueCard() {
  return (
    <div className='issue-card-div'>
      <div className="issue-header">
        <div className="issue-title">title</div>
        <div className="issue-badge" style={{
          // eslint-disable-next-line react-hooks/purity
          backgroundColor: Math.random() < 0.5 ? 'red' : 'green'
        }}></div>
      </div>
      <p className="issue-description">description</p>
      <div className="issue-avatar">
        <img className='issue-avatar-image' src="images.jpeg" alt="avatar" />
      </div>
    </div>
  )
}

export default IssueCard