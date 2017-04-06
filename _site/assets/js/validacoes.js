$(function() {
	var cidadeAtendida;
	var servicoAtendido;
	
	$("ul#cidades.dropdown-menu li a").on('click' , function () {
		cidadeAtendida = $(this).data('cidade-atendida');
		if (!cidadeAtendida) {
			$("#selectServico").attr("disabled", true);
		} else {
			$("#selectServico").removeAttr("disabled");
		}
		
		$("#selectCidade").html($(this).html() + ' <span class="caret"></span>');
		atendemos();
	});
	
	$("ul#servicos.dropdown-menu li a").on('click' , function () {
		
		servicoAtendido = $(this).data('servico-atendido');		
		$("#selectServico").html($(this).html() + ' <span class="caret"></span>');
		atendemos();
	});
	
	function atendemos() {
	
		if (cidadeAtendida == false && servicoAtendido == undefined) {
			$(".cadastroleadok").hide();
			$(".cadastrolead").show();
			$("#selectServico").removeClass('dropdowndes');
		} else if (cidadeAtendida == undefined && servicoAtendido == false) {
			$(".cadastroleadok").hide();
			$(".cadastrolead").show();
			$("#selectServico").removeClass('dropdowndes');
		}
		else if (cidadeAtendida && servicoAtendido) {
			$(".cadastroleadok").show();
			$(".cadastrolead").hide();
			$("#selectServico").removeClass('dropdowndes');
		}
		else if (cidadeAtendida && servicoAtendido === false) {
			$(".cadastroleadok").hide();
			$(".cadastrolead").show();
			$("#selectServico").removeClass('dropdowndes');
		}
		else if (servicoAtendido && cidadeAtendida === false) {
			$(".cadastroleadok").hide();
			$(".cadastrolead").show();
			$("#selectServico").removeClass('dropdowndes');
		}
	}
});