//=============================================================================
// Phileas_QuickSave.js
//=============================================================================
// [Update History]
// 2025.November.11 Ver1.0.0 First Release
// 2025.November.21 Ver1.1.0 Added regular save and load buttons
// 2025.November.30 Ver1.1.1 Fixed multiple menu openings

/*:
 * @target MZ
 * @plugindesc v1.1.1 Quick save&load
 * @author Phileas
 * 
 * 
 * @param saveFile
 * @text Quick Save File Name
 * @desc file0 is displayed in the save menu and can be used for auto-save when switching to the map
 * @default file0
 * 
 * 
 * @param quickSaveButton
 * @text Quick Save Button
 * 
 * @param quickSaveButtonFile
 * @parent quickSaveButton
 * @text Button Picture
 * @desc If the picture is not specified, the button will not be displayed
 * @type file
 * @dir /img/system/
 * 
 * @param quickSaveButtonFilePressed
 * @parent quickSaveButton
 * @text Button Picture (pressed)
 * @desc If the picture is not specified, the default picture will be used
 * @type file
 * @dir /img/system/
 * 
 * @param quickSaveButtonX
 * @parent quickSaveButton
 * @text The X coordinate
 * @type number
 * @default 672
 * 
 * @param quickSaveButtonY
 * @parent quickSaveButton
 * @text The Y coordinate
 * @type number
 * @default 2
 * 
 * 
 * @param quickLoadButton
 * @text Quick Load Button
 * 
 * @param quickLoadButtonFile
 * @parent quickLoadButton
 * @text Button Picture
 * @desc If the picture is not specified, the button will not be displayed
 * @type file
 * @dir /img/system/
 * 
 * @param quickLoadButtonFilePressed
 * @parent quickLoadButton
 * @text Button Picture (pressed)
 * @desc If the picture is not specified, the default picture will be used
 * @type file
 * @dir /img/system/
 * 
 * @param quickLoadButtonX
 * @parent quickLoadButton
 * @text The X coordinate
 * @type number
 * @default 720
 * 
 * @param quickLoadButtonY
 * @parent quickLoadButton
 * @text The Y coordinate
 * @type number
 * @default 2
 * 
 * 
 * @param regularSaveButton
 * @text Regular Save Button
 * 
 * @param regularSaveButtonFile
 * @parent regularSaveButton
 * @text Button Picture
 * @desc If the picture is not specified, the button will not be displayed
 * @type file
 * @dir /img/system/
 * 
 * @param regularSaveButtonFilePressed
 * @parent regularSaveButton
 * @text Button Picture (pressed)
 * @desc If the picture is not specified, the default picture will be used
 * @type file
 * @dir /img/system/
 * 
 * @param regularSaveButtonX
 * @parent regularSaveButton
 * @text The X coordinate
 * @type number
 * @default 576
 * 
 * @param regularSaveButtonY
 * @parent regularSaveButton
 * @text The Y coordinate
 * @type number
 * @default 2
 * 
 * 
 * @param regularLoadButton
 * @text Regular Load Button
 * 
 * @param regularLoadButtonFile
 * @parent regularLoadButton
 * @text Button Picture
 * @desc If the picture is not specified, the button will not be displayed
 * @type file
 * @dir /img/system/
 * 
 * @param regularLoadButtonFilePressed
 * @parent regularLoadButton
 * @text Button Picture (pressed)
 * @desc If the picture is not specified, the default picture will be used
 * @type file
 * @dir /img/system/
 * 
 * @param regularLoadButtonX
 * @parent regularLoadButton
 * @text The X coordinate
 * @type number
 * @default 624
 * 
 * @param regularLoadButtonY
 * @parent regularLoadButton
 * @text The Y coordinate
 * @type number
 * @default 2
 * 
 * 
 * @param hotkeys
 * @text Hot Keys
 * 
 * @param quickSaveHotKeyNumber
 * @parent hotkeys
 * @text Quick Save
 * @desc Numeric key code. If 0, the hotkey will not work. 117 is F6
 * @type number
 * @default 117
 * 
 * @param quickLoadHotKeyNumber
 * @parent hotkeys
 * @text Quick Load
 * @type number
 * @default 118
 * @desc Numeric key code. If 0, the hotkey will not work. 118 is F7
 * 
 * @param regularSaveHotKeyNumber
 * @parent hotkeys
 * @text Default Save
 * @desc Numeric key code. If 0, the hotkey will not work
 * @type number
 * @default 0
 * 
 * @param regularLoadHotKeyNumber
 * @parent hotkeys
 * @text Deafult Load
 * @type number
 * @default 0
 * @desc Numeric key code. If 0, the hotkey will not work
 * 
 * 
 * @help
 * 
 * The plugin adds the ability to quickly save and load.
 * Using the parameters, you can configure:
 * 1) Save file
 *    Default value is "file0". If auto-save is enabled, this file is displayed
 *    in the save menu, but it is overwritten when transfer to the map.
 *    If you want quick save to be displayed in the save menu,
 *    you can also use another number, for example: "file1"
 *    You can use a different name, for example: "quickSave"
 *    Then the save will not be displayed in the save menu, but it can be
 *    loaded using the quick load option.
 * 2) Quick save and load buttons
 *    To display the buttons, specify the pictures from the "img/system" folder for them.
 * 3) Keyboard shortcuts for quick save and download
 *    Specify the numeric codes of the keyboard keys to be used
 *    for quick saving and loading. For example: 117 and 118 (these are F6 and F7).
 * 4) Similarly, you can configure the buttons and keys for regular saving and loading.
 *    Clicking on this button opens a default menu with a file selection.
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
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MZ
 * @plugindesc v1.1.1 Быстрое сохранение и загрузка
 * @author Phileas
 * 
 * 
 * @param saveFile
 * @text Название файла быстрого сохранения
 * @desc file0 отображается в меню сохранений и может использоваться для автосохранения при переходе на карту
 * @default file0
 * 
 * @param quickSaveButton
 * @text Кнопка быстрого сохранения
 * 
 * @param quickSaveButtonFile
 * @parent quickSaveButton
 * @text Картинка кнопки
 * @desc Если картинка не указана, то кнопка не будет отображаться
 * @type file
 * @dir /img/system/
 * 
 * @param quickSaveButtonFilePressed
 * @parent quickSaveButton
 * @text Картинка кнопки (при нажатии)
 * @desc Если картинка не указана, то будет использоваться стандартная картинка
 * @type file
 * @dir /img/system/
 * 
 * @param quickSaveButtonX
 * @parent quickSaveButton
 * @text Координата X
 * @type number
 * @default 672
 * 
 * @param quickSaveButtonY
 * @parent quickSaveButton
 * @text Координата Y
 * @type number
 * @default 2
 * 
 * 
 * @param quickLoadButton
 * @text Кнопка быстрой загрузки
 * 
 * @param quickLoadButtonFile
 * @parent quickLoadButton
 * @text Картинка кнопки
 * @desc Если картинка не указана, то кнопка не будет отображаться
 * @type file
 * @dir /img/system/
 * 
 * @param quickLoadButtonFilePressed
 * @parent quickLoadButton
 * @text Картинка кнопки (при нажатии)
 * @desc Если картинка не указана, то будет использоваться стандартная картинка
 * @type file
 * @dir /img/system/
 * 
 * @param quickLoadButtonX
 * @parent quickLoadButton
 * @text Координата X
 * @type number
 * @default 720
 * 
 * @param quickLoadButtonY
 * @parent quickLoadButton
 * @text Координата Y
 * @type number
 * @default 2
 * 
 * 
 * @param regularSaveButton
 * @text Кнопка обычного сохранения
 * 
 * @param regularSaveButtonFile
 * @parent regularSaveButton
 * @text Картинка кнопки
 * @desc Если картинка не указана, то кнопка не будет отображаться
 * @type file
 * @dir /img/system/
 * 
 * @param regularSaveButtonFilePressed
 * @parent regularSaveButton
 * @text Картинка кнопки (при нажатии)
 * @desc Если картинка не указана, то будет использоваться стандартная картинка
 * @type file
 * @dir /img/system/
 * 
 * @param regularSaveButtonX
 * @parent regularSaveButton
 * @text Координата X
 * @type number
 * @default 576
 * 
 * @param regularSaveButtonY
 * @parent regularSaveButton
 * @text Координата Y
 * @type number
 * @default 2
 * 
 * 
 * @param regularLoadButton
 * @text Кнопка обычной загрузки
 * 
 * @param regularLoadButtonFile
 * @parent regularLoadButton
 * @text Картинка кнопки
 * @desc Если картинка не указана, то кнопка не будет отображаться
 * @type file
 * @dir /img/system/
 * 
 * @param regularLoadButtonFilePressed
 * @parent regularLoadButton
 * @text Картинка кнопки (при нажатии)
 * @desc Если картинка не указана, то будет использоваться стандартная картинка
 * @type file
 * @dir /img/system/
 * 
 * @param regularLoadButtonX
 * @parent regularLoadButton
 * @text Координата X
 * @type number
 * @default 624
 * 
 * @param regularLoadButtonY
 * @parent regularLoadButton
 * @text Координата Y
 * @type number
 * @default 2
 * 
 * 
 * @param hotkeys
 * @text Горячие клавиши
 * 
 * @param quickSaveHotKeyNumber
 * @parent hotkeys
 * @text Быстрое сохранение
 * @type number
 * @default 117
 * @desc Числовой код клавиши. Если 0, то горячая клавиша не будет работать. 117 - это F6
 * 
 * @param quickLoadHotKeyNumber
 * @parent hotkeys
 * @text Быстрая загрузка
 * @type number
 * @default 118
 * @desc Числовой код клавиши. Если 0, то горячая клавиша не будет работать. 118 - это F7
 * 
 * @param regularSaveHotKeyNumber
 * @parent hotkeys
 * @text Обычное сохранение
 * @desc Числовой код клавиши. Если 0, то горячая клавиша не будет работать
 * @type number
 * @default 0
 * 
 * @param regularLoadHotKeyNumber
 * @parent hotkeys
 * @text Обычная загрузка
 * @type number
 * @default 0
 * @desc Числовой код клавиши. Если 0, то горячая клавиша не будет работать
 * 
 * 
 * @help
 * 
 * Плагин добавляет возможность быстрого сохранения и загрузки.
 * С помощью параметров вы можете настроить:
 * 1) Файл сохранения
 *    По умолчанию - "file0". Если включены автосохранения, то этот файл отображается
 *    в меню сохранений, но перезаписывается при переходе на карту. Если вы хотите,
 *    чтобы быстрое сохранение отображалось в меню сохранений, то можете использовать
 *    также другой номер, например: "file1"
 *    Вы можете использовать другое название, например: "quickSave"
 *    Тогда сохранение не будет отображаться в меню сохранений, но его можно будет
 *    загрузить с помощью опции быстрой загрузки.
 * 2) Кнопки быстрого сохранения и загрузки
 *    Чтобы кнопки отображались, укажите для них картинки из папки "img/system".
 * 3) Горячие клавиши быстрого сохранения и загрузки
 *    Укажите числовые кода клавиш клавиатуры, которые будут использоваться
 *    для быстрого сохранения и загрузки. Например: 117 и 118 (это F6 и F7).
 * 4) Аналогично можно настроить кнопки и клавиши обычного сохранения и загрузки.
 *    При нажатии на такую кнопку откроется стандартное меню с выбором файла.
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
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

 "use strict";

 (function() {

//-----------------------------------------------------------------------------
// MY CODE

//-----------------------------------------------------------------------------
// Data

    const $parameters = PluginManager.parameters("Phileas_QuickSave");
    const $saveFileName = $parameters["saveFile"];
 
    const $quickSaveButton = {
        file: $parameters["quickSaveButtonFile"],
        filePressed: $parameters["quickSaveButtonFilePressed"],
        x: Number($parameters["quickSaveButtonX"] || 0),
        y: Number($parameters["quickSaveButtonY"] || 0)
    };
    const $quickLoadButton = {
        file: $parameters["quickLoadButtonFile"],
        filePressed: $parameters["quickLoadButtonFilePressed"],
        x: Number($parameters["quickLoadButtonX"] || 0),
        y: Number($parameters["quickLoadButtonY"] || 0)
    };
 
    const $regularSaveButton = {
        file: $parameters["regularSaveButtonFile"],
        filePressed: $parameters["regularSaveButtonFilePressed"],
        x: Number($parameters["regularSaveButtonX"] || 0),
        y: Number($parameters["regularSaveButtonY"] || 0)
    };
 
    const $regularLoadButton = {
        file: $parameters["regularLoadButtonFile"],
        filePressed: $parameters["regularLoadButtonFilePressed"],
        x: Number($parameters["regularLoadButtonX"] || 0),
        y: Number($parameters["regularLoadButtonY"] || 0)
    };
 
    const $hotkeys = {
        quickSave: Number($parameters["quickSaveHotKeyNumber"] || 0),
        quickLoad: Number($parameters["quickLoadHotKeyNumber"] || 0),
        regularSave: Number($parameters["regularSaveHotKeyNumber"] || 0),
        regularLoad: Number($parameters["regularLoadHotKeyNumber"] || 0)
    };


//-----------------------------------------------------------------------------
// Managers

    DataManager.tryGetSavefileId = function(saveName) {
        if (!saveName.startsWith("file")) {
            return null;
        }

        const id = saveName.substring(4);

        if (!Number.isFinite(id)) {
            return null;
        }

        return Number(id);
    };

    DataManager.quickSave = function() {
        const contents = this.makeSaveContents();
        const saveName = $saveFileName;
        StorageManager.saveObject(saveName, contents).then(() => {
            const savefileId = DataManager.tryGetSavefileId(saveName);

            if (savefileId) {
                this._globalInfo[savefileId] = this.makeSavefileInfo();
            }

            this.saveGlobalInfo();
            SoundManager.playSave();
            return 0;
        });
    };

    DataManager.quickLoad = function() {
        DataManager.executeQuickLoad()
            .then(() => DataManager.onQuickLoadSuccess())
            .catch(() => DataManager.onQuickLoadFailure());
    };

    DataManager.executeQuickLoad = function() {
        const saveName = $saveFileName;
        return StorageManager.loadObject(saveName).then(contents => {
            this.createGameObjects();
            this.extractSaveContents(contents);
            this.correctDataErrors();
            return 0;
        });
    };

    DataManager.onQuickLoadSuccess = function() {
        SoundManager.playLoad();
        const scene = SceneManager._scene;
        scene.fadeOutAll();
        DataManager.reloadMapIfUpdated();
        SceneManager.goto(Scene_Map);
        $gameSystem.onAfterLoad();        
    };

    DataManager.onQuickLoadFailure = function() {
        SoundManager.playBuzzer();
    };

    DataManager.reloadMapIfUpdated = function() {
        if ($gameSystem.versionId() !== $dataSystem.versionId) {
            const mapId = $gameMap.mapId();
            const x = $gamePlayer.x;
            const y = $gamePlayer.y;
            const d = $gamePlayer.direction();
            $gamePlayer.reserveTransfer(mapId, x, y, d, 0);
            $gamePlayer.requestMapReload();
        }
    };


//-----------------------------------------------------------------------------
// Sprites

    function Sprite_PhilesMenuButton() {
        this.initialize(...arguments);
    }

    Sprite_PhilesMenuButton.prototype = Object.create(Sprite_Button.prototype);
    Sprite_PhilesMenuButton.prototype.constructor = Sprite_PhilesMenuButton;

    Sprite_PhilesMenuButton.prototype.initialize = function(file, filePressed) {
        Sprite_Clickable.prototype.initialize.call(this);

        this._defaultBitmap = ImageManager.loadSystem(file);
        this._pressedBitmap = filePressed ? ImageManager.loadSystem(filePressed) : this._defaultBitmap;
        this._clickHandler = null;

        this.updateFrame();
        this.updateOpacity();
    };

    Sprite_PhilesMenuButton.prototype.updateFrame = function() {
        this.bitmap = this.isPressed() ? this._pressedBitmap : this._defaultBitmap;
    };

    Sprite_PhilesMenuButton.prototype.checkBitmap = function() {
    };
    

//-----------------------------------------------------------------------------
// Scenes

    Scene_Map.prototype.createQuickSaveButton = function() {
        if (!$quickSaveButton.file) {
            return;
        }

        this._quickSaveButton = new Sprite_PhilesMenuButton($quickSaveButton.file, $quickSaveButton.filePressed);
        this._quickSaveButton.x = $quickSaveButton.x;
        this._quickSaveButton.y = $quickSaveButton.y;
        this._quickSaveButton.visible = false;
        this._quickSaveButton.setClickHandler(DataManager.quickSave);

        this.addWindow(this._quickSaveButton);
    };

    Scene_Map.prototype.createQuickLoadButton = function() {
        if (!$quickLoadButton.file) {
            return;
        }

        this._quickLoadButton = new Sprite_PhilesMenuButton($quickLoadButton.file, $quickLoadButton.filePressed);
        this._quickLoadButton.x = $quickLoadButton.x;
        this._quickLoadButton.y = $quickLoadButton.y;
        this._quickLoadButton.visible = false;
        this._quickLoadButton.setClickHandler(DataManager.quickLoad);

        this.addWindow(this._quickLoadButton);
    };

    Scene_Map.prototype.createRegularSaveButton = function() {
        if (!$regularSaveButton.file) {
            return;
        }

        this._regularSaveButton = new Sprite_PhilesMenuButton($regularSaveButton.file, $regularSaveButton.filePressed);
        this._regularSaveButton.x = $regularSaveButton.x;
        this._regularSaveButton.y = $regularSaveButton.y;
        this._regularSaveButton.visible = false;
        this._regularSaveButton.setClickHandler(() => SceneManager.push(Scene_Save));

        this.addWindow(this._regularSaveButton);
    };

    Scene_Map.prototype.createRegularLoadButton = function() {
        if (!$regularLoadButton.file) {
            return;
        }

        this._regularLoadButton = new Sprite_PhilesMenuButton($regularLoadButton.file, $regularLoadButton.filePressed);
        this._regularLoadButton.x = $regularLoadButton.x;
        this._regularLoadButton.y = $regularLoadButton.y;
        this._regularLoadButton.visible = false;
        this._regularLoadButton.setClickHandler(() => SceneManager.push(Scene_Load));

        this.addWindow(this._regularLoadButton);
    };

    Scene_Map.prototype.updatePhileasQuickButtons = function() {
        if (!this._menuButton) {
            return;
        }

        if (this._quickSaveButton) {
            this._quickSaveButton.visible = this._menuButton.visible;
        }

        if (this._quickLoadButton) {
            this._quickLoadButton.visible = this._menuButton.visible;
        }

        if (this._regularSaveButton) {
            this._regularSaveButton.visible = this._menuButton.visible;
        }

        if (this._regularLoadButton) {
            this._regularLoadButton.visible = this._menuButton.visible;
        }
    };


//-----------------------------------------------------------------------------
// MODIFIED CODE

    const SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function(event) {
        SceneManager_onKeyDown.call(this, event);
        switch (event.keyCode) {
            case $hotkeys.quickSave:
                DataManager.quickSave();
                break;
            case $hotkeys.quickLoad:
                DataManager.quickLoad();
                break;
            case $hotkeys.regularSave:
                if (!(SceneManager._scene instanceof Scene_Save)) {
                    SceneManager.push(Scene_Save);
                }

                break;
            case $hotkeys.regularLoad:
                if (!(SceneManager._scene instanceof Scene_Load)) {
                    SceneManager.push(Scene_Load);
                }

                break;
        }
    };

    const Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function() {
        Scene_Map_createButtons.call(this);
        this.createQuickSaveButton();
        this.createQuickLoadButton();
        this.createRegularSaveButton();
        this.createRegularLoadButton();
    };

    const Scene_Map_updateMenuButton = Scene_Map.prototype.updateMenuButton;
    Scene_Map.prototype.updateMenuButton = function() {
        Scene_Map_updateMenuButton.call(this);
        this.updatePhileasQuickButtons();
    };

    const Scene_Map_hideMenuButton = Scene_Map.prototype.hideMenuButton;
    Scene_Map.prototype.hideMenuButton = function() {
        Scene_Map_hideMenuButton.call(this);
        this.updatePhileasQuickButtons();
    };

    const Origin_Window_Message_isTriggered = Window_Message.prototype.isTriggered;
    Window_Message.prototype.isTriggered = function() {
        const scene = SceneManager._scene;

        if (scene instanceof Scene_Map) {
            const buttons = [
                scene._menuButton,
                scene._quickSaveButton,
                scene._quickLoadButton,
                scene._regularSaveButton,
                scene._regularLoadButton
            ];

            for (let i = 0; i < buttons.length; ++i) {
                if (buttons[i] && buttons[i]._hovered) {
                    return false;
                }
            }
        }

        return Origin_Window_Message_isTriggered.call(this);
    };

}());
