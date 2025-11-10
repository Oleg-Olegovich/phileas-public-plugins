//=============================================================================
// Phileas_PointerPictureTrigger_MV.js
//=============================================================================
// [Update History]
// 2025.February.04 Ver1.0.0 First Release

/*:
 * @target MV
 * @plugindesc v1.0.0 Triggering of the switch/variable/common event when the pointer acts with the picture
 * @author Phileas
 *
 * @help
 * Triggering of a switch or a common event when the pointer with the picture acts:
 * enter, exit, press, click.
 * 
 * To invoke the plugin commands, use the "Script" command in the event.
 *
 * The plugin provides commands: 
 * 0) Phileas_PointerPictureTrigger.assignAction(params) - assigns a handler to one type of action with an picture.
 * 1) Phileas_PointerPictureTrigger.eraseAction(params) - removes the handler of a single action with an picture.
 * 2) Phileas_PointerPictureTrigger.eraseAllAction(params) - removes all picture handlers.
 * 3) Phileas_PointerPictureTrigger.assignGlobal(params) - assigns a handler for all pictures.
 * 4) Phileas_PointerPictureTrigger.eraseGlobal(params) - deletes the handler for all pictures.
 * 5) Phileas_PointerPictureTrigger.eraseAllGlobal() - deletes all global handlers.
 * 6) Phileas_PointerPictureTrigger.disablePlugin() - disables plugin.
 * 7) Phileas_PointerPictureTrigger.enablePlugin() - enables plugin.
 * 
 * params is a JS object. General view:
 * 
 * {
 *     "pictureId": 1,
 *     "switch": {"switchId":2,"switchState":true},
 *     "selfSwitch": {"mapId":0,"eventId":0,"selfSwitchId":"A","switchState":true},
 *     "variable": {"variableId":0,"variableDelta":0,"variableExactValue":0},
 *     "pictureVariableId": 0,
 *     "commonEventId": 0,
 *     "ignoreTransparentPixels": true,
 *     "runScript": "",
 *     "action": "Enter"
 * }
 * 
 * Field Descriptions:
 * pictureId - Picture ID
 * switch - the switch that will trigger when the action is performed
 *     (switchId - Switch ID, switchState - the value that will be written to the switch)
 * selfSwitch - the self switch that will trigger when the action is performed
 *     (mapId - Map ID, eventId - Event ID, selfSwitchId - Self Switch ID,
 *      switchState -  The value that will be written to the switch)
 * variable - the variable that will change when the action is performed
 *     (variableId - Variable ID, variableDelta - the value that will be added to the variable,
 *      variableExactValue - the value that will be assigned to the variable
 *      if the "Variable delta" is 0)
 * pictureVariableId - the number of the picture will be written to this variable when the action is performed.
 * commonEventId - ID of the common event that will be triggered when the action is performed.
 * runScript - an arbitrary JS script that will be executed at the trigger.
 * ignoreTransparentPixels - ignore transparent pixels (true or false).
 * action - type of action: Enter, Exit, Press or Click.
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

/*:ru
 * @target MV
 * @plugindesc v1.0.0 Срабатывание переключателя/переменной/общего события при действии указателя с картинкой
 * @author Phileas
 * 
 * @help
 * Срабатывание переключателя, переменной или общего события при действиях указателя с картинкой:
 * наведение, уведение, клик, нажатие.
 * 
 * Для вызова команд плагина используйте команду "Скрипт" в событии.
 *
 * Плагин предоставляет команды: 
 * 0) Phileas_PointerPictureTrigger.assignAction(params) - назначает обработчик на один тип действия с картинкой.
 * 1) Phileas_PointerPictureTrigger.eraseAction(params) - удаляет обработчик одного действия с картинкой.
 * 2) Phileas_PointerPictureTrigger.eraseAllAction(params) - удаляет все обработчики картинки.
 * 3) Phileas_PointerPictureTrigger.assignGlobal(params) - назначает обработчик для всех картинок.
 * 4) Phileas_PointerPictureTrigger.eraseGlobal(params) - удаляет обработчик для всех картинок.
 * 5) Phileas_PointerPictureTrigger.eraseAllGlobal() - удаляет все глобальные обработчики.
 * 6) Phileas_PointerPictureTrigger.disablePlugin() - отключает плагин.
 * 7) Phileas_PointerPictureTrigger.enablePlugin() - включает плагин.
 * 
 * params - это JS-объект. Общий вид:
 * 
 * {
 *     "pictureId": 1,
 *     "switch": {"switchId":2,"switchState":true},
 *     "selfSwitch": {"mapId":0,"eventId":0,"selfSwitchId":"A","switchState":true},
 *     "variable": {"variableId":0,"variableDelta":0,"variableExactValue":0},
 *     "pictureVariableId": 0,
 *     "commonEventId": 0,
 *     "ignoreTransparentPixels": true,
 *     "runScript": "",
 *     "action": "Enter"
 * }
 * 
 * Описания полей:
 * pictureId - ID картинки
 * switch - переключатель, который сработает при совершении действия
 *     (switchId - ID переключателя, switchState - значение, которое будет записано в переключатель)
 * selfSwitch - локальный переключатель, который сработает при совершении действия
 *     (mapId - ID карты, eventId - ID события, selfSwitchId - ID локального переключателя,
 *      switchState -  значение, которое будет записано в переключатель)
 * variable - переменная, которая изменится при совершении действия
 *     (variableId - ID переменной, variableDelta - значение, которое будет прибавлено к переменной,
 *      variableExactValue - значение, которое будет присвоено в переменную, 
 *      если variableDelta равна 0)
 * pictureVariableId - в эту переменную будет записываться номер картинки при совершении действия.
 * commonEventId - ID общего события, которое сработает при совершении действия
 * runScript - произвольный JS-скрипт, который будет исполнен при срабатывании триггера.
 * ignoreTransparentPixels - игнорировать прозрачные пиксели (true или false)
 * action - тип действия: Enter, Exit, Press или Click
 * 
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


//-----------------------------------------------------------------------------
// MODIFIED CODE

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
DataManager.setupNewGame = function() {
    Origin_setupNewGame.call(this);
    Phileas_PointerPictureTrigger.isPluginEnabled = true;
    Phileas_PointerPictureTrigger.globalPictureTrigger = {};
};

const Origin_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    let contents = Origin_makeSaveContents.call(this);
    contents.phileasIsPointerPictureTriggerEnabled = Phileas_PointerPictureTrigger.isPluginEnabled;
    contents.globalPhileasPictureTrigger = Phileas_PointerPictureTrigger.globalPictureTrigger;
    return contents;
};

const Origin_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
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
    if (!Phileas_PointerPictureTrigger.isPluginEnabled || !this._pictureContainer) {
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
