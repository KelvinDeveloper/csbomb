angular.module('starter.controllers', [])

.controller('keyboard', function($scope, $timeout) {

  $scope.activate      = false;
  $scope.codeActive    = '';
  $scope.codeDisarm    = '';
  $scope.explosion     = false;

  $scope.sounds = {
    bleep:                document.getElementById('bleep'),
    plantedBomb:          document.getElementById('plantedBomb'),
    bombHasBeenPlanted:   document.getElementById('bombHasBeenPlanted'),
    plantingC4Bomb:       document.getElementById('plantingC4Bomb'),
    bombHasBeenDefused:   document.getElementById('bombHasBeenDefused'),
    win:                  document.getElementById('win'),
    counterTerroristWin:  document.getElementById('counterTerroristWin'),
    bombC4Explode:        document.getElementById('bombC4Explode'),
    terroristsWin:        document.getElementById('terroristsWin'),
  };

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

    $scope.codeDisarm += String( obj.target.innerText );

    if ( $scope.codeDisarm == $scope.codeActive ) {

      return $scope.disarm();
    }
    else if ( $scope.codeDisarm.length >= 7 ) {

      return $scope.codeDisarm = '';
    }
  }

  $scope.active = function () {

    $scope.sounds.bombHasBeenPlanted.currentTime = 0;
    $scope.sounds.bombHasBeenPlanted.play();

    $scope.sounds.plantingC4Bomb.currentTime = 0;
    $scope.sounds.plantingC4Bomb.play();

    $scope.sounds.plantedBomb.currentTime = 0;
    $scope.sounds.plantedBomb.play();

    $scope.activate = true;

    $scope.timer = $timeout(function () {

      $scope.explode();
    }, 15000);
  }

  $scope.disarm = function () {

    $timeout.cancel($scope.timer);

    $scope.sounds.bombHasBeenDefused.currentTime = 0;
    $scope.sounds.win.currentTime = 0;

    $scope.sounds.bombHasBeenDefused.play();
    $scope.sounds.win.play();

    $scope.sounds.plantedBomb.pause();

    $timeout(function () {

      $scope.sounds.counterTerroristWin.currentTime = 0;
      $scope.sounds.counterTerroristWin.play();
    }, 1200);

    $scope.codeActive    = '';
    $scope.codeDesactive = '';
    $scope.activate   = false;
  }

  $scope.explode = function () {

    $scope.codeActive    = '';
    $scope.codeDisarm    = '';
    $scope.activate      = false;
    $scope.explosion     = 'true';

    $scope.sounds.plantedBomb.pause();

    $scope.sounds.bombC4Explode.currentTime = 0;
    $scope.sounds.terroristsWin.currentTime = 0;
    $scope.sounds.win.currentTime = 0;

    $scope.sounds.bombC4Explode.play();
    $scope.sounds.terroristsWin.play();
    $scope.sounds.win.play();

    $timeout(function () {
      $scope.explosion = false;
    }, 800);
  }
});
