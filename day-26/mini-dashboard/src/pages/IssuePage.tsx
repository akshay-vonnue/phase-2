import { useParams } from "react-router";
import { useIssue } from "../hooks/useIssue";

function IssuePage() {
  const params = useParams();
  console.log(params.id, "from issue page");
  const { loading, error, issue } = useIssue(params.id as string);

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <>{error}</>;
  }

  if (issue) {
    return (
      <>
        <div className="issue">
          <h4>{issue.title}</h4>
          <p>{issue.description}</p>
          <p>{issue.status}</p>
          <p>{issue.priority}</p>
          <p>{issue.resolverId}</p>
          <p>{issue.resolverName}</p>
        </div>
      </>
    );
  }

  return <>Issue not Found or could not be loaded</>;
}

export default IssuePage;
