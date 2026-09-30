import { useState } from "react";
import type { Issue } from "../../utils/types";
import "./IssueCard.css";
import useIssueStore from "../../hooks/useIssueStore";

const now = Date.now();

function unixToDate(time: number) {
  const date = new Date(time);
  return date.toLocaleDateString("en-US");
}

function IssueCard({
  issue,
  setFormType,
  setModalOpen,
  setCurrentEditableIssue,
  setApiError
}: {
  issue: Issue;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEditableIssue: React.Dispatch<
    React.SetStateAction<Issue | undefined>
  >;
  setApiError: React.Dispatch<React.SetStateAction<string>>
}) {
  const [time] = useState(unixToDate(issue.overdue));
  const { deleteIssue } = useIssueStore();

  const handleDelete = async () => {
    setApiError("")
    const response = await deleteIssue(issue.id);
    if (response instanceof Error) {
      setApiError(response.message);
    }
    setTimeout(() => {
      setApiError("")
    },1200)
  };

  console.log("issues card rendered with",issue.id)

  return (
    <div
      className="issue-card-div"
      style={{
        border: issue.overdue < now ? "1px solid red" : "1px solid black",
      }}
    >
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
      <div className="issue-avatar" style={{ display: "flex" }}>
        <div className="edit-button">
          <img
            src="delete.png"
            alt="edit-icon"
            style={{ width: "20px", height: "20px", marginTop: "5px" }}
            onClick={() => {
              handleDelete();
            }}
          />
        </div>
        <div className="edit-button">
          <img
            src="pencil.png"
            alt="edit-icon"
            style={{ width: "20px", height: "20px", marginTop: "5px" }}
            onClick={() => {
              setFormType("edit");
              setCurrentEditableIssue(issue);
              setModalOpen(true);
            }}
          />
        </div>
        <img
          className="issue-avatar-image"
          src={issue.resolverId}
          alt="avatar"
          onError={(e) => (e.currentTarget.src = "userAvatar.png")}
        />
      </div>
    </div>
  );
}

export default IssueCard;
