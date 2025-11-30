//=============================================================================
// Phileas_OpenMenuPlus.js
//=============================================================================
// [Update History]
// 2025.May.11 Ver1.0.0 First Release
// 2025.July.12 Ver1.0.1 Fixed checking for third-party plugins
// 2025.November.09 Ver1.0.2 Enabled menu button visibility
// 2025.November.10 Ver1.0.3 Fixed compatibility with Phileas_PointerPictureTrigger
//                           Fixed opening the menu via Escape
// 2025.November.30 Ver1.0.4 Fixed state restoring

/*:
 * @target MZ
 * @plugindesc v1.0.4 Open the menu during event processing (messages&choices)
 * @author Phileas
 *
 * 
 * @help
 * 
 * Open the menu during event processing (messages and choices).
 * 
 * If you use plugins that modify messages or choices,
 * then place Phileas_OpenMenuPlus under them in the plugins menu.
 * 
 * Plugin features:
 * - Correct processing of saves during a parallel event.
 * - Restore the position of the choices window after loading.
 * - Menu button is visible during event processing.
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
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MZ
 * @plugindesc v1.0.4 Открывает меню во время обработки событий (сообщения&выборы)
 * @author Phileas
 *
 * 
 * @help
 * 
 * Открывает меню во время обработки событий (сообщения и выборы).
 * 
 * Если вы используете плагины, которые модифицируют сообщения или выборы,
 * то разместите Phileas_OpenMenuPlus под ними в меню плагинов.
 * 
 * Особенности плагина:
 * - Корректная обработка сохранений во время параллельного события.
 * - Восстановление положения окна выбора после загрузки.
 * - Кнопка меню видна при обработке события.
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
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

 "use strict";

 (function() {

//-----------------------------------------------------------------------------
// MY CODE:

    let $savedStates = {};
    const $isImportedDefined = typeof Imported !== "undefined";
    

    function extract(interpreter) {
        if (!interpreter) {
            return null;
        }

        return {
            index: Math.max(interpreter._index - 1, 0),
            depth: interpreter._depth
        };
    }

    function restore(interpreter, state) {
        interpreter._index = state.index;
        interpreter._depth = state.depth;
    }

    function restoreByKey(interpreter, stateKey) {
        const state = $savedStates[stateKey];

        if (!state) {
            return;
        }

        restore(interpreter, state);
        delete $savedStates[stateKey];
    }

    Game_Temp.prototype.setLastSelectedChoice = function(choice) {
        this._lastSelectedChoice = choice;
    };

    Game_Temp.prototype.clearLastSelectedChoice = function() {
        this._lastSelectedChoice = null;
    };

    Game_Temp.prototype.getLastSelectedChoice = function() {
        return this._lastSelectedChoice;
    };

    Game_Temp.prototype.saveChoicesInterpreter = function(interpreter) {
        this._savedInterpreter = interpreter;
    };

    Game_Temp.prototype.clearChoicesInterpreter = function() {
        this._savedInterpreter = null;
    };

    Game_Temp.prototype.getChoicesInterpreter = function() {
        return this._savedInterpreter;
    };

    Game_Interpreter.prototype.getStateKey = function() {
        const eventId = this._eventId;

        if (this === $gameMap._interpreter) {
            return `map:${$gameMap._mapId}:${eventId}`;
        }
        
        if (this._commonEventId != undefined) {
            return `common:${this._commonEventId}:${this._depth}`;
        }

        const eventObject = $gameMap.event(eventId);
    
        if (!eventObject) {
            return null;
        }

        const pageId = eventObject._pageIndex;
        return `event:${$gameMap._mapId}:${eventId}:${this._depth}:${pageId || 0}`;
    };

    Game_Interpreter.prototype.restoreState = function() {
        const stateKey = this.getStateKey();
        restoreByKey(this, stateKey);
    };

//-----------------------------------------------------------------------------
// MODIFIED CODE

    const Origin_Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        Origin_Game_Temp_initialize.call(this);
        this._lastSelectedChoice = null;
        this._savedInterpreter = null;
    };

    const Origin_Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function(params) {
        Origin_Game_Interpreter_setupChoices.call(this, params);
        $gameTemp.saveChoicesInterpreter(this);
    };

    const Origin_Game_Interpreter_update = Game_Interpreter.prototype.update;
    Game_Interpreter.prototype.update = function() {
        if (this.isRunning()) {
            this.restoreState();
        }
    
        Origin_Game_Interpreter_update.call(this);
    };

    const Origin_Game_CommonEvent_refresh = Game_CommonEvent.prototype.refresh;
    Game_CommonEvent.prototype.refresh = function() {
        Origin_Game_CommonEvent_refresh.call(this);
        if (this._interpreter) {
            this._interpreter._commonEventId = this._commonEventId;
        }
    };

    const Origin_Window_Message_isTriggered = Window_Message.prototype.isTriggered;
    Window_Message.prototype.isTriggered = function() {
        const scene = SceneManager._scene;

        if (Input.isRepeated("cancel")
            || scene instanceof Scene_Message && scene._menuButton && scene._menuButton._hovered) {
            return false;
        }

        return Origin_Window_Message_isTriggered.call(this);
    };

    const Origin_Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler
    Window_ChoiceList.prototype.callOkHandler = function() {
        $gameTemp.clearLastSelectedChoice();
        $gameTemp.clearChoicesInterpreter();
        Origin_Window_ChoiceList_callOkHandler.call(this);
    };

    const Origin_Window_ChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler
    Window_ChoiceList.prototype.callCancelHandler = function() {
        $gameTemp.clearLastSelectedChoice();
        $gameTemp.clearChoicesInterpreter();
        Origin_Window_ChoiceList_callCancelHandler.call(this);
    };

    const Origin_Window_ChoiceList_selectDefault = Window_ChoiceList.prototype.selectDefault
    Window_ChoiceList.prototype.selectDefault = function() {
        const index = $gameTemp.getLastSelectedChoice();
        if (index !== null && index !== undefined) {
            this.select($gameTemp.getLastSelectedChoice());
            return;
        }

        Origin_Window_ChoiceList_selectDefault.call(this); 
    };

    const Origin_Window_ChoiceList_update = Window_ChoiceList.prototype.update
    Window_ChoiceList.prototype.update = function() {
        Origin_Window_ChoiceList_update.call(this);

        if ((Input.isTriggered("escape") || Input.isTriggered("menu") || TouchInput.isCancelled())
            && $gameMessage.isBusy() && $gameSystem.isMenuEnabled()) {

            $gameTemp.setLastSelectedChoice(this._index);
        }
    };

    const Origin_Window_ChoiceList_windowY = Window_ChoiceList.prototype.windowY;
    Window_ChoiceList.prototype.windowY = function() {
        this._messageWindow.updatePlacement();
        return Origin_Window_ChoiceList_windowY.call(this);
    };

    const Origin_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        Origin_Scene_Map_update.call(this);

        const isTriggered = Input.isTriggered("escape") || Input.isTriggered("menu") || TouchInput.isCancelled();
        const isEnabled = $gameMessage.isBusy() && $gameSystem.isMenuEnabled() && !Video.isPlaying();

        if (isTriggered && isEnabled) {
            this.callMenu();
        }
    };

    Scene_Map.prototype.isMenuEnabled = function() {
        return $gameSystem.isMenuEnabled();
    };

    const Origin_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        const contents = Origin_DataManager_makeSaveContents.call(this);

        const choicesInterpreter = $gameTemp.getChoicesInterpreter();

        if (!choicesInterpreter) {
            contents.message = $gameMessage;
            return contents;
        }

        const stateKey = choicesInterpreter.getStateKey();
        contents.interpreters = [
            {
                stateKey: stateKey,
                state: extract(choicesInterpreter)
            }
        ];
        
        return contents;
    };

    const Origin_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_DataManager_extractSaveContents.call(this, contents);

        $savedStates = {};

        if (!contents.interpreters) {
            if (contents.message) {
                $gameMessage = contents.message;
            }

            return;
        }

        contents.interpreters.forEach(function(item) {
            const stateKey = item.stateKey;
            const state = item.state;

            if (!stateKey || !state) {
                return;
            }

            $savedStates[stateKey] = state;
        });
    };

//--------COMPATIBILITY:

    // HIME_HiddenChoiceConditions
    if ($isImportedDefined && Imported.HiddenChoiceConditions) {
        const Origin_Window_ChoiceList_makeCommandList = Window_ChoiceList.prototype.makeCommandList
        Window_ChoiceList.prototype.makeCommandList = function() {
            if (SceneManager._scene.isActive()) {
                Origin_Window_ChoiceList_makeCommandList.call(this);
            }
        }
    }

    if ($isImportedDefined && Imported.Galv_VisualNovelChoices) {
        const Origin_Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem 
        Window_ChoiceList.prototype.drawItem = function(index) {
            if (!this.choice_background){
                this.choice_background = [];
            };

            Origin_Window_ChoiceList_drawItem.call(this, index);
        };
    }
    
    if ($isImportedDefined && Imported["SumRndmDde Title Command Customizer"]) {
        const Origin_Scene_Title_createMessageWindow = Scene_Title.prototype.createMessageWindow
        Scene_Title.prototype.createMessageWindow = function() {
            $gameMessage.clear();
            Origin_Scene_Title_createMessageWindow.call(this);
        };
    }

}());
