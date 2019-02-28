
var app = angular.module('appstf', []);
app.controller('displayContent', function($scope, $http) {
  $http.get('assets/js/stf.json').then(function(response) { /* "$http.get" permet de charger (ou d'appeler) le fichier stf.json) afin d'y ajouter des fonctions */
    $scope.stf = response.data;
  });
  /* CATÉGORIES DANS LA NAVBAR */
  $scope.changeCategory = function(category) { /*Dans le cas on veut changer de catégorie, on applique la fonction sur la dite catégorie */
    $scope.filterCategory = category;
  };
  /* TRIER PAR */
    $scope.changeOrder = function(order) {
      $scope.orderby = order;
  };
  /* BOUTON "AJOUTER AU PANIER" SUR LA PAGE*/

  $scope.quantityBasket = {}; /* dans le cas où on veut changer la quantité*/
  $scope.addBasket = function(add) { /* quand on ajoute un produit au panier, on exécute la fonction ajouter  */
    var id = add; /* le nombre de "id" (produit) dépend du nombre d'ajouts (add) (click sur le bouton "Ajouter au panier") */
    if(!(id in $scope.quantityBasket)){ /* si on ajoute un premier produit au panier */
      $scope.quantityBasket[id] = 1; /* alors la valeur du panier devient 1 */
    }else{ /* sinon*/
      $scope.quantityBasket[id]++; /* à chaque ajout, on ajoute (on incrémente) la quantité du panier de +1*/
    }
  }

  /* DANS LA FENÊTRE MODAL (PANIER) */

  /* (Sous-total) Prix par ligne de produit (prix affiché en haut à droite du produit) */
  $scope.totalPriceItems = function() { /* On appelle le total du prix de chaque produit */
  var totalPriceItems = 0; /* on part de zero */
  angular.forEach($scope.quantityBasket, function(value, key) { /* pour chaque produit (forEach) on récupère sa quantité (value) et son prix (key) */
    totalPriceItems += $scope.stf[key].price * value;  /* la sous-total de la ligne de produit = prix du produit multiplié par sa quantité*/
  })
    return totalPriceItems; /* et on affiche le sous-total par ligne de produit */
  }
/* Quantité de produits par ligne de produit (Qté :) */
  $scope.totalQtyKeyBasket = function() { /* pour afficher la quantité du nombre de produits par ligne */
  var totalQtyKeyBasket = 0; /* on part de zero */
  angular.forEach($scope.quantityBasket, function(value, key) { /* pour chaque produit (forEach) on applique la fonction pour récupérer la quantité (avec l'attribut value)  */
    totalQtyKeyBasket += $scope.quantityBasket[key]; /* la quantité définitive du panier = quantité du panier en cours + l'ajout d'un autre produit quand on clique sur + */
  })
    return totalQtyKeyBasket; /* et on affiche le sous-total du nombre de produits par ligne (Qté) */
  }

  $scope.removeItem = function(index) { /* le bouton "supprimer" (removeItem)*/
     	delete $scope.quantityBasket[index]; /* a pour fonction de supprimer la quantité du panier par ligne*/
  }
  $scope.addQty = function(key) { /* si on ajoute un produit (button +) on applique la fonction*/
     $scope.quantityBasket[key]++; /* et on ajoute la quantité (on incrémente) de +1 */
  }
  $scope.lessQty = function(key) { /* si on enlève un produit (button -) on applique la fonction*/
     	$scope.quantityBasket[key]--; /* et on retire la quantité de -1 */
      if($scope.quantityBasket[key] == 0){ /* et si la quantité devient égale à 0*/
        delete $scope.quantityBasket[key]; /*dans ce cas on supprimé la ligne */
      }
  }
  $scope.delBasket = function() { /* dans le cas où il ne nous reste plus qu'un seul produit et qu'on appuie sur "supprimer"*/
        delete $scope.quantityBasket; /* "delBasket" a alors pour fonction de supprimer la quantité totale du panier */
        $scope.quantityBasket = {}; /*  le panier est donc vide */
      }
});
/* JQuery */
$(document).ready(function () { /* on appelle le doc html et on lui applique une fonction */
    $('#changeCategoryList li').click(function() { /* Quand on clique que une catégorie (navbar )*/
        $('.activeCategory').removeClass('activeCategory'); /*On active la catégorie choisie et on masque les autres */
         $(this).addClass('activeCategory');
    });
});

/* Pour vous apporter plus d'informations sur ""$scope", "module" et "controller" je vous ai ajouté les liens ci-dessous*/
/* src $scope : https://openclassrooms.com/fr/courses/2516051-developpez-vos-applications-web-avec-angularjs/2827761-plus-de-details-sur-scope*/
/* src $scope & controller : https://www.geomatys.com/fr/2015/06/16/scopes-et-controllers-angularjs/*/




/* STRANGER THINGS TV */

document.addEventListener("DOMContentLoaded",tv);
function tv() {
	var cnv = document.getElementById("static"),
		c = cnv.getContext("2d"),
		cw = cnv.offsetWidth,
		ch = cnv.offsetHeight,
		staticScrn = c.createImageData(cw,ch),
		staticFPS = 30,
		isStatic = false,
		staticTO,
		gifData = [
      {
        file: "assets/img/stranger.gif",
        desc: "Logo Stranger Things"
      },
			{
				file: "assets/img/dustin.gif",
				desc: "Dustin smilin"
			},
			{
				file: "assets/img/eleven.gif",
				desc: "Eleven kickin"
			},
			{
				file: "assets/img/mike.gif",
				desc: "Mike tripin",
			},

			{
				file: "assets/img/mom.gif",
				desc: "Mom cryin",
			},
      {
        file: "assets/img/credits.gif",
        desc: "End credits"
      }
		],
		gifs = [],
		channel = 0;

	for (g in gifData) {
		gifs.push(new Image());
		gifs[g].src = gifData[g].file;
		gifs[g].alt = gifData[g].desc;
	}

	/* Static */
	var runStatic = function() {
		isStatic = true;
		c.clearRect(0,0,cw,ch);

		for (var i = 0; i < staticScrn.data.length; i += 4) {
			let shade = 127 + Math.round(Math.random() * 128);
			staticScrn.data[0 + i] = shade;
			staticScrn.data[1 + i] = shade;
			staticScrn.data[2 + i] = shade;
			staticScrn.data[3 + i] = 255;
		}
		c.putImageData(staticScrn,0,0);

		staticTO = setTimeout(runStatic,1e3/staticFPS);
	};
	runStatic();

	/* Channels */
	var changeChannel = function() {
		var displayed = document.getElementById("displayed");

		++channel;
		if (channel > gifData.length)
			channel = 1;

		this.classList.remove("pristine");
		this.style.transform = `rotate(${channel * 360/(gifData.length + 1)}deg)`;

		cnv.classList.remove("hide");
		displayed.classList.add("hide");

		if (!isStatic)
			runStatic();

		setTimeout(function(){
			cnv.classList.add("hide");
			displayed.classList.remove("hide");

			displayed.src = gifs[channel - 1].src;
			displayed.alt = gifs[channel - 1].alt;

			isStatic = false;

			clearTimeout(staticTO);
		},300);
	};
	document.getElementById("channel").addEventListener("click",changeChannel);
}

/* */

$(document).ready(function(){
  var mouseX, mouseY;
  var ww = $( window ).width();
  var wh = $( window ).height();
  var traX, traY;
  $(document).mousemove(function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = ((4 * mouseX) / 570) + 40;
    traY = ((4 * mouseY) / 570) + 50;
    console.log(traX);
    $(".title").css({"background-position": traX + "%" + traY + "%"});
  });
});
