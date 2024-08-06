import { useEffect, useState } from "react";
import { ISubUser } from "../interface/user";

type UserStorage = string | null;

const useUser = () => {
  const [user, setUser] = useState<ISubUser | null>(null);

  useEffect(() => {
    const userStorage: UserStorage = localStorage.getItem("user");
    if (userStorage) {
      try {
        const parsedUser: ISubUser = JSON.parse(userStorage);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return { user };
};

export default useUser;
