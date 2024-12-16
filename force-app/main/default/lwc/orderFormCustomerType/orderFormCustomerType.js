import { LightningElement, track, wire, api } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountRecordPicker.searchAccounts';


export default class CustomerPage extends LightningElement {

    @api label = 'Customer Lookup   ';   // Custom label for the component
    @api selectedRecordId = '';     // Stores the selected record's Id
    @api selectedRecordName = '';   // Stores the selected record's Name
    @track searchTerm = '';         // Stores the user's search input
    @track records = [];            // Stores the search results (filtered records)
    @track isDropdownVisible = false; // Controls visibility of the dropdown
    @track isLoading = false;       // Loading indicator while fetching records

    isRegisterCustomer = true;
    @track enableNextButton = false;

    @track newCustomerVariant = 'neutral';
    @track registerCustomerVariant = 'brand';

    @track accountId;

    handleRecordChange(event) {
       this.accountId = event.detail.recordId;
       this.enableNextButton = true;
       const recordIdEvent = new CustomEvent('recordevent', {detail:{'accountId': this.accountId, 'showNextButton' : this.enableNextButton, 'fromCustomerTypeForm': true}});
       this.dispatchEvent(recordIdEvent);
   }   
   
    newHandleClick(){
        this.accountId = null;
        this.enableNextButton = true;
        const recordIdEvent = new CustomEvent('recordevent', {detail:{'accountId': this.accountId,  'showNextButton' : this.enableNextButton, 'fromCustomerTypeForm': true}});
        this.dispatchEvent(recordIdEvent);

        this.isRegisterCustomer = false;
        this.newCustomerVariant = 'brand';
        this.registerCustomerVariant = 'neutral';
    }

    regHandleClick() {
        this.isRegisterCustomer = true;
        this.enableNextButton = false;
        const recordIdEvent = new CustomEvent('recordevent', {detail:{'accountId': this.accountId,  'showNextButton' : this.enableNextButton, 'fromCustomerTypeForm': true}});
        this.dispatchEvent(recordIdEvent);
        this.newCustomerVariant = 'neutral';
        this.registerCustomerVariant = 'brand';
    }

        // Handle search input change
        handleSearchChange(event) {
            this.searchTerm = event.target.value;
    
            if (this.searchTerm.length > 2) {  // Trigger search after 2 characters
                this.searchRecords();
            } else {
                this.records = [];  // Clear results if input is less than 3 characters
            }
        }
    
        // Perform search for records using Apex
        searchRecords() {
            this.isLoading = true;
            console.log('vjhvjhvhjv');
            
            searchAccounts({ searchTerm: `%${this.searchTerm}%` })
                .then(result => {
                    this.records = result;
                    console.log('result', result);
                    
                    this.isLoading = false;
                    this.isDropdownVisible = true;  // Show the dropdown with results
                })
                .catch(error => {
                    this.isLoading = false;
                    console.error(error);
                });
        }
    
        // Handle record selection
        handleRecordSelect(event) {
            const record = event.target.dataset.id;
            const recordName = event.target.dataset.record
            this.searchTerm = recordName;

            console.log('accountid', event.target.dataset.id);
            

            this.accountId = event.target.dataset.id;
            this.enableNextButton = true;
            const recordIdEvent = new CustomEvent('recordevent', {detail:{'accountId': this.accountId, 'showNextButton' : this.enableNextButton, 'fromCustomerTypeForm': true}});
            this.dispatchEvent(recordIdEvent);
        }
    
        // Close the dropdown if clicked outside
        handleClickOutside() {
            this.isDropdownVisible = false;
        }
    
        // Event listener for outside click
        connectedCallback() {
            document.addEventListener('click', this.handleClickOutside.bind(this));
        }
    
        // Remove event listener when component is removed from DOM
        disconnectedCallback() {
            document.removeEventListener('click', this.handleClickOutside.bind(this));
        }
}