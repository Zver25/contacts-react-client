import {Client} from "@stomp/stompjs";

/**
 * handlers: Array<Header>
 *
 *     Handler: {
 *         receivers: Array<Receiver>,
 *         senders: Array<Sender>
 *     }
 *
 *     Receiver: {
 *         destination: string,
 *         parse: (payload: string): Action
 *         subscribe: Subscription
 *     }
 *
 *     Sender: {
 *         type: string,
 *         destination: string,
 *         prepare: (action: Action): string
 *     }
 *
 */

const webSocketMiddleware = (url, handlers) => (store) => {

    // Поднятие коннекта
    const onConnect = () => {
        // Подписываемся на получение сообщений от сервера
        handlers.receivers.forEach(receiver => {
            receiver.subscribe = stompClient.subscribe(
                receiver.destination,
                message => store.dispatch(receiver.parse(message))
            );
        });
    };

    const stompClient = new Client({
        webSocketFactory: () => new WebSocket(url),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: console.log,
        onConnect
    });

    stompClient.activate();

    return (next) => (action) => {
        // Отправка событий на сервер
        const sender = handlers.senders.find(sender => sender.type === action.type);
        if (sender) {
            stompClient.send(sender.destination, {}, sender.prepare(action))
        }
        return next(action); // Не влияем на остальные события
    }
};

export default webSocketMiddleware;
