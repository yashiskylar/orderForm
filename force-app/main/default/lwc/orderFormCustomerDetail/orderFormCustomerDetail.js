import { LightningElement,track,api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'SAP_Account__c.Name',
];


export default class CustomerForm extends LightningElement {

    @track customer = {
        CompanyName: '',
        PO: '',
        CustomerTradeClass: '',
        Salutation: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Fax: '',
        WithoutRx: false,
        SameAddress:false,
        ShippingAddress: {
            Street: '',
             City: '',
             State: '',
             ZipCode: ''
        },
        BillingAddress: {
            Street: '',
            City: '',
            State: '',
            ZipCode: ''
        }
    }
    @track lastNameError = false;
    @track emailError = false;

    @api currentrecord;
    @track isReadOnly = false;


    customerTradeClassOptions = [
        { label: 'Individual', value: 'Individual' },
        { label: 'Business', value: 'Business' }
    ];

    salutationOptions = [
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Ms.', value: 'Ms.' },
        { label: 'Dr.', value: 'Dr.' }
    ];
 
 
   @wire(getRecord, { recordId: '$currentrecord', fields: FIELDS })
   wiredAccount ({ error, data }) {
    if (data) {
        this.customer.CompanyName = data.fields.Name.value;
        // this.customer.CustomerTradeClass = data.fields.CustomerTradeClass.value;
        // this.customer.PO = data.fields.PO.value;
        // this.customer.WithoutRx = data.fields.WithoutRx.value;
        // this.customer.Salutation = data.fields.Salutation.value;
        // this.customer.FirstName = data.fields.FirstName.value;
        // this.customer.LastName = data.fields.LastName.value;
        // this.customer.Email = data.fields.Email.value;
        // this.customer.Phone = data.fields.Phone.value;
        // this.customer.Fax = data.fields.Fax.value;
        // this.customer.SameAddress = data.fields.SameAddress.value;
        this.isReadOnly = true;
        this.error = undefined;
    } else if (error) {
        this.error = error;
        this.customer = null;
    }
    }

    handleInputChange(event) {
        const field = event.target.dataset.id.replace(' ', '');
        
        if (event.target.classList.contains('shippingAddress')){
            this.customer.ShippingAddress[field] = event.target.value;
        }
        else if (event.target.classList.contains('billingAddress')) {
            this.customer.BillingAddress[field] = event.target.value;
        }
        else{
            this.customer[field] = event.target.value;
        }

        if (field === 'SameAddress'){
            this.customer.BillingAddress = { ...this.customer.ShippingAddress };
        }

        this.validateForm(event);

    }

    validateForm(event) {
        let isValid = true;

        if (!event.target.reportValidity()) {
            isValid = false;
        }
        
        const inputs = this.template.querySelectorAll('[data-group="formInput"]');

        inputs.forEach((input) => {
            if (!input.checkValidity()) {
                this.isValid = false; // If any field is invalid, set isValid to false
            }
        });


        // Emit validation result to parent
        this.dispatchEvent(
            new CustomEvent('formvalidation', {
                detail: { isValid }
            })
        );
    }

    handleCheckboxChange(event) {
        const field = event.target.dataset.id.replace(' ', '');
        this.customer[field] = event.target.checked;
    }

    handleAdressCheckboxChange(event) {
        this.customer.SameAddress = event.target.checked;
        if (this.customer.SameAddress){
            this.customer.BillingAddress = { ...this.customer.ShippingAddress };
        }
    }

}