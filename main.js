music="";
status="";
objects=[];

function preload() {
  music= loadSound("alarm_alarm.mp3");
}

function setup() {
  canvas=createCanvas(380,380);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  objectDetector=ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("status").innerHTML="Detecting Objects";
}

function draw() {
      image(video,0,0,380,380)
  
  if (status != "") {
      r= random(255);
      g= random(255);
      b= random(255);
      objectDetector.detect(video,gotResult);
      for(i=0; i < objects.length; i++) {
      document.getElementById("status").innerHTML="Status = Objects Detected";
      fill(r,g,b);
      percent=floor(objects[i].confidence*100);
      text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y+25);
      noFill()
      stroke(r,g,b);
      rect(objects[i].x-100 ,objects[i].y + 25 , objects[i].width,objects[i].height);
    
     

  

  if (objects[i].label == "person") {
    document.getElementById("number").innerHTML="Baby Found";
    music.stop()
  }
  else {
    document.getElementById("number").innerHTML="Baby Not Found";
    music.play();
  }
}
  if (objects.length==0) {
    document.getElementById("number").innerHTML="Baby Not Found";
    music.play();
  }

}
}
function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
}

function gotResult(error,results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects= results;
  }
}