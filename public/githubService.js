angular.module('app')
.service('githubService', function() {

    this.getFollowing = function($http) {
        return $http.get('https://api.github.com/user/followers');
    }
});