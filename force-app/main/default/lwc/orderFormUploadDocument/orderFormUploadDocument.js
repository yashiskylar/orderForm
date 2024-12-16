import { LightningElement, api } from 'lwc';

export default class UploadFiles extends LightningElement {
    @api prescriptionFiles = [];
    @api discountFiles = [];


    handleUploadPrescriptionFiles(event) {
        const uploadedFiles = event.detail.files;

        if (uploadedFiles.length > 0) {
            Array.from(uploadedFiles).forEach(file => {
                this.prescriptionFiles.push(file.name);
            });

            this.prescriptionFiles = [...this.prescriptionFiles];
        }
        console.log('upload', this.prescriptionFiles);
        
    }

    handleUploadDiscountFiles(event) {
        const uploadedFiles = event.detail.files;

        if (uploadedFiles.length > 0) {
            Array.from(uploadedFiles).forEach(file => {
                this.discountFiles.push(file.name);
            });

            this.discountFiles = [...this.discountFiles];
        }
        console.log('upload', this.discountFiles);
        
    }

    handlePrescriptionDeleteFile(event) {
        
        const fileNameToDelete = event.target.dataset.name;
        this.prescriptionFiles = this.prescriptionFiles.filter(
            fileName => fileName !== fileNameToDelete
        );
    }

    handleDiscountDeleteFile(event) {
        const fileNameToDelete = event.target.dataset.name;
        this.discountFiles = this.discountFiles.filter(
            fileName => fileName !== fileNameToDelete
        );
    }
}
