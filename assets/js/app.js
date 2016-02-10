//CONTROLAR DATA E HORARIO LIMITE PARA AGENDAR E SOLICITAR LIGACAO
var today = new Date();
var minDateSolicitacao = new Date();
minDateSolicitacao.setHours(today.getHours() + 3);//+3 hours
var minTimefmt = minDateSolicitacao.getHours() + ":" + (minDateSolicitacao.getMinutes() < 10 ? ("0" + minDateSolicitacao.getMinutes()) : minDateSolicitacao.getMinutes());

$(document).ready(function(){

	$.urlParam = function(name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
		.exec(window.location.href);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

	var error = $.urlParam('error');
	
	if(error){
		
		alert(decodeURIComponent(error));
		//SETA FORMULARIO
		var nomeCompleto = $("form").find("[name=nomeCompleto]");
		var email = $("form").find("[name=email]");
		var telefone = $("form").find("[name=telefone]");
		var cpf = $("form").find("[name=cpf]");
		
		if(nomeCompleto && nomeCompleto.length > 0)
			nomeCompleto.val(decodeURIComponent($.urlParam('nomeCompleto')));
		if(email && email.length > 0)
			email.val(decodeURIComponent($.urlParam('email')));
		if(telefone && telefone.length > 0)
			telefone.val(decodeURIComponent($.urlParam('telefone')));
		if(cpf && cpf.length > 0)
			cpf.val(decodeURIComponent($.urlParam('cpf')));
	}
	
	var options =  {byPassKeys: [9, 37, 38, 39, 40], onKeyPress: function(tel){
		var masks = ["(00)0000-00009", "(00)00000-0000"];
		mask = (tel.length < 14) ? masks[0] : masks[1];
		$("input[name=ligacaofone]").mask(mask, this);
	}};
	
	$("input[name=ligacaofone]").mask("(00)0000-00009", options);

	
	//PARAMETROS DE CONFIGURACAO DO DATETIME PICKER
	var optDatePicker =	{
			 lang:'pt',
			 i18n:{
				 pt:{
					 months:[
					         'Janeiro','Fevereiro','Março','Abril',
					         'Maio','Junho','Julho','Agosto',
					         'Setembro','Outubro','Novembro','Dezembro',
					         ],
			         dayOfWeek:[
			                 "Dom", "Seg", "Ter", "Qua", 
			                 "Qui", "Sex", "Sáb",
			                 ]
				 }
			 },
			 format:'d/m/Y H:i',
			 step: 15,
			 minDate:0,
			 maxTime: "18:01",
			 allowBlank: true,
			 /*closeOnDateSelect: true,*/
			 onGenerate:function( ct ){//DESABILITA FINS DE SEMANA
				 $(this).find('.xdsoft_date.xdsoft_weekend').addClass('xdsoft_disabled');
			 }
			 
	};
	
	var optDatePickerSolicitar = {};
	for(c in optDatePicker){
		optDatePickerSolicitar[c] = optDatePicker[c];
	}
	
	//metodo onchange da solicitacao trata mudanca de data e controla horario minimo permitido
	//no dia atual deve ter intervalor de 3 horas, mas não pode bloquear outros horarios dos dias seguintes
	/*optDatePickerSolicitar.onChangeDateTime = function(currentDateTime){
		if(currentDateTime.getDay() == minDateSolicitacao.getDay() ){
		    this.setOptions({
		      minTime: minTimefmt
		    });
		  }else{
		    this.setOptions(optDatePicker);//reinicia
		  }
	 };*/
	
	var onSelect = function(currentDateTime){
		 // GET CURRENT DATE FROM DATETIMEPICKER IN mm/dd/yyyy FORMAT

		 var d_month = ('0' + (currentDateTime.getMonth()+1)).slice(-2); // ADD LEADING ZERO IF SINGLE DIGIT
		 var d_day = ('0' + (currentDateTime.getDate())).slice(-2);
		 var d_year = currentDateTime.getFullYear();
		 var d = d_month + "/" + d_day + "/" + d_year;

		 // GET USER CURRENT DATE VIA JAVASCRIPT IN mm/dd/yyyy FORMAT
		 Date.prototype.mmddyyyy = function() {
			 var yyyy = this.getFullYear().toString();
			 var mm = (this.getMonth()+1).toString(); // getMonth() IS ZERO-BASED
			 var dd = this.getDate().toString();
			 return (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]) + "/" + yyyy;
		 };

		 var today_d = new Date();

		 // CHECK WHETHER THE TWO MATCH

		 if ( d == today_d.mmddyyyy() ) {
			 this.setOptions({
				 minTime: minTimefmt
			 });
		 } else {
			 this.setOptions({
				 minTime: '09:00'
			 });
		 }
	}
	
	optDatePickerSolicitar.onSelectDate = onSelect;
	optDatePickerSolicitar.minTime = minTimefmt;
	
	$('input[name=ligacaodata]').mask('00/00/0000 00:00');
	$('input[name=ligacaodata]').datetimepicker(optDatePickerSolicitar);
	
});

//VALIDAR SE DATA É PERMITIDA PARA AGENDAMENTO OU SOLICITAÇÃO DE LIGAÇÃO
function validarDataLigacao(data){
	
	var msgErro = "Por favor, verifique a data e hora informados. Atendimento de segunda a sexta das 09:00 às 12:00 e das 13:00 às 18:00";
	
	if(data.getDay() == 0 || data.getDay() == 6){//DOMINGO OU SABADO
		return msgErro;
	}
	//ENTRE 9:00 E 12:00
	if(data.getHours() < 9 || (data.getHours() == 12 && data.getMinutes() > 0)){
		return msgErro;
	}else if(data.getHours() > 18 || (data.getHours() == 18 && data.getMinutes() > 0)){//ENTRE 13:00 E 18:00
		return msgErro;
	}

	if(data < minDateSolicitacao){//MÍNIMO DE 3 HORAS DE ANTECEDÊNCIA
		return msgErro;
	}
	
	return "";//valido
}

//ligamos para você
$('#solicitar-ligacao').on("click", function(){
	
	if($('input[name=ligacaonome]').val() == "" || $('input[name=ligacaofone]').val() == "" 
		|| $('input[name=ligacaodata]').val() == "" || $('input[name=ligacaoemail]').val() == ""){
		alert("Por favor, preencha todos os campos");
		return false;
	}
	//montar data valida
	var dtStr = $('input[name=ligacaodata]').val();
	var data = null;
	if(dtStr){
		var dtfull = dtStr.split(" ");
		var dt = dtfull[0].split("/");
		var hr = dtfull[1].split(":");
		
		data = new Date(dt[2], dt[1] - 1, dt[0], hr[0], hr[1], 0, 0);
	}
	var dataHoraLigacao = data;
	
	//verificar se está dentro do dia/horari permitidos
	var msgErro = validarDataLigacao(dataHoraLigacao, "SOLICITACAO");
	if(msgErro != ""){
		alert(msgErro);
		return false;
	}
	
	var restUrl = baseUrl + "/receberligacao";

	restUrl += 
		"?ligacaonome=" + $('input[name=ligacaonome]').val() + 
		"&ligacaofone=" + $('input[name=ligacaofone]').val() + 
		"&ligacaodata=" + $('input[name=ligacaodata]').val() + 
		"&ligacaoemail=" + $('input[name=ligacaoemail]').val(); 
	
	$("#enviando-ligacao").show();
	
	httpRequest({
		method: 'GET',
		url: restUrl,
		dataType: "json",
		onsuccess: function(response){
			var data = $.parseJSON(response.data);
			if(data.error == 0){
				$('input[name=ligacaonome]').val("");
				$('input[name=ligacaofone]').val("");
				$('input[name=ligacaodata]').val("");
				$('#modal-ligacao').modal('hide');
			}
			$("#enviando-ligacao").hide();
			
			alert(data.msg);
		},
		onerror: function(response){
			$("#enviando-ligacao").hide();
			alert("ERRO:"+response.msg);
		},
	});
});	

//AJAX
function httpRequest(param){
	if(!param.async)
		param.async = true;
  
  	var xhr = new XMLHttpRequest();

  	//chrome, firefox
  	var xmlRequest = true;
  
  	if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
	  	xhr.open(param.method, param.url, param.async);
  	} else if (typeof XDomainRequest != "undefined") {
	  	// XDomainRequest for IE.
	  	xhr = new XDomainRequest();
	  	xhr.open(param.method, param.url, param.async);
	  	xmlRequest = false;
  	} else {
	  	// CORS not supported.
	  	xhr = null;
 	}
  	
  	if(xhr) {
  		
  		//headers
  		if(param.headers){
  			for(var name in param.headers){
  				xhr.setRequestHeader(name, param.headers[name]);  				
  			}
  		}
  		
	  	// Response handlers.
	  	xhr.onload = function() {
		  	var response;
		  	
		  	try{
				response = JSON.parse(xhr.responseText);  		
		  	}catch(err){
		  		response = xhr.responseText;
		  	}
		  	
		 	if(xhr.status < 400 && param.onsuccess){
			  	param.onsuccess({status: xhr.status, data: response});
		 	}else if(xhr.status >= 400 && param.onerror){
			  	param.onerror({status: xhr.status, msg: response});
		 	}
	  	};

	  	xhr.onerror = function() {
		  	if(param.onerror)
			  	param.onerror();
	  	};
	  	
	  	if((param.dataType === 'json') && (xmlRequest == true))
		  	xhr.setRequestHeader('Content-Type', 'application/json');
	  
	  	xhr.send(param.data);
  	}
  
 	// return xhr;

}

function validarCpf(value){
	cpf = value.replace(/[^\d]+/g,'');
	 
    if(cpf == '') return false;
 
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
        return false;
     
    // Valida 1o digito
    add = 0;
    for (i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
     
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
         
    return true;
}
function validarCNPJ(value){
    cnpj = value.replace(/[^\d]+/g,'');
         
		 
		    if(cnpj == '') return false;
		     
		    if (cnpj.length != 14)
		        return false;
		 
		    // Elimina CNPJs invalidos conhecidos
		    if (cnpj == "00000000000000" || 
		        cnpj == "11111111111111" || 
		        cnpj == "22222222222222" || 
		        cnpj == "33333333333333" || 
		        cnpj == "44444444444444" || 
		        cnpj == "55555555555555" || 
		        cnpj == "66666666666666" || 
		        cnpj == "77777777777777" || 
		        cnpj == "88888888888888" || 
		        cnpj == "99999999999999")
		        return false;
		         
		    // Valida DVs
		    tamanho = cnpj.length - 2
		    numeros = cnpj.substring(0,tamanho);
		    digitos = cnpj.substring(tamanho);
		    soma = 0;
		    pos = tamanho - 7;
		    for (i = tamanho; i >= 1; i--) {
		      soma += numeros.charAt(tamanho - i) * pos--;
		      if (pos < 2)
		            pos = 9;
		    }
		    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		    if (resultado != digitos.charAt(0))
		        return false;
		         
		    tamanho = tamanho + 1;
		    numeros = cnpj.substring(0,tamanho);
		    soma = 0;
		    pos = tamanho - 7;
		    for (i = tamanho; i >= 1; i--) {
		      soma += numeros.charAt(tamanho - i) * pos--;
		      if (pos < 2)
		            pos = 9;
		    }
		    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		    if (resultado != digitos.charAt(1))
		          return false;
		           
		    return true;
}
