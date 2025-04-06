//=============================================================================
// Phileas_LanguageLocalisation.js
//=============================================================================
// [Update History]
// 2024.November.09 Ver1.0.0 First Release
// 2024.November.16 Ver1.1.0 Added media localization
// 2024.November.29 Ver1.2.0 Added language data export/import and language selection menu
// 2024.December.25 Ver1.2.1 Fixed text code decoding
// 2024.December.30 Ver1.2.2 Fixed name edit setup
// 2025.January.04 Ver1.2.3 Language selection menu customization
// 2025.January.12 Ver1.2.4 Added API method, battle test setup
// 2025.January.19 Ver1.2.5 Refactoring
// 2025.January.20 Ver1.2.6 Compatibility with TAA_BookMenu
// 2025.January.26 Ver1.2.7 Fixed data loading
// 2025.February.15 Ver1.3.0 Moved the xlsx library to a separate file
//                           Fixed title screen loading
//                           Fixed the operation of the plugin in the browser
//                           Removed files parameter
// 2025.March.15 Ver1.3.1 Added language selection menu text padding
// 2025.April.06 Ver1.3.2 Added file filtering

/*:
 * @target MZ
 * @plugindesc 1.3.0 Language localizations of text in the game
 * @author Phileas
 * 
 * @param option
 * @text Option label
 * @desc The label for the language selection option. Can be a translatable text ${<text code>}
 * @type string
 * @default Language
 * 
 * @param languages
 * @text Languages
 * @desc The list of the languages used in the game
 * @type struct<language>[]
 * @default []
 * 
 * @param languageSelectionMenuParent
 * @text Language selection menu
 * 
 * @param openLanuageSelectionMenu
 * @parent languageSelectionMenuParent
 * @text Open menu
 * @desc If ON, the language selection will open when the game is started for the first time. If OFF, the first language from the "Languages" parameter will be set
 * @type boolean
 * @default true
 * 
 * @param languageSelectionWindowMargin
 * @parent languageSelectionMenuParent
 * @text Language selection window margin
 * @desc The value is added to the margin items vertically
 * @type number
 * @default 32
 * 
 * @param languageSelectionTextPadding
 * @parent languageSelectionMenuParent
 * @text Language selection text padding
 * @desc The value is added to the padding items horizontally
 * @type number
 * @default 16
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
 * @command exportToXlsx
 * @text Export to XLSX
 * @desc Exports all language data to a table
 * 
 * @command importFromXlsx
 * @text Import from XLSX
 * @desc Imports all language data from the table. JSON files will be overwritten!
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
 * If the language is not selected when starting the game,
 * the plugin will display the language selection menu.
 * 
 * API methods for other plugins and script calls:
 * - Phileas_LanguageLocalization.getText
 * 
 *-----------------------------------------------------------------------------
 * INSTALLATION
 * 
 * For the plugin to work, you need to install Phileas's File Manager:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_FileManager.js
 * 
 * If you need commands to export and import language data to XLSX, then install the XLSX library:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/xlsx.js
 * You can delete the library file before deploying the game to save space.
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
 * 5. You can add other localization files. It is important that
 *    the list of files in each language data folder matches.
 *    You can create subfolders of any level. At the root of
 *    the file should be either an object (curly brackets)
 *    or an array (square brackets).
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
 *     - "Export to XLSX" - exports language data from JSON to
 *       a file "language_data.xlsx", which will be created
 *       at the root of the project.
       - "Import from XLSX" - data is loaded from
         a file "language_data.xlsx", are converted to JSON
         and written to localization files.
         Be careful, the files will be overwritten! Make a backup.
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
 * COMPATIBILITY WITH OTHER PLUGINS
 * The plugin is compatible with "Phileas's Text Wrap".
 * Place this plugin under "Phileas's Text Wrap" in the Plugin Manager.
 * 
 * The plugin is compatible with "TAA_BookMenu".
 * Place this plugin under "TAA_BookMenu" in the Plugin Manager.
 * 
 * If you are using "Phileas's Language Localization",
 * "Phileas's Text Wrap" and "TAA_BookMenu" at the same time,
 * arrange them exactly in this order in the Plugin Manager:
 * 1. TAA_BookMenu
 * 2. Phileas_TextWrap
 * 3. Phileas_LanguageLocalisation
 * 
 *-----------------------------------------------------------------------------
 * DEMO PROJECT
 * The plugin has a demo project.
 * Please review it if you still have questions about using the plugin:
 * https://rpgmakerunion.ru/game/phileass-language-localisation-demo.33521384
 * 
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
 * @plugindesc 1.3.0 Языковые локализации текста в игре
 * @author Phileas
 * 
 * @param option
 * @text Надпись опции
 * @desc Надпись опции выбора языка. Может быть переводимым текстом ${<текстовый код>}
 * @type string
 * @default Язык
 * 
 * @param languages
 * @text Языки
 * @desc Список языков, используемых в игре
 * @type struct<language>[]
 * @default []
 * 
 * @param languageSelectionMenuParent
 * @text Меню выбора языка
 * 
 * @param openLanuageSelectionMenu
 * @parent languageSelectionMenuParent
 * @text Открывать меню
 * @desc Если ON, при первом запуске игры будет открываться выбор языка. Если OFF, установится первый язык из параметра "Языки"
 * @type boolean
 * @default true
 * 
 * @param languageSelectionWindowMargin
 * @parent languageSelectionMenuParent
 * @text Отступ окна выбора языка
 * @desc Значение прибавляется к отступу пунктов по вертикали
 * @type number
 * @default 32
 * 
 * @param languageSelectionTextPadding
 * @parent languageSelectionMenuParent
 * @text Отступ текста
 * @desc Значение прибавляется к отступу пунктов по горизонтали
 * @type number
 * @default 16
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
 * @command exportToXlsx
 * @text Экспортировать в XLSX
 * @desc Экспортирует все языковые данные в таблицу
 * 
 * @command importFromXlsx
 * @text Импортировать из XLSX
 * @desc Импортирует все языковые данные из таблицы. Будут перезаписаны JSON файлы!
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
 * Если при запуске игры язык не выбран,
 * плагин отобразит меню выбора языка.
 * 
 * API методы для других плагинов и скриптов:
 * - Phileas_LanguageLocalization.getText
 * 
 *-----------------------------------------------------------------------------
 * УСТАНОВКА
 * 
 * Для работы плагина необходимо установить Phileas`s File Manager:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/Phileas_FileManager.js
 * 
 * Если вам необходимы команды экспорта-импорта язоковых данных в XLSX,
 * то установите библиотеку XLSX:
 * https://github.com/Oleg-Olegovich/phileas-public-plugins/blob/master/plugins/xlsx.js
 * Перед деплоем игры файл библиотеки можно удалить для экономии места.
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
 * 5. Вы можете добавить другие файлы локализации. Важно, чтобы в каждой
 *    папке языковых данных совпадал список файлов. Вы можете создавать
 *    вложенные папки любого уровня. В корне файла должен быть либо
 *    объект (фигурные скобки), либо массив (квадратные скобки).
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
 *     - "Экспортировать в XLSX" - экспортирует языковые данные из
 *       JSON в файл "language_data.xlsx", который будет создан в корне проекта.
 *     - "Импортировать из XLSX" данные загружаются из файла "language_data.xlsx",
 *       конвертируются в JSON и записываются в файлы локализации.
 *       Будьте осторожны, файлы будут перезаписаны! Сделайте бэкап.
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
 * СОВМЕСТИМОСТЬ С ДРУГИМИ ПЛАГИНАМИ
 * Плагин совместим с "Phileas's Text Wrap". Располагайте этот плагин под
 * "Phileas's Text Wrap" в меню плагинов.
 * 
 * Плагин совместим с "TAA_BookMenu". Располагайте этот плагин под
 * "TAA_BookMenu" в меню плагинов.
 * 
 * Если вы одновременно используете "Phileas's Language Localisation",
 * "Phileas's Text Wrap" и "TAA_BookMenu", располагайте их точно в
 * таком порядке в меню плагинов:
 * 1. TAA_BookMenu
 * 2. Phileas_TextWrap
 * 3. Phileas_LanguageLocalisation
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
    
"use strict";

var Phileas_LanguageLocalization = Phileas_LanguageLocalization || {};

(function () {

//--------MY CODE:

//-----------------------------------------------------------------------------
// API

    Phileas_LanguageLocalization.getText = function(originalText) {
        return getText(originalText);
    }

//-----------------------------------------------------------------------------
// Constants

    const FOLDER = "languages";
    const MAIN_FILE = "main";
    const EXPORT_FILE = "language_data.xlsx";

//-----------------------------------------------------------------------------
// Data

    var $parameters = PluginManager.parameters("Phileas_LanguageLocalisation");
    var $option = $parameters["option"];
    var $languages = loadLanguages();
    var $files = null;
    var $openLanuageSelectionMenu = $parameters["openLanuageSelectionMenu"] == "true";
    var $languageSelectionWindowMargin = Number($parameters["languageSelectionWindowMargin"]);
    var $languageSelectionTextPadding = Number($parameters["languageSelectionTextPadding"]);

    var $languageData = {};


//-----------------------------------------------------------------------------
// Data loading

    function loadLanguages() {
        let langs = JSON.parse($parameters["languages"]);

        for (var i = 0; i < langs.length; ++i) {
            langs[i] = JSON.parse(langs[i]);
            langs[i].fontSize = Number(langs[i].fontSize);
        }

        return langs;
    }

    function loadFiles() {
        const dir = `${FOLDER}/${$languages[0].code}`;
        const filesList = Phileas_FileManager.getFilesInDirectory(dir);
        const result = [];

        for (let i = 0; i < filesList.length; ++i) {
            const index = filesList[i].indexOf(".");

            if (index == -1 || filesList[i].slice(index + 1) != "json") {
                continue;
            }

            result.push(filesList[i].slice(0, index));
        }
        
        const mainIndex = result.indexOf(MAIN_FILE);
        result[mainIndex] = result[0];
        result[0] = MAIN_FILE;

        return result;
    }

    function setLanguage(id, nextFunction = () => {}, ...args) {
        ConfigManager.phileasLanguageIndex = id;
        ConfigManager.save();
        loadLanguageData(nextFunction, ...args);
    }

    function loadLanguageData(nextFunction = () => {}, ...args) {
        $languageData = {};
        const result = loadLanguageFiles();
        result.then(_ => nextFunction(...args));
    }

    function loadLanguageFile(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({ response: xhr.response });
                } else {
                    reject(`Error loading file: ${url}, Status: ${xhr.status}`);
                }
            };
            xhr.onerror = () => reject(`Network error loading file: ${url}`);
            xhr.send();
        });
    }
    
    async function loadLanguageFiles() {
        try {
            const language = getCurrentLanguage();
            const results = await Promise.all($files.map(file =>
                loadLanguageFile(`${FOLDER}/${language.code}/${file}.json`)));
            $languageData = JSON.parse(results[0].response);

            for (let i = 1; i < results.length; ++i) {
                const path = $files[i].split("/");
                let lastDict = $languageData;
    
                for (let i = 0; i + 1 < path.length; ++i) {
                    if (!lastDict[path[i]]) {
                        lastDict[path[i]] = {};
                    }
                    lastDict = lastDict[path[i]];
                }
    
                const value = JSON.parse(results[i].response);
                lastDict[path[path.length - 1]] = value;
            }
        } catch (error) {
            console.error(error);
            throw new Error("Failed to load language file");
        }
    }

//-----------------------------------------------------------------------------
// Main (getters)

    function getText(originalText) {
        const regex = /\${([\w|\.\[\]0-9]+)}/gm;
        let regexParts;
        let newText = originalText;

        while ((regexParts = regex.exec(originalText)) != null) {
            const langData = getLanguageData($languageData, regexParts[1]);
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
        const offset = textCode[arrayJ + 1] == "."
            ? 2
            : 1;
        textCode = textCode.substring(arrayJ + offset);

        return getLanguageData(data, textCode);
    }

    function getCurrentLanguageIndex() {
        return ConfigManager.phileasLanguageIndex || 0;
    }

    function getPreviousLanguageIndex() {
        return (ConfigManager.phileasLanguageIndex + $languages.length - 1) % $languages.length;
    }

    function getNextLanguageIndex() {
        return (ConfigManager.phileasLanguageIndex + 1) % $languages.length;
    }

    function getCurrentLanguage() {
        const index = getCurrentLanguageIndex();
        return $languages[index];
    }

    function getLabel(index) {
        return $languages[index].label;
    }

    function getCurrentFontName() {
        const lang = getCurrentLanguage();

        if (lang == undefined) {
            return null;
        }

        return lang.fontName;
    }

    function getCurrentFontSize() {
        const lang = getCurrentLanguage();

        if (lang == undefined) {
            return null;
        }

        return lang.fontSize;
    }

    function getCurrentMissText() {
        const lang = getCurrentLanguage();

        if (lang == undefined) {
            return null;
        }

        return lang.missText;
    }

    function getCurrentOnText() {
        const lang = getCurrentLanguage();

        if (lang == undefined) {
            return null;
        }

        return lang.onText;
    }

    function getCurrentOffText() {
        const lang = getCurrentLanguage();

        if (lang == undefined) {
            return null;
        }

        return lang.offText;
    }

    function updateGameTitle() {
        document.title = getText($dataSystem.gameTitle);
    }

    function getLocalizationImageFolder(folder, filename) {
        const languageId = getCurrentLanguageIndex();

        if (languageId == 0) {
            return folder;
        }

        const newFolder = folder + getCurrentLanguage().code + "/";

        return Phileas_FileManager.fileExistsSync(newFolder + filename)
            ? newFolder
            : folder;
    }

    function getLocalizationAudioFolder(folder, filename) {
        const languageId = getCurrentLanguageIndex();

        if (languageId == 0) {
            return folder;
        }

        const newFolder = folder + getCurrentLanguage().code + "/";

        return Phileas_FileManager.fileExistsSync("audio/" + newFolder + filename)
            ? newFolder
            : folder;
    }

    function getLocalizationMovieSrc(src) {
        const languageId = getCurrentLanguageIndex();

        if (languageId == 0) {
            return src;
        }

        const id = src.indexOf("/");
        const dir = src.substring(0, id + 1);
        const file = src.substring(id);
        const newSrc = dir + getCurrentLanguage().code + file;

        return Phileas_FileManager.fileExistsSync(newSrc)
            ? newSrc
            : src;
    }

//-----------------------------------------------------------------------------
// Export

    function flattenObject(obj, prefix = "", result = {}) {
        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                flattenObject(item, `${prefix}[${index}]`, result);
            });

            return result;
        }

        if (obj && typeof obj === "object") {
            for (const [key, value] of Object.entries(obj)) {
                const newKey = prefix ? `${prefix}.${key}` : key;

                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        flattenObject(item, `${newKey}[${index}]`, result);
                    });
                    continue;
                }
                
                if (value && typeof value === "object" && !Array.isArray(value)) {
                    flattenObject(value, newKey, result);
                    continue;
                }
                
                result[newKey] = value;
            }

            return result;
        }

        result[prefix] = obj;
        return result;
    }

    function getFileData(langData, file) {
        const path = file.split("/");
        let parents = [langData];
        let fileData = langData[path[0]];
        
        for (let i = 1; i < path.length; ++i) {
            parents.push(fileData);
            fileData = fileData[path[i]];
        }

        for (let i = 0; i < parents.length; ++i) {
            const parent = parents[parents.length - 1 - i];
            const key = path[path.length - 1 - i];
            delete parent[key];

            if (Object.keys(parent).length > 0) {
                break;
            }
        }

        return fileData;
    }

    function makeLanguageDataTableStart(data, index) {
        ConfigManager.phileasLanguageIndex = index;
        loadLanguageData(makeLanguageDataTableProcess, data, index);
    }

    function makeLanguageDataTableProcess(data, index) {
        const lang = $languages[index].code;
        ++index;

        for (let i = 1; i < $files.length; ++i) {
            data[i][0][index] = lang;
            const fileData = getFileData($languageData, $files[i]);
            const flatFileData = flattenObject(fileData);
            let row = 1;

            for (const [key, value] of Object.entries(flatFileData)) {
                if (data[i][row] == undefined) {
                    data[i][row] = [];
                }

                data[i][row][0] = key;
                data[i][row][index] = value;
                ++row;
            }
        }

        // main file.
        const flatLanguageData = flattenObject($languageData);
        let row = 1;
        data[0][0][index] = lang;

        for (const [key, value] of Object.entries(flatLanguageData)) {
            if (data[0][row] == undefined) {
                data[0][row] = [];
            }

            data[0][row][0] = key;
            data[0][row][index] = value;
            ++row;
        }

        if (index == $languages.length) {
            saveLanguageDataToXlsx(data);
            console.log("The export of language data to XLSX is complete!");
            ConfigManager.phileasLanguageIndex = landIdBackUp;
            loadLanguageData();
            return;
        }

        makeLanguageDataTableStart(data, index);
    }

    function saveLanguageDataToXlsx(data) {
        //const XLSX = require("xlsx");
        const workbook = XLSX.utils.book_new();

        for (let i = 0; i < $files.length; ++i) {
            const worksheet = XLSX.utils.aoa_to_sheet(data[i]);
            const sheetName = $files[i].replace("/", "|");
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }

        XLSX.writeFile(workbook, EXPORT_FILE);
    }

    var landIdBackUp = 0;
    function exportToXlsx() {
        landIdBackUp = getCurrentLanguageIndex();

        const data = [];

        for (let i = 0; i < $files.length; ++i) {
            data[i] = [
                ["Text code"] // Headers
            ];
        }

        makeLanguageDataTableStart(data, 0);
    }

    function writeToLanguageData($languageData, textCode, value) {
        const path = textCode.split(".");

        for (let i = 0; i < path.length; ++i) {
            if (path[i][0] == "[") {
                path[i] = Number(path[i].substring(1, path[i].length - 1));
            }

            if (i + 1 == path.length) {
                $languageData[path[i]] = value;
                return;
            }

            if ($languageData[path[i]] == undefined) {
                if (path[i + 1][0] == "[") {
                    $languageData[path[i]] = [];
                } else {
                    $languageData[path[i]] = {};
                }
            }

            $languageData = $languageData[path[i]]; 
        }
    }

    function checkDir(dirPath) {
        const fs = require("fs");
        const path = require("path");
        const dir = path.dirname(dirPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    function importFromXlsx() {
        //const XLSX = require("xlsx");
        const workbook = XLSX.readFile(EXPORT_FILE);
        const languageDatas = {};
        for (let i = 0; i < $languages.length; ++i) {
            languageDatas[$languages[i].code] = {};
        }

        for (let i = 0; i < workbook.SheetNames.length; ++i) {
            let fileName = workbook.SheetNames[i];
            const worksheet = workbook.Sheets[fileName];
            fileName = fileName.replace("|", "/");
            const textCodePrefix = fileName == MAIN_FILE
                ? ""
                : fileName.replace("/", ".") + ".";
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            for (let j = 0; j < jsonData.length; ++j) {
                const textCode = textCodePrefix
                    + jsonData[j]["Text code"][0]
                    + jsonData[j]["Text code"].slice(1).replace("[", ".[");
                for (let z = 0; z < $languages.length; ++z) {
                    const lang = $languages[z].code;
                    writeToLanguageData(languageDatas[lang], textCode, jsonData[j][lang]);
                }
            }
        }

        checkDir(FOLDER);
        const fs = require("fs");

        for (let i = 0; i < $languages.length; ++i) {
            const lang = $languages[i].code;
            const langData = languageDatas[lang];

            for (let j = 1; j < $files.length; ++j) {
                const fileName = `${FOLDER}/${lang}/${$files[j]}.json`;
                checkDir(fileName);
                const fileData = getFileData(langData, $files[j]);
                const jsonString = JSON.stringify(fileData, null, 4);
                fs.writeFileSync(fileName, jsonString, (err) => {
                    if (err) {
                      console.error(`Error writing to the language file ${$files[j]}.json:`, err);
                    }
                });
            }

            const jsonString = JSON.stringify(langData, null, 4);
            fs.writeFileSync(`${FOLDER}/${lang}/${MAIN_FILE}.json`, jsonString, (err) => {
                if (err) {
                    console.error(`Error writing to the language file ${MAIN_FILE}:`, err);
                }
            });
        }

        console.log("The import of language data from XLSX is complete!");
    }

//-----------------------------------------------------------------------------
// Commands

    PluginManager.registerCommand("Phileas_LanguageLocalisation", "setLanguage", setLanguageByCommand);
    PluginManager.registerCommand("Phileas_LanguageLocalisation", "exportToXlsx", exportToXlsx);
    PluginManager.registerCommand("Phileas_LanguageLocalisation", "importFromXlsx", importFromXlsx);

    function setLanguageByCommand(params) {
        const id = Number(params["id"]);
        setLanguage(id);
    }


//-----------------------------------------------------------------------------
// Scenes

    function Scene_LanguageSelection() {
        this.initialize.apply(this, arguments);
    }

    Scene_LanguageSelection.prototype = Object.create(Scene_Base.prototype);
    Scene_LanguageSelection.prototype.constructor = Scene_LanguageSelection;

    Scene_LanguageSelection.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_LanguageSelection.prototype.prepare = function(nextScene) {
        this._nextScene = nextScene;
    };

    Scene_LanguageSelection.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createWindowLayer();
        this.createCommandWindow();
    };

    Scene_LanguageSelection.prototype.update = function() {
        if (!this.isBusy()) {
            this._commandWindow.open();
        }

        Scene_Base.prototype.update.call(this);
    };

    Scene_LanguageSelection.prototype.isBusy = function() {
        return (
            this._commandWindow.isClosing() ||
            Scene_Base.prototype.isBusy.call(this)
        );
    };

    Scene_LanguageSelection.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_LanguageCommand(rect);

        for (let i = 0; i < $languages.length; ++i) {
            this._commandWindow.setHandler(i, () => {
                setLanguage(i, () => {
                    updateGameTitle();
                    this._commandWindow.close();
                    this.popScene();
                });
            });
        }

        this.addWindow(this._commandWindow);
    };

    Scene_LanguageSelection.prototype.commandWindowRect = function() {
        const ww = this.maxLabelWidth();
        const wh = $languages.length * (36 + $languageSelectionWindowMargin) + $gameSystem.windowPadding() * 2;
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_LanguageSelection.prototype.maxLabelWidth = function() {
        const calcWindow = new Window_Base(new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight));
        let maxWidth = 0;

        for (const language of $languages) {
            const textWidth = calcWindow.textSizeEx(language.label).width;
            const choiceWidth = Math.ceil(textWidth) + $languageSelectionTextPadding;

            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }

        return maxWidth;
    };

    Scene_LanguageSelection.prototype.popScene = function() {
        if (this._nextScene) {
            SceneManager.goto(this._nextScene);
        } else {
            Scene_Base.prototype.popScene.call(this);
        }
    };


//-----------------------------------------------------------------------------
// Windows

    function Window_LanguageCommand() {
        this.initialize(...arguments);
    }
    
    Window_LanguageCommand.prototype = Object.create(Window_Command.prototype);
    Window_LanguageCommand.prototype.constructor = Window_LanguageCommand;
    
    Window_LanguageCommand.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.openness = 0;
        this._lastCommandSymbol = 0;
    };

    Window_LanguageCommand.initCommandPosition = function() {
        this._lastCommandSymbol = 0;
    };
    
    Window_LanguageCommand.prototype.makeCommandList = function() {
        for (let i = 0; i < $languages.length; ++i) {
            this.addCommand($languages[i].label, i);
        }
    };

    Window_LanguageCommand.prototype.processOk = function() {
        Window_LanguageCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };

    Window_LanguageCommand.prototype.itemWidth = function() {
        return this.innerWidth;
    };
    
    Window_LanguageCommand.prototype.itemHeight = function() {
        return Window_Scrollable.prototype.itemHeight.call(this) + $languageSelectionWindowMargin;
    };


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

    const Origin_Game_System_mainFontFace = Game_System.prototype.mainFontFace;
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

    const Origin_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        $files = loadFiles();

        if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
            if (ConfigManager.phileasLanguageIndex == undefined) {
                if ($openLanuageSelectionMenu) {
                    Origin_Scene_Boot_start.call(this);
                    const nextScene = SceneManager._nextScene.constructor;
                    SceneManager.goto(Scene_LanguageSelection);
                    SceneManager.prepareNextScene(nextScene);
                } else {
                    setLanguage(0, () => {
                        updateGameTitle();
                        Origin_Scene_Boot_start.call(this);
                    });
                }
            } else {
                loadLanguageData(() => {
                    updateGameTitle();
                    Origin_Scene_Boot_start.call(this);
                });
            }
        }
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
        this.addCommand(getText($option), "phileasLanguageIndex");
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
            this.changeValue(symbol, getNextLanguageIndex());
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
            this.changeValue(symbol, getNextLanguageIndex());
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
            this.changeValue(symbol, getPreviousLanguageIndex());
            this.phileasRefreshLanguage();
        } else {
            Origin_Window_Options_cursorLeft.call(this);
        }
    };

    Window_Options.prototype.phileasRefreshLanguage = function() {
        loadLanguageData(() => {
            this.resetFontSettings();
            updateGameTitle();
            if (SceneManager._scene._optionsWindow) {
                SceneManager._scene._optionsWindow.refresh();
            }
        });
    };

    const Origin_Window_NameEdit_setup = Window_NameEdit.prototype.setup;
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
        this.phileasLanguageIndex = config["phileasLanguageIndex"];
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

    const Origin_DataManager_setupBattleTest = DataManager.setupBattleTest;
    DataManager.setupBattleTest = function() {
        Origin_DataManager_setupBattleTest.call(this);
        setLanguage(0, () => {
            updateGameTitle();
        });
    };

    if (typeof Window_BookText != "undefined") {
        const Origin_TaaPreparePrintableObjects = Window_BookText.prototype.preparePrintableObjects;
        Window_BookText.prototype.preparePrintableObjects = function(text) {
            Origin_TaaPreparePrintableObjects.call(this, getText(text));
        }
    }

}());
