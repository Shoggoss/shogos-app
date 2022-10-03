import {
  Button,
  ButtonProps,
  forwardRef,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";

export const GameEntryInput = forwardRef<
  {
    disabled?: boolean;
    onSubmit?: (name: string | undefined) => unknown;
    _button?: ButtonProps;
  } & React.ComponentProps<"form">,
  "form"
>(({ onSubmit, disabled, _button, ...rest }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmitInner = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (onSubmit) onSubmit(inputRef.current?.value);
    },
    [onSubmit],
  );
  return (
    <form {...rest} ref={ref} onSubmit={onSubmitInner}>
      <HStack>
        <Input
          ref={inputRef}
          placeholder="エントリーして下さい"
          disabled={disabled}
          required
        />
        <Button type="submit" disabled={disabled} {..._button}>
          Entry
        </Button>
      </HStack>
    </form>
  );
});
