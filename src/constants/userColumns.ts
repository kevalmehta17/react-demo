import type { User } from "../types/User";

interface Column<T> {
  label: string;
  key: keyof T;
  render?: (item: T) => React.ReactNode;
}

export const userColumns: Column<User>[] = [
  { label: "Name", key: "userName", },
  { label: "City", key: "city" },
  { label: "Age", key: "age" },
];