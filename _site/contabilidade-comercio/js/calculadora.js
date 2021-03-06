var SimuladorApp = angular.module('SimuladorApp',[]);

SimuladorApp.controller('SimuladorController', ['$scope', function($scope) {
    
    $scope.qtdSocios = 1;
    $scope.qtdFuncionarios = 0;
    $scope.simples = true;
    $scope.comercio = true;
    $scope.ltFaturamento = [
        "até R$100.000/mês",
        "de R$100.000/mês até R$150.000/mês",
        "acima de R$150.000/mês" ];
    
    $scope.indice = 0;
    $scope.valorContadorAtual = 937;
    $scope.valorDescontoAnual = 0;
    $scope.valorMensalidade = 0;
    $scope.qtdMesesContabilizei = 10;
    
    $scope.valorAdicionalSocios = 0;
    $scope.valorAdicionalFuncionarios = 0;
    
   
   $scope.verificaValor = function(event, qntToCompare, model){
       
       if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 38 || event.keyCode == 40) return false;
       
       var valueNumber = -1;
       try{
           valueNumber = new Number(event.currentTarget.value);    
       }catch(e){}
       
       if (valueNumber == -1) $scope[model] = 10; 
       if (valueNumber > qntToCompare) $scope[model] = qntToCompare;
   }
    $scope.atualizaFaturamento = function(i) {
        $scope.indice = i;

        console.log($scope.indice);
    }

    $scope.calculaValor = function() {
        
        // ---------------------------
        // Calcula o  valor adicional por sócio
        // ---------------------------
        $scope.valorAdicionalSocios = 0;

        if ($scope.qtdSocios > 2) {
            var qtdAdicionais = $scope.qtdSocios - 2;
            
            for (i = 0; i < qtdAdicionais; i++) {
                $scope.valorAdicionalSocios = $scope.valorAdicionalSocios + 29;
            }
        }

        // ---------------------------
        // Calcula o  valor adicional por funcionário
        // ---------------------------
        $scope.valorAdicionalFuncionarios = 0;

        if ($scope.qtdFuncionarios > 0) {
            for (i = 0; i < $scope.qtdFuncionarios; i++) {
                $scope.valorAdicionalFuncionarios = $scope.valorAdicionalFuncionarios + 49;
            }
        }
        
        if ($scope.comercio) {
            var valores = [149, 249, 349];
        }
        
        $scope.valorMensalidade = valores[$scope.indice];
        
        $scope.valorDescontoAnual = 
           (
               (12 * $scope.valorContadorAtual)
             
           
           )
           	 - 
           (
           	    (12 * $scope.valorMensalidade)
             + (12 * $scope.valorAdicionalSocios) 
             + (12 * $scope.valorAdicionalFuncionarios)
           )
           
        if ($scope.valorDescontoAnual < 0) {
            $scope.valorDescontoAnual = 0;
        }
        
          $scope.qtdMesesContabilizei = parseInt($scope.valorContadorAtual / ($scope.valorMensalidade + $scope.valorAdicionalSocios + $scope.valorAdicionalFuncionarios));
       
    }

    $scope.calculaValor();

    // ---------------------------
    // Fica monitorando as variáveis para recalcular o valor caso algo seja alterado
    // ---------------------------
    $scope.$watch("qtdSocios", function() {
        $scope.calculaValor();
    });
    $scope.$watch("qtdFuncionarios", function() {
        $scope.calculaValor();
    });
    $scope.$watch("comercio", function() {
        $scope.calculaValor();
    });
    $scope.$watch("indice", function() {
        $scope.calculaValor();
    });
    $scope.$watch("valorContadorAtual", function() {
        $scope.calculaValor();
    });
    
}]);