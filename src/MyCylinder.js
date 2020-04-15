class MyCylinder extends CGFobject {

    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - Number of slices
     */
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    /**
     * Initalize the vertices, indices, normals and texture coordinates
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.angleVariation = 2 * Math.PI / this.slices;
        this.initSideBuffers();
       

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }

    /**
     *  Initialize the buffer for the sides
     */
    initSideBuffers() {
        let angle = 0;
        let textureCoord = 0;
        let textureVariation = 1 / this.slices;
        
        //If 5 slices, 360/5 = 72 degrees variation for each vertice
        //this.angleVariation = 2 * Math.PI / this.slices;
        
        this.vertices.push(Math.cos(angle), 0, -Math.sin(angle));
        this.texCoords.push(textureCoord, 1);

        this.vertices.push(Math.cos(angle), 1, -Math.sin(angle));
        this.texCoords.push(textureCoord, 0);
    

        this.normals.push(  Math.cos(angle), 0, -Math.sin(angle),
                            Math.cos(angle), 0, -Math.sin(angle));
        

        

        angle += this.angleVariation;
        textureCoord += textureVariation;

        
        for (var i = 0; i < this.slices; i++) {
            // makes an edge
            this.vertices.push(Math.cos(angle), 0, -Math.sin(angle));
            this.texCoords.push(textureCoord, 1);

            this.vertices.push(Math.cos(angle), 1, -Math.sin(angle));
            this.texCoords.push(textureCoord, 0);
    

            // makes the face immediately before the edge
            this.indices.push(  2 * i, 2 * i + 2, 2 * i + 3,
                                2 * i + 3, 2 * i + 1, 2 * i);


            // makes the normals for both of the vertices of the current edge                    
            this.normals.push(  Math.cos(angle), 0, -Math.sin(angle),
                                Math.cos(angle), 0, -Math.sin(angle));

           
                            
            angle += this.angleVariation;
            textureCoord += textureVariation;
        }
      
    }

    //Vertices list FOR A PENTAGON BASE
    /*
    i = 0
    bottom vertice                                  0
    top vertice vertically above the previous one   1

    i= 1
    bottom vertice                                  2
    top vertice vertically above the previous one   3

    i=2
    bottom vertice                                  4
    top vertice vertically above the previous one   5

    i=3
    bottom vertice                                  6
    top vertice vertically above the previous one   7

    i=4
    bottom vertice                                  8
    top vertice vertically above the previous one   9





    */
    

  
    
}