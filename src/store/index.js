import {applyMiddleware, combineReducers, createStore} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    blockingListReceiver,
    blockPersonReceiver,
    blockPersonSender,
    deletePersonEpic,
    deletePersonReceiver,
    fetchPeopleListEpic,
    peopleReducer,
    unblockPersonReceiver,
    unblockPersonSender,
    updatePersonEpic,
    updatePersonReceiver
} from "./person";
import webSocketMiddleware from "./webSocketMiddleware";
import {sessionReducer} from "./session";

const rootReducers = combineReducers({
    people: peopleReducer,
    session: sessionReducer
});

const rootEpic = combineEpics(
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

function configureStore(reducer, epic) {
    const epicMiddleware = createEpicMiddleware();
    const store = createStore(
        reducer,
        composeWithDevTools(applyMiddleware(
            epicMiddleware,
            webSocketMiddleware('ws://localhost:8080/ws', handlers))
        )
    );
    epicMiddleware.run(epic);
    return store;
}

export default configureStore(rootReducers, rootEpic);
