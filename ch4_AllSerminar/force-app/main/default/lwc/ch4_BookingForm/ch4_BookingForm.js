import { LightningElement, api } from 'lwc';

export default class Ch4_BookingForm extends LightningElement {

    @api NameBooking;
    @api EmailBooking;
    @api PhoneBooking;
    @api BirthDateBooking;
    @api VoucherBooking;
    @api CheckBooking;

}