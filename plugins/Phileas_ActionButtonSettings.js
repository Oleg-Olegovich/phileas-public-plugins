//=============================================================================
// Phileas_ActionButtonSettings.js
//=============================================================================
// [Update History]
// 2024.August.17 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 Customization of action (OK) button features
 * @author Phileas
 *
 * @command disableFastForward
 * @text Disable fast forward
 *
 * @command enableFastForward
 * @text Enable fast forward
 * 
 * @command enableOnlyMessagesFastForward
 * @text Enable fast forward for messages only
 * 
 * 
 * @help
 * 
 * The current version of the plugin controls the game acceleration
 * function when pressing the action key (OK, Enter, space bar, Z, LMB).
 * 
 * You can disable this feature, enable it, or enable fast forward for messages only
 * (at the same time, characters on the map, animations, etc. will not speed up).
 * 
 * Use the plugin commands!
 * 
 * The plugin is compatible with Phileas's Skipping Messages:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_SkippingMessages.js
 * If you are using the Phileas's Options Manager plugin,
 * then place Phileas's Action Button Settings above in the plugins menu:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_OptionsManager.js
 * 
 * You can always write to the author if you need other features or even plugins.
 * Boosty: https://boosty.to/phileas
 * Patreon: https://www.patreon.com/treeverse_games
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
 * @plugindesc v1.0.0 Кастомизация функций кнопки действия (OK)
 * @author Phileas
 *
 * @command disableFastForward
 * @text Отключить ускорение
 *
 * @command enableFastForward
 * @text Включить ускорение
 * 
 * @command enableOnlyMessagesFastForward
 * @text Включить ускорение только для сообщений
 * 
 * 
 * @help
 * 
 * Текущая версия плагина управляет функцией ускорения игры
 * при зажатии клавиши действия (OK, Enter, пробел, Z, ЛКМ).
 * 
 * Вы можете отключить эту функции, включить её или включить
 * только для быстрой промотки сообщений (при этом персонажи на карте,
 * анимации и прочее ускоряться не будет).
 * 
 * Используйте команды плагина!
 * 
 * Плагин совместим с Phileas's Skipping Messages:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_SkippingMessages.js
 * Если вы используете плагин Phileas's Options Manager, 
 * то в меню плагинов расположите Phileas's Action Button Settings выше:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_OptionsManager.js
 *
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * Patreon: https://www.patreon.com/treeverse_games
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

(function() {

//--------MY CODE:

//-----------------------------------------------------------------------------
// Data
    
    PluginManager.registerCommand("Phileas_ActionButtonSettings", "enableFastForward", enableFastForward);
    PluginManager.registerCommand("Phileas_ActionButtonSettings", "disableFastForward", disableFastForward);
    PluginManager.registerCommand("Phileas_ActionButtonSettings", "enableOnlyMessagesFastForward", enableOnlyMessagesFastForward);

    // 0 - default (enabled), 1 - disabled, 2 - enabled for messages only.
    var fastForwardMode = 0;

//-----------------------------------------------------------------------------
// My code

    function enableFastForward() {
        fastForwardMode = 0;
    }

    function disableFastForward() {
        fastForwardMode = 1;
    }

    function enableOnlyMessagesFastForward() {
        fastForwardMode = 2;
    }

//-----------------------------------------------------------------------------
// Changed code

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasFastForwardMode = fastForwardMode;
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        fastForwardMode = contents.phileasFastForwardMode;
    };

    const Origin_Scene_Map_isFastWorward = Scene_Map.prototype.isFastForward;
    Scene_Map.prototype.isFastForward = function() {
        if (fastForwardMode != 0) {
            return false;
        }

        return Origin_Scene_Map_isFastWorward.call(this);
    };

    const Origin_Window_ScrollText_isFastWorward = Window_ScrollText.prototype.isFastForward;
    Window_ScrollText.prototype.isFastForward = function() {
        if (fastForwardMode == 1) {
            return false;
        }

        return Origin_Window_ScrollText_isFastWorward.call(this);
    };

    const Origin_Window_BattleLog_isFastWorward = Window_BattleLog.prototype.isFastForward;
    Window_BattleLog.prototype.isFastForward = function() {
        if (fastForwardMode == 1) {
            return false;
        }

        return Origin_Window_BattleLog_isFastWorward.call(this);
    };

    const Origin_Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function() {
        if (fastForwardMode != 1) {
            Origin_Window_Message_updateShowFast.call(this);
        }
    };
}());
