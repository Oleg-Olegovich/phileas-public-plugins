//=============================================================================
// Phileas_HideEvents.js
//=============================================================================
// [Update History]
// 2025.December.1 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 
 * @author Phileas
 *
 * @command hideAllEventSprites
 * @text Hide All Events
 *
 * @command showAllEventSprites
 * @text Show All Events
 *
 * 
 * @help
 * 
 * 
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
 * @command hideAllEventSprites
 * @text Скрыть все события
 *
 * @command showAllEventSprites
 * @text Показать все события
 * 
 * 
 * @help
 * 
 * 
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

    let $eventSpritesVisible = true;


//-----------------------------------------------------------------------------
// Commands
    
    PluginManager.registerCommand("Phileas_HideEvents", "hideAllEventSprites", hideAllEventSpritesByCommand);
    PluginManager.registerCommand("Phileas_HideEvents", "showAllEventSprites", showAllEventSpritesByCommand);

    function hideAllEventSpritesByCommand() {
        $eventSpritesVisible = false;
    }

    function showAllEventSpritesByCommand() {
        $eventSpritesVisible = true;
    }


//-----------------------------------------------------------------------------
// MODIFIED CODE

    const Origin_Game_CharacterBase_opacity = Game_CharacterBase.prototype.opacity;
    Game_CharacterBase.prototype.opacity = function() {
        return $eventSpritesVisible
            ? Origin_Game_CharacterBase_opacity.call(this)
            : 0;
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasEventSpritesVisible = $eventSpritesVisible;
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        $eventSpritesVisible = contents.phileasEventSpritesVisible;
    };

}());
