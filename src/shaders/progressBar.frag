#ifdef GL_ES
precision highp float;
#endif


varying vec4 coords;
varying vec4 normal;
vec4 red = vec4(1.0,0.1,0.1,1.0); //red
vec4 yellow = vec4(0.5,0.5,0.1,1.0);
vec4 green = vec4(0.1, 1.0, 0.1, 1.0);
vec4 grey = vec4(0.5,0.5,0.5,1.0);

//uniform int percentage = 1;
uniform float offset;

/*
    var diffRed = endColor.red - startColor.red;
    var diffGreen = endColor.green - startColor.green;
    var diffBlue = endColor.blue - startColor.blue;

    diffRed = (diffRed * percentFade) + startColor.red;
    diffGreen = (diffGreen * percentFade) + startColor.green;
    diffBlue = (diffBlue * percentFade) + startColor.blue;

    percentFade -> if it's 0, original color. If it's 1, end color.

    in this case, percentFade = (x+0.6) / 1.2


*/

void main() {
    float factor;
    if (coords.x < offset){
        //as seen in texture3anim.frag
        //gl_FragColor.rgba = green;
        
        factor = (coords.x + 0.6) / 1.2;
        gl_FragColor.rgba = vec4((-0.9*factor)+1.0, (0.9*factor)+0.1, 0.1, 1.0);
    
    }
    else{
        gl_FragColor.rgba = grey;
    }
}