const sad = ["Listen to uplifting music: Put on your favorite upbeat songs or a playlist that makes you feel good. Music has the power to instantly change your mood and lift your spirits.", "Dance it out: Move your body and dance to the rhythm of the music. Dancing releases endorphins and helps release any tension or negative energy you may be holding onto.", "Watch a funny video: Search for funny videos or clips online that make you laugh. Whether it's a comedy sketch, a funny animal video, or a stand-up comedy routine, laughter can quickly improve your mood.", "Engage in deep breathing exercises: Take a few minutes to focus on your breath. Practice deep breathing by inhaling slowly through your nose, holding for a few seconds, and exhaling through your mouth. Deep breathing can help calm your mind and promote relaxation.", "Engage in positive affirmations: Repeat positive affirmations to yourself, such as 'I am strong,' 'I am capable,' or ' deserve happiness.' Affirmations can help shift your mindset and boost your self-confidence."]

const fear = ["Deep Breathing and Meditation: Engaging in deep breathing exercises and meditation can help calm your mind, reduce anxiety, and promote a sense of relaxation. Find a quiet space, sit comfortably, and focus on your breath. Inhale deeply through your nose, hold for a few seconds, and exhale slowly through your mouth. Repeat this process while clearing your mind and letting go of fearful thoughts.", "Physical Exercise: Engaging in physical activity releases endorphins, which are natural mood-boosting chemicals in the brain. Whether it's going for a brisk walk, jogging, dancing, or practicing yoga, moving your body can help alleviate fear and elevate your mood. Choose an exercise that you enjoy and make it a regular part of your routine.", "Listening to Uplifting Music: Music has a powerful impact on our emotions. Create a playlist of songs that uplift your spirits and make you feel positive. Upbeat tunes, inspiring lyrics, or your favorite tracks can help shift your focus away from fear and bring about a more joyful state of mind. Allow the music to energize and uplift you.", "Engaging in Creative Activities: Channel your energy into creative outlets such as painting, writing, playing a musical instrument, or any other artistic expression that resonates with you. Creativity can be a therapeutic way to express emotions, reduce stress, and shift your focus away from fear. Embrace the process of creating something unique and let your imagination run wild.", "Connecting with Loved Ones: Social support is crucial for emotional well-being. Reach out to friends or family members who bring you comfort and joy. Share your feelings with them, have a meaningful conversation, or engage in activities together. Surrounding yourself with loved ones who understand and support you can help alleviate fear and bring a sense of normalcy and happiness to your life."]

const angry = ["Take a Break and Practice Mindfulness: When anger strikes, it can be helpful to step away from the situation that triggered it. Find a quiet space where you can be alone for a few moments. Practice mindfulness by focusing on your breath and observing your thoughts and emotions without judgment. This can help bring you back to the present moment and promote a sense of calm.", "Engage in Physical Activity: Channeling your anger into physical activity can be a productive way to release pent-up energy and frustration. Consider going for a run, hitting the gym, practicing martial arts, or engaging in any form of exercise that suits your preferences. Physical activity releases endorphins, which can boost your mood and help dissipate anger.", "Write in a Journal: Writing down your thoughts and feelings can be a cathartic and self-reflective process. Grab a pen and paper or use a digital journaling app to express your anger. Allow yourself to vent and explore the root causes of your anger. As you write, you may gain insights into your emotions and find ways to let go of the anger, leading to a more normal or positive state of mind.", "Practice Progressive Muscle Relaxation: Progressive Muscle Relaxation (PMR) is a technique that involves tensing and relaxing different muscle groups to release tension and promote relaxation. Start by tensing a specific muscle group, such as your fists, and then release the tension while focusing on the sensation of relaxation. Move through each muscle group in your body, releasing anger and promoting a sense of calmness.", "Engage in a Hobby or Creative Outlet: Immersing yourself in a hobby or creative activity that you enjoy can help distract you from anger and shift your focus towards something positive. Whether it's painting, gardening, playing a musical instrument, cooking, or any other activity that brings you joy, allowing yourself to engage in activities you love can help alleviate anger and bring about a happier mood."]

const video = document.getElementById('video')



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

startVideo();

let exp;
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

    exp = detections[0].expressions;


  }, 100)
})


let session = localStorage.getItem('session');
const users = JSON.parse(localStorage.getItem("users"))

let currentUser;

if (session) {
  console.log(session)
  users.map((e) => {
    if (session == e.uemail) {
      currentUser = e;
    }
  })
} else {
  alert("Please login again")
}

console.log(currentUser.ucoins)

document.getElementById("coin").innerHTML = currentUser.ucoins;


let sc = document.getElementById("sc");



const conv = (val) => {
  return (val * 10);
}


const getthe = () => {

  document.getElementById("msg1").innerHTML = ""
  document.getElementById("msg2").innerHTML = ""
  document.getElementById("msg3").innerHTML = ""
  console.log(exp)

  if (exp.happy > exp.sad && exp.happy > exp.neutral && exp.happy > exp.angry) {
    let s = parseInt(currentUser.ucoins);
    const users = JSON.parse(localStorage.getItem("users"))
    console.log("hwllo")

    let upCoin;

    users.map((e) => {
      if (session == e.uemail) {
        e.ucoins = e.ucoins + 10
        upCoin = e.ucoins;
      }
    })

    document.getElementById("coin").innerHTML = upCoin;

    localStorage.setItem("users", JSON.stringify(users))

    console.log(users)


    document.getElementById("msg1").innerHTML = "Hey! You are Happy now. Keep that smile throughtout the day. As promice we have added 10 coins for your happiness."
  }




  if (exp.sad > exp.happy && exp.sad > exp.neutral && exp.sad > exp.angry) {
    var randomNumber = Math.floor(Math.random() * 5);

    let atvt1 = sad[randomNumber];

    var randomNumber = Math.floor(Math.random() * 5);

    let atvt2 = sad[randomNumber]

    document.getElementById("msg1").innerHTML = "Hey, What happened you are looking sad please do one of following activity ";
    document.getElementById("msg2").innerHTML = atvt1;
    document.getElementById("msg3").innerHTML = atvt2;
  }

  if (exp.angry > exp.sad && exp.angry > exp.neutral && exp.angry > exp.happy) {
    var randomNumber = Math.floor(Math.random() * 5);

    let atvt1 = angry[randomNumber];

    var randomNumber = Math.floor(Math.random() * 5);

    let atvt2 = angry[randomNumber]

    document.getElementById("msg1").innerHTML = "Hey, What happened you are looking angry please do one of following activity ";
    document.getElementById("msg2").innerHTML = atvt1;
    document.getElementById("msg3").innerHTML = atvt2;
  }

  if (exp.neutral > exp.sad && exp.neutral > exp.sad && exp.neutral > exp.happy && exp.neutral > exp.angry) {
    var randomNumber = Math.floor(Math.random() * 5);

    let atvt1 = angry[randomNumber];

    var randomNumber = Math.floor(Math.random() * 5);

    let atvt2 = angry[randomNumber]

    document.getElementById("msg1").innerHTML = "Hey, you seem like neutral. Please try me make happy yourself";

  }


  // document.getElementById("score").innerHTML = localStorage.getItem("score");





  var xValues = ["Happy", "Sad", "Angry", "Neutral", "Fearful", "Suprised"];
  var yValues = [conv(exp.happy), conv(exp.sad), conv(exp.angry), conv(exp.neutral), conv(exp.fearful), conv(exp.suprised)];
  var barColors = ["green", "black", "red", "orange", "brown", "blue"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Your Happiness"
      }
    }
  });



}







