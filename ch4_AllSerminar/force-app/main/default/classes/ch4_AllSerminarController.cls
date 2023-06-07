public with sharing class ch4_AllSerminarController {


    public static List<Seminar__c> AllSeminars {get; set;}
    public static List<Section__c> DetailSeminar {get; set;}

    public ch4_AllSerminarController() {
    }

    @AuraEnabled(cacheable=true)
    public static List<Seminar__c> getAllSeminars(String fullText, String cShow, String isTrue, String FromDate, String FromPrice, String select_t, String sort_t, String currentPage, String pageSize){
        List<Id> ids = new List<Id>();
        List<Id> seminarIds = new List<Id>();

        Date FromDateParse = Date.valueOf(FromDate);
        Integer FromPriceParse = Integer.valueOf(FromPrice);
        Integer currentPageParse = Integer.valueOf(currentPage);

        for(SObject item: [ SELECT Id FROM Section__c ]){
            ids.add(item.Id);
        }

        Map<Id, SObject> hashMap = new Map<Id, Section__c>([ SELECT Id, Name, Name__c, Order__c, Description__c, Seminar__c, Status__c FROM Section__c WHERE Id IN :ids AND Status__c = :cShow ]);
        for(Id item: hashMap.KeySet()){
            SObject section = hashMap.get(item);
            Id sectionIDSeminar = (Id)section.get('Seminar__c');
            seminarIds.add(sectionIDSeminar);
        }

        String query = 'FIND :fullText IN ALL FIELDS RETURNING Seminar__c(Id, Name, Name__c, Code__c, Description__c, Price__c, Quantity__c, Start_Date__c, Total_Section__c WHERE Id IN :seminarIds AND Start_Date__c >= :FromDateParse AND Price__c >= :FromPriceParse ORDER BY '+select_t+' '+sort_t+' LIMIT '+pageSize+' OFFSET '+currentPage+')';
        List<List<SObject>> results = search.query(query);
        AllSeminars = (List<Seminar__c>)results[0];
        return AllSeminars;
    }   

    @AuraEnabled(cacheable=true)
    public static List<Section__c> getDetailSeminar(String seminarText, String cShow, String sectionSize){
        List<Id> ids = new List<Id>();

        Integer sectionSizeParse = Integer.valueOf(sectionSize);
        for(SObject item: [ SELECT Id, Seminar__c FROM Section__c WHERE Status__c = :cShow ]){
            Id SeminarcId = (Id)item.get('Seminar__c');
            ids.add(SeminarcId);
        }

        String query = 'FIND :seminarText IN ALL FIELDS RETURNING Section__c(Id, Name, Name__c, Description__c, Order__c, Seminar__c, Status__c WHERE Seminar__c IN :ids ORDER BY Name ASC LIMIT '+sectionSize+' OFFSET 0)';
        List<List<SObject>> results = search.query(query);
        DetailSeminar = (List<Section__c>)results[0];
        return DetailSeminar;        
    }

    @AuraEnabled(cacheable=true)
    public static String RegisterBookingForm(String LastName, String Email, String Phone, String BirthDate, String Voucher){
        
        String alert = 'Register success.';
        Booking__c bookingNew = new Booking__c();
        Contact contactNew = new Contact();

        Date d = Date.parse(BirthDate);

        contactNew.LastName = LastName;
        contactNew.Phone = Phone;
        contactNew.Email = Email;
        contactNew.Birthdate = d;
        
        BookingNew.Voucher__c = Voucher;
        
        insert bookingNew;
        insert contactNew;

        return alert;
    }

}