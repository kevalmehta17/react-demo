import type { ChangeEvent, FormEvent } from "react";
import type { FormData, User } from "../types/User";

interface SubmitParams {
  e: FormEvent<HTMLFormElement>;
  mode: "save" | "update";
  selectedId: number | null;
  onAdd: (user: User) => void;
  onUpdate: (id: number, formData: FormData) => void;
  onClear: () => void;
  onDeselectId: () => void;
}

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
    onAdd({ id: Date.now(), userName, city, age });
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

interface DeleteParams {
  selectedId: number | null;
  onDelete: (id: number) => void;
  onClear: () => void;
  onDeselectId: () => void;
}

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