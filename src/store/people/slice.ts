import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import BlockedInfo from "../../models/BlockedInfo";
import Person from "../../models/Person";
import {
  blockedPerson,
  deletePersonSuccess,
  fetchPeopleSuccess,
  receiveBlockedList,
  receiveUpdatePerson,
  unblockedPerson,
} from "./actions";
import { FetchPeopleListSuccessEvent, PeopleState, stateName } from "./types";

const initialState: PeopleState = {
  page: 1,
  perPage: 10,
  count: 0,
  query: '',
  list: [],
  blockList: [],
  error: null
};

const peopleSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PeopleState>): void => {
    builder.addCase(
      fetchPeopleSuccess,
      (state: PeopleState, action: PayloadAction<FetchPeopleListSuccessEvent>): PeopleState => ({
        ...state,
        list: action.payload.list,
        count: action.payload.count,
      }),
    );
    builder.addCase(
      deletePersonSuccess,
      (state: PeopleState, action: PayloadAction<number>): PeopleState => ({
        ...state,
        list: state.list.filter((item: Person) => item.id !== action.payload),
        count: state.count - 1,
      }),
    );
    builder.addCase(
      receiveUpdatePerson,
      (state: PeopleState, action: PayloadAction<Person>): PeopleState => ({
        ...state,
        list: state.list.map((item: Person) => (
          item.id === action.payload.id
            ? action.payload
            : item
        )),
      }),
    );
    builder.addCase(
      blockedPerson,
      (state: PeopleState, action: PayloadAction<BlockedInfo>): PeopleState => ({
        ...state,
        blockList: [
          ...state.blockList,
          action.payload,
        ],
      }),
    );
    builder.addCase(
      unblockedPerson,
      (state: PeopleState, action: PayloadAction<number>): PeopleState => ({
        ...state,
        blockList: state.blockList.filter((item: BlockedInfo): boolean => item.personId !== action.payload),
      }),
    );
    builder.addCase(
      receiveBlockedList,
      (state: PeopleState, action: PayloadAction<Array<BlockedInfo>>): PeopleState => ({
        ...state,
        blockList: action.payload,
      }),
    );
  },
});

export default peopleSlice;
