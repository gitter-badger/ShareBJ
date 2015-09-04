angular.module('ShareBJ', ['shareBJ.users', 'shareBJ.babies', 'shareBJ.journals'])
    .controller('AppCtrl',function($scope,$state,$meteor,$ionicHistory,$rootScope,$ionicPopover) {
        //$scope.popover = $ionicPopover.fromTemplate( '<ion-popover-view>' +
        //    '<ion-content><div class="list">' +
        //        '<div class="item item-button-left">' +
        //        '<button class="button button-clear" ui-sref="shareBJ.babies.requests">' +
        //        '   <i class="icon ion-email-unread assertive"></i>' +
        //        '</button>' +
        //        '</div>' +
        //    '</list></ion-content>' +
        //'</ion-popover-view>'
        //,{scope:$scope});

        //$scope.subs = [];
        $scope.$meteorAutorun(function () {
            //console.log("Autorun");
            if (Meteor.userId()) {
                //console.log("Autorun with userId");
                $scope.notifications = $scope.$meteorCollection(function () {
                    return Herald.getNotifications({medium: 'onsite'});
                });
                $scope.notificationCount = $scope.notifications.length;

                $scope.$meteorSubscribe('myRequests')
                    .then(function (subId) {
                        //console.log("myRequests id:",subId);
                        //$scope.subs.push(subId);
                        $scope.requestsCount = $scope.$meteorObject(Counts, 'numOfMyRequests', false);

                    }, console.log);
            }
        });

        $scope.menuBabies = ShareBJ.menu.babiesList;
        $scope.menuUserSummary = ShareBJ.menu.userSummary;
        $scope.logout = function(){
            $meteor.logout().then(
                function(){
                    //console.log("UserId after logout:",Meteor.userId());
                    //_.each($scope.subs,function(sub){
                    //    sub.stop();
                    //});
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go(ShareBJ.state.login);
                },
                console.log
            )
        }
    })
;



// to get meteor app on cordova with angular integration
Meteor.startup(function(){
    function onReady() {
        angular.bootstrap(document, ['ShareBJ']);
    }

    if (Meteor.isCordova)
        angular.element(document).on("deviceready", onReady);
    else
        angular.element(document).ready(onReady);
});


