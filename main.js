Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpg',
    jpg_quality: 90,
    dest_width: 360,
    dest_height: 250
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src=" + data_uri + ">";
    });
}
console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cDoktnPTR/model.json', modelLoaded);
function modelLoaded(){
    console.log("model Loaded");
}
function speak(){
    var synth =  window.speechSynthesis;
    speak_data = "prediction is " + prediction;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    utterthis.rate = 0.5;
    synth.speak(uttterthis);
}

function identify_image(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log("error");
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "best"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML =  "&#9996;";
        }
    }
}