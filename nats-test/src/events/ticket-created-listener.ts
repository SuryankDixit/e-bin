import { Message} from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject:Subjects.TicketCreated = Subjects.TicketCreated; // type annotation is required because it is afraid that we might change it to something else in future
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);
        console.log(data.id,data.price,data.title);
        msg.ack();
    }
}