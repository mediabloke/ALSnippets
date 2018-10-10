//service is wrapped in an IIFE to prevent global name pollution

(function () {
    'use strict';

    //module is linked to the app

    angular
        .module('novoApp')
        .factory('ApiKeySvc', ApiKeySvc);

    //dependencies are injected in a minification safe manner

    ApiKeySvc.$inject = ['$rootScope', '$http', '$state'];

    function ApiKeySvc($rootScope, $http, $state) {
        
        //config will be the same for most calls. the letiable is initialized here
        
        let config = {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            data: ''
        };

        const service = {
            createApiKey: createApiKey,
            listApiKeys: listApiKeys,
            deactivateKey: deactivateKey
        };
        return service;

        //api keys will be created and passed to the state

        function createApiKey() {
            let promise = $http.post('portal/authtoken', config);
            return promise.then((response) => response.data.token,
                () => ''
            ).then((response) => {
                $state.reload();
                return response;
            });
        }

        //all API keys will be called to the view here

        function listApiKeys() {
            let promise = $http.get('portal/authtoken', config);
            return promise.then((response) => response.data,
                (response) => {
                    return [];
                });
        }

        //API keys will be archived. user will be asked if they want to delete

        function deactivateKey(apiKey) {
            swal({
                type: 'warning',
                title: 'Are you sure?',
                text: 'Do you want to permanently delete this API key? It cannot be used after this action.',
                showCancelButton: true
            }).then(function (response) {
                if (response.value) {
                    let promise = $http.delete(`portal/authtoken/${apiKey.id}`, config);
                    return promise.then((response) => response.data);
                }
            }).then((result) => {
                $state.reload();
            });
        }
    }
})();
