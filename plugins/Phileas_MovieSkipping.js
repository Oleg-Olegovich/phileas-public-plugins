//=============================================================================
// Phileas_MovieSkipping.js
//=============================================================================
// [Update History]
// 2025.January.12 Ver1.0.0 First Release
// 2025.January.16 Ver1.0.1 Added command with blacklist
// 2025.January.19 Ver1.0.2 Fixed command with blacklist
// 2025.July.18 Ver1.1.0 Added confirmation window

/*:
 * @target MZ
 * @plugindesc v1.1.0 Movie playback with skip function
 * @author Phileas
 *
 * @param confirmationWindow
 * @text Confirmation window
 * 
 * @param confirmHelp
 * @parent confirmationWindow
 * @text Question text
 * @default Skip video?
 * 
 * @param confirmationOk
 * @parent confirmationWindow
 * @text Confirm text
 * @default Yes
 * 
 * @param confirmCancel
 * @parent confirmationWindow
 * @text Cancel text
 * @default No 
 *  
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
 * @arg isConfirmationRequired
 * @text Is confirmation required?
 * @desc Request confirmation of skipping a video?
 * @type boolean
 * @default false
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
 * @arg isConfirmationRequired
 * @text Is confirmation required?
 * @desc Request confirmation of skipping a video?
 * @type boolean
 * @default false
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
 * @type number[]
 * @default ["0"]
 *
 * @arg gamepadNames
 * @text Gamepad key names
 * @type text[]
 * @desc Special key name
 * @default ["ok"]
 * 
 *
 * @command playMovieExceptKey
 * @text Play Movie (any skip key except)
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
 * @arg isConfirmationRequired
 * @text Is confirmation required?
 * @desc Request confirmation of skipping a video?
 * @type boolean
 * @default false
 *
 * @arg keyboardNumbers
 * @text Except keyboard key numbers
 * @type number[]
 * @default []
 *
 * @arg keyboardNames
 * @text Except keyboard key names
 * @type text[]
 * @desc Special key name
 * @default []
 *
 * @arg mouseNumbers
 * @text Except mouse key numbers
 * @type number[]
 * @default []
 *
 * @arg mouseNames
 * @text Except mouse key names
 * @type text[]
 * @desc Special key name
 * @default []
 *
 * @arg gamepadNumbers
 * @text Except gamepad key numbers
 * @type number[]
 * @default []
 *
 * @arg gamepadNames
 * @text Except gamepad key names
 * @type text[]
 * @desc Special key name
 * @default []
 *
 * 
 * @help
 * 
 * The plugin provides an improved version of the "Play Movie" event command,
 * adding the ability to skip the video when pressing a key.
 * 
 * The plugin has 3 commands:
 * - "Play Movie (any key to skip)" - the player just needs to press
 *   any keyon the keyboard, mouse and gamepad to skip the video.
 * - "Play Movie (specific skip key)" - allows to assign specific
 *   skip keys to the keyboard, mouse and gamepad.
 * - "Play Movie (any skip key except)" - allows to skip videos
 *   by pressing any keys except those specified
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
 * @plugindesc v1.1.0 Воспроизведение видео с опцией пропуска
 * @author Phileas
 *
 * @param confirmationWindow
 * @text Окно подтверждения
 * 
 * @param confirmHelp
 * @parent confirmationWindow
 * @text Текст вопроса
 * @default Пропустить видео?
 * 
 * @param confirmationOk
 * @parent confirmationWindow
 * @text Текст подтверждения
 * @default Да
 * 
 * @param confirmCancel
 * @parent confirmationWindow
 * @text Текст отмены
 * @default Нет
 *  
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
 * @arg isConfirmationRequired
 * @text Требуется подтверждение?
 * @desc Запросить подтверждение о пропуске видео?
 * @type boolean
 * @default false
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
 * @arg isConfirmationRequired
 * @text Требуется подтверждение?
 * @desc Запросить подтверждение о пропуске видео?
 * @type boolean
 * @default false
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
 * @type number[]
 * @default ["0"]
 *
 * @arg gamepadNames
 * @text Имена клавиш геймпада
 * @type text[]
 * @desc Special key name
 * @default ["ok"]
 * 
 *
 * @command playMovieExceptKey
 * @text Воспроизвести видео (пропуск любой клавишей, кроме)
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
 * @arg isConfirmationRequired
 * @text Требуется подтверждение?
 * @desc Запросить подтверждение о пропуске видео?
 * @type boolean
 * @default false
 *
 * @arg keyboardNumbers
 * @text Кроме номеров клавиш клавиатуры
 * @type number[]
 * @default []
 *
 * @arg keyboardNames
 * @text Кроме имён клавиш клавиатуры
 * @type text[]
 * @desc Special key name
 * @default []
 *
 * @arg mouseNumbers
 * @text Кроме номеров клавиш мыши
 * @type number[]
 * @default []
 *
 * @arg mouseNames
 * @text Кроме имён клавиш мыши
 * @type text[]
 * @desc Special key name
 * @default []
 *
 * @arg gamepadNumbers
 * @text Кроме номеров клавиш геймпада
 * @type number[]
 * @default []
 * @arg gamepadNames
 * @text Кроме имён клавиш геймпада
 * @type text[]
 * @desc Special key name
 * @default []
 *
 * 
 * @help
 * 
 * Плагин предоставляет улучшенную версию команды события "Воспроизвести видео",
 * добавляя возможность пропуска видео при нажатии на клавишу.
 * 
 * У плагина 3 команды:
 * - "Воспроизвести видео (пропуск любой клавишей)" - игроку достаточно
 *   нажать на любую клавишу клавиатуры, мыши и геймпада, чтобы
 *   пропустить видео.
 * - "Воспроизвести видео (конкретная клавиша пропуска)" - позволяет назначить
 *   конкретные клавиши пропуска для клавиатуры, мыши и геймпада.
 * - "Воспроизвести видео (пропуск любой клавишей, кроме)" - позволяет пропускать
 *   видео нажатием любых клавиш, кроме указанных
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

//-----------------------------------------------------------------------------
// MY CODE

//-----------------------------------------------------------------------------
// Data

    const $parameters = PluginManager.parameters("Phileas_MovieSkipping");
    const $confirmHelp = $parameters["confirmHelp"] || "Skip video?";
    const $confirmationOk = $parameters["confirmationOk"] || "Yes";
    const $confirmCancel = $parameters["confirmCancel"] || "No";

//-----------------------------------------------------------------------------
// Confirmation scene

    function Scene_SkipConfirmation() {
        this.initialize(...arguments);
    }

    Scene_SkipConfirmation.prototype = Object.create(Scene_Base.prototype);
    Scene_SkipConfirmation.prototype.constructor = Scene_SkipConfirmation;

    Scene_SkipConfirmation.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_SkipConfirmation.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createHelpWindow();
        this.createCommandWindow();

        Video._element.pause();
        Video._updateVisibility(false);
        try {
            PluginManager.callCommand(this, "Phileas_Cursor", "show");
        } catch {};
    };

    Scene_SkipConfirmation.prototype.getBitmapFromCurrentVideoFrame = function() {
        const video = Video._element;
        if (!video || video.readyState < 2) {
            return null;
        }

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL();
        return Bitmap.load(dataURL);
    }

    Scene_SkipConfirmation.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = this.getBitmapFromCurrentVideoFrame();
        this.addChild(this._backgroundSprite);
        this.setBackgroundOpacity(192);
    };

    Scene_SkipConfirmation.prototype.setBackgroundOpacity = function(opacity) {
        this._backgroundSprite.opacity = opacity;
    };

    Scene_SkipConfirmation.prototype.update = function() {
        if (!this.isBusy()) {
            this._commandWindow.open();
        }

        Scene_Base.prototype.update.call(this);
    };

    Scene_SkipConfirmation.prototype.isBusy = function() {
        return (
            this._commandWindow.isClosing() ||
            Scene_Base.prototype.isBusy.call(this)
        );
    };

    Scene_SkipConfirmation.prototype.helpWindowRect = function() {
        const ww = this.mainCommandWidth() * 2;
        const wh = this.calcWindowHeight(1, true);
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = Graphics.boxHeight / 2 - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkipConfirmation.prototype.createHelpWindow = function() {
        const rect = this.helpWindowRect();
        this._helpWindow = new Window_Help(rect);
        this._helpWindow.setText($confirmHelp);
        this.addWindow(this._helpWindow);
    };

    Scene_SkipConfirmation.prototype.commandWindowRect = function() {
        const ww = this._helpWindow.width;
        const wh = this._helpWindow.height;
        const wx = this._helpWindow.x;
        const wy = this._helpWindow.y + wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkipConfirmation.prototype.maxLabelWidth = function() {
        const calcWindow = new Window_Base(new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight));
        let maxWidth = 0;

        for (const language of $languages) {
            const textWidth = calcWindow.textSizeEx(language.label).width;
            const choiceWidth = Math.ceil(textWidth) + $languageSelectionTextPadding;

            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }

        return maxWidth;
    };

    Scene_SkipConfirmation.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_SkipCommand(rect);
        this._commandWindow.setHandler("ok", this.okHandler.bind(this));
        this._commandWindow.setHandler("cancel", this.cancelHandler.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_SkipConfirmation.prototype.okHandler = function() {
        this.closeScene();
        stopMovie();
        removeAllHandlers();
    };

    Scene_SkipConfirmation.prototype.cancelHandler = function() {
        Video._updateVisibility(true);
        this.closeScene();
        Video._element.play();
    };

    Scene_SkipConfirmation.prototype.closeScene = function() {
        this._commandWindow.close();
        this.popScene();
    };


    function Window_SkipCommand() {
        this.initialize(...arguments);
    }
    
    Window_SkipCommand.prototype = Object.create(Window_Command.prototype);
    Window_SkipCommand.prototype.constructor = Window_SkipCommand;
    
    Window_SkipCommand.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.openness = 0;
        this._lastCommandSymbol = 0;
    };

    Window_SkipCommand.initCommandPosition = function() {
        this._lastCommandSymbol = 0;
    };
    
    Window_SkipCommand.prototype.makeCommandList = function() {
        this.addCommand($confirmationOk, "ok");
        this.addCommand($confirmCancel, "cancel");
    };

    Window_SkipCommand.prototype.processOk = function() {
        Window_SkipCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };

    Window_SkipCommand.prototype.maxCols = function() {
        return 2;
    };

//-----------------------------------------------------------------------------
// Commands

    PluginManager.registerCommand("Phileas_MovieSkipping", "playMovie", playMovieByCommand);
    PluginManager.registerCommand("Phileas_MovieSkipping", "playMovieSpecificKey", playMovieByCommandWithSpecificKey);
    PluginManager.registerCommand("Phileas_MovieSkipping", "playMovieExceptKey", playMovieByCommandExceptKey);

    const Origin_updateGamepadState = Input._updateGamepadState;
    const Origin_Video_onLoad = Video._onLoad;
    const phileasMouseKeyMap = {
        0: "left",
        1: "middle",
        2: "right"
    }

    let keyboardKeyCodes = null;
    let mouseKeyCodes = null;
    let gamepadKeyCodes = null;
    let exceptKeyboardKeyCodes = null;
    let exceptMouseKeyCodes = null;
    let exceptGamepadKeyCodes = null;
    let isConfirmationRequired = false;

    function playMovieByCommand(params) {
        stopMovie();
        Video._onLoad = Video.phileasLoadMovieAnySkip;
        isConfirmationRequired = params["isConfirmationRequired"] == "true";

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
            throw new Error("Phileas' movie skipping: a skip key is required!");
        }
        
        stopMovie();
        Video._onLoad = Video.phileasLoadMovieSpecificSkip;
        isConfirmationRequired = params["isConfirmationRequired"] == "true";

        playMovie(params["movie"], params["ext"] || "webm");
    }

    function playMovieByCommandExceptKey(params) {
        exceptKeyboardKeyCodes = new Set();
        exceptMouseKeyCodes = new Set();
        exceptGamepadKeyCodes = new Set();

        if (params["keyboardNumbers"]) {
            const numbers = JSON.parse(params["keyboardNumbers"]);
            numbers.forEach(element => exceptKeyboardKeyCodes.add(Number(element)));
        }

        if (params["keyboardNames"]) {
            const names = JSON.parse(params["keyboardNames"]);
            const numbers = getKeysByValues(Input.keyMapper, names);
            numbers.forEach(element => exceptKeyboardKeyCodes.add(Number(element)));
        }

        if (params["mouseNumbers"]) {
            const numbers = JSON.parse(params["mouseNumbers"]);
            numbers.forEach(element => exceptMouseKeyCodes.add(Number(element)));
        }

        if (params["mouseNames"]) {
            const names = JSON.parse(params["mouseNames"]);
            const numbers = getKeysByValues(phileasMouseKeyMap, names);
            numbers.forEach(element => exceptMouseKeyCodes.add(Number(element)));
        }

        if (params["gamepadNumbers"]) {
            const numbers = JSON.parse(params["gamepadNumbers"]);
            numbers.forEach(element => exceptGamepadKeyCodes.add(Number(element)));
        }

        if (params["gamepadNames"]) {
            const names = JSON.parse(params["gamepadNames"]);
            const numbers = getKeysByValues(Input.gamepadMapper, names);
            numbers.forEach(element => exceptGamepadKeyCodes.add(Number(element)));
        }
        
        if (exceptKeyboardKeyCodes.size == 0 && exceptMouseKeyCodes.size == 0 && exceptGamepadKeyCodes.size == 0) {
            throw new Error("Phileas' movie skipping: a skip key is required!");
        }
        
        stopMovie();
        Video._onLoad = Video.phileasLoadMovieExceptSkip;
        isConfirmationRequired = params["isConfirmationRequired"] == "true";

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
        if (!Video.isPlaying()) {
            return;
        }

        Video._element.pause();
        Video._element.currentTime = 0;
        Video._onEnd();
    }

    function removeAllHandlers() {
        removeEventListener("keydown", skipMovie);
        removeEventListener("mousedown", skipMovie);
        removeEventListener("keydown", skipMovieByKeydown);
        removeEventListener("mousedown", skipMovieByMousedown);
        removeEventListener("keydown", skipMovieByKeydownExcept);
        removeEventListener("mousedown", skipMovieByMousedownExcept);
        Input._updateGamepadState = Origin_updateGamepadState;
        Video._onLoad = Origin_Video_onLoad;
    }

    function skipMovie() {
        if (!Video.isPlaying()) {
            return;
        }

        if (isConfirmationRequired) {
            SceneManager.push(Scene_SkipConfirmation);
            return;
        }

        stopMovie();
        removeAllHandlers();
    }

    function skipMovieByKeydown(event) {
        if (keyboardKeyCodes.has(event.keyCode)) {
            skipMovie();
        }
    }

    function skipMovieByMousedown(event) {
        if (mouseKeyCodes.has(event.button)) {
            skipMovie();
        }
    }

    function skipMovieByKeydownExcept(event) {
        if (!exceptKeyboardKeyCodes.has(event.keyCode)) {
            skipMovie();
        }
    }

    function skipMovieByMousedownExcept(event) {
        if (!exceptMouseKeyCodes.has(event.button)) {
            skipMovie();
        }
    }

//-----------------------------------------------------------------------------
// MODIFIED CODE

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

    Video.phileasLoadMovieExceptSkip = function() {
        Origin_Video_onLoad.call(this);
        addEventListener("keydown", skipMovieByKeydownExcept);
        addEventListener("mousedown", skipMovieByMousedownExcept);
        Input._updateGamepadState = Input.phileasSkipMovieExceptKey;
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
                skipMovie();
                return;
            }
        }
    }

    Input.phileasSkipMovieExceptKey = function(gamepad) {
        const oldValues = (this._gamepadStates[gamepad.index] || []).splice(0);

        Origin_updateGamepadState.call(this, gamepad);

        const state = this._gamepadStates[gamepad.index] || [];
        
        for (let i = 0; i < state.length; ++i) {
            if (exceptGamepadKeyCodes.has(i)) {
                continue;
            }

            if (!oldValues[i] && state[i]) {
                skipMovie();
                return;
            }
        }
    }

}());
