import React from "react";
import { Select as AntSelect } from "antd";
import FormItem from "antd/es/form/FormItem";
import "./select.css";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options?: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  styleClass?: string;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  requiredMessage?: string;
  showSearch?: boolean;
  defaultValue?: string;

}

const Select: React.FC<SelectProps> = ({
  options = [{ value: "", label: "" }],
  value = "",
  onChange = (value) => console.log("value", value),
  placeholder = "Select an option",
  styleClass = "",
  name,
  label = "",
  required = true,
  requiredMessage = "",
  disabled,
  showSearch = false,
  defaultValue = "",

}) => {


  return (
    <FormItem
      layout="vertical"
      label={
        <span className="text-[16px] font-[400] text-BrandBlack1 ">
          {label}
        </span>
      }
      name={name}
      rules={[{ required, message: requiredMessage }]}
      // initialValue={value}
    >
      <AntSelect
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-select w-full h-[48px] ${styleClass}`}
        disabled={disabled}
        showSearch={showSearch}
        filterOption={(input, option) => {
        
          const label = String(option?.value).toLowerCase();
          const inputLower = input.toLowerCase();

          return label.includes(inputLower);
        }}
        optionFilterProp="children" 
      >
        {options.map((option) => (
          <AntSelect.Option key={option.value} value={option.value}>
            {option.label}
          </AntSelect.Option>
        ))}
      </AntSelect>
    </FormItem>
  );
};

export default Select;
