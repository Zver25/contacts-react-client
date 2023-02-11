import { PayloadAction } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { Observable } from "rxjs";
import { concatMap, filter, map, switchMap } from "rxjs/operators";
import { AnyAction } from "..";
import Person from "../../models/Person";
import peopleService, { FetchPeopleListResponse } from "../../services/PersonService";
import {
  deletePerson,
  deletePersonSuccess,
  fetchPeopleList,
  fetchPeopleSuccess,
  receiveUpdatePerson,
  updatePerson,
} from "./actions";
import { FetchPeopleListEvent } from "./types";

export const fetchPeopleListEpic: Epic<
  AnyAction,
  AnyAction,
  void
> = (action$: Observable<AnyAction>): Observable<AnyAction> => action$.pipe(
  filter(fetchPeopleList.match),
  switchMap(({payload: {page, perPage, query}}: PayloadAction<FetchPeopleListEvent>) => (
    peopleService.fetchPeopleList(page, perPage, query).pipe(
      map(({count, list}: FetchPeopleListResponse) => fetchPeopleSuccess({count, list})),
    )
  )),
);

export const deletePersonEpic: Epic<
  AnyAction,
  AnyAction,
  void
> = (action$: Observable<AnyAction>): Observable<AnyAction> => action$.pipe(
  filter(deletePerson.match),
  concatMap(({payload: id}: PayloadAction<number>) => (
    peopleService.deletePerson(id).pipe(
      map(() => deletePersonSuccess(id)),
    )
  )),
);

export const updatePersonEpic: Epic<
  AnyAction,
  AnyAction,
  void
> = (action$: Observable<AnyAction>): Observable<AnyAction> => action$.pipe(
  filter(updatePerson.match),
  switchMap(({payload: person}: PayloadAction<Person>) => (
    person.id && person.id > 0
      ? peopleService.updatePerson(person).pipe(map(receiveUpdatePerson))
      : peopleService.createPerson(person).pipe(map(receiveUpdatePerson))
  )),
);
