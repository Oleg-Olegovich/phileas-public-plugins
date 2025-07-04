//=============================================================================
// Phileas_UpdatePointerPosition_MV.js
//=============================================================================

// ??? Ver1.0.0 First Release
// 2024.December.31 Ver1.1.0
// 2025.January.01 Ver1.1.1
// 2025.February.27 Ver1.1.2 Fixed disabling

/*:
 * @target MV
 * @plugindesc v.1.1.2
 * @author Phileas
 *
 * @param isEnabledDefault
 * @text Is enabled by default?
 * @type boolean
 * @default false
 *
 * @param xVariable
 * @text X variable
 * @type variable
 * @default 0
 *
 * @param yVariable
 * @text Y variable
 * @type variable
 * @default 0
 *
 * @param updateSwitch
 * @text Update switch
 * @type switch
 * @default 0
 * @desc The switch will turn on when the coordinates are updated
 * 
 * @help
 * The plugin provides one command - switchPlugin. 
 * It allows you to enable or disable the plugin.
 * This command has one argument - IsEnabled (the value is "true" or "false").
 * Use the command like this:
 * Phileas_UpdatePointerPosition_SwitchPlugin true
 * Phileas_UpdatePointerPosition_SwitchPlugin false
 *
 * Boosty: https://boosty.to/phileas
 *
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MV
 * @plugindesc v.1.1.2
 * @author Phileas
 *
 * @param isEnabledDefault
 * @text Включён по умолчанию?
 * @type boolean
 * @default false
 *
 * @param xVariable
 * @text Переменная X
 * @type variable
 * @default 0
 *
 * @param yVariable
 * @text Переменная Y
 * @type variable
 * @default 0
 *
 * @param updateSwitch
 * @text Переключатель обновления
 * @type switch
 * @default 0
 * @desc Переключатель будет включаться при обновлении координат
 * 
 * @help
 * Плагин предоставляет одну команду - switchPlugin.
 * Она позволяет включить или выключить плагин.
 * У этой команды один аргумент - isEnabled (значение "true" или "false").
 * Использовать команду так:
 * Phileas_UpdatePointerPosition_SwitchPlugin true
 * Phileas_UpdatePointerPosition_SwitchPlugin false
 * 
 * Boosty: https://boosty.to/phileas
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(() => {
    var parameters = PluginManager.parameters("Phileas_UpdatePointerPosition_MV");
    var isEnabled = parameters["isEnabledDefault"] == "true";
    var xVariable = Number(parameters["xVariable"] || 0);
    var yVariable = Number(parameters["yVariable"] || 0);
    var updateSwitch = Number(parameters["updateSwitch"] || 0);
    
    if (isEnabled) {
        document.addEventListener("mousemove", handleMouseUpdateEvent);
        document.addEventListener("mouseover", handleMouseUpdateEvent);
    }
    
    function switchPlugin(newValue) {
        if (newValue == isEnabled) {
            return;
        }
        
        isEnabled = !isEnabled;
        if (isEnabled) {
            document.addEventListener("mousemove", handleMouseUpdateEvent);
            document.addEventListener("mouseover", handleMouseUpdateEvent);
            return;
        }
        
        document.removeEventListener("mousemove", handleMouseUpdateEvent);
        document.removeEventListener("mouseover", handleMouseUpdateEvent);
    }
    
    const Origin_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Origin_Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === "Phileas_UpdatePointerPosition_SwitchPlugin") {
            switchPlugin(args[0] == "true");
        }
    };

    function updateVariables(x, y) {
        if ($gameVariables === null) {
            //console.log("gameVariables is null!");
            return;
        }
        
        if (xVariable > 0) {
            $gameVariables.setValue(xVariable, x);
        }
        
        if (yVariable > 0) {
            $gameVariables.setValue(yVariable, y);
        }
        
        if (updateSwitch > 0) {
            $gameSwitches.setValue(updateSwitch, true);
        }
    }
    
    function handleMouseUpdateEvent(event) {
        let x = Graphics.pageToCanvasX(event.pageX);
        let y = Graphics.pageToCanvasY(event.pageY);
        updateVariables(x, y);
    }

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasUpdatePointerPositionIsEnabled = isEnabled;
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        switchPlugin(contents.phileasUpdatePointerPositionIsEnabled || (parameters["isEnabledDefault"] == "true"));
    };
})();
