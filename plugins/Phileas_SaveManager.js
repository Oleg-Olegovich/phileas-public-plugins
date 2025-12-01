//=============================================================================
// Phileas_SaveManager.js
//=============================================================================
// [Update History]
// 2025.December.1 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 
 * @author Phileas
 *
 * @command enableAutosave
 * @text Enable Autosave
 *
 * @command disableAutosave
 * @text Disable Autosave
 *
 * @command restoreDefaultSettings
 * @text Restore Default Settings
 *
 * @command restoreDefaultAutosaveState
 * @text Restore Default Autosave State
 *
 * 
 * @help
 * 
 * This plugin extends save control.
 * You can use plugin commands or scripts.
 * 
 * The plugin settings are saved to a save file
 * and restored when the game is loaded from this file.
 * 
 * I will gradually add new functionality.
 * You can write to me if your project
 * needs a feature that hasn't been implemented yet.
 * 
 * 
 * Command:
 *     Enable Autosave
 * Script:
 *     $gameSystem.enableAutosave();
 * Description:
 *     Enables autosave.
 * 
 * Command:
 *     Disable Autosave
 * Script:
 *     $gameSystem.disableAutosave();
 * Description:
 *     Disables autosave.
 * 
 * Command:
 *     Restore default settings
 * Script:
 *     $gameSystem.restoreDefaultSettings();
 * Description:
 *     All plugin settings are restored
 *     to their default values.
 * 
 * Command:
 *     Restore Default Autosave State
 * Script:
 *     $gameSystem.restoreDefaultAutosaveState();
 * Description:
 *     The autosave state is restored to
 *     the value specified in the Database.
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
 * This means that you can freely use the plugin in non-commercial
 * and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MZ
 * @plugindesc v1.0.0
 * @author Phileas
 *
 * @command enableAutosave
 * @text Включить автосохранение
 *
 * @command disableAutosave
 * @text Отключить автосохранение
 *
 * @command restoreDefaultSettings
 * @text Восстановить настройки по умолчанию
 *
 * @command restoreDefaultAutosaveState
 * @text Восстановить состояние автосохранения по умолчанию
 * 
 * 
 * @help
 * 
 * Плагин расширяет управление сохранениями.
 * Вы можете использовать команды плагина или скрипты.
 * 
 * Настройки плагина сохраняются в файл сохранения
 * и восстанавливаются при загрузке игры из этого файла.
 * 
 * Я буду постепенно добавлять новый функционал.
 * Вы можете написать мне, если для вашего проекта
 * потребуется фича, которая ещё не реализована.
 * 
 * 
 * Команда:
 *     Включить автосохранение
 * Скрипт:
 *     $gameSystem.enableAutosave();
 * Описание:
 *     Включает автосохранение.
 * 
 * Команда:
 *     Отключить автосохранение
 * Скрипт:
 *     $gameSystem.disableAutosave();
 * Описание:
 *     Отключает автосохранение.
 * 
 * Команда:
 *     Восстановить настройки по умолчанию
 * Скрипт:
 *     $gameSystem.restoreDefaultSettings();
 * Описание:
 *     Все настройки плагина восстанавливаются
 *     до значений по умолчанию.
 * 
 * Команда:
 *     Восстановить состояние автосохранения по умолчанию
 * Скрипт:
 *     $gameSystem.restoreDefaultAutosaveState();
 * Описание:
 *     Состояние автосохранения восстанавливается до
 *     значения, которое указано в Базе Данных.
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
 * Это означает, что вы можете свободно использовать плагин в некоммерческих
 * и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

 "use strict";

 (function() {

//-----------------------------------------------------------------------------
// MY CODE

//-----------------------------------------------------------------------------
// Data

    let $defaultSettings = null;
    let $settings = null;


//-----------------------------------------------------------------------------
// API

    Game_System.prototype.enableAutosave = function() {
        $settings.autosave = true;
    };

    Game_System.prototype.disableAutosave = function() {
        $settings.autosave = false;
    };

    Game_System.prototype.restoreDefaultSettings = function() {
        $settings = {
            autosave: $defaultSettings.autosave
        };
    };

    Game_System.prototype.restoreDefaultAutosaveState = function() {
        $settings.autosave = $defaultSettings.autosave;
    };


//-----------------------------------------------------------------------------
// Commands
    
    PluginManager.registerCommand("Phileas_SaveManager", "enableAutosave", enableAutosaveByCommand);
    PluginManager.registerCommand("Phileas_SaveManager", "disableAutosave", disableAutosaveByCommand);
    PluginManager.registerCommand("Phileas_SaveManager", "restoreDefaultSettings", restoreDefaultSettingsByCommand);
    PluginManager.registerCommand("Phileas_SaveManager", "restoreDefaultAutosaveState", restoreDefaultAutosaveStateByCommand);

    function enableAutosaveByCommand() {
        $gameSystem.enableAutosave();
    }

    function disableAutosaveByCommand() {
        $gameSystem.disableAutosave();
    }

    function restoreDefaultSettingsByCommand() {
        $gameSystem.restoreDefaultSettings();
    }

    function restoreDefaultAutosaveStateByCommand() {
        $gameSystem.restoreDefaultAutosaveState();
    }


//-----------------------------------------------------------------------------
// Main

    function setDefaultSettings() {
        $defaultSettings = {
            autosave: $dataSystem.optAutosave
        };
    }


//-----------------------------------------------------------------------------
// MODIFIED CODE

    const Origin_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        Origin_Game_System_initialize.call(this);
        setDefaultSettings();

        if (!$settings) {
            this.restoreDefaultSettings();
        }
    };

    Game_System.prototype.isAutosaveEnabled = function() {
        return $settings.autosave;
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasSaveManagerSettings = $settings;
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        $settings = contents.phileasSaveManagerSettings;

        if (!$settings && $gameSystem) {
            $gameSystem.restoreDefaultSettings();
        }
    };

}());
