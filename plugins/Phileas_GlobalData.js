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
 * @arg Switch
 * @type switch
 * @desc The switch to store the data in
 * 
 *
 * @command getDataByKey
 * @text Get Data By Key
 * @desc Retrieves a piece of data
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
 * @command Clear Data By Key
 * @desc Removes a piece of data by key
 *
 * @arg key
 * @text Key
 * @desc The string set when stored to access the data
 * 
 *
 * @command clearAllData
 * @command Clear All Data
 * @desc Removes all data
 *
 * 
 * @help
 * 
 * 
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
 * @help
 * 
 * 
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

 (function() {

//-----------------------------------------------------------------------------
// MY CODE

//-----------------------------------------------------------------------------
// Data

    const $parameters = PluginManager.parameters("Phileas_GlobalData");
    const $globalSwitchIds = parsePluginParamArray($parameters["globalSwitches"]);
    const $globalVariableIds = parsePluginParamArray($parameters["globalVariables"]);


//-----------------------------------------------------------------------------
// API

    function GlobalDataManager() {
        throw new Error("This is a static class");
    }

    GlobalDataManager.saveData = function() {
        
    };

    GlobalDataManager.addSwitchData = function(key, switchId) {
        this._data[key] = {
            type: GlobalDataManager._type.SWITCH,
            id: switchId,
            value: $gameSwitches.value(switchId)
        };
    };

    GlobalDataManager.addVariableData = function(key, variableId) {
        this._data[key] = {
            type: GlobalDataManager._type.VARIABLE,
            id: variableId,
            value: $gameVariables.value(variableId)
        };
    };

    GlobalDataManager.addTextData = function(key, text) {
        this._data[key] = {
            type: GlobalDataManager._type.TEXT,
            value: text
        };
    };

    GlobalDataManager.addNumberData = function(key, number) {
        this._data[key] = {
            type: GlobalDataManager._type.NUMBER,
            value: number
        };
    };

    GlobalDataManager.getSwitchDataByKey = function(key, switchId) {
        
    };

    GlobalDataManager.getDataByKey = function(key, variableId) {
        
    };

    GlobalDataManager.clearDataByKey = function(key) {
        
    };

    GlobalDataManager.clearAllData = function() {
        
    };

    /* GlobalDataManager._data = { key1: obj1, key2: obj2, ... }
     * obj = { type:<switch,variable,text,number>, id:<if switch or variable>, value:<...> }
     */
    GlobalDataManager._data = {};

    GlobalDataManager._type = {
        SWITCH: 0,
        VARIABLE: 1,
        TEXT: 2,
        NUMBER: 3
    };


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

    

}());
