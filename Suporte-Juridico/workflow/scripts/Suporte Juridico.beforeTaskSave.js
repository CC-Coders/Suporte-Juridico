function beforeTaskSave(colleagueId,nextSequenceId,userList){
    var atividade = getValue('WKCurrentState');

}

function enviarEmail(atividade) {
    log.info("inicio envio de e-mail.");

    var SOLICITANTE = hAPI.getCardValue('solicitante');
    var OBRA = hAPI.getCardValue('obra');
    var PRAZO = hAPI.getCardValue('prazo_limite');
    var CATEGORIA = hAPI.getCardValue('categoria');
    var PRIORIDADE = hAPI.getCardValue('radioPrioridade');
    var DESCRICAO = hAPI.getCardValue('descricao');
    var ANALISE = hAPI.getCardValue('textAnaliseJuridico');
    var numProcesso = getValue("WKNumProces").toString().replace(".", "");
    var MENSAGEM = null;
    if (atividade == 5) {
        MENSAGEM = "O seu chamado de <b>suporte ao jurídico</b> foi analisado e <b>enviado para aprovação</b>.";
    }
    else if(atividade == 8){
        MENSAGEM = "O seu chamado de <b>suporte ao jurídico recebeu uma resposta</b>.";
    }
    else{
        MENSAGEM = "O seu chamado de <b>suporte ao jurídico foi movimentado</b>.";
    }

    var LINK = 'http://homologacao.castilho.com.br:2020/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+numProcesso;

	var subject = 'Chamado de Suporte Jurídico Nº ' + numProcesso;

	var param = new java.util.HashMap();
	param.put("SERVER_URL", 'http://homologacao.castilho.com.br:2020');
	param.put("TENANT_ID", 1);
	param.put("SOLICITANTE", SOLICITANTE);
    param.put("MENSAGEM", MENSAGEM);
	param.put("OBRA", OBRA);	
    param.put("PRAZO", PRAZO);
    param.put("CATEGORIA", CATEGORIA);
    param.put("PRIORIDADE", PRIORIDADE);
    param.put("DESCRICAO", DESCRICAO);
    param.put("ANALISE", ANALISE);
    param.put("LINK",LINK);
    param.put("NUMSOLIC", "Nº " + numProcesso);
    param.put("subject", subject);
	
	var destinatarios = new java.util.ArrayList();
	destinatarios.add(SOLICITANTE);
    var emailsCopia = hAPI.getCardValue("emailsCopia");
    log.info("emailsCopia: " + emailsCopia);
    emailsCopia = emailsCopia.split(" ");
    for (var i = 0; i < emailsCopia.length; i++) {
        destinatarios.add(emailsCopia[i]);
        log.info("I: " + i + " emailCopia: " + emailsCopia[i]);
    }

    notifier.notify("FLUIG", "TPL_SUPORTE_JURIDICO", param, destinatarios, "text/html");	
    log.info("fim envio de e-mail.");    
}

function BuscaNomeUsuario(usuario) {
    var c1 = DatasetFactory.createConstraint("colleagueId", usuario, usuario, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("colleague", null, [c1], null);
    return ds.values[0]['colleagueName'];
}