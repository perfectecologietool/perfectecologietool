//BareMinimum:
//RefDot by reference
//RefLine by reference

//ERROR LOG
// (1) Edge 1 and Edge 5 move and their centers move. But Other edges have centers which do not move, meaning the SphTetrahed.nahedge_sectors dont move Except for those connected to Edge 1center or Edge5.center. 

//(2) The function 

//(3) The tetrahedron, needs to simply be given 4 points. with those four points, 
//one line is made
//then two triangles
// then the circumcenter is found, as intesection. 
////// or
// of the four points. 
// one line is made from 2.  then the other line is made from the other 2. 
// then (because one point has line to other 3 points.) one line's end meets the end of the other line. 
// and the fourth line is made. 
// then the circumcenter is made. 


class LocatedNode{
	//needs update{coherence} function?
	//justsendnew sph to spherictocarte(sph)!!

	constructor(point){
		this.cart = -1;
		this.sphe;
		this.quart;
if(point instanceof SphericalCoordinates){
	 let xds = new RefDot();
	this.sphe = xds.regind;
	dr(this.sphe).setRadius(point.getRadius());
	dr(this.sphe).setAzimuth(point.getAzimuth());
	dr(this.sphe).setInclination(point.getInclination());
	
	this.updateSTC();
}else if(dr(point) instanceof RefDot){
	this.cart = dr(point).regind;
//dr helps to pass by reference (stored once on the heap)	
	this.updateCTS();
}
	}
		

updateSTC(){
if(dr(this.sphe) instanceof RefDot){
let ex = dr(this.sphe).getRadius() * Math.sin(dr(this.sphe).inclination) * Math.cos(dr(this.sphe).azimuth);

let ey = dr(this.sphe).getRadius() * Math.sin(dr(this.sphe).inclination) * Math.sin(dr(this.sphe).azimuth);
let ez = dr(this.sphe).getRadius() * Math.cos(dr(this.sphe).inclination);
//console.log(`inside updateSTC ${this.sphe.azimuth} Sph=   ${this.sphe.getRadius()},${this.sphe.getAzimuth()},${this.sphe.getInclination()} cart  ${ex},${ey},${ez}`);
dr(this.cart).setX(ex);
dr(this.cart).setY(ey);
dr(this.cart).setZ(ez);
//xxx radius
//let et = this.sphe.R;
//this.cart = new RefDot(ex,ey,ez,et);
}else{
console.log("DDDDDDDDDDD");
let nexsp = new RefDot();

}
	}
	
	updateCTS(){
if(dr(this.cart) instanceof RefDot){
	let x2 = wholepower(dr(this.cart).x, 2);
	let y2 = wholepower(dr(this.cart).y, 2);
	let z2 = wholepower(dr(this.cart).z, 2);
let r2 = wholeroot( (x2 + y2 + z2), 2);
let t2 = Math.atan2(dr(this.cart).y, dr(this.cart).x); 
let p2 = Math.acos(dr(this.cart).z / r2);
if(dr(this.sphe) instanceof RefDot){
dr(this.sphe).set3dSpherical(r2,t2,p2) ;
}else{
let x31 = new RefDot(0,0,0); 

x31.set3dSpherical(r2,t2,p2);
this.sphe = x31.regind;}
	}
	}
	
	SphericToCarte(spa){
if(dr(spa) instanceof RefDot){
let ex = dr(spa).getRadius() * Math.sin(dr(spa).inclination) * Math.cos(dr(spa).azimuth);
let ey = dr(spa).getRadius() * Math.sin(dr(spa).inclination) * Math.sin(dr(spa).azimuth);
let ez = dr(spa).getRadius() * Math.cos(dr(spa).inclination);
this.sphe = dr(spa).regind;
if( dr(this.cart) instanceof RefDot ){
dr(this.cart).setX(ex);
dr(this.cart).setY(ey);
dr(this.cart).setZ(ez);
}else{
let x1323 = new RefDot(ex, ey, ez);
this.cart = x1323.regind;
return this.cart;
}
		}
	}
	
	CartToSphe(spc){
		if(dr(spc) instanceof RefDot){
			
	let x2 = wholepower(dr(spc).x, 2);
	let y2 = wholepower(dr(spc).y, 2);
	let z2 = wholepower(dr(spc).z, 2);
	let r1 = (x2 + y2 + z2);
		console.log(`made here${x2}, ${y2}, ${z2} with ${r1}`);
let r2 = wholeroot(r1 , 2, 4);

		console.log("made it to here");
let t2 = Math.atan2(dr(spc).y, dr(spc).x); 
//console.log(` atan2 ${t2}  and ${spc.y} and ${spc.x}`);
let p2 = Math.acos(dr(spc).z / r2);
	if(dr(this.sphe) instanceof RefDot){
dr(this.sphe).set3dSpherical(r2,t2,p2);		
	}else{
	let xds = new RefDot();
	xds.set3dSpherical(r2,t2,p2);
	this.sphe = xds.regind; 
	}
	if(dr(this.cart) instanceof RefDot){
		//for decoherence sake. Really flexibility of coherence means this doesn't automatically couple. 
		
	dr(this.cart).resetxyzt(spc);
	}else{
	this.cart = dr(spc).regind;
	}
		}else{console.log("refdot failure xxxxx323xx");}
	}
	
	logger(){
	dr(this.cart).logger();
	dr(this.sphe).logger();
	//console.log(`spherical R ${this.sphe.radius} a ${this.sphe.azimuth} i ${this.sphe.inclination} `);
	//console.log(`cartesian X ${this.cart.x} Y ${this.cart.y} Z ${this.cart.z} `);
}
	
}

class SharedNode1{
	constructor(particle = -1, center = -1){
//particle is held as reference. 
//and center is the circumcenter
	this.cart = -1; //speck
	this.sphe = -1; //coords
if(dr(particle) instanceof RefDot){
this.cart = particle;
}
if(dr(center) instanceof RefDot){
let dx = dr(this.cart).x - dr(this.center).x;
let dy = dr(this.cart).y - dr(this.center).y;
let dz = dr(this.cart).z - dr(this.center).z;
this.sphe = new RefDot(dx,dy,dz).regind;
dr(this.sphe).toSphere();
}



}

}

class SphTetrahed{
	//27/09/23 
/* The tetrahedron changes its volume at at voluminous rate per time. 
-so the volume relates to radius. 
--the volume relates to length
--the length relates to radius
So future volume yeilds future length yeilding future radius. 
depending on how long the computer takes to process the volume to radius, there can be so many 'time partitions'
Or the time can be split into half, 
or the volume can be split into half. 

The rate of the delta of the radius with respect to time, yeilds momentum (if tetrahedron changes its radius with time) 
 or power (that is the rate of change of radius with respect to time, with respect to time or dr/dt2

===

 */


	constructor(length = 1){
		let vidid =	 pushStackTrace("SphTetrahed.constructor");
		this.centroid;
		this.kala = "#000000"; 
		this.volume;
		this.screen;
		this.points = [];//global points
		this.lines = [];
		this.nodes = []; // local points
		this.selfnodes = [];

		this.edges = [];
		this.sector = [];
		
		this.faces = [];//




this.repoint(1, length);//step 1 (create the points of the tetrahedron, off-axis, to thelength; 
this.makefaces();
this.center; 
this.duration;
 
this.centralizeNodes(3);// step 2: creates the spherical shared nodes (points into shared node-basepairs)
//13/10/2023 Why doesn't this work within TimeStream's initialization
console.log(`here is the thing ${JSON.stringify(dr(this.nodes[0].sphe))}`);
//this.duration = this.findTime(dr(this.nodes[0].sphe).getRadius(), length);     //step 3: work out pythagorus simplex time
//this.momentum(1); //
this.nahedges();

//12/9/2023 momentum added to refdotfive


        popStackTrace(vidid);


	}
	
	findTime(Rad = 0, Len = 0){ 
		let R2 = Rad * Rad;
		let L2 = Len * Len;
		let t2 = L2 - R2;
console.log(` xds  ${R2}  wer ${L2}  ${t2}  `);
		let t1 = wholeroot(t2,2,4);
console.log(`Duration${t1} of length${Len}`);
		return t1;
	}
	
	repoint(flat = 1, length = 1){		
	
let vidid =	 pushStackTrace("SphTetrahed.repoint"); 
//simply moves the tetrahedron off the flat axis, for infint3 or euclid's 2nd postulate (which breaks at axis-delta=0
let p1 = new RefDot(0,0,0);		 
let ax = new RefDot(1,1,1);  
rotateRefPoint(p1,ax,0.1); 
this.points[0] = p1.regind;
  
let a = length ;let b = 0;	let c = 0;
p1 = new RefDot(a,b,c);
 rotateRefPoint(p1,ax,0.1); 
this.points[1] = p1.regind;
  
a = (length / 2)  ;	
b = (length * wholeroot(3,2,4) ) / 2;		
c = 0;
 
p1 = new RefDot(a,b,c);
rotateRefPoint(p1,ax,0.1); 
this.points[2] =  p1.regind; 
a = (length  / 2) ;
b = ( length ) /  (2 * wholeroot(3, 2,4));
c = (length  ) * ( wholeroot(2,2,4) / wholeroot(3,2,4)); 
p1 = new RefDot(a,b,c);
rotateRefPoint(p1,ax,0.1);  
this.points[3] =   p1.regind;
 ax.rubbish();
 
        popStackTrace(vidid);
return;
		
		 
	}
	
	makefaces(){
let vidid =	 pushStackTrace("SphTetrahed.makefaces"); 
this.faces[0] = new RefTriangle(this.points[1], this.points[2], this.points[3]);
this.faces[1] = new RefTriangle(this.points[1], this.points[2], this.points[0]);
this.faces[2] = new RefTriangle(this.points[1], this.points[0], this.points[3]); 
this.faces[3] = new RefTriangle(this.points[1], this.points[2], this.points[0]);
 popStackTrace(vidid);
}

	momentum(flag = 0){
if(flag == 0){
// Momentum of tetrahedron moves node[n].cart to this.center in this.duration time. 
//i.e: node[m].momentum*duration = center.	
// due to references, 
//dr(this.nodes[n].cart) == dr(this.points[n])
dr(this.nodes[0].cart).setMomentum(this.center,this.duration);		
console.log(`momentum 0 : ${this.nodes[0].cart}  ${this.points[0]}`);
dr(this.nodes[1].cart).setMomentum(this.center,this.duration);		
console.log(`momentum 1 : ${this.nodes[1].cart}  ${this.points[1]}`);	
dr(this.nodes[2].cart).setMomentum(this.center,this.duration);		
console.log(`momentum 2 : ${this.nodes[2].cart}  ${this.points[2]}`);	
dr(this.nodes[3].cart).setMomentum(this.center,this.duration);	
console.log(`momentum 3 : ${this.nodes[3].cart}  ${this.points[3]}`);
	}
if(flag == 1){
dr(this.points[0]).setMomentum(this.center, this.duration);
dr(this.points[1]).setMomentum(this.center, this.duration);
dr(this.points[2]).setMomentum(this.center, this.duration);
dr(this.points[3]).setMomentum(this.center, this.duration);
console.log('momentum set 1');
}

if(flag == 2){
dr(this.points[0]).setMomentum(this.faces[0].center, this.duration);
dr(this.points[1]).setMomentum(this.faces[1].center, this.duration);
dr(this.points[2]).setMomentum(this.faces[2].center, this.duration);
dr(this.points[3]).setMomentum(this.faces[3].center, this.duration);
console.log('momentum set 2');
}


}	

	findCircumcenter(){  
		let vidid =	 pushStackTrace("SphTetrahed.findCircumCenter()"); 
//let firstline = new RefLine(this.points[0], this.points[1]);
let firstTri = new RefTriangle(this.points[0], this.points[1], this.points[2]); 	
let secondTri = new RefTriangle(this.points[0], this.points[1], this.points[3]); 
			//take one line, make two triangles to other points.  
let firstline = new RefLine(firstTri.center, this.points[3]);
let secondline = new RefLine(secondTri.center, this.points[2]); 
 
			// find centers and make lines
			//find intersection of two lines for center.  
 this.center = firstline.InfInt3(secondline); 
  
 popStackTrace(vidid);
	}
	findcentroid(flag = 1){
		if(flag == 3){
			this.findCircumcenter();
		}
		if(flag == 1){
		    //local to nodes, ie oenter = 0,0,0
console.log('error here with NO dr()');
let x4 =  (this.nodes[0].cart.x + this.nodes[1].cart.x + this.nodes[2].cart.x + this.nodes[3].cart.x )/4;
let y4 =  (this.nodes[0].cart.y + this.nodes[1].cart.y + this.nodes[2].cart.y + this.nodes[3].cart.y )/4;
let z4 =  (this.nodes[0].cart.z + this.nodes[1].cart.z + this.nodes[2].cart.z + this.nodes[3].cart.z )/4;
		this.centroid = new RefDot( x4, y4, z4 ).regind;
		}
		if(flag == 2){
//local opoints, i.e global center for  ater localizatoof spp nodes. 
let x4 =  (this.points[0].x + this.points[1].x + this.points[2].x + this.points[3].x )/4;
let y4 =  (this.points[0].y + this.points[1].y + this.points[2].y + this.points[3].y )/4;
let z4 =  (this.points[0].z + this.points[1].z + this.points[2].z + this.points[3].z )/4;
		this.centroid = new RefDot( x4, y4, z4 ).regind;	
		}
	}
	centralizeNodes(flag1 = 3){
		let vidid =	 pushStackTrace("SphTetrahed.centralizeNodes()"); 
		//this function takes the differences between the centroid and the 4 points, then creates the 4 selfnodes. 
		//this function is opposite of globalize_fromNodesToPoints (ie: this is fromPointsToNodes
		// nodes hold the 'localized' spherical coordinates around the circumcenter. 
		// in both forms sph and cart. (local to circumcenter. )
 
		
		this.findCircumcenter(); 

		for(let i3 = 0; i3 < 4; i3++){
if(flag1 == 3){
			let x3 = dr(this.points[i3]).x - dr(this.center).x;
			let y3 = dr(this.points[i3]).y - dr(this.center).y;
			let z3 = dr(this.points[i3]).z - dr(this.center).z; 
this.nodes[i3] = new LocatedNode(new RefDot(x3, y3, z3));  
}else{
this.nodes[i3] = new SharedNode1(this.points[i3], this.center);
}


		}
		  
 popStackTrace(vidid);	
	}
	
	logger(){
		this.nodes[0].logger();
		this.nodes[1].logger();
		this.nodes[2].logger();
		this.nodes[3].logger();
		
	}
	globalize_fromNodesToPoints(flag = 1){
if(flag == 1){		this.findcentroid(3);}
//adds nodes.cart to centroid, for points.
		for(let ic1 = 0; ic1 < 4; ic1++){
let xd2 = dr(this.nodes[ic1].cart).x + this.centroid.x;
let yd2 = dr(this.nodes[ic1].cart).y + this.centroid.y;
let zd2 = dr(this.nodes[ic1].cart).z + this.centroid.z;
if(dr(this.points[ic1]) == -1){
	 this.points[ic1] = new RefDot(xd2, yd2, zd2);
}else{if(dr(this.points[ic1]) instanceof RefDot){
	dr(this.points[ic1]).setX(xd2);
	dr(this.points[ic1]).setY(yd2);
	dr(this.points[ic1]).setZ(zd2);}}
		}
	}
	updatesLines(){
		this.globalize_fromNodesToPoints();
		//triple scalar crossproduct = volume
this.lines[0] = new RefLine(this.points[0], this.points[1]);
this.lines[1] = new RefLine(this.points[0], this.points[2]);
this.lines[2] = new RefLine(this.points[0], this.points[3]);

//calculate volume as scalar triple dot cross product
let r1 = dr(this.lines[0].delta).Xproduct(this.lines[1].delta)
let r2 = dr(this.lines[2].delta).dotproduct(r1);

this.volume = r2/6; console.log(`volume is ${this.volume}`);
 console.log(`center ${(this.centroid).x} , ${(this.centroid).y}, ${(this.centroid).z} `);
	}
	drawtetlines(a1, col = "#000000"){
	    this.kala = col;
		this.screen = a1;
 this.updatesLines(); 
 this.lines[0].colour = col;
 this.lines[1].colour = col;
 this.lines[2].colour = col;
 this.screen.depthdraw(this.lines[0]);
 this.screen.depthdraw(this.lines[1]);
 this.screen.depthdraw(this.lines[2]);
 }
drawspokes(a1 = this.screen){
   this.globalize_fromNodesToPoints(3);
    let line1 = new RefLine(this.centroid, this.points[0]); line1.colour = "#00ff00";
    a1.depthdraw(line1);
	console.log(`line 1 ${line1.distance}`);
    line1.rubbish(0);
	
	line1 = new RefLine(this.centroid, this.points[1]);line1.colour = "Green";
    a1.depthdraw(line1);
	console.log(`line 2 ${line1.distance}`);
    line1.rubbish(0);
	
	line1 = new RefLine(this.centroid, this.points[2]);line1.colour = "#00ff00";
    a1.depthdraw(line1);
	console.log(`line 3 ${line1.distance}`);
    line1.rubbish(0);
	line1 = new RefLine(this.centroid, this.points[3]);line1.colour = "#00ff00";
    a1.depthdraw(line1);
	console.log(`line 4 ${line1.distance}`);
    line1.rubbish(0);
	
}
	spinAllByAzimuth(val = 0.01){
		for(let i1 = 0; i1 < 4; i1++){
dr(this.nodes[i1].sphe).addAzimuth(val); 
this.nodes[i1].updateSTC();
		}
	//	this.globalize_fromNodesToPoints(1);
	}
	spinAllByInclination(val = 0.01){
		for(let i1 = 0; i1 < 4; i1++){
dr(this.nodes[i1].sphe).addInclination(val);
		}
for(let i1 = 0; i1 < 4; i1++){		
this.nodes[i1].updateSTC();
}
	}
	move(addend){
//as in move thhis tet 's centroid to addend'
//either means center +=  (addend - centroid) ;  entroid = addend;
	    addend = dr(addend);
	    if(addend instanceof RefDot){   
	        this.centroid.resetxyzt(addend);
	    }
	 }
	
	qspinY(ang = 0.1, ax = 0, ay = 1, az = 0){
		//ax is the axel around which, upon 0,0,0, the thing spins. 
		let axY = new RefDot(ax,ay,az);
	for(let i1 = 0; i1 < 4; i1++){
		console.log(`${JSON.stringify(this.points[i1])} here it is`);
		 rotateRefPoint(this.nodes[i1].cart, axY, ang);
	}
	axY.rubbish();
	}
	
	nahedges(){
		//a,b, a,c, a,d
		//b,d c,d c,b
this.edges[0] = new RefLine(this.points[0], this.points[1]);//a
this.edges[1] = new RefLine(this.points[0], this.points[2]);//b
this.edges[2] = new RefLine(this.points[0], this.points[3]);
this.edges[3] = new RefLine(this.points[1], this.points[3]);//b
this.edges[4] = new RefLine(this.points[2], this.points[3]);//a
this.edges[5] = new RefLine(this.points[2], this.points[1]);
		//a triangle forms a net when the lines's centers connect. 
/*
this.sector.push(new RefLine(this.edges[0].center, this.edges[1].center, "#ff0000"));
this.sector.push(new RefLine(this.edges[0].center, this.edges[2].center, "#ff0000"));
this.sector.push(new RefLine(this.edges[0].center, this.edges[3].center, "#ff0000"));		
this.sector.push(new RefLine(this.edges[0].center, this.edges[4].center, "#ff0000"));		
this.sector.push(new RefLine(this.edges[0].center, this.edges[5].center, "#ff0000"));
this.sector.push(new RefLine(this.edges[1].center, this.edges[2].center, "#00ff00"));
this.sector.push(new RefLine(this.edges[1].center, this.edges[3].center, "#00ff00"));	
this.sector.push(new RefLine(this.edges[1].center, this.edges[4].center, "#00ff00")) ;	*/	
this.sector.push(new RefLine(this.edges[1].center, this.edges[5].center, "#ffffff")) ;
//why does only edges[1] and edges[5] ?
console.log(`Here is sticky points of edge1 ${this.points[0]} and ${JSON.stringify(this.points[2])}  ; and edge5 ${JSON.stringify(this.points[2])} ${JSON.stringify(this.points[1])}  while the left out spot is ${JSON.stringify(this.points[3])}`);
/*
this.sector.push(new RefLine(this.edges[2].center, this.edges[3].center, "#ff00ff"));		
this.sector.push(new RefLine(this.edges[2].center, this.edges[4].center, "#ff00ff"));		
this.sector.push(new RefLine(this.edges[2].center, this.edges[5].center, "#ff00ff"));			
this.sector.push(new RefLine(this.edges[3].center, this.edges[4].center, "#0000ff"));		
this.sector.push( new RefLine(this.edges[3].center,this.edges[5].center, "#0000ff"));
this.sector.push( new RefLine(this.edges[4].center,this.edges[5].center, "#00ff00"));				
*/ 
	}
	
	drawedges(a1){
		a1.depthdraw(this.edges[0]);
		a1.depthdraw(this.edges[1]);
		a1.depthdraw(this.edges[2]);
		a1.depthdraw(this.edges[3]);
		a1.depthdraw(this.edges[5]);
		a1.depthdraw(this.edges[4]);
for(let i1 = 0; i1 < this.sector.length;i1++){
a1.depthdraw(this.sector[i1]);
}
console.log(`printing of edge1 ${this.points[0]} and ${JSON.stringify(this.points[2])}  ; and edge5 ${JSON.stringify(this.points[2])} ${JSON.stringify(this.points[1])}  while the left out spot is ${JSON.stringify(this.points[3])}`);

	}
	
	};

class Shemayim {
//volume changes with respect to time. 
}
class Raquia {
//work changes energy between kinetic and potential
}

//sharedNodes
class TemporalTracker{
	constructor(){
		this.ID = 0;
		this.memory = new RefDot(0,0,0);
		this.point = -1;
		this.forces = [];
//The timeslice holds a memory of a point
//	and holds the particle remembered. 
	}

printref(){
	console.log(`particle is ${this.point} and memory is ${this.memory.regind}`);
}
	
remember(){//no reason for this this function/ 
this.memory.resetxyzt(this.point);
this.memory.toSphere();
}	
addPoint(referd = -1, centr = -1){
//0700
let vidid =	 pushStackTrace("Temporaltracker.addpoint");
if(referd == -1) return;
	let ref1 = dr(referd);
	let cen1;
if(centr != -1) { cen1	= dr(centr); }
	if(ref1 instanceof RefDot){
		this.memory.resetxyzt(ref1);
		this.point = referd;
	}else{console.log("FAILURE OF ARGUMENT TO TRACKERBob");}
	if(cen1 instanceof RefDot){
		this.memory.subtractDot(cen1);	
	}
		this.memory.toSphere();
		
        popStackTrace(vidid);
}

workAllForces(dt=1){
//	moves point by force[0->max]
//	moves point by force[0->max]
//memory = now;
//add all forces to point
//next time slice holds new memory
}

applyForce(arg2){
//inserts force in to this.forces[]
if(dr(arg2) instanceof RefDot){
this.forces.push(arg2);
console.log(`19/10/23 here ${arg2}`);
}


console.log(`19/10/23 here ${arg2}`);
}


}

//TimeSlice
class TimeSlice {
constructor(){
	this.paren = 0;
	this.center = -1;
	this.points = []; //new Map();
}

printref(){
	for(let i1 = 0; i1 < this.points.length; i1++){
	this.points[i1].printref();
	}
}

setParent(ren = 0){//this function is here because of G the environmental factors belong up, timeslice is 3D, timestream is 4D, and G is m3/kgT^2
	this.paren = ren;
}
setCenter(referd){
let vidid =	 pushStackTrace("TimeSlice.setCenter");
//007
//gets called by the timestream (must be called before new TemporalTrackers added .
if(dr(referd) instanceof RefDot){
	this.center = referd;
}

        popStackTrace(vidid);
}

addDot(REFD){
//0800
if(dr(REFD) instanceof RefDot){
	let NePo = new TemporalTracker();
NePo.addPoint(REFD, this.center);
// Map() allows to avoid repeats.
this.points.push(NePo);
}

}

ISAttraction(Gfactor = 1){//inversesquare

	let vidid =	 pushStackTrace("slice.ISAttraction");
	for(let i1 = this.points.length; i1 > 0;){
	i1--; 
		for(let i2 = this.points.length;i2 > 0;){
			i2--;
			 
			if(i2 == i1){
				
			}else{
//for every point, the force as delta component (force is added to velocity's inertia. inertia is computed every second.)
 //15/october/2023
 //force is m*m*g / r2 and r = distance between 2 points
 //so given sphericalcoordinates between two points. 
 //the SC.r = mmg/r2
 if(this.points[i1].point == -1){break;}
 if(this.points[i2].point == -1){break;}
 
 let DistLine = new RefLine(this.points[i1].point, this.points[i2].point); 
 dr(DistLine.delta).toSphere(); 
 let Frc = (Gfactor * dr(this.points[i1].point).mass * dr(this.points[i2].point).mass ) / (DistLine.distance * DistLine.distance);
 //missing the G factor
 let lf = dr(DistLine.delta).copyOfDot();
 dr(lf).setRadius(Frc);
 dr(lf).print();
 printoutt("+++++++++++");
 this.points[i1].applyForce(lf 	);
 DistLine.rubbish(0);
 
			}
		}
		
		
	} 
popStackTrace(vidid);
}


} 

//TimeStream
class TimeStream {
/*Memory keys
//1: good brain food 
//2: automatic negative thoughts
//3: physical movement 
//4: brain nutrients (b vitamins) 
//5: positive peer group
//6: clean your environment
//7: sleep
//8: brain protection (helmet) 
//9: new learnings (add years to life and add life to years.) Consistency is power. 
//10: stress management. 
*/

constructor(){
this.origin;
this.slices = [];
this.presentindex = -1;
}

setOrigin(ri){
	let vidid =	 pushStackTrace("TimeStream.setOrigin");
	if((ri instanceof RefDot)||(dr(ri) instanceof RefDot)){
		 this.origin = dr(ri).regind;
	}else if(ri instanceof TemporalTracker){
		this.origin = dr(ri.point).regind;
	}		
	
        popStackTrace(vidid);
}
pushSlice(PS){	let vidid =	 pushStackTrace("TimeStream.pushslice");
	if(PS instanceof TimeSlice){
		this.slices.push(PS);
		this.presentindex++;
	}
	
        popStackTrace(vidid);
}
forMuri(len = 100){
	let T1 = new SphTetrahed(len);
	this.setOrigin(T1.center);
}

forLight(len = 100, flag23 = 1){
	//This belongs in the next class.
	let vidid =	 pushStackTrace("TimeStream.forLight");
	let T1;
	let TZero;
	if(flag23 >0){
	console.log(" ENG START HERE");

	T1 = new SpheTet(len);
	console.log(" ENG FOUND HERE");
}
	if(flag23 >1){
	this.setOrigin(T1.center);
	}
/*initialize the zero slice*/
if(flag23 >2){
	TZero = new TimeSlice();
}
if(flag23 > 3){
TZero.setCenter(T1.center);
}
if(flag23 > 4){
TZero.addDot(T1.points[0]);
TZero.addDot(T1.points[1]);
TZero.addDot(T1.points[2]);
TZero.addDot(T1.points[3]);
}
//referencechecker => is( isNumber(pointref) && dr(pointref) instanceof RefDot)
if(flag23>2){
this.pushSlice(TZero);
}
        popStackTrace(vidid);

}

workAllForcesOnAllPoints(timetick = 0){
	if(timetick >= this.slices.length){return;}
	
}

workNewSlice(){
	let vidid =	 pushStackTrace("timestream.workNewSlice");
	if(this.slices.length == 0 || this.presentindex == -1){return;}
	//takes present slice, and creates a new slice. 
	let nsl = new TimeSlice();
 
	nsl.setCenter(this.slices[this.presentindex].center);
 
	this.slices[this.presentindex].ISAttraction();
	
	///debug 19/10/23 21:09 
 
	
	
	for(let i1 = this.slices[this.presentindex].points.length; i1 > 0; ){ 
		i1--;
		
		let nm1 = dr(this.slices[this.presentindex].points[i1].point).copyOfDot();
console.log(` 21:23 ${this.slices[this.presentindex].points[i1].point} 20/oct  ${JSON.stringify(dr(nm1))}`);
	dr(nm1).toCart();
console.log(` 21:24 20/oct  ${JSON.stringify(dr(nm1))}`);
	
		//accumulateallforces upon this slice
		for(let i2 = this.slices[this.presentindex].points[i1].forces.length-1;i2 >= 0; i2--){
			//for all the forces at every point
//20/10/2023 
	//	console.log(`20/10/23 ${JSON.stringify(dr(	this.slices[this.presentindex].points[i1].forces[i2]))}`);
dr(	this.slices[this.presentindex].points[i1].forces[i2]).toCart();
//		console.log(`here you 20/10 ${JSON.stringify(dr(	this.slices[this.presentindex].points[i1].forces[i2]))}`);
//homogenize the force, from spherical to cartesian. (xyz = rai
console.log(`20/10/23 ${JSON.stringify(dr(this.slices[this.presentindex].points[i1].forces[i2]))}`);
dr(nm1).addDot(this.slices[this.presentindex].points[i1].forces[i2]); 
console.log(`20  at ${i2} is  ${JSON.stringify(dr(this.slices[this.presentindex].points[i1].forces[i2]))}`);
//	add the force (for this dt) to the inertial
console.log("$fresh00753 success.");
		}
dr(		this.slices[this.presentindex].points[i1].point).addDot(nm1);
//
//dr(nm1).print();
dr(nm1).toSphere();

//store as inertia.
dr(this.slices[this.presentindex].points[i1].point).setRadius(dr(nm1).getRadius());
dr(this.slices[this.presentindex].points[i1].point).setAzimuth(dr(nm1).getAzimuth());
dr(this.slices[this.presentindex].points[i1].point).setInclination(dr(nm1).getInclination());
nsl.addDot(this.slices[this.presentindex].points[i1].point);
dr(nm1).rubbish();
	}
	
	this.pushSlice(nsl);
	nsl.printref();
	
popStackTrace(vidid);
}

}


class FiveMuri5d{
//doesn't change quantity of energy, but observes R to change direction. Perhaps there is something akin to the phantom photon. 
constructor(len = 100, flag23 = 1){
	//This belongs in the next class.
	let vidid =	 pushStackTrace("FiveMuriGravity.contructor");
	
	let T1;
	let TZero;
this.Gforce = 0.0006;//m^3/kgt^2
	this.spacetime = new TimeStream();
	this.structure = 0;
	if(flag23 >0){ 

	T1 = new SpheTet(len); 
	this.structure = T1;
}
	if(flag23 >1){
	this.spacetime.setOrigin(T1.center);
	}
/*initialize the zero slice*/
if(flag23 >2){
	TZero = new TimeSlice();
}
if(flag23 > 3){
TZero.setCenter(T1.center);
}
if(flag23 > 4){
	//simply the points are held.
TZero.addDot(T1.points[0]);
TZero.addDot(T1.points[1]);
TZero.addDot(T1.points[2]);
TZero.addDot(T1.points[3]);
}
//referencechecker => is( isNumber(pointref) && dr(pointref) instanceof RefDot)
if(flag23>2){
this.spacetime.pushSlice(TZero);
}
        popStackTrace(vidid); 

}
/*
runs test of region against criterion, and calls effect;
 
20/sept/2023
this.test;
this.criterion;
this.effect = this.mauve;
 
//30/sept/2032
// The work changes the momentum, but work happens before momentum but inside the same 'tick' of time. 
//So there is a choice to work. 
//And choice gets executed at every tick of the time. and 
//at every tick of the time, momentum happens.  
//7D is a law, the law applies to many plans
// and the many plans apply to many choices
// and the choice applies to many ticks of time. 
//meaning: for a law, the plan applies to every choice. 
// within the plan the choice applies to every tick of time.
/////
// In a 4D tick series, each tick is 
//  0 to 1, 0 to 1, 0 to 1.
//5d occurs for each 4d tick, in the middle of time, which seems like after 0 before 1. 
//
//1st october 
// To place a 2d pixel in 3D, the pixel is given 3D, 
// but to add the 3D pixel into 2D, the 3D still exists but is ignored. 
// so to place the 5D pixel in 4D , still uses 4D but selection is ignored. To place 4D in 5D is to encapsulate the 4D inside a 5D choice. 
//For an object, an 'action set' encorporates many 'paths' which lead to the same location. 
//we can say that the destination determines the path categorization. as in: there is a summit reached by many paths, and that summit is a collection of choices. That collection, known by its summit, is an 'action set.' 
//There's a path that does an action. And there's a path that doesn't do the action. 

//The choice itself needs to be recognized. 
//For the light, the choice is (is R(t) >= R(L) ) 
//And the choice is R(t) == 0 ?  which can be L(t) < 1; 

//
//2nd october 

 // 1) Although the timestream, and the points are two different things, meaning the timestream is like a memory of the creation of the point lattice. 
// through the timestream, the light may bounce and collate. 

//2) since the time stream records the creation, there is a 'bleeding edge' which represents the 'timeslice's' present time.. 

// 3) perhaps the tetrahedrons can properly mesh, at the 2nd generation. 

//3rd October
//1) Lagrangian = Kinetic Energy - Potential Energy. 
//Action = integration (Lagrangian) with respect to time. 
//Kinetic energy =~ velocity of 4th point
//potential energy =~ distance of 4th point from triangle's center
// ...  So this is where the center of time is ? when 4th point reaches center of triangle. 
////// Analysis
// So with time, potential energy reduces. and employing the equation, 
//4th October
 
In time, work reduces potential. 
Make sure work reduces potential. 
When there is zero potential, work is done to reduce energy and restore potential.  redemption
 
//1 Corinthians 15:
// sown in weakness 
//// the parable of the seed. The seed leaves the power of the plant. and is buried. 
// raised in power.  
//// but the seed then yeilds a plant after it's kind. 

////////////////////////
//	PROCESS (4/10/23) //
////////////////////////
//1) the 3 meet with the 4th.
// There are 4 triangles, and 4 matching 4th points. 


*/

//set criterion of the light class
 
// once set in motion, 
//if this.region.nodes[f].getRadius() is less than this.criterion, then move by momentum. 
//if this.region.nodes[f].getRadius() =< this.criterion. Reset momentum towards center. 
 
 tick(){
	this.spacetime.workNewSlice();
 }
 
 display(a1){
	 this.structure.drawedges(a1);
 }
 
tick1(){
dr(this.region.points[0]).moveWithMomentum();
dr(this.region.points[1]).moveWithMomentum();
dr(this.region.points[2]).moveWithMomentum();
dr(this.region.points[3]).moveWithMomentum();
}

}


//7D
//8D
//9D
/*
I want to create a data structure that holds a word, and the word holds a couple of function handles and some bits of data, like a class in Javascript. But the classes are linked together like words in a sentence. 
Predefined sentences. 
So there is one sort of class for words and their 'elements' such as space, movement, plan, subject flag, object flag, tamil grammar flags. 

Design an inmemory data base that holds classes in the following manner: a class that represents  

*/

class word11D {
constructor(word, rootelement, caseelement ){
this.word = word;
this.root = rootelement;
this.case = caseelement;
}
}

 

