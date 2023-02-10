import Person from "../../models/Person";

export interface EditPersonRowProps {
  person?: Person;
  onSave: (person: Person) => void;
  onCancel: () => void;
}
