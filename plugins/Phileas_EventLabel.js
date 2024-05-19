//=============================================================================
// Phileas_EventLabel.js
//=============================================================================
// [Update History]
// 2023.July.05 Ver1.0.0 First Release
// 2023.July.07 Ver1.1.0 Added a player label and hiding invisible event labels
// 2023.July.07 Ver1.1.1 Fix
// 2023.July.18 Ver1.2.0 Added image display
// 2023.December.16 Ver1.2.1 Fixed checking the player's direction
// 2024.April.20 Ver1.2.2 Fixed event command
// 2024.April.20 Ver1.2.3 Added saving settings from commands
// 2024.April.20 Ver1.2.4 Custom line spacing
// 2024.May.19 Ver1.2.5 Displaying labels on hover

/*:
 * @target MZ
 * @plugindesc Labels above map events
 * @author Phileas
 *
 * @param Draw by default
 * @type boolean
 * @default true
 * @desc If true, the labels appear automatically after loading the map.
 *
 * @param Default x offset
 * @type number
 * @default 0
 * @desc Applies if the parameter is not specified via the tag.
 *
 * @param Default y offset
 * @type number
 * @default 25
 * @desc Applies if the parameter is not specified via the tag.
 *
 * @param Default font size
 * @type number
 * @default 26
 * @desc Applies if the parameter is not specified via the tag.
 * 
 * @param Default line spacing
 * @type number
 * @default 0
 * @min -1000
 * @max 1000
 * @desc Allows to decrease or increase the height of the line
 *
 * @param Default distance
 * @type number
 * @default 500
 * @desc The distance beyond which the label is hidden. Applies if the parameter is not specified via the tag.
 *
 * @param Default check direction
 * @type boolean
 * @default false
 * @desc If true, the label is not shown if the player is not looking towards the event. Applies if the parameter is not specified via the tag.
 *
 * @param Minimum width
 * @type number
 * @default 130
 * @desc Minimum width of the label window. You hardly need to change that.
 *
 * @param Default player label
 * @type string
 * @desc The label that is displayed above the player character, unless another one has been set via the plugin command. Input an empty string so that the label is not displayed.
 *
 * @param Hide the invisible character label
 * @type boolean
 * @default true
 * @desc If the character is invisible, then its label will not be displayed.
 * 
 * @param defaultOnlyOnHover
 * @text Show only on hover
 * @type boolean
 * @default false
 * @desc The label will be displayed only when the cursor hovers over the event (the default value of the option).
 *
 * @param Default picture position is on the left
 * @type boolean
 * @default true
 * @desc If the label has a picture set and the parameter is true, then the picture is displayed to the left of the label text, otherwise - to the right.
 *
 * @command showAllLabels
 * @text Show all labels
 * @desc Displays all labels on the map. If the labels of invisible events are hidden, then you will not see the labels.
 *
 * @command hideAllLabels
 * @text Hide all labels
 * @desc Hides all labels on the map.
 *
 * @command redrawAllLabels
 * @text Redraw all labels
 * @desc Redraws the contents of the label windows without deleting the windows themselves.
 *
 * @command setLabelText
 * @text Set the label text by id
 * @desc Changes the text of the event label to an arbitrary one.
 * @arg eventId
 * @text Event ID
 * @type number
 * @desc Input a event ID (it is a positive number).
 * @default 1
 * @arg text
 * @text Text
 * @type string
 * @desc Input text. If you input an empty line, the label will not be displayed. It can be used to hide a label.
 * @default <LabelText:text>
 *
 * @command setPlayerLabelText
 * @text Set the player label text
 * @desc Changes the text of the player character label to an arbitrary one.
 * @arg text
 * @text Text
 * @type string
 * @desc Input text. If you input an empty line, the label will not be displayed. It can be used to hide a label.
 * @default <LabelText:text>
 *
 * @command showPlayerLabel
 * @text Show the player label
 * @desc Displays the player label. If the invisible player label is hidden, then you will not see the label.
 *
 * @command hidePlayerLabel
 * @text Hide the player label
 * @desc Hides the player label.
 *
 * 
 * @help
 * GitHub: https://github.com/Oleg-Olegovich/phileas-public-plugins
 *
 * The plugin adds labels above map events.
 *
 * Use the note field. It is located to the right of the name field in the event editor. 
 * There you can enter one or more of the following tags:
 * <LabelText:Name> - shows the label "Name". Standard engine control symbols are supported here (\C, \V, etc).
 * <LabelFontSize:26> - sets the font size for a specific label.
 * <LabelLineSpacing:-10> - reduces or increases the line spacing.
 * <LabelImage:Actor1> - displays the picture "Actor1.png".
 * <LabelImagePositionLeft:yes> - if "yes", the image will be displayed to the left of the label text.
 * <LabelXOffset:0> - sets the horizontal offset for a specific label.
 * <LabelYOffset:25> - sets the vertical offset for a specific label.
 * <LabelDistance:50> - the distance beyond which the label is hidden.
 * <LabelCheckDirection:yes> - if "yes", the label is not shown if the player is not looking towards the event.
 * <LabelHideInvisible:no> - if "yes", the label will be hidden if the event is invisible.
 * <LabelOnlyOnHover:yes> - if "yes", the label will only be displayed when the cursor is hovered over.
 *
 * It is mandatory to use the <LabelText> or <LabelImage> tag (at least one of them, you can use both)
 * if you want to display the label above the event. The other tags are optional.
 * If you don't write them, the default values that are configured in the plugin parameters will be used.
 *
 * You can assign a label to the player character via the plugin parameter or command. Use the same tags as for map events.
 * 
 * Plugin Commands:
 * 0) Show all labels - displays all labels on the map; if the labels of invisible events are hidden, then you will not see their labels.
 * 1) Hide all labels - hides all labels on the map.
 * 2) Redraw all labels - redraws the contents of the label windows without deleting the windows themselves.
 * 3) Set the label text by id - changes the text of the event label to an arbitrary one.
 * 4) Set the player label text - changes the text of the player character label to an arbitrary one.
 * 5) Show the player label - displays the player label; if the invisible player label is hidden and the player is invisible, then you will not see the label.
 * 6) Hide the player label - hides the player label.
 *
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */

/*:ru
 * @target MZ
 * @plugindesc Надписи над событиями карты
 * @author Phileas
 *
 * @param Draw by default
 * @text Рисовать по умолчанию
 * @type boolean
 * @default true
 * @desc Если true, надписи появляются автоматически после загрузки карты.
 *
 * @param Default x offset
 * @text Смещение по X по умолчанию
 * @type number
 * @default 0
 * @desc Применяется если параметр не задан тегом.
 *
 * @param Default y offset
 * @text Смещение по Y по умолчанию
 * @type number
 * @default 25
 * @desc Применяется если параметр не задан тегом.
 *
 * @param Default font size
 * @text Размер шрифта по умолчанию
 * @type number
 * @default 26
 * @desc Применяется если параметр не задан тегом.
 * 
 * @param Default line spacing
 * @text Межстрочный интервал по умолчанию
 * @type number
 * @default 0
 * @min -1000
 * @max 1000
 * @desc Позволяет уменьшить или увеличить высоту строки
 *
 * @param Default distance
 * @text Расстояние по умолчанию
 * @type number
 * @default 500
 * @desc Расстояние, за пределами которого надпись скрыта. Применяется если параметр не задан тегом.
 *
 * @param Default check direction
 * @text Проверка направления по умолчанию
 * @type boolean
 * @default false
 * @desc Если true, надпись не показывается если игрок не смотрит в сторону события. Применяется если параметр не задан тегом.
 *
 * @param Minimum width
 * @text Минимальная ширина
 * @type number
 * @default 130
 * @desc Минимальная ширина окна с надписью. Вам вряд ли нужно это менять.
 *
 * @param Default player label
 * @text Надпись игрока по умолчанию
 * @type string
 * @desc Надпись, которая отображается над персонажем игрока, если только с помощью команды плагина не была установлена другая. Введите пустую строку, чтобы надпись не отображалась.
 *
 * @param Hide the invisible character label
 * @text Скрывать надпись невидимых
 * @type boolean
 * @default true
 * @desc Если событие невидимое, то его надпись отображаться не будет. 
 *
 * @param defaultOnlyOnHover
 * @text Показывать только при наведении
 * @type boolean
 * @default false
 * @desc Надпись будет показываться только при наведении курсора на событие (значение опции по умолчанию).
 *
 * @param Default picture position is on the left
 * @text По умолчанию изображение расположено слева
 * @type boolean
 * @default true
 * @desc Если в надписи установлена картинка и параметр равен true, то картинка отображается слева от текста надписи, в противном случае - справа.
 *
 * @command showAllLabels
 * @text Показать все надписи
 * @desc Отображает все надписи на карте. Если надписи невидимых событий скрыты, то вы их не увидите.
 *
 * @command hideAllLabels
 * @text Скрыть все надписи
 * @desc Скрывает все надписи на карте.
 *
 * @command redrawAllLabels
 * @text Перерисовать все надписи
 * @desc Перерисовывает содержимое окон с надписями, не удаляя сами окна.
 *
 * @command setLabelText
 * @text Установить надпись по id
 * @desc Изменяет текст надписи события на произвольный.
 * @arg eventId
 * @text ID события
 * @type number
 * @desc Ввести ID события (это положительное число).
 * @default 1
 * @arg text
 * @text Текст
 * @type string
 * @desc Введите текст. Если вы введете пустую строку, надпись отображаться не будет. Это можно использовать для скрытия надписи.
 * @default <LabelText:text>
 *
 * @command setPlayerLabelText
 * @text Установить надпись игрока
 * @desc Изменяет текст надписи игрока.
 * @arg text
 * @text Текст
 * @type string
 * @desc Введите текст. Если вы введете пустую строку, надпись отображаться не будет. Это можно использовать для скрытия надписи.
 * @default <LabelText:text>
 *
 * @command showPlayerLabel
 * @text Показать надпись игрока
 * @desc Показывает надпись игрока. Если надпись невидимого игрока скрывается, вы её не увидите.
 *
 * @command hidePlayerLabel
 * @text Скрыть надпись игрока
 * @desc Скрывает надпись игрока.
 *
 * 
 * @help
 * GitHub: https://github.com/Oleg-Olegovich/phileas-public-plugins
 *
 * Плагин добавляет надписи над событиями карты.
 *
 * Используйте поле "Заметка". Оно расположено справа от поля "Название" в редакторе событий.
 * Там вы можете ввести один или больше из следующих тегов:
 * <LabelText:Name> - показывает надпись "Name". Здесь поддерживаются стандартные символы управления движка (\C, \V и т.д.).
 * <LabelFontSize:26> - устанавливает размер шрифта для конкретной надписи.
 * <LabelLineSpacing:-10> - уменьшает или увеличивает междустрочный интервал.
 * <LabelImage:Actor1> - показывает картинку "Actor1.png".
 * <LabelImagePositionLeft:yes> - если "yes", картинка будет показана слева от текста надписи.
 * <LabelXOffset:0> - указывает горизонтальное смещение для конкретной надписи.
 * <LabelYOffset:25> - указывает вертикальное смещение для конкретной надписи.
 * <LabelDistance:50> - расстояние, за которым надпись скрывается.
 * <LabelCheckDirection:yes> - если "yes", надпись не показывается, если игрок не смотрит в сторону события.
 * <LabelHideInvisible:no> - если "yes", надпись скрывается, если событие невидимое.
 * <LabelOnlyOnHover:yes> - если "yes",надпись будет показываться только при наведении курсора.
 *
 * Обязательно используйте тег <LabelText> или <LabelImage> (хотя бы один из них, вы можете использовать оба),
 * если хотите отобразить надпись над событием. Остальные теги необязательны.
 * Если вы их не запишете, будут использоваться значения по умолчанию, заданные в параметрах плагина.
 *
 * Вы можете присвоить персонажу игрока надпись с помощью параметра плагина или команды. Используйте те же теги, что и для событий на карте.
 * 
 * Команды плагина:
 * 0) Показать все надписи
 * 1) Скрыть все надписи
 * 2) Перерисовать все надписи
 * 3) Установить надпись по id
 * 4) Установить надпись игрока
 * 5) Показать надпись игрока
 * 6) Скрыть надпись игрока
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(function () {

//--------MY CODE:  
    PluginManager.registerCommand("Phileas_EventLabel", "showAllLabels", showPhileasEventLabels);
    PluginManager.registerCommand("Phileas_EventLabel", "hideAllLabels", hidePhileasEventLabels);
    PluginManager.registerCommand("Phileas_EventLabel", "redrawAllLabels", redrawPhileasEventLabels);
    PluginManager.registerCommand("Phileas_EventLabel", "setLabelText", setPhileasEventLabelText);
    PluginManager.registerCommand("Phileas_EventLabel", "setPlayerLabelText", setPhileasPlayerLabelText);
    PluginManager.registerCommand("Phileas_EventLabel", "showPlayerLabel", showPhileasPlayerLabel);
    PluginManager.registerCommand("Phileas_EventLabel", "hidePlayerLabel", hidePhileasPlayerLabel);

    var parameters = PluginManager.parameters("Phileas_EventLabel");

    var PhileasEventLabelSettings = PhileasEventLabelSettings || {};
    PhileasEventLabelSettings.drawByDefault = (parameters["Draw by default"] || "true") == "true";
    PhileasEventLabelSettings.defaultXOffset = parameters["Default x offset"] || 0;
    PhileasEventLabelSettings.defaultYOffset = parameters["Default y offset"] || 25;
    PhileasEventLabelSettings.defaultFontSize = parameters["Default font size"] || 26;
    PhileasEventLabelSettings.defaultLineSpacing = parameters["Default line spacing"] || 0;
    PhileasEventLabelSettings.defaultDistance = parameters["Default distance"] || 500;
    PhileasEventLabelSettings.defaultCheckDirection = (parameters["Default check direction"] || "false") == "true";
    PhileasEventLabelSettings.minWidth = parameters["Minimum width"] || 130;
    PhileasEventLabelSettings.defaultPlayerLabel = parameters["Default player label"] || "";
    PhileasEventLabelSettings.hideInvisibleCharacterLabel = (parameters["Hide the invisible character label"] || "true") == "true";
    PhileasEventLabelSettings.defaultOnlyOnHover = parameters["defaultOnlyOnHover"] == "true";
    PhileasEventLabelSettings.defaultPicturePositionIsLeft = (parameters["Default picture position is on the left"] || "true") == "true";
    PhileasEventLabelSettings.tags = ["LabelText", "LabelFontSize", "LabelLineSpacing", "LabelXOffset", "LabelYOffset", "LabelDistance", "LabelCheckDirection", "LabelHideInvisible", "LabelImage", "LabelImagePositionLeft", "LabelOnlyOnHover"];

    var playerLabelWindow = null;

    var playerLabelText = null;
    // Dictionary<mapId, Dictionary<eventId, note>>.
    var commandEventLabels = {};

    var currentCursorX = 0;
    var currentCursorY = 0;

    function PhileasEventLabelData() {
        this.LabelText = "";
        this.LabelXOffset = PhileasEventLabelSettings.defaultXOffset;
        this.LabelYOffset = PhileasEventLabelSettings.defaultYOffset;
        this.LabelFontSize = PhileasEventLabelSettings.defaultFontSize;
        this.LabelLineSpacing = PhileasEventLabelSettings.defaultLineSpacing;
        this.LabelDistance = PhileasEventLabelSettings.defaultDistance;
        this.LabelCheckDirection = PhileasEventLabelSettings.defaultCheckDirection;
        this.LabelHideInvisible = PhileasEventLabelSettings.defaultHideInvisibleCharacterLabel;
        this.LabelOnlyOnHover = PhileasEventLabelSettings.defaultOnlyOnHover;
        this.LabelImage = "";
        this.LabelImagePositionLeft = PhileasEventLabelSettings.defaultPicturePositionIsLeft;
    }
    PhileasEventLabelData.prototype.constructor = PhileasEventLabelData;


    function Window_PhileasEventLabel() {
        this.initialize(...arguments);
    }

    Window_PhileasEventLabel.prototype = Object.create(Window_Base.prototype);
    Window_PhileasEventLabel.prototype.constructor = Window_PhileasEventLabel;

    Window_PhileasEventLabel.prototype.initialize = function (eventObject, isVisible, isEventVisible) {
        this.eventObject = eventObject;
        this.isVisible = isVisible;
        this.isEventVisible = isEventVisible;
        this.phileasEventLabelData = new PhileasEventLabelData();
        let width = PhileasEventLabelSettings.minWidth;
        Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, width, this.fittingHeight(1) + 10));
        this.opacity = this.contentsOpacity = 0;
        this.visible = false;
        this.setPhileasLabelData(eventObject.note);
        this.drawPhileasLabel();
        SceneManager._scene._spriteset.addChild(this);
    };

    Window_PhileasEventLabel.prototype.lineHeight = function () {
        return Window_Base.prototype.lineHeight.call(this) + this.phileasEventLabelData.LabelLineSpacing;
    };

    function getMeta(data) {
        const regExp = /<([^<>:]+)(:?)([^>]*)>/g;
        let meta = {};
        for (; ;) {
            const match = regExp.exec(data);
            if (match) {
                if (match[2] === ":") {
                    meta[match[1]] = match[3];
                } else {
                    meta[match[1]] = true;
                }
            } else {
                break;
            }
        }

        return meta;
    };

    Window_PhileasEventLabel.prototype.setPhileasLabelData = function (data) {
        let meta = getMeta(data);
        if (meta == undefined) {
            return;
        }

        for (let i in PhileasEventLabelSettings.tags) {
            let tag = PhileasEventLabelSettings.tags[i];
            if (meta[tag] != undefined) {
                this.phileasEventLabelData[tag] = meta[tag];
            }
        }

        this.phileasEventLabelData.LabelFontSize = Number(this.phileasEventLabelData.LabelFontSize);
        this.phileasEventLabelData.LabelLineSpacing = Number(this.phileasEventLabelData.LabelLineSpacing);
        this.phileasEventLabelData.LabelXOffset = Number(this.phileasEventLabelData.LabelXOffset);
        this.phileasEventLabelData.LabelYOffset = Number(this.phileasEventLabelData.LabelYOffset);
        this.phileasEventLabelData.LabelDistance = Number(this.phileasEventLabelData.LabelDistance);
        this.phileasEventLabelData.LabelCheckDirection = this.phileasEventLabelData.LabelCheckDirection == true || this.phileasEventLabelData.LabelCheckDirection == "yes";
        this.phileasEventLabelData.LabelHideInvisible = this.phileasEventLabelData.LabelHideInvisible == true || this.phileasEventLabelData.LabelHideInvisible == "yes";
        this.phileasEventLabelData.LabelOnlyOnHover = this.phileasEventLabelData.LabelOnlyOnHover == true || this.phileasEventLabelData.LabelOnlyOnHover == "yes";
        this.phileasEventLabelData.LabelImagePositionLeft = this.phileasEventLabelData.LabelImagePositionLeft == true || this.phileasEventLabelData.LabelImagePositionLeft == "yes";
    }

    function isRightDirection(pX, pY, eX, eY) {
        switch ($gamePlayer.direction()) {
            case 1:
                return pX > eX && pY < eY;
            case 2:
                return pY < eY;
            case 3:
                return pX < eX && pY < eY;
            case 4:
                return pX > eX;
            case 6:
                return pX < eX;
            case 7:
                return pX > eX && pY > eY;
            case 8:
                return pY > eY;
            case 9:
                return pX < eX && pY > eY;
        }

        return false;
    }

    Window_PhileasEventLabel.prototype.isOnHover = function() {
        const mapX = $gameMap.canvasToMapX(currentCursorX);
        const mapY = $gameMap.canvasToMapY(currentCursorY);
        const events = $gameMap.eventsXy(mapX, mapY);

        if (events.length === 0) {
            return;
        }
        
        for (let i = 0; i < events.length; ++i) {
            if (events[i]._eventId == this.eventObject.id) {
                return true;
            }
        }

        return false;
    };

    Window_PhileasEventLabel.prototype.isPhileasEventLabelVisible = function () {
        if (this.phileasEventLabelData.LabelText == "" || !this.isVisible
            || this.phileasEventLabelData.LabelHideInvisible && !this.isEventVisible) {
            return false;
        }

        let pX = $gamePlayer.x;
        let pY = $gamePlayer.y;
        if (this.phileasEventLabelData.LabelDistance < Math.abs(pX - this.eventObject.x)
            || this.phileasEventLabelData.LabelDistance < Math.abs(pY - this.eventObject.y)
            || this.phileasEventLabelData.LabelCheckDirection && !isRightDirection(pX, pY, this.eventObject.x, this.eventObject.y)
            || SceneManager._scene._encounterEffectDuration > 0) {
            return false;
        }

        if (this.phileasEventLabelData.LabelOnlyOnHover) {
            return this.isOnHover();
        }

        return true;
    };

    Window_PhileasEventLabel.prototype.show = function () {
        if (this.contentsOpacity >= 255) {
            return;
        }

        this.contentsOpacity += 20;
        this.visible = true;
    };

    Window_PhileasEventLabel.prototype.hide = function () {
        if (this.contentsOpacity <= 0) {
            if (this.visible) {
                this.visible = false;
            }
            return;
        }
        this.contentsOpacity -= 20;
    };

    Window_PhileasEventLabel.prototype.tryShow = function () {
        if (this.isPhileasEventLabelVisible()) {
            this.show();
            return;
        }

        this.hide();
    };

    Window_PhileasEventLabel.prototype.resetFontSettings = function () {
        Window_Base.prototype.resetFontSettings.call(this);
        this.contents.fontSize = this.phileasEventLabelData.LabelFontSize;
    };

    Window_PhileasEventLabel.prototype.drawPhileasLabelPicture = function (x, offset = 0) {
        const bitmap = this.phileasLabelBitmap;
        if (offset == 0) {
            this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x - bitmap.width, 0);
        }
        else {
            this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x + offset, 0);
        }
    }

    Window_PhileasEventLabel.prototype.drawPhileasLabel2 = function () {
        this.contents.clear();
        let textWidth = this.textSizeEx(this.phileasEventLabelData.LabelText).width;
        if (textWidth > 0) {
            textWidth += this.itemPadding() * 2;
        }

        this.width = Math.max(textWidth, PhileasEventLabelSettings.minWidth) + this.imageWidth + this.padding * 2;
        if (this.imageWidth > 0) {
            this.width += textWidth * 2;
        }

        this.height = this.fittingHeight(1) + 10 + this.imageHeight;
        this.createContents();
        let wx = (this.contents.width - textWidth) / 2 + this.itemPadding();
        if (this.phileasLabelBitmap != undefined) {
            if (this.phileasEventLabelData.LabelImagePositionLeft) {
                this.drawPhileasLabelPicture(wx);
            }
            else {
                this.drawPhileasLabelPicture(wx, textWidth);
            }
        }

        if (this.phileasEventLabelData.LabelText == "") {
            this.phileasEventLabelData.LabelText = " ";
        }

        this.drawTextEx(this.phileasEventLabelData.LabelText, wx, 0, textWidth);
        this.visible = true;
        if (this.isPhileasEventLabelVisible()) {
            this.contentsOpacity = 255;
        }
    }

    Window_PhileasEventLabel.prototype.setPhileasLabelPictureSizes = function () {
        this.phileasLabelBitmap = undefined;
        if (this.phileasEventLabelData.LabelImage == "") {
            this.imageWidth = 0;
            this.imageHeight = 0;
            this.drawPhileasLabel2();
            return;
        }

        this.phileasLabelBitmap = ImageManager.loadPicture(this.phileasEventLabelData.LabelImage);
        this.phileasLabelBitmap.addLoadListener(() => {
            const bt = this.phileasLabelBitmap.baseTexture;
            this.imageWidth = bt.width + this.itemPadding() * 6;
            this.imageHeight = bt.height;
            this.drawPhileasLabel2();
        });
    }

    Window_PhileasEventLabel.prototype.drawPhileasLabel = function () {
        this.setPhileasLabelPictureSizes();
    }

    Scene_Map.prototype.drawPhileasEventLabels = function () {
        if (!(SceneManager._scene instanceof Scene_Map)) {
            return;
        }

        //let events = $gameMap.events();
        let events = SceneManager._scene._spriteset._characterSprites;
        SceneManager._scene.phileasLabelWindows = {};

        for (var i = 0; i < events.length; ++i) {
            if (events[i]._character instanceof Game_Player) {
                $gamePlayer.note = playerLabelText != null
                    ? playerLabelText
                    : PhileasEventLabelSettings.defaultPlayerLabel;
                playerLabelWindow = new Window_PhileasEventLabel($gamePlayer, true, events[i].visible);
                events[i].phileasEventLabelWindow = playerLabelWindow;
                continue;
            }

            if (!(events[i]._character instanceof Game_Event)) {
                continue;
            }

            let e = events[i]._character.event();

            if (commandEventLabels[$gameMap._mapId] != undefined && commandEventLabels[$gameMap._mapId][e.id] != null) {
                e.note = commandEventLabels[$gameMap._mapId][e.id];
                e.meta = getMeta(e.note);
            }

            if (e.meta.LabelText != undefined || e.meta.LabelImage != undefined) {
                let label = new Window_PhileasEventLabel(e, PhileasEventLabelSettings.drawByDefault, events[i].visible);
                SceneManager._scene.phileasLabelWindows[e.id] = label;
                events[i].phileasEventLabelWindow = label;
            }
        }
    };

    Sprite_Character.prototype.setPhileasEventLabelPosition = function () {
        let scale = SceneManager._scene._spriteset.scale;
        let scaleX = 1 / scale.x;
        let scaleY = 1 / scale.y;
        let width = this.phileasEventLabelWindow.width * scaleX;
        this.phileasEventLabelWindow.x = this.x - width / 2 + this.phileasEventLabelWindow.phileasEventLabelData.LabelXOffset;
        let height = this.phileasEventLabelWindow.height * scaleY;
        let offset = this.phileasEventLabelWindow.phileasEventLabelData.LabelYOffset * scaleY;
        this.phileasEventLabelWindow.y = this.y - this.height - height + offset;
    };

    function iteratePhileasEventLabels(func) {
        let scene = SceneManager._scene;
        if (!(scene instanceof Scene_Map)) {
            return;
        }

        for (const [key, label] of Object.entries(scene.phileasLabelWindows)) {
            func(label);
        }
    }

    function showPhileasEventLabel(label) {
        label.isVisible = true;
    }

    function showPhileasEventLabels() {
        iteratePhileasEventLabels(showPhileasEventLabel);
    };

    function hidePhileasEventLabel(label) {
        label.isVisible = false;
    }

    function hidePhileasEventLabels() {
        iteratePhileasEventLabels(hidePhileasEventLabel);
    };

    function redrawPhileasEventLabel(label) {
        label.drawPhileasLabel();
    }

    function redrawPhileasEventLabels() {
        iteratePhileasEventLabels(redrawPhileasEventLabel);
    };

    function setPhileasEventLabelText(params) {
        let scene = SceneManager._scene;
        let eventId = Number(params["eventId"]);
        if (!(scene instanceof Scene_Map) || eventId < 1) {
            return;
        }

        let text = params["text"];
        if (text == undefined) {
            text = "";
        }

        if (commandEventLabels[$gameMap._mapId] == undefined) {
            commandEventLabels[$gameMap._mapId] = {};
        }
        commandEventLabels[$gameMap._mapId][eventId] = text;

        let label = undefined;
        if (eventId in scene.phileasLabelWindows) {
            label = scene.phileasLabelWindows[eventId];
        }
        else {
            label = new Window_PhileasEventLabel($gameMap.event(eventId).event(), PhileasEventLabelSettings.drawByDefault);
            scene.phileasLabelWindows[eventId] = label;
            let sprites = scene._spriteset._characterSprites;
            for (let i = 0; i < sprites.length; ++i) {
                if (sprites[i]._character instanceof Game_Event && sprites[i]._character.event().id == eventId) {
                    sprites[i].phileasEventLabelWindow = label;
                    break;
                }
            }

        }

        label.setPhileasLabelData(text);
        label.drawPhileasLabel();
    }

    function setPhileasPlayerLabelText(params) {
        let text = params["text"];
        if (text == undefined) {
            text = "";
        }

        playerLabelText = text;
        playerLabelWindow.setPhileasLabelData(text);
        playerLabelWindow.drawPhileasLabel();
    }

    function showPhileasPlayerLabel() {
        showPhileasEventLabel(playerLabelWindow);
    }

    function hidePhileasPlayerLabel() {
        hidePhileasEventLabel(playerLabelWindow);
    }

//--------CHANGED CORE:

    const Origin_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        Origin_onMapLoaded.call(this);
        this.drawPhileasEventLabels();
    };

    const Origin_eventUpdate = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        Origin_eventUpdate.call(this);
        if (this.phileasEventLabelWindow != undefined) {
            this.phileasEventLabelWindow.isEventVisible = this.visible;
            this.setPhileasEventLabelPosition();
            this.phileasEventLabelWindow.tryShow();
        }
    };

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        Origin_setupNewGame.call(this);
        playerLabelText = null;
        commandEventLabels = {};
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasPlayerLabelText = playerLabelText;
        contents.phileasCommandEventLabels = commandEventLabels;
        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        Origin_extractSaveContents.call(this, contents);
        playerLabelText = contents.phileasPlayerLabelText || null;
        commandEventLabels = contents.phileasCommandEventLabels || {};
    };

    const Origin_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function (event) {
        Origin_onMouseMove.call(this, event);

        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        const scene = SceneManager._scene;

        if (!Graphics.isInsideCanvas(x, y)
            || !(scene instanceof Scene_Map)
            || !scene.isActive()
            || $gameMessage.isBusy()) {

            return;
        }

        currentCursorX = this._x;
        currentCursorY = this._y;
    };
}());