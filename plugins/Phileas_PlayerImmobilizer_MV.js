//=============================================================================
// Phileas_PlayerImmobilizer_MV.js
//=============================================================================
// [Update History]
// 2023.June.21 Ver1.0.0 First Release
// 2023.August.13 Ver1.2.0 Added save state parameter. The movement state is reset when a new game starts.

/*:
 * @target MV
 * @plugindesc v1.2.0 Prohibit the player's movement
 * @author Phileas
 *
 * @param Movement switch
 * @text Movement switch
 * @type switch
 * @default 0
 * @desc If this switch is on, the player will not move.
 *
 * 
 * @help
 * Allows you to prohibit the player's movement. 
 * Usage example: A mini-game that uses arrows or a pointer, during which the player character should not move.
 *
 * You can control the movement through the switch that is set in the plugin parameters.
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
 * @target MV
 * @plugindesc v1.2.0 Запретить движение чаракта игрока
 * @author Phileas
 *
 * @param Movement switch
 * @text Переключатель движения
 * @type switch
 * @default 0
 * @desc Если переключатель включён, игрок не будет двигаться.
 *
 * 
 * @help
 * Позволяет запретить движение чаракта игрока.
 * Пример использования: мини-игра, в которой используются стрелки или указатель, во время которой персонаж игрока не должен двигаться.
 *
 * Вы можете управлять движением через переключатель, который задаётся в параметрах плагина.
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
    var parameters = PluginManager.parameters("Phileas_PlayerImmobilizer_MV");
    var movementSwitch = parameters["Movement switch"] || 0;

//--------MODIFIED CODE:
    const Origin_move = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function() {
        if (movementSwitch > 0 && $gameSwitches.value(movementSwitch) == true) {
            return;
        }
        
        Origin_move.call(this);
    };
}());
