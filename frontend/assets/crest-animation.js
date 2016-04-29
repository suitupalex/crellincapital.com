(function crestAnimation() {
  'use strict'

  var currentFrame = -1
  var interval = 3000

  var frames = [
    document.querySelector('#crest-a')
  , document.querySelector('#crest-b')
  , document.querySelector('#crest-c')
  , document.querySelector('#crest-d')
  ]

  var descriptionFrames = [
    document.querySelector('#crest-description-a')
  , document.querySelector('#crest-description-b')
  , document.querySelector('#crest-description-c')
  , document.querySelector('#crest-description-d')
  ]

  var length = frames.length

  function drawFrame() {
    currentFrame = currentFrame + 1 < length ? currentFrame + 1 : 0

    for (var i = 0; i < length; i++) {
      var isCurrent = i === currentFrame

      frames[i].style.opacity = isCurrent ? 1 : 0
      descriptionFrames[i].style.display = isCurrent ? 'block' : 'none'
    }

    setTimeout(drawFrame, interval)
  }

  drawFrame()
})()
