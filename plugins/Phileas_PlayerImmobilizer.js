//=============================================================================
// Phileas_PlayerImmobilizer.js
//=============================================================================
// [Update History]
// 2023.June.21 Ver1.0.0 First Release
// 2023.June.25 Ver1.1.0 Added plugin command
// 2023.June.30 Ver1.1.1 Fixed plugin command bug
// 2023.August.13 Ver1.2.0 Added save state parameter. The movement state is reset when a new game starts.

/*:
 * @target MZ
 * @plugindesc Prohibit the player's movement
 * @author Phileas
 *
 * @param Movement switch
 * @text Movement switch
 * @type switch
 * @default 0
 * @desc If this switch is on, the player will not move.
 *
 * @param saveState
 * @text Save command state
 * @type boolean
 * @default true
 * @desc If true, the movement state will be restored when the save is loaded. Relevant if you use the plugin command.
 *
 *
 * @command setMovementState
 * @text Set movement state
 * @desc Enables or disables player movement.
 *
 * @arg stopPlayer
 * @type boolean
 * @desc If this is on, the player will not move.
 * @default false
 *
 * 
 * @help
 * Allows you to prohibit the player's movement. 
 * Usage example: A mini-game that uses arrows or a pointer, during which the player character should not move.
 * The plugin only blocks movement through input. Even with the switch on, you can specify a route via the events command.
 *
 * You can control the movement through the switch that is set in the plugin parameters, or through the plugin command. As you prefer. The player's movement will be blocked if at least one thing is enabled.
 * 
 * Plugin command - "Set movement state"!
 *
 * The plugin only blocks movement through input. Even with the switch on, you can specify a route via the events command.
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
 * @plugindesc Запретить движение чаракта игрока
 * @author Phileas
 *
 * @param Movement switch
 * @text Переключатель движения
 * @type switch
 * @default 0
 * @desc Если переключатель включён, игрок не будет двигаться.
 *
 * @param saveState
 * @text Сохранить состояние команды
 * @type boolean
 * @default true
 * @desc Если true, состояние движения будет восстаналиваться при загрузке сохранения. Актуально, если вы используете команду плагина.
 *
 *
 * @command setMovementState
 * @text Установить состояние движения
 * @desc Включает или выключает движение игрока
 *
 * @arg stopPlayer
 * @type boolean
 * @desc Если параметр включён, игрок не будет двигаться.
 * @default false
 *
 * 
 * @help
 * Позволяет запретить движение чаракта игрока.
 * Пример использования: мини-игра, в которой используются стрелки или указатель, во время которой персонаж игрока не должен двигаться.
 * Плагин блокирует только движение через ввод. Даже при включённом переключателе вы можете указать маршрут через команду события.
 *
 * Вы можете управлять движением через переключатель, который задаётся в параметрах плагина, или через команду плагина. Как вам удобнее. Движение игрока будет блокироваться, если включено хотя бы что-то одно.
 * 
 * Команда плагина - "Установить состояние движения"!
 *
 * Плагин блокирует только движение через ввод. Даже при включённом переключателе вы можете указать маршрут через команду события.
 *
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
    var parameters = PluginManager.parameters("Phileas_PlayerImmobilizer");
    var movementSwitch = Number(parameters["Movement switch"]) || 0;
    var saveState = parameters["saveState"] == "true";
    var stopPlayer = false;
    
    PluginManager.registerCommand("Phileas_PlayerImmobilizer", "setMovementState", setMovementState);

    function setMovementState(params) {
        stopPlayer = params["stopPlayer"] == "true";
    }

//--------CHANGED CORE:
    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        stopPlayer = false;
    };
    
    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        if (saveState) {
            contents.phileasStopPlayer = stopPlayer;
        }
        
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        if (saveState) {
            stopPlayer = contents.phileasStopPlayer || false;
        }
    };

    const Origin_move = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function() {
        if (stopPlayer || movementSwitch > 0 && $gameSwitches.value(movementSwitch) == true) {
            return;
        }
        
        Origin_move.call(this);
    };
}());
