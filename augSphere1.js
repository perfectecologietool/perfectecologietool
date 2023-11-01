/*To Show the growth of a 4D spherical(R,a,b,t) R=variable
then you can show that when t is forcibly R, which is a set of points whose set is defined by (x=y=z a set of Integers) 
let us call this set "Cubic Diagonal Numbers(CDNset)"
then the 8 regions starting from the cross at 1, can be watched as they multiply and reduce in screen size
*/
//To Show the growth of a 4

class sphere {
	constructor(O = new RefDot(0,0,0)){	
		this.origin = checkdotarg(O);;
		this.points = [];			//SphCoo
		this.subjective3DC = []; // RefDot-Origin
		this.objective3DC = [];//RefDot + Origin
	}
	
	addpoint(newpoi){
//a sphere contains  spherical coordinate points, points ignorant to which sphere's origin. 	
	if(newpoi instanceof SphCoo){
		this.points.push(newpoi);
		return;
		}
		newpoi = checkdotarg(newpoi);
	if(dr(newpoi) instanceof RefDot){
	////I want to rotate the tetrahedron about the center, using a sphere. 
//This means that the sphere takes the points of the tetrahedron. 
//the sphere relates those points relative to its origin. 
//then the sphere rotates these spherical coordinates, and , given the dotregister acting as basepair, the points should change. 
	var nl1 = new RefLine(this.origin, newpoi);
printoutt("What The" + 
JSON.stringify(nl1));
	 //As soon as the setX() setY() setZ() in refdot(). the associated sphcoo in dotreg is affected. 
	 let scl1 = drs(newpoi);
	 if(scl1 instanceof SphCoo){
		 	MutexRefreshFlag = 0;
	 // as soon as sphcoo does setR(), setA(), setb() , then the associated refdot in dotreg is affected. This is not what is wanted. 
	 //Tetrahedron sends its point to sphere. 
	 //sphere has origin set to tet's center. 
	 //sphere takes delta of center and point
	 //sphere stores delta as sphcoo
	 //=== sphcoo is edited ===
	 scl1.calculateFromComponents(nl1.delta);
	 MutexRefreshFlag = 1;
	 		this.points.push(scl1);
	 //sphere affects associated refDot with respect to thisorigin. 
	 //Therefore Since MutexFlag is set here, to disentangle Dot from Spheric, it is the Sphere which has the duty to alter the spheric, and alter the dot appropriately according to the Origin.
	 
	 }	
	
	
	}
		
		
	}
	
	addDeltaAnglesToAll(a = 0, b = 0){
		for(let i1 = 0; i1 < this.points.length;i1++){
let sp1 = this.points[i1];
let oa1 = sp1.geta();
let ob1 = sp1.getb();
		 	MutexRefreshFlag = 0;
sp1.seta(oa1 + a);
sp1.setb(ob1 + b);
printoutt(`INSIDE ADDDELTAANGLES dps2 is ${sp1.regind} but sp1 = ${JSON.stringify(sp1)}`);
let dps2 = dr(sp1.regind);
let SD1 = sp1.returnInto4DLightRefDot();
dr(SD1).addDot(this.origin);
dps2.resetxyzt(SD1);	
		 	MutexRefreshFlag = 1;

	}
	}
	
	returnsubjective3DC(indx){
		if((indx < this.points.length) && (indx > -1)){
	//let i3 =	 new RefDot(this.points[indx].getX(),this.points[indx].getY(),this.points[indx].getZ());
	
let i3 = this.points[indx].returnInto4DLightRefDot();
	this.subjective3DC[indx] = i3;
		return i3;
		}}
	refreshsubjective3DC(){
for(let it1 = 0; it1 < this.points.length; it1++){
this.returnsubjective3DC(it1);
		}
	}		
		
	returnobjective3DC(indx){
		if((indx < this.points.length) && (indx > -1)){
		let i3 = this.returnsubjective3DC(indx);
		dr(i3).addDot(this.origin);

		return i3;
		
		}}
	refreshObjective3DC(){
		this.refreshsubjective3DC();
		for(let i1 = 0; i1 < this.subjective3DC.length; i1++){
dr(this.subjective3DC[i1]).addDot(this.origin);
		}
	}
		
		printObjectively(DFS = globalviewerframe, siz = 2, kala = "#11bb22"){
			this.refreshObjective3DC();
			for(let i1 = 0; i1 < this.points.length; i1++){
			var va2 = DFS.depthPoint(
			this.subjective3DC[i1]);
			DFS.drawPixelArray(va2,siz, kala);
			}
		}
		
		printRadius(indx = 0, DFS = globalviewerframe){
	this.refreshObjective3DC();
	for(let i1 = 0; i1 < this.subjective3DC.length; i1++){
			let Lin1 = new RefLine(this.subjective3DC[i1], this.origin);
			DFS.depthdraw(Lin1);
			
			}
		}
	 
	 print(){ printoneline("this sphere is:<br>");
		 dr(this.origin).print();
		 this.points[0].print();
		 this.points[1].print();
		 this.points[2].print();
		 this.points[3].print();
		 
	 }
	 
	//Since the commencement of learning about Spherical Geometry, going from 3D to 4D has yeilded a spheroid of infinite spheres at different origins. To actually accomplish this, a line was used. Two points met at a central point. A perpendicular to the center spills over the 1D stream of the line, spawning the three dimensionality, as different radiusi, of different spheres,on which these two points may sit, coherently. 
	//Three points, is similar to two points, but the three points must be the three points of any base of any tetrahedron. The center of the equilateral triangle is used, and the plane vector is placed upon the center to describe the normal line to the triangle at the center. From any point on this line, including the center, a sphere can be created, since 3 spherical coordinates with the same R value can be found. [hyp01]
	//In the above described methods, it is the 3 points which dictate how the machine will act. This yeilds infinite possibilities of new spheres, as one side of the normal line is traversed to produce new origins. We can then say that this side of the triangle's normal represents the center of the planet Earth. However given three points of the tetrahedron. There is one sphere of interest, and that is the sphere where the origin of the sphere is the center of the tetrahedron. 
	
//	If you wanted to do this with two points, the minimum capabilities and functions needed are: The Line's center be used with the line's perpendicularPlanarEquation, to find a line that is perpendicular to the line. 
// This must be testably true. 
// A new sphere's origin is found when the perpendicular line is traversed, from the center, to find the distance to the two lines, which should be the same distance for both. this also must be testably true.  This distance is the R of the sphere which holds these two points. 
	
	setSphereByThreeTetrahedralPointsAsOnSurfaceOfSphereAtZDistanceFromSphere(a,b,c,d){
	}
	
	setSphereByGivenThreeTetrahedralPointsAsASphereAtGivenOrigin(a,b,c,d){
		
		
	}
	
	
	
	
}