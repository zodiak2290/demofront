import { FormFieldType } from '../enums/form-field-type';

export interface FormField {
  id?: string;
  type: FormFieldType;
  label: string;
  clases?: string[];
  placeholder?: string;
  options?: string[];
}
