(function() {
  var Drop = window.Drop =function() {
    var droppedFiles = [];
    var options      = {};

    var defaultOptions = {
      preview: {},
      resize:  {}
    };

    var zone;

    var watch = function(zone, opts) {
      e = document.getElementById(zone);

      if(e == null) {
        return
      }

      options = extend(defaultOptions, opts);

      if (e.tagName == 'INPUT') {
        e.addEventListener('change', handleFiles, false);
      } else {
        e.addEventListener('dragenter', stopDefaults, false);
        e.addEventListener('dragover', stopDefaults, false);
        e.addEventListener('drop', handleDrop, false);
      }
    }

    function stopDefaults(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function handleDrop(e) {
      stopDefaults(e);

      var data  = e.dataTransfer;
      var files = data.files;

      handleFiles(files);
    }

    function handleFiles(files) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if( !isImage(file) ) {
          continue;
        }

        droppedFiles.push(file);
        var reader = new FileReader();

        reader.onloadend = function(e) {
          var dataURL = e.target.result;

          var i  = new Image();
          i.src  = dataURL;
          i.file = file;

          i.addEventListener('load', function() {
            processImage(i);
          });
        }

        reader.readAsDataURL(file);
      }
    }

    function isImage(file) {
      return file.type.match(/image.*/)
    }

    // Place holder for when resizing is brought in.
    function processImage(image) {
      previewCallback(image.src);
    }

    function previewCallback(image) {
      if(typeof options.preview.callback == 'function') {
        options.preview.callback(image);
      }
    }

    function extend(){
      for(var i = 1; i < arguments.length; i++) {

        for(var key in arguments[i]) {
          if(arguments[i].hasOwnProperty(key))
            arguments[0][key] = arguments[i][key];
        }

      }

      return arguments[0];
    }

    return {
      files: droppedFiles,
      options: options,
      watch: watch,
      zone: zone
    }
  }
})();

