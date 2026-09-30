import { useEffect, useState } from "react";
import { customFetch } from "../utils/api";
import type { Project } from "../utils/types";

export function useProjectStore() {
  const [errorMessage, setErrorMessage] = useState("");
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await customFetch("/project/all", "GET");
      if (result instanceof Error) {
        setErrorMessage((result as Error).message);
      }
      setProjects(result.data);
      console.log(result.data);
    };

    fetchProjects();
  }, []);

  return {
    errorMessage,
    projects,
  };
}
