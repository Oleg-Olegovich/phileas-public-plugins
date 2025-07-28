//=============================================================================
// Phileas_InputSubWindowsInMessage.js
//=============================================================================
// [Update History]
// 2025.March.12 Ver1.0.0 First Release
// 2025.July.28 Ver1.1.0 Added a mode for displaying a limited number of choices

/*:
 * @target MZ
 * @plugindesc v1.0.0 Choices and number input windows in message window
 * @author Phileas
 * 
 * @param numVisibleRows
 * @text Min message window visible rows number
 * @type number
 * @default 4
 * @min 1
 * 
 * 
 * @param choicesDisplay
 * @text Choices display
 * 
 * @param choicesDisplayMode
 * @parent choicesDisplay
 * @text Mode
 * @type select
 * @option All at once
 * @value all
 * @option Limited number
 * @value limited
 * @default all
 * 
 * @param choicesMaxVisible
 * @parent choicesDisplay
 * @text Max number of visible options
 * @desc If the "Limited number" display mode is selected
 * @type number
 * @min 1
 * @default 4
 * 
 * 
 * @help
 * 
 * This plugin displays choices and number input windows in message window.
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
 * @plugindesc v1.0.0 Окна выбора и ввода числа в окне сообщения
 * @author Phileas
 * 
 * @param numVisibleRows
 * @text Мин. кол-во видимых строк в окне сообщения
 * @type number
 * @default 4
 * @min 1
 * 
 * 
 * @param choicesDisplay
 * @text Отображение выборов
 * 
 * @param choicesDisplayMode
 * @parent choicesDisplay
 * @text Режим
 * @type select
 * @option Все сразу
 * @value all
 * @option С ограничением
 * @value limited
 * @default all
 * 
 * @param choicesMaxVisible
 * @parent choicesDisplay
 * @text Макс. кол-во отображаемых опций
 * @desc Если выбран режим отбражения "С ограничением"
 * @type number
 * @min 1
 * @default 4
 * 
 * 
 * @help
 * 
 * Этот плагин отображает окна выбора и ввода числа в окне сообщения.
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(function() {

    "use strict";

//--------MY CODE:

//-----------------------------------------------------------------------------
// Data

    const $parameters = PluginManager.parameters("Phileas_InputSubWindowsInMessage");
    const $numVisibleRows = Number($parameters["numVisibleRows"] || 4);
    const $choicesDisplayMode = $parameters["choicesDisplayMode"];
    const $choicesMaxVisible = Number($parameters["choicesMaxVisible"] || 4);

//-----------------------------------------------------------------------------
// Objects

    Game_Message.prototype.phileasMessageLines = function() {
        return this._texts.length;
    };

    Game_Message.prototype.phileasChoiceLines = function() {
        return this._choices.length;
    };

    Game_Message.prototype.phileasIsChoiceOrInput = function() {
        return this.isChoice() || this.isNumberInput();
    };


//-----------------------------------------------------------------------------
// Windows

    Window_Base.prototype.phileasIsInnerMessage = function() {
        return false;
    };

    Window_ChoiceList.prototype.phileasIsInnerMessage = function() {
        return true;
    };
  
    Window_NumberInput.prototype.phileasIsInnerMessage = function() {
        return true;
    };

    Window_NumberInput.prototype.phileasWindowX = function() {
        return this._messageWindow
            ? (Graphics.width - this._messageWindow.width) / 2
            : 0;
    };

    Window_Message.prototype.phileasGetTextStateHeight = function() {
        return this._textState ? this._textState.y + this._textState.height : 0;
    };

    Window_Message.prototype.phileasWindowHeight = function() {
        return this.fittingHeight($numVisibleRows);
    };

    Window_Message.prototype.phileasOpenForChoice = function() {
        if (!this._textState) {
            this.contents.clear();
        }

        if ($gameMessage.isChoice()) {
            const height = $gameMessage.phileasMessageLines() * this.itemHeight()
                + this._choiceListWindow.windowHeight();

            if (height > this.height) {
                this.height = height;
            }
        } else if ($gameMessage.isNumberInput()) {
            const height = $gameMessage.phileasMessageLines() * this.itemHeight()
                + this._numberInputWindow.windowHeight();

            if (height > this.height) {
                this.height = height;
            }
        }

        this.updatePlacement();
        this.open();
    };

    Window_Message.prototype.phileasSubWindows = function() {
        return [
            this._goldWindow,
            this._nameBoxWindow,
            this._choiceListWindow,
            this._numberInputWindow,
            this._eventItemWindow
        ];
    };


//-----------------------------------------------------------------------------
// Scenes

    Scene_Message.prototype.phileasChangeChoiceWindowParent = function() {
        const subWindows = this._messageWindow.phileasSubWindows();
        subWindows.forEach(function(window) {
            if (window && window.phileasIsInnerMessage()) {
                this.addChild(this._windowLayer.removeChild(window));
            }
        }, this);
    };

    const Origin_Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function() {
        Origin_Scene_Message_createAllWindows.call(this);
        this.phileasChangeChoiceWindowParent();
    };


//--------MODIFIED CODE:

//-----------------------------------------------------------------------------
// Windows

    const Origin_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        this.height = this.phileasWindowHeight();
        Origin_Window_Message_startMessage.call(this);
    };

    const Origin_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        Origin_Window_Message_updatePlacement.call(this);

        this._nameBoxWindow.y = this.y - this._nameBoxWindow.height;
    };

    const Origin_Window_Message_doesContinue = Window_Message.prototype.doesContinue;
    Window_Message.prototype.doesContinue = function() {
        return Origin_Window_Message_doesContinue.call(this)
            || $gameMessage.phileasIsChoiceOrInput();
    };

    const Origin_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function() {
        this._messageWindow.phileasOpenForChoice();
        Origin_Window_ChoiceList_start.call(this);
    };

    const Origin_Window_ChoiceList_updateBackground = Window_ChoiceList.prototype.updateBackground;
    Window_ChoiceList.prototype.updateBackground = function() {
        Origin_Window_ChoiceList_updateBackground.call(this);
        this.opacity = 0;
        this.setBackgroundType(2);
    };

    Window_ChoiceList.prototype.windowX = function() {
        return this._messageWindow
            ? (Graphics.width - this._messageWindow.width) / 2
            : 0;
    };

    Window_ChoiceList.prototype.windowY = function() {
        return this._messageWindow
            ? this._messageWindow.y + this._messageWindow.phileasGetTextStateHeight() + $gameSystem.windowPadding()
            : 0;
    };

    Window_ChoiceList.prototype.windowWidth = function() {
        return this._messageWindow
            ? this._messageWindow.width
            : this.innerWidth;
    };

    Window_ChoiceList.prototype.contentsWidth = function() {
        return this.windowWidth();
    };

    const Origin_Window_ChoiceList_itemRect = Window_ChoiceList.prototype.itemRect;
    Window_ChoiceList.prototype.itemRect = function(index) {
        const rect = Origin_Window_ChoiceList_itemRect.call(this, index);

        if (!this._messageWindow) {
            return rect;
        }

        const newLineX = this._messageWindow.newLineX({ rtl: false });
        rect.x += newLineX;
        rect.width = this.windowWidth() - rect.x - 2 * $gameSystem.windowPadding();

        return rect;
    };

    const Origin_Window_ChoiceList_drawItemBackground = Window_ChoiceList.prototype.drawItemBackground;
    Window_ChoiceList.prototype.drawItemBackground = function(index) {
        if (!this._messageWindow) {
            Origin_Window_ChoiceList_drawItemBackground.call(this, index);
        }
    };

    Window_ChoiceList.prototype.maxLines = function() {
        const total = $gameMessage.choices().length;
        return $choicesDisplayMode === "limited"
            ? Math.min($choicesMaxVisible, total)
            : total;
    };

    const Origin_Window_NumberInput_start = Window_NumberInput.prototype.start;
    Window_NumberInput.prototype.start = function() {
        this._messageWindow.phileasOpenForChoice();
        Origin_Window_NumberInput_start.call(this);
    };

    const Origin_Window_NumberInput_updatePlacement = Window_NumberInput.prototype.updatePlacement;
    Window_NumberInput.prototype.updatePlacement = function() {
        Origin_Window_NumberInput_updatePlacement.call(this);

        this.opacity = 0;
        this.setBackgroundType(2);

        this.x = this.phileasWindowX();
        this.y = this._messageWindow.y + this._messageWindow.phileasGetTextStateHeight() + $gameSystem.windowPadding();
    };

    Window_NumberInput.prototype.windowWidth = function() {
        return this._messageWindow
            ? this._messageWindow.width
            : this.innerWidth;
    };

    const Origin_Window_NumberInput_drawItemBackground = Window_NumberInput.prototype.drawItemBackground;
    Window_NumberInput.prototype.drawItemBackground = function(index) {
        if (!this._messageWindow) {
            Origin_Window_NumberInput_drawItemBackground.call(this, index);
        }
    };

})();
