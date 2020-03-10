/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2019 JiHong Lee.
 * MIT license.
 */
'use strict';

export default function (core, change) {
    const _w = window;
    const editor = core.context.element.wysiwyg;
    const util = core.util;
    const undo = core.context.tool.undo;
    const redo = core.context.tool.redo;
    let pushDelay = null;
    let stackIndex = 0;
    let stack = [{
        contents: core.getContents(),
        s: {
            path: [0, 0],
            offset: 0
        },
        e: {
            path: [0, 0],
            offset: 0
        }
    }];

    function setContentsFromStack () {
        const item = stack[stackIndex];
        editor.innerHTML = item.contents;

        core.setRange(util.getNodeFromPath(item.s.path, editor), item.s.offset, util.getNodeFromPath(item.e.path, editor), item.e.offset);
        core.focus();

        if (stackIndex === 0) {
            if (undo) undo.setAttribute('disabled', true);
            if (redo) redo.removeAttribute('disabled');
        } else if (stackIndex === stack.length - 1) {
            if (undo) undo.removeAttribute('disabled');
            if (redo) redo.setAttribute('disabled', true);
        } else {
            if (undo) undo.removeAttribute('disabled');
            if (redo) redo.removeAttribute('disabled');
        }

        core._checkComponents();
        core._charCount(0, false);
        // onChange
        change();
    }

    function pushStack () {
        const current = core.getContents();
        if (current === stack[stackIndex].contents) return;

        stackIndex++;
        const range = core.getRange();

        if (stack.length > stackIndex) {
            stack = stack.slice(0, stackIndex);
            if (redo) redo.setAttribute('disabled', true);
        }

        stack[stackIndex] = {
            contents: current,
            s: {
                path: util.getNodePath(range.startContainer),
                offset: range.startOffset
            },
            e: {
                path: util.getNodePath(range.endContainer),
                offset: range.endOffset
            }
        };

        if (stackIndex === 1 && undo) undo.removeAttribute('disabled');

        core._checkComponents();
        core._charCount(0, false);
        // onChange
        change();
    }

    return {
        /**
         * @description Saving the current status to the history object stack
         */
        push: function () {
            if (pushDelay) {
                _w.clearTimeout(pushDelay);
            }

            pushDelay = _w.setTimeout(function () {
                _w.clearTimeout(pushDelay);
                pushDelay = null;
                pushStack();
            }, 500);
        },

        /**
         * @description Undo function
         */
        undo: function () {
            if (stackIndex > 0) {
                stackIndex--;
                setContentsFromStack();
            }
        },

        /**
         * @description Redo function
         */
        redo: function () {
            if (stack.length - 1 > stackIndex) {
                stackIndex++;
                setContentsFromStack();
            }
        },
        
        /**
         * @description Reset the history object
         */
        reset: function () {
            stackIndex = 0;
            stack = stack[stackIndex];
        }
    };
}