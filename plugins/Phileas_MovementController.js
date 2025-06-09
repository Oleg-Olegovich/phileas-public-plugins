//=============================================================================
// Phileas_MovementController.js
//=============================================================================
// [Update History]
// 2024.May.30 Ver1.0.0 First Release
// 2024.May.30 Ver1.0.1 Fixed switch parameters
// 2024.August.07 Ver1.0.2 Diagonal movement compatibility

/*:
 * @target MZ
 * @plugindesc Controls the movement of the player and events
 * @author Phileas
 *
 * @param playerMovementSwitch
 * @text Player movement switch
 * @type switch
 * @default 0
 * @desc If this switch is on, the player will not move.
 * 
 * @param eventsMovementSwitch
 * @text Events movement switch
 * @type switch
 * @default 0
 * @desc If this switch is on, events will not move.
 *
 * @param saveState
 * @text Save command state
 * @type boolean
 * @default true
 * @desc If true, the movement state will be restored when the save is loaded. Relevant if you use plugin commands.
 *
 *
 * @command disallowPlayerMovement
 * @text Disallow player movement
 * @desc Disables player movement.
 *
 * @command allowPlayerMovement
 * @text Allow player movement
 * @desc Enables player movement.
 * 
 * @command disallowEventsMovement
 * @text Disallow events movement
 * @desc Disables events movement.
 *
 * @command allowEventsMovement
 * @text Allow events movement
 * @desc Enables events movement.
 * 
 * @command switchInversion
 * @text Switch the inversion
 * @desc Enables or disables player movement inversion.
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
 * 
 * @help
 * Controls player movement and events.
 * Plugin commands:
 * - Disallow player movement - blocks player movement through input.
 * - Allow player movement - removes the blockage of player movement.
 * - Disallow events movement - blocks the movement of events on the map.
 * - Allow events movement - removes the blocking of the movement of events.
 * - Switch the inversion - inverts the player's movement through input.
 *
 * You can control the movement through the switches that are set in the plugin parameters,
 * or through the plug-in commands. Whichever is more convenient for you.
 *
 * Usage example: A mini-game that uses arrows or a pointer, during which
 * the player character must not move.
 * For the player, movement is blocked only through input.
 * Even with the switch on, you can specify a route through the event command.
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
 * @plugindesc Контроль движения игрока и событий
 * @author Phileas
 *
 * @param playerMovementSwitch
 * @text Переключатель движения игрока
 * @type switch
 * @default 0
 * @desc Если переключатель включён, игрок не будет двигаться.
 * 
 * @param eventsMovementSwitch
 * @text Переключатель движения событий
 * @type switch
 * @default 0
 * @desc Если переключатель включён, события не будут двигаться.
 *
 * @param saveState
 * @text Сохранить состояние команды
 * @type boolean
 * @default true
 * @desc Если true, состояние движения будет восстаналиваться при загрузке сохранения. Актуально, если вы используете команды плагина.
 * 
 * 
 * @command disallowPlayerMovement
 * @text Запретить движение игрока
 * @desc Выключает движение игрока.
 *
 * @command allowPlayerMovement
 * @text Разрешить движение игрока
 * @desc Включает движение игрока.
 * 
 * @command disallowEventsMovement
 * @text Запретить движение событий
 * @desc Выключает движение событий.
 *
 * @command allowEventsMovement
 * @text Разрешить движение событий
 * @desc Включает движение событий.
 * 
 * @command switchInversion
 * @text Переключить инверсию
 * @desc Включает или выключает инверсию движения игрока.
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
 * 
 * @help
 * Контролирует движение игрока и событий.
 * Команды плагина:
 * - Запретить движение игрока - блокирует движение игрока через ввод.
 * - Разрешить движение игрока - снимает блокировку движения игрока.
 * - Запретить движение событий - блокирует движение событий на карте.
 * - Разрешить движение событий - снимает блокировку движения событий.
 * - Переключить инверсию - инвертирует движение игрока через ввод.
 * 
 * Вы можете управлять движением через переключатели, которые задаются
 * в параметрах плагина, или через команды плагина. Как вам удобнее.
 * 
 * Пример использования: мини-игра, в которой используются стрелки или указатель,
 * во время которой персонаж игрока не должен двигаться.
 * Для игрока движение блокируется только через ввод.
 * Даже при включённом переключателе вы можете указать маршрут через команду события.
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
    var parameters = PluginManager.parameters("Phileas_MovementController");
    var playerMovementSwitch = parameters["playerMovementSwitch"] || 0;
    var eventsMovementSwitch = parameters["eventsMovementSwitch"] || 0;
    var saveState = parameters["saveState"] == "true";
    var stopPlayer = false;
    var stopEvents = false;
    var horizontalInversion = false;
    var verticalInversion = false;
    
    PluginManager.registerCommand("Phileas_MovementController", "disallowPlayerMovement", disallowPlayerMovement);
    PluginManager.registerCommand("Phileas_MovementController", "allowPlayerMovement", allowPlayerMovement);
    PluginManager.registerCommand("Phileas_MovementController", "disallowEventsMovement", disallowEventsMovement);
    PluginManager.registerCommand("Phileas_MovementController", "allowEventsMovement", allowEventsMovement);
    PluginManager.registerCommand("Phileas_MovementController", "switchInversion", switchInversion);

    function disallowPlayerMovement() {
        stopPlayer = true;
    }

    function allowPlayerMovement() {
        stopPlayer = false;
    }

    function disallowEventsMovement() {
        stopEvents = true;
    }

    function allowEventsMovement() {
        stopEvents = false;
    }

    function switchInversion(params) {
        horizontalInversion = params["horizontalInversion"] == "true";
        verticalInversion = params["verticalInversion"] == "true";
    }

    function inverseDir4() {
        if (horizontalInversion) {
            if (Input._dir4 == 4) {
                Input._dir4 = 6;
            } else if (Input._dir4 == 6) {
                Input._dir4 = 4;
            }
        }
        
        if (verticalInversion) {
            if (Input._dir4 == 8) {
                Input._dir4 = 2;
            } else if (Input._dir4 == 2) {
                Input._dir4 = 8;
            }
        }
    }

    function inverseDir8() {
        if (horizontalInversion) {
            if (Input._dir8 == 4) {
                Input._dir8 = 6;
            } else if (Input._dir8 == 6) {
                Input._dir8 = 4;
            } else if (Input._dir8 == 1) {
                Input._dir8 = 3;
            } else if (Input._dir8 == 3) {
                Input._dir8 = 1;
            } else if (Input._dir8 == 7) {
                Input._dir8 = 9;
            } else if (Input._dir8 == 9) {
                Input._dir8 = 7;
            }
        }
        
        if (verticalInversion) {
            if (Input._dir8 == 8) {
                Input._dir8 = 2;
            } else if (Input._dir8 == 2) {
                Input._dir8 = 8;
            } else if (Input._dir8 == 7) {
                Input._dir8 = 1;
            } else if (Input._dir8 == 1) {
                Input._dir8 = 7;
            } else if (Input._dir8 == 9) {
                Input._dir8 = 3;
            } else if (Input._dir8 == 3) {
                Input._dir8 = 9;
            }
        }
    }

//--------MODIFIED CODE:
    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        stopPlayer = false;
        stopEvents = false;
        horizontalInversion = false;
        verticalInversion = false;
    };
    
    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        if (saveState) {
            contents.phileasStopPlayer = stopPlayer;
            contents.phileasStopEvents = stopEvents;
            contents.phileasHorizontalInversion = horizontalInversion;
            contents.phileasVerticalInversion = verticalInversion;
        }
        
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        if (saveState) {
            stopPlayer = contents.phileasStopPlayer || false;
            stopEvents = contents.phileasStopEvents || false;
            horizontalInversion = contents.phileasHorizontalInversion || false;
            verticalInversion = contents.phileasVerticalInversion || false;
        }
    };

    const Origin_moveByInput = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function() {
        if (stopPlayer || playerMovementSwitch > 0 && $gameSwitches.value(playerMovementSwitch) == true) {
            return;
        }

        inverseDir4();
        inverseDir8();
        
        Origin_moveByInput.call(this);
    };

    const Origin_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event.prototype.updateSelfMovement = function() {
        if (stopEvents || eventsMovementSwitch > 0 && $gameSwitches.value(eventsMovementSwitch) == true) {
            return;
        }

        Origin_updateSelfMovement.call(this);
    };
}());
