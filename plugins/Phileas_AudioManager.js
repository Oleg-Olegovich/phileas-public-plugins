//=============================================================================
// Phileas_AudioManager.js
//=============================================================================
// [Update History]
// 2025.May.16 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0
 * @author Phileas
 * 
 * @command playLoopingSe
 * @text Play looping SE
 * @arg name
 * @text Audiofile
 * @type file
 * @dir audio/se/
 * @require 1
 * @arg volume
 * @text Volume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pitch
 * @text Pitch
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pan
 * @text Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @command playLoopingSeSafe
 * @text Play looping SE safe
 * @arg name
 * @text Audiofile
 * @type file
 * @dir audio/se/
 * @require 1
 * @arg volume
 * @text Volume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pitch
 * @text Pitch
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pan
 * @text Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @command stopPlayingLoopingSe
 * @text Stop playing looping SE
 * 
 * @command modifyBgm
 * @text Modify BGM
 * @arg value
 * @text Modifier
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * 
 * @command modifyBgs
 * @text Modify BGS
 * @arg value
 * @text Modifier
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * 
 * @command modifyBgmGradually
 * @text Modify BGM gradually
 * @arg value
 * @text Modifier
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * @arg frames
 * @text Frames
 * @type number
 * @min 1
 * @default 60
 * 
 * @command modifyBgsGradually
 * @text Modify BGS gradually
 * @arg value
 * @text Modifier
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * @arg frames
 * @text Frames
 * @type number
 * @min 1
 * @default 60
 * 
 * 
 * @help
 * 
 * This plugin extends music and sound control in the game.
 * You can use plugin commands or scripts.
 * 
 * I will gradually add new functionality.
 * You can write to me if your project
 * needs a feature that hasn't been implemented yet.
 * 
 * Command:
 *     Play looping SE
 * Script:
 *     $gameSystem.playLoopingSe(name, volume, pitch, pan);
 * Script arguments: 
 *     name - filename in audio/se/ folder without extension
 *     volume - volume from 0 to 100. Optional argument.
 *              Default value - 100.
 *     pitch - tempo from 0 to 100. Optional argument.
 *              Default value - 100.
 *     pan - pan from -100 to 100. Optional argument.
 *              Default value - 0.
 * Description:
 *     The command plays a sound in a loop, similar to BGM or BGS.
 *     The difference from BGS is that there can be multiple sounds.
 *     (However, in the current implementation only one sound can be looped).
 * 
 * Command:
 *     Play looping SE safely
 * Script:
 *     $gameSystem.playLoopingSeSafe(name, volume, pitch, pan);
 * Script arguments:
 *     Same as "Play looping SE" command
 * Description:
 *     Same as "Play looping SE" command,
 *     but if there is already any looping sound,
 *     the new one won't play.
 * 
 * Command:
 *     Stop playing looping SE
 * Script:
 *     $gameSystem.stopPlayingLoopingSe();
 * Description:
 *     Stops all looping SE.
 * 
 * Command:
 *     Modify BGM
 * Script:
 *     $gameSystem.modifyBgm(value);
 * Script arguments:
 *     value - value from 0.00 to 1.00
 * Description:
 *     Multiplies BGM volume by value
 *     during playback. The value is saved
 *     in the save file and restored when
 *     loading the game. Unlike regular sound
 *     volume settings, this value is not controlled
 *     by the player and is saved in the local save file,
 *     not the global config.
 *     
 * Command:
 *     Modify BGS
 * Script:
 *     $gameSystem.modifyBgs(value);
 * Script arguments:
 *     value - value from 0.00 to 1.00
 * Description:
 *     Same as "Modify BGM" command, but for BGS.
 * 
 * Command:
 *     Modify BGM gradually
 * Script:
 *     $gameSystem.modifyBgmGradually(value, frames);
 * Script arguments:
 *     value - value from 0.00 to 1.00
 *     frames - positive integer. 
 * Description:
 *     Same as "Modify BGM" command, but
 *     the value changes gradually over the specified
 *     number of frames.
 * 
 * Command:
 *     Modify BGS gradually
 * Script:
 *     $gameSystem.modifyBgsGradually(value, frames);
 * Script arguments: 
 *     value - value from 0.00 to 1.00
 *     frames - positive integer. 
 * Description:
 *     Same as "Modify BGM gradually" command,
 *     but for BGS.
 * 
 * You can always write to the author if you need other features or even plugins.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 *-----------------------------------------------------------------------------
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */

/*:ru
 * @target MZ
 * @plugindesc v1.0.0
 * @author Phileas
 * 
 * @command playLoopingSe
 * @text Проигрывать зацикленный SE
 * @arg name
 * @text Audiofile
 * @type file
 * @dir audio/se/
 * @require 1
 * @arg volume
 * @text Громкость
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pitch
 * @text Темп
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pan
 * @text Панорама
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @command playLoopingSeSafe
 * @text Проигрывать зацикленный SE безопасно
 * @arg name
 * @text Audiofile
 * @type file
 * @dir audio/se/
 * @require 1
 * @arg volume
 * @text Громкость
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pitch
 * @text Темп
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @arg pan
 * @text Панорама
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @command stopPlayingLoopingSe
 * @text Остановить зацикленный SE
 * 
 * @command modifyBgm
 * @text Модифицировать BGM
 * @arg value
 * @text Модификатор
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * 
 * @command modifyBgs
 * @text Модифицировать BGS
 * @arg value
 * @text Модификатор
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * 
 * @command modifyBgmGradually
 * @text Модифицировать BGM постепенно
 * @arg value
 * @text Модификатор
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * @arg frames
 * @text Кадры
 * @type number
 * @min 1
 * @default 60
 * 
 * @command modifyBgsGradually
 * @text Модифицировать BGS постепенно
 * @arg value
 * @text Модификатор
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 1
 * @arg frames
 * @text Кадры
 * @type number
 * @min 1
 * @default 60
 * 
 * 
 * @help
 * 
 * Плагин расширяет управление музыкой и звуками в игре.
 * Вы можете использовать команды плагина или скрипты.
 * 
 * Я буду постепенно добавлять новый функционал.
 * Вы можете написать мне, если для вашего проекта
 * потребуется фича, которая ещё не реализована.
 * 
 * Команда:
 *     Проигрывать зацикленный SE
 * Скрипт:
 *     $gameSystem.playLoopingSe(name, volume, pitch, pan);
 * Аргументы скрипта: 
 *     name - название файла в папке audio/se/ без расширения
 *     volume - громкость от 0 до 100. Необязательный аргумент.
 *              Значение по умолчанию - 100.
 *     pitch - темп от 0 до 100. Необязательный аргумент.
 *             Значение по умолчанию - 100.
 *     pan - панорама от -100 до 100. Необязательный аргумент.
 *           Значение по умолчанию - 0.
 * Описание:
 *     Команда играет звук в цикле, подобно BGM или BGS.
 *     Отличие от BGS в том, что звуков может быть несколько.
 *     (Однако в текущей реализации только один звук может быть зацикленным).
 * 
 * Команда:
 *     Проигрывать зацикленный SE безопасно
 * Скрипт:
 *     $gameSystem.playLoopingSeSafe(name, volume, pitch, pan);
 * Аргументы скрипта:
 *     Аналогично команде "Проигрывать зацикленный SE"
 * Описание:
 *     Аналогично команде "Проигрывать зацикленный SE",
 *     но если уже есть какой-либо зацикленный звук,
 *     то новый не будет проигрываться.
 * 
 * Команда:
 *     Остановить зацикленный SE
 * Скрипт:
 *     $gameSystem.stopPlayingLoopingSe();
 * Описание:
 *     Останавливает все зацикленные SE.
 * 
 * Команда:
 *     Модифицировать BGM
 * Скрипт:
 *     $gameSystem.modifyBgm(value);
 * Аргументы скрипта:
 *     value - значение от 0.00 до 1.00
 * Описание:
 *     Умножает громкость BGM на значение value
 *     при воспроизведении. Значение сохраняется
 *     в файле сохранения и восстанавливается при
 *     загрузке игры. В отличие от обычной настройки
 *     громкости звука, это значение не контролируется
 *     игроком и сохраняется в локальном файле сохранения,
 *     а не глобальном конфиге.
 *     
 * Команда:
 *     Модифицировать BGS
 * Скрипт:
 *     $gameSystem.modifyBgs(value);
 * Аргументы скрипта:
 *     value - значение от 0.00 до 1.00
 * Описание:
 *     Аналогично команде "Модифицировать BGM", но для BGS.
 * 
 * Команда:
 *     Модифицировать BGM постепенно
 * Скрипт:
 *     $gameSystem.modifyBgmGradually(value, frames);
 * Аргументы скрипта:
 *     value - значение от 0.00 до 1.00
 *     frames - целое положительное число. 
 * Описание:
 *     Аналогично команде "Модифицировать BGM", но
 *     значение меняется постепенно за указанное
 *     кол-во кадров.
 * 
 * Команда:
 *     Модифицировать BGS постепенно
 * Скрипт:
 *     $gameSystem.modifyBgsGradually(value, frames);
 * Аргументы скрипта: 
 *     value - значение от 0.00 до 1.00
 *     frames - целое положительное число. 
 * Описание:
 *     Аналогично команде "Модифицировать BGM постепенно",
 *     но для BGS.
 * 
 * 
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 *-----------------------------------------------------------------------------
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих
 * и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 * 
 */

(function () {

//-----------------------------------------------------------------------------
// Commands

    PluginManager.registerCommand("Phileas_AudioManager", "playLoopingSe", playLoopingSeByCommand);
    PluginManager.registerCommand("Phileas_AudioManager", "playLoopingSeSafe", playLoopingSeSafeByCommand);
    PluginManager.registerCommand("Phileas_AudioManager", "stopPlayingLoopingSe", stopPlayingLoopingSeByCommand);
    PluginManager.registerCommand("Phileas_AudioManager", "modifyBgm", modifyBgmByCommand);
    PluginManager.registerCommand("Phileas_AudioManager", "modifyBgs", modifyBgsByCommand);
    PluginManager.registerCommand("Phileas_AudioManager", "modifyBgmGradually", modifyBgmGraduallyByCommand);
    PluginManager.registerCommand("Phileas_AudioManager", "modifyBgsGradually", modifyBgsGraduallyByCommand);

    function playLoopingSeByCommand(params) {
        const name = params["name"];
        const volume = Number(params["volume"] || 100);
        const pitch = Number(params["pitch"] || 100);
        const pan = Number(params["pan"] || 0);
        $gameSystem.playLoopingSe(name, volume, pitch, pan);
    }

    function playLoopingSeSafeByCommand(params) {
        const name = params["name"];
        const volume = Number(params["volume"] || 100);
        const pitch = Number(params["pitch"] || 100);
        const pan = Number(params["pan"] || 0);
        $gameSystem.playLoopingSe(name, volume, pitch, pan);
    }

    function stopPlayingLoopingSeByCommand() {
        $gameSystem.stopPlayingLoopingSe();
    }

    function modifyBgmByCommand(params) {
        const value = Number(params["value"]);
        $gameSystem.modifyBgm(value);
    }

    function modifyBgsByCommand(params) {
        const value = Number(params["value"]);
        $gameSystem.modifyBgs(value);
    }

    function modifyBgmGraduallyByCommand(params) {
        const value = Number(params["value"]);
        const frames = Number(params["frames"]);
        $gameSystem.modifyBgmGradually(value, frames);
    }

    function modifyBgsGraduallyByCommand(params) {
        const value = Number(params["value"]);
        const frames = Number(params["frames"]);
        $gameSystem.modifyBgsGradually(value, frames);
    }

//-----------------------------------------------------------------------------
// API

    Game_System.prototype.playLoopingSe = function(name, volume = 100, pitch = 100, pan = 0) {
            $gameSystem._loopingSE = {
                name: name,
                volume: volume,
                pitch: pitch,
                pan: pan,
                isPlaying: true
            };

            AudioManager.playLoopSe({
                name: $gameSystem._loopingSE.name,
                volume: $gameSystem._loopingSE.volume,
                pitch: $gameSystem._loopingSE.pitch,
                pan: $gameSystem._loopingSE.pan
            });
    };

    Game_System.prototype.playLoopingSeSafe = function(name, volume = 100, pitch = 100, pan = 0) {
        if (!this.isLoopingSePlaying()) {
            this.playLoopingSe(name, volume, pitch, pan);
        }
    };

    Game_System.prototype.stopPlayingLoopingSe = function() {
        if ($gameSystem._loopingSE) {
            $gameSystem._loopingSE = null;
            AudioManager.stopSe();
        }
    };

    Game_System.prototype.modifyBgm = function(value) {
        this._bgmModifier = this._targetBgmModifier = value;
        AudioManager.updateBgmParameters(AudioManager._currentBgm);
    };

    Game_System.prototype.modifyBgs = function(value) {
        this._bgsModifier = this._targetBgsModifier = value;
        AudioManager.updateBgsParameters(this._currentBgs);
    };

    Game_System.prototype.modifyBgmGradually = function(value, frames) {
        this._targetBgmModifier = value;
        this._bgmModifierStep = (value - this._bgmModifier) / frames;
    };

    Game_System.prototype.modifyBgsGradually = function(value, frames) {
        this._targetBgsModifier = value;
        this._bgsModifierStep = (value - this._bgsModifier) / frames;
    };

//-----------------------------------------------------------------------------
// New code

    AudioManager.updateBgmParameters = function(bgm) {
        this.updateBufferParameters(this._bgmBuffer, this._bgmVolume * $gameSystem._bgmModifier, bgm);
    };

    AudioManager.updateBgsParameters = function(bgs) {
        this.updateBufferParameters(this._bgsBuffer, this._bgsVolume * $gameSystem._bgsModifier, bgs);
    };

    AudioManager.playLoopSe = function(se) {
        if (se.name) {
            // [Note] Do not play the same sound in the same frame.
            const latestBuffers = this._seBuffers.filter(
                buffer => buffer.frameCount === Graphics.frameCount
            );
            if (latestBuffers.find(buffer => buffer.name === se.name)) {
                return;
            }
            const buffer = this.createBuffer("se/", se.name);
            this.updateSeParameters(buffer, se);
            buffer.play(true);
            this._seBuffers.push(buffer);
            this.cleanupSe();
        }
    };

    function addStep(value, target, step) {
        value += step;
        return step > 0
            ? Math.min(value, target)
            : Math.max(value, target);
    }

    Game_System.prototype.update = function() {
        if (this._targetBgmModifier != this._bgmModifier) {
            this._bgmModifier = addStep(this._bgmModifier, this._targetBgmModifier, this._bgmModifierStep);
            AudioManager.updateBgmParameters(AudioManager._currentBgm);
        }

        if (this._targetBgsModifier != this._bgsModifier) {
            this._bgsModifier = addStep(this._bgsModifier, this._targetBgsModifier, this._bgsModifierStep);
            AudioManager.updateBgsParameters(AudioManager._currentBgs);
        }
    };

    Game_System.prototype.isLoopingSePlaying = function() {
        return $gameSystem._loopingSE && $gameSystem._loopingSE.isPlaying;
    };

//-----------------------------------------------------------------------------
// Modified code

    const Origin_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        Origin_Game_System_initialize.call(this);

        this._bgmModifier = 1;
        this._targetBgmModifier = 1;
        this._bgmModifierStep = 0;
        this._bgsModifier = 1;
        this._targetBgsModifier = 1;
        this._bgsModifierStep = 0;
    };

    const Origin_Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function() {
        Origin_Game_System_onAfterLoad.call(this);
        
        if ($gameSystem.isLoopingSePlaying()) {
            this.playLoopingSe($gameSystem._loopingSE.name);
        } else {
            this.stopPlayingLoopingSe();
        }
    };

    const Origin_Game_Screen_update = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function() {
        Origin_Game_Screen_update.call(this);

        $gameSystem.update();
    };

}());