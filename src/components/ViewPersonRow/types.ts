import Person from "../../models/Person";

export interface ViewPersonRowProps {
  person: Person;
  blockedBy: string;
  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
}
