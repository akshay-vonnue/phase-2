import { useEffect, useState } from "react";
import { customFetch } from "../utils/api";
import type { Issue } from "../utils/types";

export function useIssue(id: string) {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(issue, setIssue);

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      try {
        const response = await customFetch(`/issue/${id}`, `GET`);
        console.log(response);
        if (response.success) {
          console.log("response is ok");
          setIssue(response.data);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  return { loading, issue, error };
}
