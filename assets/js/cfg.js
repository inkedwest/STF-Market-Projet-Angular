/* Pour créer une application AngularJS, on doit 1/ créer l'object Javascript représentant l'application grâce à "angular.module" (ci-dessous) 2/ et lier le code html à cet objet grâce à l'attribut ng-app (dans le html link)*/
/* Le premier argument de la fonction "module" permet de donner un nom à notre application. C'est ce nom que nous devrons utiliser pour définir l'attribut "ng-app" dans notre code "html". */
var app = angular.module('appCfg', []);
app.controller('displayContent', function($scope, $http) { /* $scope = contexte / un $scope est organisé sous forme d’une arborescence d’objets // Le controller ci-contre se comporte comme une fonction allant simplement initialiser le scope AngularJS sur lequel il est attaché.*/
  $http.get('assets/js/cfg.json').then(function(response) { /* "$http.get" permet de charger (ou d'appeler) un fichier (ici cfg.json) afin d'y ajouter des fonctions*/
    $scope.cfg = response.data;
  });
  $scope.changeCategory = function(category) { /*Dans le contexte (scope) d'un changement de catégorie, on applique la fonction sur la dite catégorie */
    $scope.filterCategory = category;
  };
    $scope.changeOrder = function(order) {
      $scope.orderby = order;
  };
  $scope.quantityBasket = {};
  $scope.addBasket = function(add) {
    var id = add;
    if(!(id in $scope.quantityBasket)){
      $scope.quantityBasket[id] = 1;
    }else{
      $scope.quantityBasket[id]++;
    }
  }
  $scope.totalPriceItems = function() {
  var totalPriceItems = 0;
  angular.forEach($scope.quantityBasket, function(value, key) {
    totalPriceItems += $scope.cfg[key].price * value;
  })
    return totalPriceItems;
  }

  $scope.totalQtyKeyBasket = function() {
  var totalQtyKeyBasket = 0;
  angular.forEach($scope.quantityBasket, function(value, key) {
    totalQtyKeyBasket += $scope.quantityBasket[key];
  })
    return totalQtyKeyBasket;
  }

  $scope.removeItem = function(index) {
     	delete $scope.quantityBasket[index];
  }
  $scope.addQty = function(key) {
     $scope.quantityBasket[key]++;
  }
  $scope.lessQty = function(key) {
     	$scope.quantityBasket[key]--;
      if($scope.quantityBasket[key] == 0){
        delete $scope.quantityBasket[key];
      }
  }
  $scope.delBasket = function() {
        delete $scope.quantityBasket;
        $scope.quantityBasket = {};
      }
});
$(document).ready(function () {
    $('#changeCategoryList li').click(function() {
        $('.activeCategory').removeClass('activeCategory');
         $(this).addClass('activeCategory');
    });
});

/* Pour vous apporter plus d'informations sur $scope - module et controller je vous ai ajouté les liens ci-dessous*/
/* src $scope : https://openclassrooms.com/fr/courses/2516051-developpez-vos-applications-web-avec-angularjs/2827761-plus-de-details-sur-scope*/
/* src $scope & controller : https://www.geomatys.com/fr/2015/06/16/scopes-et-controllers-angularjs/*/
