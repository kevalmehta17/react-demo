import type { User } from "../types/User";

export const getFilterUnique = (
  users: User[],
  selectField: string | null
): (string | number)[] => {
  if (!selectField) return [];
  const field = selectField as keyof User;

  if (selectField === "age") {
    const values = users.map((user) => user[field] as number);
    return [...new Set(values)];
  } else {
    const values = users.map((user) => String(user[field]).toLowerCase());
    return [...new Set(values)];
  }
};

export const getFilteredUsers = (
  users: User[],
  appliedFilter: { field: string | null; uniqueVal: string | number }
): User[] => {
  if (!appliedFilter.field || appliedFilter.uniqueVal === "") return users;

  return users.filter(
    (user) =>
      String(user[appliedFilter.field as keyof User]).toLowerCase() ===
      String(appliedFilter.uniqueVal).toLowerCase()
  );
};

export const getFieldOptions = (): { label: string; value: string }[] => {
  const fields: (keyof Omit<User, "id">)[] = ["userName", "city", "age"];
  return fields.map((f) => ({ label: f, value: f }));
};

export const getValueOptions = (
  users: User[],
  selectField: string | null
): { label: string; value: string | number }[] => {
  const uniqueValues = getFilterUnique(users, selectField);
  return uniqueValues.map((v) => ({ label: String(v), value: v }));
};

export const parseFilterValue = (
  val: string,
  selectField: string | null
): string | number | null => {
  if (!val) return null;
  if (selectField === "age") return Number(val);
  return val;
};