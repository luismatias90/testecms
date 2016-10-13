$(document).ready(function(){
	/*****************VALIDAÇÃO FORM MIGRAÇÃO********************************/

	var options =  {byPassKeys: [9, 37, 38, 39, 40], onKeyPress: function(tel){
		var masks = ["(00)0000-00009", "(00)00000-0000"];
		mask = (tel.length < 14) ? masks[0] : masks[1];
		$("#form-migracao input[name=telefone]").mask(mask, this);
	}};
	
	$("#form-migracao input[name=telefone]").mask("(00)0000-00009", options);
	
	$("#form-migracao input[name=cpf]").mask('000.000.000-00', {reverse: true});
    
    $("#form-migracao input[name=cnpj]").mask('00.000.000/0000-00', {reverse: true});

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
            "cnpj":{
            	required: true,
            	validacnpj: true
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
        	
        	var submitButton = $(form).find("button");
        	submitButton.html("<i class=\"fa fa-circle-o-notch fa-spin\"></i> Enviando...");
        	submitButton.attr("disabled", true);

			//LAYER CRIADO NA PAGINA INICIAL
			try{
				dataLayer.push({
					'event':'pageview',
					'virtualUrl':'/migrar/'
				});
			}catch (e) {
				console.log("erro tag manager", e);
			}

			$("#form-migracao input, #form-migracao select, #form-migracao textarea").attr("readonly", true);
        	//se é migracao ou abertura
        	var processo = $(form).find("[name=processo]");
        	
        	if(!processo || processo.length == 0){
        		var input = document.createElement('input');
        		input.type = 'hidden';
        	    input.name = "processo";
        	    input.value = "migracao";
        	    form.appendChild(input);	        		
        	}
            
            var fonteOrigem = $.cookie("fonteOrigem");
	        	
	        if(fonteOrigem){
	           var input = document.createElement('input');
	           input.type = 'hidden';
	           input.name = "origem";
	           input.value = fonteOrigem;
	           form.appendChild(input);	        		
	        }
        	
        	var refIndicacao = $.cookie('ctblz-ref');
        	if(refIndicacao){
        		var input = document.createElement('input');
        		input.type = 'hidden';
        	    input.name = "refindicacao";
        	    input.value = refIndicacao;
        	    form.appendChild(input);	        		
        	}

			return true;
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
    
    $.validator.addMethod('validacnpj', function (value, element, param) {
	    
	    return validarCNPJ($(element).val());
	    
	}, 'CNPJ inválido');
	
	$("#btn-iniciar-migracao").click(function(){
		$('#form-migracao').attr("action", "https://contabilizei-precadastro.appspot.com/" + "/rest/public/integracaoMigracao/informacoesLogin");
		$('#form-migracao').submit();
	});
	
});