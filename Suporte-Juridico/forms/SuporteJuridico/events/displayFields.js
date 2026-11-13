function displayFields(form,customHTML){
    form.setValue("usuarioLogado", getValue("WKUser"));
    form.setValue("modo", form.getFormMode());
    form.setValue("numProcess", getValue('WKNumProces'));
    form.setValue("atividade", getValue('WKNumState'));

    
}