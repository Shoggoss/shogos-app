import { Input, InputProps, useToast } from "@chakra-ui/react";
import { useCallback, useRef } from "react";

export const UrlCopyInput = (props: InputProps) => {
  const toast = useToast();
  const ref = useRef<HTMLInputElement>(null);
  const onClick = useCallback(() => {
    ref.current?.select();
    document.execCommand("copy");
    toast({ title: "コピーされました" });
  }, [toast]);

  return (
    <Input
      ref={ref}
      readOnly
      value={window.location.href}
      onClick={onClick}
      {...props}
    />
  );
};
