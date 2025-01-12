//=============================================================================
// Phileas_MovieSkipping.js
//=============================================================================
// [Update History]
// 2025.January.12 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Movie playback with skip function
 * @author Phileas
 *
 * @command playMovie
 * @text Play Movie (any key to skip)
 *
 * @arg movie
 * @text Movie
 * @desc A file with the ".webm" or ".mp4" extension in the movies directory
 * @default movie
 *
 * @arg ext
 * @text Extension
 * @type combo
 * @option webm
 * @option mp4
 * @default webm
 * 
 *
 * @command playMovieSpecificKey
 * @text Play Movie (specific skip key)
 *
 * @arg movie
 * @text Movie
 * @desc A file with the ".webm" or ".mp4" extension in the movies directory
 * @default movie
 *
 * @arg ext
 * @text Extension
 * @type combo
 * @option webm
 * @option mp4
 * @default webm
 *
 * @arg keyboardNumbers
 * @text Keyboard key numbers
 * @type number[]
 * @default ["13"]
 *
 * @arg keyboardNames
 * @text Keyboard key names
 * @type text[]
 * @desc Special key name
 * @default ["ok"]
 *
 * @arg mouseNumbers
 * @text Mouse key numbers
 * @type number[]
 * @default ["0"]
 *
 * @arg mouseNames
 * @text Mouse key names
 * @type text[]
 * @desc Special key name
 * @default ["left"]
 *
 * @arg gamepadNumbers
 * @text Gamepad key numbers
 * @type number
 * @default ["0"]
 *
 * @arg gamepadNames
 * @text Gamepad key names
 * @type text[]
 * @desc Special key name
 * @default ["ok"]
 *
 * 
 * @help
 * 
 * The plugin provides an improved version of the "Play Movie" event command,
 * adding the ability to skip the video when pressing a key.
 * 
 * The plugin has 2 commands:
 * - "Play Movie (any key to skip)" - the player just needs to press
 *   any keyon the keyboard, mouse and gamepad to skip the video.
 * - "Play Movie (specific skip key)" - allows you to assign specific
 *   skip keys to the keyboard, mouse and gamepad.
 * 
 * If you enable the "Exclude unused files" option when you deploy the game,
 * files used in the plugin commands may be deleted. Either don't use
 * use this option, or somehow include the file in the list of used files.
 * If there are requests from users of the plugin, I will try to add to the plugin
 * automatic file protection from deletion.
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
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MZ
 * @plugindesc Воспроизведение видео с опцией пропуска
 * @author Phileas
 *
 * @command playMovie
 * @text Воспроизвести видео (пропуск любой клавишей)
 *
 * @arg movie
 * @text Видео
 * @desc Файл с расширением ".webm" или ".mp4" в директории movies
 * @default movie
 *
 * @arg ext
 * @text Extension
 * @type combo
 * @option webm
 * @option mp4
 * @default webm
 * 
 *
 * @command playMovieSpecificKey
 * @text Воспроизвести видео (конкретная клавиша пропуска)
 *
 * @arg movie
 * @text Видео
 * @desc Файл с расширением ".webm" или ".mp4" в директории movies
 * @default movie
 *
 * @arg ext
 * @text Extension
 * @type combo
 * @option webm
 * @option mp4
 * @default webm
 *
 * @arg keyboardNumbers
 * @text Номера клавиш клавиатуры
 * @type number[]
 * @default ["13"]
 *
 * @arg keyboardNames
 * @text Имена клавиш клавиатуры
 * @type text[]
 * @desc Special key name
 * @default ["ok"]
 *
 * @arg mouseNumbers
 * @text Номера клавиш мыши
 * @type number[]
 * @default ["0"]
 *
 * @arg mouseNames
 * @text Имена клавиш мыши
 * @type text[]
 * @desc Special key name
 * @default ["left"]
 *
 * @arg gamepadNumbers
 * @text Номера клавиш геймпада
 * @type number
 * @default ["0"]
 *
 * @arg gamepadNames
 * @text Имена клавиш геймпада
 * @type text[]
 * @desc Special key name
 * @default ["ok"]
 *
 * 
 * @help
 * 
 * Плагин предоставляет улучшенную версию команды события "Воспроизвести видео",
 * добавляя возможность пропуска видео при нажатии на клавишу.
 * 
 * У плагина 2 команды:
 * - "Воспроизвести видео (пропуск любой клавишей)" - игроку достаточно
 *   нажать на любую клавишу клавиатуры, мыши и геймпада, чтобы
 *   пропустить видео.
 * - "Воспроизвести видео (конкретная клавиша пропуска)" - позволяет назначить
 *   конкретные клавиши пропуска для клавиатуры, мыши и геймпада.
 * 
 * Если при деплое игры вы включите опцию "Исключить неиспользуемые файлы",
 * могут быть удалены файлы, используемые в командах плагина. Либо не используйте
 * эту опцию, либо каким-либо образом включите файл в список используемых.
 * Если будут запросы от пользователей плагина, я попробую добавить в плагин
 * автоматическую защиту файлов от удаления.
 * 
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
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */


(function () {

//--------MY CODE:

    PluginManager.registerCommand("Phileas_MovieSkipping", "playMovie", playMovieByCommand);
    PluginManager.registerCommand("Phileas_MovieSkipping", "playMovieSpecificKey", playMovieByCommandWithSpecificKey);

    const Origin_updateGamepadState = Input._updateGamepadState;
    const Origin_Video_onLoad = Video._onLoad;
    const phileasMouseKeyMap = {
        0: "left",
        1: "middle",
        2: "right"
    }

    var keyboardKeyCodes = null;
    var mouseKeyCodes = null;
    var gamepadKeyCodes = null;

    function playMovieByCommand(params) {
        stopMovie();
        Video._onLoad = Video.phileasLoadMovieAnySkip;
        playMovie(params["movie"], params["ext"] || "webm");
    }

    function playMovieByCommandWithSpecificKey(params) {
        keyboardKeyCodes = new Set();
        mouseKeyCodes = new Set();
        gamepadKeyCodes = new Set();

        if (params["keyboardNumbers"]) {
            const numbers = JSON.parse(params["keyboardNumbers"]);
            numbers.forEach(element => keyboardKeyCodes.add(Number(element)));
        }

        if (params["keyboardNames"]) {
            const names = JSON.parse(params["keyboardNames"]);
            const numbers = getKeysByValues(Input.keyMapper, names);
            numbers.forEach(element => keyboardKeyCodes.add(Number(element)));
        }

        if (params["mouseNumbers"]) {
            const numbers = JSON.parse(params["mouseNumbers"]);
            numbers.forEach(element => mouseKeyCodes.add(Number(element)));
        }

        if (params["mouseNames"]) {
            const names = JSON.parse(params["mouseNames"]);
            const numbers = getKeysByValues(phileasMouseKeyMap, names);
            numbers.forEach(element => mouseKeyCodes.add(Number(element)));
        }

        if (params["gamepadNumbers"]) {
            const numbers = JSON.parse(params["gamepadNumbers"]);
            numbers.forEach(element => gamepadKeyCodes.add(Number(element)));
        }

        if (params["gamepadNames"]) {
            const names = JSON.parse(params["gamepadNames"]);
            const numbers = getKeysByValues(Input.gamepadMapper, names);
            numbers.forEach(element => gamepadKeyCodes.add(Number(element)));
        }
        
        if (keyboardKeyCodes.size == 0 && mouseKeyCodes.size == 0 && gamepadKeyCodes.size == 0) {
            throw new Error("Phileas's movie skipping: a skip key is required!");
        }
        
        stopMovie();
        Video._onLoad = Video.phileasLoadMovieSpecificSkip;
        playMovie(params["movie"], params["ext"] || "webm");
    }

    function getKeysByValues(object, values) {
        return Object.keys(object).filter(key => values.includes(object[key]));
    }

    function getCurrentInterpreter() {
        const baseInterpreter = $gameParty.inBattle()
            ? $gameTroop._interpreter
            : $gameMap._interpreter;
        return baseInterpreter._childInterpreter || baseInterpreter;
    }

    function playMovie(file, ext) {
        Video.play(`movies/${file}.${ext}`);
        const interpreter = getCurrentInterpreter();
        interpreter.setWaitMode("video");
    }

    function stopMovie() {
        if (Video.isPlaying()) {
            Video._element.pause();
            Video._element.currentTime = 0;
            Video._onEnd();
        }
    }

    function skipMovie() {
        stopMovie();

        removeEventListener("keydown", skipMovie);
        removeEventListener("mousedown", skipMovie);
        Input._updateGamepadState = Origin_updateGamepadState;
        Video._onLoad = Origin_Video_onLoad;
    }

    function skipMovieWithSpecificKey() {
        stopMovie();

        removeEventListener("keydown", skipMovieByKeydown);
        removeEventListener("mousedown", skipMovieByMousedown);
        Input._updateGamepadState = Origin_updateGamepadState;
        Video._onLoad = Origin_Video_onLoad;
    }

    function skipMovieByKeydown(event) {
        if (keyboardKeyCodes.has(event.keyCode)) {
            skipMovieWithSpecificKey();
        }
    }

    function skipMovieByMousedown(event) {
        if (mouseKeyCodes.has(event.button)) {
            skipMovieWithSpecificKey();
        }
    }

//--------CHANGED CORE:

    Video.phileasLoadMovieAnySkip = function() {
        Origin_Video_onLoad.call(this);

        addEventListener("keydown", skipMovie);
        addEventListener("mousedown", skipMovie);
        Input._updateGamepadState = Input.phileasSkipMovie;
    };

    Video.phileasLoadMovieSpecificSkip = function() {
        Origin_Video_onLoad.call(this);

        if (keyboardKeyCodes.size > 0) {
            addEventListener("keydown", skipMovieByKeydown);
        }

        if (mouseKeyCodes.size > 0) {
            addEventListener("mousedown", skipMovieByMousedown);
        }

        if (gamepadKeyCodes.size > 0) {
            Input._updateGamepadState = Input.phileasSkipMovieWithSpecificKey;
        }
    };

    Input.phileasSkipMovie = function(gamepad) {
        const lastState = (this._gamepadStates[gamepad.index] || []).slice(0);

        Origin_updateGamepadState.call(this, gamepad);

        const currentState = this._gamepadStates[gamepad.index] || [];

        if (lastState.length != currentState.length) {
            skipMovie();
            return;
        }

        for (let i = 0; i < lastState.length; ++i) {
            if (lastState[i] != currentState[i]) {
                skipMovie();
                return;
            }
        }
    }

    Input.phileasSkipMovieWithSpecificKey = function(gamepad) {
        let state = this._gamepadStates[gamepad.index] || [];
        const oldValues = [];
        for (const value of gamepadKeyCodes) {
            oldValues[value] = state[value];
        }

        Origin_updateGamepadState.call(this, gamepad);

        state = this._gamepadStates[gamepad.index] || [];
        for (const value of gamepadKeyCodes) {
            oldValues[value] = state[value];
            if (!oldValues[value] && state[value]) {
                skipMovieWithSpecificKey();
            }
        }
    }

}());
