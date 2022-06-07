	var toRad=0.017453292519943;
	
	var elpsd = {
        def: 'GRS80',
        a: 6378137.0,
        f: 298.257222101,
    	b: 0.0,
        c: 0.0,
        e1: 0.0,
        e2: 0.0,
//Coğrafi koordinatlardan elde edilen α,β,γ,δ    
        alfa: 0.0,
        beta: 0.0,
        gama: 0.0,
        delta: 0.0,
        ok: 0.0,
        upd: function () {
          this.f = 1.0 / this.f;
          this.b = this.a * (1.0 - this.f);
          this.c = Math.pow(this.a, 2.0) / this.b;
          this.e1 = (Math.pow(this.a, 2.0) - Math.pow(this.b, 2.0)) / Math.pow(this.a, 2.0);
          this.e2 = (Math.pow(this.a, 2.0) - Math.pow(this.b, 2.0)) / Math.pow(this.b, 2.0);
          this.alfa = this.a * (1.0 - this.e1) * (1.0 + 0.75 * this.e1 + 0.703125 * Math.pow(this.e1,2.0) + 0.68359375 * Math.pow(this.e1,3.0) + 0.67291259765625 * Math.pow(this.e1,4.0));
          this.beta = this.a * (1.0 - this.e1) / 2.0 * (0.75 * this.e1 + 0.9375 * Math.pow(this.e1,2.0) + 1.025390625 * Math.pow(this.e1,3.0) + 1.07666015625 * Math.pow(this.e1,4.0));
          this.gama = this.a * (1.0 - this.e1) / 4.0 * (0.234375 * Math.pow(this.e1,2.0) + 0.41015625 * Math.pow(this.e1,3.0) + 0.538330078125 * Math.pow(this.e1,4.0));
          this.delta = this.a * (1.0 - this.e1) / 6.0 * (0.068359375 * Math.pow(this.e1,3.0) + 0.15380859375 * Math.pow(this.e2,4.0));
          this.ok = 1;
        }
      }
      elpsd.upd();
      
                     
	  function G(fi){
    //Meridyen Yay Uzunluğu  
             return elpsd.alfa * (fi*toRad) - elpsd.beta * Math.sin(2*fi*toRad) + elpsd.gama * Math.sin(4*fi*toRad) - elpsd.delta * Math.sin(6*fi*toRad);
                      }
    
      function N(fi){
   //Elipsoidde meridyene dik yöndeki eğrilik yarıçapı
	         return  elpsd.a / Math.sqrt(1 - elpsd.e1 * Math.pow(Math.sin(fi * toRad),2.0));
                      }
                              


     function TMX(lamda,dom,fi){
   //TM X
        return G(fi) + N(fi) * (Math.pow((lamda - dom) * toRad,2.0) / 2.0 * Math.sin(fi * toRad) * Math.cos(fi * toRad) + Math.pow((lamda - dom) * toRad,4.0) / 24.0 * Math.sin(fi * toRad) * Math.pow(Math.cos(fi * toRad),3.0) * (5.0 - Math.pow(Math.tan(fi * toRad),2.0) + 9.0 * elpsd.e2 * Math.pow(Math.cos(fi*toRad),2.0) + 4.0 * Math.pow(elpsd.e2,2.0) * Math.pow(Math.cos(fi * toRad),4.0))) ;
	                          }
		  
	 function TMY(lamda,dom,fi){
   //TM Y + 500000m   	 	 
		return 500000.0 + N(fi) * ((lamda - dom) * toRad * Math.cos(fi * toRad) + Math.pow((lamda - dom) * toRad * Math.cos(fi * toRad),3.0) / 6.0 * (1.0 - Math.pow(Math.tan(fi * toRad),2.0) + elpsd.e2 * Math.pow(Math.cos(fi * toRad),2.0)) + Math.pow((lamda - dom) * toRad * Math.cos(fi * toRad),5.0) / 120.0 * (5.0 - 18.0 * Math.pow(Math.tan(fi * toRad),2.0) + Math.pow(Math.tan(fi * toRad),4.0))) ; 
		                      }  
   
     function UTMX(lamda,dom,fi){
   //UTM m0 * X
        return 0.9996 * (G(fi) + N(fi) * (Math.pow((lamda - dom) * toRad,2.0) / 2.0 * Math.sin(fi * toRad) * Math.cos(fi * toRad) + Math.pow((lamda - dom) * toRad,4.0) / 24.0 * Math.sin(fi * toRad) * Math.pow(Math.cos(fi * toRad),3.0) * (5.0 - Math.pow(Math.tan(fi * toRad),2.0) + 9.0 * elpsd.e2 * Math.pow(Math.cos(fi*toRad),2.0) + 4.0 * Math.pow(elpsd.e2,2.0) * Math.pow(Math.cos(fi * toRad),4.0)))) ;
	                          }
		  
	 function UTMY(lamda,dom,fi){
   //UTM m0 * Y + 500000m   	 	 
		return 500000 + 0.9996 * (N(fi) * ((lamda - dom) * toRad * Math.cos(fi * toRad) + Math.pow((lamda - dom) * toRad * Math.cos(fi * toRad),3.0) / 6.0 * (1.0 - Math.pow(Math.tan(fi * toRad),2.0) + elpsd.e2 * Math.pow(Math.cos(fi * toRad),2.0)) + Math.pow((lamda - dom) * toRad * Math.cos(fi * toRad),5.0) / 120.0 * (5.0 - 18.0 * Math.pow(Math.tan(fi * toRad),2.0) + Math.pow(Math.tan(fi * toRad),4.0)))) ; 
		                      }  
 
 
                          

function selectdatum(i)
{
  switch(i)
  {
    case 0:
    //WGS84
     elpsd.a=6378137.;
     elpsd.f=1/298.257223563;
     break;
    case 1:
    //GRS80
    elpsd.a=6378137.;
    elpsd.f=1/298.257222101;
     break;             
    case 2:
    //ED50
    elpsd.a=6378388.;
    elpsd.f=1/297.;
     break; 
    case 3:
    //Bessel
    elpsd.a=6377397.155;
    elpsd.f=1/299.1528128;
     break;            
  }
}


     
	  

 


