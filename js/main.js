var fs = require('fs');
var swig  = require('swig');
var constants = require('projectFiles/constants');
var editorDaemon = require('projectFiles/EditorDaemon');

function open(path, document) {
		fs.readFile(path, 'utf-8', function (error, contents) {
			var editor = createNewEditor(path,
						contents,
						constants.editor_default_width, 
						constants.editor_default_height, 
						constants.editor_default_header_height);
		});
	}

function save(path, document) {
	var editor = ace.edit("editor");
	var text = editor.getValue;
	//var text = document.getElementById('editor').value;
	fs.writeFile(path, text);
}

function createNewEditor(name, text, width, height, header_height) {
	var editor_canvas = document.getElementById("editor_canvas");
	editor_canvas.innerHTML +=  swig.renderFile('swig/swig_editor.html', {
		editor_name: name,
		editor_text: text,
		width: width,
		height: height,
		header_height: header_height
	});
	var editors = editor_canvas.getElementsByClassName("draggable");
	var curEditor = editors[editors.length-1];
	curEditor.setAttribute("editor", editors.length-1);

	var editor = ace.edit(editors[editors.length-1].getElementsByClassName("editor")[0]);
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");
	editors[editors.length-1].setAttribute("editor", editors.length-1);
	editorDaemon.editors[editorDaemon.editors.length] = editor;
	editorDaemon.elements[editorDaemon.editors.length] = curEditor;
	return curEditor;
}

//----------------------------     keyboard shortcuts     ----------------------------//
document.addEventListener('keydown', function (e) {
	if (e.keyCode == 'O'.charCodeAt(0) && e.ctrlKey) {
		clickInput('open');
	} else if (e.keyCode == 'S'.charCodeAt(0) && e.ctrlKey) {
		clickInput('save');
	} else if (e.keyCode == 'N'.charCodeAt(0) && e.ctrlKey) {
		createNewEditor(constants.editor_default_header_name,
						constants.editor_default_editor,
						constants.editor_default_width, 
						constants.editor_default_height, 
						constants.editor_default_header_height);
	} else if (e.keyCode == 'N'.charCodeAt(0) && e.ctrlKey && e.shiftKey) {
		gui.Window.open('index.html');
	}
});

function clickInput(id) {
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click');
	document.getElementById(id).dispatchEvent(event);
}

document.getElementById('open').addEventListener('change', function (e) {
	open(this.value, document);
	this.value = null;
});
document.getElementById('save').addEventListener('change', function (e) {
	save(this.value, document);
	this.value = null;
});