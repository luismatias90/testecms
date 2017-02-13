$( document ).ready(function() {
			
				$("#txtValorFacialRefeicao").maskMoney({prefix:'R$ ', thousands:'.', decimal:','});
				$("#txtTaxaAtualRefeicao").maskMoney({suffix:'%', allowNegative: true, thousands:'.', decimal:',', allowZero: true});
				
				$("#txtValorFacialRefeicao").maskMoney('mask');
				$("#txtTaxaAtualRefeicao").maskMoney('mask');
				
				atualizaValores();
			});
		
            function validarValorFacialRefeicao() {
                console.log($("#txtValorFacialRefeicao").maskMoney("unmasked")[0]);
                if ($("#txtValorFacialRefeicao").maskMoney("unmasked")[0] < 180) {
                    $("#txtValorFacialRefeicao").val(18000);
                    $("#txtValorFacialRefeicao").maskMoney('mask');
                }
            }
        
            function atualizaValores() {
                
                var totalSemTaxaRefeicao = 0;
                var custototalRefeicao = 0;
                custototalRefeicao = $('#valor-funcionarios').val() * $('#txtValorFacialRefeicao').maskMoney('unmasked')[0];
                totalSemTaxaRefeicao = custototalRefeicao;
                custototalRefeicao *= 1 + ($('#txtTaxaAtualRefeicao').maskMoney('unmasked')[0] / 100);
                                
                var descontoRefeicao = $('#valor-funcionarios').val() > 4 ? -1.2 : 1;
                           
                var custoTotalVRRefeicao;
                if (descontoRefeicao < 0) {
                    custoTotalVRRefeicao = totalSemTaxaRefeicao * (1 + (descontoRefeicao / 100));
                } else {
                    custoTotalVRRefeicao = totalSemTaxaRefeicao + descontoRefeicao;
                }
                
                var economiaMes = custototalRefeicao - custoTotalVRRefeicao;
                $("#valorEconomiaVR").val(economiaMes);
                return economiaMes;
                
            }