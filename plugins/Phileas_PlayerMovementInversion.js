//=============================================================================
// Phileas_PlayerMovementInversion.js
//=============================================================================
// [Update History]
// 2023.August.11 Ver1.0.0 First Release
// 2023.August.12 Ver1.1.0 Added save state parameter
// 2023.August.13 Ver1.1.1 The inversion state is reset when a new game starts

/*:
 * @target MZ
 * @plugindesc v1.1.1 Inverts the player's movement control
 * @author Phileas
 *
 * @param saveState
 * @text Save state
 * @type boolean
 * @default true
 * @desc If true, the inversion state will be restored when the save is loaded.
 *
 * @command switchInversion
 * @text Switch the inversion
 * @desc Enables or disables movement inversion.
 *
 * @arg horizontalInversion
 * @text Horizontal inversion
 * @type boolean
 * @desc If this is on, the movement will be inverted horizontally.
 * @default false
 *
 * @arg verticalInversion
 * @text Vertical inversion
 * @type boolean
 * @desc If this is on, the movement will be inverted vertically.
 * @default false
 * 
 * @help
 * The plugin provides a single command - switchInversion.
 * You can use it to enable and disable horizontal and vertical inversions.
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
 * @plugindesc v1.1.1 Инверсирует управление движением игрока
 * @author Phileas
 *
 * @param saveState
 * @text Сохранять состояние
 * @type boolean
 * @default true
 * @desc Если true, состояние инверсии будет восстаналиваться при загрузке сохранения.
 *
 * @command switchInversion
 * @text Переключить инверсию
 * @desc Включает или выключает инверсию.
 *
 * @arg horizontalInversion
 * @text Horizontal inversion
 * @type boolean
 * @desc Если этот параметр включён, перемещение будет перевёрнуто по горизонтали.
 * @default false
 *
 * @arg verticalInversion
 * @text Vertical inversion
 * @type boolean
 * @desc Если этот параметр включен, перемещение будет перевернуто по вертикали.
 * @default false
 * 
 * @help
 * Плагин предоставляет единственную команду - switchInversion.
 * С помощью неё вы можете включить и выключить горизонтальную и вертикальную инверсии.
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
    var parameters = PluginManager.parameters("Phileas_PlayerMovementInversion");
    var saveState = parameters["saveState"] == "true";
    var horizontalInversion = false;
    var verticalInversion = false;
    
    PluginManager.registerCommand("Phileas_PlayerMovementInversion", "switchInversion", switchInversion);

    function switchInversion(params) {
        horizontalInversion = params["horizontalInversion"] == "true";
        verticalInversion = params["verticalInversion"] == "true";
    }

//--------MODIFIED CODE:

    const Origin_move = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function() {
        if (horizontalInversion) {
            if (Input._dir4 == 4) {
                Input._dir4 = 6;
            }
            else if (Input._dir4 == 6) {
                Input._dir4 = 4;
            }
        }
        
        if (verticalInversion) {
            if (Input._dir4 == 8) {
                Input._dir4 = 2;
            }
            else if (Input._dir4 == 2) {
                Input._dir4 = 8;
            }
        }

        Origin_move.call(this);
    };
    
    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        if (saveState) {
            contents.phileasHorizontalInversion = horizontalInversion;
            contents.phileasVerticalInversion = verticalInversion;
        }
        
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        if (saveState) {
            horizontalInversion = contents.phileasHorizontalInversion || false;
            verticalInversion = contents.phileasVerticalInversion || false;
        }
    };
    
    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        horizontalInversion = false;
        verticalInversion = false;
    };
}());
