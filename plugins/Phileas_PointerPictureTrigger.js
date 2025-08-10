//=============================================================================
// Phileas_PointerPictureTrigger.js
//=============================================================================
// [Update History]
// 2023.December.12 Ver1.0.0 First Release
// 2023.December.16 Ver1.1.0 Expanded functionality
// 2024.June.18 Ver1.2.0 Added picture number variable
// 2024.June.18 Ver1.3.0 Added global action
// 2024.July.16 Ver1.4.0 Added self switch support
// 2024.July.16 Ver1.4.1 Added alpha pixel check
// 2024.August.3 Ver1.4.2 Fixed localizations
// 2024.August.24 Ver1.4.3 Fixed variable delta
// 2024.September.19 Ver1.4.4 Blocked player movement when the trigger is triggered
// 2024.September.23 Ver1.5.0 Commands to enable and disable the plugin
// 2024.September.25 Ver1.5.1 Fixed exit trigger
// 2024.October.3 Ver1.5.2 Fixed alpha pixel check
// 2024.October.24 Ver1.6.0 Added running the JS script
// 2025.May.03 Ver1.6.1 Added API
// 2025.June.10 Ver1.6.2 Fixed russian commands
// 2025.June.10 Ver1.7.0 Fixed the Exit trigger when ignoring transparent pixels
// 2025.June.11 Ver1.7.1 Fixed touch processing for global triggers
// 2025.June.12 Ver1.7.2 Fixed click trigger
// 2025.June.13 Ver1.7.3 Fixed touch processing
// 2025.June.16 Ver1.7.4 Fixed touch processing (again)
// 2025.August.04 Ver1.8.0 Added input ID variable
// 2025.August.10 Ver1.8.1 Added command for erasing all actions from all pictures

/*:
 * @target MZ
 * @plugindesc v1.8.0 Triggering of the switch/variable/common event when the pointer acts with the picture
 * @author Phileas, ZX_Lost_Soul
 *
 * @command assign
 * @text Assign
 * @desc Binds a switch, a variable, and a common event to a single action.
 *
 * @arg pictureId
 * @text Picture ID
 * @type number
 * @default 1
 *
 * @arg pictureInputIdVariable
 * @text Input ID variable
 * @desc If it is specified, the picture ID will be taken from it, otherwise from the "Picture ID"
 * @type variable
 * @default 0
 *
 * @arg switch
 * @text Switch
 * @type struct<SwitchDataStruct>
 * 
 * @arg selfSwitch
 * @text Self Switch
 * @type struct<SelfSwitchDataStruct>
 *
 * @arg variable
 * @text Variable
 * @type struct<VariableDataStruct>
 * 
 * @arg pictureVariableId
 * @text Picture number variable
 * @type variable
 * @default 0
 * @desc The number of the picture will be written to this variable when the action is performed.
 *
 * @arg commonEventId
 * @text Common event ID
 * @type common_event
 * @default 0
 * 
 * @arg runScript
 * @text Script
 * @type text
 * @desc An arbitrary JS script that will be executed at the trigger.
 * 
 * @arg ignoreTransparentPixels
 * @text Ignore transparent pixels
 * @type boolean
 * @default true
 *
 * @arg action
 * @text Action
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 * 
 *
 * @command eraseAction
 * @text Erase action
 * @desc Remove the binding to a single picture action.
 * 
 * @arg pictureId
 * @text Picture ID
 * @type number
 * @default 1
 *
 * @arg pictureInputIdVariable
 * @text Input ID variable
 * @desc If it is specified, the picture ID will be taken from it, otherwise from the "Picture ID"
 * @type variable
 * @default 0
 * 
 * @arg action
 * @text Action
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 * 
 *
 * @command eraseAllAction
 * @text Erase all pictures actions
 * @desc Removes bindings to all actions of the picture.
 * 
 * @arg pictureId
 * @text Picture ID
 * @type number
 * @default 1
 *
 * @arg pictureInputIdVariable
 * @text Input ID variable
 * @desc If it is specified, the picture ID will be taken from it, otherwise from the "Picture ID"
 * @type variable
 * @default 0
 * 
 * 
 * @command eraseAllActionsFromAllPictures
 * @text Erase all actions from all pictures
 * 
 *
 * @command assignGlobal
 * @text Assign global action
 * @desc Binds a switch, a variable, and a common event to a single action.
 *
 * @arg switch
 * @text Switch
 * @type struct<SwitchDataStruct>
 *
 * @arg selfSwitch
 * @text Self Switch
 * @type struct<SelfSwitchDataStruct>
 *
 * @arg variable
 * @text Variable
 * @type struct<VariableDataStruct>
 * 
 * @arg pictureVariableId
 * @text Picture number variable
 * @type variable
 * @default 0
 * @desc The number of the picture will be written to this variable when the action is performed.
 *
 * @arg commonEventId
 * @text Common event ID
 * @type common_event
 * @default 0
 * 
 * @arg runScript
 * @text Script
 * @type text
 * @desc An arbitrary JS script that will be executed at the trigger.
 * 
 * @arg ignoreTransparentPixels
 * @text Ignore transparent pixels
 * @type boolean
 * @default true
 *
 * @arg action
 * @text Action
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 *
 * @command eraseGlobal
 * @text Erase global action
 * @desc Remove the binding to a single global action.
 * @arg action
 * @text Action
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 *
 * @command eraseAllGlobal
 * @text Erase all global actions
 * @desc Removes bindings to all global actions.
 * 
 * @command disablePlugin
 * @text Disable the plugin
 * @desc Triggers stop working, but data about them is not deleted
 * 
 * @command enablePlugin
 * @text Enable the plugin
 *
 * @help
 * Triggering of a switch or a common event when the pointer with the picture acts:
 * enter, exit, press, click.
 *
 * The plugin provides commands: 
 * 0) Assign - assigns a handler to one type of action with an picture.
 * 1) Erase action - removes the handler of a single action with an picture.
 * 2) Erase all actions - removes all picture handlers.
 * 
 * Similar global commands are also provided, allowing to set triggers for all pictures.
 *
 * You can assign your own handler for each type of action, they will work independently.
 * For example, you can assign two switches to one picture: to Enter and to Click.
 * 
 * After deleting an picture, all triggers associated with its number are also deleted.
 * 
 * You can also use the plugin API to invoke plugin commands through a script:
 * Phileas_PointerPictureTrigger.assign(params)
 * Phileas_PointerPictureTrigger.eraseAction(params)
 * Phileas_PointerPictureTrigger.eraseAllAction(params)
 * Phileas_PointerPictureTrigger.eraseAllActionsFromAllPictures()
 * Phileas_PointerPictureTrigger.assignGlobal(params)
 * Phileas_PointerPictureTrigger.eraseGlobal(params)
 * Phileas_PointerPictureTrigger.eraseAllGlobal()
 * Phileas_PointerPictureTrigger.disablePlugin()
 * Phileas_PointerPictureTrigger.enablePlugin()
 *
 * You can always write to the author if you need support for other windows. Or if you need other features or even plugins.
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

/*~struct~SwitchDataStruct:
 * @param switchId
 * @text Switch ID
 * @type switch
 * @default 0
 *
 * @param switchState
 * @text Switch state
 * @type boolean
 * @desc The value that will be written to the switch when the action is performed.
 * @default true
 */

/*~struct~SelfSwitchDataStruct:
 * @param mapId
 * @text Map ID
 * @type number
 * @default 0
 * 
 * @param eventId
 * @text Event ID
 * @type number
 * @default 0
 * 
 * @param selfSwitchId
 * @text Self Switch ID
 * @type combo
 * @option A
 * @option B
 * @option C
 * @option D
 * @default A
 *
 * @param switchState
 * @text Switch state
 * @type boolean
 * @desc The value that will be written to the switch when the action is performed.
 * @default true
 */

/*~struct~VariableDataStruct:
 * @param variableId
 * @text Variable ID
 * @type variable
 * @default 0
 *
 * @param variableDelta
 * @text Variable delta
 * @type number
 * @min -9999999
 * @desc The value that will be added to the variable when the action is performed.
 * @default 0
 * 
 * @param variableExactValue
 * @text Variable exact value
 * @type number
 * @min -9999999
 * @desc The value that will be assigned to the variable when the action is performed if the "Variable delta" is 0.
 * @default 0
 */

/*:ru
 * @target MZ
 * @plugindesc v1.8.0 Срабатывание переключателя/переменной/общего события при действии указателя с картинкой
 * @author Phileas, ZX_Lost_Soul
 *
 * @command assign
 * @text Назначить
 * @desc Привязывает переключатель, переменную и общее событие к одному действию.
 *
 * @arg pictureId
 * @text ID картинки
 * @type number
 * @default 1
 *
 * @arg pictureInputIdVariable
 * @text Переменная с ID на вход
 * @desc Если указана, ID картинки будет взят из неё, иначе из "ID картинки"
 * @type variable
 * @default 0
 *
 * @arg switch
 * @text Переключатель
 * @type struct<SwitchDataStruct>
 * 
 * @arg selfSwitch
 * @text Локальный переключатель
 * @type struct<SelfSwitchDataStruct>
 *
 * @arg variable
 * @text Переменная
 * @type struct<VariableDataStruct>
 * 
 * @arg pictureVariableId
 * @text Переменная номера картинки
 * @type variable
 * @default 0
 * @desc В эту переменную будет записываться номер картинки при совершении действия.
 *
 * @arg commonEventId
 * @text ID общего события
 * @type common_event
 * @default 0
 * 
 * @arg runScript
 * @text Скрипт
 * @type text
 * @desc Произвольный JS-скрипт, который будет исполнен при срабатывании триггера.
 * 
 * @arg ignoreTransparentPixels
 * @text Игнорировать прозрачные пиксели
 * @type boolean
 * @default true
 *
 * @arg action
 * @text Действие
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 * 
 *
 * @command eraseAction
 * @text Удалить действие
 * @desc Удалить привязку к одному действию картинки.
 * 
 * @arg pictureId
 * @text ID картинки
 * @type number
 * @default 1
 *
 * @arg pictureInputIdVariable
 * @text Переменная с ID на вход
 * @desc Если указана, ID картинки будет взят из неё, иначе из "ID картинки"
 * @type variable
 * @default 0
 * 
 * @arg action
 * @text Действие
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 * 
 *
 * @command eraseAllAction
 * @text Удалить все действия картинки
 * @desc Удаляет привязки ко всем действиям картинки.
 * 
 * @arg pictureId
 * @text ID картинки
 * @type number
 * @default 1
 *
 * @arg pictureInputIdVariable
 * @text Переменная с ID на вход
 * @desc Если указана, ID картинки будет взят из неё, иначе из "ID картинки"
 * @type variable
 * @default 0
 * 
 * 
 * @command eraseAllActionsFromAllPictures
 * @text Удалить все действия у всех картинок
 * 
 * 
 * @command assignGlobal
 * @text Назначить глобально
 * @desc Привязывает переключатель, переменную и общее событие к одному действию для всех картинок.
 *
 * @arg switch
 * @text Переключатель
 * @type struct<SwitchDataStruct>
 * 
 * @arg selfSwitch
 * @text Локальный переключатель
 * @type struct<SelfSwitchDataStruct>
 *
 * @arg variable
 * @text Переменная
 * @type struct<VariableDataStruct>
 * 
 * @arg pictureVariableId
 * @text Переменная номера картинки
 * @type variable
 * @default 0
 * @desc В эту переменную будет записываться номер картинки при совершении действия.
 *
 * @arg commonEventId
 * @text ID общего события
 * @type common_event
 * @default 0
 * 
 * @arg runScript
 * @text Скрипт
 * @type text
 * @desc Произвольный JS-скрипт, который будет исполнен при срабатывании триггера.
 * 
 * @arg ignoreTransparentPixels
 * @text Игнорировать прозрачные пиксели
 * @type boolean
 * @default true
 *
 * @arg action
 * @text Действие
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 *
 * @command eraseGlobal
 * @text Удалить глобальное действие
 * @desc Удалить привязку к одному глобальному действию.
 * @arg action
 * @text Действие
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 *
 * @command eraseAllGlobal
 * @text Удалить все глобальные действия
 * @desc Удаляет привязки ко всем глобальным действиям.
 * 
 * @command disablePlugin
 * @text Отключить плагин
 * @desc Триггеры перестают работать, но данные о них не удаляются
 * 
 * @command enablePlugin
 * @text Включить плагин
 * 
 * @help
 * Срабатывание переключателя, переменной или общего события при действиях указателя с картинкой:
 * наведение, уведение, клик, нажатие.
 *
 * Плагин предоставляет команды: 
 * 0) Назначить - назначает обработчик на один тип действия с картинкой.
 * 1) Удалить действие - удаляет обработчик одного действия с картинкой.
 * 2) Удалить все действия - удаляет все обработчики картинки.
 * 
 * Также предоставляются аналогичные глобальные команды, позволяющие задать триггеры для всех картинок.
 *
 * На каждый тип действия можно назначить свой обработчик, они будут работать независимо. 
 * Например, можно на одну картинку назначить два переключателя: на Enter и на Click.
 *
 * После удаления картинки все привязанные к её номеру триггеры тоже удаляются.
 * 
 * Вы также можете использовать API плагина, чтобы вызывать команды плагина через скрипт:
 * Phileas_PointerPictureTrigger.assign(params)
 * Phileas_PointerPictureTrigger.eraseAction(params)
 * Phileas_PointerPictureTrigger.eraseAllAction(params)
 * Phileas_PointerPictureTrigger.eraseAllActionsFromAllPictures()
 * Phileas_PointerPictureTrigger.assignGlobal(params)
 * Phileas_PointerPictureTrigger.eraseGlobal(params)
 * Phileas_PointerPictureTrigger.eraseAllGlobal()
 * Phileas_PointerPictureTrigger.disablePlugin()
 * Phileas_PointerPictureTrigger.enablePlugin()
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
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

/*~struct~SwitchDataStruct:ru
 * @param switchId
 * @text ID переключателя
 * @type switch
 * @default 0
 *
 * @param switchState
 * @text Состояние переключателя
 * @type boolean
 * @desc Значение, которое будет записано в переключатель при совершении действия.
 * @default true
 */

/*~struct~SelfSwitchDataStruct:ru
 * @param mapId
 * @text ID карты
 * @type number
 * @default 0
 * 
 * @param eventId
 * @text ID события
 * @type number
 * @default 0
 * 
 * @param selfSwitchId
 * @text ID локального переключателя
 * @type combo
 * @option A
 * @option B
 * @option C
 * @option D
 * @default A
 *
 * @param switchState
 * @text Состояние переключателя
 * @type boolean
 * @desc Значение, которое будет записано в переключатель при совершении действия.
 * @default true
 */

/*~struct~VariableDataStruct:ru
 * @param variableId
 * @text ID переменной
 * @type variable
 * @default 0
 *
 * @param variableDelta
 * @text Дельта переменной
 * @type number
 * @min -9999999
 * @desc Значение, которое будет прибавлено к переменной при совершении действия.
 * @default 0
 * 
 * @param variableExactValue
 * @text Точное значение пременной
 * @type number
 * @desc Значение, которое будет присвоено в переменную при совершении действия, если "Дельта перменной" равна 0.
 * @default 0
 */

"use strict";

const Phileas_PointerPictureTrigger = {};

(function() {

    //-----------------------------------------------------------------------------
    // My code

    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "assign", assignAction);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAction", eraseAction);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAllAction", eraseAllActions);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAllActionsFromAllPictures", eraseAllActionsFromAllPictures);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "assignGlobal", assignGlobal);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseGlobal", eraseGlobal);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAllGlobal", eraseAllGlobal);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "disablePlugin", disablePlugin);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "enablePlugin", enablePlugin);

    var globalPhileasPictureTrigger = {};
    var isPluginEnabled = true;

    function getAct(params) {
        let switchData = {
            id: 0,
            state: false
        }

        let selfSwitchData = {
            mapId: 0,
            eventId: 0,
            id: "",
            state: false
        }

        let variableData = {
            id: 0,
            delta: 0,
            exactValue: 0
        }

        if (params["switch"] != undefined && params["switch"] != "") {
            const data = JSON.parse(params["switch"]);
            switchData.id = Number(data["switchId"]);
            switchData.state = data["switchState"] == "true";
        }

        if (params["selfSwitch"] != undefined && params["selfSwitch"] != "") {
            const data = JSON.parse(params["selfSwitch"]);
            selfSwitchData.mapId = Number(data["mapId"]);
            selfSwitchData.eventId = Number(data["eventId"]);
            selfSwitchData.id = data["selfSwitchId"];
            selfSwitchData.state = data["switchState"] == "true";
        }

        if (params["variable"] != undefined && params["variable"] != "") {
            const data = JSON.parse(params["variable"]);
            variableData.id = Number(data["variableId"]);
            variableData.delta = Number(data["variableDelta"]) || 0;
            variableData.exactValue = Number(data["variableExactValue"]) || 0;
        }

        const pictureVariableId = Number(params["pictureVariableId"]);
        const commonEventId = Number(params["commonEventId"]);
        const runScript = params["runScript"];
        const ignoreTransparentPixels = params["ignoreTransparentPixels"] == "true";

        let act = {};
        act.switchData = switchData;
        act.selfSwitchData = selfSwitchData;
        act.variableData = variableData;
        act.pictureVariableId = pictureVariableId;
        act.commonEventId = commonEventId;
        act.runScript = runScript;
        act.ignoreTransparentPixels = ignoreTransparentPixels;

        return act;
    }

    function getPictureId(params) {
        const pictureInputIdVariable = Number(params["pictureInputIdVariable"] || 0);
        return pictureInputIdVariable === 0
            ? Number(params["pictureId"] || 1)
            : $gameVariables.value(pictureInputIdVariable);
    }

    function assignAction(params) {
        const pictureId = getPictureId(params);
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            if (picture.phileasPictureTrigger == undefined) {
                picture.phileasPictureTrigger = {};
            }

            const action = params["action"];
            picture.phileasPictureTrigger[action] = getAct(params);
        }
    }

    function eraseAction(params) {
        const pictureId = getPictureId(params);
        const action = params["action"];
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            if (picture.phileasPictureTrigger == undefined) {
                picture.phileasPictureTrigger = {};
            }

            picture.phileasPictureTrigger[action] = undefined;
        }
    }

    function eraseAllActions(params) {
        const pictureId = getPictureId(params);
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            picture.phileasPictureTrigger = {};
        }
    }

    function eraseAllActionsFromAllPictures() {
        const max = $gameScreen.maxPictures() + 1;

        for (let i = 1; i < max; ++i) {
            const picture = $gameScreen.picture(pictureId);
            if (picture) {
                picture.phileasPictureTrigger = {};
            }
        }
    }

    function assignGlobal(params) {
        const action = params["action"];
        globalPhileasPictureTrigger[action] = getAct(params);
    }

    function eraseGlobal(params) {
        const action = params["action"];
        globalPhileasPictureTrigger[action] = undefined;
    }

    function eraseAllGlobal() {
        globalPhileasPictureTrigger = {};
    }

    function disablePlugin() {
        isPluginEnabled = false;
    }

    function enablePlugin() {
        isPluginEnabled = true;
    }

    function tryAct(act, pictureId) {
        if (act == undefined) {
            return;
        }

        if (act.switchData.id != undefined && act.switchData.id > 0 && act.switchData.state != undefined) {
            $gameSwitches.setValue(
                act.switchData.id,
                act.switchData.state);
        }

        if (act.selfSwitchData.mapId > 0 && act.selfSwitchData.eventId > 0 && act.selfSwitchData.id != "" && act.selfSwitchData.state != undefined) {
            const key = [act.selfSwitchData.mapId, act.selfSwitchData.eventId, act.selfSwitchData.id];
            $gameSelfSwitches.setValue(key, act.selfSwitchData.state);
        }

        if (act.variableData.id != undefined && act.variableData.id > 0) {
            if (act.variableData.delta != undefined && act.variableData.delta != 0) {
                const current = $gameVariables.value(act.variableData.id);
                $gameVariables.setValue(
                    act.variableData.id,
                    current + act.variableData.delta);
            } else if (act.variableData.exactValue != undefined) {
                $gameVariables.setValue(
                    act.variableData.id,
                    act.variableData.exactValue);
            }
        }

        if (act.pictureVariableId != undefined && act.pictureVariableId > 0) {
            $gameVariables.setValue(
                act.pictureVariableId,
                pictureId);
        }

        if (act.commonEventId != undefined) {
            $gameTemp.reserveCommonEvent(act.commonEventId);
        }

        if (act.runScript != undefined) {
            eval(act.runScript);
        }
    }

    function tryTrigger(pictureId, action) {
        if (!isPluginEnabled) {
            return;
        }

        const picture = $gameScreen.picture(pictureId);

        if (picture != undefined && picture.phileasPictureTrigger != undefined) {
            tryAct(picture.phileasPictureTrigger[action], pictureId);
        }

        tryAct(globalPhileasPictureTrigger[action], pictureId);
    }

    function checkPixel(sprite) {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = sprite.worldTransform.applyInverse(touchPos);
        const bitmap = sprite._bitmap;

        let x = localPos.x;
        let y = localPos.y;

        if (sprite._anchor.x == 0.5) {
            x += sprite._frame.width / 2;
            y += sprite._frame.height / 2;
        }

        const alpha = bitmap.getAlphaPixel(x, y);

        return alpha !== 0;
    }

    function checkPixelByAct(isPixelOpaque, act) {
        return !!act && (!act.ignoreTransparentPixels || isPixelOpaque);
    }

    //-----------------------------------------------------------------------------
    // API

    Phileas_PointerPictureTrigger.assign = assignAction;
    Phileas_PointerPictureTrigger.eraseAction = eraseAction;
    Phileas_PointerPictureTrigger.eraseAllAction = eraseAllActions;
    Phileas_PointerPictureTrigger.eraseAllActionsFromAllPictures = eraseAllActionsFromAllPictures;
    Phileas_PointerPictureTrigger.assignGlobal = assignGlobal;
    Phileas_PointerPictureTrigger.eraseGlobal = eraseGlobal;
    Phileas_PointerPictureTrigger.eraseAllGlobal = eraseAllGlobal;
    Phileas_PointerPictureTrigger.disablePlugin = disablePlugin;
    Phileas_PointerPictureTrigger.enablePlugin = enablePlugin;

    //-----------------------------------------------------------------------------
    // Modified code

    const Origin_onMouseEnter = Sprite_Picture.prototype.onMouseEnter;
    Sprite_Picture.prototype.onMouseEnter = function() {
        tryTrigger(this._pictureId, "Enter");
        Origin_onMouseEnter.call(this);
    };

    const Origin_onMouseExit = Sprite_Picture.prototype.onMouseExit;
    Sprite_Picture.prototype.onMouseExit = function() {
        tryTrigger(this._pictureId, "Exit");
        Origin_onMouseExit.call(this);
    };

    const Origin_onPress = Sprite_Picture.prototype.onPress;
    Sprite_Picture.prototype.onPress = function() {
        tryTrigger(this._pictureId, "Press");
        Origin_onPress.call(this);
    };

    const Origin_onClick = Sprite_Picture.prototype.onClick;
    Sprite_Picture.prototype.onClick = function() {
        tryTrigger(this._pictureId, "Click");
        Origin_onClick.call(this);
    };

    const Origin_processTouch = Sprite_Picture.prototype.processTouch;
    Sprite_Picture.prototype.processTouch = function() {
        if (!isPluginEnabled) {
            return;
        }

        const picture = $gameScreen.picture(this._pictureId);

        if (!picture) {
            Origin_processTouch.call(this);
            return;
        }

        const pictureTrigger = picture.phileasPictureTrigger || {};
        const globalTrigger = globalPhileasPictureTrigger || {};

        const enterAct = pictureTrigger.Enter;
        const exitAct = pictureTrigger.Exit;
        const pressAct = pictureTrigger.Press;
        const clickAct = pictureTrigger.Click;
        const globalEnterAct = globalTrigger.Enter;
        const globalExitAct = globalTrigger.Exit;
        const globalPressAct = globalTrigger.Press;
        const globalClickAct = globalTrigger.Click;

        const anyEnter = !!(enterAct || globalEnterAct);
        const anyExit  = !!(exitAct  || globalExitAct);
        const anyPress = !!(pressAct || globalPressAct);
        const anyClick = !!(clickAct || globalClickAct);

        if (!anyEnter && !anyExit && !anyPress && !anyClick) {
            Origin_processTouch.call(this);
            return;
        }

        if (!this.isClickEnabled()) {
            this._hovered = false;
            this._pressed = false;
            delete this._prevEnterArea;
            delete this._prevExitArea;
            return;
        }

        const isInside = this.isBeingTouched();
        const isPixelOpaque = isInside && checkPixel(this);
        const isTriggered = TouchInput.isTriggered();
        const isReleased = TouchInput.isReleased();
     
        const nowOverEnter = !anyEnter
            ? isInside
            : isInside && (checkPixelByAct(isPixelOpaque, enterAct) || checkPixelByAct(isPixelOpaque, globalEnterAct));
        const nowOverExitArea = !anyExit
            ? isInside
            : isInside && (checkPixelByAct(isPixelOpaque, exitAct) || checkPixelByAct(isPixelOpaque, globalExitAct));

        if (this._prevEnterArea === undefined) {
            this._prevEnterArea = nowOverEnter;
        }

        if (!this._prevEnterArea && nowOverEnter) {
            this._hovered = true;

            if (anyEnter) {
                this.onMouseEnter();
            }
        }

        this._prevEnterArea = nowOverEnter;

        if (this._prevExitArea && !nowOverExitArea) {
            this._hovered = false;

            if (anyExit) {
                this.onMouseExit();
            }
        }

        this._prevExitArea = nowOverExitArea;

        const hitPressArea = !anyPress
            ? isInside
            : isInside && (checkPixelByAct(isPixelOpaque, pressAct) || checkPixelByAct(isPixelOpaque, globalPressAct));
        const hitClickArea = !anyClick
            ? isInside
            : isInside && (checkPixelByAct(isPixelOpaque, clickAct) || checkPixelByAct(isPixelOpaque, globalClickAct));

        if (isTriggered && (hitPressArea || hitClickArea)) {
            this._pressed = true;

            if (hitPressArea && anyPress) {
                this.onPress();
            }
        }

        if (this._pressed && isReleased && hitClickArea) {
            this._pressed = false;

            if (anyClick) {
                this.onClick();
            }
        }

        if (!TouchInput.isPressed()) {
            this._pressed = false;
        }
    };

    Spriteset_Base.prototype.phileasIsAnyPicturePressed = function() {
        if (!isPluginEnabled) {
            return false;
        }

        return this._pictureContainer.children.some(sprite =>
            sprite.isPressed()
        );
    };

    const Origin_Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
        return Origin_Scene_Map_isAnyButtonPressed.call(this) || this._spriteset.phileasIsAnyPicturePressed();
    };

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        isPluginEnabled = true;
        globalPhileasPictureTrigger = {};
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasIsPointerPictureTriggerEnabled = isPluginEnabled;
        contents.globalPhileasPictureTrigger = globalPhileasPictureTrigger;
        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        isPluginEnabled = contents.phileasIsPointerPictureTriggerEnabled == undefined
            ? true
            : contents.phileasIsPointerPictureTriggerEnabled;
        globalPhileasPictureTrigger = contents.globalPhileasPictureTrigger || {};
    };
}());
