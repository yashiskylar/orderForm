import { LightningElement, track } from 'lwc';

export default class OrderFormPriceDetails extends LightningElement {

    @track initial_quantity = 0;
    @track productData = [ {index : '1', product_value : 'Test Product'}];

     @track data = {
        productCount: 0,
        subtotal: 0,
        totalWeight: 0,
        shippingMethods: [
            { method: 'RG - Ground', description: 'RG - Ground has a 5-7 business day ETA.', price: 15.88 },
            { method: 'Express', description: 'Express shipping delivers within 2-3 business days.', price: 30.00 },
            { method: 'Overnight', description: 'Overnight shipping guarantees delivery by the next business day.', price: 50.00 }
        ],
        selectedShippingMethod: 'RG - Ground',
        shippingDescription: 'RG - Ground has a 5-7 business day ETA.',
        selectedShippingPrice: 0,
        salesTaxRate: 0.0,
        estimatedTax: 0.0,
        discountOptions: [
            { label: '25%', value: 25 },
            { label: '50%', value: 50 },
            { label: '75%', value: 75 }
        ],
        selectedDiscountPercentage: 0,
        discountAmount: 0.0,
        handlingFee: 0.0,
        totalPrice: 0.0
    };

    connectedCallback() {
        this.calculateTotalPrice();
    }

    get shippingOptions() {
        return this.data.shippingMethods.map((method) => ({
            label: method.method,
            value: method.method
        }));
    }

    get discountOptions() {
        return this.data.discountOptions.map((discount) => ({
            label: `${discount}%`,
            value: discount
        }));
    }

    handleShippingChange(event) {
        const selectedMethod = event.detail.value;
        const shippingMethod = this.data.shippingMethods.find((method) => method.method === selectedMethod);
        this.data.selectedShippingMethod = shippingMethod.method;
        this.data.shippingDescription = shippingMethod.description;
        this.data.selectedShippingPrice = shippingMethod.price;
        this.calculateTotalPrice();
    }

    handleTaxChange(event) {
        this.data.salesTaxRate = parseFloat(event.target.value);
        this.data.estimatedTax = (this.data.subtotal * this.data.salesTaxRate) / 100;
        this.calculateTotalPrice();
    }

    handleDiscountChange(event) {
        this.data.selectedDiscountPercentage = parseFloat(event.detail.value);
        this.data.discountAmount = (this.data.subtotal * this.data.selectedDiscountPercentage) / 100;
        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        this.data.totalPrice =
            this.data.subtotal +
            this.data.selectedShippingPrice +
            this.data.estimatedTax -
            this.data.discountAmount +
            this.data.handlingFee;
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    get options() {
        return [
            { label: 'Test Product 1', value: 'product1' },
            { label: 'Test Product 2', value: 'product2' },
            { label: 'Test Product 3', value: 'product3' },
        ];
    }

    get productQuantity() {
        return [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
        ];
    }

    addProduct() {        
       
        let length = this.productData.length + 1;
        let newRecord = { index: length.toString(), product_value: ''};

        this.productData = [...this.productData, newRecord];
        
    }

    handleCross(event) {
        const indexValue = event.target.dataset.index;
               
        this.productData = this.productData
    .filter(item => item.index !== indexValue) 
    .map((item, index) => ({ ...item, index: (index + 1).toString() }));


    }
}