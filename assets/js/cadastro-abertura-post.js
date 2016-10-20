function clearForm() {

    $("input, select").each(function (i) {
        $(this).val("");
    });
    $('input[type=checkbox]').attr('checked', false);
    $('#uf').val("").change();
    $("#completa-abertura").show();

}

$(document).ready(function () {

    /*****************VALIDAÇÃO FORM ABERTURA********************************/

    var options = {
        byPassKeys: [9, 37, 38, 39, 40],
        onKeyPress: function (tel) {
            var masks = ["(00)0000-00009", "(00)00000-0000"];
            mask = (tel.length < 14) ? masks[0] : masks[1];
            $("#form-abertura input[name=telefone]").mask(mask, this);
        }
    };

    $("#form-abertura input[name=telefone]").mask("(00)0000-00009", options);

    $("#form-abertura input[name=cpf]").mask('000.000.000-00', {
        reverse: true
    });

    $('#form-abertura').validate({
        rules: {
            "nomeCompleto": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "telefone": {
                required: true,
                validatelefone: true
            },
            "cpf": {
                required: true,
                validacpf: true
            },
            "senha": {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error').removeClass("has-success");
            $(element).parent().find("span.glyphicon").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass("has-success");
            $(element).parent().find("span.glyphicon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {

            var submitButton = $(form).find("button");
            submitButton.html("<i class=\"fa fa-circle-o-notch fa-spin\"></i> Enviando...");
            submitButton.attr("disabled", true);


            // Layer criado na página inicial
            try {
                dataLayer.push({
                    'event': 'pageview',
                    'virtualUrl': '/abrir/'
                });
            } catch (e) {
                console.log("erro tag manager", e);
            }

            $("#form-abertura input, #form-abertura select, #form-abertura textarea").attr("readonly", true);

            var processo = $(form).find("[name=processo]");

            if (!processo || processo.length == 0) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = "processo";
                input.value = "abertura";
                form.appendChild(input);
            }
            
            var fonteOrigem = $.cookie("fonteOrigem");

            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = "origem";

            if (fonteOrigem) {
                input.value = fonteOrigem;
            } else {
                input.value = "Incapaz de acessar informação fonte origem";
            }

            form.appendChild(input);

            var refIndicacao = $.cookie('ctblz-ref');
            if (refIndicacao) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = "refindicacao";
                input.value = refIndicacao;
                form.appendChild(input);
            }

            return true;

        }

    });

    $("#form-abertura input, #form-abertura select, #form-abertura textarea").on("blur", function () {
        $(this).valid();
    })

    $.validator.addMethod('validatelefone', function (value, element, param) {
        return value.match(/\d/g).length == 10 || value.match(/\d/g).length == 11;
    }, "Telefone inválido");

    $.validator.addMethod('validacpf', function (value, element, param) {

        cpf = $(element).val();

        return validarCpf(cpf);

    }, 'CPF inválido');

    $("#completa-abertura").click(function () {
        if ($("#completa-abertura").attr('block') == 'block') return;
        $('#form-abertura').attr("action", baseCadastro + "/login");
        $("#completa-abertura").attr('block', 'block');
        $('#form-abertura').submit();


    });

});