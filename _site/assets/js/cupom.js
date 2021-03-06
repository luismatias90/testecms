

	$.urlParam = function(name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

	ref = $.urlParam('ref');

// ---------------------------
// Tratamento de ref indicação enviados incorretamente
// ---------------------------
	if(ref && ref.indexOf("contabilizei.com.br") > -1){
		var results = new RegExp('[\\?&]ref=([^&#]*)').exec(ref);
		if (results != null) {
			ref = results[1] || 0;
		}
	}

	if (ref == null) {
		try{
			$.cookie.json = true;
	} catch(e){

	}

		ref = $.cookie('ctblz-ref');
		try{
			$.cookie.json = false;
	} catch(e){

	}
	}

	if (ref != null) {
		
		$(".carregando-cupom").removeClass("hide");
		
			removeCupom = function() {
				$.removeCookie('ctblz-ref', {
					path : '/'
				});
				$('#indicacao').val('');
				$('#indicacao-msg span').html('');
				$('#indicacao-msg, #alert-cupom').hide();
			}
			
	// ---------------------------
	// Processa o resultado
	// ---------------------------
	processa = function(resp) {
		// ---------------------------
		// Armazena em cookie apenas se a indicação for válida
		// ---------------------------
							$.cookie('ctblz-ref', ref, {
								expires : 60,
								path : '/'
							});

							$(".carregando-cupom").addClass("hide");
							var c = $('#alert-cupom')
		c.find('div.img-indicacao img').attr('src', "../assets/img/indicacao.png")
		c.find('div.text-indicacao').html("<strong>Você foi indicado por " + resp.nome + " :)</strong>");

		$('.nome-indicador').html("Indicação de "+ resp.nome);
		$('.fnome-indicador').html(resp.nome.split(" ")[0]);

							c.parent().slideDown();
							
							$("html, body").animate({ scrollTop: 0 }, 0);
						}

	// ---------------------------
	// vai buscar o ref primeiro no pré-cadastro
	// ---------------------------
	$.ajax({
		method : "GET",
		url : baseCadastro + "/rest/public/importacao/validarindicacao/"+ref,
	}).done(function(resp) {

		// ---------------------------
		// Processa em caso de sucesso
		// ---------------------------
		if (resp) {
			processa(resp);
		} else {
			// ---------------------------
			// Se deu erro então busca na plataforma
			// ---------------------------
			$.ajax({
				method : "GET",
				url : baseApp + "/rest/public/indicacao/validar/"+ref,
			}).done(function(resp) {

				// ---------------------------
				// Processa em caso de sucesso
				// ---------------------------
				if (resp) {
					processa(resp);
				} else {
					// ---------------------------
					// Não encontrou o código de referência
					// ---------------------------
					removeCupom();
					$(".carregando-cupom").html("<span style=\"font-size: 18px\"> <strong>Código inválido. Por favor, verifique e recarregue a página.</strong></span>");
				}
					});
	}

	});

}