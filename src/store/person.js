import {ofType} from "redux-observable";
import {map, switchMap} from "rxjs/operators";

import peopleService from "../services/PersonService";

const REQUEST_FAILURE = 'REQUEST_FAILURE';
const FETCH_PEOPLE = 'FETCH_PEOPLE';
const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
const SEND_UPDATE_PERSON = 'SEND_UPDATE_PERSON';
const RECEIVE_UPDATE_PERSON = 'RECEIVE_UPDATE_PERSON';

const requestFailure = (error) => ({type: REQUEST_FAILURE, error});
export const fetchPeopleList = (page, perPage, query) => ({type: FETCH_PEOPLE, page, perPage, query});
const fetchPeopleSuccess = (count, list) => ({type: FETCH_PEOPLE_SUCCESS, count, list});
export const updatePerson = (person) => ({type: SEND_UPDATE_PERSON, person});
const receiveUpdatePerson = (person) => ({type: RECEIVE_UPDATE_PERSON, person});

const initialState = {
    page: 1,
    perPage: 10,
    query: '',
    list: [],
    error: null
};

export const fetchPeopleListEpic = action$ => action$.pipe(
    ofType(FETCH_PEOPLE),
    switchMap(({page, perPage, query}) =>
        peopleService.fetchPeopleList(page, perPage, query).pipe(
            map(({count, list}) => fetchPeopleSuccess(count, list)),
        )
    )
);

export const updatePersonEpic = action$ => action$.pipe(
    ofType(SEND_UPDATE_PERSON),
    switchMap(({person}) =>
        (person.id && person.id > 0)
            ? peopleService.updatePerson(person).pipe(map(receiveUpdatePerson))
            : peopleService.createPerson(person).pipe(map(receiveUpdatePerson))
    )
);

export const updatePersonSender = {
    type: SEND_UPDATE_PERSON,
    destination: '/api/people/change',
    prepare: ({person}) => JSON.stringify(person)
};

export const updatePersonReceiver = {
    destination: '/topic/people',
    parse: response => receiveUpdatePerson(JSON.parse(response.body))
};

export const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_PEOPLE:
            return {
                ...state,
                error: null
            };
        case FETCH_PEOPLE_SUCCESS:
            return {
                ...state,
                count: action.count,
                list: action.list
            };
        case SEND_UPDATE_PERSON:
            return {
                ...state,
                error: null
            };
        case RECEIVE_UPDATE_PERSON:
            return {
                ...state,
                list: state.list.some(person => person.id === action.person.id)
                    ? state.list.map(person => person.id === action.person.id ? action.person : person)
                    : [
                        action.person,
                        ...state.list
                    ]
            };
        default:
            return state;
    }
};