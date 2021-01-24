import React, {Fragment, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from "@material-ui/core/Tooltip";

import EditPerson from "./EditPerson";

const Person = ({id, email, firstName, lastName, blockedBy, onChange, onDelete, onBlock, onUnblock}) => {
    const [isEdit, setEdit] = useState(false);

    const handleSavePerson = (person) => {
        handleEndEdit();
        onChange(person);
    };

    const handleStartEdit = () => {
        setEdit(true);
        onBlock(id);
    };

    const handleEndEdit = () => {
        setEdit(false);
        onUnblock(id);
    };

    if (isEdit) {
        return <EditPerson
            id={id}
            firstName={firstName}
            lastName={lastName}
            email={email}
            onSave={handleSavePerson}
            onCancel={handleEndEdit}/>;
    }

    return (
        <TableRow className="person-row">
            <TableCell>{id}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{lastName}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell style={{whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center'}}>
                {blockedBy
                    ?<Tooltip title={`Blocked by ${blockedBy}`}>
                        <LockIcon/>
                    </Tooltip>
                    : <Fragment>
                        <IconButton size="small" onClick={handleStartEdit}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton size="small" onClick={_ => onDelete(id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Fragment>
                }
            </TableCell>
        </TableRow>
    );
};

export default Person;