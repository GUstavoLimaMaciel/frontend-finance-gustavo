angular.module('primeiroApp')
    .constant('consts', {
        apiUrl: 'https://backend-finance-gustavo.herokuapp.com/api',
        oapiUrl: 'https://backend-finance-gustavo.herokuapp.com/oapi',
        userKey: '_primeira_app_user'
    }).run(['$rootScope', 'consts', function ($rootScope, consts) {
        $rootScope.consts = consts;
    }]);