(function(){
    angular.module('primeiroApp')
    .controller('AuthCtrl', [
        '$location',
        'msg',  
        'auth',
        AuthController
    ]);
    function AuthController($location, msg, auth) {
        const self = this;

        self.loginMode = true;

        self.changeMode = () => self.loginMode = !self.loginMode;

        self.login = () => {
            console.log('Login');
            auth.login(self.user, err => err ? msg.addError(err) : $location.path('/'));
        }

        self.signup = () => {
            console.log('Signup');
            auth.signup(self.user, err => err ? msg.addError(err) : $location.path('/'));
        }
        
        self.getUser = () => auth.getUser();

        self.logout = () => {
            console.log('Logout...');
            auth.logout(() => $location.path('/'));
        };
    }
})();