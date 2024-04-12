//=============================================================================
// Phileas_SkippingMessages.js
//=============================================================================
// [Update History]
// 2022.September.3 Ver1.0.0 First Release
// 2023.July.25 Ver1.1.0 Added skip speed selection
//                       Added commands that allow to change the text skip key and skip speed during the game
// 2024.February.05 Ver1.2.0 Added mouse support

/*
Title: Phileas_SkippingMessages
Author: Phileas
Site: https://boosty.to/phileas
E-mail: olek.olegovich@gmail.com
Version: 1.2.0
First release: 2022.September.3
Last release: 2024.February.05
*/

/*ru
Название: Phileas_SkippingMessages
Автор: Phileas
Сайт: https://boosty.to/phileas
E-mail: olek.olegovich@gmail.com
Версия: 1.2.0
Первый релиз: 03.09.2022
Последний релиз: 05.02.2024
*/

/*:
 * @target MZ
 * @plugindesc The plugin allows to skip messages by pressing any key
 * @author Phileas
 *
 * @param Default skip key
 * @type string
 * @desc String identifier of the key
 * @default control
 *
 * @param Default skip speed
 * @type combo
 * @option Slow
 * @option Fast
 * @default Slow
 *
 * @command setSkipKey
 * @text Set the skip key
 * @desc Assigns a new messages skip key.
 * @arg keyName
 * @text Key name
 * @type string
 * @default control
 *
 * @command setSkipSpeed
 * @text Set the skip speed
 * @desc Assigns a new messages skip speed.
 * @arg skipSpeed
 * @text Skip speed
 * @type combo
 * @option Slow
 * @option Fast
 * @default Slow
 *
 * @help
 * To assign a keyboard key, use a unique string identifier. If you haven't redefined them, then they look like this:
 *     9: "tab", // tab
 *     13: "ok", // enter
 *     16: "shift", // shift
 *     17: "control", // control
 *     18: "control", // alt
 *     27: "escape", // escape
 *     32: "ok", // space
 *     33: "pageup", // pageup
 *     34: "pagedown", // pagedown
 *     37: "left", // left arrow
 *     38: "up", // up arrow
 *     39: "right", // right arrow
 *     40: "down", // down arrow
 *     45: "escape", // insert
 *     81: "pageup", // Q
 *     87: "pagedown", // W
 *     88: "escape", // X
 *     90: "ok", // Z
 *     96: "escape", // numpad 0
 *     98: "down", // numpad 2
 *     100: "left", // numpad 4
 *     102: "right", // numpad 6
 *     104: "up", // numpad 8
 *     120: "debug" // F9
 *
 * You can also choose the speed of text skipping: slow or fast.
 * 
 * The plugin provides 2 commands, their arguments duplicate the parameters:
 * 0) Set the skip key - assigns a new messages skip key.
 * 1) Set the skip speed - assigns a new messages skip speed.
 *
 * You can always write to the author if you need other features or even plugins.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
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
 * @plugindesc Плагин позволяет пропускать сообщения нажатием любой клавиши
 * @author Phileas
 *
 * @param Default skip key
 * @text Клавиша пропуска по умолчанию
 * @type string
 * @desc String identifier of the key
 * @default control
 *
 * @param Default skip speed
 * @text Скорость пропуска по умолчанию
 * @desc Slow - медленно, Fast - быстро.
 * @type combo
 * @option Slow
 * @option Fast
 * @default Slow
 *
 * @command setSkipKey
 * @text Установить клавишу пропуска
 * @desc Назначает новую клавишу пропуска сообщений.
 * @arg keyName
 * @text Название клавиши
 * @type string
 * @default control
 *
 * @command setSkipSpeed
 * @text Установить скорость пропуска
 * @desc Назначает новую скорость пропуска сообщений.
 * @arg skipSpeed
 * @text Скорость пропуска
 * @type combo
 * @option Slow
 * @option Fast
 * @default Slow
 *
 * @help
 * Чтобы назначить клавишу клавиатуры, используйте её уникальный строковый идентификатор. Если вы не переопределили их, то они выглядят так:
 *     9: "tab", // tab
 *     13: "ok", // enter
 *     16: "shift", // shift
 *     17: "control", // control
 *     18: "control", // alt
 *     27: "escape", // escape
 *     32: "ok", // space
 *     33: "pageup", // pageup
 *     34: "pagedown", // pagedown
 *     37: "left", // left arrow
 *     38: "up", // up arrow
 *     39: "right", // right arrow
 *     40: "down", // down arrow
 *     45: "escape", // insert
 *     81: "pageup", // Q
 *     87: "pagedown", // W
 *     88: "escape", // X
 *     90: "ok", // Z
 *     96: "escape", // numpad 0
 *     98: "down", // numpad 2
 *     100: "left", // numpad 4
 *     102: "right", // numpad 6
 *     104: "up", // numpad 8
 *     120: "debug" // F9
 *
 * Вы также можете выбрать скорость пропуска текста: медленную или быструю.
 * 
 * Плагин предоставляет 2 команды, их аргументы дублируют параметры:
 * 0) Установить клавишу пропуска - назначает новую клавишу пропуска сообщений.
 * 1) Установить скорость пропуска - назначает новую скорость пропуска сообщений.
 *
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Телеграм: olekolegovich
 * 
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(function() {

//--------MY CODE:
    var parameters = PluginManager.parameters("Phileas_SkippingMessages");
    var skipKeyName = String(parameters["Default skip key"] || "control");
    var isFastMode = parameters["Default skip speed"] == "Fast";
    var skipFlag = false;
    
    PluginManager.registerCommand("Phileas_SkippingMessages", "setSkipKey", setSkipKey);
    PluginManager.registerCommand("Phileas_SkippingMessages", "setSkipSpeed", setSkipSpeed);
    
    setSkipOnCancel();
    
    function setSkipKey(params) {
        let keyName = params['keyName'];
        skipKeyName = keyName;
        setSkipOnCancel();
    }
    
    function setSkipSpeed(params) {
        let skipSpeed = params['skipSpeed'];
        isFastMode = skipSpeed == "Fast";
    }
    
    function setSkipOnCancel() {
        if (skipKeyName !== "escape") {
            document.removeEventListener("mousedown", skippingMouseDownHandler);
            document.removeEventListener("mouseup", skippingMouseUpHandler);
            return;
        }
        
        document.addEventListener("mousedown", skippingMouseDownHandler);
        document.addEventListener("mouseup", skippingMouseUpHandler);
    }
    
    function skippingMouseDownHandler(event) {
        if (event.button == 2) {
            skipFlag = true;
        }
    };
    
    function skippingMouseUpHandler(event) {
        if (event.button == 2) {
            skipFlag = false;
        }
    };
    
    function isSkipKeyPressed() {
        return Input.isPressed(skipKeyName)
            || skipKeyName === "ok" && TouchInput.isLongPressed()
            || skipFlag;
    }

//--------CHANGED CORE:

    const Original_isTriggered = Window_Message.prototype.isTriggered;
    Window_Message.prototype.isTriggered = function() {
        if (isSkipKeyPressed()) {
            this._pauseSkip = isFastMode;
            return true;
        }

        return Original_isTriggered.call(this);
    };
}());
