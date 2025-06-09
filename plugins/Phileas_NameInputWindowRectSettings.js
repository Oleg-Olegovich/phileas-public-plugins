//=============================================================================
// Phileas_NameInputWindowRectSettings.js
//=============================================================================
// [Update History]
// 2023.August.9 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Allows you to set custom name input window sizes and coordinates.
 * @author Phileas
 *
 * @param nameWindowWidth
 * @text Name window width (top window)
 * @type number
 * @default 0
 *
 * @param nameWindowHeight
 * @text Name window height (top window)
 * @type number
 * @default 0
 *
 * @param inputWindowWidth
 * @text Input window width (bottom window)
 * @type number
 * @default 0
 *
 * @param inputWindowHeight
 * @text Input window height (bottom window)
 * @type number
 * @default 0
 *
 * @param windowX
 * @text X coordinate
 * @desc X coordinate of the upper-left corner of the window.
 * @type number
 * @default 0
 *
 * @param windowY
 * @text Y coordinate
 * @desc Y coordinate of the upper-left corner of the window.
 * @type number
 * @default 0
 *
 * 
 * @help
 * [Summary]
 * If the value of the parameter is less than 1, then the default value is set.
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
 * @plugindesc Позволяет задать пользовательские размеры и координаты окна ввода имени.
 * @author Phileas
 *
 * @param nameWindowWidth
 * @text Ширина окна имени (верхнее окно)
 * @type number
 * @default 0
 *
 * @param nameWindowHeight
 * @text Высота окна имени (верхнее окно)
 * @type number
 * @default 0
 *
 * @param inputWindowWidth
 * @text Ширина окна ввода (нижнее окно)
 * @type number
 * @default 0
 *
 * @param inputWindowHeight
 * @text Высота окна ввода (нижнее окно)
 * @type number
 * @default 0
 *
 * @param windowX
 * @text X coordinate
 * @desc X-координата верхнего левого угла окна
 * @type number
 * @default 0
 *
 * @param windowY
 * @text Y coordinate
 * @desc Y-координата верхнего левого угла окна
 * @type number
 * @default 0
 *
 * 
 * @help
 * [Summary]
 * Если значение параметра меньше 1, устанавливается стандартное значение.
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(function() {

//--------DATA:
    var parameters = PluginManager.parameters("Phileas_NameInputWindowRectSettings");
    var nameWindowWidth = Number(parameters["nameWindowWidth"] || 0);
    var nameWindowHeight = Number(parameters["nameWindowHeight"] || 0);
    var inputWindowWidth = Number(parameters["inputWindowWidth"] || 0);
    var inputWindowHeight = Number(parameters["inputWindowHeight"] || 0);
    var windowX = Number(parameters["windowX"] || 0);
    var windowY = Number(parameters["windowY"] || 0);

//--------MODIFIED CODE:

    function calculateSize(defaultValue, plaginValue) {
        if (plaginValue < 1) {
            return defaultValue;
        }
        
        return plaginValue;
    }

    Origin_editWindowRect = Scene_Name.prototype.editWindowRect;
    Scene_Name.prototype.editWindowRect = function() {
        var rect = Origin_editWindowRect.call(this);
        rect.width = calculateSize(rect.width, nameWindowWidth);
        rect.height = calculateSize(rect.height, nameWindowHeight);
        rect.x = calculateSize(rect.x, windowX);
        rect.y = calculateSize(rect.y, windowY);
        return rect;
    };

    Origin_inputWindowRect = Scene_Name.prototype.inputWindowRect;
    Scene_Name.prototype.inputWindowRect = function() {
        var rect = Origin_inputWindowRect.call(this);
        rect.width = calculateSize(rect.width, inputWindowWidth);
        rect.height = calculateSize(rect.height, inputWindowHeight);
        rect.x = calculateSize(rect.x, windowX);
        rect.y = windowY < 1 ? rect.y : windowY + this._editWindow.height + 8;
        return rect;
    };
}());
