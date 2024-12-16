import { LightningElement, api } from 'lwc';

export default class Footer extends LightningElement {
    @api isbuttondisabled;
    @api isnextbuttondisabled;
    @api step;
    @api first;
    
    handlePrevious() {        
        const event = new CustomEvent('previous', {detail:{'message':'Previous'}});
        this.dispatchEvent(event);
    }

    handleNext() {        
        const event = new CustomEvent('next', {detail:{'message':'Next'}});
        this.dispatchEvent(event);
    }
}