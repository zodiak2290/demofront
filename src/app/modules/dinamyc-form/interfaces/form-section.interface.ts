import { FormRow } from './form-row.interface';

export interface FormSection {
  id: string;
  title: string;
  rows: FormRow[];
}
