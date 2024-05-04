//=============================================================================
// Phileas_PictureOutline.js
//=============================================================================
// [Update History]
// 2024.May.04 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Clear picture outlines
 * @author Phileas
 *
 * @command set
 * @text Set picture outline
 * @desc 
 * 
 * @arg pictureNumber
 * @text Picture number
 * @type number
 * @min 1
 * @default 1 
 * 
 * @arg thickness
 * @text Thickness
 * @type number
 * @min 1
 * @default 4
 * 
 * @arg color
 * @text Color
 * @default 0xffffff
 * 
 *
 * @command erase
 * @text Erase picture outline
 * @desc 
 * @arg pictureNumber
 * @text Picture number
 * @type number
 * @min 1
 * @default 1 
 * 
 *
 * @command setSeveral
 * @text Set several outlines
 * @desc 
 * 
 * @arg pictureNumbers
 * @text Picture numbers
 * @type number[]
 * @min 1
 * @default 1 
 * 
 * @arg thickness
 * @text Thickness
 * @type number
 * @min 1
 * @default 4
 * 
 * @arg color
 * @text Color
 * @default 0xffffff
 * 
 * @command eraseSeveral
 * @text Erase several outlines
 * @desc 
 * 
 * @arg pictureNumbers
 * @text Picture numbers
 * @type number[]
 * @min 1
 * @default 1 
 * 
 * 
 * @command eraseAll
 * @text Erase all outlines
 * @desc 
 *
 * 
 * @help
 * Displays a smooth outline around the pictures.
 * You can adjust the thickness and color of the outline.
 * See the plugin commands.
 * 
 * Plugin commands: 
 * - "Set picture outline"
 * - "Erase picture outline"
 * - "Set several outlines"
 * - "Erase several outlines"
 * - "Erase all outlines"
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
 * @plugindesc Чёткие обводки картинок
 * @author Phileas
 *
 * @command set
 * @text Установить обводку картинки
 * @desc 
 * 
 * @arg pictureNumber
 * @text Номер картинки
 * @type number
 * @min 1
 * @default 1 
 * 
 * @arg color
 * @text Цвет
 * @default 0xffffff
 * 
 *
 * @command erase
 * @text Удалить обводку картинки
 * @desc 
 * @arg pictureNumber
 * @text Номер картинки
 * @type number
 * @min 1
 * @default 1 
 * 
 *
 * @command setSeveral
 * @text Установить несколько обводок
 * @desc 
 * 
 * @arg pictureNumbers
 * @text Номера картинок
 * @type number[]
 * @min 1
 * @default 1 
 * 
 * @arg color
 * @text Цвет
 * @default 0xffffff
 * 
 * @command eraseSeveral
 * @text Удалить несколько обводок
 * @desc 
 * 
 * @arg pictureNumbers
 * @text Номера картинок
 * @type number[]
 * @min 1
 * @default 1 
 * 
 * @command eraseAll
 * @text Удалить все обводки
 * @desc 
 *
 * 
 * @help
 * Отображает ровную обводку вокруг изображений.
 * Вы можете настроить толщину и цвет обводки.
 * Смотрите команды плагина.
 * 
 * Команды плагина: 
 * - "Установить обводку картинки"
 * - "Удалить обводку картинки"
 * - "Установить несколько обводок"
 * - "Удалить несколько обводок"
 * - "Удалить все обводки"
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
 
(function() {

//--------MY CODE:
    
//-----------------------------------------------------------------------------
// Data
    PluginManager.registerCommand("Phileas_PictureOutline", "set", set);
    PluginManager.registerCommand("Phileas_PictureOutline", "erase", erase);
    PluginManager.registerCommand("Phileas_PictureOutline", "setSeveral", setSeveral);
    PluginManager.registerCommand("Phileas_PictureOutline", "eraseSeveral", eraseSeveral);
    PluginManager.registerCommand("Phileas_PictureOutline", "eraseAll", eraseAll);

    var phileasOutlineFilters = [];

//-----------------------------------------------------------------------------
// My code

    function createFilter(params, pictureNumbers) {
        const thickness = Number(params["thickness"]);
        const color = Number(params["color"]);

        const filter = new PIXI.filters.OutlineFilter(thickness, color);
        filter.phileasPictureOutline = true;
        filter.phileasPictureNumbers = pictureNumbers;

        phileasOutlineFilters.push(filter);
    }

    function erasePicturesFromFilters(pictureNumbers) {
        for (let i = phileasOutlineFilters.length - 1; i > -1; --i) {
            phileasOutlineFilters[i].phileasPictureNumbers
                = phileasOutlineFilters[i].phileasPictureNumbers.filter(number => !pictureNumbers.includes(number));
            if (phileasOutlineFilters[i].phileasPictureNumbers.length == 0) {
                phileasOutlineFilters.splice(i, 1);
            }
        }

        SceneManager._scene.updateOutlines();
        const targets = SceneManager._scene.getTargets(pictureNumbers);
        for (let j = 0; j < targets.length; ++j) {
            if (!targets[j]) {
                continue;
            }
    
            let arr = targets[j].filters || [];
            arr = arr.filter(item => item.phileasPictureOutline !== true);
            targets[j].filters = arr;
        }
    }

    function set(params) {
        const pictureNumbers = [Number(params["pictureNumber"])];
        createFilter(params, pictureNumbers);
    }

    function erase(params) {
        const pictureNumbers = [Number(params["pictureNumber"])];
        erasePicturesFromFilters(pictureNumbers);
    }

    function setSeveral(params) {
        const pictureNumbers = JSON.parse(params["pictureNumbers"]);
        for (let i = 0; i < pictureNumbers.length; ++i) {
            pictureNumbers[i] = Number(pictureNumbers[i]);
        }

        createFilter(params, pictureNumbers);
    }

    function eraseSeveral(params) {
        const pictureNumbers = JSON.parse(params["pictureNumbers"]);
        for (let i = 0; i < pictureNumbers.length; ++i) {
            pictureNumbers[i] = Number(pictureNumbers[i]);
        }

        erasePicturesFromFilters([1]);
    }

    function eraseAll() {
        phileasOutlineFilters = [];

        SceneManager._scene.updateOutlines();
        const targets = SceneManager._scene._spriteset._pictureContainer.children;
        for (let j = 0; j < targets.length; ++j) {
            if (!targets[j]) {
                continue;
            }
    
            let arr = targets[j].filters || [];
            arr = arr.filter(item => item.phileasPictureOutline !== true);
            targets[j].filters = arr;
        }
    }

    Scene_Base.prototype.getTargets = function(targetIds) {
        const targets = [];
        const picturesContainer = this._spriteset._pictureContainer.children;

        targetIds.forEach(targetId => {
            const pictureId = $gameScreen.realPictureId(targetId) - 1;
            if (picturesContainer[pictureId]) { 
                targets.push(picturesContainer[pictureId]);
            }
        });

        return targets;
    }

    Scene_Base.prototype.updateOutlines = function() {
        for (let i = 0; i < phileasOutlineFilters.length; ++i) {
            const targets = this.getTargets(phileasOutlineFilters[i].phileasPictureNumbers);

            for (let j = 0; j < targets.length; ++j) {
                if (!targets[j]) {
                    continue;
                }
    
                let arr = targets[j].filters || [];
                arr = arr.filter(item => item.phileasPictureOutline !== true);
                arr.push(phileasOutlineFilters[i]);
                targets[j].filters = arr;
            }
        }
    };
    
//-----------------------------------------------------------------------------
// Changed code

    const Origin_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function() {
        Origin_updateMain.call(this);
        this.updateOutlines();
    };
    
    const Origin_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		Origin_update.call(this);
		this.updateOutlines();
	};

}());
