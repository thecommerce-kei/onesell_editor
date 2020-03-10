/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */
'use strict';

(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: 'По умолчанию',
            save: 'Сохранить',
            font: 'Гарнитура',
            formats: 'Стиль абзаца',
            fontSize: 'Кегль',
            bold: 'Полужирный',
            underline: 'Подчёркнутый',
            italic: 'Курсив',
            strike: 'Зачеркнутый',
            subscript: 'Нижний индекс',
            superscript: 'Верхний индекс',
            removeFormat: 'Очистить форматирование',
            fontColor: 'Цвет текста',
            hiliteColor: 'Цвет фона',
            indent: 'Увеличить отступ',
            outdent: 'Уменьшить отступ',
            align: 'Выравнивание',
            alignLeft: 'Слева',
            alignRight: 'Справа',
            alignCenter: 'По центру',
            alignJustify: 'По ширине',
            list: 'Списки',
            orderList: 'Нумерованный',
            unorderList: 'Маркированный',
            horizontalRule: 'Горизонтальная линия',
            hr_solid: 'Сплошная',
            hr_dotted: 'Пунктир',
            hr_dashed: 'Штриховая',
            table: 'Таблица',
            link: 'Ссылка',
            image: 'Изображение',
            video: 'Видео',
            fullScreen: 'Полный экран',
            showBlocks: 'Блочный вид',
            codeView: 'Редактировать HTML',
            undo: 'Отменить',
            redo: 'Вернуть',
            preview: 'Предварительный просмотр',
            print: 'Печать',
            tag_p: 'Текст',
            tag_div: 'Базовый',
            tag_h: 'Заголовок',
            tag_blockquote: 'Цитата',
            tag_pre: 'Код',
            template: 'Шаблон'
        },
        dialogBox: {
            linkBox: {
                title: 'Вставить ссылку',
                url: 'Ссылка',
                text: 'Текст',
                newWindowCheck: 'Открывать в новом окне'
            },
            imageBox: {
                title: 'Вставить изображение',
                file: 'Выберите файл',
                url: 'Адрес изображения',
                altText: 'Текстовое описание изображения'
            },
            videoBox: {
                title: 'Вставить видео',
                url: 'Ссылка на видео'
            },
            caption: 'Добавить подпись',
            close: 'Закрыть',
            submitButton: 'Подтвердить',
            revertButton: 'Сбросить',
            proportion: 'Сохранить пропорции',
            basic: 'Без обтекания',
            left: 'Слева',
            right: 'Справа',
            center: 'По центру',
            width: 'Ширина',
            height: 'Высота'
        },
        controller: {
            edit: 'Изменить',
            remove: 'Удалить',
            insertRowAbove: 'Вставить строку выше',
            insertRowBelow: 'Вставить строку ниже',
            deleteRow: 'Удалить строку',
            insertColumnBefore: 'Вставить столбец слева',
            insertColumnAfter: 'Вставить столбец справа',
            deleteColumn: 'Удалить столбец',
            resize100: 'Размер 100%',
            resize75: 'Размер 75%',
            resize50: 'Размер 50%',
            resize25: 'Размер 25%',
            mirrorHorizontal: 'Отразить по горизонтали',
            mirrorVertical: 'Отразить по вертикали',
            rotateLeft: 'Повернуть против часовой стрелки',
            rotateRight: 'Повернуть по часовой стрелке',
            maxSize: 'Ширина по размеру страницы',
            minSize: 'Ширина по содержимому',
            tableHeader: 'Строка заголовков',
            mergeCells: 'Объединить ячейки',
            splitCells: 'Разделить ячейку',
            HorizontalSplit: 'Разделить горизонтально',
            VerticalSplit: 'Разделить вертикально'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.ru = lang;
    }

    return lang;
}));