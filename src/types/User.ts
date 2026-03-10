export interface User {
  id: number;
  userName: string;
  city: string;
  age: number;
}

export type FormData = Omit<User, "id">;

export interface AppliedFilter {
  field: string | null;
  uniqueVal: string | number;
}