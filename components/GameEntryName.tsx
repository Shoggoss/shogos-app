import {
  ButtonProps,
  forwardRef,
  HStack,
  Icon,
  IconButton,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";

export const GameEntryName = forwardRef<
  {
    name: string;
    _cancelButton?: ButtonProps;
  } & StackProps,
  "div"
>(({ name, _cancelButton, ...rest }, ref) => {
  return (
    <HStack ref={ref} {...rest}>
      <Text>{name}</Text>
      {_cancelButton ? (
        <IconButton
          aria-label="cancel"
          icon={<Icon as={IoClose} />}
          {..._cancelButton}
        />
      ) : null}
    </HStack>
  );
});
