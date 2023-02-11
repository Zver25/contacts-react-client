import { Client } from "@stomp/stompjs";
import { setUsername } from "./session/actions";

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

const webSocketMiddleware = (url: string, handlers: any) => (store: any) => {

  const handleConnect = (frame: any) => {
    store.dispatch(setUsername(frame.headers['user-name']))

    handlers.receivers.forEach((receiver: any): void => {
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
    // debug: console.log,
    onConnect: handleConnect
  });
  stompClient.activate();

  return (next: any) => (action: any) => {
    const sender = handlers.senders.find((sender: any) => sender.type === action.type);

    if (sender) {
      stompClient.publish({
        destination: sender.destination,
        body: sender.prepare(action)
      });
    }
    return next(action);
  }
};

export default webSocketMiddleware;
