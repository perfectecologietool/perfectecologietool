var globalflag91 = 0;

class LineRegister {

constructor (){
this.first = [];
this.second = [];
}

printdump(ind = 0){
		 //A troubleshooting printdump would be print(index, Stringfy(FIRST) 
		 printoutt(`in LINE register There are ${this.first.length} first elements, and ${this.second.length} second elements.`);
		if(ind > 0){
		printoutt("FIRST <BR> " + JSON.stringify(this.first));
		 printoutt("SECOND <BR>" + JSON.stringify(this.second));
		}
 }
 

matchline(artic){
	//finds lines which are purposely created using the same dots.
	if(artic instanceof RefLine){
	//	if(artic.AllowDuplication == 1){return -1;}
		for(let it1 = 0; it1 < this.first.length; it1++){
			let va1 = this.first[it1];
			if(va1 != -1){
				if(((this.second[va1].start == artic.start)&&(this.second[va1].end == artic.end))){
//||((this.second[va1].end == artic.start)&&(this.second[va1].start == artic.end))){//match found;  
			//	this.printdump();
	this.second[va1].timeaccruer++;
				return it1;
				}
			}
		}
	}
	return -1;
}

pushline(onru){
let vidid =	 pushStackTrace("LineRegister.pushline");
if(onru instanceof RefLine){
	//this.printdump();
	let va2 = this.matchline(onru);
	if(va2 == -1){	
	this.second.push(onru);
	this.first.push( (this.second.length - 1) );
	onru.regind = this.first.length - 1;
popStackTrace(vidid);
		return (onru.regind); 
}else{
	
	popStackTrace(vidid);
	onru.regind = va2;
	return (onru.regind); 
}
}

}

popline(ind){
	let vidid =	 pushStackTrace("LineRegister.popnum");
	//this.printdump(ind);
	if((ind < this.first.length) && (ind > (0 - this.first.length))){
var memx1 = this.first[ind];
		   if(memx1 != -1){
this.second.splice((memx1),1);
	for(let ite1 = 0; ite1 < this.first.length; ite1++){
			if(this.first[ite1] > memx1){
				this.first[ite1]--;
				}
		}
		this.first[ind] = -1;
	}
	}	
popStackTrace(vidid);	
}

fetchline(ind){
	let vidid =	 pushStackTrace("LineRegister.fetchline");
if(ind instanceof RefLine){popStackTrace(vidid);return ind;}
	if((ind >= 0) && (ind <= this.first.length)){ 
			let rd = this.first[ind];
			if(rd != -1){//assume the value is always a cogent index.
				var sd = this.second[rd];
popStackTrace(vidid);			
			return sd;	
			}
		 } 
//		 printoutt(`XXX Out Of Bounds Fetchline(${ind}`);
popStackTrace(vidid);			
		 return -1;
	 
}

}

var linreg = new LineRegister();
function lr (indx){
	return linreg.fetchline(indx);
}

class RefLine {    
	/* Cartesian Form: 
	this.xcomp/this.xDA = this.ycomp/this.yDA = this.zcomp/this/zDA 
	*/
	    constructor (dot1, dot2){
//Takes to integers as arguments, 
// which are the DotRegister indexes for the two dots. 
let vidid =	 pushStackTrace("RefLine.constructor"); 
//@var@ toc is Time of Creation, denotes the time of creation, incase ticks relate to span of computation. 
this.toc = TodaygetTime(); 
this.classtype = "RefLine";
   this.finiteinfinity = 100000; //Find and make const and remove from class struct. 
	this.start = checkdotarg(dot1);
	  this.end = checkdotarg(dot2);
	  this.delta = 0;
	  this.center = 0;
	
	/*
	//XXX The One and Only check for instanceof RefDot 
if(dot1 instanceof RefDot){
			this.start = dot1.regind; 
	} else { this.start = dot1; }
if(dot2 instanceof RefDot){
		this.end = dot2.regind;
	} else { this.end = dot2; }
	*/
	this.distance = 0;
//	dr(this.start).timeaccruer++;
//	dr(this.end).timeaccruer++;
	this.timeaccruer = 0;
	this.p = [];    //points
	this.p[0] = this.start;
this.points = [this.start, this.end];
       // this.lines = [this]; 
this.colour = "black";
this.siz = "3";
this.refresh();
this.regind = linreg.pushline(this);
popStackTrace(vidid);
  }

 checkarg(argx){
	 if(argx instanceof RefLine){
	 return argx.regind;
	 }else{
			if(argx < linreg.first.length){ return argx;}else{return argx;} 
	 }
 }
 print(ver = 1){
	 printoutt(`${this.start} and ${this.end} , for ${this.distance} where center is ${this.center}`);
	 if(ver > 1){
		 printoneline("start: " + JSON.stringify(dr(this.start)) + "<br> end: " + JSON.stringify(dr(this.end)) + "<br> delta: " + JSON.stringify(dr(this.delta)) + "<br> and center: " + JSON.stringify(dr(this.center)) + "<BR>");
		 this.printouttheparametricformat();
	 }
 }
  doDelta(){
	 let vidid =	 pushStackTrace("RefLine.doDelta");
	 if(dr(this.delta) instanceof RefDot){
//		 dr(this.delta).timeaccruer--;
		 dr(this.delta).rubbish();
		 this.p.splice(1,1);
	 }
	 
	// printoutt(JSON.stringify(this));
let dx = dr(this.end).x - dr(this.start).x;
let dy = dr(this.end).y - dr(this.start).y;
let dz = dr(this.end).z - dr(this.start).z;
//let dt = dr(this.end).t.copyD1Line();
//dt.minusD1Line(dr(this.start).t);
let dt = dr(this.end).t.findUnion(dr(this.start).t);
if(isNaN(dz)||isNaN(dy)||isNaN(dx)){
	//this.print();
printoutt(`NaN IN DELTA<br>`);
printoneline(JSON.stringify(dr(this.end)) + "<BR>" + JSON.stringify(dr(this.start)));
} 

let m1 = new RefDot(dx,dy,dz,dt);
m1.timeaccruer++;
	 this.delta = m1.regind;
	 this.p[1] = this.delta;
	 
	 popStackTrace(vidid);
 }
 getUnitVector(){
    this.doDelta();
    let rtvl = dr(this.delta).copyOfDot();
    rtvl = dr(rtvl);
    let fac1  = 1/this.distance;
    dr(rtvl).singlefactormultiply(fac1);
    
    return rtvl;
 }
 
 doCenter(){
	 if(dr(this.center) instanceof RefDot){
		 dr(this.center).timeaccruer--;
		 dr(this.center).rubbish();
	 }
this.center = dr(this.delta).copyOfDot();
dr(this.center).timeaccruer++;
dr(this.center).singlefactormultiply(0.5);
dr(this.center).addDot(this.start);

//This is the duration of the creation of this line. 
this.toc = dr(this.center).t.realTime - this.toc; 


 }	 
   doDistance(){
	 let vidid =	 pushStackTrace("RefLine.doDistance");
	 let Hx = dr(this.delta).x * dr(this.delta).x;
	 let Hy = dr(this.delta).y * dr(this.delta).y;
	 let Hz = dr(this.delta).z * dr(this.delta).z; 
 this.distance = Math.sqrt(Hx + Hy + Hz);
 popStackTrace(vidid);
 }
  rubbish(deg = 1){
	  //deg = 0 remove self (delta + center)
	  //deg = 1 remove self and 2 vertices
	  if(deg == 1){
if((dr(this.start) instanceof RefDot)&&(dr(this.end) instanceof RefDot)){
	  dr(this.start).timeaccruer--;
	  dr(this.end).timeaccruer--;

	  dr(this.start).rubbish(); 
		dr(this.end).rubbish();
}	  }
	  dr(this.center).timeaccruer--;
	  dr(this.center).rubbish();
	  dr(this.delta).timeaccruer--;
	  dr(this.delta).rubbish();	   
	  this.timeaccruer--;
if(this.timeaccruer < 1){
linreg.popline(this.regind);}
  }
 refresh(){
this.doDelta();
this.doCenter();
this.doDistance();
}	

draw(DFS = globalviewerframe){
	DFS.depthdraw(this);
}

isXInLineRange(ecs){

    if(dr(this.delta).x >= 0){

        if(( ecs >= dr(this.start).x)&&(ecs <= dr(this.end).x)){
        return true;
        }else{return false;}
    } else {

        if( (ecs <= dr(this.start).x)&&(ecs >= dr(this.end).x)){

            return true;}else{
				;return false;}
    }
}
isYInLineRange(ecs){
    if(dr(this.delta).y >= 0){
        if(( ecs >= dr(this.start).y)&&(ecs <= dr(this.end).y)){
        return 1;
        }else{return 0;}
    }else{
        if( (ecs <= dr(this.start).y)&&(ecs >= dr(this.end).y)){
            return 1;}else{return 0;}
    }
}
isZInLineRange(ecs){
    if(dr(this.delta).z >= 0){
        if(( ecs >= dr(this.start).z)&&(ecs <= dr(this.end).z)){
        return 1;
        }else{return 0;}
    }else{
        if( (ecs <= dr(this.start).z)&&(ecs >= dr(this.end).z)){
            return 1;}else{return 0;}
    }
}

isDotOnLine(QDot){
    //Checks if this QDot is on the line segment. 
 QDot = checkdotarg(QDot);
 if(QDot == -1){return 0;}
 if(this.isXInLineRange(dr(QDot).x) == 0){return 0;}
 // x = p0 + tp1 ; x - p0) / p1 = t
 var para = ( dr(QDot).x - dr(this.p[0]).x ) / dr(this.p[1]).x;

 var an1 = this.Euclid2ndPostulateByParameter(para);
 printoutt(JSON.stringify(dr(an1)));
 return dr(QDot).isSpatiallyEquivalent(an1,1,1,1);
 
 
}

translateByAddition(addenddot){
//	addenddot = dr(this.start).checkarg(addenddot);
	dr(this.start).addDot(addenddot);
	dr(this.end).addDot(addenddot);
	this.refresh();
}
translateBySubtraction(addenddot){
dr(this.start).subtractDot(addenddot);
dr(this.end).subtractDot(addenddot);
this.refresh();
}

rotateAroundAxes(xa = 0, ya=0, za=0){
if(xa != 0){
dr(this.start).rotateAroundTheXAxis(xa);
dr(this.end).rotateAroundTheXAxis(xa);	
}
if(ya != 0){
dr(this.start).rotateAroundTheYAxis(ya);
dr(this.end).rotateAroundTheYAxis(ya);
}
if(za != 0){
dr(this.start).rotateAroundTheZAxis(za);
dr(this.end).rotateAroundTheZAxis(za);
}
 

}
rotateAroundStart(xa = 0, ya=0, za=0){
let XD = dr(this.start).copyOfDot();
this.translateBySubtraction(XD);
this.rotateAroundAxes(xa,ya,za);
this.translateByAddition(XD);
}
rotateAroundEnd(xa = 0, ya=0, za=0){
let XD = dr(this.end).copyOfDot();
this.translateBySubtraction(XD);
this.rotateAroundAxes(xa,ya,za);
this.translateByAddition(XD);

}
rotateAroundPivot(xa = 0, ya=0, za=0, piv = 0){
let XD = dr(piv).copyOfDot();
this.translateBySubtraction(XD);
this.rotateAroundAxes(xa,ya,za);
this.translateByAddition(XD);

}

setEnd(newend){
	let vidid =	 pushStackTrace("RefLine.setEnd");
	
	if(newend instanceof RefDot){
	 	dr(this.end).timeaccruer--;
		dr(this.end).rubbish();
		this.end = newend.regind;
		newend.timeaccruer++;
	}else{
		if(dr(newend) instanceof RefDot){
		 	dr(this.end).timeaccruer--;
			dr(this.end).rubbish();
			this.end = dr(newend).regind;
			dr(newend).timeaccruer++;
		}
	}
	this.refresh();
	popStackTrace(vidid);
}
setStart(newend){
	let vidid =	 pushStackTrace("RefLine.setStart");
	/*
	if(newend instanceof RefDot){
		dr(this.start).timeaccruer--;
	if(dr(this.start).timeaccruer < 1){	dr(this.start).rubbish();}
		this.start = newend.regind;
		newend.timeaccruer++;
	}else{
		if(dr(newend) instanceof RefDot){
			dr(this.start).timeaccruer--;
	if(dr(this.start).timeaccruer < 1){	dr(this.start).rubbish();}
			this.start = dr(newend).regind;
			dr(newend).timeaccruer++;
		}
	}
	
	*/
	let newdo = checkdotarg(newend);if(newdo == -1){popStackTrace(vidid);return;}
dr(this.start).resetxyzt(newdo);
	this.refresh();
	popStackTrace(vidid);
}
 
 crawlDistanceFromStart(newdist){
let vidid =	 pushStackTrace("RefLine.changeDistanceChangeEnd");
let tistance = Math.sqrt((dr(this.delta).x * dr(this.delta).x)+(dr(this.delta).y * dr(this.delta).y)+(dr(this.delta).z * dr(this.delta).z));
if(tistance <= 0){return -1;}
let rat = newdist/tistance; 
let nede = dr(this.delta).copyOfDot(); 
	dr(nede).singlefactormultiply(rat); 
var neen = dr(this.start).copyOfDot(); dr(neen).addDot(nede); 
dr(nede).rubbish();
popStackTrace(vidid);
return neen;
  }
 
 changeDistanceChangeEnd(newdist){
let vidid =	 pushStackTrace("RefLine.changeDistanceChangeEnd");
	//ifnewdist >0 from start if newdist <0 from end. 
	//or ifnewdist >0 then above start else if newdist <0 then below start. 
	let rat = newdist/this.distance; 
let nede = dr(this.delta).copyOfDot(); 
	dr(nede).singlefactormultiply(rat); 
var neen = dr(this.start).copyOfDot(); 
dr(neen).addDot(nede); 
this.setEnd(neen);
popStackTrace(vidid);
}
changeDistanceChangeStart(newdist){
let vidid =	 pushStackTrace("RefLine.changeDistanceChangeStart");	
	let rat = newdist/this.distance;
let nede = dr(this.delta).copyOfDot();
	dr(nede).singlefactormultiply(rat);
let neen = dr(this.end).copyOfDot();
dr(neen).subtractDot(nede);
this.setStart(neen);
popStackTrace(vidid);

}
changeDistance(dis){
	this.changeDistanceChangeEnd(dis);
}
  
copyOfLine_MemorySensitive(){
	//This function allows LineRegister to match lines which share both dots in either order. Therefore producing clones of lines, which seperates the application from the mechination
	var x1 = new RefLine(this.start, this.end);
	x1.colour = this.colour; 
	x1.siz = this.siz;
	return x1.regind;
}
copyOfLine_MemoryInsensitive(){
	var d2 = dr(this.start).copyOfDot();
	var d3 = dr(this.end).copyOfDot();
	var x1 = new RefLine(d2,d3);
	x1.colour = this.colour; 
	x1.siz = this.siz;
	return x1.regind;
}
copyOfLine(){
return this.copyOfLine_MemoryInsensitive();
}

 
 Euclid2ndPostulateByY(wai){
      var v1;
      // x = p[0].x + t*p[1].x 
 var parameterT;
// if  an yx line at z=3
if(dr(this.p[1]).y == 0){
 if(wai == dr(this.p[0]).y){return this.p[0];}else{return -1;}
}   else { 
    parameterT = wai - dr(this.p[0]).y;
    parameterT /= dr(this.p[1]).y;}
//if(dr(this.p[1]).z != 0){v1 = zee/dr(this.p[1]).z;}else{v1 = 0;}
    let retv = dr(this.p[1]).copyOfDot();


    dr(retv).singlefactormultiply(parameterT);
  dr(retv).addDot(this.p[0]);
        return retv;
  }
 Euclid2ndPostulateByX(ex){
      var v1;
      // x = p[0].x + t*p[1].x 
 var parameterT;
// if  an yx line at z=3
if(dr(this.p[1]).x == 0){
 if(ex == dr(this.p[0]).x){return this.p[0];}else{return -1;}
}   else { 
    parameterT = ex - dr(this.p[0]).x;
    parameterT /= dr(this.p[1]).x;}
//if(dr(this.p[1]).z != 0){v1 = zee/dr(this.p[1]).z;}else{v1 = 0;}
    let retv = dr(this.p[1]).copyOfDot();
//printoutt(`${parameterT}`);``
    dr(retv).singlefactormultiply(parameterT);
  dr(retv).addDot(this.p[0]);
        return retv;
  }
 Euclid2ndPostulateByZ(zee){
      var v1;
      // x = p[0].x + t*p[1].x 
 var parameterT;
// if  an yx line at z=3
if(dr(this.p[1]).z == 0){
 if(zee == dr(this.p[0]).z){return this.p[0];}else{return -1;}
}   else { 
    parameterT = zee - dr(this.p[0]).z;
    parameterT /= dr(this.p[1]).z;}
//if(dr(this.p[1]).z != 0){v1 = zee/dr(this.p[1]).z;}else{v1 = 0;}
    let retv = dr(this.p[1]).copyOfDot();
    dr(retv).singlefactormultiply(parameterT);
  dr(retv).addDot(this.p[0]);
        return retv;
  }
Euclid2ndPostulateByParameter(param){
    let retv = dr(this.p[1]).copyOfDot();
    dr(retv).singlefactormultiply(param);
    dr(retv).addDot(this.p[0]);
    return retv;
}


InfInt3(lin){
lin = checklinearg(lin);
var A = this;
var B = lr(lin);
//printoutt("A.p1 is " + JSON.stringify(dr(A.p[1])));
//printoutt("B.p1 is " + JSON.stringify(dr(B.p[1])));

//var Pay0,Pax0, Pay1, Pax1, Pby0, Pbx0, Pby1, Pbx1;  
if((dr(A.p[1]).x != 0)&&(dr(A.p[1]).y != 0)){
var Pay0 = dr(A.p[0]).y;
var Pax0 = dr(A.p[0]).x;
var Pay1 = dr(A.p[1]).y;
var Pax1 = dr(A.p[1]).x;

var Pby0 = dr(B.p[0]).y;
var Pbx0 = dr(B.p[0]).x;
var Pby1 = dr(B.p[1]).y;
var Pbx1 = dr(B.p[1]).x;
}else if((dr(B.p[1]).x != 0)&&(dr(B.p[1]).y != 0)){
var Pby0 = dr(A.p[0]).y;
var Pbx0 = dr(A.p[0]).x;
var Pby1 = dr(A.p[1]).y;
var Pbx1 = dr(A.p[1]).x;

var Pay0 = dr(B.p[0]).y;
var Pax0 = dr(B.p[0]).x;
var Pay1 = dr(B.p[1]).y;
var Pax1 = dr(B.p[1]).x;
}else if((dr(A.p[1]).x != 0)&&(dr(A.p[1]).z != 0)){
var Pay0 = dr(A.p[0]).z;
var Pax0 = dr(A.p[0]).x;
var Pay1 = dr(A.p[1]).z;
var Pax1 = dr(A.p[1]).x;

var Pby0 = dr(B.p[0]).z;
var Pbx0 = dr(B.p[0]).x;
var Pby1 = dr(B.p[1]).z;
var Pbx1 = dr(B.p[1]).x;
}else if((dr(B.p[1]).x != 0)&&(dr(B.p[1]).z != 0)){
var Pby0 = dr(A.p[0]).z;
var Pbx0 = dr(A.p[0]).x;
var Pby1 = dr(A.p[1]).z;
var Pbx1 = dr(A.p[1]).x;

var Pay0 = dr(B.p[0]).z;
var Pax0 = dr(B.p[0]).x;
var Pay1 = dr(B.p[1]).z;
var Pax1 = dr(B.p[1]).x;
}else if((dr(A.p[1]).y != 0)&&(dr(A.p[1]).z != 0)){
var Pay0 = dr(A.p[0]).z;
var Pax0 = dr(A.p[0]).y;
var Pay1 = dr(A.p[1]).z;
var Pax1 = dr(A.p[1]).y;

var Pby0 = dr(B.p[0]).z;
var Pbx0 = dr(B.p[0]).y;
var Pby1 = dr(B.p[1]).z;
var Pbx1 = dr(B.p[1]).y;
}else if((dr(B.p[1]).y != 0)&&(dr(B.p[1]).z != 0)){
var Pby0 = dr(A.p[0]).z;
var Pbx0 = dr(A.p[0]).y;
var Pby1 = dr(A.p[1]).z;
var Pbx1 = dr(A.p[1]).y;

var Pay0 = dr(B.p[0]).z;
var Pax0 = dr(B.p[0]).y;
var Pay1 = dr(B.p[1]).z;
var Pax1 = dr(B.p[1]).y;

    
}else {
   /*
   // This switch means the function works atleast one of the two lines are axial lines. If both lines are axial lines, then 
    printoutt("Delta of A is " + JSON.stringify(dr(A.p[1])));
    printoutt("Delta of B is " + JSON.stringify(dr(B.p[1])));
 
  //By My erroneousReasoning, At this level of comparison , adding the A.start to B.start should yeild the intersection, and if the intersection lies within the segment bounds... 
    var idid = dr(A.start).copyOfDot();
    dr(idid).addDot(B.start);
    var RA1 = A.isDotOnLine(idid);
	printoneline("<br>A start is<BR>"+JSON.stringify(dr(A.start)));
	*/
	// if for A's nonzero delta dim, B's dim falls within A's range, then B's dim is that dim of the answer vector. 
	var x3 = 1; 
	var y3 = 2; 
	var z3 = 3;
	if((dr(A.delta).x != 0)&&(dr(B.delta).x == 0)&&(A.isXInLineRange(dr(B.start).x))){
		x3  = dr(B.start).x;
	}else if((dr(B.delta).x != 0)&&(dr(A.delta).x == 0)&&(B.isXInLineRange(dr(A.start).x))){
		x3  = dr(A.start).x;
	}else if((dr(B.delta).x == 0)&&(dr(A.delta).x == 0)&&(dr(B.start).x == dr(A.start).x)){
		x3  = dr(A.start).x;
	}
	
	
	if((dr(A.delta).y != 0)&&(dr(B.delta).y == 0)&&(A.isYInLineRange(dr(B.start).y))){
		y3  = dr(B.start).y;
	}else if((dr(B.delta).y != 0)&&(dr(A.delta).y == 0)&&(B.isYInLineRange(dr(A.start).y))){
		y3  = dr(A.start).y;
	}else if((dr(B.delta).y == 0)&&(dr(A.delta).y == 0)&&(dr(B.start).y == dr(A.start).y)){
		y3  = dr(A.start).y;
	}
	
	
	if((dr(A.delta).z != 0)&&(dr(B.delta).z == 0)&&(A.isZInLineRange(dr(B.start).z))){
		z3  = dr(B.start).z;
	}else if((dr(B.delta).z != 0)&&(dr(A.delta).z == 0)&&(B.isZInLineRange(dr(A.start).z))){
		z3  = dr(A.start).z;
	}else if((dr(B.delta).z  == 0)&&(dr(A.delta).z == 0)&&(dr(B.start).z == dr(A.start).z)){
		z3  = dr(A.start).z;
	}
	
	var idid = new RefDot(x3,y3,z3);
	
	//printoneline("<br><br><br>B start is<BR>"+JSON.stringify(dr(B.start))+"<BR>");
    //printoutt(`Intersection inside ${x3} and ${y3} and ${z3} and  linefunction says ` + JSON.stringify(idid));
    return idid.regind;
	}    
	



let Numc = Pay0 - Pby0 ; 
Numc /= (0 - Pay1 );
let Numd = dr(A.p[0]).x - Pbx0;
Numd /= (0 - Pax1 );
//printoneline(`<br>Numc is ${Numc} and numd = ${Numd}<br>`);
let Num1 = Numc - Numd;
Num1 *= Pax1 * Pay1;
let Den = ( Pay1 * Pbx1 )  - (Pax1 * Pby1);
//printoneline(`<br>num1 is ${Num1} and deno = ${Den} <br>`);
var Esans;
if(Den != 0){Esans = Num1 / Den;}else{return -3;}
var AN = this.Euclid2ndPostulateByParameter(Esans);
let Xans = Pax0 + (Pax1 * Esans);
let Ans = A.Euclid2ndPostulateByX(Xans);
//printoutt("INF INT THREE BY X " + JSON.stringify(dr(Ans)));
//printoutt("INF INT BY PARAMETER" + JSON.stringify(dr(AN)));
return Ans;
    

}


dydxM(){
	  if(dr(this.delta).x != 0){
	  return ( dr(this.delta).y / dr(this.delta).x );
	  }else{return 0;}
  }
dydxC(){ //y = mx + c 	//c = y - mx
	return ( dr(this.start).y - (this.dydxM() * dr(this.start).x) );
}
dydzM() {
	  if( dr(this.delta).z != 0){
	  return ( dr(this.delta).y / dr(this.delta).z );
	  }else{ return 0;}
  }
dydzC(){ //y = mx + c 	//c = y - mx
	return ( dr(this.start).y - (this.dydzM() * dr(this.start).z) );
} 
  dzdxM(){
	  if( dr(this.delta).x != 0){
		  return ( dr(this.delta).z / dr(this.delta).x );
	  }else{return 0;}
  }
dzdxC(){ //y = mx + c 	//c = y - mx
	return ( dr(this.start).z - (this.dzdxM() * dr(this.start).x) );
}  
  dzdyM(){
	  if( dr(this.delta).y != 0){
		  return ( dr(this.delta).z / dr(this.delta).y );
	  }else{return 0;}
  }
dzdyC(){ //y = mx + c 	//c = y - mx
	return ( dr(this.start).z - (this.dzdyM() * dr(this.start).y) );
}   
    dxdyM(){
		if( dr(this.delta).y != 0){
	  return ( dr(this.delta).x / dr(this.delta).y );
		}else{return 0;}
  }
dxdyC(){ //y = mx + c 	//c = y - mx
	return ( dr(this.start).x - (this.dxdyM() * dr(this.start).y) );
}  
  dxdzM(){
	  if( dr(this.delta).z != 0){
		if(Number.isNaN(dr(this.delta).x)){
		return 0;
		}
	  return ( dr(this.delta).x / dr(this.delta).z );
	  }else{return 0;}
  }
dxdzC(){ //y = mx + c 	//c = y - mx
	return ( dr(this.start).x - (this.dxdzM() * dr(this.start).z) );
}  
  
  printouttheparametricformat(){
	  printoutt(`dydxM ${this.dydxM()} <br>
	  dydxC ${this.dydxC()} <br>
	   yz ${this.dydzM()} <br>
	  yz ${this.dydzC()} <br>
	   zx ${this.dzdxM()} <br>
	  zx ${this.dzdxC()} <br>
	   zy ${this.dzdyM()} <br>
	  zy ${this.dzdyC()} <br>
	   xy ${this.dxdyM()} <br>
	  xy ${this.dxdyC()} <br>
	   xz ${this.dxdzM()} <br>
	  xz ${this.dxdzC()} <br>`);
	  
  }
  


isColinear(quedot){
	  quedot = dr(this.start).checkarg(quedot);
	  var AnsDot;
	  if( dr(this.delta).x != 0){
AnsDot = this.InfinityResolveByX(dr(quedot).x);	 
	 }else if( dr(this.delta).y != 0){
AnsDot = this.InfinityResolveByY(dr(quedot).y);
	  }else if( dr(this.delta).z != 0){
AnsDot = this.InfinityResolveByZ(dr(quedot).z);
	  }else{return 0;}
  
  return dr(quedot).isSpatiallyEquivalent(AnsDot);
  }
  

CreatePlaneWithThirdDot(poin3){
	poin3 = dr(this.start).checkarg(poin3);
	let e1 = new RefLine(poin3, this.start);
	let e2 = new RefLine(poin3, this.end);
	let x4 = ((dr(e1.delta).y * dr(e2.delta).z) - (dr(e1.delta).z * dr(e2.delta).y));
  let y4 = ((dr(e1.delta).z * dr(e2.delta).x) - (dr(e1.delta).x * dr(e2.delta).z));
 let z4 = ((dr(e1.delta).x * dr(e2.delta).y) - (dr(e1.delta).y * dr(e2.delta).x));
	var planarvector = new RefDot(x4,y4,z4);
		planarvector.setConstant(planarvector.dotproduct(poin3));
e1.rubbish();
e2.rubbish();
	return planarvector.regind;
}

InfinityIntersection(aline){
		  let vidid =	 pushStackTrace("RefLine.InfinityINtersection");
	aline = this.checkarg(aline);
	if(!(Number.isNaN(this.dydxM())) && !(Number.isNaN(this.dydxM())) && (this.dydxM() != lr(aline).dydxM())){
//		printoutt("not YX paralel");
		let dem = lr(aline).dydxM() - this.dydxM();
//		printoneline(`<br>27/7/2022 ${dem}`);
		let num = this.dydxC() - lr(aline).dydxC();
//		printoneline(`<br>27/7/2022 ${num}`);
		popStackTrace(vidid);
		return this.InfinityResolveByX( (num/dem)); 
	}else if(!(Number.isNaN(this.dzdxM())) && !(Number.isNaN(this.dzdxM())) && (this.dzdxM() != lr(aline).dzdxM())){
//	printoneline("not ZX paralel");	
	let dem = lr(aline).dzdxM() - this.dzdxM();
		let num = this.dzdxC() - lr(aline).dzdxC();
		
		popStackTrace(vidid);
		return this.InfinityResolveByX( (num/dem));
	}else if(!(Number.isNaN(this.dxdzM())) && !(Number.isNaN(this.dxdzM())) && (this.dxdzM() != lr(aline).dxdzM())){
//	printoneline("not xz paralel");	
	let dem = lr(aline).dxdzM() - this.dxdzM();
		let num = this.dxdzC() - lr(aline).dxdzC();
		
		popStackTrace(vidid);
		return this.InfinityResolveByZ( (num/dem));
	}else if(!(Number.isNaN(this.dydzM())) && !(Number.isNaN(this.dydzM())) && (this.dydzM() != lr(aline).dydzM())){
//	printoneline("not yz paralel");	
	let dem = lr(aline).dydzM() - this.dydzM();
		let num = this.dydzC() - lr(aline).dydzC();
		
		popStackTrace(vidid);
		return this.InfinityResolveByZ( (num/dem));
	}else if(!(Number.isNaN(this.dzdyM())) && !(Number.isNaN(this.dzdyM())) && (this.dzdyM() != lr(aline).dzdyM())){
//			printoneline("not ZY paralel");
		let dem = lr(aline).dzdyM() - this.dzdyM();
		let num = this.dzdyC() - lr(aline).dzdyC();
		
		popStackTrace(vidid);
		return this.InfinityResolveByY( (num/dem));
	
	}else if(!(Number.isNaN(this.dxdyM())) && !(Number.isNaN(this.dxdyM())) && (this.dxdyM() != lr(aline).dxdyM())){
//			printoutt("not XY paralel");
		let dem = lr(aline).dxdyM() - this.dxdyM();
		let num = this.dxdyC() - lr(aline).dxdyC();
		
		popStackTrace(vidid);
		return this.InfinityResolveByY( (num/dem));
	}else{
this.printouttheparametricformat();
		
		popStackTrace(vidid);
		return -1;}	
}
Finite3DIntersection(aline){		  
let vidid =	 pushStackTrace("RefLine.Finite3Dintersection");
aline = this.checkarg(aline);
var verificationplane = this.CreatePlaneWithThirdDot(lr(aline).start);
let flatflag1 = dr(verificationplane).isPointOnPlane(lr(aline).end);

if(flatflag1){
	var an3 = this.InfinityIntersection(aline);
	//gets to here;
//	
if(an3 == 42){globalflag91 = 1;}else{globalflag91 = 0;}
	var an2 = this.FiniteResolveByX(dr(an3).x);
	if(an2 == -1){
		an2 = this.FiniteResolveByY(dr(an3).y);
	}
	if(an2 == -1){
		an2 = this.FiniteResolveByZ(dr(an3).z);
	}
//	printoutt(`here is an2 ${an2} foran3 was ${an3}`);
//	printoutt("gets to here" + JSON.stringify(dr(an3)) + "<br>" + JSON.stringify(this) + "<br>" + JSON.stringify(dr(this.start)) + "<br>"+JSON.stringify(dr(this.end)) + "<br>");
		popStackTrace(vidid);
		
return an2;
}else{
//	printoneline("<br>================<br>=============<br>==================<br>===============<br>===============<br>===============<br>=======================<br>============");
}
		popStackTrace(vidid);
		
return -1;

}


CreateNormalPlaneUsingPoint(ecs){
	 let vidid =	 pushStackTrace("RefLine.createNormalplaneusingpoint");
// On the line, given a point, 
// the normal plane can be computed. 
let poin = checkdotarg(ecs);
//let poin = this.FiniteResolveByX(ecs);

if(poin != -1){
 dr(poin).singlefactormultiply(-1);
//
var PerpePlane = dr(this.delta).copyOfDot();
let vade = dr(PerpePlane).dotproduct(poin);
vade *= -1;
dr(PerpePlane).setConstant(vade); 
dr(poin).rubbish();
popStackTrace(vidid);
return PerpePlane;
}
popStackTrace(vidid);
return -1;	
}
CreateNormalPlaneUsingX(ecs = 0){
	 let vidid =	 pushStackTrace("RefLine.createNormalPlaneUsingX");
// On the line, given a point, 
// the normal plane can be computed. 
//ecs = checkpointarg(ecs);
//printoutt(`inside createnormalplane, arg is ${ecs}`);
var poin = this.FiniteResolveByX(ecs);
//XXX ISSUE HERE IS THAT poin is Co-linear...
//printoutt("HERE" + JSON.stringify(dr(poin)));
//printoutt(JSON.stringify(poin)); 
poin = checkdotarg(poin);
if(poin != -1){
 dr(poin).singlefactormultiply(-1);
//
var PerpePlane = dr(this.delta).copyOfDot();
let vade = dr(PerpePlane).dotproduct(poin);
vade *= -1;
dr(PerpePlane).setConstant(vade); 
dr(poin).rubbish();
popStackTrace(vidid);
return PerpePlane;
}else{poin = this.start;
popStackTrace(vidid);
return -1;	
}
}

findPointOnCartesianPlaneFromXY( plan, ecs = 0, wai = 0){
	//Appendage Function (needs a library)
	let vidid =	 pushStackTrace("RefLine.CreatePointOnCartesianINFINITEPlaneFromXY");	
	plan = dr(this.start).checkarg(plan);
	if(plan == -1){return -1;}
	ecs *= dr(plan).x;
	wai *= dr(plan).y;
	let zee = dr(plan).c + ecs + wai;
	if(dr(plan).x != 0){ecs /= dr(plan).x;}
	if(dr(plan).y != 0){wai /= dr(plan).y;}
	if(dr(plan).z != 0){zee /= dr(plan).z;}else{zee = 0;}
	var rpd = new RefDot(ecs, wai, zee);
	popStackTrace(vidid);
	return rpd.regind;
	
	
}
findPointOnCartesianPlaneFromXZ( plan, ecs = 0, zee = 0){
	//Appendage Function (needs a library)
	let vidid =	 pushStackTrace("RefLine.CreatePointOnCartesianINFINITEPlaneFromXZ");	
	plan = dr(this.start).checkarg(plan);
	if(plan == -1){return -1;}
	ecs *= dr(plan).x;
	zee *= dr(plan).z;
	let wai = dr(plan).c + ecs + zee;
	if(dr(plan).x != 0){ecs /= dr(plan).x;}
	if(dr(plan).y != 0){wai /= dr(plan).y;}else{wai = 0;}
if(dr(plan).z != 0){zee /= dr(plan).z;}
	var rpd = new RefDot(ecs, wai, zee);
	popStackTrace(vidid);
	return rpd.regind;
}
findPointOnCartesianPlaneFromYZ( plan, sky = 0, zee = 0){
	//Appendage Function (needs a library)
	let vidid =	 pushStackTrace("RefLine.CreatePointOnCartesianINFINITEPlaneFromYZ");	
	plan = dr(this.start).checkarg(plan);
	if(plan == -1){return -1;}
	sky *= dr(plan).y;
	zee *= dr(plan).z;
	let EGZ = dr(plan).c + sky + zee;
	if(dr(plan).y != 0){sky /= dr(plan).y;}
	if(dr(plan).x != 0){EGZ /= dr(plan).x;}else{EGZ = 0;}
if(dr(plan).z != 0){zee /= dr(plan).z;}
	var rpd = new RefDot(EGZ, sky, zee);
	popStackTrace(vidid);
	return rpd.regind;
}

findEquilateralHeight(EdgeLength = 100, baselength = 50){
    let vidid =	 pushStackTrace("RefLine.findequilateralheight");
	// x2 + y2 = h2; h2 - x2  = y2 
//printoneline(`arguments are ${EdgeLength} and ${baselength}`); 
	let hyp = EdgeLength * EdgeLength; 
	let Adj = baselength * baselength;  
//printoneline(`hyp is ${hyp} and adj is ${Adj}`);
	let opp = hyp - Adj;
	let height = Math.sqrt(opp);
//	printoneline(`height is ${height}`);
popStackTrace(vidid);
	return height;
}

CrossProduct3D(aline){
aline = checklinearg(aline);

let Ion, jon, kon;
//The cross product is of the component vectors of a line, since a line sits ni space. between two points. (Two points cogently in space.)
//       i    j   k    i = bf - ec 
//this// a    b   c   j = cd - fa 
//aline/ d    e   f   k = ae - db 

ion = dr(lr(aline).delta).z * dr(this.delta).y - dr(lr(aline).delta).y * dr(this.delta).z;
jon = dr(lr(aline).delta).x * dr(this.delta).z - dr(lr(aline).delta).z  * dr(this.delta).x;
kon = dr(lr(aline).delta).y * dr(this.delta).x - dr(lr(aline).delta).x * dr(this.delta).y;

var rd = new RefDot(ion, jon, kon);
return rd.regind;

}



}

function  rdCrossProduct4D (AA,SS,DD){
    //Liebniz's theorem for solving the determinant of large matrixes... seems simple. 
    
AA = checkdotarg(AA);SS = checkdotarg(SS);DD = checkdotarg(DD);
var ex, ye, ze, ti;


ex = dr(AA).y * ( (dr(SS).z * dr(DD).t.duration) - 
  (dr(DD).z * dr(SS).t.duration) ) +
dr(AA).z * ( (dr(SS).t.duration * dr(DD).y) - 
  (dr(SS).y * dr(DD).t.duration) ) +
dr(AA).t.duration * ( (dr(SS).y * dr(DD).z) - 
  (dr(SS).z * dr(DD).y) );
  /*
  let m1, m2, m3;
  m1 = dr(AA).y * ( (dr(SS).z * dr(DD).t.duration) - 
  (dr(DD).z * dr(SS).t.duration) );
  m2 = dr(AA).z * ( (dr(SS).t.duration * dr(DD).y) - 
  (dr(SS).y * dr(DD).t.duration) );
  m3 = dr(AA).t.duration * ( (dr(SS).y * dr(DD).z) - 
  (dr(SS).z * dr(DD).y) );
 printoutt(`Here is x components ${m1}  and ${m2}and ${m3} `); 
  printoutt(`M2 components ${dr(AA).z} and ${dr(SS).t.duration} and ${dr(DD).y} and ${dr(DD).t.duration} and${dr(SS).y} and`);
  */

ye = dr(AA).z * ( ( dr(SS).t.duration * dr(DD).x  )
- ( dr(DD).t.duration * dr(SS).x) ) + dr(AA).t.duration * ( ( dr(SS).x * dr(DD).z  )
- ( dr(DD).x * dr(SS).z) ) + dr(AA).x * ( ( dr(SS).z * dr(DD).t.duration  )
- ( dr(DD).z * dr(SS).t.duration) );
//AA  d  a  b     
//SS  h  e  f 
//DD  L  I  J 
ze = dr(AA).t.duration * ( ( dr(SS).x * dr(DD).y  )
- ( dr(DD).x * dr(SS).y) ) 
+ dr(AA).x * ( ( dr(SS).y * dr(DD).t.duration  )
- ( dr(DD).y * dr(SS).t.duration) ) 
+ dr(AA).y * ( ( dr(SS).t.duration * dr(DD).x  )
- ( dr(DD).t.duration * dr(SS).x) );
// a b c 
// e f g 
// I J K 
ti = dr(AA).x * ( ( dr(SS).y * dr(DD).z  )
- ( dr(DD).y * dr(SS).z) ) 
+ dr(AA).y * ( ( dr(SS).z * dr(DD).x  )
- ( dr(DD).z * dr(SS).x) ) 
+ dr(AA).z * ( ( dr(SS).x * dr(DD).y  )
- ( dr(DD).x * dr(SS).y) );

//    x  y  z  t 
//AA  a  b  c  d 
//SS  e  f  g  h 
//DD  i  j  k  L  

var retv = new RefDot(ex,-ye,ze,-ti);
return retv;
}
 

function rdCrossProduct3D(FF, MD){
FF = checkdotarg(FF);MD = checkdotarg(MD);
var ex; var ye; var ze; 
//     x  y  ze | 
//FF  a   b  c  | a  b
//MD  d  e   F  | d  e 
ex = (dr(FF).y * dr(MD).z) - (dr(MD).y * dr(FF).z);  
ye = (dr(FF).z * dr(MD).x) - (dr(MD).z * dr(FF).x);
ze = (dr(FF).x * dr(MD).y) - (dr(FF).y * dr(MD).x);
var retv = new RefDot(ex,ye,ze);

return retv;
}


function PositiveLine(leng){
	var d1 = new RefDot(0,0,0);
	var d2 = new RefDot(10,10,10);
	var r1 = new RefLine(d1,d2);
	r1.changeDistance(leng);
	return r1.regind;
}

function checklinearg(argx){
	 if(argx instanceof RefLine){
	 return argx.regind;
	 }else{
			if(argx < linreg.first.length){
		if(lr(argx) != -1){
			return argx;}
	}else{	} 
	 }
	 return -1;
 }


class SphericalSegment {
    constructor(Ay, By){var pa, pb;
if((Ay instanceof RefDot)&&(By instanceof RefDot)){pa = Ay; pb = By;}else if ((dr(Ay) instanceof RefDot)&&(dr(By) instanceof RefDot)){ pa = dr(Ay); pb = dr(By);
            }else{return;}
    this.start = pa; this.end = pb;
            // two points on two different spheres // however a spherical geometry in time can have two different Rvalues. . 
    //if(pa.SC[0] != pb.SC[0] || pa.SC[3] != pb.SC[3]){return;}   
     this.delta = new RefDot();
     this.delta.x = pb.x - pa.x;
     this.delta.y = pb.y - pa.y;
     this.delta.z = pb.z - pa.z;
     this.delta.SC[0] = pb.SC[0] - pa.SC[0];
     this.delta.SC[1] = pb.SC[1] - pa.SC[1];
     this.delta.SC[2] = pb.SC[2] - pa.SC[2];
     
     this.distance = (this.delta.z * this.delta.z);
     this.distance += (this.delta.y * this.delta.y);
     this.distance += (this.delta.x * this.delta.x);
     
     let den = -2 * pa.SC[0] * pa.SC[0];
    this.angle = this.distance  + den;
    this.angle /= den;
    this.angle = Math.acos(this.angle);
    this.distance = Math.sqrt(this.distance);   

    let circ = 2 * Math.PI * pa.SC[0];
    let angrat = this.angle / (2 * Math.PI);
    this.arclength = circ * angrat;

    }//constructor
    
    drawsegment(DF = globalviewerframe){
//BROKEN

    var pd = this.end.copyOfDot();
    var dd = this.delta.copyOfDot();
        dd = dr(dd);
        pd = dr(pd);
        
    printoutt(`Inside draw ${radtodeg(dd.SC[2])}segment`);
    //  if(dd.SC[2] < 0){dd.SC[2] = Math.PI + Math.PI + dd.SC[2];}
     // if(dd.SC[1] < 0){dd.SC[1] = Math.PI + Math.PI + dd.SC[1];}
    printoutt(`Inside draw ${radtodeg(dd.SC[2])}segment`);
var rat2 = dd.SC[2] / radtodeg(this.angle);
var rat1 = dd.SC[1] / radtodeg(this.angle);
var ang3 = radtodeg(this.angle);
//for each degree in angle, 
//jump in symmetry along segment. 
//if(dd.SC[2] > dd.SC[1]){
//    ratab = dd.SC[1] / dd.SC[2]; //rtb1 = 2;
//}else{ratab = dd.SC[2] / dd.SC[1];rtb1 = 5;}
while(ang3-- > 0){
printoutt(`${ang3}`);
        //printoutt(`inside while${dd.SC[2]} and ${dd.SC[1]} loop`);
        //r2 = 5  r1 = 10  rat = r2 2++ r1 +=2
            //let x3 = pd.copyOfDot();
            pd.SC[1] -= rat1;
            pd.SC[2] -= rat2;
            pd.CongruenceSphericalTo3D();
            pd.printSpherically();
            let nl1 = new RefLine(pd.SC[3], pd);
 
//            let nl1 = new RefLine(pd.SC[3], this.start);
 
            DF.depthdraw(nl1);
//            nl1.rubbish();
//            dr(x3).rubbish();
            
            
    }
    }
    
    
    print () {
     printoutt(`Spherical Segment with <ol><li>a distance of ${this.distance}</li><li> and angle ${this.angle} </li><li>and the arc distance is ${this.arclength}</li></ol> <br> and delta is  ` + JSON.stringify(this.delta));
    }
    
    
}


