var FormFilterAlvara = document.getElementById('FormFilterAlvara')
var FormFilterComprovante = document.getElementById('FormFilterComprovante')
var FormFilterContrato = document.getElementById('FormFilterContrato')
var FormFilterFatura = document.getElementById('FormFilterFatura')
var FormFilterNotaFiscal = document.getElementById('FormFilterNotaFiscal')

function selectedType() {
    var select = document.getElementById('formSelect')
    var option = select.options[select.selectedIndex].value

    switch (option) {
        case '1':
            FormFilterAlvara.hidden = false
            FormFilterComprovante.hidden = true
            FormFilterContrato.hidden = true
            FormFilterFatura.hidden = true
            FormFilterNotaFiscal.hidden = true
            break
        case '2':
            FormFilterAlvara.hidden = true
            FormFilterComprovante.hidden = false
            FormFilterContrato.hidden = true
            FormFilterFatura.hidden = true
            FormFilterNotaFiscal.hidden = true
            break
        case '3':
            FormFilterAlvara.hidden = true
            FormFilterComprovante.hidden = true
            FormFilterContrato.hidden = false
            FormFilterFatura.hidden = true
            FormFilterNotaFiscal.hidden = true
            break
        case '4':
            FormFilterAlvara.hidden = true
            FormFilterComprovante.hidden = true
            FormFilterContrato.hidden = true
            FormFilterFatura.hidden = false
            FormFilterNotaFiscal.hidden = true
            break
        case '5':
            FormFilterAlvara.hidden = true
            FormFilterComprovante.hidden = true
            FormFilterContrato.hidden = true
            FormFilterFatura.hidden = true
            FormFilterNotaFiscal.hidden = false
            break
    }
}
