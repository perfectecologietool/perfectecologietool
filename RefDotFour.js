function TodaygetTime (){
	let da = new Date();
	return da.getTime();
}
/**
 * Dot Class
**/
var prevision = 22;
var StackTrace = [];
/* Function Template
function nameafunc (args){
var STI = pushStackTrace("nameafunc");
...
popStackTrace(STI);
}
*/

function popStackTrace (ind){
	StackTrace.splice(ind,1);
}

function pushStackTrace(nameofun){
let v1 = StackTrace.push(nameofun);
return v1 - 1;
}

function PrintStackTrace(){
	let str1 = "+";
	for(let i1 = 0; i1 < StackTrace.length; i1++){
str1 += "<br>+";	
	for(let i1c = 0; i1c < i1; i1c++){
			str1 += "-";
		}
		str1 += StackTrace[i1];
	}
	str1 += "<br>";
return str1;
}

var globalfuname = "black";
function printoutt(xdat, dest = "lbl3"){
	let glob = PrintStackTrace();
 document.getElementById(dest).innerHTML += "<br>"+ glob + "-_ _ _ _-<br>" + xdat;
 } 
 var errcount = 0;
 function printoneline(xdat){
 errcount++;
 document.getElementById("lbl3").innerHTML += `${errcount}` + xdat;
 }
var dusmds1 = 0;
function debugprinter(strin) {
	if(dusmds1 == 200){
document.getElementById("debugger").innerhtml = " ";
dusmds1 = 0;
	}else{
		dusmds1++;
		}
	document.getElementById("debugger").innerhtml +=  `<br>${dusmds1}` + strin ;
}


function radtodeg(rad){
    return (rad * (180/Math.PI));
}

function degtorad(deg){
    return (deg * (Math.PI/180));
}

function JSONprintdot(adot){
printoutt(JSON.stringify(adot));
}
function JSONprintLine(aline){
printoutt(JSON.stringify(aline));
}

  
var MutexRefreshFlag = 1;
 
//To Show the growth of a 4
class SphCoo {
	constructor (a = 0, b = 0, c = 0, d=1){
this.R  = 0; this.a = 0; this.b = 0; this.regind = 0;
	if(a instanceof RefDot){
			this.calculateFromComponents(a);
		}else{
		//always relative to ct(0,0,0)
		this.R = Number(a);
		this.a = Number(b);
		this.b = Number(c);
	}
	}
	
	setR(x){ this.R = Number(x);
	if(this.R != Number(x)){
	
		if( MutexRefreshFlag){this.redefineDot();}
	}
	}
	getR(){return this.R;}
	seta(x){ 
	if(this.a != Number(x)){
	this.a = Number(x);
			if( MutexRefreshFlag){this.redefineDot();}
	}}
			
	geta(){return this.a;}
	setb(x){ 
	if(this.b != Number(x)){
	this.b = Number(x);
			if( MutexRefreshFlag){this.redefineDot();}
	}}
	getb(){return this.b;}
	
	findR(efdo){efdo=dr(checkdotarg(efdo));return Math.sqrt((efdo.x * efdo.x)+(efdo.y * efdo.y)+(efdo.z * efdo.z));}
	findaz(efdo){
	efdo=dr(checkdotarg(efdo));	
	let tyx = Math.sqrt((efdo.x * efdo.x) + (efdo.y * efdo.y) );
	if(efdo.z !=	0){
return(Math.atan(tyx/efdo.z));	
	}else{
	return( 0);
	}
	}
	
	findbyx(efdo){
		efdo=dr(checkdotarg(efdo));
		if(efdo.x != 0){
return(Math.atan(efdo.y / efdo.x));
}else{
return(0);
	}
	}
	
getX(){
let ez = this.getR() * Math.sin(this.geta());
let tyz = Math.sqrt((this.getR() * this.getR() ) - (ez * ez));
return ( tyz * Math.cos(this.getb()));
}

getY(){
let ez = this.getR() * Math.sin(this.geta());
let tyz = Math.sqrt((this.getR() * this.getR() ) - (ez * ez));
return ( tyz * Math.sin(this.getb()));
}

getZ(){
return this.getR() * Math.sin(this.geta());
}

redefineDot(){
	//This Function relies on DotRegister Class using this SphCoo Class within it.  
let paireddot = dr(this.regind);
  
MutexRefreshFlag = 0;
paireddot.setX(this.getX());
paireddot.setY(this.getY());
paireddot.setZ(this.getZ());
paireddot.setT(this.getR());
  MutexRefreshFlag = 1;
}

returnInto4DLightRefDot(){
	// produces cartesian coordinate of the end point of R at angles a and b, assuming start point is 0,0,0
let ez = this.getR() * Math.sin(this.geta());
let tyz = Math.sqrt((this.getR() * this.getR() ) - (ez * ez));
let ey = tyz * Math.sin(this.getb());
let ex = tyz * Math.cos(this.getb());
let rtv = new RefDot(ex, ey, ez, this.getR() );
return rtv.regind;

}	
	
calculateFromComponents(ConVec){
//@NAME@ Really .calculateFromRefDot()
//@PARAM@ The natural RefDot (free from 0,0,0) to which this.{R,a,b} points
//@PARAM a.k.a@ The delta component vector. 


ConVec = checkdotarg(ConVec); if(dr(ConVec) instanceof RefDot){	
	this.setR(Math.sqrt( (dr(ConVec).x * dr(ConVec).x) + (dr(ConVec).y * dr(ConVec).y) + (dr(ConVec).z * dr(ConVec).z) )) ;
if(dr(ConVec).x != 0){
this.setb(Math.atan(dr(ConVec).y / dr(ConVec).x));
}else{
this.setb(0);
}
	let tyx = Math.sqrt((dr(ConVec).x * dr(ConVec).x) + (dr(ConVec).y * dr(ConVec).y) );
	if(dr(ConVec).z !=	0){
this.seta(Math.atan(tyx/dr(ConVec).z));	
	}else{
	this.seta( 0);
	}
}

}

print(){
	printoutt(`This SC is [R,A,B,T] = [${this.getR()},  ${this.geta()}, ${this.getb()}, ]`);
	
}

}


 class DotRegister {
	 //an array of dots for the application. fetchdot returns a RefDot{}; pushdot envcorporates a RefDot{}; popnum garbages a dot.
	 constructor () {
//		 globalfuname = "DotRegister.constructor";
	this.first = [];
	this.second = [];
	this.sphere = [];
	 }
	 
	 //send whole dot as param
	 pushdot(dot){
let vidid =	 pushStackTrace("DotRegister.popdot");
		 //called from only Dot.construct
		 if(dot instanceof RefDot){ 
		this.second.push(dot);
		this.sphere.push(new SphCoo(dot));
		this.sphere[this.sphere.length - 1].calculateFromComponents(dot);
		this.first.push(this.second.length - 1);
popStackTrace(vidid);	
this.sphere[this.sphere.length - 1].regind = this.first.length - 1;
//dot.regind		
if(this.first.length -1 == 115){ // hack for 2Draw003tespheDrawer.html error FIND WHY THIS DOT IS DROPPED BY REGISTER
//MAYBE I NEED TO START FROM SCRATCH.
 printoutt(`${JSON.stringify(	this.second[this.first[this.first.length-1]])}`);
 printoutt(`${JSON.stringify(	dot)}`);
}
		return (this.first.length - 1);
		 }else{alert("not a dot being registered.");}
	 }
	 
	 printdump(ind = 1){
		 //A troubleshooting printdump would be print(index, Stringfy(FIRST) 
		 printoutt(`Dot Register ${this.first.length} first elements, and ${this.second.length} second elements.`);
if(ind >1 ){	
	printoutt("FIRST <BR> " + JSON.stringify(this.first));
		 printoutt("SECOND <BR>" + JSON.stringify(this.second));
}
 }
 
	 popnum (ind) {
let vidid =	 pushStackTrace("DotRegister.popnum");
//	this.printdump(ind); //protect zero
	if((Number(ind) > 0)&&(ind < this.first.length) && (ind > (0 - this.first.length))){// the ind refers to first[]
	var FV1 = this.first[ind];
	if(FV1 != -1){
		this.second.splice(FV1,1); 
		this.sphere.splice(FV1,1);
		for(let ite1 = 0; ite1 < this.first.length; ite1++){
			if(this.first[ite1] > FV1){this.first[ite1]--;}
		}
		this.first[ind] = -1;
	}
	}	 
popStackTrace(vidid);	 
	}
		
	 fetchdot(ind){
let vidid =	 pushStackTrace("DotRegister.fetchdot");
if(ind instanceof RefDot){popStackTrace(vidid); if(this.second[this.first[ind.regind]] instanceof RefDot){return this.second[this.first[ind.regind]];}else{return ind;}}
		if((ind >= 0) && (ind <= this.first.length)){ 
			let rd = this.first[ind];
			if(rd != -1){//assume the value is always a cogent index.
				var sd = this.second[rd];
popStackTrace(vidid);			
			return sd;	
			}
		 }
//this.printdump();		 
		// printoutt(`XXX Out Of Bounds Fetchdot(${ind}`);
popStackTrace(vidid);			
		 return -1;
	 }
	 
	 	 fetchsphere(ind){
let vidid =	 pushStackTrace("DotRegister.fetchsphere");
if(ind instanceof RefDot){popStackTrace(vidid);return ind;}

if((ind >= 0) && (ind <= this.first.length)){ 
	let rd = this.first[ind];
	if(rd != -1){
	var sd = this.sphere[rd];

popStackTrace(vidid);			
			return sd;	
			}
		 }
popStackTrace(vidid);			
		 return -1;
	 }
	 
 }
 

var dotreg = new DotRegister();
 function dr (indexor){
	 return dotreg.fetchdot(indexor);;
 }
 function drs(indexor){
	 return dotreg.fetchsphere(indexor);
 }

 

class RefDot {
/* 
*/
 constructor (p3 = 0 , p4 = 0, p5 = 0 , p0 = 1, no1 = -1,prim=1) {
	// this.SC = [0,0,0,0];
	 	let vidid =	 pushStackTrace("RefDot.constructor");
	 this.classtype = "RefDot";
       // this.points = [this];
	this.neighbour; 
	this.c = 0;
	MutexRefreshFlag = 0;
        this.setX(p3); 
        this.setY(p4); 
        this.setZ(p5);
		if(p0 instanceof D1Line){
				this.placeInTime(p0);
			}else{
				this.setTyme(p0);
				}
    this.colour = "#00FF00"; 
//      this.setParentObject(no1);
		this.gcc = 1;//garbage collection count // incase two lines remove the same dot from the register, then 
		this.atomic = no1;
		this.links = [];
		this.prime = prim;
this.timeaccruer = 0;
	MutexRefreshFlag = 1;
		this.regind = dotreg.pushdot(this);
        popStackTrace(vidid);
    }
	
    rubbish(){
		//if(this.timeaccruer == 0){
	//	if(this.timeaccruer < 0){this.print();}
	//	if(this.timeaccruer < 1){
			
		dotreg.popnum(this.regind);
	//	}
	}
	refresh() {this.integerize();}
	pushLink(arefdotref){		
	// The Link doesn't need to be a line
	// the link can just be a dot
	//consider if a dot is MIL and the DIL is wife of Father. Then Father is Son of MIL. 
	//Then MIL has husband, MIL has own MIL. and MIL is daughter
if(this.links.length <4){this.links.push(arefdotref);}
//do IDs
// Technically, a Father is a Son, a Mother is a Mother in law and a daughter. 
//But one is either male or female. 
if(this.ID == "Mother-In-Law"){
}
if(this.ID == "Mother"){
}
if(this.ID == "Father"){
}
if(this.ID == "Son"){
}
if(this.ID == "Daughter"){
}




	}	
	setEnergy(ejoule = -1){
		let vidid =	 pushStackTrace("Dot.setEnergy");
		var secfla = 0;
if(ejoule < 0){var sec = new Dot(0,0,0,new D1Line(0)); secfla = 1;
ejoule = sec.regind;}
	
	// x.y.z.x.y.z./t.t 
	this.energy = dr(ejoule);
	
	if(secfla == 1){dr(ejoule).rubbish();}
	popStackTrace(vidid);
	}
	momentum(ETA = new D1Line(1)){
		let vidid =	 pushStackTrace("momentum");
	// x.y.z/t 
	// XXX multiply energy CORRECT RATIO according to ETA.duration
// So if Energy is x,y,z t=3 
//then forevery t=3, the dot moves xyz
//but if ETA = 2, then TimeFlow has moved t=2, 
//thus energy applied is 2/3 * xyz
	// ie: ETA/Energy.t 
	//eg: ETA.t/Energy.t * Energy.xyz = World.xyz
// XXX HOW TO DO THIS WITHOUT DIVISION? 
// 1) have a local counter that accrues until natural factor of energy.t
let heretimeratio = 0;
if(ETA.duration < this.energy.t.duration){
	this.timeaccruer += ETA.duration; 
	//i.e: timeaccruer = 2,4,6
if(0 == (this.timeaccruer % this.energy.t.duration)){
	heretimeratio = this.timeaccruer / this.energy.t.duration;
this.setX(this.x + (this.energy.x * heretimeratio));
this.setY(this.y + (this.energy.y * heretimeratio));
this.setZ(this.z + (this.energy.z * heretimeratio));
	this.timeaccruer = 0;
	}
	}
if(ETA.duration > this.energy.t.duration){
	//eta  =3 energy.t  =2
	this.timeaccruer += ETA.duration;
		//timeaccruer = 3,6
if(0 == (this.timeaccruer % this.energy.t.duration)){
	heretimeratio = this.timeaccruer / this.energy.t.duration;
this.setX(this.x + (this.energy.x * heretimeratio));
this.setY(this.y + (this.energy.y * heretimeratio));
this.setZ(this.z + (this.energy.z * heretimeratio));
	this.timeaccruer = 0;
	}
	}	
popStackTrace(vidid);
}

checkarg(x1){
	//private function. 
	if(x1 instanceof RefDot){return x1.regind;}else{
		//should check if x1 < first.length
		if(x1 < dotreg.first.length){
	return x1;}else{
	//FIX HERE OPTION
	return x1;
	}
	}
}


	setConstant (newx){
        this.c = Number(newx);
	if( MutexRefreshFlag){this.redefineSphere();}
    }
    setX (newx){
        this.x = Number(newx);
	if( MutexRefreshFlag){this.redefineSphere();}
    }
    setY (newy){
        this.y = Number(newy);
if( MutexRefreshFlag){this.redefineSphere();}
    }
    setZ (newz){
        this.z = Number(newz);
	if( MutexRefreshFlag){this.redefineSphere();}
    }
	setTyme(newt){
let vidid =	 pushStackTrace("setTyme");
	if(newt instanceof D1Line) {
		this.t = newt;
	}else{
		this.t = new D1Line(Number(newt));}   
popStackTrace(vidid);    
	}
    setT(variabl){this.setTyme(variabl);}
	placeInTime (aD4Line){
let vidid =	 pushStackTrace("RefDot.placeInTime");;
		if(aD4Line instanceof D1Line){
		this.t = aD4Line;
		}else{
			printoutt("XXX D1line.placeInTime XXX");
		}
popStackTrace(vidid);
	}
	
	setAtom(AMU = 3){
		this.atomic = AMU; 
	}
	
	resetxyzt(newdot){
		newdot = checkdotarg(newdot);
		this.setX(dr(newdot).x);
		this.setY(dr(newdot).y);
		this.setZ(dr(newdot).z);
		this.setTyme(dr(newdot).t);
		
		
	}

    moveIn3D(dx=0,dy=0,dz=0){
		this.setX(dx); this.setY(dy);this.setZ(dz);
	}
	redefineSphere(){	
	MutexRefreshFlag =0; 
		let mysphere = drs(this.regind);
mysphere.calculateFromComponents(this);
 MutexRefreshFlag = 1;
	}


    setFrameOrigin(Ori) {
let vidid =	 pushStackTrace("RefDot.setFrameOrigin");
        /*frame origin as a set of coords sits inside the "universal" coord system. as does this.x this.y, is within universal coordsystem 
        //but when framedot gets set within setX, then framedot is relative to FrameOrigin (so this.x = 4 and this.shadowx = 2, then frameorigin.x = 2)
        //seems like if i use a secondary dot, then the class Dot while be relativitically inclined, also becomes a 1D line masquerading as a 0D dot...but then all numbers are 1D... so the value itself is relative to assumed origin(0,0,0) with frameorigin t he origin is explicit not assumed.*/
        if(Ori instanceof RefDot){this.FrameOrigin = Ori;}
popStackTrace(vidid);
	}
    setParentObject (obj) {//for if instanceof actions
        this.parentObject = obj;
    } 
   
   shiftplace(q1 = 0,q2 = 0,q3 = 0,q4 = 0) {
       //adds these coordinates to this Dot`
       this.setX(this.x + q1); 
       this.setY(this.y + q2); 
       this.setZ(this.z + q3);
       if(0 == this.t.whetherpointintersects(q4)){
           this.t.shiftanyendpoint(q4);}
    }

copyOfDot () {
let vidid =	 pushStackTrace("RefDot.copyOfDot");
let t1 = new RefDot(this.x, this.y, this.z, 1, this.atomic);
 t1.placeInTime(this.t);
 t1.colour = this.colour;
 popStackTrace(vidid);
    return t1.regind;
    }
    
addDot (addenddot) {
	addenddot = this.checkarg(addenddot);
let vidid =	 pushStackTrace("RefDot.addDot");
    if(dr(addenddot) instanceof RefDot){    
            this.setX(this.x + dr(addenddot).x);
			this.setY(this.y + dr(addenddot).y);
			this.setZ(this.z + dr(addenddot).z); 
			//this.C += addeddot.c
            this.t.addD1Line(dr(addenddot).t); 
        }    
popStackTrace(vidid);
}

   subtractDot (addenddot){
	   
	addenddot = this.checkarg(addenddot);
let vidid =	 pushStackTrace("RefDot.subtractdot");
        if(dr(addenddot) instanceof RefDot){
            this.setX(this.x - dr(addenddot).x);
            this.setY(this.y - dr(addenddot).y);
            this.setZ(this.z - dr(addenddot).z);    
            this.t.minusD1Line(dr(addenddot).t);
        }
popStackTrace(vidid);    
	}
    
    singlefactormultiply (factor){
let vidid =	 pushStackTrace("RefDot.singlefactormultiply");
//printoutt(`${this.x} and ${factor}` + JSON.stringify(factor));
        this.setX(this.x * factor);
        this.setY(this.y * factor);
//printoutt(`${this.y} and ${factor}`);		
        this.setZ(this.z * factor);
//		printoutt(`${this.z} and ${factor}`);
popStackTrace(vidid);    
	}
    
    matrixmultiply (facdot){	
	facdot = this.checkarg(facdot);
let vidid =	 pushStackTrace("RefDot.matrixmultiply");    
    this.setX(this.x * dr(facdot).x);
        this.setY(this.y * dr(facdot).y);
        this.setZ(this.z * dr(facdot).z);
popStackTrace(vidid);    
    }
    
    dotproduct (facdot){
		facdot = this.checkarg(facdot);
let vidid =	 pushStackTrace("RefDot.dotproduct");
popStackTrace(vidid); 
     return ((this.x * dr(facdot).x)+(this.y * dr(facdot).y)+(this.z * dr(facdot).z));  
    }
	
Xproduct(ft){
		ft = this.checkarg(ft);
		//i j k 
		//a b c
		//w e r
		//i = br - ce
		//j = cw - ar
		//k = ae - bw
		let i1 = (this.y * dr(ft).z) - (this.z * dr(ft).y);
		let i2 = (this.z * dr(ft).x) - (this.x * dr(ft).z);
		let i3 = (this.x * dr(ft).y) - (this.y * dr(ft).x);
		return new RefDot(i1,i2,i3,this.t);
	}
    returndelta (compdot){
		compdot = this.checkarg(compdot);
let vidid =	 pushStackTrace("RefDot.returndelta");
		if(dr(compdot) instanceof RefDot){
			var tre = this.copyOfDot();
			dr(tre).subtractDot(compdot);
			popStackTrace(vidid); 
			return tre;
		}
popStackTrace(vidid);    
	}
    
        //foresight
    changeplace (p1,p2,p3){
		this.setX(p1); this.setY(p2);this.setZ(p3);
	}

    changetime (t1) {

		if(t1 instanceof D1Line) {
				this.t = t1;
		}else{	this.t.extendbysignedEW(t1);} 

	}
    
 isSpatiallyEquivalent(secdot = -1, gran = 3){
	 let vidid =	 pushStackTrace("RefDot.isSpatiallyEquivalent");  
		if(secdot == -1){return 0;}
		secdot = this.checkarg(secdot);
	let tx, sx, ty, sy, tz, sz;
tx = Number.parseFloat(this.x).toFixed(gran);
ty = Number.parseFloat(this.y).toFixed(gran);
tz = Number.parseFloat(this.z).toFixed(gran);
sx = Number.parseFloat(dr(secdot).x).toFixed(gran);
sy = Number.parseFloat(dr(secdot).y).toFixed(gran);
sz = Number.parseFloat(dr(secdot).z).toFixed(gran);
	 if(tx != sx){return 0;
	 }else if(ty != sy){return 0;
	 }else if(tz != sz){return 0;
	 }else{return 1;}
	 
	 
popStackTrace(vidid); 
 }
	 
	 wasequivalent (secdot = -1, xf = 1, yf = 1, zf = 1, tf = 1) {
let vidid =	 pushStackTrace("RefDot.wasequivalent");      
var secfla = 0;
if(secdot == -1){var sec = new Dot(0,0,0,new D1Line(0)); secfla = 1;
secdot = sec.regind;}
secdot = this.checkarg(secdot);
	  /* Secdot is secondary dot to compare this dot to.
         xf is this x flag about if checking this axis should occur
         yf is this y flag about if checking y` axis should occur
         zf is this z flag about if checking z` axis should occur
         */	 
var retval = -1;		 
        if((xf == 1)&& (dr(secdot).x != this.x)){ retval = 0;
		} else if((yf == 1)&&(dr(secdot).y != this.y)){ retval = 0;
		}else if((zf == 1)&&(dr(secdot).z != this.z)){ retval = 0;
		} else if((tf == 1)&&(0 == this.t.whetherD1Lineequiv(dr(secdot).t))){
			 retval = 0;
			 }else{
				retval = 1;}

if(secfla == 1){dr(secdot).rubbish();}		
popStackTrace(vidid);
return retval;	
    }   
    
    describedot () {
        return `dot ${this.regind} is ( ${this.x} , ${this.y} , ${this.z} , t = ${this.t.start} to ${this.t.end} ; constant = ${this.c} with colour ${this.colour} and atomic size ${this.atomic}`; 
    }
   
   logger(){
	   console.log(` X${this.x} Y${this.y} Z${this.y}`);
   }
   
   print(){
	   let x3s = JSON.stringify(this);
	  // let x3s = this.describedot();
printoutt(x3s);
}
	
    integerize () {
    	this.x -= this.x%1;
    	this.y -= this.y%1;
    	this.z -= this.z%1;
    	{//XXX D1Line should have a "change duration" so that the functionality of the start and end isn't lost (i.e: start = commencement  end=demise
    	let tt = this.t.duration;
    	tt -= tt % 1;
    	this.t = new D1Line(tt);
    	}
    }
    
rotateAroundTheXAxis (ang){
  /* The axes are relative to the coordinates. 
  
*/		
let ny, nz; 
ny = (this.y * Math.cos(ang)) - (this.z * Math.sin(ang));
nz = (this.y * Math.sin(ang)) + (this.z * Math.cos(ang));
this.setY(ny);
this.setZ(nz);	
}

rotateAroundTheYAxis (ang) {
	let nz, nx; 
nz = ( this.z * Math.cos(ang)) - (this.x * Math.sin(ang)); 
nx = ( this.z * Math.sin(ang) ) + (this.x * Math.cos(ang));
	this.setZ(nz);
	this.setX(nx);
}

rotateAroundTheZAxis (ang){
let nx, ny; 
nx = (this.x * Math.cos(ang)) - (this.y * Math.sin(ang));
ny = (this.x * Math.sin(ang)) + (this.y * Math.cos(ang));
this.setX(nx);
this.setY(ny)	
	
}

Rotate(xa=0,ya=0,za=0){
	this.rotateAroundTheXAxis(xa);
	this.rotateAroundTheYAxis(ya);
	this.rotateAroundTheZAxis(za);
}

isPointOnPlane (poin){
	//assumes this c is set, that this a cartesian plane.
// Normal . (x,y,z) = Normal . (point) = constant
//normal . point = constant
poin = this.checkarg(poin);
let ans1 = this.dotproduct(poin);
let ans2 = Number.parseFloat(ans1).toFixed(6);
let ans3 = Number.parseFloat(this.c).toFixed(6);
if(ans2 == ans3){ return 1;}
return 0;
} 

//RefDot is no longer a cover for the physical dot at Cartesian coordinates and Spherical coordinates. 
//RefDot is simply an ordered list of coordinates denoting a single point in the dimensional field known to 'origin' 
 
}

 
class D1Line {
	constructor (leng = 0){
//these lines exist independently of an axial world. thus minimum of start is 0...
//If scalar time (x,y,z,time) is not a 'duration (dx,dy,dz,duration) but
//scalar time (x,y,z,time) is start to exist, then origin (0,0,0,0) is start of lattice and (x,y,z,t) is appointed time for object t, beyond which, in a temporal array, the object is present. In such a case, the object is removed from the screen by editing scalar time=0 (to time = before present moment.) 
//It is better to hold a measurement of time as a line segment, where
// t.start = start to exist
// t.end = cease to exist
// t.duration = duration.


 this.start = 0;
 this.realTime = TodaygetTime();
 if(leng < 0){leng *= -1;}
 this.center = this.start + (leng/2); 
 this.end = this.start + leng;
 
 this.distance = leng;
 this.duration = this.distance;
	}

resetRealTime(){
	this.realTime = TodaygetTime();
}
movestart(newsta = 0){
	this.start = newsta;
	this.end = this.start + this.duration;
	this.center = this.start + (this.duration/2);
}
	
	findUnion (arg1){
	//@purpose@ returns a Dline that sits where (D1Line)this and (D1Line)arg1 intersect.  
	//printoutt(` === INSIDE  findUnion ==<BR> thistart=${this.start} thisend=${this.end} argstt=${arg1.start} argend=${arg1.end}`);
if(arg1 instanceof D1Line){
let unionstart =-1; let unionend =-1;//init

if( (this.start <= arg1.start) && (this.end >= arg1.start)){
if(arg1.end > this.end){unionstart = arg1.start;unionend = this.end;
}else{unionstart = arg1.start;unionend = arg1.end;}
}
if( (arg1.start <= this.start) && (arg1.end >= this.start)){
	if(this.end > arg1.end){	unionstart = this.start; unionend = arg1.end;
	}else{	unionstart = this.start;unionend = this.end;}
}


if((unionstart == -1) || (unionend == -1)){printoutt("-------------EROR in D1LINE===========");}
var retT = new D1Line(unionend-unionstart);
//printoneline(`answer is ${unionstart} and ${unionend}`);
retT.shiftstartpoint(unionstart);
return retT;
}else{Alert("not D1Line in findunion()");}

}
	
	resolveComponents (){
     // Any line exists, where 2->3 + 3->4 = 2->4 but negative numbers require axis.
 if(this.start < 0) {
	 let x1 = this.start;
		 this.start -= x1; 
		 this.end -= x1;
	 }
     if(this.start > this.end){
         let x1 = this.end;
     this.end = this.start; this.start = x1;
     }
	 if( (this.end - this.duration) != this.start){
     this.distance = this.end - this.start;
     }
	 this.duration = this.distance;
     
 }
 
 whetherpointintersects (pnt){
     if((this.start <= pnt) && (pnt <= this.end)){return 1;}else{return 0;}
 }
 
 whetherD1Lineequiv (D1here){
     if ((D1here.distance == this.distance)&&(D1here.start == this.start)&&(D1here.end == this.end)){return 1;}else{return 0;
 }
}



  shiftstartpoint (sp){
     this.start = sp;
     this.resolveComponents();
 }

 shiftendpoint (ep){
     this.end = ep;
     this.resolveComponents();
 }

shiftanyendpoint (st){
    if(this.whetherpointintersects(st)){
    let sd = st - this.start;
    let ed = this.end - st; 
    if(sd > ed){this.shiftendpoint(st);}else{this.shiftstartpoint(st);}
    }else{
     if(st < this.start){this.start = st;} 
     if(st > this.end){this.end = st;}
    }
    this.resolveComponents();
 }

 resizeeastfromstart (newlen){
     this.end = this.start + newlen;
    this.resolveComponents();
 }
 
 //add -
resizewestfromstart (addle){
     this.start = this.start - addle;
     this.resolveComponents();
 }
 //minus +
 resizewestfromend (newlen){
     this.start = this.end - newlen;
    this.resolveComponents();
 }
 
  //minus -
 resizeeastfromend (addle){
     this.end = this.end + addle;
     this.resolveComponents();
 }
 
 singlefactormultiply (mfact){
     let nd = this.distance * mfact;
     if(mfact > 0){
     this.resizeeastfromstart(nd);
     }else{
     this.resizewestfromend(nd);    
     }
 }
  
  extendbysignedEW = function (signewlen){
     if(signewlen < 0){
        this.start += signewlen;
     }else{
        this.end += signewlen;
     }
    this.resolveComponents();    
 } 
 
 addD1Line (ODL){
     if(ODL instanceof D1Line){
  	ODL.resolveComponents(); //scrub
  	this.resolveComponents();//scrub
  	this.shiftendpoint(this.end + ODL.distance);//add 
  }
 }
 
 minusD1Line (ODL){
     if(ODL instanceof D1Line){
  	ODL.resolveComponents(); 
  	this.resolveComponents();
  	this.shiftendpoint(this.end - ODL.distance); 
  }
 }
 
 copyD1Line (){
     var r1 = new D1Line(this.distance);
	 r1.start = this.start; r1.end = this.end;
	 return r1;
 }
}

dotreg.second[0] = new RefDot(0,0,0);
dotreg.first[0] = 0;


function  checkdotarg (x1) {
	//private function. 
	if(x1 instanceof RefDot){return x1.regind;}else{
		//should check if x1 < first.length
		if(x1 < dotreg.first.length){
	return x1;}else{
	//FIX HERE OPTION
	return 0;
	return x1;//just means that dr() has to deal with it.
	}
	}
}

