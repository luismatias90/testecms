

	$.urlParam = function(name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
		.exec(window.location.href);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

	ref = $.urlParam('ref');

	if (ref == null) {
		ref = $.cookie('ctblz-ref');
	} else {
		$.cookie('ctblz-ref', ref, {
			expires : 1,
			path : '/'
		});
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
							$(".carregando-cupom").html("<span style=\"font-size: 18px\"> <strong>Cupom inválido. Por favor, verifique o código e recarregue a página.</strong></span>");
						} else {
							$(".carregando-cupom").addClass("hide");
							var c = $('#alert-cupom')
							c.children('img').attr('src', resp.imagem)
							c.children('div').html(resp.mensagem);
							c.parent().slideDown();
							
							$("html, body").animate({ scrollTop: 0 }, 0);
						}

					});
		})

	}


