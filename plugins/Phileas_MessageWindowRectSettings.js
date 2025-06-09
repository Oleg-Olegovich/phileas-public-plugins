//=============================================================================
// Phileas_MessageWindowRectSettings.js
//=============================================================================
// [Update History]
// 2022.September.3 Ver1.0.0 First Release
// 2023.May.8 Ver1.1.0 Added nextChoiceListPosition command
// 2023.May.9 Ver1.1.1 Fixed the compatibility issue of HIME_HiddenChoiceConditions by changing the logic of the plugin command
// 2024.January.28 Ver1.2.0 Added commands for runtime customization
// 2024.February.25 Ver1.2.1 Updating the message window after the plugin command
// 2025.February.10 Ver1.3.0 Added dimmer window settings

/*:
 * @target MZ
 * @plugindesc Customization of the size and position of message and choice lists windows
 * @author Phileas
 *
 * @param messageWindowWidth
 * @text Default message window width
 * @type number
 * @default 0
 *
 * @param messageWindowHeight
 * @text Default message window height
 * @type number
 * @default 0
 *
 * @param messageWindowHorizontalOffset
 * @text Default message window horizontal offset
 * @type number
 * @min -1001
 * @default 0
 *
 * @param dimColors
 * @text Dimmer window colors
 *
 * @param dimColor1
 * @parent dimColors
 * @text Background color
 * @type struct<ColorStruct>
 * @desc Input an empty line to use the default value
 * @default 
 *
 * @param dimColor2
 * @parent dimColors
 * @text Border color
 * @type struct<ColorStruct>
 * @desc Input an empty line to use the default value
 * @default 
 *
 * @command nextMessageWindowSettings
 * @text Change the message window
 * @desc
 *
 * @arg width
 * @text Width
 * @type number
 * @desc Input a value less than 1 to keep the default value.
 *
 * @arg height
 * @text Height
 * @type number
 * @desc Input a value less than 1 to keep the default value.
 *
 * @arg horizontalOffset
 * @text Horizontal offset
 * @type number
 * @min -1001
 *
 * @arg y
 * @text The Y coordinate
 * @type number
 * @min -1
 * @desc Input a value less than 0 to keep the default value.
 *
 *
 * @command defaultMessageWindowSettings
 * @text Default message window
 * @desc Set the default message window settings
 *
 *
 * @command nextChoiceListPosition
 * @text Change the choice list
 * @desc Change position of the choice list window
 *
 * @arg X
 * @text The X coordinate
 * @type number
 * @min -1
 * @desc Input a value less than 0 to keep the default value.
 *
 * @arg Y
 * @text The Y coordinate
 * @type number
 * @min -1
 * @default -1
 * @desc Input a value less than 0 to keep the default value.
 *
 *
 * @command defaultChoiceListWindowSettings
 * @text Default choice list
 * @desc Set the default choice list window settings
 *
 *
 * @command setDimColors
 * @text Set dimmer window colors
 *
 * @arg dimColor1
 * @text Background color
 * @type struct<ColorStruct>
 * @desc Input an empty line to use the default value
 * @default 
 *
 * @arg dimColor2
 * @text Border color
 * @type struct<ColorStruct>
 * @desc Input an empty line to use the default value
 * @default 
 *
 *
 * @command defaultDimColors
 * @text Default dimmer window colors
 *
 * 
 * @help
 * [Summary]
 * If the value of the width or height parameter is less than 1 
 * or greater than the default value, then the default value is set.
 * 
 * [Plugin commands]
 * The plugin provides 4 commands:
 * 0) Change the message window - sets the width, height, horizontal 
 *     offset, and Y for subsequent message windows. 
 *     If Y is set, the position setting in the editor is ignored.
 * 1) Default message window - sets all settings to default values (from plugin parameters).
 * 2) Change the choice list - changes the position of all subsequent choice list windows.
 * 3) Default choice list - sets all settings to default values.
 *
 * You can always write to the author if you need other features or even plugins.
 * Patreon: https://www.patreon.com/treeverse_games
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MZ
 * @plugindesc Кастомизация размера и положения окон сообщений и списков выбора
 * @author Phileas
 *
 * @param messageWindowWidth
 * @text Ширина окна сообщения по умолчанию
 * @type number
 * @default 0
 *
 * @param messageWindowHeight
 * @text Высота окна сообщения по умолчанию
 * @type number
 * @default 0
 *
 * @param messageWindowHorizontalOffset
 * @text Горизонтальное смещение окна сообщения по умолчанию
 * @type number
 * @default 0
 *
 * @param dimColors
 * @text Цвета затемнённого окна
 *
 * @param dimColor1
 * @parent dimColors
 * @text Цвет фона
 * @type struct<ColorStruct>
 * @desc Введите пустую строку, чтобы использовать значение по умолчанию
 * @default 
 *
 * @param dimColor2
 * @parent dimColors
 * @text Цвет границы
 * @type struct<ColorStruct>
 * @desc Введите пустую строку, чтобы использовать значение по умолчанию
 * @default 
 *
 * @command nextMessageWindowSettings
 * @text Изменить окно сообщения
 * @desc
 *
 * @arg width
 * @text Ширина
 * @type number
 * @desc Введите значение меньше 1, чтобы сохранить значение по умолчанию.
 *
 * @arg height
 * @text Высота
 * @type number
 * @desc Введите значение меньше 1, чтобы сохранить значение по умолчанию.
 *
 * @arg horizontalOffset
 * @text Горизонтальное смещение
 * @type number
 * @desc Введите значение меньше 1, чтобы сохранить значение по умолчанию.
 *
 * @arg y
 * @text Координата Y
 * @type number
 * @min -1
 * @default -1
 * @desc Введите значение меньше 0, чтобы сохранить значение по умолчанию.
 *
 *
 * @command defaultMessageWindowSettings
 * @text Окно сообщения по умолчанию
 * @desc Устанавливает стандартные настройки окна сообщения
 *
 *
 * @command nextChoiceListPosition
 * @text Изменить список выбора
 * @desc Изменяет позицию окна списка выбора
 *
 * @arg X
 * @text Координата X
 * @type number
 * @min -1
 * @desc Введите значение меньше 0, чтобы сохранить значение по умолчанию.
 *
 * @arg Y
 * @text Координата Y
 * @type number
 * @min -1
 * @desc Введите значение меньше 0, чтобы сохранить значение по умолчанию.
 *
 *
 * @command defaultChoiceListWindowSettings
 * @text Список выбора по умолчанию
 * @desc Устанавливает стандартные настройки окна списка выбора
 *
 *
 * @command setDimColors
 * @text Изменить цвета затемнённого фона
 *
 * @arg dimColor1
 * @text Цвет фона
 * @type struct<ColorStruct>
 * @desc Введите пустую строку, чтобы использовать значение по умолчанию
 * @default 
 *
 * @arg dimColor2
 * @text Цвет границы
 * @type struct<ColorStruct>
 * @desc Введите пустую строку, чтобы использовать значение по умолчанию
 * @default 
 *
 *
 * @command defaultDimColors
 * @text Цвета затемнённого фона по умолчанию
 *
 * 
 * @help
 * [Резюме]
 * Если значение параметра width или height меньше 1
 * или больше значения по умолчанию, то устанавливается значение по умолчанию.
 * 
 * [Команды плагина]
 * Плагин предоставляет 4 команды:
 * 0) Изменить окно сообщения - устанавливает ширину, высоту, горизонтальное
 * смещение и Y для последующих окон сообщений.
 * Если задано значение Y, настройка положения в редакторе игнорируется.
 * 1) Окно сообщения по умолчанию - устанавливает все настройки на значения по умолчанию (из параметров плагина).
 * 2) Изменить список выбора - изменяет положение всех последующих окон списка выбора.
 * 3) Список выбора по умолчанию - устанавливает все настройки на значения по умолчанию.
 *
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * Patreon: https://www.patreon.com/treeverse_games
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 * [Лицензия]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

/*~struct~ColorStruct
 * @param red
 * @text Red
 * @type number
 * @default 0
 *
 * @param green
 * @text Green
 * @type number
 * @default 0
 * 
 * @param blue
 * @text Blue
 * @type number
 * @default 0
 * 
 * @param opacity
 * @text Opacity (%)
 * @type number
 * @default 60
 */

/*~struct~ColorStruct:ru
 * @param red
 * @text Красный
 * @type number
 * @default 0
 *
 * @param green
 * @text Зелёный
 * @type number
 * @default 0
 * 
 * @param blue
 * @text Голубой
 * @type number
 * @default 0
 * 
 * @param opacity
 * @text Непрозрачность (%)
 * @type number
 * @default 60
 */

(function() {

    "use strict";

//--------DATA:
    var parameters = PluginManager.parameters("Phileas_MessageWindowRectSettings");
    var messageWindowWidth = Number(parameters["messageWindowWidth"] || 0);
    var messageWindowHeight = Number(parameters["messageWindowHeight"] || 0);
    var messageWindowHorizontalOffset = Number(parameters["messageWindowHorizontalOffset"] || 0);
    var nextMessageWindowWidth = -1;
    var nextMessageWindowHeight = -1;
    var nextMessageWindowHorizontalOffset = -1;
    var nextMessageWindowY = -1;
    var nextChoiceListX = -1;
    var nextChoiceListY = -1;
    var dimColor1 = setDimColor(parameters["dimColor1"]);
    var dimColor2 = setDimColor(parameters["dimColor2"]);

//--------MODIFIED CODE:

    PluginManager.registerCommand("Phileas_MessageWindowRectSettings", "nextMessageWindowSettings", setNextMessageWindowSettings);
    PluginManager.registerCommand("Phileas_MessageWindowRectSettings", "defaultMessageWindowSettings", setDefaultMessageWindowSettings);
    PluginManager.registerCommand("Phileas_MessageWindowRectSettings", "nextChoiceListPosition", setNextChoceListPosition);
    PluginManager.registerCommand("Phileas_MessageWindowRectSettings", "defaultChoiceListWindowSettings", setDefaultChoiceListWindowSettings);
    PluginManager.registerCommand("Phileas_MessageWindowRectSettings", "setDimColors", setDimColors);
    PluginManager.registerCommand("Phileas_MessageWindowRectSettings", "defaultDimColors", defaultDimColors);
    
    function updateScenesStack() {
        for (let i = 0; i < SceneManager._stack.length; ++i) {
            const sm = SceneManager._stack[i];
            if (sm instanceof Scene_Message) {
                sm._windowLayer.removeChild(sm._messageWindow);
                sm.createMessageWindow();
                sm.associateWindows();
            }
        }
    }
    
    function updateSceneMessage() {
        const sm = SceneManager._scene;
        if (sm instanceof Scene_Message) {
            sm._windowLayer.removeChild(sm._messageWindow);
            sm.createMessageWindow();
            sm.associateWindows();
        }
    }
    
    function setNextMessageWindowSettings(params) {
        nextMessageWindowWidth = Number(params["width"]);
        nextMessageWindowHeight = Number(params["height"]);
        nextMessageWindowHorizontalOffset = Number(params["horizontalOffset"]);
        nextMessageWindowY = Number(params["y"]);
        updateSceneMessage();
        updateScenesStack();
    }
    
    function setDefaultMessageWindowSettings(params) {
        nextMessageWindowWidth = -1;
        nextMessageWindowHeight = -1;
        nextMessageWindowHorizontalOffset = -1;
        nextMessageWindowY = -1;
        updateSceneMessage();
        updateScenesStack();
    }
    
    function setNextChoceListPosition(params) {
        nextChoiceListX = Number(params["X"]);
        nextChoiceListY = Number(params["Y"]);
    }
    
    function setDefaultChoiceListWindowSettings() {
        nextChoiceListX = -1;
        nextChoiceListY = -1;
    }

    function calculateSize(defaultValue, plaginValue, commandValue) {
        if (commandValue > 0 && commandValue <= defaultValue) {
            return commandValue;
        }
        
        if (plaginValue > 0 && plaginValue <= defaultValue) {
            return plaginValue;
        }
        
        return defaultValue;
    }

    function setDimColor(param) {
        if (param == undefined || param == "") {
            return "";
        }

        const obj = JSON.parse(param);
        const opacity = Number(obj["opacity"]) / 100;
        return `rgba(${obj["red"]}, ${obj["green"]}, ${obj["blue"]}, ${opacity})`;
    }

    function setDimColors(params) {
        dimColor1 = setDimColor(params["dimColor1"]);
        dimColor2 = setDimColor(params["dimColor2"]);
    }

    function defaultDimColors() {
        dimColor1 = "";
        dimColor2 = "";
    }

    const Origin_messageWindowRect = Scene_Message.prototype.messageWindowRect;
    Scene_Message.prototype.messageWindowRect = function() {
        var rect = Origin_messageWindowRect.call(this);
        rect.width = calculateSize(rect.width, messageWindowWidth, nextMessageWindowWidth);
        rect.height = calculateSize(rect.height, messageWindowHeight, nextMessageWindowHeight);
        rect.x = (Graphics.boxWidth - rect.width) / 2;
        rect.x += nextMessageWindowHorizontalOffset < 1 
            ? messageWindowHorizontalOffset 
            : nextMessageWindowHorizontalOffset;
        return rect;
    };
    
    const Origin_messageUpdatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        Origin_messageUpdatePlacement.call(this);
        
        if (nextMessageWindowY > -1) {
            this.y = nextMessageWindowY;
            
            const goldWindow = this._goldWindow;
            if (goldWindow) {
                goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - goldWindow.height;
            }
        }
    };

    const Origin_Window_Base_messageUpdatePlacement = Window_Base.prototype.refreshDimmerBitmap;
    Window_Message.prototype.refreshDimmerBitmap = function() {
        if (dimColor1 == "" && dimColor2 == "") {
            Origin_Window_Base_messageUpdatePlacement.call(this);
            return;
        }

        if (this._dimmerSprite) {
            const bitmap = this._dimmerSprite.bitmap;
            const w = this.width > 0 ? this.width + 8 : 0;
            const h = this.height;
            const m = this.padding;
            const c1 = dimColor1 == "" 
                ? ColorManager.dimColor1()
                : dimColor1;
            const c2 = dimColor2 == ""
                ? ColorManager.dimColor2()
                : dimColor2;
            bitmap.resize(w, h);
            bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
            bitmap.fillRect(0, m, w, h - m * 2, c1);
            bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
            this._dimmerSprite.setFrame(0, 0, w, h);
        }
    };
    
    const Origin_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function() {
        Origin_updatePlacement.call(this);
        
        if (nextChoiceListX > -1) {
            this.x = nextChoiceListX;
        }
        else {
            const positionType = $gameMessage.choicePositionType();
            if (positionType === 1) {
                this.x = (Graphics.boxWidth - this.windowWidth()) / 2;
            } else if (positionType === 2) {
                this.x =  this._messageWindow.x + this._messageWindow.width - this.windowWidth();
            } else {
                this.x =  this._messageWindow.x;
            }
        }
        
        if (nextChoiceListY > -1) {
            this.y = nextChoiceListY;
        }
    };

    Window_ChoiceList.prototype.refreshDimmerBitmap = function() {
        if (dimColor1 == "" && dimColor2 == "") {
            Origin_Window_Base_messageUpdatePlacement.call(this);
            return;
        }

        if (this._dimmerSprite) {
            const bitmap = this._dimmerSprite.bitmap;
            const w = this.width > 0 ? this.width + 8 : 0;
            const h = this.height;
            const m = this.padding;
            const c1 = dimColor1 == "" 
                ? ColorManager.dimColor1()
                : dimColor1;
            const c2 = dimColor2 == ""
                ? ColorManager.dimColor2()
                : dimColor2;
            bitmap.resize(w, h);
            bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
            bitmap.fillRect(0, m, w, h - m * 2, c1);
            bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
            this._dimmerSprite.setFrame(0, 0, w, h);
        }
    };

    Window_NameBox.prototype.refreshDimmerBitmap = function() {
        if (dimColor1 == "" && dimColor2 == "") {
            Origin_Window_Base_messageUpdatePlacement.call(this);
            return;
        }

        if (this._dimmerSprite) {
            const bitmap = this._dimmerSprite.bitmap;
            const w = this.width > 0 ? this.width + 8 : 0;
            const h = this.height;
            const m = this.padding;
            const c1 = dimColor1 == "" 
                ? ColorManager.dimColor1()
                : dimColor1;
            const c2 = dimColor2 == ""
                ? ColorManager.dimColor2()
                : dimColor2;
            bitmap.resize(w, h);
            bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
            bitmap.fillRect(0, m, w, h - m * 2, c1);
            bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
            this._dimmerSprite.setFrame(0, 0, w, h);
        }
    };
}());
