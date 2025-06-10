//=============================================================================
// Phileas_DestinationSprite.js
//=============================================================================
// [Update History]
// 2024.April.14 Ver1.0.0 First Release
// 2025.January.13 Ver1.0.1 Fixed invisible type

/*:
 * @target MZ
 * @plugindesc v1.0.1 Customize the destination sprite
 * @author Phileas
 *
 * @param type
 * @text Type
 * @type select
 * @option Invisible
 * @value invisible
 * @option Square
 * @value square
 * @option Frame
 * @value frame
 * @option Circle
 * @value circle
 * @option Ring
 * @value ring
 * @default square
 *
 * @param xOffset
 * @text Offset X
 * @type number
 * @min -1000
 * @default 0
 *
 * @param yOffset
 * @text Offset Y
 * @type number
 * @min -1000
 * @default 0
 *
 * @param color
 * @text Color
 * @desc Color in HEX, RGB or RGBA format.
 * @default #ffffff
 *
 * @param outlineColor
 * @text Outline color
 * @desc Color in HEX, RGB or RGBA format. Leave it blank for the default value.
 *
 * @param blendMode
 * @text Blend mode
 * @type select
 * @option normal
 * @value 0
 * @option add
 * @value 1
 * @default 1
 *
 * @param scale
 * @text Scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.00
 *
 * @param animation
 * @text Animation
 * @type struct<AnimStruct>
 * @default {"bounceRate":"20","minOpacity":"16","maxOpacity":"192","minScale":"0.15","maxScale":"1.50"}
 * 
 * @help
 * 
 * The default destination sprite is a white square that is displayed when you click on the map.
 * The plugin allows you to replace this sprite with a custom one.
 * The plugin does not provide commands. The configuration is carried out entirely through the plugin parameters.
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

/*~struct~AnimStruct:

 * @param bounceRate
 * @text Bounce rate
 * @desc Bounce effect rate. Less is faster.
 * @type number
 * @min 1
 * @default 20

 * @param minOpacity
 * @text Min opacity
 * @type number
 * @min 0
 * @default 16

 * @param maxOpacity
 * @text Max opacity
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param minScale
 * @text Min scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 0.15

 * @param maxScale
 * @text Max scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.50

*/
 
/*:ru
 * @target MZ
 * @plugindesc v1.0.1 Кастомизация спрайта назначения
 * @author Phileas
 *
 * @param type
 * @text Тип
 * @type select
 * @option Невидимый
 * @value invisible
 * @option Квадрат
 * @value square
 * @option Рамка
 * @value frame
 * @option Круг
 * @value circle
 * @option Кольцо
 * @value ring
 * @default square
 *
 * @param xOffset
 * @text Смещение по X
 * @type number
 * @min -1000
 * @default 0
 *
 * @param yOffset
 * @text Смещение по Y
 * @type number
 * @min -1000
 * @default 0
 *
 * @param color
 * @text Цвет
 * @desc Цвет в формате HEX, RGB или RGBA
 * @default #ffffff
 *
 * @param outlineColor
 * @text Цвет контура
 * @desc Цвет в формате HEX, RGB или RGBA. Оставьте пустым для значения по умолчанию.
 *
 * @param blendMode
 * @text Режим смешивания
 * @type select
 * @option normal
 * @value 0
 * @option add
 * @value 1
 * @default 1
 *
 * @param scale
 * @text Масштабирование
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.00
 *
 * @param animation
 * @text Анимация
 * @type struct<AnimStruct>
 * @default {"bounceRate":"20","minOpacity":"16","maxOpacity":"192","minScale":"0.15","maxScale":"1.50"}
 *
 * 
 * @help
 * 
 * Стандартный спрайт назначения - белый квадрат, который отображается при клике по карте.
 * Плагин позволяет заменить этот спрайт на кастомный.
 * Плагин не предоставляет команд. Конфигурация осуществляется полностью через параметры плагина.
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

/*~struct~AnimStruct:ru

 * @param bounceRate
 * @text Коэффициент отскока
 * @desc Коэффициент эффекта отскока. Меньше - быстрее.
 * @type number
 * @min 1
 * @default 20

 * @param minOpacity
 * @text Минимальная прозрачность
 * @type number
 * @min 0
 * @default 16

 * @param maxOpacity
 * @text Максимальная прозрачность
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param minScale
 * @text Минимальный масштаб
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 0.15

 * @param maxScale
 * @text Максимальный масштаб
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.50

*/


(function() {

//--------MY CODE:

    const parameters = PluginManager.parameters("Phileas_DestinationSprite");
    const type = parameters["type"] || "square";
    const xOffset = Number(parameters["xOffset"] || 0);
    const yOffset = Number(parameters["yOffset"] || 0);
    const color = parameters["color"] || "#ffffff";
    const outlineColor = parameters["outlineColor"] || "";
    const blendMode = Number(parameters["blendMode"] || 0);
    const scale = Number(parameters["scale"] || 0);
    const animation = parseAnimParam(parameters["animation"]);
    
    function parseAnimParam(params) {
        params = JSON.parse(params);
        let anim = {};
        anim.bounceRate = Number(params["bounceRate"] || 0);
        anim.minOpacity = Number(params["minOpacity"] || 0);
        anim.maxOpacity = Number(params["maxOpacity"] || 0);
        anim.minScale = Number(params["minScale"] || 0);
        anim.maxScale = Number(params["maxScale"] || 0);
        return anim;
    }

    function drawSquare(bitmap, size) {
        const side = scale * size;
        const coord = (size - side) / 2;
        bitmap.clearRect(coord, coord, side, side);
    }

    function drawFrame(bitmap, size) {
        drawSquare(bitmap);
        const side = scale * size - 8;
        const coord = ((size - side) / 2) + 4;
        bitmap.clearRect(coord, coord, side, side);
    }

    function drawCircle(bitmap, diameter) {
        const radius = diameter / 2;
        bitmap.drawCircle(radius, radius, Math.floor(scale * radius) - 1, color);
    }

    function drawRing(bitmap, diameter) {
        drawCircle(bitmap, diameter);
        const radius = diameter / 2;
        bitmap.drawCircle(radius, radius, Math.floor(scale * radius) - 4, "clear");
    }

    var drawer = null;
    switch (type) {
        case "square":
            drawer = drawSquare;
            break;
        case "frame":
            drawer = drawFrame;
            break;
        case "circle":
            drawer = drawCircle;
            break;
        case "ring":
            drawer = drawRing;
            break;
    }

    function drawDestSprite(width, height) {
        const size = Math.min(width, height);
        const bitmap = new Bitmap(size, size);
        if (outlineColor != "") {
            bitmap.outlineColor = outlineColor;
        }

        drawer(bitmap, size);
        return bitmap;
    }

//--------MODIFIED CODE:

    Sprite_Destination.prototype.createBitmap = function () {
        if (type == "invisible") {
            return;
        }

        this.bitmap = drawDestSprite($gameMap.tileWidth(), $gameMap.tileHeight());
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.blendMode = blendMode;
    }

    const Origin_updatePosition = Sprite_Destination.prototype.updatePosition;
    Sprite_Destination.prototype.updatePosition = function () {
        Origin_updatePosition.call(this);
        this.x += xOffset;
        this.y += yOffset;
    }

    Sprite_Destination.prototype.updateAnimation = function () {
        const animScale = (this._frameCount / animation.bounceRate + 0.25).clamp(animation.minScale, animation.maxScale);
        this._frameCount = (this._frameCount + 1) % animation.bounceRate;
        this.opacity = ((animation.bounceRate - this._frameCount) * 10).clamp(animation.minOpacity, animation.maxOpacity);
        this.scale.set(animScale, animScale);
    }

    const Origin_createDestination = Spriteset_Map.prototype.createDestination;
    Spriteset_Map.prototype.createDestination = function () {
        Origin_createDestination.call(this);
        if (type == "invisible") {
            if (this._destinationSprite && this._destinationSprite.parent) {
                this._destinationSprite.parent.removeChild(this._destinationSprite);
            }
        }
    }
}());
