import { useState } from "react";
import type {
  CreateIssueValidationFormat,
  Issue,
  IssuePriority,
} from "../../utils/types";
import "./Modal.css";
import useIssueStore from "../../hooks/useIssueStore";

function Modal({
  setModalOpen,
  type,
  issue,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  issueList: Issue[];
  type: "edit" | "create";
  issue?: Issue;
  setIssueList: React.Dispatch<React.SetStateAction<Issue[]>>;
}) {
  if (type === "edit") console.log("inside modal", issue);
  const [errors, setErrors] = useState({});
  const { createIssue, updateIssue, errorMessage } = useIssueStore();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    title: issue ? issue.title : "",
    description: issue ? issue.description : "",
    priority: issue ? issue.priority : ("MEDIUM" as IssuePriority),
    assignedTo: issue ? issue.resolverId : "",
    resolverAvatar: issue ? issue.resolverName : "",
  });

  const createData = async () => {
    setApiError("");
    const response = await createIssue({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: "OPEN",
      overdue: Number(Date.now()),
      resolverId: formData.assignedTo,
      resolverName: formData.resolverAvatar,
    });
    if (response instanceof Error) {
      setApiError(response.message);
    }
  };

  const updateData = async () => {
    setApiError("");
    if (issue) {
      const response = await updateIssue(issue.id, {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: "OPEN",
        overdue: Number(Date.now()),
        resolverId: formData.assignedTo,
        resolverName: formData.resolverAvatar,
      });
      if (response instanceof Error) {
        setApiError(response.message);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function validate(name: string) {
    console.log("validating");
    const validationErrors = {} as CreateIssueValidationFormat;
    switch (name) {
      case "title":
        if (!formData.title.trim()) {
          validationErrors.title = "title is required";
        }
        break;
      case "description":
        if (!formData.description.trim()) {
          validationErrors.description = "description is required";
        }
        break;
      case "assignedTo":
        if (!formData.assignedTo.trim()) {
          validationErrors.assignedTo = "a user must be assigned";
        }
        break;
      case "resolverAvatar":
        if (!formData.resolverAvatar.trim()) {
          validationErrors.resolverAvatar = "an avatar should be provided";
        }
        break;
    }
    setErrors(validationErrors);
    console.log(errors);
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitBtn = document.querySelector(
      ".submit-button",
    ) as HTMLButtonElement;
    submitBtn.setAttribute("disabled", "true");
    setTimeout(() => {
      console.log("resetting button");
      submitBtn.setAttribute("disabled", "false");
      setModalOpen(false);
    }, 2000);

    const validationErrors = {} as CreateIssueValidationFormat;
    if (!formData.title.trim()) {
      validationErrors.title = "title is required";
    }

    if (!formData.description.trim()) {
      validationErrors.description = "description is required";
    }

    if (!formData.assignedTo.trim()) {
      validationErrors.assignedTo = "a user must be assigned";
    }

    if (!formData.resolverAvatar.trim()) {
      validationErrors.resolverAvatar = "an avatar should be provided";
    }

    setErrors(validationErrors);

    console.log("creating data called");
    setLoading(true);
    setTimeout(() => {
      if (type === "create") {
        createData();
      } else if (type === "edit") {
        updateData();
      }
      setLoading(false);
    }, 1200);
  }

  function resetForm() {
    if (window.confirm("Are you sure you want to clear this issue?")) {
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        assignedTo: "",
        resolverAvatar: "",
      });

      setErrors({});
    }
  }

  return (
    <>
      <div className="main-content-div modal-div">
        <div className="close-button" onClick={() => setModalOpen(false)}>
          X
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="modal-title">Title:</label>
            <div className="error-wrapper">
              <input
                type="text"
                id="modal-title"
                value={formData.title}
                name="title"
                onChange={handleChange}
                onBlur={() => validate("title")}
                aria-invalid={
                  (errors as CreateIssueValidationFormat).title
                    ? "true"
                    : "false"
                }
              />
              {(errors as CreateIssueValidationFormat).title && (
                <span>{(errors as CreateIssueValidationFormat).title}</span>
              )}
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="modal-description">Description:</label>
            <div className="error-wrapper">
              <input
                type="text"
                id="modal-description"
                value={formData.description}
                name="description"
                onChange={handleChange}
                aria-invalid={
                  (errors as CreateIssueValidationFormat).description
                    ? "true"
                    : "false"
                }
              />
              {(errors as CreateIssueValidationFormat).assignedTo && (
                <span>
                  {(errors as CreateIssueValidationFormat).assignedTo}
                </span>
              )}
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              value={formData.priority}
              className="priority"
              onChange={handleChange}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label htmlFor="assignedTo">Assign to</label>
            <div className="error-wrapper">
              <input
                type="text"
                id="assignedTo"
                value={formData.assignedTo}
                name="assignedTo"
                onChange={handleChange}
                aria-invalid={
                  (errors as CreateIssueValidationFormat).assignedTo
                    ? "true"
                    : "false"
                }
              />
              {(errors as CreateIssueValidationFormat).assignedTo && (
                <span>
                  {(errors as CreateIssueValidationFormat).assignedTo}
                </span>
              )}
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="resolver-avatar">Resol. name</label>
            <div className="error-wrapper">
              <input
                type="text"
                id="resolver-avatar"
                value={formData.resolverAvatar}
                name="resolverAvatar"
                onChange={handleChange}
                aria-invalid={
                  (errors as CreateIssueValidationFormat).resolverAvatar
                    ? "true"
                    : "false"
                }
              />
              {(errors as CreateIssueValidationFormat).resolverAvatar && (
                <span>
                  {(errors as CreateIssueValidationFormat).resolverAvatar}
                </span>
              )}
            </div>
          </div>

          <div className="create-issue-buttons">
            <button type="reset" onClick={resetForm} className="cancel-button">
              cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading ? true : false}
            >
              {loading ? "loading..." : "submit"}
            </button>
          </div>
        </form>
        {errorMessage && <div>errorMessage</div>}
        {apiError && <div>apiError</div>}
      </div>
    </>
  );
}

export default Modal;
