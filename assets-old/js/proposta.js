function clearForm(){
	
	$("input, select").each(function(i){
		$(this).val("");
	});
	$('input[type=checkbox]').attr('checked', false);

	$("#agenda-ligacao").hide();
	$("#input-ligacao").hide();
	$("#completa-migracao").show();
	
}

function enviaProposta(lead) {
	var proposta = {};
	
	for (c in lead) {
		if (lead[c] == undefined || lead[c] == null || lead[c].length == 0) {
			$('#modal-enviando').modal('hide');
			alert('Ops... preencha todos campos para prosseguirmos.');
			$('#' + c).focus();
			return false;
		} else {
			proposta[c] = lead[c];
		}
	}
	
	if(ref)
		proposta.refIndicacao = ref;
	
	//exportando
	gapi.client.contabilizei.interessado.exportar(proposta).execute(function(resp) {
		if(resp.message){
			alert(resp.message);
			
			console.log(resp);
			$('#modal-enviando').modal('hide');
			return false;
		}
		
		localStorage.setItem('proposta', JSON.stringify(resp));
		
		if(resp.receberLigacao == false && resp.situacao == "ACEITO"){
			
			dataLayer.push({
			  'event':'pageview',
			  'virtualUrl':'/migrar/'
			});
				
			setTimeout(function(){
				window.location.href = baseCadastro + "/migrar/#/login/"+resp.email+"/"+resp.cpf;
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
				$("#modal-confirmacao .modal-header h3").html("Ops");
				
				$("#modal-confirmacao .modal-body").html(
		            "<p>Infelizmente não atendemos o segmento de atuação da sua empresa no momento.</p>" +
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
	
}

function verPreco(){
	
	var numSocio = $('#preco-numsocio').val();
	var numFunc = $('#preco-numfuncionario').val();
	var segmento = $('#preco-segmentoempresa').val();
	
	if(!numFunc) numFunc = 0;
	
	if(!numSocio){
		alert("Por favor, informe o número de sócios incluindo você");
		return false;
	}
	
	var preco = 149.90;
	var adicional = 49.90;
	
	var valorTotal = 0;
	var valorAdicional = 0;
	
	if(segmento == "SERVICO"){
		
		if(numSocio > 2)
			valorAdicional = (numSocio - 2) * adicional;
		
		valorAdicional = valorAdicional + (numFunc * adicional);
		valorTotal = preco + valorAdicional;
		
		var str = valorTotal.toFixed(2).toString().split(".");
		var precoStr = str[0];
		var fracaoStr = str[1];
		
		if(!fracaoStr || fracaoStr.length == 1)
			fracaoStr += "0";
		
		$("#modal-preco .preco").html(precoStr);
		$("#modal-preco .noventa").html(","+fracaoStr+"*");

		$("#modal-preco .modal-header h3").html("O valor da mensalidade para sua empresa será");
		$("#detalhe-nao-prestador").hide();
		$("#detalhe-preco").show();
		
	}else{
		$("#modal-preco .modal-header h3").html("Contabilizei contabilidade online");
		$("#detalhe-nao-prestador").show();
		$("#detalhe-preco").hide();
	}
	$('#modal-preco').modal('show');
	
	
}

$("#btn-ver-preco").live("click",function(e){
	verPreco();
});

$(".btn-migrar-preco").live("click", function(e){
	window.location.href = "/#contabilidade";
	$('#modal-preco').modal('hide');
});

addGapiCallBack(function() {
	$('#completa-migracao, #agenda-ligacao').click(function() {
		
		$('#modal-enviando').modal('show');
		
		var lead = {
			nome: $('#nome').val(),
			email : $('#email').val(),
			telefone : $('#telefonecontato').val(),
			cpf : $('#cpf').val(),
			cnpj : $('#cnpj').val(),
			funcionarios : $('#funcionarios').val(),
			socios : $('#socios').val(),
			segmentoEmpresa : $('#segmento').val(),
			receberLigacao: false
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
			
			//verificar se está dentro do dia/horari permitidos
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