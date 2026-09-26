import { useParams } from "react-router";

function isValidId(number: string) {
  return Number.isInteger(Number(number));
}

function IssuePage() {
  const params = useParams();
  if (!isValidId(params.id as string)) {
    return <div>Invalid ID</div>;
  }
  return <div>Issue id: {params.id}</div>;
}

export default IssuePage;
