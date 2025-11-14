//ViewerFame that handles CANVAS, is 2D realm
// by realm, the Dots+ are sqashed into 2D 
// Therefore the lattice is the 3D realm, 
// And the proess motor is the 4D realm. 
//Without the lattice, I was squashing all spatial dimensions into 2D, and all temporal, into a module
// With the lattice, the dots are squashed into the lattice, and the lattice is then presented by being squashed into the CANVAS

class RefTimeViewerFrame {
	
    constructor(canasID = "mainCnvs1", TTRatio = 100) {
        this.cnv = document.getElementById(canasID);
	        this.ctx = this.cnv.getContext("2d");
        this.cwidth = this.cnv.width;
        this.cheight = this.cnv.height;
        this.origin = new RefDot((this.cwidth/2), (this.cheight/2), 0);
		let x1 = new RefDot(0,0,0);
		this.observer = x1.regind;

	this.timeratio  = TTRatio;
	//TimeTick: 	
	this.present = 0;
	this.maxTime  = this.timeratio * 100;
	this.spaceprintarray = [];
// maxTimeLoopDuration is the grand loop , within, each tick conceptually needs to represent a full renderng of the spatial object. 
	this.maxTimeLoopDuration = new D1Line(TTRatio * 100); 




	//ideal concept holds ideal objects that have 'interface' of x.draw and x.center
	//And an appropriate multi-object has
	//a time-ordered list of objects (i.e: timeslice.) 
	//this.concept = new MultiLineObject();

	}
		
	
	TickingHand(arg = 0){

clearTimeout(this.presdela);	
	this.present++;
	if(this.present >= this.maxTime){
		this.present = 0;
	}
// process the 3D for this.present's tick
for(let i1 = 0; i1 < this.spaceprintarray.length; i1++){
if(lr(this.spaceprintarray[i1]) instanceof RefLine){this.depthdraw(this.spaceprintarray[i1]);}
}
//set up delay for next tick;
this.presdela = setTimeout(this.TickingHand, this.TTRatio);
	
	}		
	 
 createnewcanvas(xmax = 300,ymax = 300){
	 //each refViewerFrame has its own canvas
	 var ne1 = document.createNewElement("CANVAS");
	 ne1.width = xmax;
	 ne1.height = ymax;
	 return ne1;
 }
 
  insertnewcanvas(pa = document.body, newcan = 0){
	 //because each ViewerFrame has its own canvas, in the case of displaying 5D each viewerframe works in 4D, so the greater_world organizing the 5D needs to hold the viewerframes and initialize them. 
	 //after the creation and insertion , an array can hold the canvases, as this.cnv, then each '5d' realm, can have its own cnv to swap in, if this 'canvasframe' is supposed to house the whole page. 
	 
if(newcan){pa.appendChild(newcan);}

 }
 
whitebackground(){
	this.ctx.beginPath();
	this.ctx.fillStyle="#555555";
	this.ctx.fillRect(0,0,this.cwidth, this.cheight);
}
  wipenfresh () {
    this.ctx.clearRect(0,0,this.cwidth,this.cheight);
   // this.tempdrawhorizonguides();
   // this.remakeaxis(3,this.origin);
}


    clr () {
            this.wipenfresh();
	    }
 
findZforscaledYorX(wid){
//A large object 5000km wide can be displayed on canvas
//t = o/a o = wid; 
let ze = wid / Math.tan(0.463647609000805);
return ze;
} 		
findoppositerightanglewithadjacentandoppositesangle (adj, opang){
    let adan = degtorad(90);
    adan -= opang;
    let sineA = Math.sin(adan);
    let FrA = adj/sineA;
    return (FrA * Math.sin(opang));
}

drawatom (px, py, amu, kala = "#00FF00"){
let nx = Number(this.origin.x) + Number(px);
let ny = Number(this.origin.y) - Number(py);

nx = Number.parseFloat(nx).toFixed(1);
ny = Number.parseFloat(ny).toFixed(1);
printoutt(`DRAW ATOM ${nx}  and ${ny}`);
	let paintgrd = this.ctx.createRadialGradient(nx, ny ,3,nx ,ny, (amu*3));
paintgrd.addColorStop(0, kala);
paintgrd.addColorStop(1, kala);
	this.ctx.fillStyle = paintgrd;
this.ctx.beginPath();
this.ctx.arc(nx, ny, amu ,0, 2 * Math.PI);
this.ctx.stroke(); 
this.ctx.fill();

}

   drawaline (addedrefline) {
      //  dx1 = addedrefline.start.x; dy1 = addedrefline.start.y;
        this.ctx.beginPath();
        this.ctx.strokeStyle = addedrefline.colour; 
        this.ctx.lineWidth = addedrefline.siz;
        let uab = parseInt(this.origin.x) + parseInt(dr(addedrefline.start).x);
        let nab = parseInt(this.origin.x) + parseInt(dr(addedrefline.end).x);
        let uba = parseInt(this.origin.y) - parseInt(dr(addedrefline.start).y);
        let nba = parseInt(this.origin.y) - parseInt(dr(addedrefline.end).y);
                
		this.ctx.moveTo(uab,uba );
        this.ctx.lineTo(nab,nba);
        this.ctx.stroke();   
    }
 
 depthPoint(RivStr){
	 RivStr = checkdotarg(RivStr);
	 RivStr = dr(RivStr);
	 if(RivStr instanceof RefDot){
	 let realmspanse =  this.findoppositerightanglewithadjacentandoppositesangle(RivStr.z , 0.463647609000805);
realmspanse *= 2;
//8then ((opposite * 2) + viewerspan) = x at z ,  
realmspanse += this.cwidth;
//9 then the ratio(z)  = viewerspan / x(z)
let realmspanseratio = this.cwidth/realmspanse;
//11 once ratio(z) = canvas/spanse(z),  then for point (x,y,z), the x=0->x 
//12 so ratio(z) * x = f(x)<x 
let sx1 = RivStr.x * realmspanseratio;
realmspanse = realmspanse - this.cwidth + this.cheight;
realmspanseratio = this.cheight/realmspanse; 
let sy1 = RivStr.y * realmspanseratio;
 var rv = [sx1, sy1, RivStr.z];
 return rv;
 }
 }
 
 
 drawPixelArray(pixarr, siz = 3, kala = "#009911"){
	      this.ctx.beginPath();
        this.ctx.strokeStyle = kala; 
        this.ctx.lineWidth = siz;
        let uab = pixarr[0];
        let nab = pixarr[0] + 1;
        let uba = pixarr[1];
        let nba = pixarr[1] - 1;
                
		this.ctx.moveTo(dr(this.origin).x + uab,dr(this.origin).y - uba );
	     this.ctx.lineTo(dr(this.origin).x + nab,dr(this.origin).y - nba);
	    this.ctx.stroke();   
 }
 
drawSphCoo(RivStr, kala = "#008800"){
if((RivStr instanceof SphCoo)){
	let d1 = RivStr.returnInto4DLightRefDot();	
	let va1 = this.depthPoint(d1);
	this.drawPixelArray(va1,2,kala);
/*
var td = new RefDot(start.getX(), start.getY(), start.getZ());
var ud = new RefDot(end.getX(), end.getY(), end.getZ());

var tl = new RefLine(td, ud);
this.depthdraw(tl);
*/



}}

drawPixelatedDot(tdot){
tdot = checkdotarg(tdot);
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        let uab = parseInt(this.origin.x) + parseInt(dr(tdot).x);
        let uba = parseInt(this.origin.y) - parseInt(dr(tdot).y);

                
		this.ctx.moveTo(uab,uba );
        this.ctx.lineTo(uab+1,uba-1);
        this.ctx.stroke();   


}


depthdraw (Rhine){	
        Rhine = lr(checklinearg(Rhine));
        if(!(Rhine instanceof RefLine)){return;}
        
        Rhine.refresh(); 
    let s = dr(Rhine.start);
    let e = dr(Rhine.end); 
	let o = dr(this.origin);

let sx = s.x + o.x;
let sy = s.y + o.y;
let sz = s.z + o.z; 
    // End point (observer-shifted) 
	
let ex = e.x + o.x;
let ey =  e.y + o.y;
let ez =  e.z + o.z;

    // Atomic radii + colours remain bound to original dots
    let sAtomic = s.atomic;
    let eAtomic = e.atomic;
    let sColour = s.colour;
    let eColour = e.colour;
	
        // Perspective projection logic
        const angle = 0.4636476090008054; // Radians 
		let realmspanse_end = this.findoppositerightanglewithadjacentandoppositesangle(sz , angle) * 2;
        realmspanse_end += this.cwidth;
         let ratio_start =  (this.cwidth / realmspanse_end);
       
        let sx1 = sx * ratio_start;
        let sy1 = sy * (this.cheight / (realmspanse_start - this.cwidth + this.cheight));
		
		let realmspanse_end = this.findoppositerightanglewithadjacentandoppositesangle(ez , angle) * 2;
        realmspanse_end += this.cwidth;
         let ratio_end =  (this.cwidth / realmspanse_end);
    	  
        let ex1 = ex * ratio_end;
        let ey1 = ey * (this.cheight / (realmspanse_end - this.cwidth + this.cheight)); 
        
        //for drawing.
		this.drawaline(sx1,sy1,ex1,ey1,Rhine.colour, Rhine.siz);
        if(sAtomic != -1){
            this.drawatom(sx1, sy1, sAtomic * ratio_start , sColour);
        }
        if(eAtomic != -1){
            this.drawatom(ex1, ey1, eAtomic * ratio_end  , eColour);
        }
         
    }

drawRegLine(RLineIndx){
	var t1;
	if(RLineIndx instanceof RefLine){
		t1 = RLineIndx;
	}else{
		t1 = lr(RLineIndx);
	}
	if(t1 instanceof RefLine){
		this.depthdraw(t1);
	}
	
}

drawSphericalDot(SD){
SD = checkdotarg(SD);
dr(SD).CongruenceSphericalTo3D();
let nl1 = new RefLine(dr(dr(SD).SC[3]), dr(SD));
this.depthdraw(nl1);
nl1.rubbish(0);
}

drawPixel(SD){
    SD = checkdotarg(SD);
    let SE = new RefDot(dr(SD).x+1, dr(SD).y+1, dr(SD).z+1);
    let nl1 = new RefLine(SD, SE);
    this.depthdraw(nl1);
    nl1.rubbish(1);
    SE.rubbish();
}
}//
var globalviewerframe = new RefTimeViewerFrame();

