import { configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  blockingListReceiver,
  blockPersonReceiver,
  blockPersonSender,
  deletePersonReceiver,
  unblockPersonReceiver,
  unblockPersonSender,
  updatePersonReceiver,
} from "./people/actions";
import { deletePersonEpic, fetchPeopleListEpic, updatePersonEpic } from "./people/epics";
import peopleSlice from "./people/slice";
import sessionSlice from "./session/slice";
import webSocketMiddleware from "./webSocketMiddleware";

const epics = combineEpics(
  fetchPeopleListEpic,
  deletePersonEpic,
  updatePersonEpic
);

const handlers = {
  receivers: [
    deletePersonReceiver,
    updatePersonReceiver,
    blockPersonReceiver,
    unblockPersonReceiver,
    blockingListReceiver
  ],
  senders: [
    blockPersonSender,
    unblockPersonSender
  ]
};

const wsUrl = 'ws://localhost:8080/ws';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    people: peopleSlice.reducer,
    session: sessionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(
      epicMiddleware,
      webSocketMiddleware(wsUrl, handlers),
    )
});
epicMiddleware.run(epics);

export type AnyAction = any;

export type RootState = ReturnType<typeof store.getState>;

export default store;
