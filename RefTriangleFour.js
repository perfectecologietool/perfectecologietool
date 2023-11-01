class TriangleRegister {

constructor (){
this.first = [];
this.second = [];
}

printdump(ind = 0){
		 printoutt(` In Triangle Register There are ${this.first.length} first elements, and ${this.second.length} second elements.`);
		 if(ind >0){
		 printoutt("FIRST <BR> " + JSON.stringify(this.first));
		 printoutt("SECOND <BR>" + JSON.stringify(this.second));
		 }
 }
pushtriangle(enru){
	let vidid = pushStackTrace("TriangleRegister.pushline");
	if(enru instanceof RefTriangle){
	
	let va2 = this.matchtriangle(enru);
if(va2 == -1){	
		this.second.push(enru);
		this.first.push( (this.second.length - 1) );
		enru.regind = this.first.length - 1;
		
}else{
	enru.regind = va2;
	}
}
//this.printdump();	
popStackTrace(vidid);
		return (enru.regind);
}
	
poptriangle(ind){
	let vidid = pushStackTrace("triangleRegister.popnum");
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

fetchtriangle(ind){
	let vidid =	 pushStackTrace("TriangleRegister.fetchtriangle");
	if(ind instanceof RefTriangle){return ind;}
	if((ind >= 0) && (ind <= this.first.length)){ 
			let rd = this.first[ind];
			if(rd != -1){//assume the value is always a cogent index.
				var sd = this.second[rd];
popStackTrace(vidid);			
			return sd;	
			}
		 } 
		 //printoutt(`XXX Out Of Bounds Fetchtriangle(${ind}`);
popStackTrace(vidid);			
		 return -1;
	 
}


matchtriangle(arc){
//finds lines which are purposely created using the same dots.
	if(arc instanceof RefTriangle){
//	if(artic.AllowDuplication == 1){return -1;}
		for(let it1 = 0; it1 < this.first.length; it1++){
			let va1 = this.first[it1];
			if(va1 != -1){			
	if( 
( ( arc.points[0] == this.second[va1].points[0])
	&& ( arc.points[1] == this.second[va1].points[1])	&& ( arc.points[2] == this.second[va1].points[2])) 
	|| ( ( arc.points[0] == this.second[va1].points[0])
	&& ( arc.points[1] == this.second[va1].points[2])	&& ( arc.points[2] == this.second[va1].points[1])) 
	|| ( ( arc.points[0] == this.second[va1].points[1])
	&& ( arc.points[1] == this.second[va1].points[2])	&& ( arc.points[2] == this.second[va1].points[0])) 
	|| ( ( arc.points[0] == this.second[va1].points[1])
	&& ( arc.points[1] == this.second[va1].points[0])	&& ( arc.points[2] == this.second[va1].points[2])) 
|| ( ( arc.points[0] == this.second[va1].points[2])
	&& ( arc.points[1] == this.second[va1].points[1])	&& ( arc.points[2] == this.second[va1].points[0])) 
	|| ( ( arc.points[0] == this.second[va1].points[2])
	&& ( arc.points[1] == this.second[va1].points[0])	&& ( arc.points[2] == this.second[va1].points[1])) 


	){//match found;  
			//	this.printdump();
			
			return it1;
				}
			}
		}
	}
	return -1;
}


}
//It is possible to put these inside a CANVAS
var trireg = new TriangleRegister();
function tr (indx){
	return trireg.fetchtriangle(indx);
}

var granularity = 2;//XXX make INLINE
class RefTriangle {

constructor(DA, DB, DC){
	console.log("new triangle");
this.toc = TodaygetTime();
let vidid = pushStackTrace("RefTriangle.constructor");
//Do u want to check if regind or instanceofDOT?
this.classtype = "reftriangle";
DA = checkdotarg(DA);
DB = checkdotarg(DB);
DC = checkdotarg(DC);
if( (DA == -1)||(DB == -1)||(DC == -1)){alert("why spam a triangle?");
//FIX
return;}
dr(DA).timeaccruer++;
dr(DB).timeaccruer++;
dr(DC).timeaccruer++;
this.points = [DA, DB, DC];
this.regind = 0;
this.timeaccruer = 0;
//this.reconstructtriangle(this.points);
this.center;
this.averagecenter;
this.colour = "#000000";
this.lines = [];
this.angles = [];
//this.setCenter();
this.plane = [];
this.planearea = 0;  
//this.lawofcosines();
//this.findArea();
this.CartesianPlane;
this.Normal;// = this.createNormalVector(1);
//this.createCartesianPlaneEquation();
this.refresh();

	popStackTrace(vidid);
}
refresh(){
//if(this.timeaccruer != 0){	this.rubbish(0);}
	if(this.regind == 0){
	//	console.log("Here is 1");
	this.regind = trireg.pushtriangle(this);}
	this.reconstructtriangle(this.points);

		//console.log("Here is 2");
	this.lawofcosines();
		//console.log("Here is 3");
	this.findArea();
		//console.log("Here is 4");
	this.Normal = this.createNormalVector(1);
		//console.log("Here is 7");
	
	this.createCartesianPlaneEquation();
		//console.log("Here is 6");
	
	this.setCenter(); 
	this.toc = dr(this.center).t.realTime - this.toc;
}



reconstructtriangle(dots){
	let vid = pushStackTrace("RefTriangleTwo.reconstructtriangle");
if(this.lines.length == 3){this.rubbish(1);}
let l1 = new RefLine(this.points[0], this.points[1]); 
let l2 = new RefLine(this.points[1], this.points[2]);
let l3 = new RefLine(this.points[0],this.points[2]);
this.lines =[l1.regind, l2.regind, l3.regind];
l1.timeaccruer++;
l2.timeaccruer++;
l3.timeaccruer++;
l1.colour = this.colour;
l2.colour = this.colour;
l3.colour = this.colour;
this.angles = [0,0,0];
this.AS = this.lines[1];
this.BS = this.lines[2];
this.CS = this.lines[0];


popStackTrace(vid);	


}
print(ver = 1){
	if(ver > 0){
		printoutt(` This triangle ${this.regind} has dots ${this.points[0]},${this.points[1]},${this.points[2]},<br>
		sides ${lr(this.AS).distance},   ${lr(this.BS).distance},  ${lr(this.CS).distance},<br>
	and angles ${radtodeg(this.AA)}, ${radtodeg(this.BA)}, ${radtodeg(this.CA)}<br> And an area of ${this.Area}`);
	}
	if(ver > 1){
	printoneline("<br>first point<br>");
	dr(this.points[0]).print();
	printoneline("<br>second point<br>");
	dr(this.points[1]).print();
	printoneline("<br>third point<br>");
	dr(this.points[2]).print();
		
if(dr(this.center) instanceof RefDot){ 	
printoneline("<br>central point<br>");	dr(this.center).print();
}
if(dr(this.averagecenter) instanceof RefDot) {
		printoneline("<br>Average Central Point point<br>");
		dr(this.averagecenter).print();
	}

}
}
rubbish(deg = 2){
 //deg = 0 remove self (Plane + Normal)
 //deg = 1 remove self and 3 edges
 //deg = 2 remove self, edges, vertices

 if(deg > 0){
	lr(this.AS).timeaccruer--;
	lr(this.BS).timeaccruer--;
	lr(this.CS).timeaccruer--;
	lr(this.AS).rubbish(0);
	lr(this.BS).rubbish(0);
	lr(this.CS).rubbish(0);
 }
 
 if(deg > 1){
	 dr(this.points[0]).timeaccruer--;
	 dr(this.points[1]).timeaccruer--;
	 dr(this.points[2]).timeaccruer--;
	dr(this.points[0]).rubbish();
	dr(this.points[1]).rubbish();
	dr(this.points[2]).rubbish(); 
 }
 
	//this.timeaccruer--;
	if(dr(this.CartesianPlane) instanceof RefDot){
	dr(this.CartesianPlane).timeaccruer--;
	dr(this.CartesianPlane).rubbish();
	}
	if(dr(this.center) instanceof RefDot){
	dr(this.center).timeaccruer--;
	dr(this.center).rubbish();
	}
	if(this.timeaccruer == 0){
	trireg.poptriangle(this.regind);
	}

	}
lawofcosines ( ){
	let vidid =	pushStackTrace("RefTriangleTwo.lawofcosines");	
	let Aside = lr(this.AS).distance;
	let Bside = lr(this.BS).distance;
	let Cside = lr(this.CS).distance; 
	let o1 = 0;
//work out 3
	o1 = (Cside * Cside) - (Aside * Aside) - (Bside * Bside); 
		o1 /= (-2 * Aside * Bside);
		this.angles[2] = Math.acos(o1);
//work out 2
	o1 = (Bside * Bside) - (Cside * Cside) - (Aside * Aside);
	o1 /= (-2 * Cside * Aside);
		this.angles[1] = Math.acos(o1);
//work out 1
	o1 = (Aside * Aside) - (Cside * Cside) - (Bside * Bside);
		o1 /= (-2 * Bside * Cside);
		this.angles[0] = Math.acos(o1);
this.AA = this.angles[0]; this.BA = this.angles[1]; this.CA = this.angles[2];
	popStackTrace(vidid);
}

findArea () {
	this.Area = 0.5 * lr(this.AS).distance * lr(this.BS).distance * Math.sin(this.CA);
}

	setCenter(){
		 let vidid =	 pushStackTrace("RefTriangle.setCEnter");
	/*	
		if(dr(this.center) instanceof RefDot){
			 dr(this.center).timeaccruer--;
		 dr(this.center).rubbish();
		 }
*/
		var il1 = new RefLine(dr(lr(this.lines[0]).center), dr(this.points[this.findExcludedDot(0)]));
//	 DFS.depthdraw(il1);
		var il2 = new RefLine( 
		dr(lr(this.lines[1]).center), 
		dr(this.points[this.findExcludedDot(1)]));
		
		var inter1 = il2.InfInt3(il1);
		if(inter1 == -1){
			il1.rubbish(0);
			il1 =   new RefLine( 
		dr(lr(this.lines[2]).center), 
		dr(this.points[this.findExcludedDot(2)]))
			inter1 = il2.InfInt3(il1);
		}
	
	
		if(dr(this.center) instanceof RefDot){
		dr(this.center).resetxyzt( inter1);
		dr(inter1).rubbish();
		}else if(dr(inter1) != -1) {
		//	printoutt(`========WHY is inter1 a random nothing? ===============${JSON.stringify(dr(inter1))}==================${JSON.stringify(inter1)}=================`);
		this.center = inter1;
		dr(this.center).timeaccruer++;
		}else{
	this.makePlanarGraphOfTriangle();
	this.rubbishplane();
	this.center = this.averagecenter;		
		}
			
	il2.rubbish(0);
	il1.rubbish(0);
	popStackTrace(vidid);
	}
	
createNormalVector(orderoflines = 1){
	// Normal is line in form of delta(xyz)

	//Add this.Normal to any point on the triangle.
	
		let vidid =	 pushStackTrace("RefTriangle.findNormalVector");
	//XXX is necessary?  orderoflines = [-2,-1,0,1,2,3]
	//if orderoflines == NOPE 
let v1, v2; 
	switch(orderoflines){
		case -2:
		v1 = lr(this.lines[2]); 
		v2 = lr(this.lines[1]);
	break;
		case -1:
		v1 = lr(this.lines[1]);
		v2 = lr(this.lines[0]);
	break;
		case 0:
		v1 = lr(this.lines[0]);
		v2 = lr(this.lines[2]);
	break;
		case 1:
		v1 = lr(this.lines[0]);
		v2 = lr(this.lines[1]);		
	break;
		case 2: 
		v1 = lr(this.lines[1]);
		v2 = lr(this.lines[2]);
	break;
		default:
		v2 = lr(this.lines[2]);
		v1 = lr(this.lines[0]);
	break;
	}
/*
if( dr(this.Normal) instanceof RefDot){
dr(this.Normal).timeaccruer--;
dr(this.Normal).rubbish();
}*/

let x2s3 = new RefDot((( dr(v1.delta).y * dr(v2.delta).z) - (dr(v1.delta).z * dr(v2.delta).y)),
 ((dr(v1.delta).z * dr(v2.delta).x) - (dr(v1.delta).x * dr(v2.delta).z)),
 ((dr(v1.delta).x * dr(v2.delta).y) - (dr(v1.delta).y * dr(v2.delta).x)), dr(this.center).t);
 if(dr(this.Normal) instanceof RefDot){
	dr(this.Normal).resetxyzt(x2s3.regind);
 x2s3.rubbish();}else{this.Normal = x2s3.regind; x2s3.timeaccruer++;}
popStackTrace(vidid);
	return this.Normal;
}

createCartesianPlaneEquation(){
	//@PARAM@ In form of U.x(i) + U.y(j) + U.z(k) = U.c  
let vidid =	 pushStackTrace("RefTriangle.findPlaneCartesianEquation");
//step1 first find the r = normal by the determinant
console.log("CCPE1");
let x22 = dr(this.createNormalVector());
console.log("CCPE2");
//step2 then find the scalar dot product 
	// r * (x,y,z)  = r * point
	if(dr(this.CartesianPlane) instanceof RefDot){
		dr(this.CartesianPlane).rubbish();
	}
this.CartesianPlane = x22.copyOfDot();
let con = (x22.x * dr(this.points[0]).x) + (x22.y * dr(this.points[0]).y) + (x22.z * dr(this.points[0]).z);
//3  xi + yj + zk = c;		xi + yj + zk - c = 0
console.log("CCPE3");
dr(this.CartesianPlane).setConstant(con);
console.log("CCPE4");
popStackTrace(vidid);
}

CreatePointOnInfCartesianPlaneFromXY(ecs = 0, wai = 0){
	let vidid =	 pushStackTrace("RefTriangle.CreatePointOnCartesianINFINITEPlaneFromXY");
	this.createPlaneCartesianEquation();
	ecs *= dr(this.CartesianPlain).x;
	wai *= dr(this.CartesianPlain).y;
	let zee = dr(this.CartesianPlain).c - ecs - wai;
	let Nd = new RefDotTwo(ecs, wai, zee);
popStackTrace(vidid);
	return Nd.regind;
}

CreatePointOnInfCartesianPlaneFromYZ(wai = 0, zee = 0){
//	xi + yj + zk = c;   c - yj - zk = xi
let vidid =	 pushStackTrace("RefTriangleTwo.CreatePointOnCartesianINFINITEPlaneFromYZ");
	this.createPlaneCartesianEquation();
	zee *= dr(this.CartesianPlain).z;
	wai *= dr(this.CartesianPlain).y;
	let ecs = dr(this.CartesianPlain).c - zee - wai;
	let Nd = new RefDot(ecs, wai, zee);
popStackTrace(vidid);
	return Nd.regind;
}

CreatePointOnInfCartesianPlaneFromXZ(ecs = 0, zee = 0){
//	xi + yj + zk = c;   c - xi - zk = yj
let vidid =	 pushStackTrace("RefTriangle.CreatePointOnINFINITECartesianPlaneFromXZ");
	this.createPlaneCartesianEquation();
	zee *= dr(this.CartesianPlain).z;
	ecs *= dr(this.CartesianPlain).x;
	let wai = dr(this.CartesianPlain).c - zee - ecs;
	let Nd = new RefDot(ecs, wai, zee);
popStackTrace(vidid);
	return Nd.regind;
}

  findExcludedDot (IncludedLineIndex){
    //@ Info:: Each Line has 2 dots thus the triangle's third dot is excluded from any line
   //purpose@ XXX 
//inputs @
//outputs@
   	switch(IncludedLineIndex){
		case 0:
		return 2;
		break;
		case 1: 
		return 0;
		break;
		case 2:
		return 1;
		break;
		default: 
		printoutt("=-broken in findExcludedDot-=");return 0;
	}
    }
	
	
makePlanarGraphOfTriangle () {
	
let vidid =	 pushStackTrace("RefTriangle.make3DPlaneOfTriangle");
	//xxx NEED COMMENTARY
	let baseline = lr(this.lines[0]);
	let thirddot = this.findExcludedDot(0);
	let onethree = new RefLine(baseline.start, this.points[thirddot]);
	let twothree = new RefLine(baseline.end, this.points[thirddot]);
//work out the ratio between the onethree and twothree so that onethree increments by o and twothree increments by p . 
let M13; let M23;
if(twothree.distance > onethree.distance){
 M13 = granularity * twothree.distance / onethree.distance;
 M23 = granularity;	
}else{
 M23 = granularity * onethree.distance / twothree.distance;
 M13 = granularity;
}
	
var asfd = new RefDot(0,0,0);
let avecount = 0;
	
let flag23 = 1; let flag13 = 	1; 
	let dist23 = 0; let dist13 = 0;
	let bounceflag = 1; 
	let bouncedflag = 0;
let point1 = dr(baseline.start);
let point2 = dr(baseline.end);	

	while(flag23 || flag13){
let ln1 = new RefLine(point1, point2);
asfd.addDot(ln1.center);
avecount++;
//printoneline(`<br> ${asfd.x} over ${avecount} is ${asfd.x / avecount}`);
ln1.colour = this.colour;
this.plane.push(ln1.regind);
this.planearea += ln1.distance;
	if(dist23 > twothree.distance){
		flag23 = 0;bounceflag = 0;bouncedflag = 13;}
	if(dist13 > onethree.distance){
		flag13 = 0;bounceflag = 0;bouncedflag = 23;}
//shouldbounce if both flags 1, 
//shouldn't bounce if either flag 0 .
if(bounceflag == 1){
	point1 = point2;
	if(bouncedflag == 1){dist23+=M23;
		point2 = twothree.crawlDistanceFromStart(dist23);
		bouncedflag = 0;
	}else{dist13+=M13; bouncedflag = 1;
		point2 = onethree.crawlDistanceFromStart(dist13);
	}
}else{
	if(bouncedflag == 13){dist13+=M13;
		point2 = onethree.crawlDistanceFromStart(dist13);
	}
	if(bouncedflag == 23){
	dist23+= M23; 
		point2 = twothree.crawlDistanceFromStart(dist23);
	}	
}
}//while
	
	asfd.singlefactormultiply(1/avecount);
	this.averagecenter = asfd.copyOfDot();
	asfd.rubbish();
	
	popStackTrace(vidid);
	}
	
	rubbishplane(){
		for(let x3 = this.plane.length-1; x3 > 0 ; x3--){
if(lr(this.plane[x3]) instanceof RefLine){
		lr(this.plane[x3]).rubbish(1);
}else{
//	printoutt(`NOT A LINE = ${this.plane[x3]} FOUND IN THE PLANE???`);
		}
		this.plane.pop();
		}
	}


findEquilateralHeight(EdgeLength = 100, baselength = 50){
//#param@ baselength = EdgeLength / 2 	
	// x2 + y2 = h2; h2 - x2  = y2 
	let hyp = EdgeLength * EdgeLength; 
	let Adj = baselength * baselength;  
	let opp = hyp - Adj;
	let height = Math.sqrt(opp);
	return height;
}

changeColour(kak){
	this.colour = kak;
	this.refresh();
}

draw(TCF = globalviewerframe){
	TCF.depthdraw(lr(this.lines[0]));
	TCF.depthdraw(lr(this.lines[1]));
	TCF.depthdraw(lr(this.lines[2]));
}




}

function checktrianglearg (ard){
	if(ard instanceof RefTriangle){
		return ard.regind;
	}else{
		if(tr(ard) instanceof RefTriangle){
			return ard;
		}else{
// is there another condition here?	
			return -1;
			}
	}
}
