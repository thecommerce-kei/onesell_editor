/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */
'use strict';

export default {
    name: 'formatBlock',
    add: function (core, targetElement) {
        const context = core.context;
        context.formatBlock = {
            _formatList: null,
            currentFormat: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));

        context.formatBlock._formatList = listDiv.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function () {
        const option = this.context.option;
        const lang_toolbar = this.lang.toolbar;
        const listDiv = this.util.createElement('DIV');
        const formatList = !option.formats || option.formats.length === 0 ? ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] : option.formats;

        listDiv.className = 'se-submenu se-list-layer';

        let list = '<div class="se-list-inner"><ul class="se-list-basic se-list-format">';
            for (let i = 0, len = formatList.length, format, command, title, h; i < len; i++) {
                format = formatList[i].toLowerCase();
                command = format === 'pre' || format === 'blockquote' ? 'range' : 'replace';
                h = /^h/.test(format) ? format.match(/\d+/)[0] : '';
                title = lang_toolbar['tag_' + (h ? 'h' : format)] + h;

                list += '<li>' +
                    '<button type="button" class="se-btn-list" data-command="' + command + '" data-value="' + format + '" title="' + title + '">' +
                    '<' + format + '>' + title + '</' + format + '>' +
                    '</button></li>';
            }
            list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    on: function () {
        const formatContext = this.context.formatBlock;
        const formatList = formatContext._formatList;
        const currentFormat = (this.commandMap.FORMAT.getAttribute('data-focus') || 'P').toLowerCase();

        if (currentFormat !== formatContext.currentFormat) {
            for (let i = 0, len = formatList.length; i < len; i++) {
                if (currentFormat === formatList[i].getAttribute('data-value')) {
                    this.util.addClass(formatList[i], 'active');
                } else {
                    this.util.removeClass(formatList[i], 'active');
                }
            }

            formatContext.currentFormat = currentFormat;
        }
    },

    pickUp: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let command = null, value = null;
        
        while (!command && !/UL/i.test(target.tagName)) {
            command = target.getAttribute('data-command');
            value = target.getAttribute('data-value');
            target = target.parentNode;
        }

        if (!command || !value) return;

        // blockquote, pre
        if (command === 'range') {
            const rangeElement = this.util.createElement(value);
            this.applyRangeFormatElement(rangeElement);
        }
        // others
        else {
            const range = this.getRange();
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;

            let selectedFormsts = this.getSelectedElementsAndComponents();
            if (selectedFormsts.length === 0) return;

            let first = selectedFormsts[0];
            let last = selectedFormsts[selectedFormsts.length - 1];
            const firstPath = this.util.getNodePath(range.startContainer, first);
            const lastPath = this.util.getNodePath(range.endContainer, last);
            
            // remove list
            let rangeArr = {};
            let listFirst = false;
            let listLast = false;
            const passComponent = function (current) { return !this.isComponent(current); }.bind(this.util);
            for (let i = 0, len = selectedFormsts.length, r, o, lastIndex, isList; i < len; i++) {
                lastIndex = i === len - 1;
                o = this.util.getRangeFormatElement(selectedFormsts[i], passComponent);
                isList = this.util.isList(o);
                if (!r && isList) {
                    r = o;
                    rangeArr = {r: r, f: [this.util.getParentElement(selectedFormsts[i], 'LI')]};
                    if (i === 0) listFirst = true;
                } else if (r && isList) {
                    if (r !== o) {
                        const edge = this.detachRangeFormatElement(rangeArr.r, rangeArr.f, null, false, true);
                        if (listFirst) {
                            first = edge.sc;
                            listFirst = false;
                        }
                        if (lastIndex) last = edge.ec;

                        if (isList) {
                            r = o;
                            rangeArr = {r: r, f: [this.util.getParentElement(selectedFormsts[i], 'LI')]};
                            if (lastIndex) listLast = true;
                        } else {
                            r = null;
                        }
                    } else {
                        rangeArr.f.push(this.util.getParentElement(selectedFormsts[i], 'LI'));
                        if (lastIndex) listLast = true;
                    }
                }

                if (lastIndex && this.util.isList(r)) {
                    const edge = this.detachRangeFormatElement(rangeArr.r, rangeArr.f, null, false, true);
                    if (listLast || len === 1) {
                        last = edge.ec;
                        if (listFirst) first = edge.sc || last;
                    }
                }
            }

            // change format tag
            this.setRange(this.util.getNodeFromPath(firstPath, first), startOffset, this.util.getNodeFromPath(lastPath, last), endOffset);
            selectedFormsts = this.getSelectedElementsAndComponents();
            for (let i = 0, len = selectedFormsts.length, node, newFormat; i < len; i++) {
                node = selectedFormsts[i];
                
                if (node.nodeName.toLowerCase() !== value.toLowerCase() && !this.util.isComponent(node)) {
                    newFormat = this.util.createElement(value);
                    newFormat.innerHTML = node.innerHTML;
                    node.parentNode.insertBefore(newFormat, node);
                    this.util.removeItem(node);
                }

                if (i === 0) first = newFormat || node;
                if (i === len - 1) last = newFormat || node;
                newFormat = null;
            }

            this.setRange(this.util.getNodeFromPath(firstPath, first), startOffset, this.util.getNodeFromPath(lastPath, last), endOffset);
            // history stack
            this.history.push();
        }

        this.submenuOff();
    }
};
