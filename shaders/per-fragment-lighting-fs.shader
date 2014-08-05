 precision mediump float;

varying vec3 vTransformedNormal;
varying vec4 vPosition;
varying vec2 vTextureCoord;

uniform float uMaterialShininess;

uniform vec3 uLightAmbient;

uniform vec3 uLightPosition;
uniform vec3 uLightSpecular;
uniform vec3 uLightDiffuse;
uniform vec3 uMaterialDiffuse;   //object diffuse property
uniform sampler2D uSampler;
uniform float uAlpha;
//blended element is drawn without lightning so it's always really bright
uniform bool uUseLighting;
uniform bool uDrawColors;
uniform vec3 uDrawColor;


void main(void) {
    vec3 lightWeighting;

    vec3 lightDirection = normalize(uLightPosition - vPosition.xyz);
    vec3 normal = normalize(vTransformedNormal);

    float specularLightWeighting = 0.0;

    vec3 eyeDirection = normalize(-vPosition.xyz);
    vec3 reflectionDirection = reflect(-lightDirection, normal);

    specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);

    float diffuseLightWeighting = max(dot(normal, lightDirection), 0.0);
    if(uUseLighting)
        lightWeighting = uLightAmbient + uLightSpecular * specularLightWeighting + uLightDiffuse * uMaterialDiffuse * diffuseLightWeighting;
    else
        lightWeighting = lightWeighting = vec3(1.0, 1.0, 1.0);;


    if(uDrawColors)
    {
        gl_FragColor = vec4(uDrawColor[0], uDrawColor[1], uDrawColor[2], 1.0);

    }
    else
    {
        //vec4 fragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 fragmentColor = vec4(1.0, 0.0, 1.0, 1.0);
        gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, fragmentColor.a * uAlpha);
    }

}


