

/* 

channel we are listening to ,  (SUBJECT/CHANNEL)
pass it to stan client , (STAN CLIENT)
to tell the stan server that whenever event come from this channel , then forward it to me. (SUBSCRIPTION)
So a subscription is what is going to actually listen for some information and tell us whenever some information is received.

Q group: while subscribing , you can also make services, part of the q group ( see 2nd argument)
a Q group is created to make sure that multiple instances of the same service are not all going to receive the exact same event.
And this is going to make sure that we don't try to do double, triple or quadruple processing on the same incoming event.

Pass multiple options while subscribing: (3rd argument)
const option = ---.--. do chaining for multiple options

Imp options: 
1. setManualAckMode(true):::: if event is lost inside subscription and you want to reprocess it somehow, so send manual acknowledgement . If no acknowledgement is sent for 30 seconds, then NATS will retransmit the event to other member of q group.


Sometimes, order of evven is listener is changing:
when any client goes offlinbe , NATS thinks fro sometime that the client will connect again soon and waita for the client.
We will tell the NATS that no need to wait for clients once they disconnect.
In nats-depl file, some arguments were passed: 

-hbi:   HBI is how often that server is going to make a heart beat request to each of its clients.
-hbt:   how long each client has to respond,
-hbf:   HBF is the number of times that each client can fail.
stan.close now terminates the connection at once and now events wont be delayed or out of order.
Still if someone forcefully close the any service from task manager , then subscription server wait for 10,20,30 seconds to close the connection and events will be out of order.  

Redelievery of events when services go down:
DURABLE SUBSCRIPTION:
 - it will maintain id number of different instances and srtore all the events than have been processed and that could not be processed and when any instance comes back , it will send all those events to the service that were not processed.

So we just need to remember that for every subscription we create, we are probably always going to use, set, deliver all available that we can get all the events that have been emitted in the past.

We're going to use that terrible name to make sure that we keep track of all the different events that have gone to this subscription or the SKU group, even if it goes offline for a little bit.

And then finally, we're going to use this Q group to make sure that we do not accidentally dump the durable name, even if all of our services restart for a very brief period of time, and to make sure that all these emitted events only go off to one instance of our services, even if we are running multiple instances.
*/


/*
 events are emitted as Messages in Nats Streaming
 Message is an interface , that is going to describe the type of the message
 */
import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener} from './events/ticket-created-listener'

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    // sending signal to server that this client is dead, don't send any message and close this connection.
    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
});

// interrupt and terminal signal
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


