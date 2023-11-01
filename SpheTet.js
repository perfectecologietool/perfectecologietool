
class SpheTet{ 
//15/october/2023
//

	constructor(length = 1){
		let vidid =	 pushStackTrace("SpheTet.constructor");
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
//this.momentum(1); 
this.nahedges();

//12/9/2023 momentum added to refdotfive
console.log(`SphTet's center is ${JSON.stringify(dr(this.center))}`);

        popStackTrace(vidid);


	}
	
	findTime(Rad = 0, Len = 0){ 
	let vidid =	 pushStackTrace("SphTet .findTime");
		let R2 = Rad * Rad;
		let L2 = Len * Len;
		let t2 = L2 - R2;
console.log(` xds  ${R2}  wer ${L2}  ${t2}  `);
		let t1 = wholeroot(t2,2,4);     popStackTrace(vidid);
		return t1;
	}
	
	repoint(flat = 1, length = 1){		
	
let vidid =	 pushStackTrace("SphTet .repoint"); 
//simply moves the tetrahedron off the flat axis, for infint3 or euclid's 2nd postulate (which breaks at axis-delta=0
let p1 = new RefDot(0,0,0);		 
let ax = new RefDot(1,1,1);  
rotateRefPoint(p1,ax,0.1); 
this.points[0] = p1.regind;
p1.setMass(length);
  
let a = length ;let b = 0;	let c = 0;
p1 = new RefDot(a,b,c);
 rotateRefPoint(p1,ax,0.1); 
this.points[1] = p1.regind;
  
p1.setMass(length);
a = (length / 2)  ;	
b = (length * wholeroot(3,2,4) ) / 2;		
c = 0;
 
p1 = new RefDot(a,b,c);
p1.setMass(length);
rotateRefPoint(p1,ax,0.1); 
this.points[2] =  p1.regind; 
a = (length  / 2) ;
b = ( length ) /  (2 * wholeroot(3, 2,4));
c = (length  ) * ( wholeroot(2,2,4) / wholeroot(3,2,4)); 
p1 = new RefDot(a,b,c);
p1.setMass(length);
rotateRefPoint(p1,ax,0.1);  
this.points[3] =   p1.regind;
 ax.rubbish();
 
        popStackTrace(vidid);
return;
		
		 
	}
	
	makefaces(){
let vidid =	 pushStackTrace("SphTet .makefaces"); 
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
	 	let vidid =	 pushStackTrace("SphTet.findCircumCenter()"); 
 
			//take one line, make two triangles to other points.  
let firstline = new RefLine(this.faces[0].center, this.points[0]);
let secondline = new RefLine(this.faces[1].center, this.points[1]); 
 
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

