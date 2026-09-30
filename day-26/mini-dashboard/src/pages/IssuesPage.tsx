import { useState } from "react";
import type {
  ErrorStatusUI,
  Issue,
  IssueFormType,
  IssuePriorityUI,
  SortType,
} from "../utils/types";
import IssueCard from "../components/IssueCard/IssueCard";
import Modal from "../components/Modal/Modal";
import useDebounce from "../hooks/useDebounce";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useIssues } from "../hooks/useIssues";

function currentTime() {
  return Date.now();
}

function IssuesPage() {
  useDocumentTitle("Issues");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 700);
  const [statusInput, setStatusInput] = useState<ErrorStatusUI>("All");
  const [priorityInput, setPriorityInput] = useState<IssuePriorityUI>("NONE");
  const [sortInput, setSortInput] = useState<SortType>("latest");
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState("create");
  const [currentEditableIssue, setCurrentEditableIssue] = useState<Issue>();

  const [apiError, setApiError] = useState("");

  const [issueList, setIssueList] = useState<Issue[]>([]);

  const { issues, errorMessage, loading } = useIssues();
  console.log(issues);

  async function handleRetry() {}

  if (errorMessage) {
    return (
      <>
        <p>{errorMessage}</p>
        <button onClick={handleRetry}>Retry</button>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className="no-items">
          <div className="no-issues-found">Loading...</div>
        </div>
      </>
    );
  }

  if (modalOpen) {
    return (
      <Modal
        setModalOpen={setModalOpen}
        issueList={issueList}
        type={formType as IssueFormType}
        issue={currentEditableIssue}
        setIssueList={setIssueList}
      />
    );
  }

  const handleReset = () => {
    setSearchInput("");
    setStatusInput("All");
    setPriorityInput("NONE");
    setSortInput("latest");
  };

  console.log(issues)
  const filteredIssues = (issues as Issue[]).filter((issue) => {
    if (issue.title.includes(debouncedSearchInput)) {
      return issue;
    }
  });

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortInput === "latest") {
      return b.overdue - a.overdue;
    }
    if (sortInput === "oldest") {
      return a.overdue - b.overdue;
    }
    if (sortInput === "overdue") {
      const isAOverdue = a.overdue < currentTime();
      const isBOverdue = b.overdue < currentTime();
      return isAOverdue === isBOverdue ? 0 : isAOverdue ? -1 : 1;
    }
    return 0;
  });

  const statusIssues =
    statusInput === "All"
      ? sortedIssues
      : sortedIssues.filter((issue) => issue.status === statusInput);

  const priorityIssues =
    priorityInput === "NONE"
      ? statusIssues
      : statusIssues.filter((issues) => issues.priority === priorityInput);

  return (
    <>
      <div className="error-controllers-section">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          name="status"
          id=""
          onChange={(e) => setStatusInput(e.target.value as ErrorStatusUI)}
          value={statusInput}
        >
          <option value="All">ALL</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
          <option value="CLOSED">CLOSED</option>
        </select>
        <select
          name="priority"
          id=""
          onChange={(e) => setPriorityInput(e.target.value as IssuePriorityUI)}
          value={priorityInput}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <select
          name="sort"
          id=""
          onChange={(e) => setSortInput(e.target.value as SortType)}
          value={sortInput}
        >
          <option value="latest">latest</option>
          <option value="oldest">oldest</option>
          <option value="overdue">overdue</option>
        </select>
        <button
          onClick={() => {
            setFormType("create");
            setModalOpen(true);
          }}
        >
          +
        </button>
        <button onClick={handleReset}>RESET</button>
      </div>
      {priorityIssues.length !== 0 &&
        priorityIssues.map((issue) => {
          console.log(issue);
          return (
            <IssueCard
              key={issue.id}
              issue={issue}
              setFormType={setFormType}
              setModalOpen={setModalOpen}
              setCurrentEditableIssue={setCurrentEditableIssue}
              setApiError={setApiError}
            />
          );
        })}
      {issueList.length === 0 &&
        priorityIssues.length === 0 &&
        !apiError && (
          <div className="no-items">
            <div className="no-issues-found">No issue found.</div>
          </div>
        )}
      {apiError.length !== 0 && (
        <div className="no-items">
          <div className="no-issues-found">{apiError}</div>
        </div>
      )}
    </>
  );
}

export default IssuesPage;
