import { FormFieldType } from '../enums/form-field-type';

export interface FormField {
  id?: string;
  type: FormFieldType;
  label: string;
  clases?: string[];
  placeholder?: string;
  options?: string[];
  required?: boolean;
  disabled?: boolean;
  value?: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  rows?: number;
  cols?: number;
  name?: string;
  multiple?: boolean;
  accept?: string;
  checked?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  tabindex?: number;
  minLength?: number;
  maxLength?: number;
  size?: number;
}
