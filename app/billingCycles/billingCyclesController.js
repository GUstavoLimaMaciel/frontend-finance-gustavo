(function(){
    angular.module('primeiroApp')
    .controller('BillingCycleCtrl',[
        '$http', 'msg', 'tabs', '$location',
        BillingCycleController
    ]);

    function BillingCycleController($http, msg, tabs, $location){
        const self = this;
        const url = 'http://localhost:3003/api/billingCycles';

        self.refresh = function(){
            const page = parseInt($location.search().page) || 1;
            $http.get(url + '?skip=' + (( page - 1 ) * 10) + '&limit=10' ).then(function(response){
                self.billingCycle = {
                    credits: [{
                        name: undefined,
                        value: undefined
                    }], 
                    debts: [{
                        name: undefined,
                        value: undefined,
                        status:undefined
                    }]
                };
                self.calculateValues();
                self.billingCycles = response.data;
                $http.get(url + '/count').then(function(response){
                    self.count = response.data.value;
                    self.pages = Math.ceil(self.count / 10);
                    console.log(self.pages);
                    tabs.show(self, {tabList: true, tabCreate: true});
                });
            });
        }

        self.create = function(){
            $http.post(url, self.billingCycle)
            .then(function(response){
                self.refresh();
                msg.addSuccess('Operação realizada com sucesso!');
                // console.log('Sucesso!');
            },function(response){
                // console.log(response);
                msg.addError(response.data.errors);
            });
        }

        self.showTabUpdate = function(obj){
            console.log(obj);
            self.billingCycle = obj;
            if(!self.billingCycle.credits.length){
                self.billingCycle.credits = [{
                    name: undefined,
                    value: undefined
                }]; 
            }
            if(!self.billingCycle.debts.length){
                self.billingCycle.debts = [{
                    name: undefined,
                    value: undefined,
                    status:undefined
                }];
            }
            self.calculateValues();
            tabs.show(self, { tabUpdate: true });
        }
        
        self.showTabDelete = function(obj){
            console.log(obj);
            self.billingCycle = obj;
            if(!self.billingCycle.credits.length){
                self.billingCycle.credits = [{
                    name: undefined,
                    value: undefined
                }]; 
            }            
            if(!self.billingCycle.debts.length){
                self.billingCycle.debts = [{
                    name: undefined,
                    value: undefined,
                    status:undefined
                }];
            }
            self.calculateValues();
            tabs.show(self, { tabDelete: true });
        }

        self.delete = function(){
            $http.delete(url + '/' + self.billingCycle._id)
            .then(function(response){
                self.refresh();
                msg.addSuccess('Operação realizada com sucesso!');
            }, function(response){
                msg.addError(response.data.errors);
            });
        }

        self.update = function(){
            $http.put(url + '/' + self.billingCycle._id,self.billingCycle)
            .then(function(response){
                self.refresh();
                msg.addSuccess('Operação realizada com sucesso!');
            }, function(response){
                msg.addError(response.data.errors);
            });
        }

        self.addCredit = function(index){
            self.billingCycle.credits.splice(index + 1, 0, {
                name: undefined,
                value: undefined
            });
            self.calculateValues();
        };

        self.cloneCredit = function(index, creditClone){
            self.billingCycle.credits.splice(index + 1, 0, {
                name: creditClone.name,
                value: creditClone.value
            });
            self.calculateValues();
        };

        self.deleteCredit = function(index){
            if(self.billingCycle.credits.length > 1){
                self.billingCycle.credits.splice(index, 1);
                self.calculateValues();
            }
        };

        self.addDebt = function(index){
            self.billingCycle.debts.splice(index + 1, 0, {
                name: undefined,
                value: undefined,
                status:undefined
            });
            self.calculateValues();
        };

        self.cloneDebt = function(index, debtClone){
            self.billingCycle.debts.splice(index + 1, 0, {
                name: debtClone.name,
                value: debtClone.value,
                status: debtClone.status
            });
            self.calculateValues();
        };

        self.deleteDebt = function(index){
            if(self.billingCycle.debts.length > 1){
                self.billingCycle.debts.splice(index, 1);
                self.calculateValues();
            }
        };

        self.calculateValues = function(){
            self.credit = 0;
            self.debt = 0;

            if(self.billingCycle){
                self.billingCycle.credits.forEach(function(c){
                    self.credit += !c.value || isNaN(c.value) ? 0 : parseFloat(c.value);
                });
                
                self.billingCycle.debts.forEach(function(d){
                    self.debt += !d.value || isNaN(d.value) ? 0 : parseFloat(d.value);
                });

                self.total = self.credit - self.debt;
            }
        };

        self.refresh();
    }
})()