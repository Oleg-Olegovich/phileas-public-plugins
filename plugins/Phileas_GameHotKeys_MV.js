//=============================================================================
// Phileas_GameHotKeys_MV.js
//=============================================================================
// [Update History]
// 2023.July.17 Ver1.0.0 First Release
// 2023.August.24 Ver1.0.1 Fixed gamepad
// 2024.January.19 Ver1.1.0 Added common event block
// 2024.January.21 Ver1.1.1 Added the disable command
// 2024.January.29 Ver1.1.2 Common events are set via the common events menu
// 2025.January.01 Ver1.2.0 Removed unused event listeners

/*:
 * @target MV
 * @plugindesc Assigns common events and switches to keyboard, gamepad, and mouse keys
 * @author Phileas
 *
 * @param Common events
 * @type struct<CommonEvents>[]
 * @default []
 *
 * @param Switches
 * @type struct<Switches>[]
 * @default []
 *
 *
 *
 * @help
 * Use the plugin command to turn it on or off.
 * Enabling the plugin:
 *   Phileas_GameHotKeys_SetHotKeysState true
 * Disabling the plugin:
 *   Phileas_GameHotKeys_SetHotKeysState false
 * 
 * The plugin has 2 parameters: Common Events and Switches. They differ only in one field: in Common Events, the number of the common event is set, and in Switch - the switch. The other fields are shared:
 * - Device type - the device that you want to track clicks on.
 * - Key name - string identifier of the button.
 * - Key number - numeric identifier of the button.
 *
 * Starting from version 1.1.0, blocking can be enabled in General Events. If it is enabled, then you can retriggered the event only after it completes execution.
 *
 *
 * First, the plugin searches for the Key name in the standard dictionaries of the engine. If you haven't redefined them, then they look like this:
 * 
 * keyBoard:
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
 * gamepad:
 *     0: "ok", // A
 *     1: "cancel", // B
 *     2: "shift", // X
 *     3: "menu", // Y
 *     4: "pageup", // LB
 *     5: "pagedown", // RB
 *     12: "up", // D-pad up
 *     13: "down", // D-pad down
 *     14: "left", // D-pad left
 *     15: "right" // D-pad right
 * mouse:
 *     0: "left"
 *     1: "middle"
 *     2: "right"
 *
 * If the plugin has not found the Key name, then it takes the value of Key number.
 *
 * If a keyboard, gamepad, or mouse was pressed during the game, the plugin checks whether a general event or switch is assigned to the key. 
 * If a general event is assigned, it is executed. It is not recommended to specify a parallel or automatic event. If a switch is assigned, its value is reversed.
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

/*~struct~CommonEvents:
 * @param Device type
 * @type combo
 * @option Keyboard
 * @option Gamepad
 * @option Mouse
 * @default Keyboard
 *
 * @param Key number
 * @type number
 * @default 0
 *
 * @param Key name
 * @type name
 * @desc Special key name
 * @default name
 *
 * @param Common event
 * @desc The general event will be executed. It is not recommended to use parallel and automatic events here.
 * @type common_event
 * @default 1
 *
 * @param Block
 * @desc If true, the event can be retriggered only after it completes execution.
 * @type boolean
 * @default true
 */

/*~struct~Switches:
 * @param Device type
 * @type combo
 * @option Keyboard
 * @option Gamepad
 * @option Mouse
 * @default Keyboard
 *
 * @param Key number
 * @type number
 * @default 0
 *
 * @param Key name
 * @desc Special key name
 * @default name
 *
 * @param Switch
 * @desc The switch will change the value to the opposite.
 * @type switch
 */
 
/*:ru
 * @target MZ
 * @plugindesc Назначает общие события и переключатели на клавиши клавиатуры, геймпада и мыши
 * @author Phileas
 *
 * @param Common events
 * @text Общие события
 * @type struct<CommonEvents>[]
 * @default []
 *
 * @param Switches
 * @text Переключатели
 * @type struct<Switches>[]
 * @default []
 *
 *
 * @help
 * Используйте команду плагина, чтобы включить или выключить его.
 * Включение плагина:
 *   Phileas_GameHotKeys_SetHotKeysState true
 * Выключение плагина:
 *   Phileas_GameHotKeys_SetHotKeysState false
 * 
 * Плагин имеет 2 параметра: Общие события и Переключатели. Они отличаются только одним полем: в Common Events задается номер общего события, а в Switch - переключатель. Остальные поля являются общими:
 * - Тип устройства - устройство, на котором вы хотите отслеживать клики.
 * - Имя клавиши - строковый идентификатор кнопки.
 * - Номер клавиши - числовой идентификатор кнопки.
 *
 * Начиная с версии 1.1.0, в Общих событиях можно включить блокировку. Если она включена, то повторно стриггерить событие можно будет только после того, как оно завершит выполнение.
 *
 *
 * Сначала плагин выполняет поиск названия ключа в стандартных словарях движка. Если вы не переопределили их, то они выглядят следующим образом:
 * 
 * клавиатура:
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
 * геймпад:
 *     0: "ok", // A
 *     1: "cancel", // B
 *     2: "shift", // X
 *     3: "menu", // Y
 *     4: "pageup", // LB
 *     5: "pagedown", // RB
 *     12: "up", // D-pad up
 *     13: "down", // D-pad down
 *     14: "left", // D-pad left
 *     15: "right" // D-pad right
 * мышь:
 *     0: "left"
 *     1: "middle"
 *     2: "right"
 *
 * Если плагин не нашел имя клавиши, то он принимает значение номера клавиши.
 *
 * Если во время игры была нажата клавиатура, геймпад или мышь, плагин проверяет, назначено ли клавише общее событие или переключатель.
 * Если назначено общее событие, оно выполняется. Не рекомендуется указывать параллельное или автоматическое событие. Если назначен переключатель, его значение меняется на обратное.
 *
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * Patreon: https://www.patreon.com/treeverse_games
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

/*~struct~CommonEvents:ru
 * @param Device type
 * @text Тип устройства
 * @type combo
 * @option Keyboard
 * @option Gamepad
 * @option Mouse
 * @default Keyboard
 *
 * @param Key number
 * @text Номер клавиши
 * @type number
 * @default 0
 *
 * @param Key name
 * @text Имя клавиши
 * @type name
 * @desc Специальное имя клавиши
 * @default name
 *
 * @param Common event
 * @text Общее событие
 * @desc Будет выполнено общее событие. Здесь не рекомендуется использовать параллельные и автоматические события.
 * @type common_event
 * @default 1
 *
 * @param Block
 * @text Блокировка
 * @desc Если true, то повторно стриггерить событие можно будет только после того, как оно завершит выполнение.
 * @type boolean
 * @default true
 */

/*~struct~Switches:ru
 * @param Device type
 * @text Тип устройства
 * @type combo
 * @option Keyboard
 * @option Gamepad
 * @option Mouse
 * @default Keyboard
 *
 * @param Key number
 * @text Номер клавиши
 * @type number
 * @default 0
 *
 * @param Key name
 * @text Имя клавиши
 * @desc Специальное имя клавиши
 * @default name
 *
 * @param Switch
 * @text Переключатель
 * @desc Переключатель изменит значение на противоположное.
 * @type switch
 */

(function() {

//--------DATA:
    const phileasMouseKeyMap = {
        "left": 0,
        "middle": 1,
        "right": 2
    }

    var parameters = PluginManager.parameters("Phileas_GameHotKeys_MV");
    var commonEventHotKeys = parsePluginParam(parameters["Common events"]);
    var switchHotKeys = parsePluginParam(parameters["Switches"]);
    var cehkKeyboard = undefined;
    var cehkGamepad = undefined;
    var cehkMouse = undefined;
    var shkKeyboard = undefined;
    var shkGamepad = undefined;
    var shkMouse = undefined;
    
    var blockedEvents = new Set();
    var disableHotKeys = false;

//--------MY CODE:
    function parsePluginParam(data) {
        if (data == undefined) {
            return undefined;
        }
        
        let arr = JSON.parse(data);
        for (let i = 0; i < arr.length; ++i) {
            arr[i] = JSON.parse(arr[i]);
        }
        
        return arr;
    }
    
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    
    function setHotKeysDictionaries(array, keyboardDict, gamepadDict, mouseDict, value) {
        for (let i = 0; i < array.length; ++i) {
            let code = array[i]["Key number"];
            let name = array[i]["Key name"];
            if (array[i]["Device type"] == "Keyboard") {
                let nameCode = getKeyByValue(Input.keyMapper, name);
                keyboardDict[nameCode == undefined ? code : nameCode] = Number(array[i][value]);
            }
            else if (array[i]["Device type"] == "Gamepad") {
                let nameCode = getKeyByValue(Input.gamepadMapper, name);
                gamepadDict[nameCode == undefined ? code : nameCode] = Number(array[i][value]);
            }
            else if (array[i]["Device type"] == "Mouse") {
                let nameCode = phileasMouseKeyMap[name];
                mouseDict[nameCode == undefined ? code : nameCode] = Number(array[i][value]);
            }
        }
    }
    
    function setCommonEventHotKeysDictionaries() {
        cehkKeyboard = {};
        cehkGamepad = {};
        cehkMouse = {};
        setHotKeysDictionaries(commonEventHotKeys, cehkKeyboard, cehkGamepad, cehkMouse, "Common event");
        
        for (let i = 0; i < commonEventHotKeys.length; ++i) {
            if (commonEventHotKeys[i]["Block"] == "true") {
                let id = Number(commonEventHotKeys[i]["Common event"]);
                $dataCommonEvents[id].list.phileasGameHotKeysBlock = true;
                $dataCommonEvents[id].list.phileasEventId = id;
            }
        }
    }
    
    function setSwitchHotKeysDictionaries() {
        shkKeyboard = {};
        shkGamepad = {};
        shkMouse = {};
        setHotKeysDictionaries(switchHotKeys, shkKeyboard, shkGamepad, shkMouse, "Switch");
    }
    
    function triggerPhileasCommonEvent(id) {
        if (id == undefined || $dataCommonEvents[id] == undefined) {
            return;
        }

        if ($dataCommonEvents[id].list.phileasGameHotKeysBlock === true) {
            if (blockedEvents.has(id)) {
                return;
            }
            
            blockedEvents.add(id);
        }

        $gameTemp.reserveCommonEvent(id);
    }
    
    function triggerPhileasSwitch(id) {
        if (id != undefined) {
            let s = $gameSwitches.value(id);
            $gameSwitches.setValue(id, !s);
        }
    }
    
    function triggerPhileasKeyboard(code) {
        if (disableHotKeys == true) {
            return;
        }

        triggerPhileasCommonEvent(cehkKeyboard[code]);
        triggerPhileasSwitch(shkKeyboard[code]);
    }
    
    function triggerPhileasGamepad(code) {
        if (disableHotKeys == true) {
            return;
        }
        
        triggerPhileasCommonEvent(cehkGamepad[code]);
        triggerPhileasSwitch(shkGamepad[code]);
    }
    
    function triggerPhileasMouse(code) {
        if (disableHotKeys == true) {
            return;
        }
        
        triggerPhileasCommonEvent(cehkMouse[code]);
        triggerPhileasSwitch(shkMouse[code]);
    }
    
    function phileasHotKeysKeyDownHandler(event) {
        triggerPhileasKeyboard(event.keyCode);
    }
    
    function phileasHotKeysMouseDownHandler(event) {
        triggerPhileasMouse(event.button);
    }

    function setHotKeysState(newValue) {
        if (disableHotKeys === newValue) {
            return;
        }

        disableHotKeys = newValue;

        if (disableHotKeys) {
            document.removeEventListener("keydown", phileasHotKeysKeyDownHandler);
            document.removeEventListener("mousedown", phileasHotKeysMouseDownHandler);
        } else {
            document.addEventListener("keydown", phileasHotKeysKeyDownHandler);
            document.addEventListener("mousedown", phileasHotKeysMouseDownHandler);
        }
    }

//--------CHANGED CORE:

    const Origin_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Origin_Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === "Phileas_GameHotKeys_SetHotKeysState") {
            setHotKeysState(args[0] != "true");
        }
    };
    
    const Origin_updateGamepadState = Input._updateGamepadState;
    Input._updateGamepadState = function(gamepad) {
        Origin_updateGamepadState.call(this, gamepad);

        if (disableHotKeys == true) {
            return;
        }

        const lastState = this._gamepadStates[gamepad.index] || [];
        let state = this._gamepadStates[gamepad.index];
        for (let i = 0; i < state.length; ++i) {
            if (state[i] == true && lastState[i] != true) {
                triggerPhileasGamepad(i);
            }
        }
    };
    
    const Origin_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        if (this._list != undefined && this._list.phileasGameHotKeysBlock === true) {
            blockedEvents.delete(this._list.phileasEventId);
        }
        
        Origin_clear.call(this);
    };
    
    const Origin_terminate = Game_Interpreter.prototype.terminate;
    Game_Interpreter.prototype.terminate = function() {
        if (this._list != undefined && this._list.phileasGameHotKeysBlock === true) {
            blockedEvents.delete(this._list.phileasEventId);
        }
        
        Origin_terminate.call(this);
    };

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        blockedEvents.clear();
    };

    const Origin_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        const result = Origin_isDatabaseLoaded.call(this);

        if (result) {
            setCommonEventHotKeysDictionaries();
            setSwitchHotKeysDictionaries();

            document.addEventListener("keydown", phileasHotKeysKeyDownHandler);
            document.addEventListener("mousedown", phileasHotKeysMouseDownHandler);
        }

        return result;
    };
    
    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasDisableHotKeys = disableHotKeys;
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        setHotKeysState(contents.phileasDisableHotKeys || false);
        blockedEvents.clear();
    };
    
}());
