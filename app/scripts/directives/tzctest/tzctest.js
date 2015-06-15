'require strict';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
angular.module('sbAdminApp', [])
    .directive('jsonText', function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, ngModel) {            
              function into(input) {
                console.log(JSON.parse(input));
                return JSON.parse(input);
              }
              function out(data) {
                return JSON.stringify(data);
              }
              ngModel.$parsers.push(into);
              ngModel.$formatters.push(out);
            }
        };
});

*/

angular.module('sbAdminApp')
  .controller('TestController', function($scope, $http) {

    
    $scope.commands = [
        {value: 1, displayName: 'TVL File Update', msg: {name:"feng01", age: 40}},
        {value: 2, displayName: 'Change Direction', msg: {name:"feng01", age: 40}},
        {value: 3, displayName: 'Get TZC Status',  msg: {name:"feng01", age: 40}},
        {value: 4, displayName: 'Get Transaction Consolidation',  msg: {name:"feng01", age: 40}},
        {value: 5, displayName: 'Get Transaction',  msg: {name:"feng01", age: 40}}
    ];
      
    $scope.commandSelection = $scope.commands[0];
    

    $scope.directions = [
        {id: 1, displayName: 'DirectionA'},
        {id: 2, displayName: 'DirectionB'}
    ];
   
    $scope.tvl_file_url = "";
    $scope.direction = $scope.directions[0];
    
       
    //$scope.msg = $scope.commandSelection.msg;
    /*
    $scope.commandSelection.msg.toString = function() {
        return JSON.stringify(this);
    };
    */
   $scope.cmdPayload = JSON.stringify($scope.commandSelection.msg);
    
    $scope.send_msg = function() {
        console.log($scope.commandSelection);
        $http.defaults.useXDomain = true;
        if ($scope.commandSelection.value == 1) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8888/tvl',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {msg: 'hello, world!'}
            }
            $http(req).success(function(data, status, headers, config){
                // this callback will be called asynchronously
                // when the response is available
            }).error(function(data, status, headers, config){
                // called asynchronously if an error occurs
                // or server returns response with an error status
            });
        }
        else if ($scope.commandSelection.value == 2) {
            var msg = $scope.commandSelection.msg;
            console.log(msg);
            var dataObj = msg;
            var req = {
                method: 'POST',
                url:'http://localhost:4567/direction',
                data: dataObj,
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json'
                    //'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
                    //'Access-Control-Allow-Origin' :'*'
                }
            };
            var res = $http(req);
            res.success(function(data, status, headers, config){
                
                $scope.respData = 'get response' + data;
            }).error(function(data, status, headers, config){
                $scope.respData = 'get error:'+ data;
            });
            
        }
        else if ($scope.commandSelection.value == 3){
            var req = {
                method: 'JSONP',
                //url: 'http://localhost:8888/status'
                url: 'http://localhost:8888/foo',
                
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json'
                    //'Access-Control-Allow-Origin' :'*'
                }
                //callback: 'JSON_CALLBACK'
                                               
            }
            
            //var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
            var url = "http://localhost:8888/foo?callback=JSON_CALLBACK";    
            $http.jsonp(url)
                .success(function(data){
                    $scope.respData = data;
                    console.log(data.found);
                });
                
            /*    
            $http.jsonp("http://localhost:8888/foo").success(function(data, status, headers, config){
                // this callback will be called asynchronously
                // when the response is available
                $scope.respData = data;
                $scope.respStatus = status;
                
                
            }).error(function(data, status, headers, config){
                // called asynchronously if an error occurs
                // or server returns response with an error status
                $scope.respData = data;
                $scope.respStatus = status;
            });
            */
        }
        else if ($scope.commandSelection.value == 4){
            
            $scope.start = {value: new Date(2011, 06, 01, 00, 00) };
            $scope.end = {value: new Date(2015, 06, 01, 00, 10)};
            var dataObj = {direction: "A"};
            var req = {
                method: 'GET',
                url:'http://localhost:8888/direction',
                data: dataObj,
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json'
                    //'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
                    //'Access-Control-Allow-Origin' :'*'
                }
            };
            var res = $http(req);
            res.success(function(data, status, headers, config){
                
                $scope.respData = 'get response' + JSON.stringify(data);
            }).error(function(data, status, headers, config){
                $scope.respData = 'get error:'+ JSON.stringify(data);
            });
            
        }
        else if ($scope.commandSelection.value == 5){
            var dataObj = {direction: "A"};
            var req = {
                method: 'GET',
                url:'http://localhost:4567/api/transactions',
                data: dataObj,
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json'
                    //'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
                    //'Access-Control-Allow-Origin' :'*'
                }
            };
            var res = $http(req);
            res.success(function(data, status, headers, config){
                
                $scope.respData = 'get response' + data;
            }).error(function(data, status, headers, config){
                $scope.respData = 'get error:'+ data;
            });
        }
    }

    

});


