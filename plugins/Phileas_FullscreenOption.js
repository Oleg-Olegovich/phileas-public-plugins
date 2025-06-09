//=============================================================================
// Phileas_FullscreenOption.js
//=============================================================================
// [Update History]
// 2023.June.18 Ver1.1.0 The parameter value is updated when f4 is pressed.
// 2023.March.05 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Adds a fullscreen option to the Options window.
 * @author Phileas
 *
 * @param Option name
 * @default Fullscreen
 *
 * 
 * @help
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

//--------DATA:
    var parameters = PluginManager.parameters('Phileas_FullscreenOption');
    var optionName = parameters['Option name'] || "Fullscreen";

//--------MODIFIED CODE:

    Origin_addOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        Origin_addOptions.call(this);
        this.addCommand(optionName, "fullscreen");
    };
    
    Origin_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol == "fullscreen") {
            Graphics._switchFullScreen();
        }
        else {        
            Origin_processOk.call(this);
        }
    };
    
    Origin_switchFullscreen = Graphics._switchFullScreen;
    Graphics._switchFullScreen = function() {
        if (SceneManager._scene instanceof Scene_Options) {
            for (var i = 0; i < SceneManager._scene._windowLayer.children.length; ++i) {
                if (SceneManager._scene._windowLayer.children[i] instanceof Window_Options) {
                    SceneManager._scene._windowLayer.children[i].changeValue("fullscreen", !ConfigManager["fullscreen"]);
                    break;
                }
            }
        }
        else {
            ConfigManager["fullscreen"] = !ConfigManager["fullscreen"];
        }
        Origin_switchFullscreen.call(this);
    };
}());
