import { useEffect, useState } from "react";
import type { Issue } from "../utils/types";
import { customFetch } from "../utils/api";

type ResponseBody = {
  success: boolean;
  data?: Issue[];
  message?: "";
};

export function useIssues() {
  console.log('hi there')
  const [success, setSuccess] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>();
  const [errorMessage, setErrorMessage] = useState("");

  console.log("running use useIssues");

  useEffect(() => {
    console.log("running use Effect");
    const fetchIssues = async () => {
      console.log("calling fetch issues");
      const response = await customFetch("/issue/all", "GET");
      console.log(response.data);
      if (!response.success) {
        setErrorMessage(response.message);
      }
      if (response instanceof Error) {
        setErrorMessage(response.message);
      }
      setIssues(response.data);
      setLoading(false)
    };

    fetchIssues();
  },[]);

  async function createIssue(body: {
    title: string;
    description: string;
    status: string;
    priority: string;
    overdue: number;
    resolverId: string;
    resolverName: string;
  }) {
    setErrorMessage("");
    const response: ResponseBody = await customFetch(
      "/issue/create",
      "POST",
      body,
    );
    if (!response.success) {
      setErrorMessage(response.message as string);
    }
    setLoading(false);
    if (response instanceof Error) {
      setSuccess(false);
      setErrorMessage(response.message);
    }
    setSuccess(true);
    setErrorMessage("");
    setIssues(response.data);
  }

  async function updateIssue(
    id: string,
    body: Partial<{
      title: string;
      description: string;
      status: string;
      priority: string;
      overdue: number;
      resolverId: string;
      resolverName: string;
    }>,
  ) {
    setLoading(true);
    setErrorMessage("");
    const response: ResponseBody = await customFetch(
      `/issue/update/${id}`,
      "PUT",
      body,
    );
    setLoading(false);
    if (!response.success) {
      setSuccess(false);
      setErrorMessage(response.message as string);
    }

    if (response instanceof Error) {
      setSuccess(false);
      setErrorMessage(response.message);
    }

    setSuccess(true);
    setIssues(response.data);
    setErrorMessage("");
  }

  async function deleteIssue(id: string) {
    setErrorMessage("");
    setLoading(true);
    const response: ResponseBody = await customFetch(
      `/issue/delete/${id}`,
      `DELETE`,
    );
    setLoading(false);
    if (!response.success) {
      setSuccess(false);
      setErrorMessage(response.message as string);
    }

    if (response instanceof Error) {
      setSuccess(false);
      setErrorMessage(response.message);
    }

    setIssues(response.data);
    setErrorMessage("");
  }

  return {
    createIssue,
    updateIssue,
    deleteIssue,
    success,
    loading,
    issues,
    errorMessage,
  };
}
