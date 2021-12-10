import { Subjects, Publisher, PaymentCreatedEvent } from '@sdebin/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}