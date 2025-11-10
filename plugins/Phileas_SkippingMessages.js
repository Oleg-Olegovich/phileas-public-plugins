//=============================================================================
// Phileas_SkippingMessages.js
//=============================================================================
// [Update History]
// 2022.September.3 Ver1.0.0 First Release
// 2023.July.25 Ver1.1.0 Added skip speed selection
//                       Added commands that allow to change the text skip key and skip speed during the game
// 2024.February.05 Ver1.2.0 Added mouse support
// 2024.October.15 Ver1.3.0 Added skip only seen feature
// 2025.August.13 Ver1.3.1 Added skip disabling feature
// 2025.November.10 Ver1.4.0 Added the ability to assign a key by numeric code
//                           Added menu button

/*:
 * @target MZ
 * @plugindesc v1.4.0 The plugin allows to skip messages by pressing any key
 * @author Phileas
 * 
 * @param fastForward
 * @text Fast Forward
 *
 * @param defaultSkipKey
 * @parent fastForward
 * @text Default Skip Key
 * @type string
 * @desc String identifier of the key
 * @default control
 *
 * @param defaultSkipKeyCode
 * @parent fastForward
 * @text Skip Key Numeric Code
 * @desc If it is greater than 0, the parameter with the name is ignored
 * @type number
 * @default 0
 *
 * @param defaultSkipSpeed
 * @parent fastForward
 * @text Default Skip Speed
 * @type combo
 * @option Slow
 * @option Fast
 * @default Slow
 * 
 * 
 * @param fastForwardButton
 * @text Fast Forward Button
 * 
 * @param fastForwardButtonFile
 * @parent fastForwardButton
 * @text Button Picture
 * @desc If the picture is not specified, the button will not be displayed
 * @type file
 * @dir /img/system/
 * 
 * @param fastForwardButtonFilePressed
 * @parent fastForwardButton
 * @text Button Picture (pressed)
 * @desc If the picture is not specified, the default picture will be used
 * @type file
 * @dir /img/system/
 * 
 * @param fastForwardButtonX
 * @parent fastForwardButton
 * @text The X coordinate
 * @type number
 * @default 576
 * 
 * @param fastForwardButtonY
 * @parent fastForwardButton
 * @text The Y coordinate
 * @type number
 * @default 2
 * 
 * 
 * @param skipUnseenSection
 * @text Skip Unseen
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
 * @arg keyCode
 * @text Key Numeric Code
 * @desc ЕIf it is greater than 0, the argument with the name is ignored
 * @type number
 * @default 0
 *
 * @command setSkipSpeed
 * @text Set the skip speed
 * @desc Assigns a new messages skip speed.
 * @arg skipSpeed
 * @text Skip speed
 * @type combo
 * @option Slow
 * @option Fast
 * @default Fast
 * 
 * @command skipUnseen
 * @text Skip unseen
 * 
 * @command dontSkipUnseen
 * @text Don`t skip unseen
 * 
 * @command enableSkip
 * @text Allow skipping
 * 
 * @command disableSkip
 * @text Prohibit skipping
 *
 * @command enableFastForward
 * @text Allow default fast forward
 *
 * @command disableFastForward
 * @text Prohibit default fast forward
 *
 * @help
 * To assign a keyboard key, use a unique string identifier.
 * If you haven't redefined them, then they look like this:
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
 * Alternatively, you can specify a numeric key code,
 * if the desired key is not in the default dictionary of the engine.
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
 * @plugindesc v1.4.0 Плагин позволяет пропускать сообщения нажатием любой клавиши
 * @author Phileas
 * 
 * @param fastForward
 * @text Быстрая промотка
 *
 * @param defaultSkipKey
 * @parent fastForward
 * @text Клавиша пропуска по умолчанию
 * @type string
 * @desc Строковый идентификатор 
 * @default control
 *
 * @param defaultSkipKeyCode
 * @parent fastForward
 * @text Числовой код клавишы пропуска
 * @desc Если больше 0, то параметр с названием игнорируется
 * @type number
 * @default 0
 *
 * @param defaultSkipSpeed
 * @parent fastForward
 * @text Скорость пропуска по умолчанию
 * @desc Slow - медленно, Fast - быстро.
 * @type combo
 * @option Slow
 * @option Fast
 * @default Fast
 * 
 * 
 * @param fastForwardButton
 * @text Кнопка пропуска
 * 
 * @param fastForwardButtonFile
 * @parent fastForwardButton
 * @text Картинка кнопки
 * @desc Если картинка не указана, то кнопка не будет отображаться
 * @type file
 * @dir /img/system/
 * 
 * @param fastForwardButtonFilePressed
 * @parent fastForwardButton
 * @text Картинка кнопки (при нажатии)
 * @desc Если картинка не указана, то будет использоваться стандартная картинка
 * @type file
 * @dir /img/system/
 * 
 * @param fastForwardButtonX
 * @parent fastForwardButton
 * @text Координата X
 * @type number
 * @default 576
 * 
 * @param fastForwardButtonY
 * @parent fastForwardButton
 * @text Координата Y
 * @type number
 * @default 2
 * 
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
 * @desc Назначает новую клавишу пропуска сообщений, используйте имя или код.
 * @arg keyName
 * @text Название клавиши
 * @type string
 * @default control
 * @arg keyCode
 * @text Числовой код клавиши
 * @desc Если больше 0, то аргумент с названием игнорируется
 * @type number
 * @default 0
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
 * @command enableSkip
 * @text Разрешить пропуск
 * 
 * @command disableSkip
 * @text Запретить пропуск
 *
 * @command enableFastForward
 * @text Разрешить стандартную перемотку
 *
 * @command disableFastForward
 * @text Запретить стандартную перемотку
 *
 * @help
 * Чтобы назначить клавишу клавиатуры,
 * используйте её уникальный строковый идентификатор.
 * Если вы не переопределили их, то они выглядят так:
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
 * Либо вы можете указать числовой код клавиши,
 * если нужной клавиши нет в стандартном словаре движка.
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

"use strict";

(function() {

//-----------------------------------------------------------------------------
// MY CODE

//-----------------------------------------------------------------------------
// Data

    const $seenCashFileName = "seenMsgCash";

    const $parameters = PluginManager.parameters("Phileas_SkippingMessages");
    let $skipKeyName = null;
    setSkipKey($parameters["defaultSkipKey"], $parameters["defaultSkipKeyCode"]);
    const $defaultFastMode = $parameters["defaultSkipSpeed"] == "Fast";
    const $skipUnseenFeatureEnabled = $parameters["skipUnseenFeatureEnabled"] == "true";
    const $defaultSkipUnseen = $parameters["defaultSkipUnseen"] == "true";
    const $skipUnseenSwitch = Number($parameters["skipUnseenSwitch"]);

    const $fastForwardButton = {
        file: $parameters["fastForwardButtonFile"],
        filePressed: $parameters["fastForwardButtonFilePressed"],
        x: Number($parameters["fastForwardButtonX"] || 576),
        y: Number($parameters["fastForwardButtonY"] || 2)
    };
    
    let $skipEnabled = true;
    let $fastForwardEnabled = true;

    let $skipFlag = false;
    let $isFastMode = false;
    let $skipUnseenOn = false;

    // { mapId: { eventId: Set { commandId } } }
    let seenCash = new Map();

    setSkipOnCancel();


//-----------------------------------------------------------------------------
// Commands
    
    PluginManager.registerCommand("Phileas_SkippingMessages", "setSkipKey", setSkipKeyByCommand);
    PluginManager.registerCommand("Phileas_SkippingMessages", "setSkipSpeed", setSkipSpeed);
    PluginManager.registerCommand("Phileas_SkippingMessages", "skipUnseen", skipUnseen);
    PluginManager.registerCommand("Phileas_SkippingMessages", "dontSkipUnseen", dontSkipUnseen);
    PluginManager.registerCommand("Phileas_SkippingMessages", "enableSkip", enableSkip);
    PluginManager.registerCommand("Phileas_SkippingMessages", "disableSkip", disableSkip);
    PluginManager.registerCommand("Phileas_SkippingMessages", "enableFastForward", enableFastForward);
    PluginManager.registerCommand("Phileas_SkippingMessages", "disableFastForward", disableFastForward);

    function setSkipKeyByCommand(params) {
        const keyName = params["keyName"];
        const keyCode = params["keyCode"];
        setSkipKey(keyName, keyCode);
    }
    
    function setSkipSpeed(params) {
        const skipSpeed = params["skipSpeed"];
        $isFastMode = skipSpeed == "Fast";
    }

    function skipUnseen() {
        skipUnseen = true;
    }

    function dontSkipUnseen() {
        skipUnseen = false;
    }

    function enableSkip() {
        $skipEnabled = true;
    }

    function disableSkip() {
        $skipEnabled = false;
    }

    function enableFastForward() {
        $fastForwardEnabled = true;
    }

    function disableFastForward() {
        $fastForwardEnabled = false;
    }


//-----------------------------------------------------------------------------
// Main
    
    function setSkipKey(name, code) {
        name = String($parameters["defaultSkipKey"] || "control");
        code = Number(code || "0");

        if (code === 0) {
            $skipKeyName = name;
        } else {
            if (Input.keyMapper[code]) {
                $skipKeyName = Input.keyMapper[code];
            } else {
                $skipKeyName = "phileasFastForward";
                Input.keyMapper[code] = $skipKeyName;
            }
        }
        
        setSkipOnCancel();
    }
    
    function setSkipOnCancel() {
        if ($skipKeyName !== "escape") {
            document.removeEventListener("mousedown", skippingMouseDownHandler);
            document.removeEventListener("mouseup", skippingMouseUpHandler);
            return;
        }
        
        document.addEventListener("mousedown", skippingMouseDownHandler);
        document.addEventListener("mouseup", skippingMouseUpHandler);
    }
    
    function skippingMouseDownHandler(event) {
        if (event.button == 2) {
            $skipFlag = true;
        }
    };
    
    function skippingMouseUpHandler(event) {
        if (event.button == 2) {
            $skipFlag = false;
        }
    };
    
    function isSkipKeyPressed() {
        if (!$skipEnabled) {
            return false;
        }

        const scene = SceneManager._scene;

        return scene instanceof Scene_Message && scene.isFastForwardButtonPressed()
            || Input.isPressed($skipKeyName)
            || $skipKeyName === "ok" && TouchInput.isLongPressed()
            || $skipFlag;
    }

    function isSkipUnseenEnabled() {
        if (!$skipUnseenFeatureEnabled || $skipUnseenOn) {
            return true;
        }

        if ($skipUnseenSwitch == 0) {
            return false;
        }

        return $gameSwitches.value($skipUnseenSwitch);
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
        StorageManager.saveObject($seenCashFileName, json);
    }

    function loadSeenCash() {
        StorageManager.loadObject($seenCashFileName).then(json => {
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


//-----------------------------------------------------------------------------
// Sprites

    function Sprite_PhilesSkipButton() {
        this.initialize(...arguments);
    }

    Sprite_PhilesSkipButton.prototype = Object.create(Sprite_Button.prototype);
    Sprite_PhilesSkipButton.prototype.constructor = Sprite_PhilesSkipButton;

    Sprite_PhilesSkipButton.prototype.initialize = function(file, filePressed) {
        Sprite_Clickable.prototype.initialize.call(this);

        this._defaultBitmap = ImageManager.loadSystem(file);
        this._pressedBitmap = filePressed ? ImageManager.loadSystem(filePressed) : this._defaultBitmap;
        this._clickHandler = null;

        this.updateFrame();
        this.updateOpacity();
    };

    Sprite_PhilesSkipButton.prototype.updateFrame = function() {
        this.bitmap = this.isPressed() ? this._pressedBitmap : this._defaultBitmap;
    };

    Sprite_PhilesSkipButton.prototype.checkBitmap = function() {
    };

    Sprite_Button.prototype.onClick = function() {
        if (this._clickHandler) {
            this._clickHandler();
        }
    };


//-----------------------------------------------------------------------------
// Scenes

    Scene_Map.prototype.createFastForwardButton = function() {
        if (!$fastForwardButton.file) {
            return;
        }

        this._fastForwardButton = new Sprite_PhilesSkipButton($fastForwardButton.file, $fastForwardButton.filePressed);
        this._fastForwardButton.x = $fastForwardButton.x;
        this._fastForwardButton.y = $fastForwardButton.y;
        this._fastForwardButton.visible = false;

        this.addWindow(this._fastForwardButton);
    };

    Scene_Map.prototype.updateSkipButtons = function() {
        if (!this._menuButton) {
            return;
        }

        if (this._fastForwardButton) {
            this._fastForwardButton.visible = this._menuButton.visible;
        }
    };

    Scene_Map.prototype.isFastForwardButtonPressed = function() {
        return this._fastForwardButton && this._fastForwardButton.isPressed();
    };


//-----------------------------------------------------------------------------
// MODIFIED CODE

//-----------------------------------------------------------------------------
// Windows

    if ($skipUnseenFeatureEnabled) {
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
                    this._pauseSkip = $isFastMode;
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
                this._pauseSkip = $isFastMode;
                return true;
            }

            return Original_isTriggered.call(this);
        };
    }

    Window_Message.prototype.updateShowFast = function() {
        if (this.isTriggered() && $fastForwardEnabled) {
            this._showFast = true;
        }
    };


//-----------------------------------------------------------------------------
// Scenes

    const Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function() {
        Scene_Map_createButtons.call(this);
        this.createFastForwardButton();
    };

    const Scene_Map_updateMenuButton = Scene_Map.prototype.updateMenuButton;
    Scene_Map.prototype.updateMenuButton = function() {
        Scene_Map_updateMenuButton.call(this);
        this.updateSkipButtons();
    };

    const Scene_Map_hideMenuButton = Scene_Map.prototype.hideMenuButton;
    Scene_Map.prototype.hideMenuButton = function() {
        Scene_Map_hideMenuButton.call(this);
        this.updateSkipButtons();
    };


//-----------------------------------------------------------------------------
// Managers

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        $isFastMode = $defaultFastMode;
        $skipUnseenOn = $defaultSkipUnseen;

        if ($skipUnseenFeatureEnabled) {
            loadSeenCash();
        }
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasSkippingMessages_skipEnabled = $skipEnabled;
        contents.phileasSkippingMessages_fastForwardEnabled = $fastForwardEnabled;
        contents.phileasSkippingMessages_isFastMode = $isFastMode;
        contents.phileasSkippingMessages_skipUnseenOn = $skipUnseenOn;

        if ($skipUnseenFeatureEnabled) {
            saveSeenCash();
        }

        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        $skipEnabled = contents.phileasSkippingMessages_skipEnabled === false
            ? false
            : true;
        $fastForwardEnabled = contents.phileasSkippingMessages_fastForwardEnabled === false
            ? false
            : true;
        $isFastMode = contents.phileasSkippingMessages_isFastMode === undefined
            ? $defaultFastMode
            : contents.phileasSkippingMessages_isFastMode;
        $skipUnseenOn = contents.phileasSkippingMessages_skipUnseenOn === undefined
            ? $defaultSkipUnseen
            : contents.phileasSkippingMessages_isFastMode;
    };

}());
