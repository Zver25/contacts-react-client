import { createAction, PayloadAction } from "@reduxjs/toolkit";
import BlockedInfo from "../../models/BlockedInfo";
import Person from "../../models/Person";
import { FetchPeopleListEvent, FetchPeopleListSuccessEvent, stateName } from "./types";

export const requestFailure = createAction<any>(`${stateName}/requestFailure`);
export const fetchPeopleList = createAction<FetchPeopleListEvent>(`${stateName}/fetchPeopleList`);
export const fetchPeopleSuccess = createAction<FetchPeopleListSuccessEvent>(`${stateName}/fetchPeopleSuccess`);
export const deletePerson = createAction<number>(`${stateName}/deletePerson`);
export const deletePersonSuccess = createAction<number>(`${stateName}/deletePersonSuccess`);
export const updatePerson = createAction<Person>(`${stateName}/updatePerson`);
export const receiveUpdatePerson = createAction<Person>(`${stateName}/receiveUPdatePerson`);
export const blockPerson = createAction<number>(`${stateName}/blockPerson`);
export const blockedPerson = createAction<BlockedInfo>(`${stateName}/blockedPerson`);
export const unblockPerson = createAction<number>(`${stateName}/unblockPerson`);
export const unblockedPerson = createAction<number>(`${stateName}/unblockedPerson`);
export const receiveBlockedList = createAction<Array<BlockedInfo>>(`${stateName}/receiveBlockedList`);

export const updatePersonReceiver = {
  destination: '/user/topic/people',
  parse: (response: any) => receiveUpdatePerson(JSON.parse(response.body))
};

export const deletePersonReceiver = {
  destination: '/user/topic/people/delete',
  parse: (response: any) => deletePersonSuccess(parseInt(response.body))
}

export const blockPersonSender = {
  type: blockPerson.type,
  destination: '/api/people/block',
  prepare: ({payload}: PayloadAction<number>) => payload,
};

export const blockPersonReceiver = {
  destination: '/user/topic/people/block',
  parse: (response: any) => {
    const body = JSON.parse(response.body);
    return blockedPerson({ personId: body.personId, client: body.client});
  }
};

export const unblockPersonSender = {
  type: unblockPerson.type,
  destination: '/api/people/unblock',
  prepare: ({payload}: PayloadAction<number>) => payload
};

export const unblockPersonReceiver = {
  destination: '/user/topic/people/unblock',
  parse: (response: any) => {
    const personId = parseInt(response.body);

    return unblockedPerson(personId);
  }
};

export const blockingListReceiver = {
  destination: '/topic/people/blockingList',
  parse: (response: any) => {
    const body = JSON.parse(response.body);

    return receiveBlockedList(body);
  }
}
