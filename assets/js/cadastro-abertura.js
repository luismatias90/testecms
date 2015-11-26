function clearForm(){
	
	$("input, select").each(function(i){
		$(this).val("");
	});
	$('input[type=checkbox]').attr('checked', false);
	$('#uf').val("").change();
	$("#completa-abertura").show();
	
}

function iniciarMunicipios(){
	
		data = estados;				 
		var items = [];
		var options = '<option value="">Selecione o estado</option>';	

		$.each(data, function (key, val) {
			options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
		});					
		$("#uf").html(options);				
		
		$("#uf").change(function () {	
			$('#municipioIbge').val("").trigger("change");

			var uf = "";					
			$("#uf option:selected").each(function () {
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
						
		            	$('#municipioIbge').select2({
		                    placeholder: "Selecione o município",
		                    dropdownAutoWidth: "true",
		                    allowClear: true,
		                    data:{ results: response.data, text: "nome"},
		                    id: function(object) { return object.codIbge; },
		                    formatSelection: format,
		                    formatResult: format,
		                    formatNoMatches: function(term){return "Nenhum registro encontrado"}
		                });
		            	
		            	$("#div-cidades").show();
		            	$("#div-loading-cidades").hide();
		            	
		            	//seleciona as capitais
		            	if(uf == "AC")
							$('#municipioIbge').val("1200401").change();
		            	if(uf == "AL")
							$('#municipioIbge').val("2704302").change();
		            	if(uf == "AM")
							$('#municipioIbge').val("1302603").change();
		            	if(uf == "AP")
							$('#municipioIbge').val("1600303").change();
		            	if(uf == "BA")
							$('#municipioIbge').val("2927408").change();
		            	if(uf == "CE")
							$('#municipioIbge').val("1708254").change();
		            	if(uf == "CE")
							$('#municipioIbge').val("1708254").change();
		            	if(uf == "DF")
							$('#municipioIbge').val("5300108").change();
		            	if(uf == "ES")
							$('#municipioIbge').val("3205309").change();
		            	if(uf == "GO")
							$('#municipioIbge').val("5208707").change();
		            	if(uf == "MA")
							$('#municipioIbge').val("2111300").change();
		            	if(uf == "MG")
							$('#municipioIbge').val("3106200").change();//BH
		            	if(uf == "MT")
							$('#municipioIbge').val("5103403").change();
		            	if(uf == "MS")
							$('#municipioIbge').val("5002704").change();
		            	if(uf == "PA")
							$('#municipioIbge').val("1501402").change();
		            	if(uf == "PB")
							$('#municipioIbge').val("2507507").change();
		            	if(uf == "PE")
							$('#municipioIbge').val("2611606").change();
		            	if(uf == "PI")
							$('#municipioIbge').val("2211001").change();
		            	if(uf == "PR")
							$('#municipioIbge').val("4106902").change();//Ctba
		            	if(uf == "RJ")
							$('#municipioIbge').val("3304557").change();
		            	if(uf == "RN")
							$('#municipioIbge').val("2408102").change();
		            	if(uf == "RO")
							$('#municipioIbge').val("1100205").change();
		            	if(uf == "RR")
							$('#municipioIbge').val("1400100").change();
		            	if(uf == "RS")
							$('#municipioIbge').val("4314902").change();//POA
		            	if(uf == "SC")
							$('#municipioIbge').val("4205407").change();//Floripa
		            	if(uf == "SE")
							$('#municipioIbge').val("2800308").change();
		            	if(uf == "SP")
							$('#municipioIbge').val("3550308").change();//SP
		            	if(uf == "TO")
							$('#municipioIbge').val("1721000").change();
		            	
					}
				});
			}else{
		    	$('#municipioIbge').select2({
		            placeholder: "Selecione o município",
		            dropdownAutoWidth: "true",
		            allowClear: true,
		            data:{ results: [], text: "nome"},
		            formatNoMatches: function(term){return "Nenhum registro encontrado"}
		        });
			}
		});
		
		$('#uf').val("").change();
}

$(document).ready(function() {

		/*****************VALIDAÇÃO FORM ABERTURA********************************/

		var options =  {byPassKeys: [9, 37, 38, 39, 40], onKeyPress: function(tel){
			var masks = ["(00)0000-00009", "(00)00000-0000"];
			mask = (tel.length < 14) ? masks[0] : masks[1];
			$("#form-abertura input[name=telefone]").mask(mask, this);
		}};
		
		$("#form-abertura input[name=telefone]").mask("(00)0000-00009", options);
		
		$("#form-abertura input[name=cpf]").mask('000.000.000-00', {reverse: true});

		$('#form-abertura').validate({
	        rules: {
	            "nomeCompleto": {
	                required: true
	            },
	            "email": {
	                required: true,
	                email: true
	            },
	            "telefone":{
	            	required: true,
	            	validatelefone: true
	            },
	            "cpf":{
	            	required: true,
	            	validacpf: true
	            },
	            "senha":{
	            	required: true
	            }	            
	        },
	        highlight: function(element) {
	            $(element).closest('.form-group').addClass('has-error').removeClass("has-success");
	            $(element).parent().find("span.glyphicon").addClass("glyphicon-remove").removeClass("glyphicon-ok");
	        },
	        unhighlight: function(element) {
	            $(element).closest('.form-group').removeClass('has-error').addClass("has-success");
	            $(element).parent().find("span.glyphicon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
	        },
	        errorElement: 'span',
	        errorClass: 'help-block',
	        errorPlacement: function(error, element) {
	            if(element.parent('.input-group').length) {
	                error.insertAfter(element.parent());
	            } else {
	                error.insertAfter(element);
	            }
	        },
	        submitHandler: function( form ){

	        	var submitButton = $(form).find("[type=submit]");
	        	submitButton.html("<i class=\"fa fa-circle-o-notch fa-spin\"></i> Enviando...");
	        	submitButton.attr("disabled", true);
	        	
	        	var restUrl = baseCadastro + "/rest/public/novologin/criarlogin";

	        	var dados = {};
	        	//CRIAR OBJETO JSON A PARTIR DOS CAMPOS DO FORMULÁRIO
	        	$.each($("#form-abertura").serializeArray(), function(i, field) {
	        	    dados[field.name] = field.value;
	        	});
				
	        	dados['processo'] = 'abertura';
	        	
	        	$("#form-abertura input, #form-abertura select, #form-abertura textarea").attr("disabled", true);
				
	        	var headers = {};
				//COOKIE COM CÓDIGO DE INDICAÇÃO
	        	var ck = $.cookie("ctblz-ref");
				if(ck){
					headers["ctblz-ref"] = ck;
				}
	        	
				httpRequest({
					method: 'POST',
					url: restUrl,
					dataType: "json",
					headers: headers,
					data: JSON.stringify(dados),
					onsuccess: function(response){
						var data = response.data;
						
						// Token apenas se for novo cadastro. Se já existe, redireciona para tela de login para digitar senha
						if(data.token){
							
							var date = new Date();
							date.setTime(date.getTime() + (120 * 1000));//seg * 1000 - valido por 2 min
							
							//var domain = window.location.hostname;
							//domain = domain.replace("www","");
							
							$.cookie("ul", JSON.stringify(data), {expires: date, path: '/', domain: "contabilizei.com.br"});
							
							// Layer criado na página inicial
							try{
								dataLayer.push({
									'event':'pageview',
									'virtualUrl':'/abrir/'
								});
							}catch (e) {
								console.log("erro tag manager", e);
							}
							
							// Garantir que salva o layer
							setTimeout(function(){
								window.location = baseCadastro + "/abrir/";
							}, 500);
							
						} else {
							window.location = baseCadastro + "/abrir/#/?exists=true&email=" + encodeURI(data.email) + "&nome=" + encodeURI(data.nomeCompleto);
						}
						
					},
					onerror: function(response){
						alert("ERRO: " + response.msg);
			        	submitButton.html("Abrir Empresa GRÁTIS");
	        			submitButton.attr("disabled", false);
	        			$("#form-abertura input, #form-abertura select, #form-abertura textarea").attr("disabled", false);
					},
				});

				return false;	        	
	        }

	    });
		
		$("#form-abertura input, #form-abertura select, #form-abertura textarea").on("blur", function(){
			$(this).valid();
		})
		
		$.validator.addMethod('validatelefone', function (value, element, param) {
			return value.match(/\d/g).length == 10 || value.match(/\d/g).length == 11;
		}, "Telefone inválido");

		$.validator.addMethod('validacpf', function (value, element, param) {
		    
			cpf = $(element).val();
			
			return validarCpf(cpf);
		    
		}, 'CPF inválido');
	
});

