#version 300 es
precision highp float;

int lights = 2;
struct DirectionalLight{
    vec3 position[2];
    vec3 color[2];
};

in vec2 pass_TextureCoords;
in vec3 surfaceNormal;
//in vec3 diffuse;
in vec3 toCameraVector;
in vec4 worldPosition;

uniform DirectionalLight light;
uniform sampler2D textureSampler;
//uniform vec3 ambientLightIntensity;
uniform float shineDamper;
uniform float reflectivity;
uniform vec3 attenuation[2];

out vec4 fragColor;

void main()
{
    vec3 unitNormal = normalize(surfaceNormal);
    vec3 unitVectorToCamera = normalize(toCameraVector);

    vec3 totalDiffuse = vec3(0.0);
    vec3 totalSpecular = vec3(0.0);

    vec3 toLightVector[2];
    for (int i = 0; i < 2; i++){
        toLightVector[i] = light.position[i] - worldPosition.xyz;
        // attenuation
        float distance = length(toLightVector[i]);
        float attFactor = attenuation[i].x + (attenuation[i].y * distance) + (attenuation[i].z * distance * distance);

        vec3 unitLightVector = normalize(toLightVector[i]);
        float brightness = max(dot(unitNormal, unitLightVector), 0.0);
        vec3 lightDirection = -unitLightVector;

        // specular light
        vec3 reflectedLightDirection = reflect(lightDirection, unitNormal);
        float specularFactor = dot(reflectedLightDirection, unitVectorToCamera);
        specularFactor = max(specularFactor, 0.1);
        float dampedFactor = pow(specularFactor, shineDamper);
        totalSpecular = totalSpecular + dampedFactor * reflectivity * light.color[i] / attFactor;

        // diffuse light
        totalDiffuse = totalDiffuse + brightness * light.color[i] / attFactor;
    }
    totalDiffuse = max(totalDiffuse, 0.2);

    // texture
    vec4 textureColor = texture(textureSampler, pass_TextureCoords);
    // transparent
    if(textureColor.a < 0.5)
        discard;
    //gl_FragColor = vec4(textureColor.rgb * diffuse, textureColor.a);
    fragColor = vec4(totalDiffuse, 1.0) * textureColor + vec4(totalSpecular, 1.0) ;
}