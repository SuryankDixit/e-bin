import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
import {TicketCreatedPublisher} from './events/ticket-created-publisher'
console.clear();


/* 
  2nd argument is client id ,
  One client id can connect to NATS only one time.
  Because Nats maintaoins a list of all the clients based on their id
*/
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  publisher.publish({
    id: '123',
    title: 'concert',
    price: 20
  });

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20,
  // });


  /*
    channel name  (subject is the name of the channel we want to publish information to.)
    data,callback function 
  */
  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });

});
