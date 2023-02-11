import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Pagination from "@material-ui/lab/Pagination";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlockedInfo from "../../models/BlockedInfo";
import Person from "../../models/Person";
import { blockPerson, deletePerson, fetchPeopleList, unblockPerson, updatePerson } from "../../store/people/actions";
import { peopleBlockListSelector, peopleCountSelector, peopleListSelector } from "../../store/people/selectors";
import { userNameSelector } from "../../store/session/selectors";
import EditPersonRow from "../EditPersonRow";
import ViewPersonRow from "../ViewPersonRow";
import "./PersonList.css";

const PersonList: React.FC = (): JSX.Element => {
  const [isAddingNew, setAddingNew] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const count = useSelector(peopleCountSelector);
  const list = useSelector(peopleListSelector);
  const username = useSelector(userNameSelector);
  const blockList = useSelector(peopleBlockListSelector);

  const pageCount = Math.ceil(count / perPage);

  useEffect(() => {
    dispatch(fetchPeopleList({
      page,
      perPage,
      query,
    }));
  }, [dispatch, page, perPage, query]);

  const handlePerPageChange = (event: ChangeEvent<{value: unknown}>): void => {
    setPerPage(event.target.value as number);
  };

  const handlePageSelect = (_: ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  }

  const handleEditQuery = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    setPage(1);
  };

  const handleCreatePerson = (person: Person): void => {
    setAddingNew(false);
    dispatch(updatePerson(person));
  };

  const handleUpdatePerson = (person: Person): void => {
    if (person?.id) {
      handleUnblockPerson(person.id);
      dispatch(updatePerson(person));
    }
  };

  const handleShowAddNewPerson = (): void => {
    setAddingNew(true);
  };

  const handleDeletePerson = (id: number): void => {
    dispatch(deletePerson(id));
  };

  const handleBlockPerson = (id: number): void => {
    dispatch(blockPerson(id));
  };

  const handleUnblockPerson = (id: number | undefined): void => {
    if (id) {
      dispatch(unblockPerson(id));
    }
  };

  const blockedPersonBy = (personId: number | undefined): string => {
    const blocking = blockList.find((bi: BlockedInfo) => (
      bi.personId === personId
    ));

    return blocking && blocking.client !== username
      ? blocking.client
      : "";
  };

  const isEdit = (personId: number | undefined): boolean => {
    const blocking = blockList.find((bi: BlockedInfo) => (
      bi.personId === personId
    ));

    return !!blocking && blocking.client === username;
  };

  return (
    <>
      <div className="control-panel">
        <FormControl variant="outlined">
          <Select value={ perPage } onChange={handlePerPageChange}>
            <MenuItem value={ 10 }>10</MenuItem>
            <MenuItem value={ 25 }>25</MenuItem>
            <MenuItem value={ 50 }>50</MenuItem>
          </Select>
        </FormControl>
        { pageCount > 1 && (
          <Pagination
            count={ pageCount }
            page={ page }
            onChange={handlePageSelect}
          />
        ) }
        <TextField value={ query } onChange={ handleEditQuery }/>
      </div>
      <Button variant="contained" color="primary" onClick={ handleShowAddNewPerson }>Add new person</Button>
      <div className="content-panel">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell style={ {textAlign: "center"} }>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { isAddingNew && (
              <EditPersonRow
                onSave={ handleCreatePerson }
                onCancel={ () => setAddingNew(false) }
              />
            ) }
            { list.map(person => isEdit(person?.id)
              ? (
                <EditPersonRow
                  key={ person.id }
                  person={person}
                  onSave={ handleUpdatePerson }
                  onCancel={ () => handleUnblockPerson(person.id) }
                />
              )
              : (
                <ViewPersonRow
                  key={ person.id }
                  person={person}
                  onDelete={ handleDeletePerson }
                  blockedBy={ blockedPersonBy(person.id) }
                  onBlock={ handleBlockPerson }
                />
              )
            ) }
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default PersonList;