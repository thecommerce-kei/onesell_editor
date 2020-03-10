# [SunEditor](http://suneditor.com)
Pure javscript based WYSIWYG web editor, with no dependencies

[![GitHub](https://img.shields.io/github/license/jihong88/suneditor.svg?style=flat-square)](https://github.com/JiHong88/SunEditor/blob/master/LICENSE.txt)
[![GitHub release](https://img.shields.io/github/release/jihong88/suneditor.svg?style=flat-square)](https://github.com/JiHong88/SunEditor/releases)
[![npm version](https://img.shields.io/npm/v/suneditor.svg?style=flat-square)](https://nodei.co/npm/suneditor/)
[![bower version](https://img.shields.io/bower/v/suneditor.svg?style=flat-square)](https://github.com/JiHong88/SunEditor/releases/latest)
[![](https://data.jsdelivr.com/v1/package/npm/suneditor/badge)](https://www.jsdelivr.com/package/npm/suneditor)
![npm](https://img.shields.io/npm/dt/suneditor.svg?style=flat-square)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/suneditor.svg?style=flat-square)

> The Suneditor is a lightweight, flexible, customizable WYSIWYG text editor for your web applications.
> - Pasting from Microsoft Word and Excel.
> - Drag&drop image uploads.
> - Custom table selection, merge and split.
> - Media embeds.
> - And.. many other features :)

![WYSIWYG HTML Editor](http://suneditor.com/docs/screen-main-w.png?v=2180)

> #### Demo site : <a href="http://suneditor.com" target="_blank">suneditor.com</a>

#### Browser Support

| <img src="http://suneditor.com/docs/chrome-64.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="http://suneditor.com/docs/mozilla-64.png" alt="Firefox" width="16px" height="16px" /> Firefox | <img src="http://suneditor.com/docs/opera-64.png" alt="Opera" width="16px" height="16px" /> Opera | <img src="http://suneditor.com/docs/safari-64.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="http://suneditor.com/docs/edge-64.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="http://suneditor.com/docs/explorer-64.png" alt="Explorer" width="16px" height="16px" /> Internet Explorer |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Yes | Yes | Yes | Yes | Yes | 11+ |

## Install
#### npm
``` sh
$ npm install --save suneditor
```
#### bower
``` sh
$ bower install --save suneditor
```
#### CDN
``` html
<link href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js"></script>
<!-- languages (Basic Language: English/en) -->
<script src="https://cdn.jsdelivr.net/npm/suneditor@latest/src/lang/ko.js"></script>
```
[jsdelivr/suneditor](https://www.jsdelivr.com/package/npm/suneditor)

[jsdelivr/suneditor-languages-list](https://www.jsdelivr.com/package/npm/suneditor?path=src%2Flang)


## Getting Started
### 1. Include
```html
<!-- <link href="../src/assets/css/suneditor.css" rel="stylesheet"> -->
<!-- <link  href="../src/assets/css/suneditor-contents.css" rel="stylesheet"> -->
<link href="../dist/css/suneditor.min.css" rel="stylesheet">
<script src="../dist/suneditor.min.js"></script>
<script src="../src/lang/ko.js"></script>
```

### 2. Target Element
```html
<textarea id="sample">Hi</textarea>
```

### 3. Create
```javascript
/**
* ID : 'suneditor_sample'
* ClassName : 'sun-eidtor'
*/
// ID or DOM object
const suneditor = SUNEDITOR.create((document.getElementById('sample') || 'sample'),{
    // All of the plugins are loaded in the "window.SUNEDITOR" object in dist/suneditor.min.js file
    // Insert options
    // Language global object (default: en)
    lang: SUNEDITOR_LANG['ko']
});
```

### 4. Contents display
```text
When you display a document created by suneditor
You need to include "src/assets/css/suneditor-contents.css" or "dist/css/suneditor.min.css" file.
Then add "sun-editor-editable" to the class name of the Tag element that displays the content.
In "suneditor-contents.css", you can define the style of all the tags created in suneditor.
```

### Use import statement

### 1. Load only what you want
```javascript
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import {font, fontSize, fontColor, horizontalRule, list, image} from 'suneditor/src/plugins'
// How to import language files (default: en)
import lang from 'suneditor/src/lang'
import {en, ko} from 'suneditor/src/lang'
import de from 'suneditor/src/lang/de'

suneditor.create('sample', {
    plugins: [
        font,
        fontSize,
        fontColor,
        horizontalRule,
        link,
        image,
    ],
    buttonList: [
        ['font', 'fontSize'],
        ['fontColor'],
        ['horizontalRule'],
        ['link', 'image']
    ],
    lang: lang['ko']
});
```

### 2. Load all plugins
```javascript
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'

suneditor.create('sample', {
    plugins: plugins,
    buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['removeFormat'],
        '/', // Line break
        ['fontColor', 'hiliteColor'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'table'],
        ['link', 'image', 'video'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print'],
        ['save', 'template']
    ]
})

// You can also load what you want
suneditor.create('sample', {
    plugins: [
        plugins.font
        plugins.fontSize,
        plugins.formatBlock
    ],
    buttonList: [
        ['font', 'fontSize', 'formatBlock']
    ]
})
```

### 3. Plugins can be used directly in the button list
```javascript
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import {align, font, fontSize, fontColor, hiliteColor, horizontalRule,
        list, table, template, formatBlock, link, image, video} from 'suneditor/src/plugins'

suneditor.create('sample', {
    buttonList: [
        ['undo', 'redo'],
        [font, fontSize, formatBlock],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['removeFormat'],
        '/', // Line break
        [fontColor, hiliteColor],
        ['outdent', 'indent'],
        [align, horizontalRule, list, table],
        [link, image, video],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print'],
        ['save', template]
    ],
})
```

### 4. Use init function
```text
The init function can be used by predefining options and calling the create function on the returned object.
The value of the option argument put in the "create" function call takes precedence
```
```javascript
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'

// all plugins
const initEditor = suneditor.init({
    plugins: plugins,
    height: 200,
    buttonList: [
        ['undo', 'redo',
        'font', 'fontSize', 'formatBlock',
        'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
        'removeFormat',
        'fontColor', 'hiliteColor',
        'outdent', 'indent',
        'align', 'horizontalRule', 'list', 'table',
        'link', 'image', 'video',
        'fullScreen', 'showBlocks', 'codeView',
        'preview', 'print', 'save', 'template']
    ]
});

initEditor.create('sample_1', {
    // The value of the option argument put in the "create" function call takes precedence
});
initEditor.create('sample_2', {
    // The value of the option argument put in the "create" function call takes precedence
    height: 'auto',
    buttonList: [
        ['undo', 'redo'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print']
    ]
});
```

### Options
```javascript
plugins: [
    font,
    fontSize,
    formatBlock,
    fontColor,
    hiliteColor,
    align,
    horizontalRule,
    list,
    table,
    template,
    link,
    image,
    video
]               : Plugins array.                                    default: null {Array}

// Layout-------------------------------------------------------------------------------------------------------
lang            : language object.   default : en {Object}
mode            : The mode of the editor ('classic', 'inline', 'balloon'). default: 'classic' {String}
toolbarWidth    : The width of the toolbar. Applies only when the editor mode is 
                  'inline' or 'balloon' mode. default: 'auto' {Number|String}
stickyToolbar   : Reference height value that should be changed to sticky toolbar mode.
                  It can also be used when there is another fixed toolbar at the top.
                  Set to 0, '0px', '50px', etc.
                  If set to -1 or false or null to turn off.        default: 0 {Number|String|Boolean}

// Display-------------------------------------------------------------------------------------------------------
display         : The display property of suneditor.                default: 'block' {String}
popupDisplay    : Size of background area when activating dialog window ('full'||'local') default: 'full' {String}

// Bottom resizing bar-------------------------------------------------------------------------------------------
resizingBar     : Show the bottom resizing bar.
                  If 'height' value is 'auto', it will not be resized. default: true {Boolean}
showPathLabel   : Displays the current node structure to resizingBar.  default: true {Boolean}
charCounter     : Shows the number of characters in the editor.     
                  If the maxCharCount option has a value, it becomes true. default: false {Boolean}
maxCharCount    : The maximum number of characters allowed to be inserted into the editor. default: null {Number}

// Width size----------------------------------------------------------------------------------------------------
width           : The width size of the editor.                     default: clientWidth||'100%' {Number|String}
minWidth        : The min-width size of the editor.
                  Used when 'width' value is 'auto' or '~%'.        default: null {Number|String}
maxWidth        : The max-width size of the editor.
                  Used when 'width' value is 'auto' or '~%'.        default: null {Number|String}

// Height size---------------------------------------------------------------------------------------------------
height          : The height size of the editor.                    default: clientHeight||'auto' {Number|String}
minHeight       : The min-height size of the editor.
                  Used when 'height' value is 'auto'.               default: null {Number|String}
maxHeight       : The max-height size of the editor.
                  Used when 'height' value is 'auto'.               default: null {Number|String}

// Defining menu items-------------------------------------------------------------------------------------------
font            : Change default font-family array.                 default: [...] {Array}
                  Default value: [
                    'Arial', 'Comic Sans MS', 'Courier New', 'Impact',
                    'Georgia','tahoma', 'Trebuchet MS', 'Verdana'
                  ]
fontSize        : Change default font-size array.                   default: [...] {Array}
                  Default value: [
                    8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
                  ]
formats         : Change default formatBlock array.                 default: [...] {Array}
                  Default value: [
                      'p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
                  ]
colorList       : Change default color array of color picker.       default: [..[..]..] {Array}
                  Default value: [
                    '#ff0000', '#ff5e00', '#ffe400', '#abf200', '#00d8ff', '#0055ff', '#6600ff', '#ff00dd', '#000000',
                    '#ffd8d8', '#fae0d4', '#faf4c0', '#e4f7ba', '#d4f4fa', '#d9e5ff', '#e8d9ff', '#ffd9fa', '#f1f1f1',
                    '#ffa7a7', '#ffc19e', '#faed7d', '#cef279', '#b2ebf4', '#b2ccff', '#d1b2ff', '#ffb2f5', '#bdbdbd',
                    '#f15f5f', '#f29661', '#e5d85c', '#bce55c', '#5cd1e5', '#6699ff', '#a366ff', '#f261df', '#8c8c8c',
                    '#980000', '#993800', '#998a00', '#6b9900', '#008299', '#003399', '#3d0099', '#990085', '#353535',
                    '#670000', '#662500', '#665c00', '#476600', '#005766', '#002266', '#290066', '#660058', '#222222'
                  ]
                  ex) [
                    ['#ccc', '#dedede', 'OrangeRed', 'Orange', 'RoyalBlue', 'SaddleBrown'], // Line break
                    ['SlateGray', 'BurlyWood', 'DeepPink', 'FireBrick', 'Gold', 'SeaGreen']
                  ]

// Image---------------------------------------------------------------------------------------------------------
imageResizing   : Can resize the image.                             default: true {Boolean}
imageWidth      : The default width size of the image frame.        default: 'auto' {Number}
imageFileInput  : Choose whether to create a file input tag in the image upload window.  default: true {Boolean}
imageUrlInput   : Choose whether to create a image url input tag in the image upload window.
                  If the value of imageFileInput is false, it will be unconditionally.   default: true {Boolean}
imageUploadHeader : Http Header when uploading images.              default: null {Object}
imageUploadUrl  : The image upload to server mapping address.       default: null {String}
                  ex) "/editor/uploadImage.ajax"
                  When not used, it enters base64 data
                  return {
                            "errorMessage": "insert error message",
                            "result": [
                                {
                                    "url": "/download/editorImg/test_image.jpg",
                                    "name": "test_image.jpg",
                                    "size": "561276"
                                }
                            ]
                        }
imageUploadSizeLimit: The size of the total uploadable images (in bytes).
                      Invokes the "onImageUploadError" method.  default: null {Number}

// Video----------------------------------------------------------------------------------------------------------
videoResizing   : Can resize the video iframe.                       default: true {Boolean}
videoWidth      : The default width size of the video frame.         default: 560 {Number}
videoHeight     : The default heigth size of the video frame.        default: 315 {Number}
youtubeQuery    : The query string of a YouTube embedded URL.        default: '' {String}
                  It takes precedence over the value user entered.
                  ex) 'autoplay=1&mute=1&enablejsapi=1&controls=0&rel=0&modestbranding=1'
                    // https://developers.google.com/youtube/player_parameters

// Defining save button-------------------------------------------------------------------------------------------
callBackSave    : Callback functions that is called when the Save button is clicked. 
                  Arguments - (contents).                            default: userFunction.save {Function}

// Templates Array------------------------------------------------------------------------------------------------
templates       : If you use a template plugin, add it.
                  Defines a list of templates.                       default: null {Array} 
                  ex) [
                    {
                        name: 'Template-1',
                        html: '<p>HTML source1</p>'
                    },
                    {
                        name: 'Template-2',
                        html: '<p>HTML source2</p>'
                    }
                  ]

// Buttons--------------------------------------------------------------------------------------------------------
buttonList      : Defines button list to array {Array}
                  default: [
                    ['undo', 'redo'],
                    // ['font', 'fontSize', 'formatBlock'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['removeFormat'],
                    // '/', Line break
                    // ['fontColor', 'hiliteColor'],
                    ['outdent', 'indent'],
                    // ['align', 'horizontalRule', 'list', 'table'],
                    // ['link', 'image', 'video'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print'],
                    // ['save', 'template'],
                  ]
```

### Functions
```javascript
import suneditor from 'suneditor'

const editor = suneditor.create('example');

// Add or reset option property
editor.setOptions({
    minHeight: '300px',
    buttonList: [
        ['fontColor', 'hiliteColor']
    ],
    colorList: [
        ['#ccc', '#dedede', 'OrangeRed', 'Orange', 'RoyalBlue', 'SaddleBrown']
    ]
});

// Open a notice area
editor.noticeOpen('test notice');

// Close a notice area
editor.noticeClose();

// Copies the contents of the suneditor into a [textarea]
editor.save();

// Gets the suneditor's context object. Contains settings, plugins, and cached element objects
editor.getContext();

// Gets the contents of the suneditor
editor.getContents();

// Gets a list of images uploaded to the editor
/** 
 * {
 *  src: imgage src
 *  index: data index
 *  name: file name
 *  size: file size
 *  select: select function
 *  delete: delete function
 * }
 **/
editor.getImagesInfo();

// Upload images using image plugin
editor.insertImage(FileList);

// Inserts an HTML element or HTML string or plain string at the current cursor position
editor.insertHTML('<img src="http://suneditor.com/sample/img/sunset.jpg">');

// Change the contents of the suneditor
editor.setContents('set contents');

// Add content to the suneditor
editor.appendContents('append contents');

// Disable the suneditor
editor.disabled();

// Enabled the suneditor
editor.enabled();

// Hide the suneditor
editor.hide();

// Show the suneditor
editor.show();
    
// Destroy the suneditor
editor.destroy();
editor = null;

// Event functions
// It can be redefined by receiving event object as parameter.
// It is not called in exceptional cases and is called after the default event function has finished.
editor.onScroll = function (e) { console.log('onScroll', e) }

editor.onClick = function (e) { console.log('onClick', e) }

editor.onKeyDown = function (e) { console.log('onKeyDown', e) }

editor.onKeyUp = function (e) { console.log('onKeyUp', e) }

editor.onDrop = function (e) { console.log('onDrop', e) }

editor.onChange = function (contents) { console.log('onChange', contents) }

// Called when the image is uploaded or the uploaded image is deleted.
/**
 * targetImgElement: Current img element
 * index: Uploaded index (key value)
 * state: Upload status ('create', 'update', 'delete')
 * imageInfo: {
 * * index: data index
 * * name: file name
 * * size: file size
 * * select: select function
 * * delete: delete function
 * }
 * remainingFilesCount: Count of remaining image files
*/
editor.onImageUpload = function (targetImgElement, index, state, imageInfo, remainingFilesCount) {
    console.log(`targetImgElement:${targetImgElement}, index:${index}, state('create', 'update', 'delete'):${state}`)
    console.log(`imageInfo:${imageInfo}, remainingFilesCount:${remainingFilesCount}`)
}

// Called when the image is upload failed.
// If you return false, the default notices are not called.
/**
 * errorMessage: Error message to show
 * result: Result object 
*/
editor.onImageUploadError = function (errorMessage, result) {
    alert(errorMessage)
}
```

## Examples
**<a href="http://suneditor.com/sample/html/examples.html" target="_blank">Examples</a>**

## Options custom
**<a href="http://suneditor.com/sample/html/options.html" target="_blank">Customize</a>**

## customPlugins
**<a href="http://suneditor.com/sample/html/customPlugins.html" target="_blank">customPlugins</a>**

## Document
**<a href="http://suneditor.com/sample/html/document.html" target="_blank">Document</a>**
    
    
### License
Suneditor may be freely distributed under the MIT license.
