SimuladorApp.controller('listaCnaeController', ['$scope', function ($scope) {

    $scope.listaEmpresa = listaEmpresa;
    $scope.atividadeSelecionada = "";
    $scope.empresaExiste = false;
    $scope.empresaExisteTemp = false;

    $scope.goToStep2 = function () {
        $scope.step2 = true;
    }
    $scope.goToStep3 = function () {
        $scope.step3 = true;
    }
    $scope.goToStep4 = function () {
        $scope.step4 = true;
    }
    $scope.escolheTipoEmpresa = function (tipoEmpresa) {
        var novaLista = [];
        var atividade = "";

        if (tipoEmpresa == 0 || tipoEmpresa == 40) {
            $scope.step1 = false;
        } else {
            $scope.step1 = true
        }
        $scope.empresaExisteTemp = true;


        for (var i = 0; i < listaEmpresa.length; i++) {
            if (listaEmpresa[i].tipo == tipoEmpresa) {
                novaLista.push(listaEmpresa[i]);
                atividade = listaEmpresa[i].atividade;
            }
        }
        $scope.atividadeSelecionada = atividade;
        $scope.listaEmpresa = novaLista;
    }


}]);

var listaEmpresa = [
    {tipo:1, atividade: 'Advocacia', denominacao:'Serviços advocatícios', codigo: '6911-7/01', simples: true, aliquota_inicial: '4,5%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Agenciamento de espaços para publicidade, exceto em veículos de comunicação', codigo: '7312-2/00', simples: true, aliquota_inicial: '6%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Promoção de vendas', codigo: '7319-0/02', simples: true, aliquota_inicial: '6%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Marketing direto', codigo: '7319-0/03', simples: true, aliquota_inicial: '6%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Outras atividades de publicidade não especificadas anteriormente', codigo: '7319-0/99', simples: true, aliquota_inicial: '6%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Agências de notícias', codigo: '6391-7/00', simples: true, aliquota_inicial: '6%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Web design', codigo: '6201-5/02', simples: true, aliquota_inicial: '19,5%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Agências de publicidade', codigo: '7311-4/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Criação de estandes para feiras e exposições', codigo: '7319-0/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Consultoria em publicidade', codigo: '7319-0/04', simples: true, aliquota_inicial: '16,93%'},
{tipo:2, atividade: 'Agência de Marketing Digital', denominacao:'Pesquisas de mercado e de opinião pública', codigo: '7320-3/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:3, atividade: 'Arquitetura', denominacao:'Serviços de arquitetura', codigo: '7111-1/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:3, atividade: 'Arquitetura', denominacao:'Atividades técnicas relacionadas à engenharia e arquitetura não especificadas anteriormente', codigo: '7119-7/99', simples: true, aliquota_inicial: '16,93%'},
{tipo:3, atividade: 'Arquitetura', denominacao:'Serviços de desenho técnico relacionados à arquitetura e engenharia', codigo: '7119-7/03', simples: true, aliquota_inicial: '16,93%'},
{tipo:4, atividade: 'Artes', denominacao:'Produção teatral', codigo: '9001-9/01', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Produção musical', codigo: '9001-9/02', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Produção de espetáculos de dança', codigo: '9001-9/03', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Produção de espetáculos circenses, de marionetes e similares', codigo: '9001-9/04', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Produção de espetáculos de rodeios, vaquejadas e similares', codigo: '9001-9/05', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Atividades de sonorização e de iluminação', codigo: '9001-9/06', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Artes cênicas, espetáculos e atividades complementares não especificados anteriormente', codigo: '9001-9/99', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Restauração de obras de arte', codigo: '9002-7/02', simples: true, aliquota_inicial: '6%'},
{tipo:4, atividade: 'Artes', denominacao:'Atividades de artistas plásticos, jornalistas independentes e escritores', codigo: '9002-7/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:5, atividade: 'Bloggers/Youtubers/etc', denominacao:'Portais, provedores de conteúdo e outros serviços de informação na internet', codigo: '6319-4/00', simples: true, aliquota_inicial: '6%'},
{tipo:5, atividade: 'Bloggers/Youtubers/etc', denominacao:'Outras atividades de publicidade não especificadas anteriormente', codigo: '7319-0/99', simples: true, aliquota_inicial: '6%'},
{tipo:5, atividade: 'Bloggers/Youtubers/etc', denominacao:'Agenciamento de espaços para publicidade, exceto em veículos de comunicação', codigo: '7312-2/00', simples: true, aliquota_inicial: '6%'},
{tipo:5, atividade: 'Bloggers/Youtubers/etc', denominacao:'Produção de filmes para publicidade', codigo: '5911-1/02', simples: true, aliquota_inicial: '6%'},
{tipo:5, atividade: 'Bloggers/Youtubers/etc', denominacao:'Atividades de produção cinematográfica, de vídeos e de programas de televisão não especificadas anteriormente', codigo: '5911-1/99', simples: true, aliquota_inicial: '6%'},
{tipo:6, atividade: 'Consultoria Empresas', denominacao:'Treinamento em desenvolvimento profissional e gerencial', codigo: '8599-6/04', simples: true, aliquota_inicial: '6%'},
{tipo:6, atividade: 'Consultoria Empresas', denominacao:'Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica', codigo: '7020-4/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:6, atividade: 'Consultoria Empresas', denominacao:'Outras atividades profissionais, científicas e técnicas não especificadas anteriormente', codigo: '7490-1/99', simples: true, aliquota_inicial: '16,93%'},
{tipo:6, atividade: 'Consultoria Empresas', denominacao:'Atividades de apoio à educação, exceto caixas escolares', codigo: '8550-3/02', simples: true, aliquota_inicial: '16,93%'},
{tipo:7, atividade: 'Consultoria Tecnologia', denominacao:'Treinamento em informática', codigo: '8599-6/03', simples: true, aliquota_inicial: '6%'},
{tipo:7, atividade: 'Consultoria Tecnologia', denominacao:'Consultoria em tecnologia da informação', codigo: '6204-0/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:8, atividade: 'Corretagem de Imóveis', denominacao:'Corretagem na compra e venda e avaliação de imóveis', codigo: '6821-8/01', simples: true, aliquota_inicial: '6%'},
{tipo:8, atividade: 'Corretagem de Imóveis', denominacao:'Corretagem no aluguel de imóveis', codigo: '6821-8/02', simples: true, aliquota_inicial: '6%'},
{tipo:9, atividade: 'Corretagem de Seguros', denominacao:'Corretores e agentes de seguros, de planos de previdência complementar e de saúde', codigo: '6622-3/00', simples: true, aliquota_inicial: '6%'},
{tipo:10, atividade: 'Dentista', denominacao:'Atividade odontológica com recursos para realização de procedimentos cirúrgicos', codigo: '8630-5/04', simples: true, aliquota_inicial: '16,93%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Portais, provedores de conteúdo e outros serviços de informação na internet', codigo: '6319-4/00', simples: true, aliquota_inicial: '6%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet', codigo: '6311-9/00', simples: true, aliquota_inicial: '6%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Reparação e manutenção de computadores e de equipamentos periféricos', codigo: '9511-8/00', simples: true, aliquota_inicial: '6%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Treinamento em informática', codigo: '8599-6/03', simples: true, aliquota_inicial: '6%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Desenvolvimento de programas de computador sob encomenda', codigo: '6201-5/01', simples: true, aliquota_inicial: '19,5%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Web design', codigo: '6201-5/02', simples: true, aliquota_inicial: '19,5%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Desenvolvimento e licenciamento de programas de computador customizáveis', codigo: '6202-3/00', simples: true, aliquota_inicial: '19,5%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Desenvolvimento e licenciamento de programas de computador não-customizáveis', codigo: '6203-1/00', simples: true, aliquota_inicial: '19,5%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Consultoria em tecnologia da informação', codigo: '6204-0/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:11, atividade: 'Desenvolvimento Web', denominacao:'Suporte técnico, manutenção e outros serviços em tecnologia da informação', codigo: '6209-1/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:12, atividade: 'Design de Interiores', denominacao:'Design de interiores', codigo: '7410-2/02', simples: true, aliquota_inicial: '4,5%'},
{tipo:13, atividade: 'Design em Geral', denominacao:'Web design', codigo: '6201-5/02', simples: true, aliquota_inicial: '19,5%'},
{tipo:13, atividade: 'Design em Geral', denominacao:'Design de produto', codigo: '7410-2/03', simples: true, aliquota_inicial: '16,93%'},
{tipo:13, atividade: 'Design em Geral', denominacao:'Atividades de design não especificadas anteriormente', codigo: '7410-2/99', simples: true, aliquota_inicial: '16,93%'},
{tipo:14, atividade: 'Design Gráfico', denominacao:'Edição de livros', codigo: '5811-5/00', simples: true, aliquota_inicial: '6%'},
{tipo:14, atividade: 'Design Gráfico', denominacao:'Edição de jornais diários', codigo: '5812-3/01', simples: true, aliquota_inicial: '6%'},
{tipo:14, atividade: 'Design Gráfico', denominacao:'Edição de jornais não diários', codigo: '5812-3/02', simples: true, aliquota_inicial: '6%'},
{tipo:14, atividade: 'Design Gráfico', denominacao:'Edição de revistas', codigo: '5813-1/00', simples: true, aliquota_inicial: '6%'},
{tipo:14, atividade: 'Design Gráfico', denominacao:'Edição de cadastros, listas e outros produtos gráficos', codigo: '5819-1/00', simples: true, aliquota_inicial: '6%'},
{tipo:14, atividade: 'Design Gráfico', denominacao:'Atividades de design não especificadas anteriormente', codigo: '7410-2/99', simples: true, aliquota_inicial: '16,93%'},
{tipo:15, atividade: 'Educação física', denominacao:'Produção e promoção de eventos esportivos', codigo: '9319-1/01', simples: true, aliquota_inicial: '6%'},
{tipo:15, atividade: 'Educação física', denominacao:'Outras atividades esportivas não especificadas anteriormente', codigo: '9319-1/99', simples: true, aliquota_inicial: '6%'},
{tipo:15, atividade: 'Educação física', denominacao:'Ensino de esportes', codigo: '8591-1/00', simples: true, aliquota_inicial: '19,5%'},
{tipo:15, atividade: 'Educação física', denominacao:'Ensino de dança', codigo: '8592-9/01', simples: true, aliquota_inicial: '19,5%'},
{tipo:15, atividade: 'Educação física', denominacao:'Atividades de condicionamento físico', codigo: '9313-1/00', simples: true, aliquota_inicial: '19,5%'},
{tipo:15, atividade: 'Educação física', denominacao:'Atividades de profissionais da área de saúde não especificadas anteriormente', codigo: '8650-0/99', simples: true, aliquota_inicial: '16,93%'},
{tipo:16, atividade: 'Engenharia', denominacao:'Serviços de engenharia', codigo: '7112-0/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:16, atividade: 'Engenharia', denominacao:'Serviços de cartografia, topografia e geodésia', codigo: '7119-7/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:16, atividade: 'Engenharia', denominacao:'Atividades de estudos geológicos', codigo: '7119-7/02', simples: true, aliquota_inicial: '16,93%'},
{tipo:16, atividade: 'Engenharia', denominacao:'Serviços de desenho técnico relacionados à arquitetura e engenharia', codigo: '7119-7/03', simples: true, aliquota_inicial: '16,93%'},
{tipo:16, atividade: 'Engenharia', denominacao:'Serviços de perícia técnica relacionados à segurança do trabalho', codigo: '7119-7/04', simples: true, aliquota_inicial: '16,93%'},
{tipo:16, atividade: 'Engenharia', denominacao:'Atividades técnicas relacionadas à engenharia e arquitetura não especificadas anteriormente', codigo: '7119-7/99', simples: true, aliquota_inicial: '16,93%'},
{tipo:16, atividade: 'Engenharia', denominacao:'Testes e análises técnicas', codigo: '7120-1/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:17, atividade: 'Ensino em geral', denominacao:'Ensino de esportes', codigo: '8591-1/00', simples: true, aliquota_inicial: '19,5% (17,5%+2,00% ISS)'},
{tipo:17, atividade: 'Ensino em geral', denominacao:'Ensino de dança', codigo: '8592-9/01 ', simples: true, aliquota_inicial: '19,5% (17,5%+2,00% ISS)'},
{tipo:17, atividade: 'Ensino em geral', denominacao:'Ensino de artes cênicas, exceto dança', codigo: '8592-9/02', simples: true, aliquota_inicial: '6%'},
{tipo:17, atividade: 'Ensino em geral', denominacao:'Ensino de música', codigo: '8592-9/03', simples: true, aliquota_inicial: '6%'},
{tipo:17, atividade: 'Ensino em geral', denominacao:'Ensino de arte e cultura não especificado anteriormente', codigo: '8592-9/99', simples: true, aliquota_inicial: '6%'},
{tipo:17, atividade: 'Ensino em geral', denominacao:'Ensino de idiomas', codigo: '8593-7/00', simples: true, aliquota_inicial: '6%'},
{tipo:17, atividade: 'Ensino em geral', denominacao:'Outras atividades de ensino não especificadas anteriormente', codigo: '8599-6/99 ', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Estúdios cinematográficos', codigo: '5911-1/01', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Produção de filmes para publicidade', codigo: '5911-1/02', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Atividades de produção cinematográfica, de vídeos e de programas de televisão não especificadas anteriormente', codigo: '5911-1/99', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Serviços de dublagem', codigo: '5912-0/01', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Serviços de mixagem sonora em produção audiovisual', codigo: '5912-0/02', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Atividades de pós-produção cinematográfica, de vídeos e de programas de televisão não especificadas anteriormente', codigo: '5912-0/99', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Distribuição cinematográfica, de vídeo e de programas de televisão', codigo: '5913-8/00', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Atividades de exibição cinematográfica', codigo: '5914-6/00', simples: true, aliquota_inicial: '6%'},
{tipo:18, atividade: 'Estúdio Cinematográficos', denominacao:'Atividades de gravação de som e de edição de música', codigo: '5920-1/00', simples: true, aliquota_inicial: '6%'},
{tipo:19, atividade: 'Fisioterapia', denominacao:'Atividades de fisioterapia', codigo: '8650-0/04', simples: true, aliquota_inicial: '6%'},
{tipo:20, atividade: 'Fotografia', denominacao:'Atividades de produção de fotografias, exceto aérea e submarina', codigo: '7420-0/01', simples: true, aliquota_inicial: '6%'},
{tipo:20, atividade: 'Fotografia', denominacao:'Atividades de produção de fotografias aéreas e submarinas', codigo: '7420-0/02', simples: true, aliquota_inicial: '6%'},
{tipo:20, atividade: 'Fotografia', denominacao:'Laboratórios fotográficos', codigo: '7420-0/03', simples: true, aliquota_inicial: '6%'},
{tipo:20, atividade: 'Fotografia', denominacao:'Filmagem de festas e eventos', codigo: '7420-0/04', simples: true, aliquota_inicial: '6%'},
{tipo:21, atividade: 'Intermediação', denominacao:'Atividades de intermediação e agenciamento de serviços e negócios em geral, exceto imobiliários', codigo: '7490-1/04 ', simples: true, aliquota_inicial: '16,93%'},
{tipo:22, atividade: 'Jornalismo e Assessoria', denominacao:'Agências de notícias', codigo: '6391-7/00', simples: true, aliquota_inicial: '6%'},
{tipo:22, atividade: 'Jornalismo e Assessoria', denominacao:'Atividades de artistas plásticos, jornalistas independentes e escritores', codigo: '9002-7/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:22, atividade: 'Jornalismo e Assessoria', denominacao:'Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica', codigo: '7020-4/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:23, atividade: 'Marketing', denominacao:'Agenciamento de espaços para publicidade, exceto em veículos de comunicação', codigo: '7312-2/00', simples: true, aliquota_inicial: '6%'},
{tipo:23, atividade: 'Marketing', denominacao:'Promoção de vendas', codigo: '7319-0/02', simples: true, aliquota_inicial: '6%'},
{tipo:23, atividade: 'Marketing', denominacao:'Marketing direto', codigo: '7319-0/03', simples: true, aliquota_inicial: '6%'},
{tipo:23, atividade: 'Marketing', denominacao:'Outras atividades de publicidade não especificadas anteriormente', codigo: '7319-0/99', simples: true, aliquota_inicial: '6%'},
{tipo:23, atividade: 'Marketing', denominacao:'Agências de notícias', codigo: '6391-7/00', simples: true, aliquota_inicial: '6%'},
{tipo:23, atividade: 'Marketing', denominacao:'Agências de publicidade', codigo: '7311-4/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:23, atividade: 'Marketing', denominacao:'Criação de estandes para feiras e exposições', codigo: '7319-0/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:23, atividade: 'Marketing', denominacao:'Consultoria em publicidade', codigo: '7319-0/04', simples: true, aliquota_inicial: '16,93%'},
{tipo:23, atividade: 'Marketing', denominacao:'Pesquisas de mercado e de opinião pública', codigo: '7320-3/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:24, atividade: 'Marketplace', denominacao:'Portais, provedores de conteúdo e outros serviços de informação na internet', codigo: '6319-4/00', simples: true, aliquota_inicial: '6%'},
{tipo:24, atividade: 'Marketplace', denominacao:'Marketing direto', codigo: '7319-0/03', simples: true, aliquota_inicial: '6%'},    
{tipo:24, atividade: 'Marketplace', denominacao:'Atividades de intermediação e agenciamento de serviços e negócios em geral, exceto imobiliários', codigo: '7490-1/04', simples: true, aliquota_inicial: '16,93%'},
{tipo:25, atividade: 'Médicos', denominacao:'Atividades de atendimento hospitalar, exceto pronto-socorro e unidades para atendimento a urgências', codigo: '8610-1/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:25, atividade: 'Médicos', denominacao:'Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos', codigo: '8630-5/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:25, atividade: 'Médicos', denominacao:'Atividade médica ambulatorial com recursos para realização de exames complementares', codigo: '8630-5/02', simples: true, aliquota_inicial: '16,93%'},
{tipo:25, atividade: 'Médicos', denominacao:'Atividade médica ambulatorial restrita a consultas', codigo: '8630-5/03', simples: true, aliquota_inicial: '16,93%'},
{tipo:26, atividade: 'Música', denominacao:'Ensino de música', codigo: '8592-9/03', simples: true, aliquota_inicial: '6%'},
{tipo:26, atividade: 'Música', denominacao:'Atividades de gravação de som e de edição de música', codigo: '5920-1/00', simples: true, aliquota_inicial: '6%'},
{tipo:26, atividade: 'Música', denominacao:'Serviços de dublagem', codigo: '5912-0/01', simples: true, aliquota_inicial: '6%'},
{tipo:26, atividade: 'Música', denominacao:'Serviços de mixagem sonora em produção audiovisual', codigo: '5912-0/02', simples: true, aliquota_inicial: '6%'},
{tipo:27, atividade: 'Nutrição', denominacao:'Atividades de profissionais da nutrição', codigo: '8650-0/02', simples: true, aliquota_inicial: '16,93%'},
{tipo:28, atividade: 'Organização e Promoção de Eventos', denominacao:'Serviços de organização de feiras, congressos, exposições e festas', codigo: '8230-0/01', simples: true, aliquota_inicial: '6%'},
{tipo:28, atividade: 'Organização e Promoção de Eventos', denominacao:'Casas de festas e eventos', codigo: '8230-0/02', simples: true, aliquota_inicial: '6%'},
{tipo:29, atividade: 'Psicologia', denominacao:'Atividades de psicologia e psicanálise', codigo: '8650-0/03', simples: true, aliquota_inicial: '16,93%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Agenciamento de espaços para publicidade, exceto em veículos de comunicação', codigo: '7312-2/00', simples: true, aliquota_inicial: '6%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Promoção de vendas', codigo: '7319-0/02', simples: true, aliquota_inicial: '6%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Marketing direto', codigo: '7319-0/03', simples: true, aliquota_inicial: '6%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Outras atividades de publicidade não especificadas anteriormente', codigo: '7319-0/99', simples: true, aliquota_inicial: '6%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Agências de notícias', codigo: '6391-7/00', simples: true, aliquota_inicial: '6%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Web design', codigo: '6201-5/02', simples: true, aliquota_inicial: '19,5%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Agências de publicidade', codigo: '7311-4/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Criação de estandes para feiras e exposições', codigo: '7319-0/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Consultoria em publicidade', codigo: '7319-0/04', simples: true, aliquota_inicial: '16,93%'},
{tipo:30, atividade: 'Publicidade e Propaganda', denominacao:'Pesquisas de mercado e de opinião pública', codigo: '7320-3/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:31, atividade: 'Recursos Humanos', denominacao:'Treinamento em desenvolvimento profissional e gerencial', codigo: '8599-6/04', simples: true, aliquota_inicial: '6%'},
{tipo:31, atividade: 'Recursos Humanos', denominacao:'Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica', codigo: '7020-4/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de veículos automotores', codigo: '4512-9/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de peças e acessórios novos e usados para veículos automotores', codigo: '4530-7/06', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de motocicletas e motonetas, peças e acessórios', codigo: '4542-1/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de matérias-primas agrícolas e animais vivos', codigo: '4611-7/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de combustíveis, minerais, produtos siderúrgicos e químicos', codigo: '4612-5/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de madeira, material de construção e ferragens', codigo: '4613-3/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de máquinas, equipamentos, embarcações e aeronaves', codigo: '4614-1/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de eletrodomésticos, móveis e artigos de uso doméstico', codigo: '4615-0/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de têxteis, vestuário, calçados e artigos de viagem', codigo: '4616-8/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de produtos alimentícios, bebidas e fumo', codigo: '4617-6/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de medicamentos, cosméticos e produtos de perfumaria', codigo: '4618-4/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de instrumentos e materiais odonto-médico-hospitalares', codigo: '4618-4/02', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de jornais, revistas e outras publicações', codigo: '4618-4/03', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Outros representantes comerciais e agentes do comércio especializado em produtos não especificados anteriormente', codigo: '4618-4/99', simples: true, aliquota_inicial: '16,93%'},
{tipo:32, atividade: 'Representação Comercial', denominacao:'Representantes comerciais e agentes do comércio de mercadorias em geral não especializado', codigo: '4619-2/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:33, atividade: 'Salas de Acesso à Internet', denominacao:'Salas de acesso à internet', codigo: '8299-7/07', simples: true, aliquota_inicial: '6%'},
{tipo:33, atividade: 'Salas de Acesso à Internet', denominacao:'Outras atividades de serviços prestados principalmente às empresas não especificadas anteriormente', codigo: '8299-7/99', simples: true, aliquota_inicial: '6%'},
{tipo:33, atividade: 'Salas de Acesso à Internet', denominacao:'Fotocópias', codigo: '8219-9/01', simples: true, aliquota_inicial: '6%'},
{tipo:33, atividade: 'Salas de Acesso à Internet', denominacao:'Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente', codigo: '8219-9/99', simples: true, aliquota_inicial: '6%'},
{tipo:34, atividade: 'Salão de Beleza', denominacao:'Cabeleireiros, manicure e pedicure', codigo: '9602-5/01', simples: true, aliquota_inicial: '6%'},
{tipo:34, atividade: 'Salão de Beleza', denominacao:'Outras atividades de tratamento de beleza', codigo: '9602-5/02', simples: true, aliquota_inicial: '6%'},
{tipo:35, atividade: 'Serviços Administrativos', denominacao:'Serviços combinados de escritório e apoio administrativo', codigo: '8211-3/00', simples: true, aliquota_inicial: '6%'},
{tipo:35, atividade: 'Serviços Administrativos', denominacao:'Fotocópias', codigo: '8219-9/01', simples: true, aliquota_inicial: '6%'},
{tipo:35, atividade: 'Serviços Administrativos', denominacao:'Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente', codigo: '8219-9/99', simples: true, aliquota_inicial: '6%'},
{tipo:35, atividade: 'Serviços Administrativos', denominacao:'Atividades de cobrança e informações cadastrais', codigo: '8291-1/00', simples: true, aliquota_inicial: '6%'},
{tipo:36, atividade: 'Serviços de Lavagem Automotiva', denominacao:'Serviços de lavagem, lubrificação e polimento de veículos automotores', codigo: '4520-0/05', simples: true, aliquota_inicial: '6%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet', codigo: '6311-9/00', simples: true, aliquota_inicial: '6%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Reparação e manutenção de computadores e de equipamentos periféricos', codigo: '9511-8/00', simples: true, aliquota_inicial: '6%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Portais, provedores de conteúdo e outros serviços de informação na internet', codigo: '6319-4/00', simples: true, aliquota_inicial: '6%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Treinamento em informática', codigo: '8599-6/03', simples: true, aliquota_inicial: '6%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Outras atividades de prestação de serviços de informação não especificadas anteriormente', codigo: '6399-2/00', simples: true, aliquota_inicial: '6%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Desenvolvimento de programas de computador sob encomenda', codigo: '6201-5/01', simples: true, aliquota_inicial: '19,5%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Web design', codigo: '6201-5/02', simples: true, aliquota_inicial: '19,5%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Desenvolvimento e licenciamento de programas de computador customizáveis', codigo: '6202-3/00', simples: true, aliquota_inicial: '19,5%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Desenvolvimento e licenciamento de programas de computador não-customizáveis', codigo: '6203-1/00', simples: true, aliquota_inicial: '19,5%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Consultoria em tecnologia da informação', codigo: '6204-0/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:37, atividade: 'Serviços de TI', denominacao:'Suporte técnico, manutenção e outros serviços em tecnologia da informação', codigo: '6209-1/00', simples: true, aliquota_inicial: '16,93%'},
{tipo:38, atividade: 'Tradução', denominacao:'Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente', codigo: '8219-9/99', simples: true, aliquota_inicial: '6%'},
{tipo:38, atividade: 'Tradução', denominacao:'Serviços de tradução, interpretação e similares', codigo: '7490-1/01', simples: true, aliquota_inicial: '16,93%'},
{tipo:39, atividade: 'Turismo', denominacao:'Agências de viagens', codigo: '7911-2/00', simples: true, aliquota_inicial: '6%'},
{tipo:39, atividade: 'Turismo', denominacao:'Operadores turísticos', codigo: '7912-1/00', simples: true, aliquota_inicial: '6%'},
{tipo:39, atividade: 'Turismo', denominacao:'Serviços de reservas e outros serviços de turismo não especificados anteriormente', codigo: '7990-2/00', simples: true, aliquota_inicial: '6%'},
{tipo:40, atividade: 'Veterinária', denominacao:'Atividades veterinárias', codigo: '7500-1/00 ', simples: true, aliquota_inicial: '16,93%'}

]