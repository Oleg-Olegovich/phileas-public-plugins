//=============================================================================
// Phileas_UpdatePointerPosition.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 
 * @author Phileas
 *
 * @param isEnabledDeafult
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
 *
 * @command switchPlugin
 * @text Switch plugin
 * @arg isEnabled
 * @type boolean
 * @default true
 * 
 * @help
 * The plugin provides one command - switchPlugin. 
 * It allows you to enable or disable the plugin.
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
 * @target MZ
 * @plugindesc 
 * @author Phileas
 *
 * @param isEnabledDeafult
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
 *
 * @command switchPlugin
 * @text Переключить плагин
 * @arg isEnabled
 * @type boolean
 * @default true
 * 
 * @help
 * Плагин предоставляет одну команду - switchPlugin.
 * Она позволяет включить или выключить плагин.
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
    var parameters = PluginManager.parameters("Phileas_UpdatePointerPosition");
    var isEnabled = parameters["isEnabledDeafult"] == "true";
    var xVariable = Number(parameters["xVariable"] || 0);
    var yVariable = Number(parameters["yVariable"] || 0);
    var updateSwitch = Number(parameters["updateSwitch"] || 0);
    
    PluginManager.registerCommand("Phileas_UpdatePointerPosition", "switchPlugin", switchPlugin);
    
    if (isEnabled) {
        document.addEventListener("mousemove", handleMouseUpdateEvent);
        document.addEventListener("mouseover", handleMouseUpdateEvent);
    }
    
    function switchPlugin(params) {
        if ((params["isEnabled"] == "true") == isEnabled) {
            return;
        }
        
        isEnabled = !isEnabled;
        if (isEnabled) {
            document.addEventListener("mousemove", handleMouseUpdateEvent);
            document.addEventListener("mouseover", handleMouseUpdateEvent);
            return;
        }
        
        document.removeEventListener("mousemove", handleMouseUpdateEvent);
        document.addEventListener("mouseover", handleMouseUpdateEvent);
    }
    
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
})();
