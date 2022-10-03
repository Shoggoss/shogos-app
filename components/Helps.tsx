import { Divider, Image, StackProps, VStack } from "@chakra-ui/react";

export const Helps = (props: StackProps) => {
  return (
    <VStack {...props}>
      <Image alt="説明" src="/helps/1.jpg" />
      <Divider />
      <Image alt="説明" src="/helps/2.jpg" />
      <Divider />
      <Image alt="説明" src="/helps/3.jpg" />
      <Divider />
      <Image alt="説明" src="/helps/4.jpg" />
      <Divider />
      <Image alt="説明" src="/helps/5.jpg" />
      <Divider />
      <Image alt="説明" src="/helps/6.jpg" />
    </VStack>
  );
};
