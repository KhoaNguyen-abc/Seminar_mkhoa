public with sharing class CH3_SeminarDetailControl {

    public static List<Seminar__c> seminars {get; set;}

    public CH3_SeminarDetailControl() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Seminar__c> getSeminars(String fullText, String IsTrue, String field, String sort_t){
        List<Id> ids = new List<Id>();

        for(SObject item: [ SELECT Id FROM Seminar__c ]){
            ids.add(item.Id);
        }

        List<String> isList = new List<String>();

        Map<ID, SObject> hashMap = new Map<Id, Seminar__c>([ SELECT Id, IsPublic__c FROM Seminar__c WHERE Id IN :ids ]);
        for(Id item: hashMap.KeySet()){
            SObject s = hashMap.get(item);
            isList.add(String.valueOf(s.get('IsPublic__c')));
        }

        String queryFullText = 'FIND :fullText IN ALL FIELDS RETURNING Seminar__c(Id, Name, Name__c, Code__c, Description__c, End_Date__c, IsPublic__c, Price__c, Quantity__c, Start_Date__c, Total_Section__c WHERE IsPublic__c IN :isList AND IsPublic__c = :IsTrue ORDER BY '+field+' '+sort_t+' LIMIT 5 OFFSET 0)';

        List<List<SObject>> results = search.query(queryFullText);
        seminars = (List<Seminar__c>)results[0];
        return seminars;
    }
}