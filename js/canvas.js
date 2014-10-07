var constants = require('projectFiles/constants')
var editorDaemon = require('projectFiles/EditorDaemon');

interact('.header')
.draggable({
    onmove: function (event) {
        var target = event.target.parentNode,
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        var target = target
        target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
})
.snap({
    mode: 'grid',
    grid: { x: constants.canvas_snap_x, y: constants.canvas_snap_y },
    range: Infinity,
    elementOrigin: { x: 0, y: 0 }
});

interact('.draggable')
  .resizable(true)
  .on('resizemove', function (event) {
    var target = event.target;

    // add the change in coords to the previous width of the target element
    var
      newWidth  = parseFloat(target.style.width ) + event.dx,
      newHeight = parseFloat(target.style.height) + event.dy;

    // update the element's style
    target.style.width  = newWidth + 'px';
    target.style.height = newHeight + 'px';

    target.getElementsByClassName("header")[0].style.width  = newWidth  + 'px';
    target.getElementsByClassName("editor")[0].style.width  = newWidth  + 'px';
    target.getElementsByClassName("editor")[0].style.height = newHeight - parseInt(target.getElementsByClassName("header")[0].style.height) + 'px';
    editorDaemon[event.target.getAttribute('editor')].resize()
  });