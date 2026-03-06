import { createContext } from "react";
import type { UserContextType } from "../../../types/User.ts";

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
