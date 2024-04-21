//=============================================================================
// Phileas_CustomFonts.js
//=============================================================================
// [Update History]
// 2024.April.21 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Assigns custom fonts to custom font families
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
 * For example, you have a paper.woff font and you want to use it in the library plugin.
 * You can add a font to Phileas_CustomFonts, specify "paper.woff" in the "File" field, specify "BookFont" in the "Family" field.
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
 * @dyfault mplus-2p-bold-sub.woff
 *
 * @param Family
 * @text Family
 * @dyfault MyFont
 */

/*:ru
 * @target MZ
 * @plugindesc Назначает кастомные шрифты кастомным семействам шрифтов
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
 * К примеру, у вас шрифт paper.woff и вы хотите его использовать в плагине библиотеки.
 * Вы можете добавить шрифт в Phileas_CustomFonts, в поле "Файл" укажите "paper.woff", в поле "Семейство" укажите "BookFont".
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
 * @dyfault mplus-2p-bold-sub.woff
 *
 * @param Family
 * @text Семейство
 * @dyfault MyFont
 */

(function() {
    var parameters = PluginManager.parameters("Phileas_CustomFonts");
    var fonts = JSON.parse(parameters["fonts"]);
    for (let i = 0; i < fonts.length; ++i) {
        fonts[i] = JSON.parse(fonts[i]);
        fonts[i].Filename = fonts[i].Filename.trim();
        fonts[i].Family = fonts[i].Family.trim();
        FontManager.load(fonts[i].Family, fonts[i].Filename);
    }
}());
