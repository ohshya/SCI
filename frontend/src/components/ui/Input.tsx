import type { JSX } from "solid-js/jsx-runtime";
import { splitProps, mergeProps } from "solid-js";

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  label?: string;
  error?: string;
  icon?: any;
  required?: boolean;
}

export const Input = (allProps: Props) => {
  const merged = mergeProps({ value: "" }, allProps);
  const [props, inputProps] = splitProps(merged, [
    "label",
    "error",
    "icon",
    "loading",
    "required",
  ]);
  return (
    <fieldset class="fieldset w-full">
      <legend class="fieldset-legend">
        {props?.label}
        {props.required && <span class="font-bold text-error">*</span>}
      </legend>
      <label
        class="input w-full flex items-center gap-2"
        classList={{ "input-error": !!props.error }}
      >
        {props.icon && <span>{props.icon}</span>}
        <input
          type="text"
          class="grow"
          {...inputProps}
          value={inputProps.value ?? ""}
          disabled={props.loading}
        />
      </label>
      {props.error && (
        <p class="label text-error text-xs mt-1">{props.error}</p>
      )}
    </fieldset>
  );
};