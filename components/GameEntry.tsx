import { ButtonProps, Spinner } from "@chakra-ui/react";
import { DatabaseReference, remove, set } from "firebase/database";
import { GameEntryInput } from "./GameEntryInput";
import { GameEntryName } from "./GameEntryName";

export const GameEntry = ({
  value,
  uid,
  dbRef,
  loading,
  _entryButton,
}: {
  value: { readonly uid: string; readonly name: string } | undefined;
  uid: string;
  dbRef: DatabaseReference;
  loading?: boolean;
  _entryButton?: ButtonProps;
}) => {
  if (loading) return <Spinner />;
  return value ? (
    <GameEntryName
      name={value.name}
      _cancelButton={
        value.uid === uid ? { onClick: () => remove(dbRef) } : undefined
      }
    />
  ) : (
    <GameEntryInput
      onSubmit={(name) => set(dbRef, { uid: uid, name })}
      disabled={!!value}
      _button={_entryButton}
    />
  );
};
