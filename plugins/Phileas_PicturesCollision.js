//=============================================================================
// Phileas_PicturesCollision.js
//=============================================================================
// [Update History]
// 2024.March.10 Ver1.0.0 First Release
// 2025.June.13 Ver1.1.0 Added a collision check with ignoring transparent pixels
// 2025.June.14 Ver1.1.1 Optimized pixel-by-pixel collision calculation

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

//-----------------------------------------------------------------------------
// MY CODE
    const phileasCollisionPictures = {};

    PluginManager.registerCommand("Phileas_PicturesCollision", "isColliding", isColliding);

    function makeRect(x, y, xx, yy) {
        const rect = new Object();
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
        if (bitmap._context) {
            return bitmap._context;
        }

        const canvas = document.createElement("canvas");
        canvas.width  = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext("2d");

        const src = bitmap._image
            || (bitmap.baseTexture
                && bitmap.baseTexture.resource 
                && bitmap.baseTexture.resource.source);

        if (src) {
            context.drawImage(src, 0, 0);
        }

        bitmap._canvas  = canvas;
        bitmap._context = context;

        return bitmap._context;
    }

    function ensureMask(bitmap) {
        if (bitmap._maskData) {
            return bitmap._maskData;
        }

        const context = ensureContext(bitmap);
        const { width, height } = bitmap;
        const img = context.getImageData(0, 0, width, height).data;
        const mask = new Uint8Array(width * height);

        for (let i = 0, p = 3; i < mask.length; i++, p += 4) {
            mask[i] = img[p] >= 128 ? 1 : 0;
        }

        bitmap._maskData = mask;

        return bitmap._maskData;
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
        const right  = Math.min(b1.x + b1.width,  b2.x + b2.width);
        const top    = Math.max(b1.y, b2.y);
        const bottom = Math.min(b1.y + b1.height, b2.y + b2.height);

        if (right <= left || bottom <= top) {
            return false;
        }

        const inv1 = new PIXI.Point();
        const tmp  = new PIXI.Point();
        const ax1  = firstSprite.anchor.x * firstBitmap.width;
        const ay1  = firstSprite.anchor.y * firstBitmap.height;

        tmp.set(left, top);
        firstSprite.worldTransform.applyInverse(tmp, inv1);
        const minX = Math.max(0, Math.floor(inv1.x + ax1));
        const minY = Math.max(0, Math.floor(inv1.y + ay1));

        tmp.set(right, bottom);
        firstSprite.worldTransform.applyInverse(tmp, inv1);
        const maxX = Math.min(firstBitmap.width,  Math.ceil(inv1.x + ax1));
        const maxY = Math.min(firstBitmap.height, Math.ceil(inv1.y + ay1));

        if (minX >= maxX || minY >= maxY) {
            return false;
        }

        const mask1 = ensureMask(firstBitmap);
        const mask2 = ensureMask(secondBitmap);

        const inv2 = secondSprite.worldTransform.clone().invert();
        const M    = inv2.clone().append(firstSprite.worldTransform);

        const w1  = firstBitmap.width;
        const w2  = secondBitmap.width;
        const h2  = secondBitmap.height;
        const ax2 = secondSprite.anchor.x * w2;
        const ay2 = secondSprite.anchor.y * h2;

        for (let y = minY; y < maxY; ++y) {
            const row1 = y * w1;
            for (let x = minX; x < maxX; ++x) {
                if (!mask1[row1 + x]) { 
                    continue;
                }

                const rx = x - ax1;
                const ry = y - ay1;
                const bx = (M.a * rx + M.c * ry + M.tx + ax2) | 0;
                const by = (M.b * rx + M.d * ry + M.ty + ay2) | 0;

                if (bx < 0 || by < 0 || bx >= w2 || by >= h2) {
                    continue;
                }

                if (mask2[by * w2 + bx]) {
                    return true;
                }
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
