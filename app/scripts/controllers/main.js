'use strict';

/**
 * @ngdoc function
 * @name galleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the galleryApp
 */
angular.module('galleryApp')
  .controller('MainCtrl', function ($scope, ArtworksService) {
    $scope.data = {};
    $scope.items = [];

    function load() {
      ArtworksService.loadAll().then(function (items) {
        $scope.items = items;
      }, function () {
        //because API doesn't work right now
        $scope.items.push({});
      });
    }

    load();

    $scope.newArtwork = function () {
      ArtworksService.create().then(function (item) {
        $scope.items.push(item);
      }, load);
    };

    $scope.$watch('data.search', function () {
      if ($scope.data.search === '') {
        $scope.data.search = undefined;
      }
    });
  });
