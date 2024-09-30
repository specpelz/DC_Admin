import React from "react";
import { Select as AntSelect} from "antd";
import FormItem from "antd/es/form/FormItem";
import "./select.css"

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
  requiredMessage: string;
}

const Select: React.FC<SelectProps> = ({
  options = [{ value: "", label: "" }],
  value = "",
  onChange = (value) => console.log("win", value),
  placeholder = "Select an option",
  styleClass = "",
  name,
  label="",
  required = true,
  requiredMessage = "required",

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
      rules={
        [
          {
            required,
            message: requiredMessage,
          },
        ]
      }
    >
      <AntSelect
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-select w-full h-[48px] ${styleClass}`}
      
      >
        {options?.map((option) => (
          <AntSelect.Option key={option.value} value={option.value}
         
          >
            {option.label}
          </AntSelect.Option>
        ))}
      </AntSelect>
    </FormItem>
  );
};

export default Select;