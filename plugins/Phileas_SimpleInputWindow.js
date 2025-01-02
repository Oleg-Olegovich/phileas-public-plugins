//=============================================================================
// Phileas_SimpleInputWindow.js
//=============================================================================
// [Update History]
// 2024.January.30 Ver1.0.0 First Release
// 2024.May.01 Ver1.0.1 Fixed keyboard input
// 2024.May.05 Ver1.0.2 Improved keyboard input
// 2024.July.06 Ver1.0.3 Fixed russian keyboard
// 2024.August.21 Ver1.1.0 Added message
// 2024.September.23 Ver1.2.0 Improved Japanese display
// 2024.October.3 Ver1.2.1 If keyboard input is disabled, you can input the letter with the Z key and delete it with the X key
// 2024.October.13 Ver1.2.2 Fixed the type of the "message" argument
// 2025.January.02 Ver1.3.0 Added additional keys

/*:
 * @target MZ
 * @plugindesc Minimalistic input of names and variables
 * @author Phileas
 *
 * @command nameInput
 * @text Name inputing
 *
 * @arg actorId
 * @text Actor
 * @type actor
 * @default 1
 *
 * @arg showFace
 * @text Show the face
 * @type boolean
 * @default true
 *
 * @arg keyMap
 * @text Main keys
 * @type select
 * @option Uppercase
 * @value uppercase
 * @option Lowercase
 * @value lowercase
 * @option Digits
 * @value digits
 * @option Punctuation marks
 * @value marks
 * @default uppercase
 * 
 * @arg additionalKeyMaps
 * @text Additional keys
 * @type select[]
 * @option Uppercase
 * @value uppercase
 * @option Lowercase
 * @value lowercase
 * @option Digits
 * @value digits
 * @option Punctuation marks
 * @value marks
 * @default []
 *
 * @arg minLength
 * @text Minimum input length
 * @type number
 * @default 1
 *
 * @arg maxLength
 * @text Maximum input length
 * @type number
 * @min 1
 * @default 10
 *
 * @arg allowCancel
 * @text Allow cancellation
 * @type boolean
 * @default false
 * @desc Canceling the input and closing the input window
 *
 * @arg allowSpace
 * @text Allow a space
 * @type boolean
 * @default false
 *
 * @arg keyboardInput
 * @text Keyboard input
 * @type boolean
 * @default true
 * @desc Allows to enter all characters from the keyboard. If keyboard input is disabled, you can input the letter with the Z key and delete it with the X key
 *
 * @arg firstIsUpper
 * @text The first letter is uppercase
 * @type boolean
 * @default false
 * @desc Replace the first letter with a capital letter
 *
 * @arg clear
 * @text Clear
 * @type boolean
 * @default false
 * @desc Erases the current value before entering
 *
 * @arg language
 * @text Main language
 * @type select
 * @option English
 * @value en
 * @option Russian
 * @value ru 
 * @option Japanese
 * @value ja
 * @default en
 * 
 * @arg message
 * @text Message
 * @type note
 * @desc If the message is empty, the message box will not be displayed
 * 
 * @arg widthPadding
 * @text Width padding
 * @number 0
 * @desc The value is added to the width of the windows
 *
 *
 * @command variableInput
 * @text Variable inputing
 *
 * @arg variableId
 * @text Variable
 * @type variable
 * @default 1
 *
 * @arg keyMap
 * @text Keys
 * @type select
 * @option Uppercase
 * @value uppercase
 * @option Lowercase
 * @value lowercase
 * @option Digits
 * @value digits
 * @default uppercase
 * 
 * @arg additionalKeyMaps
 * @text Additional keys
 * @type select[]
 * @option Uppercase
 * @value uppercase
 * @option Lowercase
 * @value lowercase
 * @option Digits
 * @value digits
 * @option Punctuation marks
 * @value marks
 * @default []
 *
 * @arg minLength
 * @text Minimum input length
 * @type number
 * @default 1
 *
 * @arg maxLength
 * @text Maximum input length
 * @type number
 * @min 1
 * @default 10
 *
 * @arg allowCancel
 * @text Allow cancellation
 * @type boolean
 * @default false
 * @desc Canceling the input and closing the input window
 *
 * @arg allowSpace
 * @text Allow a space
 * @type boolean
 * @default false
 *
 * @arg keyboardInput
 * @text Keyboard input
 * @type boolean
 * @default true
 * @desc Allows to enter all characters from the keyboard. If keyboard input is disabled, you can input the letter with the Z key and delete it with the X key
 *
 * @arg firstIsUpper
 * @text The first letter is uppercase
 * @type boolean
 * @default false
 * @desc Replace the first letter with a capital letter
 *
 * @arg clear
 * @text Clear
 * @type boolean
 * @default false
 * @desc Erases the current value before entering
 *
 * @arg language
 * @text Language
 * @type select
 * @option English
 * @value en
 * @option Russian
 * @value ru 
 * @option Japanese
 * @value ja
 * @default en
 * 
 * @arg message
 * @text Message
 * @type note
 * @desc If the message is empty, the message box will not be displayed
 * 
 * @arg widthPadding
 * @text Width padding
 * @number 0
 * @desc The value is added to the width of the windows
 * 
 *
 * @help
 * The plugin allows you to display a minimalistic input window and provides many configuration options.
 * You can enter text in the character name or in a variable.
 * You can select different languages and layouts (upper case, lower case, numbers).
 * You can adjust the input length and more.
 *
 * The plugin provides 2 commands:
 * - Name inputing
 * - Variable inputing
 * 
 * If keyboard input is disabled, you can input the letter with the Z key and delete it with the X key.
 *
 * You can always write to the author if you need other features or even plugins.
 * Patreon: https://www.patreon.com/treeverse_games
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */

/*:ru
 * @target MZ
 * @plugindesc Минималистичный ввод имён и переменных
 * @author Phileas
 *
 * @command nameInput
 * @text Ввод имени
 *
 * @arg actorId
 * @text Персонаж
 * @type actor
 * @default 1
 *
 * @arg showFace
 * @text Показывать лицо
 * @type boolean
 * @default true
 *
 * @arg keyMap
 * @text Кнопки
 * @type select
 * @option Заглавные буквы
 * @value uppercase
 * @option Строчные буквы
 * @value lowercase
 * @option Цифры
 * @value digits
 * @default uppercase
 * 
 * @arg additionalKeyMaps
 * @text Дополнительные кнопки
 * @type select[]
 * @option Uppercase
 * @value uppercase
 * @option Lowercase
 * @value lowercase
 * @option Digits
 * @value digits
 * @option Punctuation marks
 * @value marks
 * @default []
 *
 * @arg minLength
 * @text Минимальная длина ввода
 * @type number
 * @default 1
 *
 * @arg maxLength
 * @text Максимальная длина ввода
 * @type number
 * @min 1
 * @default 10
 *
 * @arg allowCancel
 * @text Разрешить отмену
 * @type boolean
 * @default false
 * @desc Отмена ввода и закрытие окна ввода
 *
 * @arg allowSpace
 * @text Разрешить пробел
 * @type boolean
 * @default false
 *
 * @arg keyboardInput
 * @text Ввод с клавиатуры
 * @type boolean
 * @default true
 * @desc Позволяет вводить все символы с клавиатуры. Если выключен ввод клавиатурой, можно выбирать буквы клавишей Z и удалять клавишей X
 *
 * @arg firstIsUpper
 * @text Первая заглавная
 * @type boolean
 * @default false
 * @desc Заменять первую букву на заглавную
 *
 * @arg clear
 * @text Очистить
 * @type boolean
 * @default false
 * @desc Удаляет текущее значение перед вводом
 *
 * @arg language
 * @text Язык
 * @type select
 * @option Английский
 * @value en
 * @option Русский
 * @value ru 
 * @option Японский
 * @value ja
 * @default en
 * 
 * @arg message
 * @text Сообщение
 * @type note
 * @desc Если сообщение пустое, то окно сообщения не будет отображаться
 * 
 * @arg widthPadding
 * @text Отступ по ширине
 * @number 0
 * @desc Значение прибавляется к ширине окон
 *
 *
 * @command variableInput
 * @text Ввод в переменную
 *
 * @arg variableId
 * @text Переменная
 * @type variable
 * @default 1
 *
 * @arg keyMap
 * @text Кнопки
 * @type select
 * @option Заглавные буквы
 * @value uppercase
 * @option Строчные буквы
 * @value lowercase
 * @option Цифры
 * @value digits
 * @default uppercase
 * 
 * @arg additionalKeyMaps
 * @text Дополнительные кнопки
 * @type select[]
 * @option Uppercase
 * @value uppercase
 * @option Lowercase
 * @value lowercase
 * @option Digits
 * @value digits
 * @option Punctuation marks
 * @value marks
 * @default []
 *
 * @arg minLength
 * @text Минимальная длина ввода
 * @type number
 * @default 1
 *
 * @arg maxLength
 * @text Максимальная длина ввода
 * @type number
 * @min 1
 * @default 10
 *
 * @arg allowCancel
 * @text Разрешить отмену
 * @type boolean
 * @default false
 * @desc Отмена ввода и закрытие окна ввода
 *
 * @arg allowSpace
 * @text Разрешить пробел
 * @type boolean
 * @default false
 *
 * @arg keyboardInput
 * @text Ввод с клавиатуры
 * @type boolean
 * @default true
 * @desc Позволяет вводить все символы с клавиатуры. Если выключен ввод клавиатурой, можно выбирать буквы клавишей Z и удалять клавишей X
 *
 * @arg firstIsUpper
 * @text Первая заглавная
 * @type boolean
 * @default false
 * @desc Заменять первую букву на заглавную
 *
 * @arg clear
 * @text Очистить
 * @type boolean
 * @default false
 * @desc Удаляет текущее значение перед вводом
 *
 * @arg language
 * @text Язык
 * @type select
 * @option Английский
 * @value en
 * @option Русский
 * @value ru 
 * @option Японский
 * @value ja
 * @default en
 * 
 * @arg message
 * @text Сообщение
 * @type note
 * @desc Если сообщение пустое, то окно сообщения не будет отображаться
 * 
 * @arg widthPadding
 * @text Отступ по ширине
 * @number 0
 * @desc Значение прибавляется к ширине окон
 * 
 *
 * @help
 * Плагин позволяет отображать минималистичное окно ввода и предоставляет множество параметров конфигурации.
 * Вы можете вводить текст в имя персонажа или в переменную.
 * Можно выбирать разные языки и раскладки (верхний регистр, нижний регистр, цифры).
 * Можете регулировать длину ввода и другое.
 *
 * Плагин предоставляет 2 команды:
 * - Ввод имени
 * - Ввод в переменную
 * 
 * Если выключен ввод клавиатурой, можно выбирать буквы клавишей Z и удалять клавишей X.
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
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */


const SPACE_CHAR = " ";
const BACKSPACE_CHAR = "←";
const CONFIRM_CHAR = "✓";
const KEYBOARD_SWITCH_CHAR = "⇆";

const PHILEAS_KEYBOARD_ENGLISH_UPPERCASE =
    ["A", "B", "C", "D", "E",
     "F", "G", "H", "I", "J",
     "K", "L", "M", "N", "O",
     "P", "Q", "R", "S", "T",
     "U", "V", "W", "X", "Y",
     "Z", SPACE_CHAR, BACKSPACE_CHAR,
     KEYBOARD_SWITCH_CHAR, CONFIRM_CHAR];

const PHILEAS_KEYBOARD_ENGLISH_LOWERCASE =
    ["a", "b", "c", "d", "e",
     "f", "g", "h", "i", "j",
     "k", "l", "m", "n", "o",
     "p", "q", "r", "s", "t",
     "u", "v", "w", "x", "y",
     "z", SPACE_CHAR,BACKSPACE_CHAR,
     KEYBOARD_SWITCH_CHAR, CONFIRM_CHAR];

const PHILEAS_KEYBOARD_RUSSIAN_UPPERCASE =
    ["А", "Б", "В", "Г", "Д",
     "Е", "Ж", "З", "И", "Й",
     "К", "Л", "М", "Н", "О",
     "П", "Р", "С", "Т", "У",
     "Ф","Х", "Ц", "Ч", "Ш",
     "Щ", "Ъ", "Ы", "Ь", "Э",
     "Ю", "Я", SPACE_CHAR, "Ё",
     BACKSPACE_CHAR, KEYBOARD_SWITCH_CHAR, CONFIRM_CHAR];

const PHILEAS_KEYBOARD_RUSSIAN_LOWERCASE =
    ["а", "б", "в", "г", "д",
     "е", "ж", "з", "и", "й",
     "к", "л", "м", "н", "о",
     "п", "р", "с", "т", "у",
     "ф", "х", "ц", "ч", "ш",
     "щ", "ъ", "ы", "ь", "э",
     "ю", "я", SPACE_CHAR, "ё",
     BACKSPACE_CHAR, KEYBOARD_SWITCH_CHAR, CONFIRM_CHAR];

const PHILEAS_KEYBOARD_JAPANESE =
    ["あ", "い", "う", "え", "お", "が", "ぎ", "ぐ", "げ", "ご",
        "か", "き", "く", "け", "こ", "ざ", "じ", "ず", "ぜ", "ぞ",
        "さ", "し", "す", "せ", "そ", "だ", "ぢ", "づ", "で", "ど",
        "た", "ち", "つ", "て", "と", "ば", "び", "ぶ", "べ", "ぼ",
        "な", "に", "ぬ", "ね", "の", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
        "は", "ひ", "ふ", "へ", "ほ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
        "ま", "み", "む", "め", "も", "っ", "ゃ", "ゅ", "ょ", "ゎ",
        "や", "ゆ", "よ", "わ", "ん", "ー", "～", "・", "＝", "☆",
        "ら", "り", "る", "れ", "ろ", "ゔ", "を",
        SPACE_CHAR, BACKSPACE_CHAR, KEYBOARD_SWITCH_CHAR, CONFIRM_CHAR];

const PHILEAS_KEYBOARD_DIGITS =
    ["0", "1", "2", "3",
        "4", "5", "6", "7",
        "8", "9", SPACE_CHAR,
        BACKSPACE_CHAR, KEYBOARD_SWITCH_CHAR, CONFIRM_CHAR];

const PHILEAS_KEYBOARD_MARKS =
    [".", ",", "?", "!", ":", ";", "-", "—", "_", "’", "~", "`", "'",
        "\"", "«", "»", "(", ")", "[", "]", "{", "}", "/", "\\", "|",
        "@", "#", "№", "%", "^", "&", "*", "+", "=",
        SPACE_CHAR, BACKSPACE_CHAR, KEYBOARD_SWITCH_CHAR, CONFIRM_CHAR];

const PHILEAS_FACE_PADDING = 20;

const PHILEAD_EN_RU_MAP = {
    "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г", "i": "ш", "o": "щ", "p": "з", 
    "[": "х", "]": "ъ", "a": "ф", "s": "ы", "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", 
    "l": "д", ";": "ж", "\"": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и", "n": "т", "m": "ь", 
    ",": "б", ".": "ю", "`": "ё", "~": "ё", "{": "х", "}": "ъ", ":": "ж", "\'": "э", "<": "б", ">": "ю"
};

(function() {

    //--------DATA:
    PluginManager.registerCommand("Phileas_SimpleInputWindow", "nameInput", nameInput);
    PluginManager.registerCommand("Phileas_SimpleInputWindow", "variableInput", variableInput);

    //--------MY CODE:

    function handleInputCommand(actorId, showFace, variableId, params) {
        const language = params["language"];
        const keyMap = params["keyMap"];
        const additionalKeyMaps = JSON.parse(params["additionalKeyMaps"]);
        const minLength = Number(params["minLength"]);
        const maxLength = Number(params["maxLength"]);
        const allowCancel = params["allowCancel"] == "true";
        const allowSpace = params["allowSpace"] == "true";
        const keyboardInput = params["keyboardInput"] == "true";
        const firstIsUpper = params["firstIsUpper"] == "true";
        const clear = params["clear"] == "true";
        const message = params["message"] || "";
        const widthPadding = Number(params["widthPadding"]) || 0;

        SceneManager.push(Scene_PhileasInput);
        SceneManager.prepareNextScene(actorId, showFace, variableId, language,
            keyMap, additionalKeyMaps, minLength, maxLength, allowCancel, allowSpace,
            keyboardInput, firstIsUpper, clear, message, widthPadding);
    }

    function nameInput(params) {
        const actorId = Number(params["actorId"]);
        const showFace = params["showFace"] == "true";
        handleInputCommand(actorId, showFace, undefined, params);
    }

    function variableInput(params) {
        const variableId = Number(params["variableId"]);
        handleInputCommand(undefined, false, variableId, params);
    }

}());


//-----------------------------------------------------------------------------
// Scene_PhileasInput

function Scene_PhileasInput() {
    this.initialize(...arguments);
}

Scene_PhileasInput.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PhileasInput.prototype.constructor = Scene_PhileasInput;

Scene_PhileasInput.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_PhileasInput.prototype.prepare = function(actorId, showFace,
    variableId, language, keyMap, additionalKeyMaps, minLength, maxLength, allowCancel,
    allowSpace, keyboardInput, firstIsUpper, clear, message, widthPadding) {

    this._actorId = actorId;
    this._showFace = showFace;
    this._variableId = variableId;
    this._language = language;
    this._minLength = minLength;
    this._maxLength = maxLength;
    this._allowCancel = allowCancel;
    this._allowSpace = allowSpace;
    this._keyboardInput = keyboardInput;
    this._firstIsUpper = firstIsUpper;
    this._clear = clear;
    this._message = message == "" ? "" : JSON.parse(message);
    this._widthPadding = widthPadding;

    this._keyMaps = [keyMap];
    this._keyMaps = this._keyMaps.concat(additionalKeyMaps);
    this._keyMaps = this._keyMaps.filter((item, index) => this._keyMaps.indexOf(item) === index);
    this._keyMapId = 0;
};

Scene_PhileasInput.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = this._actorId == undefined
        ? undefined
        : $gameActors.actor(this._actorId);
    this.createWindows();
};

Scene_PhileasInput.prototype.createWindows = function() {
    this._windows = new Array(this._keyMaps.length);

    for (let i = 0; i < this._keyMaps.length; ++i) {
        this._windows[i] = {};

        const inputRowsNumber = this.getInputRowsNumber(this._keyMaps[i]);
        this.createEditWindow(this._windows[i], inputRowsNumber);
        this.createInputWindow(this._windows[i], this._keyMaps[i], inputRowsNumber);
        this.createMessageWindow(this._windows[i]);

        this.addWindow(this._windows[i].editWindow);
        this.addWindow(this._windows[i].inputWindow);
        this.addWindow(this._windows[i].messageWindow);

        this.hideWindows(i);
    }

    this.showWindows(0);
};

Scene_PhileasInput.prototype.getInputRowsNumber = function(keyMap) {
    const table = Window_PhileasInput.table(this._language, keyMap);
    const columnsNumber = Math.ceil(Math.sqrt(table.length));
    return Math.ceil(table.length / columnsNumber);
};

Scene_PhileasInput.prototype.getMinWindowWidth = function(calcWindow) {
    let width = 0;

    switch (this._language) {
        case 'ru':
            width = 6 * (calcWindow.textWidth("Ж") + 30);
            break;
        case 'ja':
            width = 10 * (calcWindow.textWidth("\uff21") + 30);
            break;
        default:
            width = 6 * (calcWindow.textWidth("A") + 30);
            break;
    }

    return width + 20;
}

Scene_PhileasInput.prototype.createEditWindow = function(windows, inputRowsNumber) {
    const rect = this.editWindowRect(inputRowsNumber);
    windows.editWindow = new Window_PhileasEdit(rect, this._showFace, this._language);
    windows.editWindow.setup(this._actor, this._variableId, this._maxLength, this._clear);
};

Scene_PhileasInput.prototype.editWindowRect = function(inputRowsNumber) {
    const calcWindow = new Window_PhileasEdit(new Rectangle(0, 0, 0, 0), this._language);

    const padding = $gameSystem.windowPadding();
    let ww = (this._maxLength + 1) * calcWindow.charWidth() + 2 * padding + this._widthPadding;
    ww = Math.max(ww, this.getMinWindowWidth(calcWindow));
    if (this._showFace) {
        ww += ImageManager.faceWidth + PHILEAS_FACE_PADDING;
    }

    const wh = ImageManager.faceHeight + padding * 2;
    const wx = (Graphics.boxWidth - ww) / 2;
    const inputWindowHeight = this.calcWindowHeight(inputRowsNumber, true);
    const msgHeight = this._message == "" ? 0 : this.calcWindowHeight(2, false) + 8;
    const wy = (Graphics.boxHeight - (wh + inputWindowHeight + 8) - msgHeight) / 2;

    return new Rectangle(wx, wy, ww, wh);
};

Scene_PhileasInput.prototype.createInputWindow = function(windows, keymap, inputRowsNumber) {
    const rect = this.inputWindowRect(windows.editWindow, inputRowsNumber);
    windows.inputWindow
        = new Window_PhileasInput(this, rect, this._language, keymap,
            this._keyboardInput, this._allowCancel, this._allowSpace, this._minLength);
    windows.inputWindow.setEditWindow(windows.editWindow);
    windows.inputWindow.setHandler("ok", this.onInputOk.bind(this));
    windows.inputWindow.setHandler("cancel", this.onInputCancel.bind(this));
};

Scene_PhileasInput.prototype.inputWindowRect = function(editWindow, inputRowsNumber) {
    const wx = editWindow.x;
    const wy = editWindow.y + editWindow.height + 8;
    const ww = editWindow.width;
    const wh = this.calcWindowHeight(inputRowsNumber, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_PhileasInput.prototype.createMessageWindow = function(windows) {
    if (this._message == "") {
        return;
    }

    const rect = this.messageWindowRect(windows.inputWindow);
    windows.messageWindow = new Window_PhileasMessage(rect, this._message);
};

Scene_PhileasInput.prototype.messageWindowRect = function(inputWindow) {
    const wx = inputWindow.x;
    const wy = inputWindow.y + inputWindow.height + 8;
    const ww = inputWindow.width;
    const wh = this.calcWindowHeight(2, false) + 8;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_PhileasInput.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._windows[0].editWindow.refresh();
};

Scene_PhileasInput.prototype.hideWindows = function(id) {
    this._windows[id].inputWindow.phileasExit();
    this._windows[id].editWindow.hide();
    this._windows[id].inputWindow.hide();
    this._windows[id].messageWindow.hide();
};

Scene_PhileasInput.prototype.showWindows = function(id) {
    this._windows[id].editWindow.show();
    this._windows[id].inputWindow.show();
    this._windows[id].inputWindow.activate();
    this._windows[id].messageWindow.show();
};

Scene_PhileasInput.prototype.switchWindows = function() {
    if (this._keyMaps.length == 1) {
        SoundManager.playBuzzer();
        return;
    }

    const oldId = this._keyMapId;
    this._keyMapId = (this._keyMapId + 1) % this._keyMaps.length;

    this._windows[this._keyMapId].editWindow._name = this._windows[oldId].editWindow._name;
    this._windows[this._keyMapId].editWindow._index = this._windows[oldId].editWindow._index;
    this._windows[this._keyMapId].editWindow.refresh();

    this.hideWindows(oldId);
    this.showWindows(this._keyMapId);
};

Scene_PhileasInput.prototype.onInputOk = function() {
    let value = this._windows[this._keyMapId].editWindow.name();
    if (this._firstIsUpper) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (this._actor == undefined) {
        if (!isNaN(Number(value))) {
            value = Number(value);
        }

        $gameVariables.setValue(this._variableId, value);
    } else {
        this._actor.setName(value);
    }

    this.processExit();
};

Scene_PhileasInput.prototype.onInputCancel = function() {
    this.processExit();
};

Scene_PhileasInput.prototype.processExit = function() {
    this._windows[this._keyMapId].inputWindow.phileasExit();
    this.popScene();
}

//-----------------------------------------------------------------------------
// Window_PhileasInput

function Window_PhileasInput() {
    this.initialize(...arguments);
}

Window_PhileasInput.prototype = Object.create(Window_Selectable.prototype);
Window_PhileasInput.prototype.constructor = Window_PhileasInput;

Window_PhileasInput.prototype.initialize
    = function(scene, rect, language, keyMap, keyboardInput,
        allowCancel, allowSpace, minLength) {

        this._scene = scene;

        this.upArrowVisible = false;
        this._keyboardInput = keyboardInput;
        this._allowCancel = allowCancel;
        this._allowSpace = allowSpace;
        this._minLength = minLength;

        this._editWindow = null;
        this._index = 0;
        this._language = language;
        this._table = Window_PhileasInput.table(language, keyMap);
        this._columnsNumber = Math.ceil(Math.sqrt(this._table.length));
        this._rowsNumber = Math.ceil(this._table.length / this._columnsNumber);

        rect.height = this.fittingHeight(this._rowsNumber);

        Window_Selectable.prototype.initialize.call(this, rect);
    };

Window_PhileasInput.prototype.activate = function() {
    Window_Selectable.prototype.activate.call(this);
    this._keyDownHandlerBind = this.keyDownHandler.bind(this);
    document.addEventListener("keydown", this._keyDownHandlerBind);

    if (this._keyboardInput) {
        this.saveX = Input.keyMapper[88];
        this.saveZ = Input.keyMapper[90];
        Input.keyMapper[88] = undefined;
        Input.keyMapper[90] = undefined;
    }
};

Window_PhileasInput.prototype.phileasExit = function() {
    document.removeEventListener("keydown", this._keyDownHandlerBind);
    this._keyDownHandlerBind = undefined;

    if (this._keyboardInput) {
        Input.keyMapper[88] = this.saveX;
        Input.keyMapper[90] = this.saveZ;
    }

    this.deactivate();
};

Window_PhileasInput.prototype.setEditWindow = function(editWindow) {
    this._editWindow = editWindow;
    this.refresh();
    this.updateCursor();
};

Window_PhileasInput.table = function(language, keyMap) {
    if (keyMap == "uppercase") {
        if (language == "en") {
            return PHILEAS_KEYBOARD_ENGLISH_UPPERCASE;
        } else if (language == "ja") {
            return PHILEAS_KEYBOARD_JAPANESE;
        } else {
            return PHILEAS_KEYBOARD_RUSSIAN_UPPERCASE;
        }
    } else if (keyMap == "lowercase") {
        if (language == "en") {
            return PHILEAS_KEYBOARD_ENGLISH_LOWERCASE;
        } else if (language == "ja") {
            return PHILEAS_KEYBOARD_JAPANESE;
        } else {
            return PHILEAS_KEYBOARD_RUSSIAN_LOWERCASE;
        }
    } else if (keyMap == "digits") {
        return PHILEAS_KEYBOARD_DIGITS;
    } else {
        return PHILEAS_KEYBOARD_MARKS;
    }
};

Window_PhileasInput.prototype.maxItems = function() {
    return this._table.length;
};

Window_PhileasInput.prototype.maxVisibleItems = function() {
    return this.maxItems();
};

Window_PhileasInput.prototype.itemWidth = function() {
    return Math.floor(this.innerWidth / this._columnsNumber);
};

Window_PhileasInput.prototype.character = function() {
    if (!this._allowSpace && this.isSpace()) {
        this.playBuzzerSound();
        return;
    }

    return this._index + 3 < this._table.length ? this._table[this._index] : "";
};

Window_PhileasInput.prototype.itemRect = function(index) {
    const row = Math.floor(index / this._columnsNumber);
    const column = index % this._columnsNumber;

    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();

    const x = column * itemWidth + colSpacing / 2;
    const y = row * itemHeight + rowSpacing / 2;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;

    return new Rectangle(x, y, width, height);
};

Window_PhileasInput.prototype.drawItem = function(index) {
    const character = this._table[index];
    const rect = this.itemLineRect(index);
    this.drawText(character, rect.x, rect.y, rect.width, "center");
};

Window_PhileasInput.prototype.updateCursor = function() {
    const rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_PhileasInput.prototype.isCursorMovable = function() {
    return this.active;
};

Window_PhileasInput.prototype.cursorDown = function(wrap) {
    if (this._index < this._table.length - this._columnsNumber || wrap) {
        this._index = (this._index + this._columnsNumber) % this._table.length;
    }
};

Window_PhileasInput.prototype.cursorUp = function(wrap) {
    if (this._index >= this._columnsNumber || wrap) {
        this._index
            = (this._index + this._table.length - this._columnsNumber)
            % this._table.length;
    }
};

Window_PhileasInput.prototype.cursorRight = function(wrap) {
    if (this._index % this._columnsNumber < this._rowsNumber) {
        this._index++;
    } else if (wrap) {
        this._index -= this._columnsNumber - 1;
    }
};

Window_PhileasInput.prototype.cursorLeft = function(wrap) {
    if (this._index % this._columnsNumber > 0) {
        this._index--;
    } else if (wrap) {
        this._index += this._columnsNumber - 1;
    }
};

Window_PhileasInput.prototype.processCursorMove = function() {
    Window_Selectable.prototype.processCursorMove.call(this);
    this.updateCursor();
};

Window_PhileasInput.prototype.isOkPressed = function(event) {
    if (this._keyboardInput) {
        return event.key == "Enter";
    }

    return Input.isPressed("ok");
}

Window_PhileasInput.prototype.isDeletePressed = function(event) {
    if (this._keyboardInput) {
        return event.key == "Backspace";
    }

    return Input.isPressed("cancel");
}

Window_PhileasInput.prototype.keyDownHandler = function(event) {
    if (!this.isOpen() || !this.active) {
        return;
    }

    if (this.isOkPressed(event)) {
        this.processOk();
        return;
    }

    if (event.key == "Shift") {
        this.processJump();
        return;
    }

    if (event.key == "Tab") {
        this.processSwitch();
        return;
    }

    if (this.isDeletePressed(event)) {
        this.processBack();
        return;
    }

    if (!this._keyboardInput) {
        return;
    }

    if (event.key == " ") {
        if (!this._allowSpace) {
            this.playBuzzerSound();
        } else {
            if (this._editWindow.add(" ")) {
                this.playOkSound();
            } else {
                this.playBuzzerSound();
            }
        }
        return;
    }

    let letterCode = event.keyCode - 65;

    if (this._language == "ru") {
        const key = String.fromCharCode(event.keyCode).toLocaleLowerCase();
        const rukey = PHILEAD_EN_RU_MAP[key] || PHILEAD_EN_RU_MAP[event.key] || event.key.toLocaleLowerCase();

        letterCode = rukey.charCodeAt(0) - this._table[0].toLowerCase().charCodeAt(0);
    }

    if (letterCode < 0 || letterCode >= this._table.length) {
        return;
    }

    const letter = this._table[letterCode];

    if (this._editWindow.add(letter)) {
        this.playOkSound();
    } else {
        this.playBuzzerSound();
    }
};

Window_PhileasInput.prototype.processHandling = function() {
    if (this.isOpen() && this.active) {
        if (this.isCancelEnabled() && Input.isRepeated("cancel")) {
            this.processCancel();
        }
    }
};

Window_PhileasInput.prototype.isCancelEnabled = function() {
    return this._allowCancel;
};

Window_PhileasInput.prototype.processJump = function() {
    if (this._index !== this) {
        this._index = this._table.length - 1;
        this.playCursorSound();
    }
};

Window_PhileasInput.prototype.processBack = function() {
    if (this._editWindow.back()) {
        SoundManager.playCancel();
    }
};

Window_PhileasInput.prototype.processSwitch = function() {
    this._scene.switchWindows();
};

Window_PhileasInput.prototype.isOk = function() {
    return this._index + 1 === this._table.length;
};

Window_PhileasInput.prototype.isSwitch = function() {
    return this._index + 2 === this._table.length;
};

Window_PhileasInput.prototype.isBackspace = function() {
    return this._index + 3 === this._table.length;
};

Window_PhileasInput.prototype.isSpace = function() {
    return this._index + 4 == this._table.length;
}

Window_PhileasInput.prototype.processOk = function() {
    if (this.character()) {
        this.onNameAdd();
    } else if (this.isOk()) {
        this.onNameOk();
    } else if (this.isBackspace()) {
        this.processBack();
    } else if (this.isSwitch()) {
        this.processSwitch();
    }
};

Window_PhileasInput.prototype.onNameAdd = function() {
    if (this._editWindow.add(this.character())) {
        this.playOkSound();
    } else {
        this.playBuzzerSound();
    }
};

Window_PhileasInput.prototype.onNameOk = function() {
    const word = this._editWindow.name();
    if (word.length < this._minLength) {
        this.playBuzzerSound();
        return;
    }

    if (word === "") {
        if (this._editWindow.restoreDefault()) {
            this.playOkSound();
        } else {
            this.playBuzzerSound();
        }
    } else {
        this.playOkSound();
        this.callOkHandler();
    }
};

Window_PhileasInput.prototype.scrollTo = function() {

}

Window_PhileasInput.prototype.updateArrows = function() {

};

//-----------------------------------------------------------------------------
// Window_PhileasEdit

function Window_PhileasEdit() {
    this.initialize(...arguments);
}

Window_PhileasEdit.prototype = Object.create(Window_NameEdit.prototype);
Window_PhileasEdit.prototype.constructor = Window_PhileasEdit;

Window_PhileasEdit.prototype.initialize = function(rect, showFace, language) {
    Window_NameEdit.prototype.initialize.call(this, rect);
    this._rectWidth = rect.width;
    this._showFace = showFace;
    this._left = 0;
    this.setCharWidth(language);
};

Window_PhileasEdit.prototype.setup = function(actor, variableId, maxLength, clear) {
    this._actor = actor;
    this._maxLength = maxLength;
    if (clear === true) {
        this._name = "";
    } else if (actor == undefined) {
        this._name = String($gameVariables.value(variableId));
    } else {
        this._name = actor.name().slice(0, this._maxLength);
    }

    this._index = this._name.length;
    this._defaultName = this._name;

    const wordWidth = (this._maxLength + 1) * this.charWidth();
    const wordCenter = this._rectWidth / 2;
    this._left = Math.min(wordCenter - wordWidth / 2, this.innerWidth - wordWidth);
    if (this._showFace) {
        this._left = Math.max(this._left, this.faceWidth() + PHILEAS_FACE_PADDING);
        ImageManager.loadFace(actor.faceName());
    }
};

Window_PhileasEdit.prototype.drawActorFace = function(
    actor, x, y, width, height) {

    if (this._showFace == false) {
        return;
    }

    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

Window_PhileasEdit.prototype.left = function() {
    return this._left;
};

Window_PhileasEdit.prototype.setCharWidth = function(language) {
    switch (language) {
        case 'ru':
            this._charWidth = this.textWidth("Ж");
            break;
        case 'ja':
            this._charWidth = this.textWidth("\uff21");
            break;
        default:
            this._charWidth = this.textWidth("A");
            break;
    }
}

Window_PhileasEdit.prototype.charWidth = function() {
    return this._charWidth;
};


//-----------------------------------------------------------------------------
// Window_PhileasMessage

function Window_PhileasMessage() {
    this.initialize(...arguments);
}

Window_PhileasMessage.prototype = Object.create(Window_Base.prototype);
Window_PhileasMessage.prototype.constructor = Window_PhileasMessage;

Window_PhileasMessage.prototype.initialize = function(rect, message) {
    Window_Base.prototype.initialize.call(this, rect);
    this._message = message;
    this._background = $gameMessage.background();
    this.showMessage();
};

Window_PhileasMessage.prototype.showMessage = function() {
    const textState = this.createTextState(this._message, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.open();
    this.updateMessage();
};

Window_PhileasMessage.prototype.newLineX = function(textState) {
    const margin = 4;
    return textState.rtl ? this.innerWidth - margin : margin;
};

Window_PhileasMessage.prototype.newPage = function(textState) {
    this.contents.clear();
    this.resetFontSettings();
    textState.x = textState.startX;
    textState.y = 0;
    textState.height = this.calcTextHeight(textState);
};

Window_PhileasMessage.prototype.updateMessage = function() {
    const textState = this._textState;
    if (!textState) {
        return;
    }

    while (!this.isEndOfText(textState)) {
        this.processCharacter(textState);
    }

    this.flushTextState(textState);
};

Window_PhileasMessage.prototype.isEndOfText = function(textState) {
    return textState.index >= textState.text.length;
};
