import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import React from "react";
import { ViewPersonRowProps } from "./types";

const ViewPersonRow: React.FC<ViewPersonRowProps> = ({
  person,
  blockedBy,
  onDelete,
  onBlock,
}: ViewPersonRowProps): JSX.Element => (
  <TableRow className="person-row">
    <TableCell>{ person.id }</TableCell>
    <TableCell>{ person.firstName }</TableCell>
    <TableCell>{ person.lastName }</TableCell>
    <TableCell>{ person.email }</TableCell>
    <TableCell style={ {whiteSpace: "nowrap", display: "flex", justifyContent: "center"} }>
      { blockedBy
        ? (
          <Tooltip title={ `Blocked by ${ blockedBy }` }>
            <LockIcon/>
          </Tooltip>
        )
        : (
          <>
            <IconButton size="small" onClick={ () => person?.id && onBlock(person?.id) }>
              <EditIcon/>
            </IconButton>
            <IconButton size="small" onClick={ () => person?.id && onDelete(person?.id) }>
              <DeleteIcon/>
            </IconButton>
          </>
        )
      }
    </TableCell>
  </TableRow>
);

export default ViewPersonRow;
