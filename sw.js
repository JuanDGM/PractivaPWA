
importScripts('./sw-utils.js');

const STATIC_CACHE    = 'static-v2';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL=[
    //'/',
    'index.php',
    'style/style.css',
    'js/app.js',
    'sw.js',
    'manifest.json',
    'sw-utils.js'
];

const APP_INMUTABLE=[
    'librery/Bootstrap/css/bootstrap.min.css',
    'librery/js/jquery-3.2.1.min.js',
    'librery/Bootstrap/js/bootstrap.min.js'
];

self.addEventListener('install', e=>{
    
    const Responstatic = caches.open(STATIC_CACHE).then(res=>{
       res.addAll(APP_SHELL);
   });
    
    const Responsinmutable = caches.open(INMUTABLE_CACHE).then(res_=>{
        res_.addAll(APP_INMUTABLE);
});
    
    e.waitUntil( Promise.all([Responstatic, Responsinmutable]) );
    
});


self.addEventListener('activate', e=>{
    
    
    const respuesta = caches.keys()
            .then(res=>{
        
        res.forEach( k=>{
            
            if(k!= STATIC_CACHE && k.includes('static')){
                
                return caches.delete(k);
                
            }
            
        });
        
    });
    
    e.waitUntil(respuesta);
    
});



// Cache only


self.addEventListener('fetch', e=>{
    
    const respuesta = caches.match(e.request).then(res=>{
        
        if(res){
            return res;
        }else{
            //console.log(e.request.url);
            
          return fetch(e.request.url).then(newRes=>{
              
                 return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);   
                    
                });
        }      
        
    });  
       
       
       
    e.respondWith( respuesta );
    
});




