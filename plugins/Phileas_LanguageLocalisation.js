//=============================================================================
// Phileas_LanguageLocalisation.js
//=============================================================================
// [Update History]
// 2024.November.09 Ver1.0.0 First Release
// 2024.November.16 Ver1.1.0 Added media localization

/*:
 * @target MZ
 * @plugindesc Language localizations of text in the game
 * @author Phileas
 * 
 * @param option
 * @text Option label
 * @desc The label for the language selection option. Can be a translatable text ${<text code>}
 * @type string
 * @default Languages
 * 
 * @param languages
 * @text Languages
 * @desc The list of the languages used in the game
 * @type struct<language>[]
 * @default []
 * 
 * @param files
 * @text Language files
 * @desc The list of the JSON files (without extension) Separate the path with the symbol '/'
 * @type string[]
 * @default []
 *
 * 
 * @command setLanguage
 * @text Set the language
 * @desc Changes the current language localization
 *
 * @arg id
 * @text Language ID
 * @type number
 * @min 0
 * @desc The index of the language in the list in the "Languages" parameter, starting from 0
 * @default 0
 * 
 * 
 * @help
 * 
 * The plugin allows to translate all the text in the game into many languages.
 *
 * To support custom fonts, install the Phileas_CustomFonts plugin.
 * 
 * Use the Phileas_TextWrap plugin to automatically move words to a new line.
 * 
 * If you are using the Phileas_OptionsManager plugin, place it above
 * the real plugin in the Plugin Manager menu.
 * 
 *-----------------------------------------------------------------------------
 * MANUAL
 * 
 * 1. Configure the "Languages" parameter. Set the language codes. 
 *    It is important that they are unique.
 * 
 * 2. Create a "languages" folder in the root of the project.
 * 
 * 3. In the "languages" folder, create language folders, name
 *    Each folder must match the language code.
 * 
 * 4. Create a "main.json" file in each language folder.
 *    It will store the root properties of the language dictionary.
 *    There must be an object (curly brackets) at the root of this file.
 * 
 * 4. Configure the "Language files" parameter.
 *    A set of files the same for all languages.
 *    Do not use the name "main.json", it is used
 *    for root properties.
 *    You can use unlimited level directories nesting.
 *    In the list, separate the file path with the '/' character.
 * 
 * 5. In each language folder, create files with names that
 *    you have specified in the parameter "Language files".
 *    At the root of the file should be either an object
 *    (curly brackets) or an array (square brackets).
 * 
 * 6. Fill in the localization files with text.
 *    The structures of all objects must match,
 *    only the final string values can differ.
 * 
 * 7. To use localized text in the game, type a line
 *    like this in the right place:
 * 
 *    ${<text code>}
 * 
 *    <text code>
 *    The text code should lead to the value in the localization files.
 * 
 * 8. The properties specified in "languages/<text code>/main.json",
 *    will be at the root of the localization dictionary.
 *    For example, if main is set like this:
 * 
 *    {
 *        "yes": "Yes"
 *    }
 * 
 *    To use this value, type this:
 *    ${yes}
 * 
 * 9. If the property is specified in another file,
 *    then you need to specify the path to the file before its name.
 *    For example, if you have a file with the path
 *    "../languages/<text code>/chapter_1/dialogues.json"
 *    and such a structure:
 * 
 *    {
 *        "point_0": "Реплика"
 *    }
 * 
 *    To use this value, type this:
 *    ${chapter_1.dialogues.point_0}
 * 
 * 10. In addition to objects, you can use arrays.
 *     Let's change the example from point 9:
 *     
 *     {
 *        "point_0":
 *        [
 *            "Hello",
 *            "Bye"
 *        ]
 *     }
 * 
 *     To use these values, type this:
 *     ${chapter_1.dialogues.point_0[0]}
 *     ${chapter_1.dialogues.point_0[1]}
 * 
 * 11. The array can be located right at the root of the localization file
 *     (except for the "main.json").
 *     Let's change the example from paragraph 10:
 * 
 *     [
 *        [
 *            "Hello",
 *            "Bye"
 *        ]
 *     ]
 * 
 *     To use these values, type this:
 *     ${chapter_1.dialogues[0][0]}
 *     ${chapter_1.dialogues[0][1]}
 * 
 * 12. You can optionally nest objects and arrays into each other.
 *     The nesting level is unlimited!
 * 
 * 13. You can also use the translated text inside the translated text:
 *     
 *     "first_text": "Simple example",
 *     "second_text": "The first text is ${first_text}."
 * 
 * 14. To use control symbols to set text, use a variable,
 *     icon, and more, add a second slash:
 *     
 *     \C[0] -> \\C[0] OR \V[1] -> \\V[1] OR \. -> \\.
 * 
 * 15. The plugin provides the following commands:
 *     - "Set the language" - changes the current language localization.
 * 
 *-----------------------------------------------------------------------------
 * LOCALIZED RESOURCES (MEDIA)
 * 
 * You can use different files (audio, images, video) for each language.
 * 
 * The function works for all types of images (animations, pictures,
 * tilesets and others), all types of audio (BGM, BGS, ME, SE)
 * and video (movies).
 * 
 * Manual:
 * 1. The language specified first in the "Languages" parameter
 *    is considered the default language.
 *    For example, the default language may be with the code "en".
 * 2. Place the media file to the directory you need.
 *    This should be a file for the default language.
 *    For example, you can execute an image in the "img/pictures" directory.
 *    Let it be "a.png":
 *    "img/pictures/a.png"
 * 3. If you want another image for a different language to appear
 *    instead of this image, create a folder in the same directory.
 *    Its name must match the code of the desired language. Example:
 *    "img/pictures/ru".
 * 4. In this new directory, create a media file with the same name
 *    and relative path:
 *    "img/pictures/ru/a.png".
 * 5. In the "Show Picture" command, select the file for the default language.
 *    If a second language is enabled in the game settings,
 *    a picture for this language will appear.
 * 6. You don't have to create a separate file for each language.
 *    If a file for any language is not found,
 *    the file for the default language will be used. 
 * 7. You can use subfolders. Then the relative paths must match. Example:
 *    "img/pictures/sub_folder/b.png"
 *    "img/pictures/ru/sub_folder/b.png"
 * 
 *-----------------------------------------------------------------------------
 * DEMO PROJECT
 * The plugin has a demo project.
 * Please review it if you still have questions about using the plugin:
 * https://rpgmakerunion.ru/game/phileass-language-localisation-demo.33521384
 * 
 *-----------------------------------------------------------------------------
 * NOTE
 * 
 * This plugin is a completely rewritten and expanded version of the
 * "Open Digital World - Multi-Language System" plugin.
 * 
 * You can always write to the author if you need other features or even plugins.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 *-----------------------------------------------------------------------------
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */

/*~struct~language:
 * @param code
 * @text Language сode
 * @desc String identifier of the language
 * @type string
 * @default en
 * 
 * @param label
 * @text Label
 * @desc The label of this language, in its original translation (displayed as a language selection option).
 * @type string
 * @default English
 * 
 * @param fontName
 * @text Font name
 * @desc The font name used as the main font for this language.
 * @type string
 * @default rmmz-mainfont
 * 
 * @param fontSize
 * @text Font size
 * @desc The font size used for the main font for this language, a value between 12 and 108.
 * @type number
 * @min 12
 * @max 108
 * @default 26
 * 
 * @param coreTexts
 * @text Core texts
 * @desc Hardcoded game engine texts that cannot be translated from the database.
 * 
 * @param missText
 * @parent coreTexts
 * @text Miss text
 * @desc A miss in battle. Can be a translatable text ${<text code>}.
 * @type string
 * @default Miss
 * 
 * @param onText
 * @parent coreTexts
 * @text ON text
 * @desc The "ON" wording of the option value. Can be a translatable text ${<text code>}.
 * @type string
 * @default ON
 * 
 * @param offText
 * @parent coreTexts
 * @text OFF text
 * @desc The "OFF" wording of the option value. Can be a translatable text ${<text code>}.
 * @type string
 * @default OFF
 * 
 */

/*:ru
 * @target MZ
 * @plugindesc Языковые локализации текста в игре
 * @author Phileas
 * 
 * @param option
 * @text Надпись опции
 * @desc Надпись опции выбора языка. Может быть переводимым текстом ${<текстовый код>}
 * @type string
 * @default Languages
 * 
 * @param languages
 * @text Языки
 * @desc Список языков, используемых в игре
 * @type struct<language>[]
 * @default []
 * 
 * @param files
 * @text Файлы языка
 * @desc Список JSON файлов (без расширения). Путь разделяйте символом '/'
 * @type string[]
 * @default []
 *
 * 
 * @command setLanguage
 * @text Установить язык
 * @desc Изменяет текущую языковую локализацию
 *
 * @arg id
 * @text ID языка
 * @type number
 * @min 0
 * @desc Индекс языка в списке в параметре "Языки", начинающийся с 0
 * @default 0
 * 
 * 
 * @help
 * 
 * Плагин позволяет перевести весь текст в игре на множество языков.
 * 
 * Для поддержки кастомных шрифтов установите плагин Phileas_CustomFonts.
 * 
 * Используйте плагин Phileas_TextWrap для автоматического переноса
 * слов на новую строку.
 * 
 * Если вы используете плагин Phileas_OptionsManager, расположите его выше
 * настоящего плагина в меню менеджера плагинов.
 * 
 *-----------------------------------------------------------------------------
 * ИНСТРУКЦИЯ
 * 
 * 1. Настройте параметр "Языки". Задайте коды языков. 
 *    Важно, чтобы они были уникальными.
 * 
 * 2. В корне проекта создайте папку "languages".
 * 
 * 3. В папке "languages" создайте папки языков, название
 *    каждой папки должно совпадать с кодом языка.
 * 
 * 4. В каждой папке языка создайте файл "main.json".
 *    В нём будут хранится корневые свойства словаря языка.
 *    В корне этого файла должен быть объект (фигурные скобки).
 * 
 * 4. Настройте параметр "Файлы языка". Набор файлов
 *    одинаковый для всех языков.
 *    Не используйте название "main.json", оно используется
 *    для корневых свойств.
 *    Вы можете использовать директории неограниченного уровня
 *    вложенности. В списке путь к файлу разделяйте символом '/'.
 * 
 * 5. В каждой папке языка создайте файлы с названиями, которые
 *    вы указали в параметре "Файлы языка". В корне файла должен
 *    быть либо объект (фигурные скобки), либо массив (квадратные скобки).
 * 
 * 6. Заполните файлы локализаций текстом. Структуры всех объектов должны
 *    совпадать, отличаться могут только конечные строковые значения.
 * 
 * 7. Чтобы использовать локализованный текст в игре, введите в нужном
 *    месте строку такого вида:
 * 
 *    ${<текстовый код>}
 * 
 *    <текстовый код>
 *    Текстовый код должен вести к значению в файлах локализации.
 * 
 * 8. Свойства, указанные в "languages/<код языка>/main.json",
 *    будут лежать в корне словаря локализации.
 *    К примеру, если main задан вот так:
 * 
 *    {
 *        "yes": "Да"
 *    }
 * 
 *    Чтобы использовать это значение, введите это:
 *    ${yes}
 * 
 * 9. Если свойство указано в другом файле, то перед его названием нужно
 *    прописать путь к файлу. К примеру, если у вас есть файл с
 *    путём "../languages/<код языка>/chapter_1/dialogues.json"
 *    и такой структурой:
 * 
 *    {
 *        "point_0": "Реплика"
 *    }
 * 
 *    Чтобы использовать это значение, введите это:
 *    ${chapter_1.dialogues.point_0}
 * 
 * 10. Помимо объектов, вы можете использовать массивы. Изменим
 *     пример из пункта 9:
 *     
 *     {
 *        "point_0":
 *        [
 *            "Привет",
 *            "Пока"
 *        ]
 *     }
 * 
 *     Чтобы использовать эти значения, введите это:
 *     ${chapter_1.dialogues.point_0[0]}
 *     ${chapter_1.dialogues.point_0[1]}
 * 
 * 11. Массив может лежать прямо в корне файла локализации
 *     (кроме файла "main.json"). Изменим пример из пункта 10:
 * 
 *     [
 *        [
 *            "Привет",
 *            "Пока"
 *        ]
 *     ]
 * 
 *     Чтобы использовать эти значения, введите это:
 *     ${chapter_1.dialogues[0][0]}
 *     ${chapter_1.dialogues[0][1]}
 * 
 * 12. Вы можете произвольно вкладывать объекты и массивы
 *     друг в друга. Уровень вложенности не ограничен!
 * 
 * 13. Вы также можете использовать переводимый текст внутри
 *     переводимого текста:
 *     
 *     "first_text": "Простой пример",
 *     "second_text": "Первый текст - ${first_text}."
 * 
 * 14. Чтобы использовать символы управления для установки
 *     текста, использования переменной, иконки и прочего,
 *     добавляйте второй слэш:
 *     
 *     \C[0] -> \\C[0] ИЛИ \V[1] -> \\V[1] ИЛИ \. -> \\.
 * 
 * 15. Плагин предоставляет следующие команды:
 *     - "Установить язык" - изменяет текущую языковую локализацию.
 * 
 *-----------------------------------------------------------------------------
 * ЛОКАЛИЗОВАННЫЕ РЕСУРСЫ (МЕДИА)
 * 
 * Вы можете использовать разные файлы (аудио, изображения, видео)
 * для каждого языка.
 * 
 * Функция работает для всех типов изображений (animations, pictures,
 * tilesets и остальных), всех типов аудио (BGM, BGS, ME, SE) и
 * видео (movies).
 * 
 * Инструкция:
 * 1. Язык, указанный первым в параметре "Языки", считается
 *    языком по умолчанию.
 *    К примеру, язык по умолчанию может быть с кодом "en".
 * 2. Расположите медиа-файл в нужной вам директории. Это должен
 *    быть файл для языка по умолчанию.
 *    К примеру, вы можете положить изображение в директорию
 *    "img/pictures". Пусть это будет "a.png":
 *    "img/pictures/a.png"
 * 3. Если вы хотите, чтобы для другого языка вместо этого
 *    изображения отображалось другое, в этой же директории
 *    создайте папку. Её название должно совпадать с
 *    кодом нужного языка. Пример: "img/pictures/ru".
 * 4. В этой новой директории создайте медиа-файл с таким же
 *    именем и относительным путём:
 *    "img/pictures/ru/a.png".
 * 5. В команде "Показать картинку" выберете файл для языка
 *    по умолчанию. Если в настройках игры будет включён
 *    второй язык, отобразится картинка для него.
 * 6. Вам необязательно создавать отдельный файл для каждого
 *    языка. Если файл для какого-то языка не будет найден,
 *    будет использоваться файл для языка по умолчанию.
 * 7. Вы можете использовать подпапки. Тогда относительные
 *    пути должны совпадать. Пример:
 *    "img/pictures/sub_folder/b.png"
 *    "img/pictures/ru/sub_folder/b.png"
 * 
 *-----------------------------------------------------------------------------
 * ДЕМО ПРОЕКТ
 * У плагина есть демонстрационный проект. Пожалуйста, ознакомьтесь с ним,
 * если у вас остались вопросы по использованию плагина:
 * https://rpgmakerunion.ru/game/phileass-language-localisation-demo.33521384
 * 
 * 
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 * 
 *-----------------------------------------------------------------------------
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих
 * и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 * 
 */

/*~struct~language:ru
 * @param code
 * @text Код языка
 * @desc Строковый идентификатор языка 
 * @type string
 * @default en
 * 
 * @param label
 * @text Надпись
 * @desc Название этого языка в его оригинальном переводе (отображается в качестве опции выбора языка)
 * @type string
 * @default English
 * 
 * @param fontName
 * @text Шрифт
 * @desc Название шрифта, используемого в качестве основного шрифта для данного языка
 * @type string
 * @default rmmz-mainfont
 * 
 * @param fontSize
 * @text Размер шрифта
 * @desc Размер шрифта, используемый в качестве основного шрифта для данного языка
 * @type number
 * @min 12
 * @max 108
 * @default 26
 * 
 * @param coreTexts
 * @text Базовые тексты
 * @desc Жестко закодированные тексты дживка, которые невозможно указать в БД
 * 
 * @param missText
 * @parent coreTexts
 * @text Текст промаха
 * @desc Промах в бою. Может быть переводимым текстом ${<текстовый код>}
 * @type string
 * @default Miss
 * 
 * @param onText
 * @parent coreTexts
 * @text ON text
 * @desc Значение опции "Включено". Может быть переводимым текстом ${<текстовый код>}
 * @type string
 * @default ON
 * 
 * @param offText
 * @parent coreTexts
 * @text OFF text
 * @desc Значение опции "Выключено. Может быть переводимым текстом ${<текстовый код>}
 * @type string
 * @default OFF
 * 
 */

(function () {

//--------MY CODE:

//-----------------------------------------------------------------------------
// Constants

    const FOLDER = "languages";
    const MAIN_FILE = "main";

//-----------------------------------------------------------------------------
// Data

    var parameters = PluginManager.parameters("Phileas_LanguageLocalisation");
    var option = parameters["option"];
    var languages = loadLanguages();
    var files = loadFiles();
    
    ConfigManager.phileasLanguageIndex = 0;

    var languageData = {};

//-----------------------------------------------------------------------------
// Main

    function loadLanguages() {
        let langs = JSON.parse(parameters["languages"]);

        for (var i = 0; i < langs.length; ++i) {
            langs[i] = JSON.parse(langs[i]);
            langs[i].fontSize = Number(langs[i].fontSize);
        }

        return langs;
    }

    function loadFiles() {
        var filesList = JSON.parse(parameters["files"]);
        return [MAIN_FILE].concat(filesList);
    }

    function loadLanguageData() {
        languageData = {};
        const language = getCurrentLanguage();

        for (const file of files) {
            const id = language.index;
            const url = FOLDER.concat("/") + language.code.concat("/") + file.concat(".json");
            DataManager.phileasLoadLanguageFile(id, url, file);
        }
    }

    function getText(originalText) {
        const regex = /\${([\w|\.\[\]0-9]+)}/gm;
        let regexParts;
        let newText = originalText;

        while ((regexParts = regex.exec(originalText)) != null) {
            const langData = getLanguageData(languageData, regexParts[1]);
            newText = newText.replace(regexParts[0], langData);
        }

        return newText;
    }

    function getLanguageData(data, textCode) {
        if (data == undefined) {
            return textCode;
        }

        if (textCode == "") {
            return data;
        }

        const arrayI = textCode.indexOf("[");
        const dictI = textCode.indexOf(".");

        if (arrayI == -1 && dictI == -1) {
            if (data.hasOwnProperty(textCode)) {
                return data[textCode];
            }
    
            return textCode;
        }

        if (dictI == -1 || arrayI != -1 && arrayI < dictI) {
            return getLanguageDataArrayItem(data, textCode, arrayI);
        }

        const key = textCode.substring(0, dictI);

        if (!data.hasOwnProperty(key)) {
            return textCode;
        }

        data = data[key];
        textCode = textCode.substring(dictI + 1);
        return getLanguageData(data, textCode);
    }

    function getLanguageDataArrayItem(data, textCode, arrayI) {
        const key = textCode.substring(0, arrayI);

        if (!data.hasOwnProperty(key)) {
            return textCode;
        }

        data = data[key];

        const arrayJ = textCode.indexOf("]");
        const id = Number(textCode.substring(arrayI + 1, arrayJ));

        if (!Array.isArray(data) || id < 0 || id >= data.length) {
            return textCode;
        }

        data = data[id];
        textCode = textCode.substring(arrayJ + 1);

        return getLanguageData(data, textCode);
    }

    function getCurrentIndex() {
        return ConfigManager["phileasLanguageIndex"];
    }

    function getPreviousIndex() {
        return (ConfigManager["phileasLanguageIndex"] + languages.length - 1) % languages.length;
    }

    function getNextIndex() {
        return (ConfigManager["phileasLanguageIndex"] + 1) % languages.length;
    }

    function getCurrentLanguage() {
        return languages[getCurrentIndex()];
    }

    function getLabel(index) {
        return languages[index].label;
    }

    function getCurrentFontName() {
        return getCurrentLanguage().fontName;
    }

    function getCurrentFontSize() {
        return getCurrentLanguage().fontSize;
    }

    function getCurrentMissText() {
        return getCurrentLanguage().missText;
    }

    function getCurrentOnText() {
        return getCurrentLanguage().onText;
    }

    function getCurrentOffText() {
        return getCurrentLanguage().offText;
    }

    function updateGameTitle() {
        document.title = getText($dataSystem.gameTitle);
    }

    function getLocalizationImageFolder(folder, filename) {
        const languageId = getCurrentIndex();

        if (languageId == 0) {
            return folder;
        }

        const newFolder = folder + getCurrentLanguage().code + "/";

        const fs = require("fs");
        return fs.existsSync(newFolder + filename)
            ? newFolder
            : folder;
    }

    function getLocalizationAudioFolder(folder, filename) {
        const languageId = getCurrentIndex();

        if (languageId == 0) {
            return folder;
        }

        const newFolder = folder + getCurrentLanguage().code + "/";

        const fs = require("fs");
        return fs.existsSync("audio/" + newFolder + filename)
            ? newFolder
            : folder;
    }

    function getLocalizationMovieSrc(src) {
        const languageId = getCurrentIndex();

        if (languageId == 0) {
            return src;
        }

        const id = src.indexOf("/");
        const dir = src.substring(0, id + 1);
        const file = src.substring(id);
        const newSrc = dir + getCurrentLanguage().code + file;

        const fs = require("fs");
        return fs.existsSync(newSrc)
            ? newSrc
            : src;
    }
 
    DataManager.phileasLoadLanguageFile = function(id, url, file) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "json";
        xhr.onload = () => this.phileasOnLanguageFileLoad(xhr, id, url, file);
        xhr.onerror = () => this.phileasOnLanguageFileError(id, url, "File not found.");
        xhr.send();
    };
    
    DataManager.phileasOnLanguageFileLoad = function(xhr, id, url, file) {
        if (xhr.status >= 400) {
            this.phileasOnLanguageFileError(id, url, "Xhr status " + xhr.status);
            return;
        }
    
        try {
            if (file == MAIN_FILE) {
                languageData = xhr.response;
                return;
            }

            path = file.split("/");
            let lastDict = languageData;

            for (let i = 0; i + 1 < path.length; ++i) {
                if (lastDict[path[i]] == undefined) {
                    lastDict[path[i]] = {};
                }

                lastDict = lastDict[path[i]];
            }

            lastDict[path[path.length - 1]] = xhr.response;
        } catch (e) {
            this.phileasOnLanguageFileError(id, url, e);
        }
    };
    
    DataManager.phileasOnLanguageFileError = function(id, url, e) {
        this._errors.push({id, url, e});
    };

//-----------------------------------------------------------------------------
// Commands

    PluginManager.registerCommand("Phileas_LanguageLocalisation", "setLanguage", setLanguage);

    function setLanguage(params) {
        const id = Number(params["id"]);
        ConfigManager["phileasLanguageIndex"] = id;
        ConfigManager.save();
        loadLanguageData();
    }


//--------CHANGED CORE:

//-----------------------------------------------------------------------------
// Core

    const Origin_Bitmap_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
        Origin_Bitmap_drawText.call(this, getText(text), x, y, maxWidth, lineHeight, align);
    };

    const Video_play = Video.play;
    Video.play = function(src) {
        src = getLocalizationMovieSrc(src);
        Video_play.call(this, src);
    };

//-----------------------------------------------------------------------------
// Sprites

Sprite_Damage.prototype.createMiss = function() {
    const h = this.fontSize();
    const w = Math.floor(h * 3.0);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.drawText(getCurrentMissText(), 0, 0, w, h, "center");
    sprite.dy = 0;
};

//-----------------------------------------------------------------------------
// Objects

    const Origin_Game_System_mainFontFace = Game_System.prototype.mainFontFace;;
    Game_System.prototype.mainFontFace = function() {
        const languageFontName = getCurrentFontName();
        if (languageFontName) {
            return languageFontName + ", " + $dataSystem.advanced.fallbackFonts;
        } else {
            return Origin_Game_System_mainFontFace.call(this);
        }
    };

    const Origin_Game_System_mainFontSize = Game_System.prototype.mainFontSize;
    Game_System.prototype.mainFontSize = function() {
        const languageFontSize = getCurrentFontSize();
        if (languageFontSize > 0) {
            return languageFontSize;
        } else {
            return Origin_Game_System_mainFontSize.call(this);
        }
    };

    const Origin_Game_Message_add = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
        Origin_Game_Message_add.call(this, getText(text));
    };

    const Origin_Game_Message_setChoices = Game_Message.prototype.setChoices;
    Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
        choices = choices.map(choice => getText(choice));
        Origin_Game_Message_setChoices.call(this, choices, defaultType, cancelType);
    };
    
//-----------------------------------------------------------------------------
// Scenes

    const Origin_Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        Origin_Scene_Boot_onDatabaseLoaded.call(this);
        loadLanguageData();
        setTimeout(function(){
            updateGameTitle();
        }, 100);
    };

    Scene_Boot.prototype.updateDocumentTitle = function() {
        updateGameTitle();
    };

//-----------------------------------------------------------------------------
// Windows

    const Origin_Window_Base_textWidth = Window_Base.prototype.textWidth;
    Window_Base.prototype.textWidth = function(text) {
        return Origin_Window_Base_textWidth.call(this, getText(text));
    };

    const Origin_Window_Base_createTextState = Window_Base.prototype.createTextState;
    Window_Base.prototype.createTextState = function(text, x, y, width) {
        return Origin_Window_Base_createTextState.call(this, getText(text), x, y, width);
    };

    const Origin_Window_Base_actorName = Window_Base.prototype.actorName;
    Window_Base.prototype.actorName = function(n)  {
        return getText(Origin_Window_Base_actorName.call(this, n));
    };

    const Origin_Window_Base_partyMemberName = Window_Base.prototype.partyMemberName;
    Window_Base.prototype.partyMemberName = function(n) {
        return getText(Origin_Window_Base_partyMemberName.call(this, n));
    };
    
    const Origin_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        return getText(Origin_Window_Base_convertEscapeCharacters.call(this, text));
    };

    Window_Options.prototype.booleanStatusText = function(value) {
        return value ? getCurrentOnText() : getCurrentOffText();
    };

    const Origin_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        Origin_Window_Options_makeCommandList.call(this);
        this.addCommand(getText(option), "phileasLanguageIndex");
    };
    
    const Origin_Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);

        if (symbol === "phileasLanguageIndex") {
            return getLabel(value);
        }

        return Origin_Window_Options_statusText.call(this, index);
    };
    
    const Origin_Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === "phileasLanguageIndex") {
            this.changeValue(symbol, getNextIndex());
            this.phileasRefreshLanguage();
        } else {
            Origin_Window_Options_processOk.call(this);
        }
    };

    const Origin_Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === "phileasLanguageIndex") {
            this.changeValue(symbol, getNextIndex());
            this.phileasRefreshLanguage();
        } else {
            Origin_Window_Options_cursorRight.call(this);
        }
    };

    const Origin_Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === "phileasLanguageIndex") {
            this.changeValue(symbol, getPreviousIndex());
            this.phileasRefreshLanguage();
        } else {
            Origin_Window_Options_cursorLeft.call(this);
        }
    };

    Window_Options.prototype.phileasRefreshLanguage = function() {
        loadLanguageData();
        this.resetFontSettings();
        setTimeout(() => {
            updateGameTitle();    
            if (SceneManager._scene._optionsWindow) {
                SceneManager._scene._optionsWindow.refresh();
            }
        }, 100);
    };

    const Origin_Window_NameEdit_setup = Window_Options.prototype.setup;
    Window_NameEdit.prototype.setup = function(actor, maxLength) {
        Origin_Window_NameEdit_setup.call(this, actor, maxLength);
        this._name = getText(this._name).slice(0, this._maxLength);
        this._index = this._name.length;
    };

//-----------------------------------------------------------------------------
// Managers

    const Origin_ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = Origin_ConfigManager_makeData.call(this);
        config.phileasLanguageIndex = this.phileasLanguageIndex;
        return config;
    };

    const Origin_ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        Origin_ConfigManager_applyData.call(this, config);
        this.phileasLanguageIndex = config["phileasLanguageIndex"] || 0;
    };

    const Origin_TextManager_basic = TextManager.basic;
    TextManager.basic = function(basicId) {
        return getText(Origin_TextManager_basic.call(this, basicId));
    };

    const Origin_TextManager_param = TextManager.param;
    TextManager.param = function(paramId) {
        return getText(Origin_TextManager_param.call(this, paramId));
    };

    const Origin_TextManager_command = TextManager.command;
    TextManager.command = function(commandId) {
        return getText(Origin_TextManager_command.call(this, commandId));
    };

    const Origin_TextManager_message = TextManager.message;
    TextManager.message = function(messageId) {
        return getText(Origin_TextManager_message.call(this, messageId));
    };

    Object.defineProperty(TextManager, "currencyUnit", {
        get: function() {
            return getText($dataSystem.currencyUnit);
        },
        configurable: true
    });

    const Origin_ImageManager_loadBitmap = ImageManager.loadBitmap;
    ImageManager.loadBitmap = function(folder, filename) {
        folder = getLocalizationImageFolder(folder, filename + ".png");
        return Origin_ImageManager_loadBitmap.call(this, folder, filename);
    };

    const Origin_AudioManager_createBuffer = AudioManager.createBuffer;
    AudioManager.createBuffer = function(folder, name) {
        folder = getLocalizationAudioFolder(folder, name + AudioManager.audioFileExt());
        return Origin_AudioManager_createBuffer.call(this, folder, name);
    };

}());
