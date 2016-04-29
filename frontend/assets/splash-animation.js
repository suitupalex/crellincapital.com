(function splashAnimation() {
  'use strict'

  var currentFrame = -1
  var interval = 3000

  var frames = [
    document.querySelector('#splash-a')
  , document.querySelector('#splash-c')
  , document.querySelector('#splash-d')
  , document.querySelector('#splash-b')
  ]

  var length = frames.length

  function drawFrame() {
    currentFrame = currentFrame + 1 < length ? currentFrame + 1 : 0

    for (var i = 0; i < length; i++) {
      frames[i].style.opacity = i === currentFrame ? 1 : 0
    }

    setTimeout(drawFrame, interval)
  }

  drawFrame()
})()
