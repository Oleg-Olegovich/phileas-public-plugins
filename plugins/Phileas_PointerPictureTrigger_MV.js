//=============================================================================
// Phileas_PointerPictureTrigger_MV.js
//=============================================================================
// [Update History]
// 2025.February.04 Ver1.0.0 First Release

/*:
 * @target MV
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
 * @target MV
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

"use strict";

var Phileas_PointerPictureTrigger = Phileas_PointerPictureTrigger || {};

Phileas_PointerPictureTrigger.globalPictureTrigger = {};
Phileas_PointerPictureTrigger.isPluginEnabled = true;

// Commands

Phileas_PointerPictureTrigger.assignAction = function(params) {
    const pictureId = Number(params["pictureId"]) || 1;
    const picture = $gameScreen.picture(pictureId);
    if (picture) {
        if (picture.phileasPictureTrigger == undefined) {
            picture.phileasPictureTrigger = {};
        }
        
        const action = params["action"];
        picture.phileasPictureTrigger[action] = this.getAct(params);
    }
}

Phileas_PointerPictureTrigger.eraseAction = function(params) {
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

Phileas_PointerPictureTrigger.eraseAllAction = function(params) {
    const pictureId = Number(params["pictureId"]) || 1;
    const picture = $gameScreen.picture(pictureId);
    if (picture) {
        picture.phileasPictureTrigger = {};
    }
}

Phileas_PointerPictureTrigger.assignGlobal = function(params) {
    const action = params["action"];
    Phileas_PointerPictureTrigger.globalPictureTrigger[action] = this.getAct(params);
}

Phileas_PointerPictureTrigger.eraseGlobal = function(params) {
    const action = params["action"];
    Phileas_PointerPictureTrigger.globalPictureTrigger[action] = undefined;
}

Phileas_PointerPictureTrigger.eraseAllGlobal = function() {
    Phileas_PointerPictureTrigger.globalPictureTrigger = {};
}

Phileas_PointerPictureTrigger.disablePlugin = function() {
    Phileas_PointerPictureTrigger.isPluginEnabled = false;
}

Phileas_PointerPictureTrigger.enablePlugin = function() {
    Phileas_PointerPictureTrigger.isPluginEnabled = true;
}

// Main

Phileas_PointerPictureTrigger.getAct = function(params) {
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
        const data = params["switch"];
        switchData.id = Number(data["switchId"]);
        switchData.state = data["switchState"];
    }

    if (params["selfSwitch"] != undefined && params["selfSwitch"] != "") {
        const data = params["selfSwitch"];
        selfSwitchData.mapId = Number(data["mapId"]);
        selfSwitchData.eventId = Number(data["eventId"]);
        selfSwitchData.id = data["selfSwitchId"];
        selfSwitchData.state = data["switchState"];
    }

    if (params["variable"] != undefined && params["variable"] != "") {
        const data = params["variable"];
        variableData.id = Number(data["variableId"]);
        variableData.delta = Number(data["variableDelta"]) || 0;
        variableData.exactValue = Number(data["variableExactValue"]) || 0;
    }
    
    const pictureVariableId = Number(params["pictureVariableId"]);
    const commonEventId = Number(params["commonEventId"]);
    const runScript = params["runScript"];
    const ignoreTransparentPixels = params["ignoreTransparentPixels"];

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

Phileas_PointerPictureTrigger.tryAct = function(act, pictureId, sprite) {
    if (act == undefined || !Phileas_PointerPictureTrigger.checkPixel(sprite, act)) {
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

Phileas_PointerPictureTrigger.tryTrigger = function(pictureId, action, sprite) {
    if (!Phileas_PointerPictureTrigger.isPluginEnabled) {
        return;
    }

    const picture = $gameScreen.picture(pictureId);

    if (picture != undefined && picture.phileasPictureTrigger != undefined) {
        this.tryAct(picture.phileasPictureTrigger[action], pictureId, sprite);
    }
    
    this.tryAct(Phileas_PointerPictureTrigger.globalPictureTrigger[action], pictureId, sprite);
}

Phileas_PointerPictureTrigger.checkPixel = function(sprite, act) {
    if (act == undefined) {
        return false;
    }

    if (act.ignoreTransparentPixels === true) {
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

        if (alpha === 0) {
            return false;
        }
    }

    return true;
}


// Changed code

Scene_Map.prototype.processMapTouch = function() {
    if (TouchInput.isTriggered() || this._touchCount > 0) {
        if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
            if (this._touchCount === 0 || this._touchCount >= 15) {
                var x = $gameMap.canvasToMapX(TouchInput.x);
                var y = $gameMap.canvasToMapY(TouchInput.y);
                $gameTemp.setDestination(x, y);
            }
            this._touchCount++;
        } else {
            this._touchCount = 0;
        }
    }
};

const Origin_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
    Origin_setupNewGame.call(this);
    Phileas_PointerPictureTrigger.isPluginEnabled = true;
    Phileas_PointerPictureTrigger.globalPictureTrigger = {};
};

const Origin_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    let contents = Origin_makeSaveContents.call(this);
    contents.phileasIsPointerPictureTriggerEnabled = Phileas_PointerPictureTrigger.isPluginEnabled;
    contents.globalPhileasPictureTrigger = Phileas_PointerPictureTrigger.globalPictureTrigger;
    return contents;
};

const Origin_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    Origin_extractSaveContents.call(this, contents);
    Phileas_PointerPictureTrigger.isPluginEnabled = contents.phileasIsPointerPictureTriggerEnabled == undefined
        ? true
        : contents.phileasIsPointerPictureTriggerEnabled;
    Phileas_PointerPictureTrigger.globalPictureTrigger = contents.globalPhileasPictureTrigger;
};

const Origin_TouchInput_clear = TouchInput.clear;
TouchInput.clear = function() {
    Origin_TouchInput_clear.call(this);
    this._hovered = false;
    this._events.hovered = false;
};

const Origin_TouchInput_update = TouchInput.update;
TouchInput.update = function() {
    Origin_TouchInput_update.call(this);
    this._hovered = this._events.hovered;
    this._events.hovered = false;
};

TouchInput._onMouseMove = function(event) {
    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);
    if (this._mousePressed) {
        this._onMove(x, y);
    } else if (Graphics.isInsideCanvas(x, y)) {
        this._onHover(x, y);
    }
};

const Origin_Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    Origin_Sprite_Picture_initialize.call(this, pictureId);
    this._pressed = false;
    this._hovered = false;
};

const Origin_Sprite_Picture_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
    Origin_Sprite_Picture_update.call(this);
    this.processTouch();
};


// New code

TouchInput.isHovered = function() {
    return this._hovered;
};

TouchInput._onHover = function(x, y) {
    this._events.hovered = true;
    this._x = x;
    this._y = y;
};

Sprite_Picture.prototype.hitTest = function(x, y) {
    const rect = new Rectangle(
        -this.anchor.x * this.width,
        -this.anchor.y * this.height,
        this.width,
        this.height
    );
    return rect.contains(x, y);
};

Sprite_Picture.prototype.isPressed = function() {
    return this._pressed;
};

Sprite_Picture.prototype.onMouseEnter = function() {
    Phileas_PointerPictureTrigger.tryTrigger(this._pictureId, "Enter", this);
};

Sprite_Picture.prototype.onMouseExit = function() {
    Phileas_PointerPictureTrigger.tryTrigger(this._pictureId, "Exit", this);
};

Sprite_Picture.prototype.onPress = function() {
    Phileas_PointerPictureTrigger.tryTrigger(this._pictureId, "Press", this);
};

Sprite_Picture.prototype.onClick = function() {
    Phileas_PointerPictureTrigger.tryTrigger(this._pictureId, "Click", this);
};

Sprite_Picture.prototype.isClickEnabled = function() {
    return this.visible;
};

Sprite_Picture.prototype.isBeingTouched = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y);
};

Sprite_Picture.prototype.processTouch = function() {
    if (!Phileas_PointerPictureTrigger.isPluginEnabled) {
        return;
    }

    const picture = $gameScreen.picture(this._pictureId);

    if (picture == undefined) {
        return;
    }

    if (this.isClickEnabled()) {
        if (this.isBeingTouched()) {
            if (!this._hovered && TouchInput.isHovered()) {
                this._hovered = true;
                this.onMouseEnter();
            }

            if (TouchInput.isTriggered()) {
                this._pressed = true;
                this.onPress();
            }
        } else {
            if (this._hovered) {
                this.onMouseExit();
            }

            this._pressed = false;
            this._hovered = false;
        }

        if (this._pressed && TouchInput.isReleased()) {
            this._pressed = false;
            this.onClick();
        }
    } else {
        this._pressed = false;
        this._hovered = false;
    }
};

Spriteset_Base.prototype.phileasIsAnyPicturePressed = function() {
    if (!Phileas_PointerPictureTrigger.isPluginEnabled) {
        return false;
    }

    return this._pictureContainer.children.some(sprite =>
        sprite.isPressed()
    );
};

const Origin_Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function() {
    return this._spriteset.phileasIsAnyPicturePressed();
};
