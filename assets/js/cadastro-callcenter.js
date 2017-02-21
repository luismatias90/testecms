$(document).ready(function () {
    /*****************VALIDAÇÃO FORM MIGRAÇÃO********************************/

    var options = {
        byPassKeys: [9, 37, 38, 39, 40],
        onKeyPress: function (tel) {
            var masks = ["(00)0000-00009", "(00)00000-0000"];
            mask = (tel.length < 14) ? masks[0] : masks[1];
            $("#form-migracao input[name=telefone]").mask(mask, this);
        }
    };

    $("#form-migracao input[name=telefone]").mask("(00)0000-00009", options);

    $("#form-migracao input[name=cpf]").mask('000.000.000-00', {
        reverse: true
    });
    $("#form-migracao input[name=cnpj]").mask('00.000.000/0000-00', {
        reverse: true
    });

    $('#form-migracao').validate({
        rules: {
            "nomeCompleto": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "cpf": {
                required: true,
                validacpf: true
            },
            "cnpj": {
                required: true,
                validacnpj: true
            },
            "telefone": {
                required: true,
                validatelefone: true
            },
            "senha": {
                required: true
            },
            "operador":{
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

            //LAYER CRIADO NA PAGINA INICIAL
            try {
                dataLayer.push({
                    'event': 'pageview',
                    'virtualUrl': '/migrar/'
                });
            } catch (e) {
                console.log("erro tag manager", e);
            }

            $("#form-migracao input, #form-migracao select, #form-migracao textarea").attr("readonly", true);
            //se é migracao ou abertura
            var processo = $(form).find("[name=processo]");

            if (!processo || processo.length == 0) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = "processo";
                input.value = "migracaocomercio";
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

            var origemGenerica = document.getElementById('origemGenerica');
            if (origemGenerica != null) {
                input.value = origemGenerica.value;
            }
            try {
                console.info('Iniciando cadastro Contabilizei com origem: ', input.value);
            } catch (e) {}

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
    
    $('#form-interesse').validate({
        rules: {
            "nomeCompleto": {
                required: true
            },
            "email": {
                required: true,
                email: true
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
            Intercom('boot', {
                app_id: 'co2eot0g',
                email: document.getElementById('emailInteresse').value,
                "email_antigo": document.getElementById('emailAntigo').value,
                name: document.getElementById('nomeCompletoInteresse').value,
                "operador": document.getElementById('cmbOperadorInteresse').value,
                "origemCadastro": "callcenter"
            });
            alert('Cliente cadastrado com sucesso!');
            document.getElementById('emailInteresse').value='';
            document.getElementById('nomeCompletoInteresse').value='';
            document.getElementById('cmbOperadorInteresse').value='';
            document.getElementById('emailAntigo').value='';
        }
    });


    $("#form-migracao input, #form-migracao select, #form-migracao textarea").on("blur", function () {
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

    $("#btn-iniciar-migracao").click(function () {
        if ($("#btn-iniciar-migracao").attr('block') == 'block') return;
        $('#form-migracao').attr("action", baseCadastro + "/login");
        $("#btn-iniciar-migracao").attr('block', 'block');
        $('#form-migracao').submit();

    });

    $("#form-interesse input, #form-interesse select, #form-interesse textarea").on("blur", function () {
        $(this).valid();
    })

});