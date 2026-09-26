import { useState } from "react";
import type {
  ErrorStatusUI,
  Issue,
  IssuePriorityUI,
  Page,
  SortType,
} from "../../utils/types";
import IssueCard from "../IssueCard/IssueCard";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./Maincontent.css";
import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";

const issues: Issue[] = [
  {
    id: "1",
    title: "error_1",
    description: "error_1_description",
    priority: "HIGH",
    status: "OPEN",
    overdue: Date.now() - 86400000,
    resolver: {
      id: "1",
      name: "akshay",
      avatar: "user1.jpeg",
    },
  },
  {
    id: "2",
    title: "error_2",
    description: "error_2_description",
    priority: "LOW",
    status: "CLOSED",
    overdue: Date.now() - 86400000,
    resolver: {
      id: "2",
      name: "anjal",
      avatar: "user2.jpg",
    },
  },
  {
    id: "3",
    title: "error_3",
    description: "error_3_description",
    priority: "MEDIUM",
    overdue: Date.now() + 86400000,
    status: "IN_PROGRESS",
    resolver: {
      id: "3",
      name: "akshay",
      avatar: "user3.jpeg",
    },
  },
];

function currentTime() {
  return Date.now();
}

function MainContent({ currentPage }: { currentPage: Page }) {

  console.log("rendering page with",currentPage)
  const [issueList, setIssueList] = useState(issues);
  const [searchInput, setSearchInput] = useState("");
  const [statusInput, setStatusInput] = useState<ErrorStatusUI>("All");
  const [priorityInput, setPriorityInput] = useState<IssuePriorityUI>("NONE");
  const [sortInput, setSortInput] = useState<SortType>("latest");

  const [modalOpen, setModalOpen] = useState(false);

  if (currentPage === 'Profile') {
    return (<Profile/>)
  }

  console.log(statusInput);

  const handleReset = () => {
    setSearchInput("");
    setStatusInput("All");
    setPriorityInput("NONE");
    setSortInput("latest");
  };

  const filteredIssues = issueList.filter((issue) => {
    if (issue.title.includes(searchInput)) {
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

  const projects = [
    {
      id: 1,
      title: "project_1",
      description: "project_1_description",
    },
    {
      id: 2,
      title: "project_2",
      description: "project_2_description",
    },
  ];

  console.log(projects);

  if (currentPage == "Dashboard") {
    return <div className="main-content-div">Dashboard</div>;
  }

  if (currentPage == "Projects") {
    return (
      <>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </>
    );
  }

  if (modalOpen) {
    return (
      <Modal
        setModalOpen={setModalOpen}
        issueList={issueList}
        setIssueList={setIssueList}
      />
    );
  }

  if (currentPage == "Issues") {
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
            onChange={(e) =>
              setPriorityInput(e.target.value as IssuePriorityUI)
            }
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
          <button onClick={() => setModalOpen(true)}>+</button>
          <button onClick={handleReset}>RESET</button>
        </div>
        {priorityIssues.length !== 0 &&
          priorityIssues.map((issue) => {
            console.log(issue);
            return <IssueCard key={issue.id} issue={issue} />;
          })}
        {priorityIssues.length === 0 && (
          <div className="no-items">
            <div className="no-issues-found">No issue found.</div>
          </div>
        )}
      </>
    );
  }

  return <div className="main-content-div">Dashboard</div>;
}

export default MainContent;
