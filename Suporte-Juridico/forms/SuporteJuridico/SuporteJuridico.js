$(document).ready(function () {
    console.clear();
    $("#divMotivoDecisaoAprov, #collapse3").hide();
    $("#textareaMovimentar").val("");
    $("#radioDecisao1, #radioDecisao2, #radioDecisao3").removeAttr("checked");
    $("#radioDecisao2Aprov, #radioDecisao1Aprov").removeAttr("checked");
    $("#textareaMotivoDecisaoAprov").val("");
    $("#categoria").on("change", function(){
        if ($(this).val() == "Análise de Contrato") {
            $("#collapse3").show();
        }
        else{
            $("#collapse3").hide();
        }
    });
    if ($("#modo").val() == "ADD") {
        FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt');
        var mySimpleCalendar2 = FLUIGC.calendar('#prazo_limite', {
            language: 'pt-br'
        });
        CarregaDepartamentos();
        $("#textareaJuridico").closest(".row").hide();
        $("#aTabHistorico").closest("li").hide();
        $('#collapse1').collapse('show');
        setTimeout(() => {
            $('#collapse1').collapse('hide');
        }, 500);
        $("#divMovimentacao, #divHistorico").hide();
        $("#aTabAprovacao").closest("li").hide();
        $("#solicitante").val($("#usuario").val());
        $("#divDecisao, #divAnaliseJuridico").hide();
        $("#usuario").append("<option value='" + $("#usuarioLogado").val() + "' >" + $("#usuarioLogado").val() + "</select>");
        if (VerificaPermissao($("#usuarioLogado").val())) {
            CarregaUsuarios();
        }
        var date = new Date();
        CarregaGruposUsuario();
        $("#divDecisao").hide();
        $("#aTabChamados").closest("li").addClass("active");
        $("#tabChamados").addClass("active");
    }
    else if ($("#modo").val() == "MOD") {
        FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt');
        var mySimpleCalendar2 = FLUIGC.calendar('#prazo_limite', {
            language: 'pt-br'
        });
        var atividade = $("#atividade").val();
        GeraHistorico();

        $("#spanUsuario").text($("#solicitante").val());
        $("#usuario").hide();


        if (atividade == 0 || atividade == 1 || atividade == 4) {
            $("#aTabChamados").click();
            $("#textareaJuridico").closest(".row").hide();
            $("#selectAprovador").closest("div").hide();
            $("#divAnaliseJuridico").hide();
            $("#aTabAprovacao").closest("li").hide();
            $("#divMovimentacao").hide();
            $("#aTabChamados").closest("li").addClass("active");
            $("#tabChamados").addClass("active");
            if ($("[name='radioPrioridade']:checked").val() == "Alta") {
                $('#collapse1').collapse('show');
          
            }
            CarregaGruposUsuario();
        }
        else if(atividade == 5){
            $("#aTabChamados").click();
            $("#divAnaliseJuridico").hide();
            $("#spanObra").text($("#obra").val());
            $("#selectObra").hide();
            $("#usuarioMovimentar").val($("#usuarioLogado").val());
            $("#aTabChamados").closest("li").addClass("active");
            $("#tabChamados").addClass("active");
            CarregaAprovadores();
            CarregaDepartamentos();
            $("#textTempoGasto").val($("#tempoGastoAnalise").val());
            $("#textareaMovimentar").val($("#textAnaliseJuridico").val());
            $("#usuarioAnaliseJuridico").val($("#usuarioLogado").val());
            $("#usuarioJuridico").val($("#usuarioLogado").val());
            if ($("[name='radioPrioridade']:checked").val() == "Alta") {
                $('#collapse1').collapse('show');
                $("#checkboxTermoTerceiro").on("click", function () {
                    return false;
                });
            }
            $("#aTabAprovacao").closest("li").hide();

        }
        else if(atividade == 7){
            $("#aTabAprovacao").click();
            $("#textareaJuridico").closest(".row").hide();
            $("#spanObra").text($("#obra").val());
            $("#selectObra").hide();
            $("#divMovimentacao").hide();
            $("#selectAprovador").closest("div").hide();
            $("#divAnaliseJuridico").hide();
            $("#spanCategoria").text($("#categoria").val());
            $("#categoria").hide();
            $("#spanDepartamentoAprovacao").text($("[name='selectDepartamento']").val());
            $("[name='selectDepartamento']").hide();
            $("#spanDescricao").text($("#descricao").val());
            $("#descricao").hide();

            $("#spanEmaislCopia").text($("#emailsCopia").val());
            $("#emailsCopia").hide();

            $("#spanPrazo_limite").text($("#prazo_limite").val());
            $("#prazo_limite").hide();
            $("#radioPrioridadeAlta, #radioPrioridadeMedia, #radioPrioridadeBaixa").removeAttr("onclick");
            if ($("[name='radioPrioridade']:checked").val() == "Alta" && $("#checkboxTermoTerceiro").is(":checked")) {
                $("#collapse2").show();
                $("#checkboxTermoTerceiroAprov").attr("checked", "checked");
            }
            else{
                $("#collapse2").hide();
            }
            $("#aTabAprovacao").closest("li").addClass("active");
            $("#tabAprovacao").addClass("active");
            $("#divDados, #divAnaliseJuridico").hide();
            $("#aTabChamados").closest("li").hide();
            $("#radioDecisao2").closest(".col-md-2").hide();
            CamposAprovacao();

        }
        else if(atividade == 8){
            $("#aTabChamados").click();
            $("#spanObra").text($("#obra").val());
            $("#selectObra").hide();
            $("#usuarioMovimentar").val($("#usuarioLogado").val());
            $("#selectAprovador").closest("div").hide();
            $("#divAnaliseJuridico").hide();
            $("#spanCategoria").text($("#categoria").val());
            $("#categoria").hide();
            $("#spanDepartamento").text($("[name='selectDepartamento']").val());
            $("[name='selectDepartamento']").hide();
            $("#spanDescricao").text($("#descricao").val());
            $("#descricao").hide();

            $("#spanEmaislCopia").text($("#emailsCopia").val());
            $("#emailsCopia").hide();

            $("#spanPrazo_limite").text($("#prazo_limite").val());
            $("#prazo_limite").hide();
            $("#radioPrioridadeAlta, #radioPrioridadeMedia, #radioPrioridadeBaixa").removeAttr("onclick");
            $("[name='radioPrioridade']").on("click", function () {
                return false;
            });

            if ($("[name='radioPrioridade']:checked").val() == "Alta" && $("#checkboxTermoTerceiro").is(":checked")) {
                $("#collapse1").show();
                $("#checkboxTermoTerceiro").attr("checked", "checked");
                $("#checkboxTermoTerceiro").on("click", function(){return false;});
            }
            else{
                $("#collapse1").hide();
            }
            $("#aTabAprovacao").closest("li").hide();
            $("#textTempoGasto").val($("#tempoGastoResolucao").val());
            $("#textareaMovimentar").val($("#textResolucaoJuridico").val());
            $("#radioDecisao2").closest("div").hide();
            $("#radioDecisao1").siblings("label").text("Enviar ao solicitante");
            $("#radioDecisao3").siblings("label").text("Encerrar");

        }
        else if(atividade == 11){
            $("#aTabChamados").click();
            $("#textareaJuridico").closest(".row").hide();
            $("#spanObra").text($("#obra").val());
            $("#selectObra").hide();
            $("#selectAprovador").closest("div").hide();
            $("#divAnaliseJuridico").hide();
            $("#spanCategoria").text($("#categoria").val());
            $("#categoria").hide();
            $("#spanDepartamento").text($("[name='selectDepartamento']").val());
            $("[name='selectDepartamento']").hide();
            $("#spanDescricao").text($("#descricao").val());
            $("#descricao").hide();

            $("#spanEmaislCopia").text($("#emailsCopia").val());
            $("#emailsCopia").hide();

            $("#spanPrazo_limite").text($("#prazo_limite").val());
            $("#prazo_limite").hide();
            $("#radioPrioridadeAlta, #radioPrioridadeMedia, #radioPrioridadeBaixa").removeAttr("onclick");
            $("#aTabAprovacao").closest("li").hide();
            $("#radioDecisao2").closest("div").hide();
            $("#radioDecisao1").siblings("label").text("Aprovar");
            $("#radioDecisao3").siblings("label").text("Retornar ao jurídico");
            $("#textTempoGasto").closest("div").hide();
            $("[name='radioPrioridade']").on("click", function () {
                return false;
            });
            if ($("[name='radioPrioridade']:checked").val() == "Alta" && $("#checkboxTermoTerceiro").is(":checked")) {
                $("#collapse1").show();
                $("#checkboxTermoTerceiro").attr("checked", "checked");
                $("#checkboxTermoTerceiro").on("click", function(){return false;});
            }
            else{
                $("#collapse1").show();
            }
        }
    }
    else{
        var usuario = $("#usuarioLogado").val();
        if (VerificaPermissao(usuario)) {
            console.log("ifou");
            GeraHistorico();

            $("#usuario, #divMovimentacao").hide();
            $("#spanUsuario").text($("#solicitante").val());
            $("#spanPrazo_limite").text($("#prazo_limite").text());
            $("#spanEmaislCopia").text($("#emailsCopia").text());
            $("#spanCategoria").text($("#categoria").text());
            $("#spanDescricao").text($("#descricao").text());
            $("#aTabChamados").click();
            $("#spanDepartamento").text($("[name='selectDepartamento']").text());
            $("[name='selectDepartamento']").hide();

            if ($("[name='radioPrioridade']:checked").val() == "Alta") {
                $('#collapse1').collapse('show');
            }

            $("#spanObra").text($("#obra").val());
            $("#selectObra").hide();
            $("#selectAprovador").closest("div").hide();
            $("#divAnaliseJuridico").hide();
            $("#spanCategoria").text($("#categoria").text());
            $("#categoria").hide();

            $("#spanDescricao").text($("#descricao").text());
            $("#descricao").hide();

            $("#spanEmaislCopia").text($("#emailsCopia").text());
            $("#emailsCopia").hide();

            $("#spanPrazo_limite").text($("#prazo_limite").text());
            $("#prazo_limite").hide();
            $("#radioPrioridadeAlta, #radioPrioridadeMedia, #radioPrioridadeBaixa").removeAttr("onclick");
            $("#aTabAprovacao").closest("li").hide();
            $("#textTempoGasto").val($("#tempoGastoResolucao").text());
            $("#textareaMovimentar").val($("#textResolucaoJuridico").text());
            $("#radioDecisao2, #radioDecisao1, #radioDecisao3").closest("div").hide();
        }
        else{
            $("#divCollapse, #divMovimentacao, #divAnaliseJuridico").hide();
        }
    }
});

function BuscaDataAtual() {
    var date = new Date();
    var data = "";
    if (date.getDate() < 10)
        data += "0" + date.getDate() + "/";
    else
        data += date.getDate() + "/";

    if (parseInt(date.getMonth()) + 1 < 10)
        data += "0" + (parseInt(date.getMonth()) + 1) + "/";
    else
        data += (parseInt(date.getMonth()) + 1) + "/";

    data += date.getFullYear();
    data += " ";
    if (date.getHours() < 10) {
        data += "0" + date.getHours();
    }
    else {
        data += date.getHours();
    }

    data += ":";

    if (date.getMinutes() < 10) {
        data += "0" + date.getMinutes();
    }
    else {
        data += date.getMinutes();
    }
    data += ":";

    if (date.getSeconds() < 10) {
        data += "0" + date.getSeconds();
    }
    else {
        data += date.getSeconds();
    }

    return data;
}

function CarregaUsuarios(){
    var ds = DatasetFactory.getDataset("colleague", null, [], null);
    var options = "";
    for (var i = 0; i < ds.values.length; i++) {
        options += "<option value='" + ds.values[i]["colleaguePK.colleagueId"] + "'>" + ds.values[i]["colleaguePK.colleagueId"] + "</option>";
    }
    $("#usuario").append(options);
}

function CarregaGruposUsuario() {
    var usuario = $("#usuarioLogado").val();
    var restricoes = [DatasetFactory.createConstraint("usuario", usuario, usuario, ConstraintType.MUST)];
    if (VerificaPermissao(usuario)) {
        restricoes.push(DatasetFactory.createConstraint("permissaoGeral", "true", "true", ConstraintType.MUST));
    }
    var centrosDeCusto = DatasetFactory.getDataset("BuscaPermissaoColigadasUsuario", null, restricoes, null);
    if (!centrosDeCusto || !centrosDeCusto.values) {
        return;
    }
    var opcoes = "";
    var coligadaAtual = "";
    centrosDeCusto.values.forEach(function (centroDeCusto) {
        if (coligadaAtual != centroDeCusto.CODCOLIGADA) {
            if (coligadaAtual != "") {
                opcoes += "</optgroup>";
            }
            opcoes += "<optgroup label='" + centroDeCusto.CODCOLIGADA + " - " + centroDeCusto.NOMEFANTASIA + "'>";
            coligadaAtual = centroDeCusto.CODCOLIGADA;
        }
        opcoes += "<option value='" + centroDeCusto.CODCOLIGADA + " - " + centroDeCusto.CODCCUSTO + " - " + centroDeCusto.perfil + "'>" + centroDeCusto.CODCCUSTO + " - " + centroDeCusto.perfil + "</option>";
    });
    if (coligadaAtual != "") {
        opcoes += "</optgroup>";
    }
    $("#selectObra").append(opcoes);
}

function CamposAprovacao() {
    $("#spanSolicitanteAprovacao").text(BuscaNomeUsuario($("#solicitante").val()));
    $("#spanObraAprovacao").text($("#obra").val());
    $("#spanPrioridadeAprovacao").text($("[name='radioPrioridade']:checked").val());
    if ($("[name='radioPrioridade']:checked").val() == "Baixa") {
        $("#spanPrioridadeAprovacao").css("color", "green");

    }
    else if ($("[name='radioPrioridade']:checked").val() == "Média") {
        $("#spanPrioridadeAprovacao").css("color", "blue");

    }
    else {
        $("#spanPrioridadeAprovacao").css("color", "red");
    }

    $("#spanPrazoAprovacao").text($("#prazo_limite").val());
    $("#spanDescricaoAprovacao").text($("#descricao").val());
    $("#spanUsuarioJuridicoAprovacao").text(BuscaNomeUsuario($("#usuarioAnaliseJuridico").val()));
    $("#spanAnaliseJuridicoAprovacao").text($("#textAnaliseJuridico").val())

}

function GeraHistorico() {
    var atividades = ["Início", "Início", "", "", "Início", "Análise Jurídico", "", "Aprovação", "Resolução", "", "", "Solicitante"];

    var json = JSON.parse($("#historico").val());
    var html = "";
    for (var i = json.length - 1; i >= 0; i--) {
        var div =
            '<div class="row">\
            <div class="col-md-12">\
                <div class="card">\
                    <div class="card-body">\
                        <h3 class="card-title" style="display:inline;">' + BuscaNomeUsuario(json[i].usuario) + '</h3>\
                        <span>' + json[i].data + ' - ' + CalculaDiferencaDatas(json[i].data) + '</span><br>\
                        <p class="card-text"><b>' + atividades[json[i].status] + ': </b>'; 
                        
                        if (json[i].status == 11 || json[i].status == 7 || json[i].status == 5) {
                            if (json[i].descricao.includes("Aprovado")) {
                                div += "<b style='color:limegreen;'>Aprovado</b>.";
                            }
                            else if(json[i].descricao.includes("Retornado: ")){ 
                                div += "<b style='color:red;'>Retornado</b>: " + json[i].descricao.split("Retornado: ")[1];
                            }
                            else if(json[i].descricao.includes("Cancelado: ")){
                                div += "<b style='color:red;'>Cancelado</b>: " + json[i].descricao.split("Cancelado: ")[1];
                            }
                            else{
                                div += json[i].descricao;
                            }
                        }
                        else{
                            div += json[i].descricao;
                        }
                        div += '</p>\
                    </div>\
                </div>\
            </div>\
        </div>';
        html += div;
    }
    $("#bodyHist").append(html);
}

function BuscaNomeUsuario(usuario) {
    var c1 = DatasetFactory.createConstraint("colleagueId", usuario, usuario, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("colleague", null, [c1], null);
    return ds.values[0]['colleagueName'];
}

function ValidaCampos(){
    var atividade = $("#atividade").val();
    var datenow = new Date();
    datenow.setHours(0);
    datenow.setMinutes(0);
    datenow.setSeconds(0);
    datenow.setMilliseconds(0);

    var dateprazo = $("#prazo_limite").val();
    dateprazo = dateprazo.split("/");
    dateprazo = dateprazo[1] + "/" + dateprazo[0] + "/" + dateprazo[2];
    dateprazo = new Date(dateprazo);

    if (atividade == 1 || atividade == 0 || atividade == 4) {
        if ($("#selectObra").val() == null || $("#selectObra").val() == "") {
            alert("Selecione a obra.");
            $("#selectObra").focus();
            return false;
        }
        else if($("#prazo_limite").val() == null || $("#prazo_limite").val() == ""){
            alert("Informe o prazo limite para a entrega da solicitação.");
            $("#prazo_limite").focus();
            return false;
        }
        else if(datenow.getTime() > dateprazo.getTime()){
            alert("A data do prazo não pode ser anterior a data de hoje.");
            $("#prazo_limite").focus();
            return false;
        }
        else if($("#categoria").val() == null || $("#categoria").val() == ""){
            alert("Selecione a categoria da solicitação.");
            $("#categoria").focus();
            return false;
        }
        else if($("[name='radioPrioridade']:checked").val() == null || $("[name='radioPrioridade']:checked").val() == ""){
            alert("Selecione o nível de prioridade.");
            $("#radioPrioridade").focus();
            return false;
        }
        else if($("#descricao").val() == null || $("#descricao").val() == ""){
            alert("Informe a descrição da solicitação.");
            $("#descricao").focus();
            return false;
        }
        else{
            return true;
        }

    }
    else if(atividade == 5){
        if($("#prazo_limite").val() == null || $("#prazo_limite").val() == ""){
            alert("Informe o prazo limite para a entrega da solicitação.");
            $("#prazo_limite").focus();
            return false;
        }
        else if(datenow.getTime() > dateprazo.getTime()){
            alert("A data do prazo não pode ser anterior a data de hoje.");
            $("#prazo_limite").focus();
            return false;
        }
        else if($("#categoria").val() == null || $("#categoria").val() == ""){
            $("#categoria").focus();
            alert("Selecione a categoria da solicitação.");
            return false;
        }
        else if($("[name='radioPrioridade']:checked").val() == null || $("[name='radioPrioridade']:checked").val() == ""){
            $("#radioPrioridade").focus();
            alert("Selecione o nível de prioridade.");
            return false;
        }
        else if($("#descricao").val() == null || $("#descricao").val() == ""){
            $("#descricao").focus();
            alert("Informe a descrição da solicitação.");
            return false;
        }
        else if($("#textareaMovimentar").val() == null || $("#textareaMovimentar").val() == ""){
            alert("Informe a descrição da movimentação.");
            $("#textareaMovimentar").focus();
            return false;
        }
        else if(!$("#radioDecisao1").is(":checked") && !$("#radioDecisao2").is(":checked") && !$("#radioDecisao3").is(":checked")){
            alert("Selecione a condição desejada.");
            return false;
        }
        else{
            return true;
        }
    }
    else if(atividade == 7){
        if (!$("#radioDecisao1Aprov").is(":checked") && !$("#radioDecisao2Aprov").is(":checked")) {
            alert("Selecione a decisão.");
            return false;
        }
        else if(($("#textareaMotivoDecisaoAprov").val() == null || $("#textareaMotivoDecisaoAprov").val() == "") && $("#radioDecisao2Aprov").is(":checked")){
            alert("Informe o motivo da não aprovação.");
            return false;
        }
        else{
            return true;
        }
    }
    else if(atividade == 8){
        if ($("#textareaMovimentar").val() == null || $("#textareaMovimentar").val() == "") {
            alert("Informe a descrição do movimento.");
            return false;
        }
        else if($("#textTempoGasto").val() == null || $("#textTempoGasto").val() == ""){
            alert("Informe o tempo gasto.");
            return false;
        }
//        else if($("#selectAprovador").val() == null || $("#selectAprovador").val() == ""){
//            alert("Informe o usuário aprovador.");
//            return false;
//        }
        else if(!$("#radioDecisao1").is(":checked") && !$("#radioDecisao2").is(":checked") && !$("#radioDecisao3").is(":checked")){
            alert("Selecione a condição desejada.");
            return false;
        }
        else{
            return true;
        }
    }
    else if(atividade == 11){
        if (($("#textareaMovimentar").val() == null || $("#textareaMovimentar").val() == "") && $("#radioDecisao3").is(":checked")) {
            alert("Informe a descrição do movimento.");
            $("#textareaMovimentar").focus();
            return false;
        }
        else if(!$("#radioDecisao1").is(":checked") && !$("#radioDecisao2").is(":checked") && !$("#radioDecisao3").is(":checked")){
            alert("Selecione a condição desejada.");
            return false;
        }
        else{
            return true;
        }
    }
}

function CarregaAprovadores(){
    var c1 = DatasetFactory.createConstraint("roleId", "aprovaSuporteJuridico", "aprovaSuporteJuridico", ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("workflowColleagueRole", null, [c1], null);

    for (var i = 0; i < ds.values.length; i++) {
        var option = "<option value='" + ds.values[i]["workflowColleagueRolePK.colleagueId"] + "'>" + BuscaNomeUsuario(ds.values[i]["workflowColleagueRolePK.colleagueId"]) + "</option>";
        $("#selectAprovador").append(option);
    }
}

function enviarEmail(atividade) {
    console.log("inicio envio de e-mail.");
    
    var to = "";
    to += BuscaEmailUsuario($('#solicitante').val()) + "; " + $("#emailsCopia").val();

    var SOLICITANTE = BuscaNomeUsuario($('#solicitante').val());
    var OBRA = $('#obra').val();
    var PRAZO = $('#prazo_limite').val();
    var CATEGORIA = $('#categoria').val();
    var PRIORIDADE = $("[name='radioPrioridade']:checked").val();
    var DESCRICAO = $('#descricao').val();
    var ANALISE = $('#textAnaliseJuridico').val();
    var numProcesso = $("#numProcess").val();
    var MENSAGEM = null;
    if (atividade == 5) {
        MENSAGEM = "O seu chamado de <b>Suporte ao Jurídico</b> foi análisado e <b>enviado para aprovação</b>.";
    }
    else if(atividade == 8){
        MENSAGEM = "O seu chamado de <b>Suporte ao Jurídico</b> recebeu uma resposta.";
    }
    else{
        MENSAGEM = "O seu chamado de <b>Suporte ao Jurídico foi movimentado</b>.";
    }

    var LINK = 'http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + numProcesso;
	var subject = 'Chamado de Suporte Jurídico Nº ' + numProcesso;
	
    var data = {
        "to": to, //emails of recipients separated by ";"
        "from": "fluig@construtoracastilho.com.br", // sender
        "subject": subject  , //   subject
        "templateId": "TPL_SUPORTE_JURIDICO", // Email template Id previously registered
        "dialectId": "pt_BR", //Email dialect , if not informed receives pt_BR , email dialect ("pt_BR", "en_US", "es")
        "param": {  "SERVER_URL": 'http://fluig.castilho.com.br:1010',
                    "SOLICITANTE": SOLICITANTE,
                    "MENSAGEM": MENSAGEM,
                    "OBRA": OBRA,
                    "PRAZO": PRAZO,
                    "CATEGORIA": CATEGORIA,
                    "PRIORIDADE": PRIORIDADE,
                    "DESCRICAO": DESCRICAO,
                    "ANALISE": ANALISE,
                    "LINK": LINK,
                    "NUMSOLIC": "Nº " + numProcesso
        } //  Map with variables to be replaced in the template
    };

    $.ajax({
        url: "/api/public/alert/customEmailSender",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data)
    })
    .done(function (data) {
           
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
           
    });
    console.log("fim envio de e-mail.");    
}

function BuscaEmailUsuario(usuario) {
    var c1 = DatasetFactory.createConstraint("colleagueId", usuario, usuario, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("colleague", null, [c1], null);
    return ds.values[0]['mail'];
}

function VerificaPermissao(usuario){
    var c1 = DatasetFactory.createConstraint("colleagueId", usuario, usuario, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("roleId", "SuporteJuridico", "SuporteJuridico", ConstraintType.SHOULD);
    var c3 = DatasetFactory.createConstraint("roleId", "admin", "admin", ConstraintType.SHOULD);

    var ds = DatasetFactory.getDataset("workflowColleagueRole", null, [c1,c2,c3], null);

    if (ds.values.length > 0) {
        return true;
    } else {
        return false;
    }
}

function CarregaDepartamentos(){
    var ds = DatasetFactory.getDataset("DepartamentosRMTodos", null, [], null);
    if (!ds || !ds.values) {
        return;
    }
    var options = "";
    for (var i = 0; i < ds.values.length; i++) {
        options += "<option value='" + ds.values[i].nome + "'>" + ds.values[i].nome + "</option>";
    }

    $("#selectDepartamento").append(options);
}

function CalculaDiferencaDatas(data){
    data = data.split("/");
    data = data[1] + "/" + data[0] + "/" + data[2];
    console.log("data: " + data);
    var datenow = new Date().getTime();
    var data = new Date(data).getTime();

    var dif = datenow - data;
    console.log("dif: " + dif);
    return dhm(dif);

}

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }

  if (d>0) {
      return d + " dias atrás";
  }
  else if(h > 0){
    return h + " horas atrás";
  }
  else{
    return m + " minutos atrás";
  }
}