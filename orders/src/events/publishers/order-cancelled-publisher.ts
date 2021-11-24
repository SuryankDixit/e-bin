import { Subjects, Publisher, OrderCancelledEvent } from '@sdebin/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}