//=============================================================================
// Phileas_PartyFormationController.js
//=============================================================================
// [Update History]
// 2024.April.13 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Managing the swap of actors
 * @author Phileas
 *
 * @param enableSwitch
 * @text Enable switch
 * @type switch
 * @default 0
 * @desc If this switch is on, the plugin settings are applied.
 * 
 * @param saveState
 * @text Save command state
 * @type boolean
 * @default true
 * @desc If true, the movement state will be restored when the save is loaded. Relevant if you use the plugin command.
 * 
 * @param defaultLock
 * @text Locked positions by default
 * @type number[]
 * @default []
 * @desc The numbers of the actors in the party that cannot be moved to another position.
 * 
 * @command enablePartyFormationController
 * @text Enable
 * @desc Enables the application of settings
 * 
 * @command disablePartyFormationController
 * @text Disable
 * @desc Disables the application of settings
 * 
 * @command setLockedPositions
 * @text Lock
 * @desc Locks the specified positions
 * @arg lockedPositions
 * @text Locked positions
 * @type number[]
 * @default []
 * @desc The numbers of the actors in the party that cannot be moved to another position.
 *
 * 
 * @help
 * The plugin allows to lock the heroes in the party so that they cannot be moved to another position.
 * 
 * You can control the application of settings using the switch that is set in the plug-in parameters,
 * or through the plug-in command. Whichever is more convenient for you.
 * The settings will be applied if at least one of them is enabled.
 * The plugin is disabled by default.
 * 
 * The default locked positions are set in the parameters.
 * You can also dynamically control the plugin using the following commands:
 * - Enable - enables the application of settings
 * - Disable - disables the application of settings
 * - Lock - locks the specified positions
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
 * @plugindesc Управление перестановкой героев
 * @author Phileas
 *
 * @param enableSwitch
 * @text Переключатель включения
 * @type switch
 * @default 0
 * @desc Если переключатель включён, настройки плагина применяются.
 *
 * @param saveState
 * @text Сохранить состояние команды
 * @type boolean
 * @default true
 * @desc Если true, состояние движения будет восстаналиваться при загрузке сохранения. Актуально, если вы используете команду плагина.
 * 
 * @param defaultLock
 * @text Заблокированные позиции по умолчанию
 * @type number[]
 * @default []
 * @desc Номера героев в партии, которых нельзя переставить в другое место.
 * 
 * @command enablePartyFormationController
 * @text Включить
 * @desc Включает применение настроек
 * 
 * @command disablePartyFormationController
 * @text Выключить
 * @desc Выключает применение настроек
 * 
 * @command setLockedPositions
 * @text Заблокировать
 * @desc Блокирует указанные позиции
 * @arg lockedPositions
 * @text Заблокированные позиции
 * @type number[]
 * @default []
 * @desc Номера героев в партии, которых нельзя переставить в другое место.
 * 
 * 
 * @help
 * Плагин позволяет заблокировать героев в партии, чтобы их нельзя было переставить в другое место.
 * 
 * Вы можете управлять применением настроек с помощью переключателя, который задаётся в параметрах плагина, или через команду плагина.
 * Как вам удобнее. Настройки будут применяться, если включено хотя бы что-то одно.
 * По умолчанию плагин выключен.
 *
 * В параметрах задаются заблокированные места по умолчанию.
 * Также вы можете динамически управлять плагином с помощью команд:
 * - Включить - включает применение настроек
 * - Выключить - выключает применение настроек
 * - Заблокировать - блокирует указанные места
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
    var parameters = PluginManager.parameters("Phileas_PartyFormationController");
    var enableSwitch = parameters["enableSwitch"] || 0;
    var saveState = parameters["saveState"] == "true";
    var lockedPositions = JSON.parse(parameters["defaultLock"]).map(element => parseInt(element, 10));
    var enable = false;

    PluginManager.registerCommand("Phileas_PartyFormationController", "enablePartyFormationController", enablePartyFormationController);
    PluginManager.registerCommand("Phileas_PartyFormationController", "disablePartyFormationController", disablePartyFormationController);
    PluginManager.registerCommand("Phileas_PartyFormationController", "setLockedPositions", setLockedPositions);

    function enablePartyFormationController() {
        enable = true;
    }

    function disablePartyFormationController() {
        enable = true;
    }

    function setLockedPositions(params) {
        lockedPositions = JSON.parse(params["lockedPositions"]).map(element => parseInt(element, 10));
    }
    
//--------CHANGED CORE:
    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        enable = false;
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        if (saveState) {
            contents.phileasEnablePartyFormationController = enable;
        }
            
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        if (saveState) {
            stopPlayer = contents.phileasEnablePartyFormationController || false;
        }
    };
    
    const Origin_isCurrentItemEnabled= Window_MenuStatus.prototype.isCurrentItemEnabled;
    Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
        if ((enable || enableSwitch > 0 && $gameSwitches.value(movementSwitch) == true)
            && lockedPositions.includes(this.index() + 1) === true) {
            
            SoundManager.playBuzzer();
            return false;
        }
    
        return Origin_isCurrentItemEnabled.call(this);
    };
}());
    