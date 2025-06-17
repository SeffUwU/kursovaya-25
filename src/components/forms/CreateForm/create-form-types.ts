export type ModularFormField = { label: string; name: string } & (
  | {
      type: ModularFormFieldType.Text;
    }
  | {
      type: ModularFormFieldType.Number;
      min?: number;
      max?: number;
    }
  | {
      type: ModularFormFieldType.Dropdown;
      values: DropdownValueType[];
    }
);

export enum ModularFormFieldType {
  Text = 'text',
  Number = 'number',
  Dropdown = 'dropdown',
}

export type DropdownValueType = {
  label: string;
  value: string;
};
