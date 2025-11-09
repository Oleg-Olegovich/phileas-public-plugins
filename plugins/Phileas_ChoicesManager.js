//=============================================================================
// Phileas_ChoicesManager.js
//=============================================================================
// [Update History]
// 2025.November.08 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 Advanced choices window management
 * @author Phileas
 * 
 * @param combineChoices
 * @text Combine Choices
 * @desc Combines consecutive "Show Choices" commands into a single list
 * @type boolean
 * @default false
 * 
 * 
 * @command hideChoice
 * @text Hide Choice
 *
 * @arg id
 * @text Choice ID
 * @type number
 * @desc The choices numbering starts from 1
 * @min 1
 * @default 1
 *
 * @arg condition
 * @text Condition
 * @desc Examples: "true", "$gameSwitches.value(5) === false"
 * @default true
 * 
 * 
 * @command disableChoice
 * @text Disable Choice
 *
 * @arg id
 * @text Choice ID
 * @type number
 * @desc The choices numbering starts from 1
 * @min 1
 * @default 1
 *
 * @arg condition
 * @text Condition
 * @desc Examples: "true", "$gameSwitches.value(5) === false"
 * @default true
 * 
 * 
 * @help
 * 
 * The plugin extends the control of the election window:
 * 1) Combining consecutive selection windows into one.
 * 2) Hiding choices by condition.
 * 3) Disabling choices by condition.
 * The functionality will be expanded according to user requests.
 * 
 * Parameters:
 * 1) "Combine Choices"
 *    If there are several "Show Choices" commands
 *    in the event one after the other, their choices will be combined
 *    in one list, which will be reflected in one choices window.
 * 
 * Commands:
 * 1) "Hide Choice"
 *    Hides the choice in the next choices window if
 *    the condition is fulfilled. The condition is set by the JS code.
 *    Examples of conditions:
 *    "true" - the choice is always hidden
 *    "$gameSwitches.value(5) === false" - the switch with the index 5 is off
 *    "$gameVariables.value(3) > 5" the variable with index 3 is greater than 5
 * 2) "Disable Choice"
 *    Disables the choice in the next choices window if
 *    the condition is met (similar to the previous command).
 *    The choice will be displayed in the window, but it cannot be selected.
 *
 * Script calls:
 * 1) hideChoice(id, condition)
 *     An analog of the "Hide Choice" command. Example:
 *     hideChoice(2, "$gameSwitches.value(5) === false");
 * 2) disableChoice(id, condition)
 *
 * This plugin is compatible with my other plugins,
 * for example - Phileas_InputSubWindowsInMessage (displays choices inside the message window).
 * 
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * This means that you can freely use the plugin in
 * non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */

/*:ru
 * @target MZ
 * @plugindesc v1.0.0 Расширенное управление окном выборов
 * @author Phileas
 * 
 * @param combineChoices
 * @text Объединять выборы
 * @desc Объединяет последовательные команды "Показать выбор" в один список
 * @type boolean
 * @default false
 * 
 * 
 * @command hideChoice
 * @text Скрыть опцию выбора
 *
 * @arg id
 * @text Choice ID
 * @type number
 * @desc Нумерация выборов начинается с 1
 * @min 1
 * @default 1
 *
 * @arg condition
 * @text Условие
 * @desc Примеры: "true", "$gameSwitches.value(5) === false"
 * @default true
 * 
 * 
 * @command disableChoice
 * @text Отключить опцию выбора
 *
 * @arg id
 * @text Choice ID
 * @type number
 * @desc Нумерация выборов начинается с 1
 * @min 1
 * @default 1
 *
 * @arg condition
 * @text Условие
 * @desc Примеры: "true", "$gameSwitches.value(5) === false"
 * @default true
 * 
 * 
 * @help
 * 
 * Плагин расширяет управление окном выборов:
 * 1) Объединение последовательных окон выбора в одно.
 * 2) Скрытие опций по условию.
 * 3) Отключение опций по условию.
 * Функционал будет расширяться по запросам пользователей.
 * 
 * Параметры:
 * 1) "Объединять выборы"
 *    Если в событии несколько команд "Показать выбор"
 *    идут одна за другой, то их опции будут объединены
 *    в один список, который отразится в одной окне выбора.
 * 
 * Команды:
 * 1) "Скрыть опцию выбора"
 *    Скрывает опцию в следующем окне выбора, если
 *    выполняется условие. Условие задаётся JS-кодом.
 *    Примеры условий:
 *    "true" - опция всегда скрывается
 *    "$gameSwitches.value(5) === false" - переключатель
 *                                 с индексом 5 выключен
 *    "$gameVariables.value(3) > 5" - переменная с
 *                             индексом 3 больше 5
 * 2) "Отключить опцию выбора"
 *    Отключает опцию в следующем окне выбора, если
 *    выполняется условие (по аналогии с предыдущей командой).
 *    Опция будет отображаться в окне, но её нельзя будет выбрать.
 * 
 * Скрипты:
 * 1) hideChoice(id, condition)
 *    Аналог команды "Скрыть опцию выбора". Пример:
 *    hideChoice(2, "$gameSwitches.value(5) === false");
 * 2) disableChoice(id, condition)
 * 
 * Этот плагин совместим с другими моими плагинами,
 * например - Phileas_InputSubWindowsInMessage (отображает выборы внутри окна сообщения).
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин
 * в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(function() {

    "use strict";

//-----------------------------------------------------------------------------
// MY CODE

//-----------------------------------------------------------------------------
// Data

    const $parameters = PluginManager.parameters("Phileas_ChoicesManager");
    const $combineChoices = $parameters["combineChoices"] === "true";


//-----------------------------------------------------------------------------
// API

    window.hideChoice = function(id, condition) {
        $gameMessage.hideChoice(id - 1, condition);
    };

    window.disableChoice = function(id, condition) {
        $gameMessage.disableChoice(id - 1, condition);
    };


//-----------------------------------------------------------------------------
// Commands

    PluginManager.registerCommand("Phileas_ChoicesManager", "hideChoice", hideChoiceByCommand);
    PluginManager.registerCommand("Phileas_ChoicesManager", "disableChoice", disableChoiceByCommand);

    function hideChoiceByCommand(params) {
        const id = Number(params["id"]) - 1;
        const condition = params["condition"];
        $gameMessage.hideChoice(id, condition);
    }

    function disableChoiceByCommand(params) {
        const id = Number(params["id"]) - 1;
        const condition = params["condition"];
        $gameMessage.disableChoice(id, condition);
    }


//-----------------------------------------------------------------------------
// Objects

    Game_Message.prototype.hideChoice = function(id, condition) {
        const flag = eval(condition);
        this._hiddenChoices[id] = flag;
    };

    Game_Message.prototype.disableChoice = function(id, condition) {
        const flag = eval(condition);
        this._disabledChoices[id] = flag;
    };

    Game_Message.prototype.isChoiceHidden = function(id) {
        return !!this._hiddenChoices[id];
    };

    Game_Message.prototype.isChoiceDisabled = function(id) {
        return !!this._disabledChoices[id];
    };


//-----------------------------------------------------------------------------
// MODIFIED CODE

//-----------------------------------------------------------------------------
// Windows

    const Origin_Window_ChoiceList_makeCommandList = Window_ChoiceList.prototype.makeCommandList;
    Window_ChoiceList.prototype.makeCommandList = function() {
        Origin_Window_ChoiceList_makeCommandList.call(this);
        for (var i = 0; i < this._list.length; ++i) {
            if ($gameMessage.isChoiceDisabled(i)) {
                this._list[i].enabled = false;
            }
        }
    };

    const Origin_Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
    Window_ChoiceList.prototype.drawItem = function(index) {
        this.changePaintOpacity(!$gameMessage.isChoiceDisabled(index));
        Origin_Window_ChoiceList_drawItem.call(this, index);
    };


//-----------------------------------------------------------------------------
// Objects

    const Origin_Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        Origin_Game_Message_clear.call(this);
        this._hiddenChoices = [];
        this._disabledChoices = [];
    };

    Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
        this._choiceDefaultType = defaultType;
        this._choiceCancelType = cancelType;

        let choicesArr = [];
        for (let i = 0; i < choices.length; ++i) {
            if (this.isChoiceHidden(i)) {
                continue;
            }

            choicesArr.push({
                id: i,
                text: choices[i],
                disabled: this.isChoiceDisabled(i)
            });
        }

        this._hiddenChoices = [];
        this._disabledChoices = [];
        this._choices = [];
        this._choicesMap = [];
        for (let i = 0; i < choicesArr.length; ++i) {
            this._choices.push(choicesArr[i].text);
            this._disabledChoices[i] = choicesArr[i].disabled;
            this._choicesMap[i] = choicesArr[i].id;
        }
    };

    Game_Message.prototype.onChoice = function(n) {
        if (this._choiceCallback) {
            n = this._choicesMap[n];
            this._choiceCallback(n);
            this._choiceCallback = null;
            this._choicesMap = [];
        }
    };

    const Origin_Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function(params) {
        if (!$combineChoices) {
            Origin_Game_Interpreter_setupChoices.call(this, params);
            return;
        }

        this._list = JSON.parse(JSON.stringify(this._list));
        let choicesLength = 0;
        const firstCommand = this._list[this._index];    

        for (let i = this._index + 1; i < this._list.length; ++i) {
            const command = this._list[i];
            const nextCommand = this._list[i + 1];

            if (command.indent !== this._indent) {
                continue;
            }

            if (command.code === 404 && (!nextCommand || nextCommand.code !== 102)) {
                break;
            }

            if (command.code === 402) {          
                command.parameters[0] = choicesLength;
                ++choicesLength;
            }
            
            if (command.code !== 102) {
                continue;
            }

            const cancelType = command.parameters[1];
            if (cancelType > -1) {
                firstCommand.parameters[1] = cancelType + choicesLength;
            } else if (cancelType === -2) {
                firstCommand.parameters[1] = cancelType;            
            }
  
            const defaultChoice = command.parameters[2];
            if (defaultChoice > -1) {
                firstCommand.parameters[2] = defaultChoice + choicesLength;
            }

            const choices = command.parameters[0];                    
            for (let j = 0; j < choices.length; ++j) {
                firstCommand.parameters[0].push(choices[j]);
            }    

            this._list.splice(i - 1, 2);
            i -= 2;
        }

        Origin_Game_Interpreter_setupChoices.call(this, firstCommand.parameters);
    };

})();
