import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditPerson from "./EditPerson";

const Person = ({id, email, firstName, lastName, onChange, onDelete}) => {
    const [isEdit, setEdit] = useState(false);

    const handleSavePerson = (person) => {
        setEdit(false);
        onChange(person);
    };

    if (isEdit) {
        return <EditPerson
            id={id}
            firstName={firstName}
            lastName={lastName}
            email={email}
            onSave={handleSavePerson}
            onCancel={_ => setEdit(false)} />;
    }

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{lastName}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <IconButton size="small" onClick={_ => setEdit(true)}>
                    <EditIcon/>
                </IconButton>
                <IconButton size="small" onClick={_ => onDelete(id)}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Person;