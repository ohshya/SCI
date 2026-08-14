import { IoEye, IoEyeOff } from "solid-icons/io";
import { createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  loading?: boolean;
}

export const PasswordInput = (allProps: Props) => {
  const [visible, setVisible] = createSignal(false);
  const [props, inputProps] = splitProps(allProps, [
    "label",
    "error",
    "loading",
  ]);
  return (
    <fieldset class="fieldset w-full">
      <legend class="fieldset-legend">{props?.label}</legend>
      <div class="join w-full">
        <label
          class="input join-item grow flex items-center"
          classList={{ "input-error": !!props.error }}
        >
          <input
            type={visible() ? "text" : "password"}
            class="grow"
            {...inputProps}
            disabled={props.loading}
          />
        </label>
        <button
          type="button"
          onclick={() => setVisible((e) => !e)}
          class="btn join-item text-base-content"
          disabled={props.loading}
        >
          {visible() ? <IoEyeOff /> : <IoEye />}
        </button>
      </div>
      {props.error && (
        <p class="label text-error text-xs mt-1">{props.error}</p>
      )}
    </fieldset>
  );
};
