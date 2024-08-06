// import React, { createContext, useState, useContext, ReactNode } from "react";
// import { ISubUser } from "../interface/user";

// interface UserContextType {
//   user: ISubUser | null;
//   setUser: React.Dispatch<React.SetStateAction<ISubUser | null>>;
// }

// // Create the UserContext with default values
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Create a custom hook to access the UserContext
// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// // Create a provider component
// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<ISubUser | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
