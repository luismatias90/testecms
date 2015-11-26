function clearForm(){
	
	$("input, select").each(function(i){
		$(this).val("");
	});
	$('input[type=checkbox]').attr('checked', false);

	$('#estados').val("").change();

	$("#agenda-ligacao").hide();
	$("#input-ligacao").hide();
	$("#completa-abertura").show();
	
}

function iniciarMunicipios(){
	
		data = estados;				 
		var items = [];
		var options = '<option value="">Selecione o estado</option>';	

		$.each(data, function (key, val) {
			options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
		});					
		$("#estados").html(options);				
		
		$("#estados").change(function () {	
			$('#cidades').val("").trigger("change");

			var uf = "";					
			$("#estados option:selected").each(function () {
				uf += $(this).val();//sigla uf
			});
			
			if(uf != ""){
				
				var restUrl = baseApp + "/rest/public/municipio/list";
				restUrl += "/"+uf;
				
	        	$("#div-cidades").hide();
	        	$("#div-loading-cidades").show();
	
				httpRequest({
					method: 'GET',
					url: restUrl,
					async: true,
					dataType: "json",
					onsuccess: function(response){
						//console.log(response);
			        	function format(item) {
			    			return item.nome; 
			    		};
						
		            	$('#cidades').select2({
		                    placeholder: "Selecione o município",
		                    dropdownAutoWidth: "true",
		                    allowClear: true,
		                    data:{ results: response, text: "nome"},
		                    id: function(object) { return object.codIbge; },
		                    formatSelection: format,
		                    formatResult: format,
		                    formatNoMatches: function(term){return "Nenhum registro encontrado"}
		                });
		            	
		            	$("#div-cidades").show();
		            	$("#div-loading-cidades").hide();
		            	
		            	//seleciona as capitais
		            	if(uf == "AC")
							$('#cidades').val("1200401").change();
		            	if(uf == "AL")
							$('#cidades').val("2704302").change();
		            	if(uf == "AM")
							$('#cidades').val("1302603").change();
		            	if(uf == "AP")
							$('#cidades').val("1600303").change();
		            	if(uf == "BA")
							$('#cidades').val("2927408").change();
		            	if(uf == "CE")
							$('#cidades').val("1708254").change();
		            	if(uf == "CE")
							$('#cidades').val("1708254").change();
		            	if(uf == "DF")
							$('#cidades').val("5300108").change();
		            	if(uf == "ES")
							$('#cidades').val("3205309").change();
		            	if(uf == "GO")
							$('#cidades').val("5208707").change();
		            	if(uf == "MA")
							$('#cidades').val("2111300").change();
		            	if(uf == "MG")
							$('#cidades').val("3106200").change();//BH
		            	if(uf == "MT")
							$('#cidades').val("5103403").change();
		            	if(uf == "MS")
							$('#cidades').val("5002704").change();
		            	if(uf == "PA")
							$('#cidades').val("1501402").change();
		            	if(uf == "PB")
							$('#cidades').val("2507507").change();
		            	if(uf == "PE")
							$('#cidades').val("2611606").change();
		            	if(uf == "PI")
							$('#cidades').val("2211001").change();
		            	if(uf == "PR")
							$('#cidades').val("4106902").change();//Ctba
		            	if(uf == "RJ")
							$('#cidades').val("3304557").change();
		            	if(uf == "RN")
							$('#cidades').val("2408102").change();
		            	if(uf == "RO")
							$('#cidades').val("1100205").change();
		            	if(uf == "RR")
							$('#cidades').val("1400100").change();
		            	if(uf == "RS")
							$('#cidades').val("4314902").change();//POA
		            	if(uf == "SC")
							$('#cidades').val("4205407").change();//Floripa
		            	if(uf == "SE")
							$('#cidades').val("2800308").change();
		            	if(uf == "SP")
							$('#cidades').val("3550308").change();//SP
		            	if(uf == "TO")
							$('#cidades').val("1721000").change();
		            	
					}
				});
			}else{
		    	$('#cidades').select2({
		            placeholder: "Selecione o município",
		            dropdownAutoWidth: "true",
		            allowClear: true,
		            data:{ results: [], text: "nome"},
		            formatNoMatches: function(term){return "Nenhum registro encontrado"}
		        });
			}
		});
		
		$('#estados').val("").change();
}

/*$(".btn-selecionar-plano").live("click", function(e){
	$("select[name=planoabertura]").val($(this).attr("data-value"));
});
*/

$(document).ready(function() {

	iniciarMunicipios();
	
	$('#completa-abertura, #agenda-ligacao').click(function() {
		
		$('#modal-enviando').modal('show');
		
		var lead = {
				nome: $('#nome').val(),
				telefone : $('#telefonecontato').val(),
				email : $('#email').val(),
				cpf : $('#cpf').val(),
				segmentoEmpresa : $('#segmento').val(),
				municipio : $("#cidades").select2('data') != null ? $("#cidades").select2('data').nome : null,
				municipioIbge : $("#cidades").select2('data') != null ? $("#cidades").select2('data').codIbge : null,
				uf: $('#estados').val(),
				receberLigacao: false,
				abertura: true,
				planoAbertura: "ABERTURA_GRATIS"
				//planoAbertura: $("#planoabertura").val()
			};
			
		if($("#receberligacao").is(":checked")){

			lead.receberLigacao = true;
			lead.telefone = $('#telefonecontato').val();
			
			//montar data valida
			var dtStr = $('#data').val();
			var data = null;
			if(dtStr){
				var dtfull = dtStr.split(" ");
				var dt = dtfull[0].split("/");
				var hr = dtfull[1].split(":");
				
				data = new Date(dt[2], dt[1] - 1, dt[0], hr[0], hr[1], 0, 0);
			}else{
				alert("Por favor, informe a data e hora.");
				$('#modal-enviando').modal('hide');
				return false;
			}
			lead.dataHoraLigacao = data;
			//VALIDAR DATA E HORARIO DA LIGACAO
			var msgErro = validarDataLigacao(lead.dataHoraLigacao, "AGENDAMENTO");
			if(msgErro != ""){
				alert(msgErro);
				$('#modal-enviando').modal('hide');
				return false;
			}
		}

		enviaProposta(lead);
	});

});

function enviaProposta(lead) {
	
	var proposta = {};

	for (c in lead) {
		if (lead[c] == undefined || lead[c] == null || lead[c].length == 0) {
			$('#modal-enviando').modal('hide');
			//$('.modal-body, .modal-loading, .modal-footer, .modal-header').toggle();
			alert('Ops... preencha todos campos para prosseguirmos.');
			$('#' + c).focus();
			return false;
		} else {
			proposta[c] = lead[c];
		}
	}
	
	if(ref)
		proposta.refIndicacao = ref;
	
	//exportando para sistema de abertura...
	gapi.client.contabilizei.interessado.exportar(proposta).execute(function(resp) {
		if(resp.message){
			alert(resp.message);
			
			$('#modal-enviando').modal('hide');
			return false;
		}
		
		if(resp.receberLigacao == false && resp.situacao == "ACEITO"){
			
			dataLayer.push({
				  'event':'pageview',
				  'virtualUrl':'/abrir/'
			});
					
			setTimeout(function(){
				window.location.href = baseCadastro + "/abrir/#/login/"+resp.email+"/"+resp.cpf;
			}, 2000);

		}else{
			if(resp.situacao == "LIGACAO_SOLICITADA"){
				$("#modal-confirmacao .modal-header h3").html("<i class=\"icon-calendar\"></i> Contato agendado com sucesso!");
				
				$("#modal-confirmacao .modal-body").html(
		           	"<h4>Confira os próximos passos:</h4>"+
		            "<h5>1. E-mail confirmação</h5>"+
		            "<p>Você receberá um e-mail confirmando seu cadastro.</p>" +
		            "<h5>2. Contato na data e horário agendado</h5>"+
		            "<p>Entraremos em contato com você na data e horário indicado para iniciarmos o processo de transferência de escritório contábil.</p>"
	            );
			}else{
				
				var motivo = " não atendemos o segmento de atuação da sua empresa ";
				if(resp.situacao == "MUNICIPIO_NAO_ATENDIDO"){
					motivo = " não atendemos sua cidade ";
				}
				
				$("#modal-confirmacao .modal-header h3").html("Ops");
				
				$("#modal-confirmacao .modal-body").html(
		            "<p>Infelizmente " + motivo + "no momento.</p>" +
		            "<p>Recebemos seu cadastro e entraremos em contato em breve com novidades.</p>" +
		            "<p>Obrigado :)</p>"
	            );
			}

			$('#modal-enviando').modal('hide');
			$("#modal-confirmacao").modal('show');
			//reiniciar
			clearForm();
			localStorage.removeItem('proposta');
			$.removeCookie('ctblz-ref');
		}
	
	});
			

	return false;
}
