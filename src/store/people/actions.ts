import { createAction } from "@reduxjs/toolkit";
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
