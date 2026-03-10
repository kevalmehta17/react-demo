import type { FormEvent } from 'react';
import type { FormData } from '../types/User';
import Input from './Input';
import Button from './Button';
import { handleFormChange } from "../utils/userFormHandlers"

interface UserFormProps {
  title: string;
  formValue: FormData;
  mode: 'save' | 'update';
  selectedId: number | null;
  onChangeField: (field: keyof FormData, value: string | number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onDelete: (id: number) => void;
}

const UserForm = ({
  title,
  formValue,
  mode,
  selectedId,
  onChangeField,
  onSubmit,
  onDelete,
}: UserFormProps) => {
  return (
    <div>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <Input
            label="Name:"
            type="text"
            name="userName"
            value={formValue.userName ?? ''}
            onChange={(e) => handleFormChange(e, onChangeField)}
          />
          <Input
            label="City:"
            type="text"
            name="city"
            value={formValue.city ?? ''}
            onChange={(e) => handleFormChange(e, onChangeField)}
          />
          <Input
            label="Age:"
            type="number"
            name="age"
            value={formValue.age ?? 0}
            onChange={(e) => handleFormChange(e, onChangeField)}
          />
          <br />
          {mode === 'save' && <Button type="submit" label="Save" />}
          {mode === 'update' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button type="submit" label="Update" />
              <Button
                type="button"
                label="Delete"
                onClick={() => {
                  if (selectedId !== null) onDelete(selectedId);
                }}
              />
            </div>
          )}
        </form>
        <hr />
      </div>
    </div>
  );
};

export default UserForm;