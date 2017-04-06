idleTime = 0;
$(document).ready(function() {
    //menu fixo
	$('.menu').affix({
        offset: {
        	 top: $('.topo').height()
       	 }
      })
	
	$(document).mousemove(function(e) {
		if(e.clientY <= 5){
		//if(e.pageY <= 5){
	    	exibirModalInscricao();
    	}
	});

    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
});

//detecta a inatividade do mouse
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 0) { // em minutos
    	exibirModalInscricao();
    }
}	    

$('form').live("submit", function(){
	localStorage.setItem("ignorarBlogContabilizei", true);
	$(".modal").modal('hide');
});

$('#ignorarModal').live("click", function(){
	localStorage.setItem("ignorarBlogContabilizei", true);
	$(".modal").modal('hide');
});

function exibirModalInscricao(){
    var ignorarModal = localStorage.getItem("ignorarBlogContabilizei");
    
    if(!ignorarModal){
    	localStorage.setItem("ignorarBlogContabilizei", true);
    	$(".modal").modal('show');
	    	
    }
	
}

