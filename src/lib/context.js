/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */
'use strict';

/**
 * @description Elements and variables you should have
 * @param {HTMLElement} element textarea element
 * @param {object} cons Toolbar element you created
 * @param {json} options Inserted options
 * @returns {Object} {Elements, variables of the editor, option}
 * @private
 */
const _Context = function (element, cons, options) {
    return {
        element: {
            originElement: element,
            topArea: cons._top,
            relative: cons._relative,
            toolbar: cons._toolBar,
            resizingBar: cons._resizingBar,
            navigation: cons._navigation,
            charCounter: cons._charCounter,
            editorArea: cons._editorArea,
            wysiwyg: cons._wysiwygArea,
            code: cons._codeArea,
            loading: cons._loading,
            resizeBackground: cons._resizeBack,
            _stickyDummy: cons._stickyDummy,
            _arrow: cons._arrow
        },
        tool: {
            cover: cons._toolBar.querySelector('.se-toolbar-cover'),
            bold: cons._toolBar.querySelector('._se_command_bold'),
            underline: cons._toolBar.querySelector('._se_command_underline'),
            italic: cons._toolBar.querySelector('._se_command_italic'),
            strike: cons._toolBar.querySelector('._se_command_strike'),
            subscript: cons._toolBar.querySelector('._se_command_subscript'),
            superscript: cons._toolBar.querySelector('._se_command_superscript'),
            font: cons._toolBar.querySelector('._se_command_font_family .txt'),
            fontTooltip: cons._toolBar.querySelector('._se_command_font_family .se-tooltip-text'),
            format: cons._toolBar.querySelector('._se_command_format'),
            fontSize: cons._toolBar.querySelector('._se_command_font_size'),
            align: cons._toolBar.querySelector('._se_command_align'),
            list: cons._toolBar.querySelector('._se_command_list'),
            undo: cons._toolBar.querySelector('._se_command_undo'),
            redo: cons._toolBar.querySelector('._se_command_redo'),
            save: cons._toolBar.querySelector('._se_command_save'),
            outdent: cons._toolBar.querySelector('._se_command_outdent')
        },
        option: options
    };
};

export default _Context;