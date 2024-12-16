import { LightningElement,track } from 'lwc';

export default class OrderFormSummary extends LightningElement {
    
    @track customer = {
        CompanyName: 'XYZ Company Name',
        PO: '1234',
        FirstName: 'Customer',
        LastName: 'Name',
        Email: 'customer@email.com',
        Phone: '(XXX) XXX-XXXXX',
        Fax: '(YYY) YYY-YYYY',
        ShippingAddress: {
            Street: '123 Main Street, Suite 456',
            City: 'Xyztown',
            State: 'AB',
            ZipCode: '12345'
        },
        BillingAddress: {
            Street: '123 Main Street, Suite 456',
            City: 'Xyztown',
            State: 'AB',
            ZipCode: '12345'
        }
    };

    @track productData = [
        { index: '1', description: 'Abc Product', quantity: 1, unitPrice: 200, price: 200 },
        { index: '2', description: 'IJK Product', quantity: 2, unitPrice: 300, price: 600 },
        { index: '3', description: 'Xyz Product', quantity: 4, unitPrice: 250, price: 1000 }
    ];

    @track data = {
        subtotal: 1800.00,
        selectedShippingPrice: 12.00,
        estimatedTax: 30.00,
        discountAmount: 20.00,
        handlingFee: 0.00,
        totalPrice: 1822.00
    };
}
