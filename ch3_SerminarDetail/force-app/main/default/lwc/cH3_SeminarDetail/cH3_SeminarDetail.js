import { LightningElement, api, wire } from 'lwc';
import getSeminars from '@salesforce/apex/Ch3_SerminarDetailController.getSeminars';
import getList from '@salesforce/apex/Ch3_SerminarDetailController.getList';
export default class CH3_SerminarDetail extends LightningElement {

    @api
    serminars;

    @api fullText = "Seminar";
    @api isPublic = "True"; 
    @api fields = "Name"; 
    @api sort_t = "ASC";

    selectedSort = "ASC";
    // search = this.template.querySelector('lightning-input[name="inputSearch"]').value;

    @wire(getSeminars, { fullText: '$fullText', IsTrue: '$isPublic', field: '$fields', sort_t: '$sort_t' })
    wiredSerminars({data}){
        if(data){
            this.serminars = data;
        }
    }

    connectedCallback() {
        // initialize component
        // if(this.search == ""){
        //     this.template.querySelector('lightning-input[name="inputSearch"]').value = "Seminar";
        // }
        console.log(this);
        this.serminars;
    }

    handleClick(event) {
        this.fullText = this.template.querySelector('lightning-input[name="inputSearch"]').value;
        this.isPublic = "True";
        this.fields = this.template.querySelector('select[name="selectFields"]').value;
        this.sort_t = this.selectedSort;
    }
    
    get options() {
        return [
            { label: 'sortASC', value: 'ASC' },
            { label: 'sortDESC', value: 'DESC' },
        ];
    }

    changeCheckBox(e){
        this.selectedSort = JSON.parse(JSON.stringify(this.options.find(option => option.value === e.target.value)));
        this.fullText = this.template.querySelector('lightning-input[name="inputSearch"]').value;
        this.isPublic = "True";
        this.fields = this.template.querySelector('select[name="selectFields"]').value;
        this.sort_t = this.selectedSort.value;
    }

    handleChangeSelect(event){
        this.fulltext = this.template.querySelector('lightning-input[name="inputSearch"]').value;
        this.isPublic = "True";
        this.fields = event.target.value;
        this.sort_t = selectedSort;
    }
}