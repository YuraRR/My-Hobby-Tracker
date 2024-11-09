import { ChangeEvent, InputHTMLAttributes } from "react";
import { Input } from "./shadcn/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | false;
  icon?: IconProp;
}

const TextInput = ({ onChange, minLength = 3, error, value, icon, ...props }: InputProps) => {
  return (
    <div className="relative  text-gray-600">
      {icon && (
        <div className="absolute left-2 top-1.5 transform -translate">
          <FontAwesomeIcon icon={icon} />
        </div>
      )}

      <div className={icon ? "*:pl-7" : ""}>
        <Input {...{ onChange, value, ...props }}></Input>
      </div>

      <span className="absolute left-3 -bottom-3 text-red-700 text-xs px-1">{error}</span>
    </div>
  );
};

export default TextInput;
