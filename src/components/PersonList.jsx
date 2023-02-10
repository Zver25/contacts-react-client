import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Person from "./Person";
import EditPerson from "./EditPerson";
import "./PersonList.css";
import {blockPerson, deletePerson, fetchPeopleList, unblockPerson, updatePerson} from "../store/people/actions";

const PersonList = () => {
    const [isAddedNew, setAddedNew] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [query, setQuery] = useState('');

    const dispatch = useDispatch();
    const count = useSelector(store => store.people.count);
    const list = useSelector(store => store.people.list);
    const username = useSelector(store => store.session.username);
    const blockList = useSelector(store => store.people.blockList);

    useEffect(() => {
        dispatch(fetchPeopleList({
            page,
            perPage,
            query,
        }));
    }, [dispatch, page, perPage, query]);

    const handleEditQuery = (event) => {
        setQuery(event.target.value);
        setPage(1);
    };

    const handleCreatePerson = (person) => {
        setAddedNew(false);
        dispatch(updatePerson(person));
    };

    const handleUpdatePerson = (person) => {
        handleUnblockPerson(person.id);
        dispatch(updatePerson(person));
    };

    const handleShowAddNewPerson = () => {
        setAddedNew(true);
    };

    const handleDeletePerson = (id) => {
        dispatch(deletePerson(id));
    };

    const handleBlockPerson = (id) => {
        dispatch(blockPerson(id));
    };

    const handleUnblockPerson = (id) => {
        dispatch(unblockPerson(id));
    };

    const pageCount = Math.ceil(count / perPage);

    const blockedPersonBy = (personId) => {
        const blocking = blockList.find(b => b.personId === personId);
        return (blocking && blocking.client !== username) ? blocking.client : '';
    };

    const isEdit = (personId) => {
        const blocking = blockList.find(b => b.personId === personId);
        return blocking && blocking.client === username;
    };

    return (
        <Fragment>
            <div className="control-panel">
                <FormControl variant="outlined">
                    <Select value={perPage} onChange={e => setPerPage(e.target.value)}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
                {pageCount > 1 &&
                <Pagination count={pageCount} page={page} onChange={(_, newPage) => setPage(newPage)}/>
                }
                <TextField value={query} onChange={handleEditQuery}/>
            </div>
            <Button variant="contained" color="primary" onClick={handleShowAddNewPerson}>Add new person</Button>
            <div className="content-panel">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell style={{textAlign: 'center'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isAddedNew && <EditPerson onSave={handleCreatePerson} onCancel={() => setAddedNew(false)}/>}
                        {list.map(person => isEdit(person.id)
                            ? <EditPerson
                                key={person.id}
                                {...person}
                                onSave={handleUpdatePerson}
                                onCancel={() => handleUnblockPerson(person.id)}/>
                            : <Person
                                key={person.id}
                                {...person}
                                onDelete={handleDeletePerson}
                                blockedBy={blockedPersonBy(person.id)}
                                onBlock={handleBlockPerson}/>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Fragment>

    );
};

export default PersonList;