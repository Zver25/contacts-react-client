import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";

import parseResponse from "./parseResponse";

function PersonService() {

    const url = 'http://localhost:3000/api/people';

    this.fetchPeopleList = (page, perPage, query) =>
        ajax({
            method: 'GET',
            url: `${url}?page=${page}&perPage=${perPage}&query=${query}`
        }).pipe(
            map(parseResponse)
        );

    this.deletePerson = (id) =>
        ajax({
            method: 'DELETE',
            url: `${url}/${id}`
        }).pipe(
            map(parseResponse)
        );

    this.updatePerson = (person) =>
        ajax({
            method: 'PUT',
            url: `${url}/${person.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        }).pipe(
            map(parseResponse)
        );

    this.createPerson = (person) =>
        ajax({
            method: 'POST',
            url: `${url}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        }).pipe(
            map(parseResponse)
        );
}

export default new PersonService();