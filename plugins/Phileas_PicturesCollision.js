//=============================================================================
// Phileas_PicturesCollision.js
//=============================================================================
// [Update History]
// 2024.March.10 Ver1.0.0 First Release
// 2025.June.13 Ver1.1.0 Added a collision check with ignoring transparent pixels

/*:
 * @target MZ
 * @plugindesc v1.1.0 Picture collision search
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
 * @arg ignoreTransparentPixels
 * @text Ignore transparent pixels
 * @type boolean
 * @default true
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
 * @plugindesc v1.1.0 Поиск коллизии картинок
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
 * @arg ignoreTransparentPixels
 * @text Игнорировать прозрачные пиксели
 * @type boolean
 * @default true
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

    function isRegularPicturesColliding(firstPictureId, secondPictureId) {
        const firstBounds = phileasCollisionPictures[firstPictureId]._bounds;
        const secondBounds = phileasCollisionPictures[secondPictureId]._bounds;
        
        const rect1 = makeRect(firstBounds.minX, firstBounds.minY, firstBounds.maxX, firstBounds.maxY);
        const rect2 = makeRect(secondBounds.minX, secondBounds.minY, secondBounds.maxX, secondBounds.maxY);
        
        return isRectColliding(rect1, rect2);
    }

    function ensureContext(bitmap) {
        if (!bitmap._context) {
            const canvas = document.createElement('canvas');
            canvas.width  = bitmap.width;
            canvas.height = bitmap.height;
            const context = canvas.getContext('2d');

            const src = bitmap._image
                || (bitmap.baseTexture
                    && bitmap.baseTexture.resource 
                    && bitmap.baseTexture.resource.source);
            if (src) {
                context.drawImage(src, 0, 0);
            }

            bitmap._canvas  = canvas;
            bitmap._context = context;
        }
        return bitmap._context;
    }

    function isPixelColliding(firstSprite, secondSprite) {
        const firstBitmap = firstSprite.bitmap;
        const secondBitmap = secondSprite.bitmap;
        if (!firstBitmap || !firstBitmap.isReady() || !secondBitmap || !secondBitmap.isReady()) {
            return false;
        }

        const b1 = firstSprite.getBounds();
        const b2 = secondSprite.getBounds();

        const left   = Math.max(b1.x, b2.x);
        const right  = Math.min(b1.x + b1.width, b2.x + b2.width);
        const top    = Math.max(b1.y, b2.y);
        const bottom = Math.min(b1.y + b1.height, b2.y + b2.height);

        const startX = Math.floor(left);
        const endX   = Math.ceil(right);
        const startY = Math.floor(top);
        const endY   = Math.ceil(bottom);

        if (endX <= startX || endY <= startY) {
            return false;
        }

        const ax1 = firstSprite.anchor.x * firstBitmap.width;
        const ay1 = firstSprite.anchor.y * firstBitmap.height;
        const ax2 = secondSprite.anchor.x * secondBitmap.width;
        const ay2 = secondSprite.anchor.y * secondBitmap.height;

        const inv1   = new PIXI.Point();
        const inv2   = new PIXI.Point();
        const global = new PIXI.Point();

        const ctx1 = ensureContext(firstBitmap);
        const ctx2 = ensureContext(secondBitmap);

        const sampleStep = 0.5;

        for (let x = startX; x < endX; x += sampleStep) {
            for (let y = startY; y < endY; y += sampleStep) {
                global.set(x, y);

                firstSprite.worldTransform.applyInverse(global, inv1);
                const px1 = Math.floor(inv1.x + ax1);
                const py1 = Math.floor(inv1.y + ay1);
                
                if (px1 < 0 || py1 < 0 || px1 >= firstBitmap.width || py1 >= firstBitmap.height) {
                    continue;
                }
                
                const pixel1 = ctx1.getImageData(px1, py1, 1, 1).data;
                if (pixel1[3] < 128) {
                    continue;
                }

                secondSprite.worldTransform.applyInverse(global, inv2);
                const px2 = Math.floor(inv2.x + ax2);
                const py2 = Math.floor(inv2.y + ay2);
                
                if (px2 < 0 || py2 < 0 || px2 >= secondBitmap.width || py2 >= secondBitmap.height) {
                    continue;
                }
                
                const pixel2 = ctx2.getImageData(px2, py2, 1, 1).data;
                if (pixel2[3] < 128) {
                    continue;
                }

                return true;
            }
        }

        return false;
    }

    function isIrregularPicturesColliding(firstPictureId, secondPictureId) {
        if (!isRegularPicturesColliding(firstPictureId, secondPictureId)) {
            return false;
        }

        const firstSprite = phileasCollisionPictures[firstPictureId];
        const secondSprite = phileasCollisionPictures[secondPictureId];

        return isPixelColliding(firstSprite, secondSprite);
    }

    function isColliding(params) {
        const firstPictureId = Number(params["firstPictureId"]);
        const secondPictureId = Number(params["secondPictureId"]);
        const resultSwitchId = Number(params["resultSwitchId"]);
        const ignoreTransparentPixels = params["ignoreTransparentPixels"] == "true";
        
        const result = ignoreTransparentPixels
            ? isIrregularPicturesColliding(firstPictureId, secondPictureId)
            : isRegularPicturesColliding(firstPictureId, secondPictureId);
        
        $gameSwitches.setValue(resultSwitchId, result);
    }

//--------MODIFIED CODE:
    Origin_SpriteInitialize = Sprite_Picture.prototype.initialize;
    Sprite_Picture.prototype.initialize = function(pictureId) {
        phileasCollisionPictures[pictureId] = this;
        Origin_SpriteInitialize.call(this, pictureId);
    };
}());
