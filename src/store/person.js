import {ofType} from "redux-observable";
import {concatMap, map, switchMap} from "rxjs/operators";

import peopleService from "../services/PersonService";

const REQUEST_FAILURE = 'REQUEST_FAILURE';
const FETCH_PEOPLE = 'FETCH_PEOPLE';
const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
const DELETE_PERSON = 'DELETE_PERSON';
const DELETE_PERSON_SUCCESS = 'DELETE_PERSON_SUCCESS';
const SEND_UPDATE_PERSON = 'SEND_UPDATE_PERSON';
const RECEIVE_UPDATE_PERSON = 'RECEIVE_UPDATE_PERSON';
const BLOCK_PERSON = 'BLOCK_PERSON';
const BLOCKED_PERSON = 'BLOCKED_PERSON';
const UNBLOCK_PERSON = 'UNBLOCK_PERSON';
const UNBLOCKED_PERSON = 'UNBLOCKED_PERSON';
const RECEIVE_BLOCKING_LIST = 'RECEIVE_BLOCKING_LIST';

const requestFailure = (error) => ({type: REQUEST_FAILURE, error});
export const fetchPeopleList = (page, perPage, query) => ({type: FETCH_PEOPLE, page, perPage, query});
const fetchPeopleSuccess = (count, list) => ({type: FETCH_PEOPLE_SUCCESS, count, list});
export const deletePerson = (id) => ({type: DELETE_PERSON, id});
const deletePersonSuccess = (id) => ({type: DELETE_PERSON_SUCCESS, id});
export const updatePerson = (person) => ({type: SEND_UPDATE_PERSON, person});
const receiveUpdatePerson = (person) => ({type: RECEIVE_UPDATE_PERSON, person});
export const blockPerson = (personId) => ({type: BLOCK_PERSON, personId});
const blockedPerson = (personId, client) => ({type: BLOCKED_PERSON, personId, client});
export const unblockPerson = (personId) => ({type: UNBLOCK_PERSON, personId});
const unblockedPerson = (personId) => ({type: UNBLOCKED_PERSON, personId})
const receiveBlockingList = (list) => ({type: RECEIVE_BLOCKING_LIST, list});

const initialState = {
    page: 1,
    perPage: 10,
    username: '',
    query: '',
    list: [],
    blockList: [],
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

export const deletePersonEpic = action$ => action$.pipe(
    ofType(DELETE_PERSON),
    concatMap(({id}) =>
        peopleService.deletePerson(id).pipe(
            map(() => deletePersonSuccess(id))
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

export const updatePersonReceiver = {
    destination: '/user/topic/people',
    parse: response => receiveUpdatePerson(JSON.parse(response.body))
};

export const deletePersonReceiver = {
    destination: '/user/topic/people/delete',
    parse: response => deletePersonSuccess(parseInt(response.body))
}

export const blockPersonSender = {
    type: BLOCK_PERSON,
    destination: '/api/people/block',
    prepare: ({personId}) => personId
};

export const blockPersonReceiver = {
    destination: '/user/topic/people/block',
    parse: response => {
        const body = JSON.parse(response.body);
        return blockedPerson(body.personId, body.client);
    }
};

export const unblockPersonSender = {
    type: UNBLOCK_PERSON,
    destination: '/api/people/unblock',
    prepare: ({personId}) => personId
};

export const unblockPersonReceiver = {
    destination: '/user/topic/people/unblock',
    parse: response => {
        const personId = parseInt(response.body);
        return unblockedPerson(personId);
    }
};

export const blockingListReceiver = {
    destination: '/topic/people/blockingList',
    parse: response => {
        const body = JSON.parse(response.body);
        return receiveBlockingList(body);
    }
}

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
        case DELETE_PERSON_SUCCESS:
            return {
                ...state,
                list: state.list.filter(person => person.id !== action.id)
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
        case BLOCKED_PERSON:
            return {
                ...state,
                blockList: [
                    {
                        personId: action.personId,
                        client: action.client
                    },
                    ...state.blockList
                ]
            };
        case UNBLOCKED_PERSON:
            return {
                ...state,
                blockList: [
                    ...state.blockList.filter(blocking => blocking.personId !== action.personId)
                ]
            };
        case RECEIVE_BLOCKING_LIST:
            return {
                ...state,
                blockList: action.list
            };
        default:
            return state;
    }
};