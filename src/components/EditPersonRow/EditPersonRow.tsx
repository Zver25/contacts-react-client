import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import React, { ChangeEvent, useState } from "react";
import { EditPersonRowProps } from "./types";

const EditPersonRow: React.FC<EditPersonRowProps> = ({
  person,
  onSave,
  onCancel,
}: EditPersonRowProps): JSX.Element => {
  const [editedEmail, setEditedEmail] = useState(person?.email ?? '');
  const [editedFirstName, setEditedFirstName] = useState(person?.firstName ?? '');
  const [editedLastName, setEditedLastName] = useState(person?.lastName ?? '');

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditedFirstName(event.target.value);
  };
  const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditedLastName(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditedEmail(event.target.value);
  };

  const handleSave = (): void => {
    onSave({
      ...person,
      email: editedEmail,
      firstName: editedFirstName,
      lastName: editedLastName,
    });
  };

  return (
    <TableRow>
      <TableCell>{ person?.id ? person.id : "" }</TableCell>
      <TableCell>
        <TextField
          size="small"
          defaultValue={ editedFirstName }
          onChange={ handleFirstNameChange }
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          defaultValue={ editedLastName }
          onChange={ handleLastnameChange }
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          defaultValue={ editedEmail }
          onChange={ handleEmailChange }
        />
      </TableCell>
      <TableCell>
        <IconButton size="small" onClick={ handleSave }>
          <CheckIcon/>
        </IconButton>
        <IconButton size="small" onClick={ onCancel }>
          <CloseIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditPersonRow;
