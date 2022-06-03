import React from "react";
import * as BABYLON from "babylonjs";
import 'babylonjs-loaders';
import SceneComponent from "../SceneComponent"; // uses above component in same directory
//import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "../index.css";
//import countryTexture from './country.env';
import axios from 'axios';


const onSceneReady = (scene) => {

  scene.createDefaultCameraOrLight(true,true,true);
  const canvas = scene.getEngine().getRenderingCanvas();
  const camera = scene.activeCamera;
  BABYLON.SceneLoader.ShowLoadingScreen = false

  
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  var button = document.getElementById("import-btn");
  var textureButton = document.getElementById("texture-import-btn");
  var meshArray = [];
  var meshesCameraLimits = [];
  var length = 0;
  var textureLength = [];
  var totalTexture = 0;
  var selectedModel = 0;

  button.onchange = (evt) => {
    var files = evt.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    length = scene.meshes.length;
    totalTexture = scene.textures.length;
    reader.onload = function(e) { 
        BABYLON.SceneLoader.Append("", reader.result, scene, function (scene) {          
            if(scene.activeCamera.alpha < 0)
                scene.activeCamera.alpha *= -1;
            var maxY = 0;
            var limit = scene.activeCamera.lowerRadiusLimit;
            for (var i = length; i < scene.meshes.length; i++) {
                if (maxY < scene.meshes[i].position.y)
                    maxY = scene.meshes[i].position.y;
            }
            if (maxY == 0)
                maxY = 0.1;
            meshesCameraLimits.push(maxY);
            console.log(scene.activeCamera);
            scene.activeCamera.wheelPrecision = (maxY > 1 ? 10/maxY : 100);
            scene.activeCamera.lowerRadiusLimit = maxY * 5;
            scene.activeCamera.radius = maxY * 8;
            scene.activeCamera.upperRadiusLimit = maxY * 25;
            //var hdrTexture = new BABYLON.CubeTexture(countryTexture, scene);
            //var sphere = BABYLON.Mesh.CreateSphere("sphere1", maxY*30, maxY*10, scene);
            //var sphereMtl = new BABYLON.PBRMaterial("sphereMtl", scene);
            //sphereMtl.reflectionTexture = hdrTexture;
            //sphere.material= sphereMtl;
            for (i=0;i<meshArray.length;i++)
                meshArray[i].setEnabled(false);
            textureLength.push(scene.textures.length - totalTexture);
            meshArray.push(scene.meshes[length]);
            const obj = {
              model_name: scene.meshes[length].name,
              model_textures_length: String(scene.textures.length - totalTexture)
            }
            axios.post('http://localhost:4000/models/add',obj)
            .then(res => console.log(res.data))
            .catch(function (error) {
                console.log(error);
            })
            if(meshArray.length - 2 >= 0)
              document.getElementById("texture-select-" + String(meshArray.length - 2)).style.display = "none";
            //camera.setTarget(scene.meshes[length]);
            var textureSelect = document.getElementById("texture-select-" + String(meshArray.length - 1));
              if (!textureSelect){
                var textureSelect = document.createElement("select");
                textureSelect.id = "texture-select-" + String(meshArray.length - 1);
                textureSelect.style.color = "white"; 
                textureSelect.className = "rounded-lg bg-gray-600 outline-none cursor-pointer px-2 text-center";
                
                document.getElementById("select-part").appendChild(textureSelect);
                for (i=0;i<textureLength[meshArray.length - 1];i++){
                  var textureOption = document.getElementById("texture-option-" + String(meshArray.length - 1) + "-" + String(i));
                  if (!textureOption){
                      textureOption = document.createElement("option");
                      textureOption.className = "text-white";
                      textureOption.id = "texture-option-" + String(meshArray.length - 1) + "-" + String(i);
                      console.log(scene.textures[scene.textures.length - textureLength[meshArray.length - 1] + i].name);
                      textureOption.value = String(scene.textures.length - textureLength[meshArray.length - 1] + i);
                      textureOption.text = scene.textures[scene.textures.length - textureLength[meshArray.length - 1] + i].name;
                      textureSelect.appendChild(textureOption);
                  }
                }
              }
        });

    };


            var newModelButton = document.createElement("button")
            newModelButton.id = "model-" + String(meshArray.length);    
            newModelButton.innerText = "Model " + String(meshArray.length);
            newModelButton.value = String(meshArray.length);
            newModelButton.className = "px-4 py-2 bg-gray-600 shadow-3xl rounded-full hover:bg-gray-500 text-white font-semibold";
            document.getElementById("model-button-part").appendChild(newModelButton);
            selectedModel = meshArray.length;
            newModelButton.onclick = (e) => {
                selectedModel = e.target.value;
                for(var i=0;i<meshArray.length;i++){
                    var select = document.getElementById("texture-select-" + i);
                    if(i != parseInt(e.target.value)){
                        meshArray[i].setEnabled(false);
                        select.style.display = "none";

                    }
                    else{
                        //camera.setTarget(meshArray[i]);
                        meshArray[i].setEnabled(true);
                        select.style.display = "block";
                        var limit = meshesCameraLimits[e.target.value];
                        console.log(limit);
                        scene.activeCamera.wheelPrecision = (limit > 1 ? 10/limit : 100);
                        scene.activeCamera.lowerRadiusLimit = limit * 5;
                        scene.activeCamera.radius = limit * 8;
                        scene.activeCamera.upperRadiusLimit = limit * 25;
                            
                    }
                }
                
                }
    
    
    
        
}

textureButton.onchange = (evt) => {
  var files = evt.target.files;
  var reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = function(e) { 
      var select = document.getElementById('texture-select-' + selectedModel);
      var value = select.options[select.selectedIndex].value;
      console.log(scene.textures[value]);
      scene.textures[value].updateURL(reader.result);
  }
}

var selected = null;
    scene.onPointerObservable.add(function(evt){
        if(selected) {
            //selected.material.diffuseColor = BABYLON.Color3.Gray();
            selected = null;
        }
        if(evt.pickInfo.hit && evt.pickInfo.pickedMesh && evt.event.button === 0){
            selected = evt.pickInfo.pickedMesh.material;
            var colorPicker = document.getElementById("color-picker");
                    colorPicker.oninput = (e) => {
                        if (selected.diffuseColor)
                            selected.diffuseColor = new BABYLON.Color3.FromHexString(e.target.value);
                        else
                            selected.albedoColor = new BABYLON.Color3.FromHexString(e.target.value);
                    }
            
        }
    }, BABYLON.PointerEventTypes.POINTERUP);


};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {

};

export default Scene => (

    
    
    <div className="h-full w-full flex items-center justify-center">
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" className="w-2/3 h-4/5">
      </SceneComponent>
    </div>

   
);

