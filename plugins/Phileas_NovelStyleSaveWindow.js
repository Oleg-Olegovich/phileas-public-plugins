//=============================================================================
// Phileas_NovelStyleSaveWindow.js
//=============================================================================
// [Update History]
// 2025.May.08 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc 
 * @author Phileas
 * 
 * @param screenshotSettings
 * @text Screenshot Settings
 *
 * @param screenshotWidth
 * @parent screenshotSettings
 * @text Width
 * @type number
 * @default 624
 *
 * @param screenshotHeight
 * @parent screenshotSettings
 * @text Height
 * @type number
 * @default 624
 * 
 * @param screenshotAnchorX
 * @parent screenshotSettings
 * @text Anchor X
 * @type select
 * @option Left
 * @value left
 * @option Middle
 * @value middle
 * @option Right
 * @value right
 * @default middle
 * 
 * @param screenshotAnchorY
 * @parent screenshotSettings
 * @text Anchor Y
 * @type select
 * @option Top
 * @value top
 * @option Middle
 * @value middle
 * @option Bottom
 * @value bottom
 * @default middle
 * 
 * 
 * @param windowSettings
 * @text Window Settings
 *
 * @param columnsNumber
 * @parent windowSettings
 * @text Columns Number
 * @type number
 * @default 2
 *
 * @param rowsNumber
 * @parent windowSettings
 * @text Rows Number
 * @type number
 * @default 2
 *
 * @param spacing
 * @parent windowSettings
 * @text Spacing
 * @type number
 * @default 8
 *
 * @param maxSaveFiles
 * @parent windowSettings
 * @text Max Save Files
 * @type number
 * @default 100
 *
 * @param pageButtonPosition
 * @parent windowSettings
 * @text Page Button Position
 * @type select
 * @option Top
 * @value top
 * @option Bottom
 * @value bottom
 * @default top
 * 
 * @param pageButtonMargin
 * @parent windowSettings
 * @text Page Button Margin
 * @type number
 * @default 8
 *
 * 
 * @help
 * 
 * The plugin changes the visual appearance of the save and download windows.
 * When developing, I was inspired by the standard UI of the Ren'py engine.
 * 
 * The plugin does not provide commands,
 * configure it using the parameters.
 * 
 *-----------------------------------------------------------------------------
 * INSTALLATION
 * 
 * For the plugin to work, you need to install Phileas's File Manager:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_FileManager.js
 * This plugin is required to save and upload screenshots.
 * In the plugin manager, place Phileas's File Manager above Phileas's Novel Style Save Window.
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
 * @plugindesc 
 * @author Phileas
 *
 * @param screenshotSettings
 * @text Настройки скриншотов
 *
 * @param screenshotWidth
 * @parent screenshotSettings
 * @text Ширина
 * @type number
 * @default 624
 *
 * @param screenshotHeight
 * @parent screenshotSettings
 * @text Высота
 * @type number
 * @default 624
 * 
 * @param screenshotAnchorX
 * @parent screenshotSettings
 * @text Якорь X
 * @type select
 * @option Left
 * @value left
 * @option Middle
 * @value middle
 * @option Right
 * @value right
 * @default middle
 * 
 * @param screenshotAnchorY
 * @parent screenshotSettings
 * @text Якорь Y
 * @type select
 * @option Top
 * @value top
 * @option Middle
 * @value middle
 * @option Bottom
 * @value bottom
 * @default middle
 * 
 * 
 * @param windowSettings
 * @text Настройки окна
 *
 * @param columnsNumber
 * @parent windowSettings
 * @text Кол-во столбцов
 * @type number
 * @default 2
 *
 * @param rowsNumber
 * @parent windowSettings
 * @text Кол-во строк
 * @type number
 * @default 2
 *
 * @param spacing
 * @parent windowSettings
 * @text Отступы
 * @type number
 * @default 8
 *
 * @param maxSaveFiles
 * @parent windowSettings
 * @text Макс. кол-во сохранений
 * @type number
 * @default 100
 *
 * @param pageButtonPosition
 * @parent windowSettings
 * @text Положение кнопок страниц
 * @type select
 * @option Top
 * @value top
 * @option Bottom
 * @value bottom
 * @default top
 * 
 * @param pageButtonMargin
 * @parent windowSettings
 * @text Отступы кнопок страниц
 * @type number
 * @default 8
 *
 * 
 * @help
 * 
 * Плагин меняет визуальный вид окон сохранений и загрузки.
 * При разработке вдохновлялся стандартным UI движка RenPy.
 * 
 * Плагин не предоставляет команд,
 * настраивайте его с помощью параметров.
 * 
 *-----------------------------------------------------------------------------
 * УСТАНОВКА
 * 
 * Для работы плагина необходимо установить Phileas`s File Manager:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_FileManager.js
 * Этот плагин необходим для сохранения и загрузки скриншотов.
 * В менеджере плагинов расположите  Phileas`s File Manager выше Phileas`s Novel Style Save Window.
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

//--------MY CODE:

//-----------------------------------------------------------------------------
// Constatns

    const $screenshotFolder = "img/saves/";
    
//-----------------------------------------------------------------------------
// Data
    
    var parameters = PluginManager.parameters("Phileas_NovelStyleSaveWindow");

    var $screenshotSettings = {
        width: Number(parameters["screenshotWidth"] || 624),
        height: Number(parameters["screenshotHeight"] || 624),
        anchorX: parameters["screenshotAnchorX"] || "middle",
        anchorY: parameters["screenshotAnchorY"] || "middle"
    };

    var $windowSettings = {
        columns: Number(parameters["columnsNumber"] || 2),
        rows: Number(parameters["rowsNumber"] || 2),
        maxSaveFiles: Number(parameters["maxSaveFiles"] || 100),
        spacing: Number(parameters["spacing"] || 8),
        pageButtonPosition: parameters["pageButtonPosition"] || "top",
        //pageButtonSize: Number(parameters["pageButtonSize"] || 24),
        pageButtonSize: 48,
        pageButtonMargin: Number(parameters["pageButtonMargin"] || 8)
    };

    var $page = 0;
    
//-----------------------------------------------------------------------------
// Sprites

    function Sprite_SavelistButton() {
        this.initialize(...arguments);
    }

    Sprite_SavelistButton.prototype = Object.create(Sprite_Button.prototype);
    Sprite_SavelistButton.prototype.constructor = Sprite_SavelistButton;

    Sprite_SavelistButton.prototype.initialize = function(buttonType) {
        Sprite_Button.prototype.initialize.call(this, buttonType);
        this.enable();
    };

    Sprite_SavelistButton.prototype.enable = function() {
        this._enabled = true;
        this.opacity = 255;
    };

    Sprite_SavelistButton.prototype.disable = function() {
        this._enabled = false;
        this.opacity = 128;
    };

    Sprite_SavelistButton.prototype.isClickEnabled = function() {
        return this.worldVisible && this._enabled;
    };


    function Sprite_PageNumber() {
        this.initialize(...arguments);
    }

    Sprite_PageNumber.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_PageNumber.prototype.constructor = Sprite_PageNumber;

    Sprite_PageNumber.prototype.initialize = function(window, number) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._window = window;
        this._number = number;
        this.drawNumberBitmap();
        this.enable();
    };

    Sprite_PageNumber.prototype.drawNumberBitmap = function(pressed = false) {
        const size = $windowSettings.pageButtonSize;

        const systemBmp = ImageManager.loadSystem("ButtonSet");
        this.bitmap = new Bitmap(size, size);

        systemBmp.addLoadListener(() => {
            const sw = size * 2 / 3;
            const sw2 = size - sw;
            const sh = size;
            const sx = 0;
            const sx2 = size * 2 - sw2;
            const sy = pressed ? size : 0;

            this.bitmap.blt(systemBmp, sx, sy, sw, sh, 0, 0);
            this.bitmap.blt(systemBmp, sx2, sy, sw2, sh, size - sw2, 0);

            this.bitmap.fontSize  = Math.floor(size * 0.6);
            this.bitmap.textColor = "#ffffff";
            this.bitmap.drawText(String(this._number + 1), 0, 0, size, size, "center");
        });
    };

    Sprite_PageNumber.prototype.enable = function() {
        this._enabled = true;
        this.opacity = 255;
    };

    Sprite_PageNumber.prototype.disable = function() {
        this._enabled = false;
        this.opacity = 128;
    };

    Sprite_PageNumber.prototype.isClickEnabled = function() {
        return this.worldVisible && this._enabled;
    };

    Sprite_PageNumber.prototype.onClick = function() {
        this._window.setPage(this._number);
        this._window.createPageButtons();
    };

    Sprite_PageNumber.prototype.updateNumberBitmap = function() {
        if (this._oldState == this._pressed) {
            return;
        }

        this.drawNumberBitmap(this._pressed);
        this._oldState = this._pressed;
    };

    Sprite_PageNumber.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        this.updateNumberBitmap();
        this.updateOpacity();
    };

    Sprite_PageNumber.prototype.updateOpacity = function() {
        if (!this._enabled) {
            this.opacity = 128;
            return;
        }

        this.opacity = this._pressed ? 255 : 192;
    };

//-----------------------------------------------------------------------------
// Windows

    Window_SavefileList.prototype.itemWidth = function() {
        return Math.floor(this.innerWidth / $windowSettings.columns
            - this.padding * 2 - $windowSettings.spacing
        );
    };

    Window_SavefileList.prototype.leftMargin = function() {
        return (this.innerWidth - this.itemWidth() * $windowSettings.columns) / 2;
    };

    Window_SavefileList.prototype.topMargin = function() {
        return (this.innerHeight - this.itemHeight() * $windowSettings.rows) / 2;
    };

    Window_SavefileList.prototype.drawScreenshotBitmap = function(bitmap, rect) {
        const height = rect.height;
        const width = bitmap.width * (height / bitmap.height);
        const scaledBitmap = scaleBitmap(bitmap, width, height);
        const dw = Math.min(width, rect.width);
        const dh = Math.min(width, rect.height);
        this.contents.blt(scaledBitmap, 0, 0, width, height, rect.x, rect.y, dw, dh);
    };

    Window_SavefileList.prototype.screenshotScale = function() {
        return this.itemHeight() / $screenshotSettings.height;
    };

//-----------------------------------------------------------------------------
// Scenes

    Scene_File.prototype.maxPageCount = function() {
        return Math.ceil($windowSettings.maxSaveFiles / this._listWindow.maxPageItems());
    };

    Scene_File.prototype.clearPageButtons = function() {
        this._pageButtons.forEach(b => this._windowLayer.removeChild(b));
        this._pageButtons = [];
    };

    Scene_File.prototype.createNumberPageButtons = function() {
        const totalPages = this.maxPageCount();
        if (totalPages <= 1) {
            return;
        }

        const buttonSize = $windowSettings.pageButtonSize;
        const margin = $windowSettings.pageButtonMargin;
        const spaceForNumbers = this._cancelButton.x - 2 * buttonSize - margin * 3;
        const buttonsCount = Math.floor(spaceForNumbers / (buttonSize + margin));
        
        const half = Math.floor(buttonsCount / 2);
        let start = Math.max(0, $page - half);
        let end = Math.min(totalPages, start + buttonsCount);
        if (end - start < buttonsCount) {
            start = Math.max(0, end - buttonsCount);
        }

        for (let i = start; i < end; ++i) {
            const numberButton = new Sprite_PageNumber(this, i);
            this._pageButtons.push(numberButton);
            this.addWindow(numberButton);
        }
    };

    Scene_File.prototype.setButtonsLocation = function() {
        const buttonSize = $windowSettings.pageButtonSize;
        const margin = $windowSettings.pageButtonMargin;
        const panelWidth = this._pageButtons.length * (buttonSize + margin) + margin;
        const cancelX = Graphics.boxWidth - buttonSize * 2 - 4;
        const baseX = (cancelX - panelWidth) / 2;
        const y = this.buttonY();

        for (let i = 0; i < this._pageButtons.length; ++i) {
            this._pageButtons[i].x = baseX + (buttonSize + margin) * i;
            this._pageButtons[i].y = y;
        }
    };

    Scene_File.prototype.setPage = function(page) {
        const max = this.maxPageCount() - 1;
        $page = page.clamp(0, max);
        this._listWindow.refresh();
    };


//-----------------------------------------------------------------------------
// Main

    function getFileName(savefileId) {
        return $screenshotFolder + savefileId + ".png";
    }

    function getCropBitmapX(width) {
        switch ($screenshotSettings.anchorX) {
            case "left":
                return 0;
            case "right":
                return width - $screenshotSettings.width;
            case "middle":
            default:
                return (width - $screenshotSettings.width) / 2;
        }
    }

    function getCropBitmapY(height) {
        switch ($screenshotSettings.anchorX) {
            case "top":
                return 0;
            case "bottom":
                return height - $screenshotSettings.height;
            case "middle":
            default:
                return (height - $screenshotSettings.height) / 2;
        }
    }

    function getScreenshotBitmap() {
        const bitmap = SceneManager._backgroundBitmap;

        const startX = getCropBitmapX(bitmap.width);
        const startY = getCropBitmapY(bitmap.height);

        const cropBitmap = new Bitmap($screenshotSettings.width, $screenshotSettings.height);
        cropBitmap.blt(bitmap, startX, startY, $screenshotSettings.width, $screenshotSettings.height, 0, 0);

        return cropBitmap;
    }

    function scaleBitmap(bitmap, newWidth, newHeight) {
        const result = new Bitmap(newWidth, newHeight);
        const ctx = result.canvas.getContext("2d");
        ctx.drawImage(bitmap.canvas, 0, 0, newWidth, newHeight);
        return result;
    }

    async function saveScreenshot(savefileId) {
        const fileName = getFileName(savefileId);
        const bitmap = getScreenshotBitmap();
        const dataUrl = bitmap.canvas.toDataURL("image/png");
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        await Phileas_FileManager.writeFile(fileName, buffer);
    }

    function loadScreenshot(savefileId) {
        return Bitmap.load(getFileName(savefileId));
    }

//--------CHANGED CORE:

    const Origin_Window_SavefileList_initialize = Window_SavefileList.prototype.initialize;
    Window_SavefileList.prototype.initialize = function(rect) {
        Origin_Window_SavefileList_initialize.call(this, rect);
        this._autosaveTextWidth = this.textWidth(TextManager.autosave);
    };

    Window_SavefileList.prototype.itemHeight = function() {
        return Math.floor(this.innerHeight / $windowSettings.rows
            - this.padding * 2 - $windowSettings.spacing);
    };

    Window_SavefileList.prototype.itemRect = function(index) {
        const width = this.itemWidth();
        const height = this.itemHeight();

        const x = index % $windowSettings.columns * (width + $windowSettings.spacing) + this.leftMargin();
        const y = Math.floor(index / $windowSettings.columns) * (height + $windowSettings.spacing) + this.topMargin();
        return new Rectangle(x, y, width, height);
    };

    Window_SavefileList.prototype.drawItem = function(index, rectIndex) {
        const savefileId = this.indexToSavefileId(index);
        const info = DataManager.savefileInfo(savefileId);
        const rect = this.itemRectWithPadding(rectIndex);
        this.resetTextColor();
        this.changePaintOpacity(this.isEnabled(savefileId));

        if (info) {
            const bitmap = loadScreenshot(savefileId);

            if (!bitmap.isReady()) {
                bitmap.addLoadListener(function() {
                    this.drawContents(bitmap, savefileId, info, rect);
                }.bind(this));
            } else {
                this.drawContents(bitmap, savefileId, info, rect);
            }
        }
    };

    Window_SavefileList.prototype.drawContents = function(bitmap, savefileId, info, rect) {
        if (bitmap && !bitmap.isError()) {
            this.drawScreenshotBitmap(bitmap, rect);
        }

        const titleOutX = rect.x + this.screenshotScale() * $screenshotSettings.width + 10;
        const titleInX = rect.x + rect.width - this._autosaveTextWidth;
        const titleX = Math.min(titleOutX, titleInX);
        this.drawTitle(savefileId,
            titleX,
            rect.y + 4);
        
        const lineHeight = this.lineHeight();
        const bottom = rect.y + rect.height;
        const y2 = bottom - lineHeight - 4;
        if (y2 >= lineHeight) {
            this.changePaintOpacity(true);
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };

    Window_SavefileList.prototype.drawAllItems = function() {
        const itemsPerPage = this.maxPageItems();
        const startIndex = $page * itemsPerPage;

        for (let i = 0; i < itemsPerPage; ++i) {
            const index = startIndex + i;
            if (index < $windowSettings.maxSaveFiles) {
                this.drawItemBackground(i);
                this.drawItem(index, i);
            }
        }
    };

    Window_SavefileList.prototype.maxPageItems = function() {
        return $windowSettings.rows * $windowSettings.columns;
    };

    Window_SavefileList.prototype.savefileId = function() {
        const itemsPerPage = this.maxPageItems();
        const startIndex = $page * itemsPerPage;
        const index = startIndex + this.index();
        return this.indexToSavefileId(index);
    };

    Window_SavefileList.prototype.smoothScrollDown = function(n) {
    };
    
    Window_SavefileList.prototype.smoothScrollUp = function(n) {
    };
    
    Window_SavefileList.prototype.smoothScrollTo = function(n) {
    };
    
    Window_SavefileList.prototype.scrollTo = function(n) {
    };

    Window_SavefileList.prototype.updateArrows = function() {
        this.downArrowVisible = false;
        this.upArrowVisible = false;
    };

    const Origin_Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        SceneManager.snapForBackground();
        Origin_Scene_Map_callMenu.call(this);
    };

    const Origin_Scene_Base_executeSave = Scene_Base.prototype.executeAutosave;
    Scene_Base.prototype.executeAutosave = async function() {
        await saveScreenshot(0);
        Origin_Scene_Base_executeSave.call(this);
    };

    const Origin_Scene_File_initialize = Scene_File.prototype.initialize;
    Scene_File.prototype.initialize = function() {
        Origin_Scene_File_initialize.call(this);
        this._pageButtons = [];
    };

    const Origin_Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        Origin_Scene_File_create.call(this);
        this.createCancelButton();
        this.createPageButtons();
    };

    Scene_File.prototype.createButtons = function() {
    };

    Scene_File.prototype.isBottomButtonMode = function() {
        return $windowSettings.pageButtonPosition != "top";
    };

    Scene_File.prototype.createPageButtons = function() {
        this.clearPageButtons();

        const prevButton = new Sprite_SavelistButton("pageup");
        const nextButton = new Sprite_SavelistButton("pagedown");
        prevButton.setClickHandler(() => this.setPage($page - 1));
        nextButton.setClickHandler(() => this.setPage($page + 1));
        this.addWindow(prevButton);
        this.addWindow(nextButton);

        this._pageButtons.push(prevButton);
        this.createNumberPageButtons();
        this._pageButtons.push(nextButton);

        this.setButtonsLocation();
        this.updatePageButtons();
    };

    Scene_File.prototype.updatePageButtons = function() {
        if ($page > 0) {
            this._pageButtons[0].enable();
        } else {
            this._pageButtons[0].disable();
        }

        if ($page < this.maxPageCount() - 1) {
            this._pageButtons[this._pageButtons.length - 1].enable();
        } else {
            this._pageButtons[this._pageButtons.length - 1].disable();
        }

        for (let i = 1; i + 1 < this._pageButtons.length; ++i) {
            if (this._pageButtons[i]._number == $page) {
                this._pageButtons[i].disable();
                continue;
            }

            this._pageButtons[i].enable();
        }
    };

    Scene_File.prototype.createListWindow = function() {
        const rect = this.listWindowRect();
        this._listWindow = new Window_SavefileList(rect);
        this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
        this._listWindow.setHandler("cancel", this.popScene.bind(this));
        this._listWindow.setMode(this.mode(), this.needsAutosave());

        const fileId = this.firstSavefileId();
        const itemsPerPage = this._listWindow.maxPageItems();
        this.setPage(Math.floor(fileId / itemsPerPage));
        const startIndex = $page * itemsPerPage;
        const index = fileId - startIndex;
        this._listWindow.selectSavefile(index);
        this._listWindow.refresh();

        this.addWindow(this._listWindow);
    };

    const Origin_Scene_Save_executeSave = Scene_Save.prototype.executeSave;
    Scene_Save.prototype.executeSave = async function(savefileId) {
        await saveScreenshot(savefileId);
        Origin_Scene_Save_executeSave.call(this, savefileId);
    };

    DataManager.maxSavefiles = function() {
        return $windowSettings.maxSaveFiles;
    };
    
}());
