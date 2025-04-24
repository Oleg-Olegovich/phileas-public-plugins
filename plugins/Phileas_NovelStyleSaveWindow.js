//=============================================================================
// Phileas_NovelStyleSaveWindow.js
//=============================================================================
// [Update History]
// 2025.April.08 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc 
 * @author Phileas
 * 
 * @param screenshotSettings
 * @text Screenshot settings
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
 * @type select
 * @text Anchor X
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
 * @type select
 * @text Anchor Y
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
 * @text Window settings
 *
 * @param columnsNumber
 * @parent windowSettings
 * @text Columns number
 * @type number
 * @default 2
 *
 * @param rowsNumber
 * @parent windowSettings
 * @text Rows number
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
 * @text Max save files
 * @type number
 * @default 100
 *
 * 
 * @help
 * 
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
 * @param basicCursors
 * @text Основные курсоры
 *
 * 
 * @help
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
        spacing: Number(parameters["spacing"] || 8)
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
        this.contents.blt(scaledBitmap, 0, 0, width, height, rect.x, rect.y);
    };

    Window_SavefileList.prototype.screenshotScale = function() {
        return this.itemHeight() / $screenshotSettings.height;
    };

//--------CHANGED CORE:

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

    Window_SavefileList.prototype.drawItem = function(index) {
        const savefileId = this.indexToSavefileId(index);
        const info = DataManager.savefileInfo(savefileId);
        const rect = this.itemRectWithPadding(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isEnabled(savefileId));

        this.drawTitle(savefileId,
            rect.x + this.screenshotScale() * $screenshotSettings.width + 10,
            rect.y + 4);

        if (info) {
            const bitmap = loadScreenshot(savefileId);

            if (!bitmap.isReady()) {
                bitmap.addLoadListener(function() {
                    this.drawContents(bitmap, info, rect);
                }.bind(this));
            } else {
                this.drawContents(bitmap, info, rect);
            }
        }
    };

    Window_SavefileList.prototype.drawContents = function(bitmap, info, rect) {
        if (bitmap && !bitmap.isError()) {
            this.drawScreenshotBitmap(bitmap, rect);
        }
        
        const lineHeight = this.lineHeight();
        const bottom = rect.y + rect.height;
        const y2 = bottom - lineHeight - 4;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };

    Window_SavefileList.prototype.smoothScrollDown = function(n) {
    };
    
    Window_SavefileList.prototype.smoothScrollUp = function(n) {
    };
    
    Window_SavefileList.prototype.smoothScrollTo = function(n) {
    };
    
    Window_SavefileList.prototype.scrollTo = function(n) {
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

    const Origin_Scene_Save_executeSave = Scene_Save.prototype.executeSave;
    Scene_Save.prototype.executeSave = async function(savefileId) {
        await saveScreenshot(savefileId);
        Origin_Scene_Save_executeSave.call(this, savefileId);
    };

    DataManager.maxSavefiles = function() {
        return $windowSettings.maxSaveFiles;
    };
    
}());
