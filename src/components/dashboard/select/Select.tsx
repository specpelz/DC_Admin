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
  name: string; // Form field name
}

const Select: React.FC<SelectProps> = ({
  options = [{ value: "", label: "" }],
  value = "",
  onChange = (value) => console.log("win", value),
  placeholder = "Select an option",
  styleClass = "",
  name,
}) => {
  return (
    <FormItem
      name={name}
      rules={[{ required: true, message: "This field is required" }]}
    >
      <AntSelect
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-select w-full ${styleClass}`}
      
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