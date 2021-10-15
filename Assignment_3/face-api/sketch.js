// This sketch demonstrates the Face API Face Recognition model with susie's face as an input
// Run this on your local server!

const MODEL_URL = './weights/';
let vid;
let expression;
let div;
let agegenderlandmark;
const labels = ['susie']
let susietensor
let results
let webcamFaceDescriptions
let labeledFaceDescriptors
const maxDescriptorDistance = 0.6
let faceMatcher

function preload() {

  const im = new Image()
  im.src = 'susie.png'
  im.onload = () => {
      susietensor = tf.browser.fromPixels(im)
      //susietensor.print()
      //console.log(a.shape)
  }

}

function setup() {

    div = createDiv('<br> please wait while face-api models are loading...');

    createCanvas(640, 480)

    vid = createCapture(VIDEO, async () => {
            await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
            await faceapi.loadFaceLandmarkModel(MODEL_URL)
            await faceapi.loadFaceRecognitionModel(MODEL_URL)
            div.elt.innerHTML = '<br>model loaded!'
            labelInputFaces()
    })
    vid.size(640, 480);

    // display the test image on the p5 canvas. this does not load it into the model!
    susie_img = loadImage('./susie.png')
}


async function labelInputFaces() {
    labeledFaceDescriptors = await Promise.all(
      labels.map(async label => {

        const inputFaceDescription = await faceapi.detectSingleFace(susietensor).withFaceLandmarks().withFaceDescriptor()
        //console.log(inputFaceDescription)

        if (!inputFaceDescription) {
          throw new Error(`no faces detected for ${label}`)
        }

        const faceDescriptors = [inputFaceDescription.descriptor]
        return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
      })
  )

  webcamFaceDescriptions = await faceapi.detectAllFaces(vid.elt).withFaceLandmarks().withFaceDescriptors()
  //console.log(webcamFaceDescriptions);
  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)
  results = webcamFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))
 // console.log(webcamFaceDescriptions.length);
  labelInputFaces()
}




function draw() {
    image(vid, 0, 0);

    vid.hide()

    image(susie_img, 100,100)

    // drawing results of face recognition
    if (results) {
      if (results.length > 0) {
        faceMatch = results[0].distance
        fill(255)
        textSize(24)
        text(faceMatch, 100, 50)
      }

    }
}
