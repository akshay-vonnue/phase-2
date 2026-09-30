export type Page = "Dashboard" | "Projects" | "Issues" | "Profile";

export type IssuePriority = "LOW" | "MEDIUM" | "HIGH";

export type ErrorStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: ErrorStatus;
  priority: IssuePriority;
  overdue: number;
  resolverId: string;
  resolverName: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
};

export type ErrorStatusUI = ErrorStatus | "All";
export type IssuePriorityUI = IssuePriority | "NONE";

export type SortType = "latest" | "oldest" | "overdue" | "none   ";

export type CreateIssueValidationFormat = {
  title: string;
  description: string;
  assignedTo: string;
  resolverAvatar: string;
};

export type IssueFormType = "create" | "edit";
