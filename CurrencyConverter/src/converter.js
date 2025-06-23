"use strict";
var _a;
(_a = document.getElementById('convert')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('dconvert').value);
    const currency = document.getElementById('currency').value;
    let convamount;
    let currencyS;
    switch (currency) {
        case 'Dollor':
            convamount = (amount * 0.012).toFixed(2);
            currencyS = 'Dollor';
            break;
        case 'Euro':
            convamount = (amount * 0.011).toFixed(2);
            currencyS = 'Euro';
            break;
        case 'Pound':
            convamount = (amount * 0.009).toFixed(2);
            currencyS = 'Pound';
            break;
        default:
            document.getElementById('result').innerHTML = `Please select a currency`;
            return;
    }
    document.getElementById('result').innerHTML = `Converted amount ${convamount} ${currencyS}`;
});
