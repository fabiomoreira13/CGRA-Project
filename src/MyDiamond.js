/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		
	}
	initBuffers() {
		this.vertices = [
			-1, -1, 0,	//0
			-1, 1, 0,	//1
			1, 1, 0,	//2
			1, -1, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 2,
			2, 1, 0,
			0, 1, 2,
			2, 3, 0

		];

		//Facing Z positive. Might have to alter it so that its double-sided 
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

