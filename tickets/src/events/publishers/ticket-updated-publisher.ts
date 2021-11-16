import { Publisher, Subjects, TicketUpdatedEvent } from '@sdebin/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}