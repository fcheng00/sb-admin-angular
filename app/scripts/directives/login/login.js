'use strict';

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('sbAdminApp')
  .controller('LoginController', LoginController);
 
  LoginController.$inject = ['$location', '$scope'];
  function LoginController($location, $scope) {
      $scope.login = function(user) {
          console.log(user.username);
          console.log(user.password);
          $location.path('/dashboard/home');
      };
                  
  };





