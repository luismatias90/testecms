//CONTROLAR DATA E HORARIO LIMITE PARA AGENDAR E SOLICITAR LIGACAO
var today = new Date();
var minDateAgendamento = new Date();
minDateAgendamento.setDate(today.getDate() + 1);//tomorrow
var minDatefmt = minDateAgendamento.getFullYear() + "/" + (minDateAgendamento.getMonth()+1) + "/" + minDateAgendamento.getDate()

var minDateSolicitacao = new Date();
minDateSolicitacao.setHours(today.getHours() + 3);//+3 hours
var minTimefmt = minDateSolicitacao.getHours() + ":" + (minDateSolicitacao.getMinutes() < 10 ? ("0" + minDateSolicitacao.getMinutes()) : minDateSolicitacao.getMinutes());

$(document).ready(function(){

	$("#receberligacao").live("change", function(){
		$("#agenda-ligacao").toggle();
		$("#input-ligacao").toggle();
		$("#completa-migracao").toggle();
		$("#completa-abertura").toggle();
	});
	$("input[name=cnpj]").mask('00.000.000/0000-00', {reverse: true});
	$("input[name=cpf]").mask('000.000.000-00', {reverse: true});

	var options =  {byPassKeys: [9, 37, 38, 39, 40], onKeyPress: function(tel){
		var masks = ["(00)0000-00009", "(00)00000-0000"];
		mask = (tel.length < 14) ? masks[0] : masks[1];
		$("input[name=ligacaofone], input[name=telefonecontato]").mask(mask, this);
	}};
	
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
			 allowBlank: true
			 
	};
	
	var optDatePickerSolicitar = {};
	var optDatePickerAgendar = {};
	for(c in optDatePicker){
		optDatePickerSolicitar[c] = optDatePicker[c];
		optDatePickerAgendar[c] = optDatePicker[c];
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
		 var d_day = currentDateTime.getDate();
		 var d_year = currentDateTime.getFullYear();
		 var d = d_month + "/" + d_day + "/" + d_year;

		 // GET USER CURRENT DATE VIA JAVASCRIPT IN mm/dd/yyyy FORMAT

		 Date.prototype.yyyymmdd = function() {
			 var yyyy = this.getFullYear().toString();
			 var mm = (this.getMonth()+1).toString(); // getMonth() IS ZERO-BASED
			 var dd = this.getDate().toString();
			 return (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]) + "/" + yyyy;
		 };

		 var today_d = new Date();

		 // CHECK WHETHER THE TWO MATCH

		 if ( d == today_d.yyyymmdd() ) {
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
	optDatePickerAgendar.onSelectDate = onSelect;
	 
	optDatePickerSolicitar.minTime = minTimefmt;
	optDatePickerAgendar.minTime = minTimefmt;
	optDatePickerAgendar.minDate = minDatefmt;
	//optDatePickerAgendar.minTime = '23:59';
	
	$("input[name=ligacaofone], input[name=telefonecontato]").mask("(00)0000-00009", options);
	$('input[name=data], input[name=ligacaodata]').mask('00/00/0000 00:00');
	$('input[name=ligacaodata]').datetimepicker(optDatePickerSolicitar);
	$('input[name=data]').datetimepicker(optDatePickerAgendar);
	
});

//VALIDAR SE DATA É PERMITIDA PARA AGENDAMENTO OU SOLICITAÇÃO DE LIGAÇÃO
function validarDataLigacao(data, tipo){//tipo = "SOLICITACAO" OU "AGENDAMENTO"
	
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

	if(tipo == "SOLICITACAO" && data < minDateSolicitacao){//MÍNIMO DE 3 HORAS DE ANTECEDÊNCIA
		return msgErro;
	}
	
	if(tipo == "AGENDAMENTO" && data < minDateAgendamento){//MÍNIMO DE 1 DIA DE ANTECEDÊNCIA
		return msgErro;
	}
	
	return "";//valido
}

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
		  // Response handlers.
		  xhr.onload = function() {
			  var text = xhr.responseText;
			
			  if(param.onsuccess)
				  param.onsuccess.call(window, JSON.parse(text));
		    
		  };

		  xhr.onerror = function() {
			  if(param.onerror)
				  param.onerror.call(window);
		  };
		  if((param.dataType === 'json') && (xmlRequest == true))
			  xhr.setRequestHeader('Content-Type', 'application/json');
		  
		  xhr.send(param.data);
	  }
	  
	 // return xhr;
	
}

//ligamos para você
$('#solicitar-ligacao').live("click", function(){
	
	if($('input[name=ligacaonome]').val() == "" || $('input[name=ligacaofone]').val() == "" || $('input[name=ligacaodata]').val() == ""){
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

	restUrl += "?ligacaonome="+$('input[name=ligacaonome]').val()+"&ligacaofone="+$('input[name=ligacaofone]').val()+"&ligacaodata="+$('input[name=ligacaodata]').val(); 
	
	$("#enviando-ligacao").show();
	
	httpRequest({
		method: 'GET',
		url: restUrl,
		dataType: "json",
		onsuccess: function(response){
			var data = $.parseJSON(response);
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
