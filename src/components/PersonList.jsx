import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import Person from "./Person";
import {fetchPeopleList, updatePerson} from "../store/person";
import EditPerson from "./EditPerson";

const PersonList = () => {
    const [isAddedNew, setAddedNew] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [query, setQuery] = useState('');

    const dispatch = useDispatch();
    const count = useSelector(store => store.people.count);
    const list = useSelector(store => store.people.list);

    useEffect(() => {
        dispatch(fetchPeopleList(page, perPage, query));
    }, [dispatch, page, perPage, query]);

    const handleSavePerson = (person) => {
        dispatch(updatePerson(person));
    };

    return (
        <div style={{background: "white", width: 800}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isAddedNew && <EditPerson onSave={handleSavePerson} onCancel={() => setAddedNew(false)}/>}
                    {list.map(person => <Person key={person.id} {...person} onChange={handleSavePerson} onDelete={f => f}/>)}
                </TableBody>
            </Table>
        </div>
    );
};

export default PersonList;