import type { ChangeEvent, FormEvent } from "react";

export interface User {
  id: number;
  userName: string;
  city: string;
  age: number;
}

export interface FormData {
  userName: string;
  city: string;
  age: number;
}

export interface AppliedFilter {
  field: keyof FormData | null;
  uniqueVal: string;
}
// Context API State Type
export interface InitialStateType {
  users: User[];
  formValue: {
    userName: string;
    city: string;
    age: number;
  };
  selectedId: number | null;
  mode: "save" | "update";
  appliedFilter: {
    field: string | null;
    uniqueVal: string | number;
  };
  selectField: string | null;
  selectValue: string | number | null;
}

export type UserContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<UserAction>;
};

export type UserAction =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; id: number; payload: Partial<FormData> }
  | { type: "DELETE_USER"; payload: number }
  | { type: "CHANGE_FORM_VALUE"; field: keyof FormData; value: string | number }
  | { type: "SELECT_ID"; payload: number }
  | { type: "SHOW_INPUT_DATA"; payload: number }
  | { type: "CLEAR_INPUT_DATA" }
  | { type: "CHANGE_FIELD"; payload: keyof FormData | null }
  | { type: "CHANGE_VALUE"; payload: string | number | null }
  | { type: "HANDLE_FILTER_BUTTON" }
  | { type: "HANDLE_ALL_BUTTON" }
  | { type: "SELECT_ID_NULL" }; 

// interface InputProps {
//   label: string;
//   type: string;
//   name: string;
//   value: string | number;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   required?: boolean;
// }

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}


export interface FilterState {
  selectField: string | null;
  selectValue: string | number | null;
  appliedFilter: {
    field: string;
    uniqueVal: string | number;
  };
}

// ...existing code...

export type UserState = {
  users: User[];
  formValue: FormData;
  selectedId: number | null;
  mode: "save" | "update";

  appliedFilter: {
    field: keyof FormData | null;
    uniqueVal: string;
  };
  selectValue: string | null;
  selectField: keyof FormData | null;
};


export interface UserFormProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  appliedFilter: AppliedFilter;
  setAppliedFilter: React.Dispatch<React.SetStateAction<AppliedFilter>>;
  setSelectValue: React.Dispatch<React.SetStateAction<string | number>>;
}

export interface UserSelectIdProps {
  users: User[];
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export type ReduxState = {
  users: {
    users: User[];
    formValue: FormData;
    selectedId: number | null;
    mode: "save" | "update";
  };
  filter: {
    selectField: string | null;
    selectValue: string | number | null;
    appliedFilter: {
      field: "userName" | "city" | "age" | null;
      uniqueVal: string | number | null;
    };
  };
};


export interface SelectDropdownProps {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string | number }[];
  defaultOption?: string;
}

export interface SubmitParams {
  e: FormEvent<HTMLFormElement>;
  mode: "save" | "update";
  selectedId: number | null;
  onAdd: (user: User) => void;
  onUpdate: (id: number, formData: FormData) => void;
  onClear: () => void;
  onDeselectId: () => void;
}

export interface DeleteParams {
  selectedId: number | null;
  onDelete: (id: number) => void;
  onClear: () => void;
  onDeselectId: () => void;
}
