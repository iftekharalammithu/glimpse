import { ChangeEvent, useEffect, useState } from "react";
import { useQueryData } from "./usequeryData";
import { searchUser } from "@/Actions/User";

export const useSearch = (key: string, type: "USER") => {
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
      if (type === "USER") {
        console.log(queryKey);
        const user = await searchUser(queryKey[1] as string);
        if (user.status === 200) {
          setOnUsers(user.data);
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
