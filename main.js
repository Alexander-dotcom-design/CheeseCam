
let speech = window.webkitSpeechRecognition;
let recognition = new speech();

let textBox = document.getElementById("textBox");

let takingSelfie = false;
let isTalking = false;


function start()
{
    textBox.value = "";

    takingSelfie = false;
    isTalking = false;

    recognition.start();
}
recognition.onresult = function(event)
{
    console.log(event);

    let voice = event.results[0][0].transcript.toLowerCase().trim();

    textBox.value = voice;

    console.log("Heard:", voice);


    if (voice === "cheese" && !isTalking)
    {
        takingSelfie = true;
        isTalking = true;

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


    setTimeout(function()
    {
        take_selfie();

    }, 5000);
}


function take_selfie()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("img1").innerHTML =
            '<img id="selfie_image" src="' + data_uri + '" />';


        let shutter = new Audio("shutter.mp3");
        shutter.play();


        photo_save();


        takingSelfie = false;
        isTalking = false;


        setTimeout(function()
        {
            recognition.start();
        }, 500);
    });
}


function photo_save()
{
    let image = document.getElementById("selfie_image").src;

    let link = document.createElement("a");

    link.href = image;
    link.download = "selfie.jpg";

    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}