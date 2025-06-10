//=============================================================================
// Phileas_SkippingMessages.js
//=============================================================================
// [Update History]
// 2022.September.3 Ver1.0.0 First Release
// 2023.July.25 Ver1.1.0 Added skip speed selection
//                       Added commands that allow to change the text skip key and skip speed during the game
// 2024.February.05 Ver1.2.0 Added mouse support
// 2024.October.15 Ver1.3.0 Added skip only seen feature

/*:
 * @target MZ
 * @plugindesc v1.3.0 The plugin allows to skip messages by pressing any key
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
 * @param skipUnseenSection
 * @text Skip unseen
 * 
 * @param skipUnseenFeatureEnabled
 * @parent skipUnseenSection
 * @text Is skip only seen feature enabled
 * @type boolean
 * @default false
 * @desc If it is off, feature will not work
 * 
 * @param defaultSkipUnseen
 * @parent skipUnseenSection
 * @text Default skip unseen
 * @type boolean
 * @default false
 * 
 * @param skipUnseenSwitch
 * @parent skipUnseenSection
 * @text Skip unseen switch
 * @type switch
 * @default 0
 * @desc If the switch is on, unseen text will be skipped.
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
 * @command skipUnseen
 * @text Skip unseen
 * 
 * @command dontSkipUnseen
 * @text Don`t skip unseen
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
 * The plugin provides 4 commands:
 * 0) Set the skip key - assigns a new messages skip key.
 * 1) Set the skip speed - assigns a new messages skip speed.
 * 2) Skip unseen.
 * 3) Don`t skip unseen.
 * 
 * The plugin allows you to allow only read text to be skipped
 * (unread text will not be skipped).
 * To do this, you need to enable the skip read-only text function and
 * configure the skip read/unread text option.
 * 
 * You can add an option to the settings menu using the Phileas_OptionsManager plugin!
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
 * @plugindesc v1.3.0 Плагин позволяет пропускать сообщения нажатием любой клавиши
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
 * @param skipUnseenSection
 * @text Пропуск непрочитанного
 * 
 * @param skipUnseenFeatureEnabled
 * @parent skipUnseenSection
 * @text Функция пропуска только прочитанного включена?
 * @type boolean
 * @default false
 * @desc Если выключено, функция не будет работать
 * 
 * @param defaultSkipUnseen
 * @parent skipUnseenSection
 * @text Пропускать непрочитанное по умолчанию
 * @type boolean
 * @default false
 * 
 * @param skipUnseenSwitch
 * @parent skipUnseenSection
 * @text Переключатель пропуска непрочитанного
 * @type switch
 * @default 0
 * @desc Если переключатель включён, будет пропускаться непрочитанный текст.
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
 * @command skipUnseen
 * @text Пропускать непрочитанное
 * 
 * @command dontSkipUnseen
 * @text Не пропускать непрочитанное
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
 * Плагин предоставляет 4 команды:
 * 0) Установить клавишу пропуска - назначает новую клавишу пропуска сообщений.
 * 1) Установить скорость пропуска - назначает новую скорость пропуска сообщений.
 * 2) Пропускать непрочитанное.
 * 3) Не пропускать непрочитанное.
 * 
 * Плагин позволяет разрешить пропускать только прочитанный текст
 * (непрочитанный нельзя будет пропустить).
 * Для эту необходимо включить функцию пропуска только прочитанного текста и
 * настроить опцию пропуска прочитанного/непрочитанного текста.
 * 
 * Вы можете добавить опцию в меню настроек с помощью плагина Phileas_OptionsManager!
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
    const seenCashFileName = "seenMsgCash";

    var parameters = PluginManager.parameters("Phileas_SkippingMessages");
    var skipKeyName = String(parameters["Default skip key"] || "control");
    var defaultFastMode = parameters["Default skip speed"] == "Fast";
    var skipUnseenFeatureEnabled = parameters["skipUnseenFeatureEnabled"] == "true";
    var defaultSkipUnseen = parameters["defaultSkipUnseen"] == "true";
    var skipUnseenSwitch = Number(parameters["skipUnseenSwitch"]);
    
    var skipFlag = false;
    var isFastMode = false;
    var skipUnseenOn = false;

    // { mapId: { eventId: Set { commandId } } }
    var seenCash = new Map();
    
    PluginManager.registerCommand("Phileas_SkippingMessages", "setSkipKey", setSkipKey);
    PluginManager.registerCommand("Phileas_SkippingMessages", "setSkipSpeed", setSkipSpeed);
    PluginManager.registerCommand("Phileas_SkippingMessages", "skipUnseen", skipUnseen);
    PluginManager.registerCommand("Phileas_SkippingMessages", "dontSkipUnseen", dontSkipUnseen);
    
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

    function skipUnseen() {
        skipUnseen = true;
    }

    function dontSkipUnseen() {
        skipUnseen = false;
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

    function isSkipUnseenEnabled() {
        if (!skipUnseenFeatureEnabled || skipUnseenOn) {
            return true;
        }

        if (skipUnseenSwitch == 0) {
            return false;
        }

        return $gameSwitches.value(skipUnseenSwitch);
    }

    // tag: [mapId, eventId, commandId]
    function addSeenCash(tag) {
        const mapId = tag[0];
        const eventId = tag[1];
        const commandId = tag[2];

        if (seenCash.get(mapId) == undefined) {
            seenCash.set(mapId, new Map());
        }

        const mapCash = seenCash.get(mapId);

        if (mapCash.get(eventId) == undefined) {
            mapCash.set(eventId, new Set());
        }

        const eventCash = mapCash.get(eventId);
        eventCash.add(commandId);
    }

    function checkSeenCash(tag) {
        const mapId = tag[0];
        const eventId = tag[1];
        const commandId = tag[2];

        const mapCash = seenCash.get(mapId);
        if (mapCash == undefined) {
            return false;
        }

        const eventCash = mapCash.get(eventId);

        if (eventCash == undefined) {
            return false;
        }

        return eventCash.has(commandId);
    }

    function saveSeenCash() {
        const serialized = {};

        for (const [key, mapCash] of seenCash.entries()) {
            const serializedMapCash = {};

            for (const [mapKey, setValue] of mapCash.entries()) {
                serializedMapCash[mapKey] = Array.from(setValue);
            }

            serialized[key] = serializedMapCash
        }

        const json = JSON.stringify(serialized);
        StorageManager.saveObject(seenCashFileName, json);
    }

    function loadSeenCash() {
        StorageManager.loadObject(seenCashFileName).then(json => {
            parsed = JSON.parse(json);
            seenCash = new Map();

            for (const [key, mapCash] of Object.entries(parsed)) {
                const map = new Map();

                for (const [mapKey, setValue] of Object.entries(mapCash)) {
                    map.set(Number(mapKey), new Set(setValue));
                }

                seenCash.set(Number(key), map);
            }

            return 0;
        })
        .catch(() => {
            console.warn("Could not load seen messages cash!");
        });
    }

//--------MODIFIED CODE:

    if (skipUnseenFeatureEnabled) {
        const Origin_SceneManager_terminate = SceneManager.terminate;
        SceneManager.terminate = function() {
            saveSeenCash();
            Origin_SceneManager_terminate.call(this);
        };

        window.onbeforeunload = function() {
            saveSeenCash();
        };

        Window_Message.prototype.phileasGetEventId = function() {
            const interpreter = $gameMap._interpreter;
            return interpreter ? interpreter.eventId() : 0;
        };
    
        Window_Message.prototype.phileasGetCommandId = function() {
            const interpreter = $gameMap._interpreter;
            return interpreter ? interpreter._index : 0;
        };

        Window_Message.prototype.phileasGetTag = function() {
            const mapId = $gameMap.mapId();
            const eventId = this.phileasGetEventId();
            const commandId = this.phileasGetCommandId();

            return [mapId, eventId, commandId];
        };

        const Original_isTriggered = Window_Message.prototype.isTriggered;
        Window_Message.prototype.isTriggered = function() {
            if (isSkipKeyPressed()) {
                const isMsgSeen = checkSeenCash(this.phileasGetTag());
                if (isMsgSeen || isSkipUnseenEnabled()) {
                    this._pauseSkip = isFastMode;
                    return true;
                }
            }

            return Original_isTriggered.call(this);
        };

        const Original_terminateMessage = Window_Message.prototype.terminateMessage;
        Window_Message.prototype.terminateMessage = function() {
            addSeenCash(this.phileasGetTag());
            Original_terminateMessage.call(this);
        };
    } else {
        const Original_isTriggered = Window_Message.prototype.isTriggered;
        Window_Message.prototype.isTriggered = function() {
            if (isSkipKeyPressed()) {
                this._pauseSkip = isFastMode;
                return true;
            }

            return Original_isTriggered.call(this);
        };
    }

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        Origin_setupNewGame.call(this);
        isFastMode = defaultFastMode;
        skipUnseenOn = defaultSkipUnseen;

        if (skipUnseenFeatureEnabled) {
            loadSeenCash();
        }
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasSkippingMessages_isFastMode = isFastMode;
        contents.phileasSkippingMessages_skipUnseenOn = skipUnseenOn;

        if (skipUnseenFeatureEnabled) {
            saveSeenCash();
        }

        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        Origin_extractSaveContents.call(this, contents);
        isFastMode = contents.phileasSkippingMessages_isFastMode;
        skipUnseenOn = contents.phileasSkippingMessages_skipUnseenOn;
    };
}());
