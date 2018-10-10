//state for generating API keys

//state is wrapped in an IIFE to prevent global name pollution

(function () {
    'use strict';

//module is linked to the app

    angular
        .module('novoApp')
        .config(stateConfig);

    //dependencies are injected in a minification safe manner

    stateConfig.$inject = ['$stateProvider'];

    //state path is established, and permissions are given

    function stateConfig($stateProvider) {
        $stateProvider.state('apikey', {
            parent: 'app',
            url: '/apikey',
            data: {
                authorities: ['TENANT_ADMIN']
            },
            views: {
                'content@': {
                    templateUrl: 'app/novo/apikey/apikey.view.html',
                    controller: 'ApiKeyCtrl',
                    controllerAs: 'vm'
                }
            },
            //needed data is resolved from the service
            resolve: {
                novodata: ['$q', 'ApiKeySvc', ($q, ApiKeySvc) => $q.all({ apiKeys: ApiKeySvc.listApiKeys()})],

                translatePartialLoader: ['$translate', '$translatePartialLoader', ($translate, $translatePartialLoader) => {
                    $translatePartialLoader.addPart('apikey');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
