let speech = window.webkitSpeechRecognition;
let recognition = new speech();

let textBox = document.getElementById("textBox");

let takingSelfie = false;


function start()
{
    textBox.value = "";

    takingSelfie = false;

    recognition.start();
}


recognition.onresult = function(event)
{
    console.log(event);

    let voice = event.results[0][0].transcript.toLowerCase().trim();

    textBox.value = voice;

    console.log("Heard:", voice);


    if (voice === "cheese")
    {
        takingSelfie = true;

        recognition.stop();

        talk();
    }
    else
    {
        console.log("Invalid input");
    }
};


function talk()
{
    let synth = window.speechSynthesis;

    Webcam.attach("#video");


    let speak_data = "Taking selfie in 5 seconds";

    let utterthis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterthis);


    // Wait 5 seconds
    setTimeout(function()
    {
        take_selfie();

    }, 5000);
}


function take_selfie()
{
    // Play shutter sound
    let shutter = new Audio("shutter.mp3");

    shutter.play();


    // Take the picture
    Webcam.snap(function(data_uri)
    {
        document.getElementById("img1").innerHTML =
            '<img id="selfie_image" src="' + data_uri + '" />';


        photo_save();

        takingSelfie = false;
    });
}


function photo_save()
{
    let link = document.getElementById("link");

    let image = document.getElementById("selfie_image").src;

    link.href = image;

    link.download = "selfie.jpg";

    link.click();
}