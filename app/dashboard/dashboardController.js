(function(){
    angular.module('primeiroApp')
    .controller('DashboardCtrl',['$http', 'consts',DashboardController])
    
    function DashboardController($http, consts){
        const self = this; 
        function getSummary(){
            const url = consts.apiUrl + '/billingSummary';
            $http.get(url).then(function(response){
                self.credit = response.data.credit;
                self.debt = response.data.debt;
                self.total = response.data.credit - response.data.debt;
            })
        }
    
        getSummary();
    }
})();