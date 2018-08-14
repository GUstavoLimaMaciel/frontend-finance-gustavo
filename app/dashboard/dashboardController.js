(function(){
    angular.module('primeiroApp')
    .controller('DashboardCtrl',['$http',DashboardController])
    
    function DashboardController($http){
        const self = this; 
        function getSummary(){
            const url = 'http://localhost:3003/api/billingSummary';
            $http.get(url).then(function(response){
                self.credit = response.data.credit;
                self.debt = response.data.debt;
                self.total = response.data.credit - response.data.debt;
            })
        }
    
        getSummary();
    }
})();