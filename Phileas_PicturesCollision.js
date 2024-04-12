//=============================================================================
// Phileas_PicturesCollision.js
//=============================================================================
// [Update History]
// 2024.March.10 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Picture collision search
 * @author Phileas
 *
 * @command isColliding
 * @text Check the collision
 * @desc Do the pictures intersect?
 *
 * @arg firstPictureId
 * @text First picture ID
 * @type number
 *
 * @arg secondPictureId
 * @text Second picture ID
 * @type number
 *
 * @arg resultSwitchId
 * @text Result switch ID
 * @type switch
 * 
 * @help
 * Allows you to determine if 2 pictures intersect.
 * It will help in mini-games and game mechanics based on collisions.
 *
 * Use the plugin command - "Check the collision".
 * Specify the ID of the pictures and the switch to which the result will be set.
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
 * @plugindesc Поиск коллизии картинок
 * @author Phileas
 *
 * @command isColliding
 * @text Проверь коллизию
 * @desc Картинки пересекаются?
 *
 * @arg firstPictureId
 * @text ID первой картинки
 * @type number
 *
 * @arg secondPictureId
 * @text ID второй картинки
 * @type number
 *
 * @arg resultSwitchId
 * @text ID переключателя результата
 * @type switch
 * 
 * @help
 * Позволяет определить пересекаются ли 2 картинки.
 * Это поможет в мини-играх и игровых механиках, основанных на столкновениях.
 *
 * Используйте команду плагина - "Проверь коллизию".
 * Укажите ID картинок и переключатель, в который установится результат.
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
    var phileasCollisionPictures = {};

    PluginManager.registerCommand("Phileas_PicturesCollision", "isColliding", isColliding);

    function makeRect(x, y, xx, yy) {
        var rect = new Object();
        rect.x = x;
        rect.y = y;
        rect.xx = xx;
        rect.yy = yy;
        return rect;
    }

    function isRectColliding(rect1, rect2) {
          if (rect1.xx < rect2.x || rect2.xx < rect1.x) {
              return false;
          }
          
          if (rect1.yy < rect2.y || rect2.yy < rect1.y) {
              return false;
          }
          
          return true;
    }

    function isColliding(params) {
        const firstPictureId = Number(params["firstPictureId"]);
        const secondPictureId = Number(params["secondPictureId"]);
        const resultSwitchId = Number(params["resultSwitchId"]);
        
        const firstBounds = phileasCollisionPictures[firstPictureId]._bounds;
        const secondBounds = phileasCollisionPictures[secondPictureId]._bounds;
        
        const rect1 = makeRect(firstBounds.minX, firstBounds.minY, firstBounds.maxX, firstBounds.maxY);
        const rect2 = makeRect(secondBounds.minX, secondBounds.minY, secondBounds.maxX, secondBounds.maxY);
        
        const result = isRectColliding(rect1, rect2);
        
        $gameSwitches.setValue(resultSwitchId, result);
    }

//--------CHANGED CORE:
    Origin_SpriteInitialize = Sprite_Picture.prototype.initialize;
    Sprite_Picture.prototype.initialize = function(pictureId) {
        phileasCollisionPictures[pictureId] = this;
        Origin_SpriteInitialize.call(this, pictureId);
    };
}());
