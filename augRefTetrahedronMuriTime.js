class RefMuriTet {

constructor (BaseLine ) {
	let DFS = globalviewerframe;
let vidid = pushStackTrace("RefTetrahedron.constructor");
this.toc = TodaygetTime();
	this.points = [];
	this.lines = [];
	this.spokes = [];
	this.center = -2;
	this.faces = [];
	this.averagecenter = 0;
	this.facesexcludeddot = [];
	this.facestruts = [];
	this.edgestruts = [];
	this.landface = [];
	this.skyedges = [];
//	this.points.push(BaseLine.start);
//this.lines[0]  = checklinearg(BaseLine);

	this.volume = 0;
	this.MuriLine;

 
if(BaseLine instanceof RefLine){
	this.points[0] = BaseLine.start;
	this.points[1] = BaseLine.end;
this.faces[0] =  this.createEquilateralTriangleWithXY(BaseLine, 1 , 1 );
//printoutt("HERE IT IS 8210");
if(dr(tr(this.faces[0]).center) == -1){alert("Center of Triangle failing");return;}
//tr(this.faces[0]).makePlanarGraphOfTriangle();
//tr(this.faces[0]).print(2);
this.points[2] = tr(this.faces[0]).points[2];
//printoutt("HERE IT IS 8310");
this.points[3] = this.findFourthDotFromFace(this.faces[0]);
tr(this.faces[0]).rubbish(0);
}else{let length = BaseLine;
	let p1 = new RefDot(0,0,0);		
let ax = new RefDot(1,1,1); 
this.points[0] = rotateRefPoint(p1,ax,0.1).regind; 
let a = length ;let b = 0;	let c = 0;
p1 = new RefDot(a,b,c);
this.points[1] =  rotateRefPoint(p1,ax,0.1).regind; 
a = (length / 2)  ;	b = (length * wholeroot(3,2,4) ) / 2;		c = 0;
p1 = new RefDot(a,b,c);
this.points[2] =   rotateRefPoint(p1,ax,0.1).regind; 
a = (length  / 2) ;b = ( length ) /  (2 * wholeroot(3, 2,4));c = (length  ) * ( wholeroot(2,2,4) / wholeroot(3,2,4)); 
p1 = new RefDot(a,b,c);  
 this.points[3] =  rotateRefPoint(p1,ax,0.1).regind; 
}
//printoutt("HERE IT IS 8381");
this.createFourFacesFromFourPoints();
//printoutt("HERE IT IS 8382");
this.createSixEdgesFromFourFaces();
//printoutt("HERE IT IS 8383");
this.calculateVolumeAlgebraically();
this.TripleScalarCrossProductVolume();
this.setCenter();
this.toc = dr(this.center).t.realTime - this.toc;
////////////
//	findAverageCenter starts at first and center is last. 
//this.findAverageCenter();
//
////////////
popStackTrace(vidid);
}

//23/8/23
TripleScalarCrossProductVolume(){
	let r1 = dr(lr(this.lines[0]).delta).Xproduct(lr(this.lines[3]).delta)
let r2 = dr(lr(this.lines[4]).delta).dotproduct(r1);

this.volume = r2/6; console.log(`volume is ${this.volume}`);
}

//23/8/23
createSpokes(){
	this.spokes[0] = (new RefLine(this.center, this.points[0])).regind;
	this.spokes[1] = (new RefLine(this.center, this.points[1])).regind;
	this.spokes[2] = (new RefLine(this.center, this.points[2])).regind;
	this.spokes[3] = (new RefLine(this.center, this.points[3])).regind;
	
}

print(){
printoutt(`number of faces ${this.faces.length} number of lines ${this.lines.length}`);
lr(this.lines[0]).print(2);
lr(this.lines[1]).print(2);
lr(this.lines[2]).print(2);
lr(this.lines[3]).print(2);
}


draw(DFS = globalviewerframe){
	if(this.faces.length == 4){
		tr(this.faces[0]).draw(DFS);
		tr(this.faces[1]).draw(DFS);
		tr(this.faces[2]).draw(DFS);
		tr(this.faces[3]).draw(DFS);
	return;
	}
	if(this.lines.length == 6){
		lr(this.lines[0]).draw(DFS);
	//	lr(this.lines[1]).draw(DFS);
		//lr(this.lines[2]).draw(DFS);
	lr(this.lines[3]).draw(DFS);
		lr(this.lines[4]).draw(DFS);
		//lr(this.lines[5]).draw(DFS);
	}
}

createEquilateralTriangleWithXY(BaseLine, ecs = 0, wai = 0){
	  let vidid =	 pushStackTrace("RefTetrahedron.createEquilateralTriangleWithXY");
	
	BaseLine = checklinearg(BaseLine);
	if(BaseLine == -1){return -1;}
let sparepoint = dr(lr(BaseLine).center).copyOfDot();
let NormPlan = lr(BaseLine).CreateNormalPlaneUsingPoint(sparepoint);
	if(NormPlan == -1){return -1;}

let PerpenPoint = lr(BaseLine).findPointOnCartesianPlaneFromXY(NormPlan, 10 + ecs*2,10 + 3* wai);
	dr(NormPlan).rubbish();
let spareline1 = new RefLine(lr(BaseLine).center, PerpenPoint);

let var23 = lr(BaseLine).distance;

spareline1.changeDistanceChangeEnd( lr(BaseLine).findEquilateralHeight(var23, (var23 / 2)));
let retval = new RefTriangle(lr(BaseLine).start, lr(BaseLine).end, spareline1.end);
spareline1.rubbish(0);
popStackTrace(vidid);
return retval.regind;
	
	
}

findFourthDotFromFace(FaceR){
	FaceR = checktrianglearg(FaceR);

let CC = dr(tr(FaceR).center).copyOfDot();
dr(CC).addDot(tr(FaceR).Normal);
let bl = new RefLine(tr(FaceR).center, tr(FaceR).points[1]);
let bl1 = new RefLine(tr(FaceR).center, tr(FaceR).points[0]);
let bl2 = new RefLine(tr(FaceR).center, tr(FaceR).points[2]);
console.log(`triangles ${bl2.distance} and ${bl1.distance} and ${bl.distance} and `);

let mll = bl.findEquilateralHeight(lr(tr(FaceR).lines[0]).distance, bl.distance);
let ml = new RefLine(tr(FaceR).center, CC);

ml.changeDistanceChangeEnd(mll);

return ml.end;
	
}

createFourFacesFromFourPoints(){
if(this.points.length != 4){return -1;}
if(0 == ( 
	(dr(this.points[0]) instanceof RefDot) &&
	(dr(this.points[1]) instanceof RefDot) &&
	(dr(this.points[2]) instanceof RefDot) &&
	(dr(this.points[3]) instanceof RefDot) )){return -1;}

//Uses the Single-Thread method, two wrap around the outside. Assumes a granularity creep of one.
//0 = A B C
//1 = C A D
//2 = D C B
//3 = B D A
let T1 = new RefTriangle(this.points[0], this.points[1], this.points[2]);
this.faces[0] = T1.regind;
this.facesexcludeddot[0] = 3;
T1 = new RefTriangle(this.points[2], this.points[0], this.points[3]);
this.faces[1] = T1.regind;
this.facesexcludeddot[1] = 1;
T1 = new RefTriangle(this.points[3], this.points[2], this.points[1]);
this.faces[2] = T1.regind;
this.facesexcludeddot[2] = 0;
T1 = new RefTriangle(this.points[1], this.points[3], this.points[0]);
this.faces[3] = T1.regind;
this.facesexcludeddot[3] = 2;
}

createSixEdgesFromFourFaces(){
	//this is what i seek to address, when i try to invoke the mechanism of this relationship via the very nature of the structure itself. 8/
	
	this.lines[0] = tr(this.faces[0]).lines[0];
	this.lines[1] = tr(this.faces[2]).lines[0];
	this.lines[2] = tr(this.faces[1]).lines[0];
	this.lines[3] = tr(this.faces[3]).lines[0];
	
	this.lines[4] = tr(this.faces[0]).lines[1];
	this.lines[5] = tr(this.faces[1]).lines[1];
	
	
	
}

createFaceStruts(){
	let v1 = new RefLine(tr(this.faces[0]).center, this.points[this.facesexcludeddot[0]]);
	this.facestruts[0] = v1.regind;
	v1 = new RefLine(tr(this.faces[1]).center, this.points[this.facesexcludeddot[1]]);
	this.facestruts[1] = v1.regind;
	v1 = new RefLine(tr(this.faces[2]).center, this.points[this.facesexcludeddot[2]]);
	this.facestruts[2] = v1.regind;
	v1 = new RefLine(tr(this.faces[3]).center, this.points[this.facesexcludeddot[3]]);
	this.facestruts[3] = v1.regind;
}

rubbishFaceStruts(){
	lr(this.facestruts[0]).rubbish(0);
	lr(this.facestruts[1]).rubbish(0);
	lr(this.facestruts[2]).rubbish(0);
	lr(this.facestruts[3]).rubbish(0);
	this.facestruts.pop();
	this.facestruts.pop();
	this.facestruts.pop();
	this.facestruts.pop();

}

createEdgeStruts(){
	let v1 = new RefLine(lr(this.lines[0]).center, lr(this.lines[1]).center);
	this.edgestruts[0] = v1.regind;
	v1 = new RefLine(lr(this.lines[2]).center, lr(this.lines[3]).center);
	this.edgestruts[1] = v1.regind;
	v1 = new RefLine(lr(this.lines[4]).center, lr(this.lines[5]).center);
	this.edgestruts[2] = v1.regind;
}

rubbishEdgeStruts(){
	lr(this.edgestruts[0]).rubbish(0);
	lr(this.edgestruts[1]).rubbish(0);
	lr(this.edgestruts[2]).rubbish(0);
	this.edgestruts.pop();
	this.edgestruts.pop();
	this.edgestruts.pop();
}

setCenter(){
var c1 = 0;

	if(this.facestruts.length != 4 && (c1 < 2)){this.createFaceStruts();c1++;}
	
c1 = lr(this.facestruts[0]).InfInt3(this.facestruts[1]);
	if(dr(c1) instanceof RefDot){
		this.center = c1;return;}else{}
c1 = lr(this.facestruts[0]).InfInt3(this.facestruts[2]);
	if(dr(c1) instanceof RefDot){this.center = c1;return;}else{}
c1 = lr(this.facestruts[0]).InfInt3(this.facestruts[3]);
	if(dr(c1) instanceof RefDot){this.center = c1;return;}else{}
	this.findAverageCenter();
this.averagecenter.print();
	
}

createLandSkyEdges(){
let sp1 = [];
sp1[0] = this.points[0];sp1[1] = this.points[1];
sp1[2] = this.points[2];sp1[3] = this.points[3];

// set  4th point as highest point
// assume (due to screen) that y is the 3rd sky dimensio
if( dr(sp1[0]).y > dr(sp1[3]).y){
	let t1 = sp1[3]; sp1[3] = sp1[0]; sp1[0] = t1;
}
if( dr(sp1[1]).y > dr(sp1[3]).y){
	let t1 = sp1[3]; sp1[3] = sp1[1]; sp1[1] = t1;
}
if( dr(sp1[2]).y > dr(sp1[3]).y){
	let t1 = sp1[3]; sp1[3] = sp1[2]; sp1[2] = t1;
}

this.skyedges[0] = new RefLine(sp1[0], sp1[3]);
this.skyedges[1] = new RefLine(sp1[1], sp1[3]);
this.skyedges[2] = new RefLine(sp1[2], sp1[3]);
if(tr(this.landface) == -1){
this.landface = new RefTriangle(sp1[0], sp1[1], sp1[2]);
}
	
}

findAverageCenter(){
	if(this.skyedges.length != 3){this.createLandSkyEdges();}
	// A - B - C
	// C - A - B
	// B - C - A
	this.averagecenter = new RefDot(0,0,0);
	var Line1 = this.skyedges[0];
	var Line2 = this.skyedges[1];
	var Line3 = this.skyedges[2];
	var counter = 0;;
	var vert1 = 0; var vert2 = 0; var vert3 = 0;
	for(let id1 = 0; id1 < this.skyedges[0].distance; id1++){
		vert1 = Line1.crawlDistanceFromStart(id1);
		vert2 = Line2.crawlDistanceFromStart(id1);
		vert3 = Line3.crawlDistanceFromStart(id1);
//printoneline(` one triangle = ${vert1} and ${vert2} and ${vert3}`);
		var dytriangle = new RefTriangle(vert1, vert2, vert3);
		dytriangle.makePlanarGraphOfTriangle();
	dytriangle.rubbishplane();
	this.averagecenter.addDot(dytriangle.averagecenter);
	counter++;
	dytriangle.rubbish(2);
	
	}
this.averagecenter.singlefactormultiply(1/counter);	
//	printoutt("---------- EXITING THE VOLUMIZER --------------");
	this.averagecenter.print();
}

calculateVolumeAlgebraically(){
	printoutt(`The Lines's distance is inside the tetrahedron ${lr(this.lines[0]).distance}`);
	this.volume = (lr(this.lines[0]).distance * lr(this.lines[0]).distance *  lr(this.lines[0]).distance) / 8.4852813742385702928101323452582; 
}

placeMuriLine(Facet = 0){
	
	//XXX Here is an error i found that is structurally spreadout. 
//	Firstly, The location of the "dr(dot).timeraccruer--;dr(dot).rubbish();" code within the line function, is unacceptable. That code should be public accessed as disgard() working the private .timeaccruer integer.  
// line from center of tetrahedron to center of face
//extend line from center(as start) to edgelength.(as end)
// This line is analoguous to the central guide of the triangle, and the tetrahedron. 
if( (dr(this.center) instanceof RefDot) && (dr(tr(this.faces[Facet]).center) instanceof RefDot)){
this.MuriLine = new RefLine(this.center, tr(this.faces[Facet]).center);
this.MuriLine.changeDistanceChangeEnd(-1 * lr(tr(this.faces[Facet]).lines[0]).distance);
/*
Secondly,  Line "ChangeDistanceWhileChangingEndPoint() " function (for short "ChanDistChangeEnd()") is where the first point occurs and the actual dot of the end is changed out completely with a new Reg.first.index . Therefore the function should be duplicated as "changeDistanceMoveEnd()" which alter's the current dot's coordinate value.
*/

}



}


}
/*23/8/23
I need to manually calculate the volume, 
by adding the lines in each triangle,
and adding the triangles together
because this.calculateVolumeAlgebraically() is different from this.TripleScalarCrossProductVolume()


*/
