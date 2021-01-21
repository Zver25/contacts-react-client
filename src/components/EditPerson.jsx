import React, {useState} from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from "@material-ui/core/IconButton";

const EditPerson = ({id, email, firstName, lastName, onSave, onCancel}) => {

    const [editedEmail, setEditedEmail] = useState(email);
    const [editedFirstName, setEditedFirstName] = useState(firstName);
    const [editedLastName, setEditedLastName] = useState(lastName);

    const handleSave = () => {
        onSave({
            id,
            email: editedEmail,
            firstName: editedFirstName,
            lastName: editedLastName
        });
    };

    return (
        <TableRow>
            <TableCell>{id > 0 ? id : ''}</TableCell>
            <TableCell>
                <TextField size="small" defaultValue={editedFirstName}
                           onChange={e => setEditedFirstName(e.target.value)}/>
            </TableCell>
            <TableCell>
                <TextField size="small" defaultValue={editedLastName}
                           onChange={e => setEditedLastName(e.target.value)}/>
            </TableCell>
            <TableCell>
                <TextField size="small" defaultValue={editedEmail}
                           onChange={e => setEditedEmail(e.target.value)}/>
            </TableCell>
            <TableCell>
                <IconButton size="small" onClick={handleSave}>
                    <CheckIcon/>
                </IconButton>
                <IconButton size="small" onClick={onCancel}>
                    <CloseIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default EditPerson;
