import { useState } from "react";
import type { Issue } from "../../utils/types";
import "./IssueCard.css";

const now = Date.now();

function unixToDate(time:number) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US')
}

function IssueCard({ issue }: { issue: Issue }) {

  const [time] = useState(unixToDate(issue.overdue));
  return (
    <div className="issue-card-div" style={{
      border: issue.overdue < now ? 
        '1px solid red' : '1px solid black'
    }}>
      <div className="issue-header">
        <div className="issue-title">{issue.title}</div>
        <div
          className="issue-badge"
          style={{
            backgroundColor:
              issue.priority === "HIGH"
                ? "red"
                : issue.priority === "MEDIUM"
                  ? "orange"
                  : "green",
          }}
        ></div>
      </div>
      <div>{time}</div>
      <p className="issue-description">{issue.description}</p>
      <div className="issue-avatar">
        <img className="issue-avatar-image" src={issue.resolver.avatar} alt="avatar" onError={(e) => e.currentTarget.src = 'userAvatar.png'}/>
      </div>
    </div>
  );
}

export default IssueCard;
