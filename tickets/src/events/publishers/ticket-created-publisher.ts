import { Publisher, Subjects, TicketCreatedEvent} from '@sdebin/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}