$(document).ready(function(){
	/*****************VALIDAÇÃO FORM MIGRAÇÃO********************************/

	var options =  {byPassKeys: [9, 37, 38, 39, 40], onKeyPress: function(tel){
		var masks = ["(00)0000-00009", "(00)00000-0000"];
		mask = (tel.length < 14) ? masks[0] : masks[1];
		$("#form-migracao input[name=telefone]").mask(mask, this);
	}};
	
	$("#form-migracao input[name=telefone]").mask("(00)0000-00009", options);
	
	$("#form-migracao input[name=cpf]").mask('000.000.000-00', {reverse: true});

	$('#form-migracao').validate({
        rules: {
            "nomeCompleto": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "cpf":{
            	required: true,
            	validacpf: true
            },
            "telefone":{
            	required: true,
            	validatelefone: true
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
        	$.each($("#form-migracao").serializeArray(), function(i, field) {
        	    dados[field.name] = field.value;
        	});
        	
        	dados['processo'] = 'migracao';

        	$("#form-migracao input, #form-migracao select, #form-migracao textarea").attr("disabled", true);
        	
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
					//TOKEN APENAS SE FOR NOVO CADASTRO. SE JÁ EXISTE REDIRECIONA PARA TELA DE LOGIN PARA DIGITAR SENHA
					if(data.token){
						var date = new Date();
						date.setTime(date.getTime() + (120 * 1000));//seg * 1000 - valido por 2 min
						
						//var domain = window.location.hostname;
						//domain = domain.replace("www","");
						
						$.cookie("ul", JSON.stringify(data), {expires: date, path: '/', domain: "contabilizei.com.br"});
						//LAYER CRIADO NA PAGINA INICIAL
						try{
							dataLayer.push({
								'event':'pageview',
								'virtualUrl':'/migrar/'
							});
						}catch (e) {
							console.log("erro tag manager", e);
						}
						//GARANTIR QUE SALVAR LAYER
						setTimeout(function(){
							window.location = baseCadastro + "/migrar/";
						}, 500);
						
					}else{
						window.location = baseCadastro + "/migrar/#/?exists=true&email=" + encodeURI(data.email) + "&nome=" + encodeURI(data.nomeCompleto);
					}
					
				},
				onerror: function(response){
					alert("ERRO: " + response.msg);
		        	submitButton.html("Iniciar Migração");
        			submitButton.attr("disabled", false);
                	$("#form-migracao input, #form-migracao select, #form-migracao textarea").attr("disabled", false);
				},
			});

			return false;
		}        
    });
	
	$("#form-migracao input, #form-migracao select, #form-migracao textarea").on("blur", function(){
		$(this).valid();
	})
	
	$.validator.addMethod('validatelefone', function (value, element, param) {
		return value.match(/\d/g).length == 10 || value.match(/\d/g).length == 11;
	}, "Telefone inválido");

	$.validator.addMethod('validacpf', function (value, element, param) {
	    
	    return validarCpf($(element).val());
	    
	}, 'CPF inválido');
	
});