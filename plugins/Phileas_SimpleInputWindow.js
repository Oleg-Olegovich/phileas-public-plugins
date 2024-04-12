//=============================================================================
// Phileas_SimpleInputWindow.js
//=============================================================================
// [Update History]
// 2024.January.30 Ver1.0.0 First Release

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
 * @desc Allows to enter all characters from the keyboard
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
 * @desc Allows to enter all characters from the keyboard
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
 * @desc Позволяет вводить все символы с клавиатуры
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
 * @desc Позволяет вводить все символы с клавиатуры
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

    const PHILEAS_KEYBOARD_ENGLISH_UPPERCASE =
        [ "A","B","C","D","E",
          "F","G","H","I","J",
          "K","L","M","N","O",
          "P","Q","R","S","T",
          "U","V","W","X","Y",
          "Z", SPACE_CHAR, BACKSPACE_CHAR, CONFIRM_CHAR ];
          
    const PHILEAS_KEYBOARD_ENGLISH_LOWERCASE =
        [ "a","b","c","d","e",
          "f","g","h","i","j",
          "k","l","m","n","o",
          "p","q","r","s","t",
          "u","v","w","x","y",
          "z", SPACE_CHAR, BACKSPACE_CHAR, CONFIRM_CHAR ];
          
    const PHILEAS_KEYBOARD_RUSSIAN_UPPERCASE =
        [ "А","Б","В","Г","Д","Е",
          "Ё","Ж","З","И","Й","К",
          "Л","М","Н","О","П","Р",
          "С","Т","У","Ф","Х","Ц",
          "Ч","Ш","Щ","Ъ","Ы","Ь",
          "Э","Ю","Я", SPACE_CHAR, BACKSPACE_CHAR, CONFIRM_CHAR ];
          
    const PHILEAS_KEYBOARD_RUSSIAN_LOWERCASE =
        [ "а","б","в","г","д","е",
          "ё","ж","з","и","й","к",
          "л","м","н","о","п","р",
          "с","т","у","ф","х","ц",
          "ч","ш","щ","ъ","ы","ь",
          "э","ю","я", SPACE_CHAR, BACKSPACE_CHAR, CONFIRM_CHAR ];
          
    const PHILEAS_KEYBOARD_JAPANESE =
        [ "あ","い","う","え","お",  "が","ぎ","ぐ","げ","ご",
          "か","き","く","け","こ",  "ざ","じ","ず","ぜ","ぞ",
          "さ","し","す","せ","そ",  "だ","ぢ","づ","で","ど",
          "た","ち","つ","て","と",  "ば","び","ぶ","べ","ぼ",
          "な","に","ぬ","ね","の",  "ぱ","ぴ","ぷ","ぺ","ぽ",
          "は","ひ","ふ","へ","ほ",  "ぁ","ぃ","ぅ","ぇ","ぉ",
          "ま","み","む","め","も",  "っ","ゃ","ゅ","ょ","ゎ",
          "や","ゆ","よ","わ","ん",  "ー","～","・","＝","☆",
          "ら","り","る","れ","ろ",  "ゔ","を", SPACE_CHAR, BACKSPACE_CHAR, CONFIRM_CHAR ];
          
    const PHILEAS_KEYBOARD_DIGITS =
        [ "0","1","2","3",
          "4","5","6","7",
          "8","9", SPACE_CHAR, BACKSPACE_CHAR, CONFIRM_CHAR ];
          
    const PHILEAS_MIN_WINDOW_WIDTH = 300;
    
    const PHILEAS_FACE_PADDING = 20;

(function() {

//--------DATA:
    PluginManager.registerCommand("Phileas_SimpleInputWindow", "nameInput", nameInput);
    PluginManager.registerCommand("Phileas_SimpleInputWindow", "variableInput", variableInput);

//--------MY CODE:

    function handleInputCommand(actorId, showFace, variableId, params) {
        const language = params["language"];
        const keyMap = params["keyMap"];
        const minLength = Number(params["minLength"]);
        const maxLength = Number(params["maxLength"]);
        const allowCancel = params["allowCancel"] == "true";
        const allowSpace = params["allowSpace"] == "true";
        const keyboardInput = params["keyboardInput"] == "true";
        const firstIsUpper = params["firstIsUpper"] == "true";
        const clear = params["clear"] == "true";
        
        SceneManager.push(Scene_PhileasInput);
        SceneManager.prepareNextScene(actorId, showFace, variableId, language, 
            keyMap, minLength, maxLength, allowCancel, 
            allowSpace, keyboardInput, firstIsUpper, clear);
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
    variableId, language, keyMap, minLength, maxLength, allowCancel, 
    allowSpace, keyboardInput, firstIsUpper, clear) {
        
    this._actorId = actorId;
    this._showFace = showFace;
    this._variableId = variableId;
    this._language = language;
    this._keyMap = keyMap;
    this._minLength = minLength;
    this._maxLength = maxLength;
    this._allowCancel = allowCancel;
    this._allowSpace = allowSpace;
    this._keyboardInput = keyboardInput;
    this._firstIsUpper = firstIsUpper;
    this._clear = clear;
    
    const table = Window_PhileasInput.table(language, keyMap);
    const columnsNumber = Math.ceil(Math.sqrt(table.length));
    this._inputRowsNumber = Math.ceil(table.length / columnsNumber);
};

Scene_PhileasInput.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = this._actorId == undefined 
        ? undefined 
        : $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createInputWindow();
};

Scene_PhileasInput.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._editWindow.refresh();
};

Scene_PhileasInput.prototype.editWindowRect = function() {
    const calcWindow = new Window_PhileasEdit(new Rectangle(0, 0, 0, 0));
    
    const padding = $gameSystem.windowPadding();
    let ww = (this._maxLength + 1) * calcWindow.charWidth() + 2 * padding;
    ww = Math.max(ww, PHILEAS_MIN_WINDOW_WIDTH);
    if (this._showFace) {
        ww += ImageManager.faceWidth + PHILEAS_FACE_PADDING;
    }
    
    const wh = ImageManager.faceHeight + padding * 2;
    const wx = (Graphics.boxWidth - ww) / 2;
    const inputWindowHeight = this.calcWindowHeight(this._inputRowsNumber, true);
    const wy = (Graphics.boxHeight - (wh + inputWindowHeight + 8)) / 2;
    
    return new Rectangle(wx, wy, ww, wh);
};

Scene_PhileasInput.prototype.createEditWindow = function() {
    const rect = this.editWindowRect();
    this._editWindow = new Window_PhileasEdit(rect, this._showFace);
    this._editWindow.setup(this._actor, this._variableId, this._maxLength, this._clear);
    this.addWindow(this._editWindow);
};

Scene_PhileasInput.prototype.inputWindowRect = function() {
    const wx = this._editWindow.x;
    const wy = this._editWindow.y + this._editWindow.height + 8;
    const ww = this._editWindow.width;
    const wh = this.calcWindowHeight(this._inputRowsNumber, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_PhileasInput.prototype.createInputWindow = function() {
    const rect = this.inputWindowRect();
    this._inputWindow 
        = new Window_PhileasInput(rect, this._language, this._keyMap, 
        this._keyboardInput, this._allowCancel, this._allowSpace, this._minLength);
    this._inputWindow.setEditWindow(this._editWindow);
    this._inputWindow.setHandler("ok", this.onInputOk.bind(this));
    this._inputWindow.setHandler("cancel", this.onInputCancel.bind(this));
    this.addWindow(this._inputWindow);
};

Scene_PhileasInput.prototype.onInputOk = function() {
    let value = this._editWindow.name();
    if (this._firstIsUpper) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    
    if (this._actor == undefined) {
        if (this._keyMap == "digits") {
            value = Number(value);
        }
        
        $gameVariables.setValue(this._variableId, value);
    } else {
        this._actor.setName(value);
    }
    
    this._inputWindow.deactivate();
    this.popScene();
};

Scene_PhileasInput.prototype.onInputCancel = function() {
    this._inputWindow.deactivate();
    this.popScene();
};

//-----------------------------------------------------------------------------
// Window_PhileasInput

function Window_PhileasInput() {
    this.initialize(...arguments);
}

Window_PhileasInput.prototype = Object.create(Window_Selectable.prototype);
Window_PhileasInput.prototype.constructor = Window_PhileasInput;

Window_PhileasInput.prototype.initialize 
    = function(rect, language, keyMap, keyboardInput, 
    allowCancel, allowSpace, minLength) {

    this.upArrowVisible = false;
    this._keyboardInput = keyboardInput;
    this._allowCancel = allowCancel;
    this._allowSpace = allowSpace;
    this._minLength = minLength;
    
    this._editWindow = null;
    this._index = 0;
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
};

Window_PhileasInput.prototype.deactivate = function() {
    Window_Selectable.prototype.deactivate.call(this);
    document.removeEventListener("keydown", this._keyDownHandlerBind);
    this._keyDownHandlerBind = undefined;
};

Window_PhileasInput.prototype.setEditWindow = function(editWindow) {
    this._editWindow = editWindow;
    this.refresh();
    this.updateCursor();
    this.activate();
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
    } else {
        return PHILEAS_KEYBOARD_DIGITS;
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
    if (!this._allowSpace && this._index + 3 == this._table.length) {
        this.playBuzzerSound();
        return;
    }
    
    return this._index + 2 < this._table.length ? this._table[this._index] : "";
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

Window_PhileasInput.prototype.keyDownHandler = function(event) {
    if (!this.isOpen() || !this.active) {
        return;
    }
    
    if (event.key == "Enter") {
        this.processOk();
        return;
    }
    
    if (event.key == "Shift") {
        this.processJump();
        return;
    }
    
    if (!this._keyboardInput) {
        return;
    }
    
    if (event.key == "Backspace") {
        this.processBack();
        return;
    }

    const id = this._table.indexOf(event.key);
    if (id == -1) {
        return;
    }
    
    if (!this._allowSpace && id + 3 == this._table.length) {
        this.playBuzzerSound();
        return;
    }
    
    if (this._editWindow.add(event.key)) {
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

Window_PhileasInput.prototype.isOk = function() {
    return this._index + 1 === this._table.length;
};

Window_PhileasInput.prototype.isBackspace = function() {
    return this._index + 2 === this._table.length;
};

Window_PhileasInput.prototype.processOk = function() {
    this.playOkSound();
    if (this.character()) {
        this.onNameAdd();
    } else if (this.isOk()) {
        this.onNameOk();
    } else if (this.isBackspace()) {
        this.processBack();
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

Window_Scrollable.prototype.updateArrows = function() {
    
};

//-----------------------------------------------------------------------------
// Window_PhileasEdit

function Window_PhileasEdit() {
    this.initialize(...arguments);
}

Window_PhileasEdit.prototype = Object.create(Window_NameEdit.prototype);
Window_PhileasEdit.prototype.constructor = Window_PhileasEdit;

Window_PhileasEdit.prototype.initialize = function(rect, showFace) {
    Window_NameEdit.prototype.initialize.call(this, rect);
    this._rectWidth = rect.width;
    this._showFace = showFace;
    this._left = 0;
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
