/**
 * Função que substitui parcialmente o widget do Zendesk, 
 * exibindo um botão de ajuda e um campo de pesquisa que redireciona
 * para http://suporte.contabilizei.com.br já fazendo a pesquisa
 * @since 22.06.2015
 * @author Fábio
 */

//Abre nova janela com query
var pesquisar = function(query){
    	if(query){
    		var urlQuery = query.replace(new RegExp("[ ]", 'g'), "+");
    	window.open("http://suporte.contabilizei.com.br/hc/pt-br/search?utf8=✓&query=" + urlQuery + "&commit=Pesquisa");
	}
};

//oculta botão e exibe caixa de pesquisa
$("#btn-ajuda-fixed .botaoajuda").click(function(e){
	$("#btn-ajuda-fixed .botaoajuda").hide();
	$("#btn-ajuda-fixed .geralajuda .fecharajuda").show();
	
	$("#btn-ajuda-fixed .boxajuda").animate({
		  //height: "toggle",
		  opacity: "toggle",
		  bottom: "-11px"
	}, 400);

});

//fecha caixa de pesquisa
$("#btn-ajuda-fixed .fecharajuda").click(function(e){
	$("#btn-ajuda-fixed .botaoajuda").show();
	$("#btn-ajuda-fixed .geralajuda .fecharajuda").hide();
	$("#btn-ajuda-fixed .geralajuda .boxajuda").hide();
	
	$("#btn-ajuda-fixed .boxajuda").css("bottom", "-25px");
	
	$("#btn-ajuda-fixed input").val("");
});

//identifica "Enter" e faz pesquisa
$("#btn-ajuda-fixed input").keypress(function(event) {
    if (event.which == 13) {
    	var query = event.target.value;
    	pesquisar(query);
    	//console.log(event.target.value);
    }
});
//faz pesquisa a partir do clique na "lupa"
$("#btn-ajuda-fixed .help-search-ajuda").click(function(e){
	var query = $("#btn-ajuda-fixed input").val();
	pesquisar(query);
});
