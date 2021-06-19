var formAlvara = document.getElementById('FormAlvara')
var formComprovante = document.getElementById('FormComprovante')
var formNotaFiscal = document.getElementById('FormNotaFiscal')
var formContrato = document.getElementById('FormContrato')
var formFatura = document.getElementById('FormFatura')

function selectedType() {
    var select = document.getElementById('formSelect')
    var option = select.options[select.selectedIndex].value

    switch (option) {
        case '1':
            formComprovante.hidden = true
            formNotaFiscal.hidden = true
            formContrato.hidden = true
            formFatura.hidden = true
            formAlvara.hidden = false
            break
        case '2':
            formNotaFiscal.hidden = true
            formAlvara.hidden = true
            formContrato.hidden = true
            formFatura.hidden = true
            formComprovante.hidden = false
            break
        case '3':
            formComprovante.hidden = true
            formNotaFiscal.hidden = true
            formAlvara.hidden = true
            formFatura.hidden = true
            formContrato.hidden = false
            break
        case '4':
            formComprovante.hidden = true
            formNotaFiscal.hidden = true
            formAlvara.hidden = true
            formContrato.hidden = true
            formFatura.hidden = false
            break
        case '5':
            formAlvara.hidden = true
            formComprovante.hidden = true
            formContrato.hidden = true
            formFatura.hidden = true
            formNotaFiscal.hidden = false
            break
    }
}