import {applyMiddleware, combineReducers, createStore} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {composeWithDevTools} from "redux-devtools-extension";
import {fetchPeopleListEpic, peopleReducer, updatePersonEpic, updatePersonReceiver, updatePersonSender} from "./person";
import webSocketMiddleware from "./webSocketMiddleware";

const rootReducers = combineReducers({
    people: peopleReducer
});

const rootEpic = combineEpics(
    fetchPeopleListEpic,
    updatePersonEpic
);

const handlers = {
    receivers: [
        updatePersonReceiver
    ],
    senders: [
        // updatePersonSender
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
