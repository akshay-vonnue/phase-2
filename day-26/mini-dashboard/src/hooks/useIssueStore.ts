import { useState } from "react";
import { customFetch } from "../utils/api";
import type { Issue } from "../utils/types";

type ResponseBody = {
  success: boolean;
  data?: Issue[];
  message?: "";
};

export default function useIssueStore() {
  const [errorMessage, setErrorMessage] = useState("");
  console.log(errorMessage);

  async function fetchIssues() {
    setErrorMessage("");
    const result: ResponseBody = await customFetch("/issue/all", "GET");
    if (result instanceof Error) {
      setErrorMessage(result.message);
      return result;
    }
    console.log(result);

    return result.data as Issue[];
  }

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
    const result: ResponseBody = await customFetch(
      "/issue/create",
      "POST",
      body,
    );
    console.log(result);
    if (!result.success) {
      setErrorMessage(result.message as string);
    }
    if (result instanceof Error) {
      setErrorMessage(result.message);
      return result;
    }
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
    setErrorMessage("");
    const result: ResponseBody = await customFetch(
      `/issue/update/${id}`,
      "PUT",
      body,
    );
    if (!result.success) {
      setErrorMessage(result.message as string);
    }

    if (result instanceof Error) {
      setErrorMessage(result.message);
      return result;
    }
  }

  async function deleteIssue(id: string) {
    setErrorMessage("");
    const result: ResponseBody = await customFetch(
      `/issue/delete/${id}`,
      `DELETE`,
    );
    if (!result.success) {
      setErrorMessage(result.message as string);
    }

    if (result instanceof Error) {
      setErrorMessage(result.message);
      return result;
    }
  }

  return {
    errorMessage,
    fetchIssues,
    createIssue,
    updateIssue,
    deleteIssue,
  };
}
