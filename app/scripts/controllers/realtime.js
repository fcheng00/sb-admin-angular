'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */


var module = angular.module('sbAdminApp', ['ngWebSocket']);
 
module.factory('LaserMsgService', function ($websocket) {

    var msgs = [];
    var ws = $websocket("ws://localhost:12347");
    ws.onMessage(function (event) {
            console.log('message: ', event.data);
            
            try {
                msgs.push(event.data);
            } catch (e) {
                console.log('error: ', e);
                response = {'error': e};
            }
                
        });
        ws.onError(function (event) {
            console.log('connection Error', event);
        });
        ws.onClose(function (event) {
            console.log('connection closed', event);
        });
        ws.onOpen(function () {
            console.log('connection open');
            ws.send('HELLO SERVER');
        });
    return {
            collection: msgs
           
        };
});
 
module.controller('realtimeCtrl', function ($scope, LaserMsgService) {
 
    //$scope.laser_line.data = LaserMsgService.collection;
    
    
    $scope.laser_line = {
	    labels: ['1', '2', '3', '4', '5', '6', '7', '7.5', '9'],
	    series: ['Series A', 'Series B'],
	    data: [
	      
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };
    
    $scope.laser_line.data = [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90, 50, 20]
	    ];
});