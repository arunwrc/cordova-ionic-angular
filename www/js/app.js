// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Items', ['$firebaseArray', function($firebaseArray){
    var itemsRef = new Firebase('https://testappcordova.firebaseio.com/items');
    return $firebaseArray(itemsRef);
}])
.controller('ListCtrl', function($scope, $ionicListDelegate, Items){
    $scope.items = Items;
    $scope.addItem = function(){
        var name = prompt("What do you need to buy");
        //date function
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        var todays_date = dd+'-'+mm+'-'+yyyy+' '+time;
        //date function
        if (name){
            $scope.items.$add({
               'name' : name, 
               'status' : 0, 
               'created_at' : todays_date,
               'updated_at' : todays_date
            });
        }
    };
    //delete method start
    $scope.removeItem = function(itemID) {
        //var deleteitem = prompt('Are you absolutely sure you want to delete?');
        //if (deleteitem) {
            //$http.delete('https://testappcordova.firebaseio.com/items/-KAkdVe4E68DU7ik3ffK');
            var item = new Firebase('https://testappcordova.firebaseio.com/items/'+itemID);
            item.remove();  
        //}
    }
    //delete method end
    $scope.purchaseItem = function(item,itemID){
        //date function
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        var todays_date = dd+'-'+mm+'-'+yyyy+' '+time;
        //date function
        var itemupdate = new Firebase('https://testappcordova.firebaseio.com/items/'+itemID);
        itemupdate.update({ status: '1', updated_at: todays_date});
        $scope.item = item;
        $scope.item['status'] = '1';
        $ionicListDelegate.closeOptionButtons();
        
    }
    $scope.undopurchaseItem = function(item,itemID){
        //date function
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        var todays_date = dd+'-'+mm+'-'+yyyy+' '+time;
        //date function
        var itemupdate = new Firebase('https://testappcordova.firebaseio.com/items/'+itemID);
        itemupdate.update({ status: '0', updated_at: todays_date});
        $scope.item = item;
        $scope.item['status'] = '0';
        $ionicListDelegate.closeOptionButtons();
        
    }
});