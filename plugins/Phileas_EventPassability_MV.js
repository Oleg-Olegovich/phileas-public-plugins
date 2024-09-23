//=============================================================================
// Phileas_EventPassability_MV.js
//=============================================================================
// [Update History]
// 2023.Semptemver.22 Ver1.0.0 First Release

/*:
 * @target MV
 * @plugindesc Advanced event passability settings
 * @author Phileas
 *
 * 
 * @help
 * 
 * The plugin allows to set the event passability settings,
 * regardless of its priority (above, below, or at the character level).
 * 
 * Use the "Note" field. It is located to the right of the "Name" field in the event editor.
 * In the current version of the plugin, one tag is available - Passability. Variants:
 * <Passability:player> - the event will pass through the player, but will collide with other events.
 * <Passability:events> - the event will pass through other events, but will collide with the player.
 * <Passability:player-and-events> - The event will pass through the player and other events.
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
 * @plugindesc Расширенная настройка проходимости событий
 * @author Phileas
 *
 * 
 * @help
 * 
 * Плагин позволяет задать настройки проходимости события,
 * вне зависимости от его приоритета (над, под или на уровне персонажей).
 * 
 * Используйте поле "Заметка". Оно расположено справа от поля "Название" в редакторе событий.
 * В текущей версии плагина доступен один тег - Passability. Варианты:
 * <Passability:player> - событие будет проходить сквозь игрока, но будет сталкиваться с другими событиями.
 * <Passability:events> - событие будет проходить сквозь другие события, но будет сталкиваться с игроком.
 * <Passability:player-and-events> - событие будет проходить сквозь игрока и другие события.
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(function() {

//--------DATA:

    const phileasPassabilityTags = ["Passability"];
    const phileasPassabilityOptionsMap = {
        "player": 1,
        "events": 2,
        "player-and-events": 3
    };
    // {mapId:{eventId:optionsArray}}
    var optionsCash = {};

//--------MY CODE:

    function getMeta(data) {
        const regExp = /<([^<>:]+)(:?)([^>]*)>/g;
        let meta = {};
        for (; ;) {
            const match = regExp.exec(data);
            if (match) {
                if (match[2] === ":") {
                    meta[match[1]] = match[3];
                } else {
                    meta[match[1]] = true;
                }
            } else {
                break;
            }
        }

        return meta;
    };

    function processEventOptions(eventObject) {
        const e = eventObject.event();
        const meta = getMeta(e.note);

        if (meta == undefined) {
            return;
        }

        const options = {};
        for (let i in phileasPassabilityTags) {
            let tag = phileasPassabilityTags[i];
            if (meta[tag] != undefined) {
                options[tag] = meta[tag];
            }
        }

        if (Object.keys(options).length == 0) {
            return;
        }

        const arr = [];
        
        if (options["Passability"] == null) {
            arr.push(0);
        } else {
            arr.push(phileasPassabilityOptionsMap[options["Passability"]]);
        }

        if (optionsCash[eventObject._mapId] == null) {
            optionsCash[eventObject._mapId] = {};
        }
  
        optionsCash[eventObject._mapId][eventObject._eventId] = arr;
    }

    Scene_Map.prototype.setPhileasEventPassabilityOptions = function() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
            return;
        }

        //let events = $gameMap.events();
        let events = SceneManager._scene._spriteset._characterSprites;
        SceneManager._scene.phileasLabelWindows = {};

        for (var i = 0; i < events.length; ++i) {
            if (events[i]._character instanceof Game_Player) {
                continue;
            }

            if (!(events[i]._character instanceof Game_Event)) {
                continue;
            }

            processEventOptions(events[i]._character);
        }
    };

    Game_Event.prototype.getPassabilityType = function() {
        if (optionsCash[this._mapId] == undefined) {
            return 0;
        }
        
        const options = optionsCash[this._mapId][this._eventId];

        if (options == undefined) {
            return 0;
        }

        return optionsCash[this._mapId][this._eventId][0];
    };

    Game_Event.prototype.isPlayerThroughEnabled = function() {
        const passabilityType = this.getPassabilityType();
        return passabilityType == 1 || passabilityType == 3;
    };

    Game_Event.prototype.isEventsThroughEnabled = function() {
        const passabilityType = this.getPassabilityType();
        return passabilityType == 2 || passabilityType == 3;
    };

//--------CHANGED CORE:
    
    const Origin_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        Origin_onMapLoaded.call(this);
        this.setPhileasEventPassabilityOptions();
    };

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        Origin_setupNewGame.call(this);
        optionsCash = {};
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasEventPassabilityOptionsCash = optionsCash;
        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        Origin_extractSaveContents.call(this, contents);
        optionsCash = contents.phileasEventPassabilityOptionsCash || {};
    };

    const Origin_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        return !this.isPlayerThroughEnabled() && Origin_isCollidedWithPlayerCharacters.call(this, x, y);
    };

    const Origin_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
    Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
        if (!this.isPlayerThroughEnabled()) {
            Origin_checkEventTriggerTouch.call(this, x, y);
        }
    };

    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        if (this.isEventsThroughEnabled()) {
            return false;
        }

        var events = $gameMap.eventsXyNt(x, y);
        return events.some(function(event) {
            return !event.isEventsThroughEnabled() && event.isNormalPriority();
        });
    };

    Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
        if (!$gameMap.isEventRunning()) {
            $gameMap.eventsXy(x, y).forEach(function(event) {
                if (!event.isPlayerThroughEnabled() && event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                    event.start();
                }
            });
        }
    };

    Game_Player.prototype.isCollidedWithEvents = function(x, y) {
        var events = $gameMap.eventsXyNt(x, y);
        return events.some(function(event) {
            return !event.isPlayerThroughEnabled() && event.isNormalPriority();
        });
    };
}());
