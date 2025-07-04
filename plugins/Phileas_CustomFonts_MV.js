//=============================================================================
// Phileas_CustomFonts_MV.js
//=============================================================================
// [Update History]
// 2024.April.21 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 Assigns custom fonts to custom font families
 * @author Phileas
 *
 * @param fonts
 * @text Fonts
 * @type struct<FontStruct>[]
 * 
 * @help
 * The feature is useful if you use plugins that work with fonts. For example, a library plugin or a questlog.
 * Usually, these plugins do not load a custom font unless it is installed on the player's system.
 * 
 * For example, you have a paper.ttf font and you want to use it in the library plugin.
 * You can add a font to Phileas_CustomFonts_MV, specify "paper.ttf" in the "File" field, specify "BookFont" in the "Family" field.
 * After that, use "BookFont" in the settings of the desired plugin.
 *
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*~struct~FontStruct:
 * @param Filename
 * @text Filename
 * @dyfault mplus-2p-bold-sub.ttf
 *
 * @param Family
 * @text Family
 * @dyfault MyFont
 */

/*:ru
 * @target MZ
 * @plugindesc v1.0.0 Назначает кастомные шрифты кастомным семействам шрифтов
 * @author Phileas
 *
 * @param fonts
 * @text Шрифты
 * @type struct<FontStruct>[]
 * 
 * @help
 * Функция полезна, если вы используете плагины, которые работают со шрифтами. Например, плагин библиотеки или квестлога.
 * Как правило, эти плагины не загружают кастомный шрифт, если он не установлен в системе игрока.
 * 
 * К примеру, у вас шрифт paper.ttf и вы хотите его использовать в плагине библиотеки.
 * Вы можете добавить шрифт в Phileas_CustomFonts_MV, в поле "Файл" укажите "paper.ttf", в поле "Семейство" укажите "BookFont".
 * После этого используйте "BookFont" в настройках нужного плагина.
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */
 
/*~struct~FontStruct:ru
 * @param Filename
 * @text Файл
 * @dyfault mplus-2p-bold-sub.ttf
 *
 * @param Family
 * @text Семейство
 * @dyfault MyFont
 */

(function() {

    function loadFont(name, url) {
        var newFont = new FontFace(name, `url(fonts/${url})`);
        newFont.load().then(function(loadedFace) {
            document.fonts.add(loadedFace);
        }).catch(function(error) {
            console.error("Error loading font:", error);
        });
    }

    var parameters = PluginManager.parameters("Phileas_CustomFonts_MV");
    var fonts = JSON.parse(parameters["fonts"]);
    for (let i = 0; i < fonts.length; ++i) {
        fonts[i] = JSON.parse(fonts[i]);
        fonts[i].Filename = fonts[i].Filename.trim();
        fonts[i].Family = fonts[i].Family.trim();
        loadFont(fonts[i].Family, fonts[i].Filename);
    }
}());
