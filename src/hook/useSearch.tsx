import { ChangeEvent, useEffect, useState } from "react";
import { useQueryData } from "./usequeryData";
import { searchWorkspace } from "@/Actions/User";

export const useSearch = (key: string, type: "WORKSPACE") => {
  const [query, setQuery] = useState("");

  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => clearTimeout(delayInputTimeout);
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "WORKSPACE") {
        const workspace = await searchWorkspace(queryKey[1] as string);
        if (workspace.status === 200) {
          setOnUsers(workspace.data);
        }
      }
    },
    false
  );

  useEffect(() => {
    if (debounce) {
      refetch();
    }
    if (!debounce) {
      setOnUsers(undefined);
    }
  }, [debounce]);
  return { onSearchQuery, query, isFetching, onUsers };
};
