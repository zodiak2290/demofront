import { FormField } from './form.-field.interface';

export interface FormRow {
  id: string;
  columnCount: number;
  columns: FormField[][];
}
