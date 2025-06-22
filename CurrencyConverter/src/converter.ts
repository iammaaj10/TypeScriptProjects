
document.getElementById('convert')?.addEventListener('click' , ()=>{
   const amount = parseFloat((document.getElementById('dconvert') as HTMLInputElement).value);
   const currency = (document.getElementById('currency') as HTMLInputElement).value;

   let convamount;
   let currencyS;

    switch(currency) {
        case 'Dollor':
             convamount = (amount * 0.012).toFixed(2);
             currencyS = 'Dollor';
             break;
         
         case 'Euro':
             convamount = (amount * 0.011).toFixed(2);
             currencyS = 'Euro';
             break;
             
         case 'Pound' :
                convamount = (amount * 0.009).toFixed(2);
                currencyS = 'Pound';
                break;   
                
                
         default:
           ( document.getElementById('result')as HTMLInputElement).innerHTML=`Please select a currency`     
            return; 
            
    }

       ( document.getElementById('result')as HTMLInputElement).innerHTML=`Converted amount ${convamount} ${currencyS}`


})