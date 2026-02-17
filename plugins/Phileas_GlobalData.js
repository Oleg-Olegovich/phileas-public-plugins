//=============================================================================
// Phileas_GlobalData.js
//=============================================================================
// [Update History]
// 2026.February.14 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 Save switches, variables, and other data to a global file
 * @author Phileas
 * 
 *
 * @param globalSwitches
 * @text Global Switches
 * @type switch[]
 * @default []
 * @desc Switches listed here will permanently become global, and will be saved in Global Data
 *
 * @param globalVariables
 * @text Global Variables
 * @type variable[]
 * @default []
 * @desc Variables listed here will permanently become global, and will be saved in Global Data
 * 
 *
 * @command saveData
 * @text Save Data
 * @desc Saves global data without saving the rest of the game
 * 
 *
 * @command addSwitchData
 * @text Add Switch Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg switch
 * @text Switch
 * @type switch
 * @default 1
 * @desc The switch to store under this key
 * 
 *
 * @command addVariableData
 * @text Add Variable Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 1
 * @desc The variable to store under this key
 * 
 *
 * @command addTextData
 * @text Add Text Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg text
 * @text Text
 * @desc The text to store under this key
 * 
 *
 * @command addNumberData
 * @text Add Number Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg number
 * @text Number
 * @type number
 * @default 0
 * @min -9999999
 * @desc The number to store under this key
 * 
 *
 * @command getSwitchDataByKey
 * @text Get Switch Data By Key
 * @desc Retrieves a piece of data and stores it in a switch
 *
 * @arg key
 * @text Key
 * @desc The string set when stored to access the data
 *
 * @arg switch
 * @text Switch
 * @type switch
 * @desc The switch to store the data in
 * 
 *
 * @command getDataByKey
 * @text Get Data By Key
 * @desc Retrieves a piece of data and stores it in a variable
 *
 * @arg key
 * @text Key
 * @desc The string set when stored to access the data
 *
 * @arg variable
 * @type variable
 * @desc The variable to store the data in
 * 
 *
 * @command clearDataByKey
 * @text Clear Data By Key
 * @desc Removes a piece of data by key
 *
 * @arg key
 * @text Key
 * @desc The string set when stored to access the data
 * 
 *
 * @command clearAllData
 * @text Clear All Data
 * @desc Removes all data, that was added by keys via commands
 *
 * 
 * @help
 * 
 * This plugin allows you to save global data that will be available
 * across all local game sessions.
 * You can store the values of switches and variables specified
 * in the plugin parameters globally, and you can also add arbitrary data
 * (switches, variables, text, numbers) to the plugin storage via plugin commands or scripts.
 * 
 * Global data can be saved independently from regular save data.
 *
 * This plugin was created as an alternative to CGMZ_GlobalData
 * due to several issues in CGMZ, specifically:
 * 1) Save files become outdated when you change the list of global
 *    switches or variablesin the plugin parameters.
 * 2) CGMZ_GlobalData required the CGMZ_Core plugin, which conflicted
 *    with some of my plugins,including Phileas`s Skipping Messages.
 * 3) The save command in CGMZ_GlobalData starts an asynchronous process
 *    and does not wait for it to finish. There is no guarantee that
 *    the global file will be saved before the game process ends.
 *    This is especially critical in browser builds, where saving
 *    is performed to local web storage (localforage).
 * 
 * All of these issues have been fixed in this plugin.
 * My plugin is standalone, does not conflict with other plugins,
 * and saves data more reliably.
 *
 * My plugin saves data on game exit and whenever
 * the game attempts to save or load.
 * 
 * However, I cannot guarantee that data will be saved
 * if the game process is terminated abruptly via Task Manager
 * or if the browser tab with the game is closed.
 *
 * You can use the plugin commands or scripts listed below:
 *
 * Command:
 *     Save Data
 * Script:
 *     GlobalDataManager.saveData();
 * 
 * Command:
 *     Add Switch Data
 * Script:
 *     GlobalDataManager.addSwitchData(key, switchId);
 * Script Arguments: 
 *     key - The string required to access the data later
 *     switchId - The switch to store under this key
 * 
 * Command:
 *     Add Variable Data
 * Script:
 *     GlobalDataManager.addVariableData(key, variableId);
 * Script Arguments: 
 *     key - The string required to access the data later
 *     variableId - The variable to store under this key
 * 
 * Command:
 *     Add Text Data
 * Script:
 *     GlobalDataManager.addTextData(key, text);
 * Script Arguments: 
 *     key - The string required to access the data later
 *     text - The text to store under this key
 * 
 * Command:
 *     Add Number Data
 * Script:
 *     GlobalDataManager.addNumberData(key, number);
 * Script Arguments: 
 *     key - The string required to access the data later
 *     number - The number to store under this key
 * 
 * Command:
 *     Get Switch Data By Key
 * Script:
 *     GlobalDataManager.getSwitchDataByKey(key, switchId);
 * Script Arguments: 
 *     key - The string set when stored to access the data
 *     switchId - The switch to store the data in
 * 
 * Command:
 *     Get Data By Key
 * Script:
 *     GlobalDataManager.getDataByKey(key, variableId);
 * Script Arguments: 
 *     key - The string set when stored to access the data
 *     variableId - The variable to store the data in
 * 
 * Command:
 *     Clear Data By Key
 * Script:
 *     GlobalDataManager.clearDataByKey(key);
 * Script Arguments: 
 *     key - The string set when stored to access the data
 * 
 * Command:
 *     Clear All Data
 * Script:
 *     GlobalDataManager.clearAllData();
 * 
 *-----------------------------------------------------------------------------
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
 * This means that you can freely use the plugin in non-commercial
 * and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MZ
 * @plugindesc v1.0.0 Сохраняйте переключатели, переменные и другие данные в глобальный файл
 * @author Phileas
 * 
 *
 * @param globalSwitches
 * @text Глобальные переключатели
 * @type switch[]
 * @default []
 * @desc Перечисленные здесь переключатели навсегда станут глобальными и будут сохранены в глобальных данных
 *
 * @param globalVariables
 * @text Глобальные переменные
 * @type variable[]
 * @default []
 * @desc Перечисленные здесь переменные навсегда станут глобальными и будут сохранены в глобальных данных
 * 
 *
 * @command saveData
 * @text Сохранить данные
 * @desc Сохраняет глобальные данные без сохранения остальной части игры
 * 
 *
 * @command addSwitchData
 * @text Добавить данные переключателя
 * @desc Хранит часть данных
 *
 * @arg key
 * @text Ключ
 * @desc Строка, необходимая для последующего доступа к данным
 *
 * @arg switch
 * @text Переключатель
 * @type switch
 * @default 1
 * @desc Переключатель, который будет сохранён под указанным ключом
 * 
 *
 * @command addVariableData
 * @text Добавить данные переменной
 * @desc Хранит часть данных
 *
 * @arg key
 * @text Ключ
 * @desc Строка, необходимая для последующего доступа к данным
 *
 * @arg variable
 * @text Переменная
 * @type variable
 * @default 1
 * @desc Переменная, которая будет сохранена под указанным ключом
 * 
 *
 * @command addTextData
 * @text Добавить текстовые данные
 * @desc Хранит часть данных
 *
 * @arg key
 * @text Ключ
 * @desc Строка, необходимая для последующего доступа к данным
 *
 * @arg text
 * @text Текст
 * @desc Текст, который будет сохранён под указанным ключом
 * 
 *
 * @command addNumberData
 * @text Добавить числовые данные
 * @desc Хранит часть данных
 *
 * @arg key
 * @text Ключ
 * @desc Строка, необходимая для последующего доступа к данным
 *
 * @arg number
 * @text Число
 * @type number
 * @default 0
 * @min -9999999
 * @desc Число, которое будет сохранено под указанным ключом
 * 
 *
 * @command getSwitchDataByKey
 * @text Получить данные переключателя по ключу
 * @desc Извлекает фрагмент данных и сохраняет его в переключателе
 *
 * @arg key
 * @text Ключ
 * @desc Строка, заданная при сохранении данных
 *
 * @arg switch
 * @text Переключатель
 * @type switch
 * @desc Переключатель, в который сохранятся данные
 * 
 *
 * @command getDataByKey
 * @text Получить данные по ключу
 * @desc Извлекает фрагмент данных и сохраняет его в переменной
 *
 * @arg key
 * @text Ключ
 * @desc Строка, заданная при сохранении данных
 *
 * @arg variable
 * @type variable
 * @desc Переменная, в которую сохранятся данные
 * 
 *
 * @command clearDataByKey
 * @text Удалить данные по ключу
 * @desc Удаляет часть данных по ключу
 *
 * @arg key
 * @text Ключ
 * @desc Строка, заданная при сохранении данных
 * 
 *
 * @command clearAllData
 * @text Удалить все данные
 * @desc Удаляет все данные, которые были добавлены по ключам через команды
 * 
 * 
 * @help
 * 
 * Этот плагин позволяет вам сохранять глобальные данные,
 * которые будут доступны во всех локальных игровых сессиях.
 * Вы можете глобально сохранять значения переменных и переключателей,
 * указанных в параметрах плагина, а также добавлять произвольные данные
 * (переключатели, переменные, тексты, числа) в хранилище плагина с помощью
 * команд плагина или скриптов.
 * 
 * Сохранение глобальных данных можно выполнять отдельно
 * от сохранения обычных игровых данных.
 * 
 * Этот плагин был разработан как аналог плагина CGMZ_GlobalData
 * из-за ряда проблем в CGMZ, а именно:
 * 1) Сохранения становятся неактуальными при изменении списка
 *    глобальных переключателейили переменных в параметрах плагина.
 * 2) CGMZ_GlobalData требовал включения плагина CGMZ_Core, который
 *    конфликтовал с рядом моих плагинов, включая Phileas`s Skipping Messages.
 * 3) Команда сохранения данных в CGMZ_GlobalData запускает асинхронный процесс
 *    и не ждёт его завершения. Нет гарантии, что глобальный файл сохранится до
 *    завершения процесса игры. Это особенно критично при запуске в браузере,
 *    так как сохранение происходит в локальное веб-хранилище (localforage).
 * 
 * Все перечисленные проблемы были исправлены в этом плагине.
 * Мой плагин работает автономно, не конфликтует с другими плагинами
 * и более корректно сохраняет данные.
 * 
 * Мой плагин сохраняет данные при завершении игры
 * и при попытке сохранить или загрузить игру.
 * Однако я не могу гарантировать сохранение данных при внезапном завершении
 * процесса игры через диспетчер задач или при закрытии вкладки браузера с игрой.
 * 
 * Вы можете использовать команды плагина или скрипты, список ниже:
 * 
 * Команда:
 *     Сохранить данные
 * Скрипт:
 *     GlobalDataManager.saveData();
 * 
 * Команда:
 *     Добавить данные переключателя
 * Скрипт:
 *     GlobalDataManager.addSwitchData(key, switchId);
 * Аргументы скрипта: 
 *     key - Строка, необходимая для последующего доступа к данным
 *     switchId - Переключатель, который будет сохранён под указанным ключом
 * 
 * Команда:
 *     Добавить данные переменной
 * Скрипт:
 *     GlobalDataManager.addVariableData(key, variableId);
 * Аргументы скрипта: 
 *     key - Строка, необходимая для последующего доступа к данным
 *     variableId - Переменная, которая будет сохранена под указанным ключом
 * 
 * Команда:
 *     Добавить текстовые данные
 * Скрипт:
 *     GlobalDataManager.addTextData(key, text);
 * Аргументы скрипта: 
 *     key - Строка, необходимая для последующего доступа к данным
 *     text - Текст, который будет сохранён под указанным ключом
 * 
 * Команда:
 *     Добавить числовые данные
 * Скрипт:
 *     GlobalDataManager.addNumberData(key, number);
 * Аргументы скрипта: 
 *     key - Строка, необходимая для последующего доступа к данным
 *     number - Число, которое будет сохранено под указанным ключом
 * 
 * Команда:
 *     Получить данные переключателя по ключу
 * Скрипт:
 *     GlobalDataManager.getSwitchDataByKey(key, switchId);
 * Аргументы скрипта: 
 *     key - Строка, заданная при сохранении данных
 *     switchId - Переключатель, в который сохранятся данные
 * 
 * Команда:
 *     Получить данные по ключу
 * Скрипт:
 *     GlobalDataManager.getDataByKey(key, variableId);
 * Аргументы скрипта: 
 *     key - Строка, заданная при сохранении данных
 *     variableId - Переменная, в которую сохранятся данные
 * 
 * Команда:
 *     Удалить данные по ключу
 * Скрипт:
 *     GlobalDataManager.clearDataByKey(key);
 * Аргументы скрипта: 
 *     key - Строка, заданная при сохранении данных
 * 
 * Команда:
 *     Удалить все данные
 * Скрипт:
 *     GlobalDataManager.clearAllData();
 * 
 *-----------------------------------------------------------------------------
 *
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих
 * и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

 "use strict";

 //-----------------------------------------------------------------------------
// API

function GlobalDataManager() {
    throw new Error("This is a static class");
}

GlobalDataManager.saveData = function() {
    const content = this.makeGlobalSaveContent();
    this._cachedContent = content;

    this._saveQueue = this._saveQueue
        .then(() => StorageManager.saveObject(this._globalSaveFileName, content))
        .catch((e) => {
            console.warn(`[Phileas's] Global data saving failed`, e);
            return 0;
        });

    return this._saveQueue;
};

GlobalDataManager.loadData = function() {
    if (this._cachedContent) {
        this.extractGlobalSaveContent();
        return;
    }

    StorageManager.loadObject(this._globalSaveFileName)
        .then(content => {
            this._cachedContent = content;
            this.extractGlobalSaveContent();
            return 0;
        })
        .catch((e) => {
            console.warn(`[Phileas's] Global data loading failed`, e);
        });
};

GlobalDataManager.addSwitchData = function(key, switchId) {
    this._data[key] = {
        type: this._type.SWITCH,
        id: switchId,
        value: $gameSwitches.value(switchId)
    };
};

GlobalDataManager.addVariableData = function(key, variableId) {
    this._data[key] = {
        type: this._type.VARIABLE,
        id: variableId,
        value: $gameVariables.value(variableId)
    };
};

GlobalDataManager.addTextData = function(key, text) {
    this._data[key] = {
        type: this._type.TEXT,
        value: text
    };
};

GlobalDataManager.addNumberData = function(key, number) {
    this._data[key] = {
        type: this._type.NUMBER,
        value: number
    };
};

GlobalDataManager.getSwitchDataByKey = function(key, switchId) {
    const obj = this._data[key];

    if (!obj || obj.type !== this._type.SWITCH) {
        console.warn(`[Phileas's] Switch data getting failed. Key: ${key}. Switch ID: ${switchId}`);
        return;
    }

    $gameSwitches.setValue(switchId, obj.value);
};

GlobalDataManager.getDataByKey = function(key, variableId) {
    const obj = this._data[key];

    if (!obj) {
        console.warn(`[Phileas's] Data getting failed. Key: ${key}. Variable ID: ${variableId}`);
        return;
    }

    $gameVariables.setValue(variableId, obj.value);
};

GlobalDataManager.clearDataByKey = function(key) {
    if (this._data[key]) {
        delete this._data[key];
    }
};

GlobalDataManager.clearAllData = function() {
    this._data = {};
};

GlobalDataManager.makeGlobalSaveContent = function() {
    return {
        switches: $gameSwitches._data,
        variables: $gameVariables._date,
        data: this._data
    };
};

GlobalDataManager.extractGlobalSaveContent = function() {
    const content = this._cachedContent;
    this._data = content.data;

    if (!$gameSwitches || !$gameVariables || !this._globalSwitchIds || !this._globalVariableIds) {
        return;
    }

    this._globalSwitchIds.forEach((id) => $gameSwitches.setValue(id, content.switches[id]));
    this._globalVariableIds.forEach((id) => $gameVariables.setValue(id, content.variables[id]));
};

GlobalDataManager.flush = function() {
    return this._saveQueue;
};

/* GlobalDataManager._data = { key1: obj1, key2: obj2, ... }
 * obj = { type:<switch,variable,text,number>, id:<if switch or variable>, value:<...> }
 */
GlobalDataManager._data = {};

GlobalDataManager._globalSwitchIds = null;
GlobalDataManager._globalVariableIds = null;

GlobalDataManager._saveQueue = Promise.resolve();
GlobalDataManager._cachedContent = null;

GlobalDataManager._type = {
    SWITCH: 0,
    VARIABLE: 1,
    TEXT: 2,
    NUMBER: 3
};

GlobalDataManager._globalSaveFileName = "phileas_global";


 (function() {

//-----------------------------------------------------------------------------
// MY CODE

//-----------------------------------------------------------------------------
// Data

    const $parameters = PluginManager.parameters("Phileas_GlobalData");
    GlobalDataManager._globalSwitchIds = parsePluginParamArray($parameters["globalSwitches"]);
    GlobalDataManager._globalVariableIds = parsePluginParamArray($parameters["globalVariables"]);


//-----------------------------------------------------------------------------
// Commands
    
    PluginManager.registerCommand("Phileas_GlobalData", "saveData", saveData);
    PluginManager.registerCommand("Phileas_GlobalData", "addSwitchData", addSwitchData);
    PluginManager.registerCommand("Phileas_GlobalData", "addVariableData", addVariableData);
    PluginManager.registerCommand("Phileas_GlobalData", "addTextData", addTextData);
    PluginManager.registerCommand("Phileas_GlobalData", "addNumberData", addNumberData);
    PluginManager.registerCommand("Phileas_GlobalData", "getSwitchDataByKey", getSwitchDataByKey);
    PluginManager.registerCommand("Phileas_GlobalData", "getDataByKey", getDataByKey);
    PluginManager.registerCommand("Phileas_GlobalData", "clearDataByKey", clearDataByKey);
    PluginManager.registerCommand("Phileas_GlobalData", "clearAllData", clearAllData);

    function saveData() {
        GlobalDataManager.saveData();
    }

    function addSwitchData(params) {
        const key = params["key"];
        const switchId = Number(params["switch"] || 0);
        GlobalDataManager.addSwitchData(key, switchId);
    }

    function addVariableData(params) {
        const key = params["key"];
        const variableId = Number(params["variable"] || 0);
        GlobalDataManager.addVariableData(key, variableId);
    }

    function addTextData(params) {
        const key = params["key"];
        const text = params["text"] || "";
        GlobalDataManager.addTextData(key, text);
    }

    function addNumberData(params) {
        const key = params["key"];
        const number = Number(params["number"] || 0);
        GlobalDataManager.addNumberData(key, number);
    }

    function getSwitchDataByKey(params) {
        const key = params["key"];
        const switchId = Number(params["switch"] || 0);
        GlobalDataManager.getSwitchDataByKey(key, switchId);
    }

    function getDataByKey(params) {
        const key = params["key"];
        const variableId = Number(params["variable"] || 0);
        GlobalDataManager.getDataByKey(key, variableId);
    }

    function clearDataByKey(params) {
        const key = params["key"];
        GlobalDataManager.clearDataByKey(key);
    }

    function clearAllData() {
        GlobalDataManager.clearAllData();
    }


//-----------------------------------------------------------------------------
// Main

    function parsePluginParamArray(data) {
        if (data == undefined) {
            return null;
        }
        
        const arr = JSON.parse(data);
        for (let i = 0; i < arr.length; ++i) {
            arr[i] = Number(arr[i]);
        }

        return arr;
    }


//-----------------------------------------------------------------------------
// MODIFIED CODE

//-----------------------------------------------------------------------------
// Managers

    const Original_SceneManager_exit = SceneManager.exit;
    SceneManager.exit = function() {
        GlobalDataManager.saveData();
        GlobalDataManager.flush().finally(() => Original_SceneManager_exit.call(this));
    };

    const Original_SceneManager_reloadGame = SceneManager.reloadGame;
    SceneManager.reloadGame = function() {
        GlobalDataManager.saveData();
        GlobalDataManager.flush().finally(() => Original_SceneManager_reloadGame.call(this));
    };

    const Original_DataManager_saveGame = DataManager.saveGame;
    DataManager.saveGame = function(savefileId) {
        GlobalDataManager.saveData();
        return GlobalDataManager.flush().then(() => Original_DataManager_saveGame.call(this, savefileId));
    };

    const Original_DataManager_loadGlobalInfo = DataManager.loadGlobalInfo;
    DataManager.loadGlobalInfo = function() {
        Original_DataManager_loadGlobalInfo.call(this);
        GlobalDataManager.loadData();
    };

    const Original_DataManager_setupNewGame= DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Original_DataManager_setupNewGame.call(this);
        GlobalDataManager.loadData();
    };

    const Original_DataManager_extractSaveContents= DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Original_DataManager_extractSaveContents.call(this, contents);
        GlobalDataManager.loadData();
    };

//-----------------------------------------------------------------------------
// Scenes

    const Original_Scene_Load_executeLoad = Scene_Load.prototype.executeLoad;
    Scene_Load.prototype.executeLoad = function(savefileId) {
        GlobalDataManager.saveData();
        GlobalDataManager.flush().finally(() => Original_Scene_Load_executeLoad.call(this, savefileId));
    };

}());
