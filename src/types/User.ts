export interface User {
    id: number;
    userName : string;
    city : string;
    age : number
}

export interface FormData{
    userName : string;
    city : string;
    age : number
}


export interface UserStringOnly {
    userName : string;
    city : string;
}

export interface AppliedFilter {
  field: keyof FormData | null;
  uniqueVal: string;
}


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
