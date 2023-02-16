const SwiftpawWebsocket = require('ws');
const SwiftpawServer = new SwiftpawWebsocket('ws://localhost:7102');

const jsonContent = content => JSON.stringify(content);

let SwiftpawNotifications = null;

SwiftpawServer.onmessage = function (events) {
    const payload = JSON.parse(events.data);

    console.log(payload);

    switch(payload.op) {
        case 0: {
            SwiftpawServer.send(jsonContent({
                op: 1,
                d: {
                    token: null,
                    uid: null
                }
            }))

            break;
        };

        case 2: {
            SwiftpawNotifications = payload.d.missed_notifications;

            /** THIS WILL BE ENABLED SOON */
            /**SwiftpawServer.send(jsonContent({
                op: 6,
                cmd: 'CONNECT_GUILD',
                d: {
                    token: '',
                    gid: ''
                }
            }))*/
    
            break;
        };

        default:
        break;
    };
}.bind(this);

SwiftpawServer.onclose = function({ reason }) {
    console.log('[Swiftpaw]: Connection Closed', reason);
}.bind(this);


