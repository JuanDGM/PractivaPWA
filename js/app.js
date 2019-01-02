
var url =window.location.href;

var swLocation = '/PractivaPWA/sw.js'; 


if(navigator.serviceWorker){
   
    if(url.includes('localhost')){
    
    navigator.serviceWorker.register('sw.js'); 
   
   }else{
    navigator.serviceWorker.register(swLocation);    
       
   }
   
}
