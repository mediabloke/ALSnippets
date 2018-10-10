//service is wrapped in an IIFE to prevent global name pollution

(function () {
    'use strict';

    //module is linked to the app

    angular
        .module('novoApp')
        .controller('ApiKeyCtrl', ApiKeyCtrl);

    //dependencies are injected in a minification safe manner

    ApiKeyCtrl.$inject = ['$scope', '$log', 'ApiKeySvc', 'novodata'];

    function ApiKeyCtrl($scope, $log, ApiKeySvc, novodata) {

        //"this" keyword captures in variable to keep code uniform

        const vm = this;

        //API keys are received from the state and saved to the local scope

        $scope.apiKeys = novodata.apiKeys;

        //called when user generates an API key

        vm.createApiKey = () => {
            ApiKeySvc.createApiKey().then((result) => {
                swal({
                    type: 'success',
                    html: `Please copy your API key:\n ${result}`
                })
            });
        };

        //API key will be shown is a SweetAlert modal for easier copy/paste

        $scope.displayApiKeyValue = (apiKey) => {
            swal({
                type: 'success',
                html: `Please copy your API key:\n ${apiKey.token}`
            });
        };

        //API key will be disabled

        $scope.disableApiKey = (apiKey) => {
            ApiKeySvc.deactivateKey(apiKey);
        };
    }
})();
