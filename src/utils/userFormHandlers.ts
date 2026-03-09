import type { ChangeEvent } from "react";
import type { FormData, SubmitParams, DeleteParams } from "../types/User";
import type { User } from "../types/User";

export const handleFormSubmit = ({
  e,
  mode,
  selectedId,
  onAdd,
  onUpdate,
  onClear,
  onDeselectId,
}: SubmitParams): void => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);

  const userName = (data.get("userName") as string).trim();
  const city = (data.get("city") as string).trim();
  const age = Number(data.get("age"));

  if (!userName || !city || age <= 0) {
    alert("Fill Every Field");
    return;
  }

  if (mode === "save") {
    onAdd({ id: +new Date(), userName, city, age });
  }

  if (mode === "update") {
    if (selectedId == null) return;
    onUpdate(selectedId, { userName, city, age });
    onDeselectId();
  }
  onClear();
};

export const handleFormChange = (
  e: ChangeEvent<HTMLInputElement>,
  onChangeField: (field: keyof FormData, value: string | number) => void
): void => {
  const field = e.target.name as keyof FormData;
  const value: string | number =
    field === "age" ? Number(e.target.value) : e.target.value;
  onChangeField(field, value);
};


export const handleFormDelete = ({
  selectedId,
  onDelete,
  onClear,
  onDeselectId,
}: DeleteParams): void => {
  if (selectedId == null) return;
  onDelete(selectedId);
  onDeselectId();
  onClear();
};


// FOR THE UNIQUE

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

export const shouldResetFilterAfterDelete = (
  users: User[],
  deletedId: number,
  appliedFilter: AppliedFilter,
): { resetValue: boolean } => {
  // remaining users after deletion
  const remaining = users.filter((u) => u.id !== deletedId);

  // if no filter is applied, no need to reset
  if (!appliedFilter.field || !appliedFilter.uniqueVal) {
    return { resetValue: false };
  }

  // check if any remaining user still matches the applied filter
  const stillHasMatch = remaining.some(
    (u) => String(u[appliedFilter.field as keyof User]) === appliedFilter.uniqueVal
  );

  return { resetValue: !stillHasMatch };
};