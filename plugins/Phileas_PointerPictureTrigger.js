//=============================================================================
// Phileas_PointerPictureTrigger.js
//=============================================================================
// [Update History]
// 2023.December.12 Ver1.0.0 First Release
// 2023.December.16 Ver1.1.0 Expanded functionality
// 2024.June.18 Ver1.2.0 Added picture number variable

/*
Title: Phileas_PointerPictureTrigger
Author: Phileas
Site: https://boosty.to/phileas
E-mail: olek.olegovich@gmail.com
Version: 1.1.0
*/

/*ru
Название: Phileas_PointerPictureTrigger
Автор: Phileas
Сайт: https://boosty.to/phileas
E-mail: olek.olegovich@gmail.com
Версия: 1.1.0
*/

/*:
 * @target MZ
 * @plugindesc Triggering of the switch/variable/common event when the pointer acts with the picture
 * @author Phileas
 *
 * @command assign
 * @text Assign
 * @desc Binds a switch, a variable, and a general event to a single action.
 *
 * @arg pictureId
 * @text Picture ID
 * @type number
 * @default 1
 *
 * @arg switchId
 * @text Switch ID
 * @type switch
 * @default 0
 *
 * @arg switchState
 * @text Switch state
 * @type boolean
 * @desc The value that will be written to the switch when the action is performed.
 * @default true
 *
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @default 0
 *
 * @arg variableDelta
 * @text Variable delta
 * @type number
 * @min -9999999
 * @desc The value that will be added to the variable when the action is performed.
 * @default 0
 * 
 * @arg variableExactValue
 * @text Variable exact value
 * @type number
 * @min -9999999
 * @desc The value that will be assigned to the variable when the action is performed if the "Variable delta" is 0.
 * @default 0
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
 * @arg switchId
 * @text ID переключателя
 * @type switch
 * @default 0
 *
 * @arg switchState
 * @text Состояние переключателя
 * @type boolean
 * @desc Значение, которое будет записано в переключатель при совершении действия.
 * @default true
 *
 * @arg variableId
 * @text ID переменной
 * @type variable
 * @default 0
 *
 * @arg variableDelta
 * @text Дельта переменной
 * @type number
 * @desc Значение, которое будет прибавлено к переменной при совершении действия.
 * @default 0
 * 
 * @arg variableExactValue
 * @text Точное значение пременной
 * @type number
 * @desc Значение, которое будет присвоено в переменную при совершении действия, если "Дельта перменной" равна 0.
 * @default 0
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
 * @help
 * Срабатывание переключателя или общего события при действиях указателя с картинкой:
 * наведение, уведение, клик, нажатие.
 *
 * Плагин предоставляет команды: 
 * 0) Назначить - назначает обработчик на один тип действия с картинкой.
 * 1) Удалить действие - удаляет обработчик одного действия с картинкой.
 * 2) Удалить все действия - удаляет все обработчики картинки.
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

(function() {

//--------MY CODE:    
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "assign", assignAction);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAction", eraseAction);
    PluginManager.registerCommand("Phileas_PointerPictureTrigger", "eraseAllAction", eraseAllAction);
    
    function assignAction(params) {
        const pictureId = Number(params["pictureId"]) || 1;
        const switchId = Number(params["switchId"]);
        const switchState = params["switchState"] == "true";
        const variableId = Number(params["variableId"]);
        const pictureVariableId = Number(params["pictureVariableId"]);
        const variableDelta = Number(params["variableDelta"]) || 0;
        const variableExactValue = Number(params["variableExactValue"]) || 0;
        const commonEventId = Number(params["commonEventId"]);
        const action = params["action"];
        
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            let act = {};
            act.pictureId = pictureId;
            act.switchId = switchId;
            act.switchState = switchState;
            act.variableId = variableId;
            act.pictureVariableId = pictureVariableId;
            act.variableDelta = variableDelta;
            act.variableExactValue = variableExactValue;
            act.commonEventId = commonEventId;
            
            if (picture.phileasPictureTrigger == undefined) {
                picture.phileasPictureTrigger = {};
            }
            
            picture.phileasPictureTrigger[action] = act;
        }
    }
    
    function eraseAction(params) {
        const pictureId = Number(params["pictureId"]) || 1;
        const action = params["action"];
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            picture.phileasPictureTrigger[action] = {};
        }
    }
    
    function eraseAllAction(params) {
        const pictureId = Number(params["pictureId"]) || 1;
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            picture.phileasPictureTrigger = {};
        }
    }
    
    function tryTrigger(picture, action) {
        if (picture == undefined || picture.phileasPictureTrigger == undefined) {
            return;
        }
        
        const act = picture.phileasPictureTrigger[action];
        
        if (act == undefined) {
            return;
        }
        
        if (act.switchId != undefined && act.switchId > 0 && act.switchState != undefined) {
            $gameSwitches.setValue(
                act.switchId,
                act.switchState);
        }
        
        if (act.variableId != undefined && act.variableId > 0) {
            if (act.variableDelta != undefined && act.variableDelta != 0) {
                const current = $gameVariables.value(act.variableId);
                $gameVariables.setValue(
                    act.variableId,
                    current + act.variableDelta);
            } else if (act.variableExactValue != undefined) {
                $gameVariables.setValue(
                    act.variableId,
                    act.variableExactValue);
            }
        }

        if (act.pictureVariableId != undefined && act.pictureVariableId > 0) {
            $gameVariables.setValue(
                act.pictureVariableId,
                act.pictureId);
        }
        
        if (act.commonEventId != undefined) {
            $gameTemp.reserveCommonEvent(act.commonEventId);
        }
    }

//--------CHANGED CORE:

    const Origin_onMouseEnter = Sprite_Picture.prototype.onMouseEnter;
    Sprite_Picture.prototype.onMouseEnter = function() {
        tryTrigger(this.picture(), "Enter");
        Origin_onMouseEnter.call(this);
    };
    
    const Origin_onMouseExit = Sprite_Picture.prototype.onMouseExit;
    Sprite_Picture.prototype.onMouseExit = function() {
        tryTrigger(this.picture(), "Exit");
        Origin_onMouseExit.call(this);
    };
    
    const Origin_onPress = Sprite_Picture.prototype.onPress;
    Sprite_Picture.prototype.onPress = function() {
        tryTrigger(this.picture(), "Press");
        Origin_onPress.call(this);
    };
    
    const Origin_onClick = Sprite_Picture.prototype.onClick;
    Sprite_Picture.prototype.onClick = function() {
        tryTrigger(this.picture(), "Click");
        Origin_onClick.call(this);
    };
}());
