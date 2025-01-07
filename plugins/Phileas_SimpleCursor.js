//=============================================================================
// Phileas_SimpleCursor.js
//=============================================================================
// [Update History]
// 2025.January.04 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Simple cursor configuration
 * @author Phileas
 *
 * @param basicCursors
 * @text Basic cursors
 *
 * @param defaultCursor
 * @parent basicCursors
 * @text Default cursor
 * @type struct<CursorDataStruct>
 * @desc It is set at the start of the game
 *
 * @param battleCursor
 * @parent basicCursors
 * @text Battle cursor
 * @type struct<CursorDataStruct>
 * @desc Used in battle. If not set, the "Default cursor" will be used
 *
 * @param menuCursor
 * @parent basicCursors
 * @text Menu cursor
 * @type struct<CursorDataStruct>
 * @desc Used in the game menu. If not set, the "Default cursor" will be used
 *
 * @param titleCursor
 * @parent basicCursors
 * @text Title screen cursor
 * @type struct<CursorDataStruct>
 * @desc Used on the title screen. If not set, the "Default cursor" will be used
 *
 * @param cursorDisplay
 * @text Cursor display
 *
 * @param hideAtStartup
 * @parent cursorDisplay
 * @text Hide at startup?
 * @type boolean
 * @default false
 * @desc If true, the cursor will be invisible when the game starts
 *
 * @param keyboardHideKey
 * @parent cursorDisplay
 * @text Keyboard key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param keyboardHideKeyNumber
 * @parent cursorDisplay
 * @text Keyboard key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Keyboard key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param mouseHideKey
 * @parent cursorDisplay
 * @text Mouse key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param mouseHideKeyNumber
 * @parent cursorDisplay
 * @text Mouse key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Mouse key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param gamepadHideKey
 * @parent cursorDisplay
 * @text Gamepad key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param gamepadHideKeyNumber
 * @parent cursorDisplay
 * @text Gamepad key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Gamepad key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param mapsPreload
 * @text Maps preloading
 * @type boolean
 * @default false
 * @desc Preloading of cursor images from commands on maps. Loaded internal folders of any nesting level.
 *
 * @param commonEventsPreload
 * @text Common events preloading
 * @type boolean
 * @default false
 * @desc Preloading of cursor images from commands in common events. Loaded internal folders of any nesting level.
 * 
 * @command setDefaultCursor
 * @text Change the default cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command setBattleCursor
 * @text Change the battle cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command setMenuCursor
 * @text Change the menu cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command setTitleCursor
 * @text Change the title screen cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command hide
 * @text Hide cursor
 * @desc Makes the cursor invisible
 *
 * @command show
 * @text Show cursor
 * @desc Makes the cursor visible
 *
 * 
 * @help
 * Changes the cursor image to any of the img/system.
 * Animated cursors are supported, details below.
 * Use png format!
 *
 * To change the cursor to the standard one, do not select an image in the parameter/argument (option "(None)").
 * 
 * Plugin commands: 
 * - "Change the default cursor"
 * - "Change the battle cursor"
 * - "Change the menu cursor"
 * - "Hide cursor"
 * - "Show cursor"
 * 
 * 
 * The settings set by the plugin command are saved along with the game progress.
 *
 * You can also switch the invisibility of the cursor by pressing the keyboard, mouse and gamepad keys.
 * To do this, configure the plugin settings. If you want to specify a key by a string name, set 0 to the number value.
 *
 *
 * You can configure the preloading of cursor resources. This will speed up the switching of cursor images,
 * but it may slow down the launch of the game.
 * Images from the basic cursors (default, battle and menu) are always cached.
 * If preloading of maps is disabled, the map event commands are cached when loading this map.
 * If the preloading of general events is disabled, the commands of this event are cached when it is called.
 *
 * If the cursor image is not displayed, try to reduce its size.
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

/*~struct~CursorDataStruct:
 * @param CursorPicture
 * @text Cursor picture
 * @type file
 * @dir img/system/
 *
 * @param CursorPictureOnClick
 * @text Cursor picture on click
 * @type file
 * @dir img/system/
 * @desc Leave this field empty so that the cursor does not change when clicked
 *
 * @param CursorXOffset
 * @text X offset
 * @number
 * @default 0
 * @min 0
 * @desc The horizontal offset of the click point from the upper-left corner in pixels
 *
 * @param CursorYOffset
 * @text Y offset
 * @number
 * @default 0
 * @min 0
 * @desc The vertical offset of the click point from the upper-left corner in pixels
 */

/*:ru
 * @target MZ
 * @plugindesc Простая конфигурация курсора
 * @author Phileas
 *
 * @param basicCursors
 * @text Основные курсоры
 *
 * @param defaultCursor
 * @parent basicCursors
 * @text Курсор по умолчанию
 * @type struct<CursorDataStruct>
 * @desc Устанавливается при запуске игры
 *
 * @param battleCursor
 * @parent basicCursors
 * @text Курсор боя
 * @type struct<CursorDataStruct>
 * @desc Используется в бою. Если не установлен, будет использоваться "Курсор по умолчанию"
 *
 * @param menuCursor
 * @parent basicCursors
 * @text Курсор меню
 * @type struct<CursorDataStruct>
 * @desc Используется в меню. Если не установлен, будет использоваться "Курсор по умолчанию"
 *
 * @param titleCursor
 * @parent basicCursors
 * @text Курсор титульного экрана
 * @type struct<CursorDataStruct>
 * @desc Используется на титульном экране. Если не установлен, будет использоваться "Курсор по умолчанию"
 *
 * @param cursorDisplay
 * @text Отображение курсора
 *
 * @param hideAtStartup
 * @parent cursorDisplay
 * @text Скрывать при запуске?
 * @type boolean
 * @default false
 * @desc Если true, курсор будет невидимым при запуске игры
 *
 * @param keyboardHideKey
 * @parent cursorDisplay
 * @text Клавиша клавиатуры для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param keyboardHideKeyNumber
 * @parent cursorDisplay
 * @text Клавиша клавиатуры для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param mouseHideKey
 * @parent cursorDisplay
 * @text Клавиша мыши для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param mouseHideKeyNumber
 * @parent cursorDisplay
 * @text Клавиша мыши для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param gamepadHideKey
 * @parent cursorDisplay
 * @text Клавиша геймпада для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param gamepadHideKeyNumber
 * @parent cursorDisplay
 * @text Клавиша геймпада для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param mapsPreload
 * @text Предзагрузка карт
 * @type boolean
 * @default false
 * @desc Предзагрузка картинок курсоров с команд на картах. Загружаются внутренние папки любого уровня вложенности.
 *
 * @param commonEventsPreload
 * @text Предзагрузка общих событий
 * @type boolean
 * @default false
 * @desc Предзагрузка картинок курсоров с команд в событиях. Загружаются внутренние папки любого уровня вложенности.
 * 
 * @command setDefaultCursor
 * @text Изменить курсор по умолчанию
 * @arg cursorData
 * @text Настройки
 * @type struct<CursorDataStruct>
 *
 * @command setBattleCursor
 * @text Изменить курсор боя
 * @arg cursorData
 * @text Настройки
 * @type struct<CursorDataStruct>
 *
 * @command setMenuCursor
 * @text Изменить курсор меню
 * @arg cursorData
 * @text Настройки
 * @type struct<CursorDataStruct>
 *
 * @command setTitleCursor
 * @text Изменить курсор титульного экрана
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command hide
 * @text Скрыть курсор
 * @desc Делает курсор невидимым
 *
 * @command show
 * @text Показать курсор
 * @desc Делает курсор видимым
 *
 * 
 * @help
 * Изменяет картинку курсора на любую из img/system.
 * Поддерживаются анимированные курсоры, подробности ниже.
 * Используйте формат png!
 *
 * Чтобы изменить курсор на стандартный, в параметре/аргументе не выбирайте картинку (вариант "(Нет)").
 * 
 * Команды плагина: 
 * - "Изменить курсор по умолчанию"
 * - "Изменить курсор боя"
 * - "Изменить курсор меню"
 * - "Скрыть курсор"
 * - "Показать курсор"
 * 
 *
 * Настройки, заданные командой плагина, сохраняются вместе с прогрессом игры.
 *
 * Также вы можете переключать невидимость курсора по нажатию на клавишу клавиатуры, мыши и геймпада.
 * Для этого настройте параметры плагина. Если вы хотите указать клавишу по строковому имени, установите 0 в значение номера.
 *
 * Вы можете настроить предзагрузку ресурсов курсоров. Это ускорит переключение картинок курсоров,
 * но может замедлить запуск игры.
 * Картинки из базовых курсоров (по умолчанию, бой и меню) кэшируются всегда.
 * Если выключена предзагрузка карт, то команды событий карты кэшируются при загрузке этой карты.
 * Если выключена предзагрузка общих событий, то команды этого события кэшируются при его вызове.
 *
 * Если картинка курсора не отображается, попробуйте уменьшить её размер.
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

/*~struct~CursorDataStruct:ru
 * @param CursorPicture
 * @text Картинка курсора
 * @type file
 * @dir img/system/
 *
 * @param CursorPictureOnClick
 * @text Картинка курсора при клике
 * @type file
 * @dir img/system/
 * @desc Оставьте это поле пустым, чтобы курсор не менялся при клике
 *
 * @param CursorXOffset
 * @text Смещение по X
 * @number
 * @default 0
 * @min 0
 * @desc Отступ точки клика по горизонтали от верхнего левого угла в пикселях
 *
 * @param CursorYOffset
 * @text Смещение по Y
 * @number
 * @default 0
 * @min 0
 * @desc Отступ точки клика по вертикали от верхнего левого угла в пикселях
 */


(function () {

//--------MY CODE:

//-----------------------------------------------------------------------------
// Utils classes

    function PhileasCursorData() {
        this.initialize(...arguments);
    }

    PhileasCursorData.prototype.initialize = function() {
        this.CursorPicture = "";
        this.CursorPictureOnClick = "";
        this.CursorXOffset = 1;
        this.CursorYOffset = 1;
    };

    PhileasCursorData.prototype.constructor = PhileasCursorData;

    PhileasCursorData.prototype.setFromJson = function(params) {
        if (params == undefined) {
            return;
        }

        this.CursorPicture = params["CursorPicture"] || "";
        this.CursorPictureOnClick = params["CursorPictureOnClick"] || "";
        this.CursorXOffset = Number(params["CursorXOffset"]);
        this.CursorYOffset = Number(params["CursorYOffset"]);
    }

    PhileasCursorData.prototype.setFromParams = function(params) {
        if (params == "" || params == undefined) {
            return;
        }

        params = JSON.parse(params);
        this.setFromJson(params);
    }

    PhileasCursorData.prototype.equals = function(cursorData) {
        return this.CursorPicture == cursorData.CursorPicture
            && this.CursorPictureOnClick == cursorData.CursorPictureOnClick
            && this.CursorXOffset == cursorData.CursorXOffset
            && this.CursorYOffset == cursorData.CursorYOffset;
    }


//-----------------------------------------------------------------------------
// Data

    const base_url = "./img/system/";
    const fallbackStyle = "pointer";
    const phileasMouseKeyMap = {
        "left": 0,
        "middle": 1,
        "right": 2
    }

    var parameters = PluginManager.parameters("Phileas_SimpleCursor");
    var hideAtStartup = parameters["hideAtStartup"] == "true";
    var keyboardHideKey = parameters["keyboardHideKey"] || "";
    var keyboardHideKeyNumber = Number(parameters["keyboardHideKeyNumber"] || 0);
    var mouseHideKey = parameters["mouseHideKey"] || "";
    var mouseHideKeyNumber = Number(parameters["mouseHideKeyNumber"] || 0);
    var gamepadHideKey = parameters["gamepadHideKey"] || "";
    var gamepadHideKeyNumber = Number(parameters["gamepadHideKeyNumber"] || 0);
    var mapsPreload = parameters["mapsPreload"] == "true";
    var commonEventsPreload = parameters["commonEventsPreload"] == "true";

    var defaultCursor = new PhileasCursorData();
    defaultCursor.setFromParams(parameters["defaultCursor"]);
    var battleCursor = new PhileasCursorData();
    battleCursor.setFromParams(parameters["battleCursor"]);
    var menuCursor = new PhileasCursorData();
    menuCursor.setFromParams(parameters["menuCursor"]);
    var titleCursor = new PhileasCursorData();
    titleCursor.setFromParams(parameters["titleCursor"]);
    var currentHidden = false;
    var currentClick = false;
    var currentCursor = new PhileasCursorData();

    setCurrentCursor(defaultCursor);

    PluginManager.registerCommand("Phileas_SimpleCursor", "setDefaultCursor", setDefaultCursor);
    PluginManager.registerCommand("Phileas_SimpleCursor", "setBattleCursor", setBattleCursor);
    PluginManager.registerCommand("Phileas_SimpleCursor", "setMenuCursor", setMenuCursor);
    PluginManager.registerCommand("Phileas_SimpleCursor", "setTitleCursor", setTitleCursor);
    PluginManager.registerCommand("Phileas_SimpleCursor", "hide", hide);
    PluginManager.registerCommand("Phileas_SimpleCursor", "show", show);


//-----------------------------------------------------------------------------
// Preloading

    var phileasCursorsCash = new Set();

    function preloadCursorImage(file) {
        if (phileasCursorsCash.has(file)) {
            return;
        }

        //ImageManager.loadSystem(filename);
        const img = new Image();
        img.src = `${base_url}${file}.png`;
        img.onload = () => phileasCursorsCash.add(file);
        img.onerror = () => console.log(`Failed to load cursor image ${file}.png`);
    }

    function preloadCursorData(cursorData) {
        if (cursorData.CursorPicture != "") {
            preloadCursorImage(cursorData.CursorPicture);
        }

        if (cursorData.CursorPictureOnClick != "") {
            preloadCursorImage(cursorData.CursorPictureOnClick);
        }
    }

    function preloadCursorDataFromCommandList(list) {
        let cursorCommandData = new PhileasCursorData();
        for (let i = 0; i < list.length; ++i) {
            if (list[i].code != 357 || list[i].parameters[0] != "Phileas_SimpleCursor") {
                continue;
            }

            switch (list[i].parameters[1]) {
                case "setDefaultCursor":
                case "setBattleCursor":
                case "setMenuCursor":
                case "setTitleCursor":
                    cursorCommandData.setFromParams(list[i].parameters[3].cursorData);
                    break;
                default:
                    continue;
            }

            preloadCursorData(cursorCommandData);
        }
    }

    function preloadCursorDataFromPages(pages) {
        for (let i = 0; i < pages.length; ++i) {
            preloadCursorDataFromCommandList(pages[i].list);
        }
    }

    function preloadCursorDataFromEvent(eventData) {
        preloadCursorData(cursorNoteData);
        preloadCursorDataFromPages(eventData.pages);
    }

    function preloadCursorDataFromMaps() {
        let preloadCounter = 1;

        const Origin_onDataLoad = DataManager.onLoad;
        DataManager.onLoad = function(object) {
            Origin_onDataLoad.call(this, object);
            if (object.events) {
                for (let i = 1; i < object.events.length; ++i) {
                    if (object.events[i]) {
                        preloadCursorDataFromEvent(object.events[i]);
                    }
                }
            }

            ++preloadCounter;
            if (preloadCounter == $dataMapInfos.length) {
                DataManager.onLoad = Origin_onDataLoad;;
            }
        };

        for (let i = 1; i < $dataMapInfos.length; ++i) {
            if ($dataMapInfos[i]) {
                DataManager.loadMapData($dataMapInfos[i].id);
            }
        }
    }

    function preloadCursorDataFromCommonEvents() {
        for (let i = 1; i < $dataCommonEvents.length; ++i) {
            preloadCursorDataFromCommandList($dataCommonEvents[i].list);
        }
    }

    function preloadCursorImages() {
        preloadCursorData(defaultCursor);
        preloadCursorData(battleCursor);
        preloadCursorData(menuCursor);
        preloadCursorData(titleCursor);

        if (commonEventsPreload) {
            preloadCursorDataFromCommonEvents();
        }

        if (mapsPreload) {
            preloadCursorDataFromMaps();
        }
    }

//-----------------------------------------------------------------------------
// Main

    function setPhileasCursorConfiguration(data) {
        let file = "";

        if (currentClick && data.CursorPictureOnClick != "" && data.CursorPictureOnClick != undefined) {
            file = data.CursorPictureOnClick;
        } else {
            file = data.CursorPicture;
        }

        document.body.style.cursor = file == ""
        ? "default"
        : `url("${base_url}${file}.png") ${data.CursorXOffset} ${data.CursorYOffset}, ${fallbackStyle}`;
    }

    function setCurrentCursor(cursorData) {
        if (currentHidden || currentCursor != null && currentCursor.equals(cursorData)) {
            return;
        }

        currentCursor = cursorData;
        setPhileasCursorConfiguration(currentCursor);

        if (currentCursor.CursorPictureOnClick == "" || currentCursor.CursorPictureOnClick == undefined) {
            document.removeEventListener("mousedown", phileasCursorClickDownHandler);
            document.removeEventListener("mouseup", phileasCursorClickUpHandler);
        } else {
            document.addEventListener("mousedown", phileasCursorClickDownHandler);
            document.addEventListener("mouseup", phileasCursorClickUpHandler);
        }
    }

    function setDefaultCursor(params) {
        defaultCursor.setFromParams(params["cursorData"]);
    }

    function setBattleCursor(params) {
        battleCursor.setFromParams(params["cursorData"]);
    }

    function setMenuCursor(params) {
        menuCursor.setFromParams(params["cursorData"]);
    }

    function setTitleCursor(params) {
        titleCursor.setFromParams(params["cursorData"]);
    }

    function changeCursorToBasic() {
        if (currentHidden) {
            return;
        }

        let scene = SceneManager._scene;

        if (battleCursor.CursorPicture != "" && scene instanceof Scene_Battle) {
            setCurrentCursor(battleCursor);
        } else if (menuCursor.CursorPicture != "" && scene instanceof Scene_MenuBase) {
            setCurrentCursor(menuCursor);
        } else if (setTitleCursor.CursorPicture != "" && scene instanceof Scene_Title) {
            setCurrentCursor(titleCursor);
        } else {
            setCurrentCursor(defaultCursor);
        }
    }

    function hide() {
        currentHidden = true;
        document.body.style.cursor = "none";
        currentCursor = null;
    }

    function show() {
        currentHidden = false;
        changeCursorToBasic();
    }

    function switchHide() {
        if (currentHidden) {
            show();
        }
        else {
            hide();
        }
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function phileasCursorDownHandler(event) {
        if (event.keyCode == keyboardHideKeyNumber) {
            switchHide();
        }
    }

    function phileasCursorMouseDownHandler(event) {
        if (event.button == mouseHideKeyNumber) {
            switchHide();
        }
    }

    if (hideAtStartup) {
        hide();
    }
    if (keyboardHideKeyNumber == 0) {
        keyboardHideKeyNumber = getKeyByValue(Input.keyMapper, keyboardHideKey);
    }
    if (mouseHideKeyNumber == 0) {
        mouseHideKeyNumber = phileasMouseKeyMap[mouseHideKey];
    }
    if (gamepadHideKeyNumber == 0) {
        gamepadHideKeyNumber = getKeyByValue(Input.gamepadMapper, gamepadHideKey);
    }
    if (keyboardHideKeyNumber != 0) {
        document.addEventListener("keydown", phileasCursorDownHandler);
    }
    if (mouseHideKeyNumber != 0) {
        document.addEventListener("mousedown", phileasCursorMouseDownHandler);
    }

    function phileasCursorClickDownHandler(event) {
        if (event.button == 0) {
            currentClick = true;
            setPhileasCursorConfiguration(currentCursor);
        }
    }

    function phileasCursorClickUpHandler(event) {
        if (event.button == 0) {
            currentClick = false;
            setPhileasCursorConfiguration(currentCursor);
        }
    }


//--------CHANGED CORE:

    const Origin_loaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        Origin_loaded.call(this);
        preloadCursorImages();
    };

    const Origin_Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        Origin_Scene_Title_create.call(this);
        changeCursorToBasic();
    };

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        changeCursorToBasic();
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasDefaultCursor = defaultCursor;
        contents.phileasBattleCursor = battleCursor;
        contents.phileasMenuCursor = menuCursor;
        contents.phileasTitleCursor = titleCursor;
        contents.phileasCursorHidden = currentHidden;
        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        defaultCursor = new PhileasCursorData();
        defaultCursor.setFromJson(contents.phileasDefaultCursor);
        battleCursor = new PhileasCursorData();
        battleCursor.setFromJson(contents.phileasBattleCursor);
        menuCursor = new PhileasCursorData();
        menuCursor.setFromJson(contents.phileasMenuCursor);
        titleCursor = new PhileasCursorData();
        titleCursor.setFromJson(contents.phileasTitleCursor);

        changeCursorToBasic();
        if (contents.phileasCursorHidden || false) {
            hide();
        }
        else {
            show();
        }
    };

    if (gamepadHideKeyNumber != 0) {
        Origin_updateGamepadState = Input._updateGamepadState;
        Input._updateGamepadState = function(gamepad) {
            Origin_updateGamepadState.call(this, gamepad);
            const lastState = this._gamepadStates[gamepad.index] || [];
            let state = this._gamepadStates[gamepad.index];
            for (let i = 0; i < state.length; ++i) {
                if (state[i] == true && lastState[i] != true && i == gamepadHideKeyNumber) {
                    switchHide();
                }
            }
        };
    }

    if (!commonEventsPreload) {
        const Origin_CommonEventInitialize = Game_CommonEvent.prototype.initialize;
        Game_CommonEvent.prototype.initialize = function(commonEventId) {
            preloadCursorDataFromCommandList($dataCommonEvents[commonEventId].list);
            Origin_CommonEventInitialize.call(this, commonEventId);
        };
    }

    const Origin_battleStart = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        Origin_battleStart.call(this);
        changeCursorToBasic();
    };

    const Origin_menuStart = Scene_MenuBase.prototype.start;
    Scene_MenuBase.prototype.start = function() {
        Origin_menuStart.call(this);
        changeCursorToBasic();
    };

    const Origin_mapStart = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        Origin_mapStart.call(this);
        changeCursorToBasic();
    };
}());
