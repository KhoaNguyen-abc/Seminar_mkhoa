import { LightningElement } from 'lwc';

export default class HelloWebComponent extends LightningElement {

    currentDate = new Date().toDateString();
    greeting = null;

    handleGreetingChange(event){
        this.greeting = event.target.value;
    }

    get capitalizedGreeting() {
        return `Hello ${this.greeting.toUpperCase()}!`;
    }

}