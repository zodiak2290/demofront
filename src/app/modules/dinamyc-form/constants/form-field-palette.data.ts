import { FormFieldType } from '../enums/form-field-type';
import { FormField } from '../interfaces/form.-field.interface';

export const DEFAULT_FORM_FIELDS: FormField[] = [
  { type: FormFieldType.Text, label: 'form.text' },
  { type: FormFieldType.Textarea, label: 'form.textarea' },
  { type: FormFieldType.Select, label: 'form.select', options: ['Opción 1', 'Opción 2'] },
  { type: FormFieldType.Button, label: 'form.button' },
  { type: FormFieldType.Checkbox, label: 'form.checkbox' },
  { type: FormFieldType.Radio, label: 'form.radio', options: ['Opción A', 'Opción B'] },
  { type: FormFieldType.Date, label: 'form.date' },
  { type: FormFieldType.Email, label: 'form.email' },
  { type: FormFieldType.Number, label: 'form.number' },
  { type: FormFieldType.Tel, label: 'form.tel' },
  { type: FormFieldType.Url, label: 'form.url' },
  { type: FormFieldType.Submit, label: 'form.submit' },
];
