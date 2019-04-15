

let constraintObj = {

  audio: {
      autoGainControl: false,
      sampleSize: 16
  },

  video: {

      facingMode: "user",

      //width: { min: 640, ideal: 1280, max: 1920 },

      //height: { min: 480, ideal: 720, max: 1080 }
      aspectRatio: { exact: 1 }

  }
};

const validFormat = () =>{
  const types = [
    "video/webm", 
    "audio/webm", 
    "video/webm\;codecs=vp8", 
    "video/webm\;codecs=daala", 
    "video/webm\;codecs=h264", 
    "audio/webm\;codecs=opus", 
    "video/mpeg",
    "video/x-msvideo",
    "video/ogg",
    "video/3gpp",
    "video/3gpp2",
    "video/x-flv",
    "video/mp4",
    "application/x-mpegURL",
    "video/MP2T",
    "video/3gpp",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv"
  ];

  for (var i in types) { 
    if(MediaRecorder.isTypeSupported(types[i])){console.log(types[i])}    
  }
}

navigator.mediaDevices.enumerateDevices()
.then(devices => {
    devices.forEach(device => {
        console.log(device.kind.toUpperCase(), device.label);
    })
    navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function (mediaStreamObj) {
      let video = document.querySelector("#videoElement");  
      video.srcObject = mediaStreamObj;
      validFormat()      
      let mediaRecorder = new MediaRecorder(mediaStreamObj,{mimeType:'video/webm'})

      let record = document.getElementById('record');

      record.onclick = function() {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
      }

      
      let stop = document.getElementById('stop');
  
      stop.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
      }
      
      mediaRecorder.ondataavailable = function(e) {
        console.log("listo el video")
        up(e.data)
      }

    })

    .catch(function (err) {
      console.log('trabajando el error')
      console.log(err.name, err.message);
    });

})
.catch(err => {
    console.log(err.name, err.message);
})

function up(video) {
  var start = Date.now();
  var xhr = new XMLHttpRequest();
  var dropboxToken = "Reo36udbf2AAAAAAAAAADIG1GIeCbVN2fYfi77swNpixjwpz3ceEXB2q4L_56kfb";
  var file = video;

  xhr.upload.onprogress = function (evt) {
      var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
      //$("#tPorcentaje").empty();
      //$("#tPorcentaje").append(percentComplete);
      // Upload in progress. Do something here with the percent complete.
  };


  xhr.upload.onabort = function (evt) {
    console.log("Error subiendo video abort")
  };


  xhr.upload.onerror = function (evt) {
    console.log("Error subiendo video")
  };
  
  xhr.upload.ontimeout = function (evt) {
    console.log("Timeout para subir video")
  };

  xhr.onload = function () {
      if (xhr.status === 200) {
          var fileInfo = JSON.parse(xhr.response);          
          console.log("cargado");
          console.log(fileInfo)
          var end = Date.now();
          console.log(end - start + ' ms');
          var linkVideo = '/videos/Bog/testJuan.webm'
          // Upload succeeded. Do something here with the file info.
          
      }
      else {
          var errorMessage = xhr.response || 'Unable to upload file';
          console.log("no cargado");
      }
  };

  xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
  xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
  xhr.setRequestHeader('Content-Type', 'application/octet-stream');
  xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
      path: '/videos/Bog/testJuan.webm',
      mode: 'overwrite',
      autorename: true,
      mute: false
  }));

  xhr.send(file);

}