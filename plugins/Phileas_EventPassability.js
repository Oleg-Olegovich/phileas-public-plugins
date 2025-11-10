//=============================================================================
// Phileas_EventPassability.js
//=============================================================================
// [Update History]
// 2023.Semptemver.22 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 Advanced event passability settings
 * @author Phileas
 * 
 * @command setEventPassabilityLocal
 * @text Configure event passability (local)
 * @desc Changes the passability of an event on the current map
 * 
 * @arg eventId
 * @text Event ID
 * @type number
 * @desc Input the event ID (this is a positive number)
 * @default 1
 * 
 * @arg passability
 * @text Passability
 * @type select
 * @option Default
 * @value 0
 * @option Player only
 * @value 1
 * @option Other events only
 * @value 2
 * @option Player and other events
 * @value 3
 * 
 * 
 * @command setEventPassabilityGlobal
 * @text Configure event passability (global)
 * @desc Changes the passability of an event on an arbitrary map
 * 
 * @arg mapId
 * @text Map ID
 * @type number
 * @desc Input the map ID (this is a positive number)
 * 
 * @arg eventId
 * @text Event ID
 * @type number
 * @desc Input the event ID (this is a positive number)
 * @default 1
 * 
 * @arg passability
 * @text Passability
 * @type select
 * @option Default
 * @value 0
 * @option Player only
 * @value 1
 * @option Other events only
 * @value 2
 * @option Player and other events
 * @value 3
 *
 * 
 * @help
 * 
 * The plugin allows to set the event passability settings,
 * regardless of its priority (above, below, or at the character level).
 * 
 * The settings can be set using the plugin command or a tag via event notes.
 * 
 * The plugin provides two commands:
 * - Configure event passability (local)
 * - Configure event passability (global)
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
 * @target MZ
 * @plugindesc v1.0.0 Расширенная настройка проходимости событий
 * @author Phileas
 *
 * @command setEventPassabilityLocal
 * @text Настроить проходимость события (локально)
 * @desc Меняет проходимость события на текущей карте
 * 
 * @arg eventId
 * @text ID события
 * @type number
 * @desc Введите ID события (это положительное число)
 * @default 1
 * 
 * @arg passability
 * @text Проходимость
 * @type select
 * @option По умолчанию
 * @value 0
 * @option Только игрок
 * @value 1
 * @option Только другие события
 * @value 2
 * @option Игрок и другие события
 * @value 3
 * 
 * 
 * @command setEventPassabilityGlobal
 * @text Настроить проходимость события (глобально)
 * @desc Меняет проходимость события на произвольной карте
 * 
 * @arg mapId
 * @text ID карты
 * @type number
 * @desc Введите ID карты (это положительное число)
 * 
 * @arg eventId
 * @text ID события
 * @type number
 * @desc Введите ID события (это положительное число)
 * @default 1
 * 
 * @arg passability
 * @text Проходимость
 * @type select
 * @option По умолчанию
 * @value 0
 * @option Только игрок
 * @value 1
 * @option Только другие события
 * @value 2
 * @option Игрок и другие события
 * @value 3
 * 
 * 
 * @help
 * 
 * Плагин позволяет задать настройки проходимости события,
 * вне зависимости от его приоритета (над, под или на уровне персонажей).
 * 
 * Настройки можно задать командой плагина или тегом через заметки события.
 * 
 * Плагин предоставляет две команды:
 * - Настроить проходимость события (локально)
 * - Настроить проходимость события (глобально)
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
        "default": 0,
        "player": 1,
        "events": 2,
        "player-and-events": 3
    };
    // {mapId:{eventId:optionsArray}}
    var optionsCash = {};

    PluginManager.registerCommand("Phileas_EventPassability", "setEventPassabilityLocal", setEventPassabilityLocal);
    PluginManager.registerCommand("Phileas_EventPassability", "setEventPassabilityGlobal", setEventPassabilityGlobal);

//-----------------------------------------------------------------------------
// MY CODE

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

        let passabilityType = 0;
        if (options["Passability"] != undefined) {
            passabilityType = phileasPassabilityOptionsMap[options["Passability"]];
        }

        if (optionsCash[eventObject._mapId] == undefined) {
            optionsCash[eventObject._mapId] = {};
        }

        const currentType = optionsCash[eventObject._mapId][eventObject._eventId];
        if (currentType != undefined) {
            return;
        } 
  
        optionsCash[eventObject._mapId][eventObject._eventId] = passabilityType;
    }

    function setEventPassability(mapId, params) {
        const eventId = Number(params["eventId"]);
        const passabilityType = Number(params["passability"]);

        if (optionsCash[mapId] == undefined) {
            optionsCash[mapId] = {};
        }

        optionsCash[mapId][eventId] = passabilityType;
    }

    function setEventPassabilityLocal(params) {
        setEventPassability($gameMap._mapId, params);
    }

    function setEventPassabilityGlobal(params) {
        const mapId = Number(params["mapId"]);
        setEventPassability(mapId, params);
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

        return optionsCash[this._mapId][this._eventId];
    };

    Game_Event.prototype.isPlayerThroughEnabled = function() {
        const passabilityType = this.getPassabilityType();
        return passabilityType == 1 || passabilityType == 3;
    };

    Game_Event.prototype.isEventsThroughEnabled = function() {
        const passabilityType = this.getPassabilityType();
        return passabilityType == 2 || passabilityType == 3;
    };

//-----------------------------------------------------------------------------
// MODIFIED CODE
    
    const Origin_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        Origin_onMapLoaded.call(this);
        this.setPhileasEventPassabilityOptions();
    };

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        optionsCash = {};
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasEventPassabilityOptionsCash = optionsCash;
        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
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
