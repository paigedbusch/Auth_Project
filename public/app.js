angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('login', {
        url: '/',
        templateUrl: '/public/login.html'
    })
    .state('home', {
        url: '/home',
        templateUrl: '/public/home.html'
    })
    .state('friend', {
        url: '/friend:github_username',
        templateUrl: '/public/friend.html'
    });

    $urlRouterProvider
    .otherwise('/home');
});