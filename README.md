# Drop

Drop is a javascript library that makes it easy to accept drag and drop
images on your site. After the images are Dropped they will be available
to be resized, previewed on the page, and/or added to a form for upload.

## API


```javascript
zone = new Drop;

options = {
  // Every time an image is dropped the callback will be called with the 
  // post-processed image data uri to be put right into an image tag and
  // rendered in the browser.
  preview: { callback: previewCallback }
}

// Starts listening for dropped images in #dropzone.
// If a file input is passed in Drop will watch that as well.
zone.watch("#dropzone", options)

// Files can be accessed at anytime. This returns an Array of File objects
// which can be attached to a form and uploaded.
zone.files
```
