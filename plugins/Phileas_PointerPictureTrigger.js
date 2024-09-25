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

/*:
 * @target MZ
 * @plugindesc Triggering of the switch/variable/common event when the pointer acts with the picture
 * @author Phileas
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
 * @command eraseAction
 * @text Erase action
 * @desc Remove the binding to a single picture action.
 * @arg pictureId
 * @text Picture ID
 * @type number
 * @default 1
 * @arg action
 * @text Action
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 *
 * @command eraseAllAction
 * @text Erase all actions
 * @desc Removes bindings to all actions of the picture.
 * @arg pictureId
 * @text Picture ID
 * @type number
 * @default 1
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
 * @plugindesc Срабатывание переключателя/переменной/общего события при действии указателя с картинкой
 * @author Phileas
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
 * @command eraseAction
 * @text Удалить действие
 * @desc Удалить привязку к одному действию картинки.
 * @arg pictureId
 * @text ID картинки
 * @type number
 * @default 1
 * @arg action
 * @text Действие
 * @type combo
 * @option Enter
 * @option Exit
 * @option Press
 * @option Click
 * @default Enter
 *
 * @command eraseAllAction
 * @text Удалить все действия
 * @desc Удаляет привязки ко всем действиям картинки.
 * @arg pictureId
 * @text ID картинки
 * @type number
 * @default 1
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
 * @command eraseAllAction
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

(function() {

//--------MY CODE:    
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "assign", assignAction);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAction", eraseAction);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAllAction", eraseAllAction);
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
        const ignoreTransparentPixels = params["ignoreTransparentPixels"] == "true";

        let act = {};
        act.switchData = switchData;
        act.selfSwitchData = selfSwitchData;
        act.variableData = variableData;
        act.pictureVariableId = pictureVariableId;
        act.commonEventId = commonEventId;
        act.ignoreTransparentPixels = ignoreTransparentPixels;

        return act;
    }

    function assignAction(params) {
        const pictureId = Number(params["pictureId"]) || 1;
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
        const pictureId = Number(params["pictureId"]) || 1;
        const action = params["action"];
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            if (picture.phileasPictureTrigger == undefined) {
                picture.phileasPictureTrigger = {};
            }

            picture.phileasPictureTrigger[action] = undefined;
        }
    }
    
    function eraseAllAction(params) {
        const pictureId = Number(params["pictureId"]) || 1;
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            picture.phileasPictureTrigger = {};
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

    function checkPixel(sprite, act) {
        if (act == undefined) {
            return true;
        }

        if (act.ignoreTransparentPixels === true) {
            const touchPos = new Point(TouchInput.x, TouchInput.y);
            const localPos = sprite.worldTransform.applyInverse(touchPos);
            const bitmap = sprite._bitmap;
            const alpha = bitmap.getAlphaPixel(localPos.x, localPos.y);

            if (alpha === 0) {
                return false;
            }
        }

        return true;
    }

//--------CHANGED CORE:

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

        if (picture == undefined || picture.phileasPictureTrigger == undefined
            || picture.phileasPictureTrigger["Enter"] == undefined
            && picture.phileasPictureTrigger["Exit"] == undefined
            && picture.phileasPictureTrigger["Press"] == undefined
            && picture.phileasPictureTrigger["Click"] == undefined) {

            Origin_processTouch.call(this);
            return;
        }
        
        enterAct = picture.phileasPictureTrigger["Enter"];
        exitAct = picture.phileasPictureTrigger["Exit"];
        pressAct = picture.phileasPictureTrigger["Press"];
        clickAct = picture.phileasPictureTrigger["Click"];

        if (this.isClickEnabled()) {
            if (this.isBeingTouched()) {
                if (!this._hovered && TouchInput.isHovered() && checkPixel(this, enterAct)) {
                    this._hovered = true;
                    this.onMouseEnter();
                }
                if (TouchInput.isTriggered() && checkPixel(this, pressAct)) {
                    this._pressed = true;
                    this.onPress();
                }
            } else {
                if (this._hovered && (exitAct == undefined || checkPixel(this, exitAct))) {
                    this.onMouseExit();
                }
                this._pressed = false;
                this._hovered = false;
            }
            if (this._pressed && TouchInput.isReleased() && checkPixel(this, clickAct)) {
                this._pressed = false;
                this.onClick();
            }
        } else {
            this._pressed = false;
            this._hovered = false;
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
    DataManager.setupNewGame = function () {
        Origin_setupNewGame.call(this);
        isPluginEnabled = true;
        globalPhileasPictureTrigger = {};
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasIsPointerPictureTriggerEnabled = isPluginEnabled;
        contents.globalPhileasPictureTrigger = globalPhileasPictureTrigger;
        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        Origin_extractSaveContents.call(this, contents);
        isPluginEnabled = contents.phileasIsPointerPictureTriggerEnabled == undefined
            ? true
            : contents.phileasIsPointerPictureTriggerEnabled;
        globalPhileasPictureTrigger = contents.globalPhileasPictureTrigger;
    };
}());
