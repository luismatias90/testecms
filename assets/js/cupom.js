

	$.urlParam = function(name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

	ref = $.urlParam('ref');
	//tratamento de ref indicação enviados incorretamente
	if(ref && ref.indexOf("contabilizei.com.br") > -1){
		var results = new RegExp('[\\?&]ref=([^&#]*)').exec(ref);
		if (results != null) {
			ref = results[1] || 0;
		}
	}

	if (ref == null) {
		try{
			$.cookie.json = true;
		}catch(e){}
		ref = $.cookie('ctblz-ref');
		try{
			$.cookie.json = false;
		}catch(e){}
	}

	if (ref != null) {
		
		$(".carregando-cupom").removeClass("hide");
		
		addGapiCallBack(function() {
			
			removeCupom = function() {
				$.removeCookie('ctblz-ref', {
					path : '/'
				});
				$('#indicacao').val('');
				$('#indicacao-msg span').html('');
				$('#indicacao-msg, #alert-cupom').hide();
			}
			
			
			gapi.client.contabilizei.cupom.valida({
				'id' : ref
			}).execute(
					function(resp) {
						
						if (resp.id == "-1" || !resp.ativo) {
							removeCupom();
							$(".carregando-cupom").html("<span style=\"font-size: 18px\"> <strong>Código inválido. Por favor, verifique e recarregue a página.</strong></span>");
						} else {
							//ARMAZENA COOKIE APENAS SE INDICAÇÃO FOR VÁLIDA	
							$.cookie('ctblz-ref', ref, {
								expires : 7,
								path : '/'
							});

							$(".carregando-cupom").addClass("hide");
							var c = $('#alert-cupom')
							c.find('div.img-indicacao img').attr('src', resp.imagem)
							c.find('div.text-indicacao').html(resp.mensagem);
							$('.nome-indicador').html(resp.nome);
							var fnome = resp.nome;
							$('.fnome-indicador').html(fnome.split(" ")[0]);
							//c.parent().removeClass("hide");
							c.parent().slideDown();
							
							$("html, body").animate({ scrollTop: 0 }, 0);
						}

					});
		})

	}


