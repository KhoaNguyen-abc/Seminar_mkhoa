import { LightningElement, api, wire } from 'lwc';
import getSeminars from '@salesforce/apex/CH3_SeminarDetailControl.getSeminars';

export default class CH3_SerminarDetail extends LightningElement {

    @api fullText = "Seminar";
    @api isPublic = "True"; 
    @api fields = "Name"; 
    @api sort_t = "ASC";

    @api serminars = [];

    @wire(getSeminars, { fullText: '$fullText', IsTrue: '$isPublic', field: '$fields', sort_t: '$sort_t' })
    wiredSerminars({data}) {
        if(data){
            this.serminars = data;
        }
    }
    

    connectedCallback(){     
        this.serminars;
        console.log(this);
    }

    get checkboxs(){
        return [
            {label: "ASC", value: "ASC"},
            {label: "DESC", value: "DESC"}
        ];
    }

    handleClick(event) {
        this.fullText = (this.template.querySelector('lightning-input[data-id="inputSearch"]').value == "") ? "Seminar" : this.template.querySelector('lightning-input[data-id="inputSearch"]').value;
        this.isPublic = "True";
        this.fields = this.template.querySelector('select[data-id="selectOptions"]').value;
        this.sort_t = (this.template.querySelector('input[type="checkbox"]:checked').value == "") ? "ASC" : this.template.querySelector('input[type="checkbox"]:checked').value ;
    }

    handleChangeCheckBox(event){
        this.fullText = (this.template.querySelector('lightning-input[data-id="inputSearch"]').value == "") ? "Seminar" : this.template.querySelector('lightning-input[data-id="inputSearch"]').value;
        this.isPublic = "True";
        this.fields = this.template.querySelector('select[data-id="selectOptions"]').value;
        this.sort_t = (this.template.querySelector('input[type="checkbox"]:checked').value == "") ? "ASC" : this.template.querySelector('input[type="checkbox"]:checked').value ;
    }

    handleChangeSelect(event){
        this.fullText = (this.template.querySelector('lightning-input[data-id="inputSearch"]').value == "") ? "Seminar" : this.template.querySelector('lightning-input[data-id="inputSearch"]').value;
        this.isPublic = "True";
        this.fields = this.template.querySelector('select[data-id="selectOptions"]').value;
        this.sort_t = (this.template.querySelector('input[type="checkbox"]:checked').value == "") ? "ASC" : this.template.querySelector('input[type="checkbox"]:checked').value ;
    }

}