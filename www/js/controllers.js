angular.module('starter.controllers', [])

.controller('keyboard', function($scope, $timeout) {

  $scope.activate      = false;
  $scope.codeActive    = '';
  $scope.codeDesactive = '';
  $scope.explosion     = false;

  $scope.sounds = [];
  $scope.sounds.bleep = document.getElementById('bleep');
  $scope.sounds.plantedBomb = document.getElementById('plantedBomb');

  $scope.timer = '';

  $scope.pressButton = function (obj) {

      $scope.sounds.bleep.currentTime = 0;
      $scope.sounds.bleep.play();

    if (! $scope.activate ) {

      $scope.codeActive += String( obj.target.innerText );

      if ( $scope.codeActive.length >= 7 ) {

        return $scope.active();
      }

      return true;
    }

    $scope.codeDesactive += String( obj.target.innerText );

    if ( $scope.codeDesactive == $scope.codeActive ) {

      return $scope.desactive();
    }
    else if ( $scope.codeDesactive.length >= 7 ) {

      return $scope.codeDesactive = '';
    }
  }

  $scope.active = function () {

    var bombHasBeenPlanted = new Audio('/songs/Bomb has been planted.mp3'),
        plantingC4Bomb     = new Audio('/songs/Planting C4 bomb.mp3');
    bombHasBeenPlanted.play();
    plantingC4Bomb.play();
    $scope.sounds.plantedBomb.play();

    $scope.activate = true;

    $scope.timer = $timeout(function () {

      $scope.explode();
    }, 15000);
  }

  $scope.desactive = function () {

    clearInterval($scope.timer);

    var bombHasBeenDefused = new Audio('/songs/Bomb has been defused.mp3'),
        win                 = new Audio('/songs/Win.mp3');
    bombHasBeenDefused.play();
    win.play();

    $scope.sounds.plantedBomb.pause();

    $timeout(function () {
      var counterTerroristWin = new Audio('/songs/Counter-Terrorist win.mp3');
      counterTerroristWin.play();
    }, 1200);

    $scope.codeActive    = '';
    $scope.codeDesactive = '';
    $scope.activate   = false;
  }

  $scope.explode = function () {

    $scope.codeActive    = '';
    $scope.codeDesactive = '';
    $scope.activate      = false;
    $scope.explosion     = 'true';

    var bombC4Explode = new Audio('/songs/Bomb C4 explode.mp3'),
        terroristWin  = new Audio('/songs/Terrorists win.mp3');
    $scope.sounds.plantedBomb.pause();
    bombC4Explode.play();
    terroristWin.play();

    $timeout(function () {
      $scope.explosion = false;
    }, 800);
  }
});