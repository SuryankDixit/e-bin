import { Publisher, OrderCreatedEvent, Subjects } from '@sdebin/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}