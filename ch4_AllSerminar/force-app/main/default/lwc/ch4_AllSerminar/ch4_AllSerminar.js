import { LightningElement, api, wire } from 'lwc';
import getAllSeminars from '@salesforce/apex/ch4_AllSerminarController.getAllSeminars';
import getDetailSeminar from '@salesforce/apex/ch4_AllSerminarController.getDetailSeminar';
import RegisterBookingForm from '@salesforce/apex/ch4_AllSerminarController.RegisterBookingForm';
export default class Ch4_AllSerminar extends LightningElement {

    @api fullText = 'Seminar';
    @api Sort_t = 'ASC';
    @api Select_t = 'Name';
    @api show = 'shown';
    @api FromDate = '2023-06-01';
    @api FromPrice = '1000';
    @api currentPage = '0';
    @api isPublic = 'True';


    value = 10;
    @api
    get pageSize(){
        return [
            {value: 10},
            {value: 50},
            {value: 100},
        ];
    }

    AllSeminars;
    DetailSeminar;

    First = 0;
    Previous = 0;
    Next = 0;
    Last = 0;
    
    pageSizeSelected = 10;
    // @api Sections = [];

    @api
    get options(){
        return [
            {label: 'ASC', value: 'ASC'},
            {label: 'DESC', value: 'DESC'},
        ];
    }

    @api
    get totalPages(){
        var recordItems = 10;
        this.First = 0;
        this.Previous = Math.round(recordItems - (this.pageSizeSelected/recordItems));
        this.Next = Math.round(recordItems + (this.pageSizeSelected/recordItems));
        this.Last = Math.round(recordItems *(this.pageSizeSelected/recordItems) - recordItems);
        return Math.round(this.pageSizeSelected/recordItems);
    }


    @wire(getAllSeminars, {fullText: '$fullText', cShow: '$show', isTrue: '$isPublic', FromDate: '$FromDate', FromPrice: '$FromPrice', select_t: '$Select_t', sort_t: '$Sort_t', currentPage: '$currentPage', pageSize: '$pageSizeSelected' })
    wiredAllSeminars({data}){
        if(data){
            this.AllSeminars = data;
        }
    }

    // @wire(getDetailSeminar, {fullText: '$fullText', pageSize: '$pageSize'})
    // wiredSections({data}){
    //     if(data){
    //         this.Sections = data;
    //     }
    // }

    // @wire(RegisterBookingForm, {LastName: '$LastName', Email: '$Email', Phone: '$Phone', BirthDate: '$BirthDate', Voucher: '$Voucher'})
    // wiredAllSeminars({data}){
    //     if(data){
    //         console.log(data);
    //     }
    // }

    handleClearSearch(event){
        this.template.querySelector('lightning-input[data-id="inputSearch"]').value = "";
        this.template.querySelector('lightning-input[data-id="inputFromDate"]').value = "";
        this.template.querySelector('lightning-input[data-id="inputToDate"]').value = "";
        this.template.querySelector('lightning-input[data-id="inputFromPrice"]').value = "";
        this.template.querySelector('lightning-input[data-id="inputToPrice"]').value = "";
    }

    handleSearch(event){
        var valueTextSearch = (this.template.querySelector('lightning-input[data-id="inputSearch"]').value != "") ? this.template.querySelector('lightning-input[data-id="inputSearch"]').value : "Seminar";
        var valueDateSearch = (this.template.querySelector('lightning-input[data-id="inputFromDate"]').value != "") ? this.template.querySelector('lightning-input[data-id="inputFromDate"]').value : "2023-04-01";
        var valuePriceSearch = (this.template.querySelector('lightning-input[data-id="inputFromPrice"]').value != "") ? this.template.querySelector('lightning-input[data-id="inputFromPrice"]').value : "1000";
        this.fullText = valueTextSearch;
        this.FromPrice = valuePriceSearch;
        this.FromDate = valueDateSearch;
    }

    handleChangePageSize(event){
        this.pageSizeSelected = event.target.value;
    }

    handelChangeSelectFieldSorts(event){
        this.Sort_t = event.target.value;
    }

    handleButtonPaging(event){
        this.template.querySelectorAll('.btnPaging').forEach((current, index, arr) =>{
            arr[index].addEventListener('click', function(event){
                this.currentPage = event.target.value;
                console.log(this.currentPage);
            });
        })

    }

    connectedCallback(){
        this;
        console.log(this);
    }
}
