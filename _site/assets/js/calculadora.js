var SimuladorApp = angular.module('SimuladorApp', []);
SimuladorApp.controller('SimuladorController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.qtdSocios = 1;
    $scope.qtdFuncionarios = 0;
    $scope.simples = true;
    $scope.ltFaturamento = ["até R$25.000/mês", "de R$25.000 até R$50.000/mês", "de R$50.000 até R$100.000/mês", "de R$100.000 até R$150.000/mês", "de R$150.000 até R$200.000/mês", "acima de R$200.000/mês"];
    $scope.indice = 0;
    $scope.valorContadorAtual = 490;
    $scope.valorDescontoAnual = 0;
    $scope.valorMensalidade = 0;
    $scope.qtdMesesContabilizei = 10;
    $scope.valorAdicionalSocios = 0;
    $scope.valorEconomiaVR = 0;
    $scope.valorAdicionalFuncionarios = 0;
    $scope.verificaValor = function (event, qntToCompare, model) {
        if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 38 || event.keyCode == 40) return false;
        var valueNumber = -1;
        try {
            valueNumber = new Number(event.currentTarget.value);
        } catch (e) {}
        if (valueNumber == -1) $scope[model] = 10;
        if (valueNumber > qntToCompare) $scope[model] = qntToCompare;
    }
    $scope.atualizaFaturamento = function (i) {
        $scope.indice = i;
        console.log($scope.indice);
    }
    $scope.calculaValor = function () {
        $scope.valorAdicionalSocios = 0;
        if ($scope.qtdSocios > 2) {
            var qtdAdicionais = $scope.qtdSocios - 2;
            for (i = 0; i < qtdAdicionais; i++) {
                $scope.valorAdicionalSocios = $scope.valorAdicionalSocios + 29;
            }
        }
        $scope.valorAdicionalFuncionarios = 0;
        if ($scope.qtdFuncionarios > 0) {
            for (i = 0; i < $scope.qtdFuncionarios; i++) {
                $scope.valorAdicionalFuncionarios = $scope.valorAdicionalFuncionarios + 29;
            }
        }
        if ($scope.simples) {
            var valores = [49, 98, 245, 343, 441, 539];
        } else {
            var valores = [99, 198, 495, 693, 891, 1089];
        }
        $scope.valorMensalidade = valores[$scope.indice];
        alert($scope.valorEconomiaVR);
        $scope.valorDescontoAnual = ((12 * $scope.valorContadorAtual)) - ((12 * $scope.valorMensalidade) + (12 * $scope.valorAdicionalSocios) + (12 * $scope.valorAdicionalFuncionarios) + (12 * $scope.valorEconomiaVR));
        if ($scope.valorDescontoAnual < 0) {
            $scope.valorDescontoAnual = 0;
        }
        $scope.qtdMesesContabilizei = parseInt($scope.valorContadorAtual / ($scope.valorMensalidade + $scope.valorAdicionalSocios + $scope.valorAdicionalFuncionarios));
    }
    $scope.calculaValor();
    $scope.$watch("qtdSocios", function () {
        $scope.calculaValor();
    });
    $scope.$watch("qtdFuncionarios", function () {
        $scope.calculaValor();
    });
    $scope.$watch("simples", function () {
        $scope.calculaValor();
    });
    $scope.$watch("indice", function () {
        $scope.calculaValor();
    });
    $scope.$watch("valorContadorAtual", function () {
        $scope.calculaValor();
    });
    $scope.$watch("valorEconomiaVR", function () {
        $scope.calculaValor();
    });
}]);