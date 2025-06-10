//=============================================================================
// Phileas_Cursor.js
//=============================================================================
// [Update History]
// 2023.August.20 Ver1.0.0 First Release
// 2023.August.21 Ver1.1.0 Added show/hide parameters and commands
// 2023.August.24 Ver1.1.1 Fixed gamepad
// 2024.March.11 Ver1.2.0 Added event cursor settings
// 2024.March.13 Ver1.2.1 Event cursor data saves and global command
// 2024.March.16 Ver1.3.0 Offset, battle cursor, menu cursor, click picture, animation
// 2024.March.18 Ver1.3.1 Preloading, optimization
// 2024.March.19 Ver1.3.2 Optimization
// 2024.May.11 Ver1.3.3 Turning event cursors on/off
// 2024.May.13 Ver1.3.4 Fixed menu/battle cursor switch
// 2024.May.28 Ver1.3.5 Fixed save loading
// 2024.September.23 Ver1.3.6 Cursor data getting fix
// 2024.September.23 Ver1.3.6 Cursor data getting fix
// 2024.October.11 Ver1.3.7 Added cursor freezing
// 2024.December.30 Ver1.3.8 Fixed common events preload
// 2025.January.04 Ver1.3.9 Title screen cursor
// 2025.January.06 Ver1.3.10 Fixed cursor hiding

/*:
 * @target MZ
 * @plugindesc v1.3.10 Advanced cursor configuration
 * @author Phileas
 *
 * @param basicCursors
 * @text Basic cursors
 *
 * @param defaultCursor
 * @parent basicCursors
 * @text Default cursor
 * @type struct<CursorDataStruct>
 * @desc It is set at the start of the game
 *
 * @param battleCursor
 * @parent basicCursors
 * @text Battle cursor
 * @type struct<CursorDataStruct>
 * @desc Used in battle. If not set, the "Default cursor" will be used
 *
 * @param menuCursor
 * @parent basicCursors
 * @text Menu cursor
 * @type struct<CursorDataStruct>
 * @desc Used in the game menu. If not set, the "Default cursor" will be used
 *
 * @param titleCursor
 * @parent basicCursors
 * @text Title screen cursor
 * @type struct<CursorDataStruct>
 * @desc Used on the title screen. If not set, the "Default cursor" will be used
 *
 * @param cursorDisplay
 * @text Cursor display
 *
 * @param hideAtStartup
 * @parent cursorDisplay
 * @text Hide at startup?
 * @type boolean
 * @default false
 * @desc If true, the cursor will be invisible when the game starts
 *
 * @param keyboardHideKey
 * @parent cursorDisplay
 * @text Keyboard key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param keyboardHideKeyNumber
 * @parent cursorDisplay
 * @text Keyboard key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Keyboard key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param mouseHideKey
 * @parent cursorDisplay
 * @text Mouse key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param mouseHideKeyNumber
 * @parent cursorDisplay
 * @text Mouse key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Mouse key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param gamepadHideKey
 * @parent cursorDisplay
 * @text Gamepad key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param gamepadHideKeyNumber
 * @parent cursorDisplay
 * @text Gamepad key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Gamepad key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param animationPeriod
 * @text Animation period
 * @type number
 * @default 100
 * @min 0
 * @desc The number of milliseconds after which the cursor animation frames should be updated.
 *
 * @param mapsPreload
 * @text Maps preloading
 * @type boolean
 * @default false
 * @desc Preloading of cursor images from commands on maps. Loaded internal folders of any nesting level.
 *
 * @param commonEventsPreload
 * @text Common events preloading
 * @type boolean
 * @default false
 * @desc Preloading of cursor images from commands in common events. Loaded internal folders of any nesting level.
 * 
 * @param isFrozenDefault
 * @text Cursor is frozen by default
 * @type boolean
 * @default false
 * @desc The cursor image will not be updated. Optimization is useful if you don't use animations, click images, and event cursors.
 *
 * @command setDefaultCursor
 * @text Change the default cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command setBattleCursor
 * @text Change the battle cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command setMenuCursor
 * @text Change the menu cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command setTitleCursor
 * @text Change the title screen cursor
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command hide
 * @text Hide cursor
 * @desc Makes the cursor invisible
 *
 * @command show
 * @text Show cursor
 * @desc Makes the cursor visible
 *
 * @command setEventCursorData
 * @text Configure an event
 * @desc Setting the cursor configuration for a single event
 * @arg eventId
 * @text Event ID
 * @type number
 * @desc Input a event ID (it is a positive number)
 * @arg cursorEventData
 * @text Configuration
 * @type struct<CursorEventDataStruct>
 *
 * @command setGlobalEventCursorData
 * @text Configure an event (global)
 * @desc Setting the cursor configuration for a single event on any map
 * @arg mapId
 * @text Map ID
 * @type number
 * @desc Input a map ID (it is a positive number)
 * @arg eventId
 * @text Event ID
 * @type number
 * @desc Input a event ID (it is a positive number)
 * @arg cursorEventData
 * @text Configuration
 * @type struct<CursorEventDataStruct>
 * 
 * @command disableEventCursors
 * @text Disable event cursors
 * @desc The cursor configuration for the event will not be applied, it includes graphics and click/hover.
 *
 * @command enableEventCursors
 * @text Enable event cursors
 * @desc The cursor configuration for the event will be applied, includes graphics and click/hover.
 *
 * @command freezeCursor
 * @text Freeze the cursor
 * @desc The cursor image will not be updated. Optimization is useful if you don't use animations, click images, and event cursors.
 *
 * @command unfreezeCursor
 * @text Unfreeze the cursor
 * @desc Disables cursor freezing.
 * 
 * @help
 * Changes the cursor image to any of the img/system.
 * Animated cursors are supported, details below.
 * Use png format!
 *
 * To change the cursor to the standard one, do not select an image in the parameter/argument (option "(None)").
 * 
 * Plugin commands: 
 * - "Change the default cursor"
 * - "Change the battle cursor"
 * - "Change the menu cursor"
 * - "Hide cursor"
 * - "Show cursor"
 * - "Configure an event" - configures the cursor for a single event
 * - "Configure an event (global)" - configures the cursor for a single event on any map
 * - "Freeze the cursor" and "Unfreeze the cursor" - control the freezing of the cursor.
 * 
 * If cursor freeze is enabled, the cursor image will not be updated.
 * Optimization is useful if you don't use animations, click images, and event cursors.
 * 
 * You can set the cursor configuration for an event using the plugin command and using tags in the event notes:
 * <CursorPicture:picture> - this picture (picture.png) will be used when the cursor is hovered over the event
 * <CursorPictureOnClick:pictureClick> - the picture displayed when clicked (if not specified, the cursor will not change when clicked)
 * <CursorXOffset:5> - the click point will be shifted 5 pixels horizontally from the upper-left corner
 * <CursorYOffset:5> - the click point will be shifted 5 pixels vertically from the upper-left corner
 * <CursorFramesNumber:3> - the cursor will be animated with 3 frames of animation
 * <CursorClickFramesNumber:3> - the cursor will be animated with 3 frames of animation when clicked
 * <CursorStartOnClick> - the event will be triggered when you click on it
 * <CursorStartOnHover> - the event will be triggered when the cursor is hovered over it
 *
 * The settings set by the plugin command are saved along with the game progress.
 * When loading the map, the settings set by the plugin commands are first set.
 * If there are none, the settings from the tags are loaded.
 *
 * You can also switch the invisibility of the cursor by pressing the keyboard, mouse and gamepad keys.
 * To do this, configure the plugin settings. If you want to specify a key by a string name, set 0 to the number value.
 *
 * ABOUT ANIMATED CURSORS
 * To make the cursor animated, set the CursorFramesNumber value (number of frames) via a parameter, command, or plugin tag.
 * The value must be greater than 1.
 * Animation is configured separately for the image when clicked, if there is one.
 * You must place in the "img/system" folder as many cursor images as you specified frames.
 * Specify the image of the first frame as the cursor image (CursorPicture) in the parameter.
 * Let's say this file is called "cursor.png" and you specified 3 frames.
 * Then the names of the other two files should be as follows:
 * "cursor1.png"
 * "cursor2.png"
 * That is, they must end with the frame number, numbering starts from 0.
 * You do not need to specify the number for the first frame file!
 *
 * You can configure the preloading of cursor resources. This will speed up the switching of cursor images,
 * but it may slow down the launch of the game.
 * Images from the basic cursors (default, battle and menu) are always cached.
 * If preloading of maps is disabled, the map event commands are cached when loading this map.
 * If the preloading of general events is disabled, the commands of this event are cached when it is called.
 *
 * If the cursor image is not displayed, try to reduce its size.
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

/*~struct~CursorDataStruct:
 * @param CursorPicture
 * @text Cursor picture
 * @type file
 * @dir img/system/
 *
 * @param CursorPictureOnClick
 * @text Cursor picture on click
 * @type file
 * @dir img/system/
 * @desc Leave this field empty so that the cursor does not change when clicked
 *
 * @param CursorXOffset
 * @text X offset
 * @number
 * @default 0
 * @min 0
 * @desc The horizontal offset of the click point from the upper-left corner in pixels
 *
 * @param CursorYOffset
 * @text Y offset
 * @number
 * @default 0
 * @min 0
 * @desc The vertical offset of the click point from the upper-left corner in pixels
 *
 * @param CursorFramesNumber
 * @text Frames number
 * @type number
 * @default 1
 * @min 1
 * @desc Set to 1 if the cursor is not animated. For more information, see the description of the plugin
 *
 * @param CursorClickFramesNumber
 * @text Frames number (click)
 * @type number
 * @default 1
 * @min 1
 * @desc Set to 1 if the cursor is not animated. For more information, see the description of the plugin
 */

/*~struct~CursorEventDataStruct:
 * @param CursorPicture
 * @text Cursor picture
 * @type file
 * @dir img/system/
 *
 * @param CursorPictureOnClick
 * @text Cursor picture on click
 * @type file
 * @dir img/system/
 * @desc Leave this field empty so that the cursor does not change when clicked
 *
 * @param CursorXOffset
 * @text X offset
 * @number
 * @default 0
 * @min 0
 * @desc The horizontal offset of the click point from the upper-left corner in pixels
 *
 * @param CursorYOffset
 * @text Y offset
 * @number
 * @default 0
 * @min 0
 * @desc The vertical offset of the click point from the upper-left corner in pixels
 *
 * @param CursorFramesNumber
 * @text Frames number
 * @type number
 * @default 1
 * @min 1
 * @desc Set to 1 if the cursor is not animated. For more information, see the description of the plugin
 *
 * @param CursorClickFramesNumber
 * @text Frames number (click)
 * @type number
 * @default 1
 * @min 1
 * @desc Set to 1 if the cursor is not animated. For more information, see the description of the plugin
 *
 * @param CursorStartOnClick
 * @text Start on click
 * @type boolean
 * @default false
 *
 * @param CursorStartOnHover
 * @text Start on hover
 * @type boolean
 * @default false
 */

/*:ru
 * @target MZ
 * @plugindesc v1.3.10 Расширенная конфигурация курсора
 * @author Phileas
 *
 * @param basicCursors
 * @text Основные курсоры
 *
 * @param defaultCursor
 * @parent basicCursors
 * @text Курсор по умолчанию
 * @type struct<CursorDataStruct>
 * @desc Устанавливается при запуске игры
 *
 * @param battleCursor
 * @parent basicCursors
 * @text Курсор боя
 * @type struct<CursorDataStruct>
 * @desc Используется в бою. Если не установлен, будет использоваться "Курсор по умолчанию"
 *
 * @param menuCursor
 * @parent basicCursors
 * @text Курсор меню
 * @type struct<CursorDataStruct>
 * @desc Используется в меню. Если не установлен, будет использоваться "Курсор по умолчанию"
 *
 * @param titleCursor
 * @parent basicCursors
 * @text Курсор титульного экрана
 * @type struct<CursorDataStruct>
 * @desc Используется на титульном экране. Если не установлен, будет использоваться "Курсор по умолчанию"
 *
 * @param cursorDisplay
 * @text Отображение курсора
 *
 * @param hideAtStartup
 * @parent cursorDisplay
 * @text Скрывать при запуске?
 * @type boolean
 * @default false
 * @desc Если true, курсор будет невидимым при запуске игры
 *
 * @param keyboardHideKey
 * @parent cursorDisplay
 * @text Клавиша клавиатуры для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param keyboardHideKeyNumber
 * @parent cursorDisplay
 * @text Клавиша клавиатуры для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param mouseHideKey
 * @parent cursorDisplay
 * @text Клавиша мыши для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param mouseHideKeyNumber
 * @parent cursorDisplay
 * @text Клавиша мыши для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param gamepadHideKey
 * @parent cursorDisplay
 * @text Клавиша геймпада для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param gamepadHideKeyNumber
 * @parent cursorDisplay
 * @text Клавиша геймпада для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param animationPeriod
 * @text Период анимации
 * @type number
 * @default 100
 * @min 0
 * @desc Кол-во миллисекунд, через которые должно происходить обновление кадров анимации курсора.
 *
 * @param mapsPreload
 * @text Предзагрузка карт
 * @type boolean
 * @default false
 * @desc Предзагрузка картинок курсоров с команд на картах. Загружаются внутренние папки любого уровня вложенности.
 *
 * @param commonEventsPreload
 * @text Предзагрузка общих событий
 * @type boolean
 * @default false
 * @desc Предзагрузка картинок курсоров с команд в событиях. Загружаются внутренние папки любого уровня вложенности.
 * 
 * @param isFrozenDefault
 * @text Курсор заморожен по умолчанию
 * @type boolean
 * @default false
 * @desc Картинка курсора не будет обновляться. Оптимизация полезна, если вы не используете анимации, отдельные картинки для клика и курсоры событий.
 *
 * @command setDefaultCursor
 * @text Изменить курсор по умолчанию
 * @arg cursorData
 * @text Настройки
 * @type struct<CursorDataStruct>
 *
 * @command setBattleCursor
 * @text Изменить курсор боя
 * @arg cursorData
 * @text Настройки
 * @type struct<CursorDataStruct>
 *
 * @command setMenuCursor
 * @text Изменить курсор меню
 * @arg cursorData
 * @text Настройки
 * @type struct<CursorDataStruct>
 *
 * @command setTitleCursor
 * @text Изменить курсор титульного экрана
 * @arg cursorData
 * @text Configuration
 * @type struct<CursorDataStruct>
 *
 * @command hide
 * @text Скрыть курсор
 * @desc Делает курсор невидимым
 *
 * @command show
 * @text Показать курсор
 * @desc Делает курсор видимым
 *
 * @command setEventCursorData
 * @text Настроить событие
 * @desc Задание конфигурации курсора для отдельного события
 * @arg eventId
 * @text ID события
 * @type number
 * @desc Введите ID события (это положительное число)
 * @arg cursorEventData
 * @text Настройки
 * @type struct<CursorEventDataStruct>
 *
 * @command setGlobalEventCursorData
 * @text Настроить событие (глобально)
 * @desc Задание конфигурации курсора для отдельного события на любой карте
 * @arg mapId
 * @text ID карты
 * @type number
 * @desc Введите ID карты (это положительное число)
 * @arg eventId
 * @text ID события
 * @type number
 * @desc Введите ID события (это положительное число)
 * @arg cursorEventData
 * @text Настройки
 * @type struct<CursorEventDataStruct>
 * 
 * @command disableEventCursors
 * @text Отключить курсоры событий
 * @desc Конфигурация курсора для события не будет применяться, включает графику и клик/наведение.
 *
 * @command enableEventCursors
 * @text Включить курсоры событий
 * @desc Конфигурация курсора для события будет применяться, включает графику и клик/наведение.
 * 
 * @command freezeCursor
 * @text Заморозить курсор
 * @desc Картинка курсора не будет обновляться. Оптимизация полезна, если вы не используете анимации, отдельные картинки для клика и курсоры событий.
 *
 * @command unfreezeCursor
 * @text Разморозить курсор
 * @desc Отключает заморозку курсора.
 *
 * 
 * @help
 * Изменяет картинку курсора на любую из img/system.
 * Поддерживаются анимированные курсоры, подробности ниже.
 * Используйте формат png!
 *
 * Чтобы изменить курсор на стандартный, в параметре/аргументе не выбирайте картинку (вариант "(Нет)").
 * 
 * Команды плагина: 
 * - "Изменить курсор по умолчанию"
 * - "Изменить курсор боя"
 * - "Изменить курсор меню"
 * - "Скрыть курсор"
 * - "Показать курсор"
 * - "Настроить событие" - конфигурирует курсор для отдельного события
 * - "Настроить событие (глобально)" - конфигурирует курсор для события на любой карте
 * - "Заморозить курсор" и "Разморозить курсор" - контролируют заморозку курсора.
 * 
 * Если включена заморозка курсора, то картинка курсора не будет обновляться.
 * Оптимизация полезна, если вы не используете анимации, отдельные картинки для клика и курсоры событий.
 *
 * Задать конфигурацию курсора для события можно с помощью команды плагина и с помощью тегов в заметках события:
 * <CursorPicture:picture> - эта картинка (picture.png) будет использоваться, когда курсор наведён на событие
 * <CursorPictureOnClick:pictureClick> - картинка, отображаемая при клике (если не задана, курсор не будет меняться при клике)
 * <CursorXOffset:5> - точка клика будет смещена на 5 пикселей по горизонтали от верхнего левого угла
 * <CursorYOffset:5> - точка клика будет смещена на 5 пикселей по вертикали от верхнего левого угла
 * <CursorFramesNumber:3> - курсор будет анимированным с 3 кадрами анимации
 * <CursorClickFramesNumber:3> - курсор при клике будет анимированным с 3 кадрами анимации
 * <CursorStartOnClick> - событие будет запускаться при клике по нему
 * <CursorStartOnHover> - событие будет запускаться при наведении курсора на него
 *
 * Настройки, заданные командой плагина, сохраняются вместе с прогрессом игры. 
 * При загрузке карты сначала устанавливаются настройки, заданные командами плагина.
 * Если их нет - загружаются настройки из тегов.
 *
 * Также вы можете переключать невидимость курсора по нажатию на клавишу клавиатуры, мыши и геймпада.
 * Для этого настройте параметры плагина. Если вы хотите указать клавишу по строковому имени, установите 0 в значение номера.
 *
 * ПРО АНИМИРОВАННЫЕ КУРСОРЫ
 * Чтобы курсор был анимированным, задайте значение CursorFramesNumber (кол-во кадров) через параметр, команду или тег плагина.
 * Значение должно быть больше 1.
 * Отдельно настраивается анимация для изображения при клике, если оно есть.
 * Вы должны расположить в папке "img/system" столько же картинок курсора, сколько указали кадров.
 * В качестве картинки курсора (CursorPicture) в параметре укажите изображение первого кадра.
 * Допустим, этот файл называется "cursor.png" и вы указали 3 кадра.
 * Тогда названия двух остальных файлов должны быть такие:
 * "cursor1.png"
 * "cursor2.png"
 * То есть они должны заканчиваться номером кадра, нумерация начинается с 0.
 * Для файла первого кадра номер указывать не нужно!
 *
 * Вы можете настроить предзагрузку ресурсов курсоров. Это ускорит переключение картинок курсоров,
 * но может замедлить запуск игры.
 * Картинки из базовых курсоров (по умолчанию, бой и меню) кэшируются всегда.
 * Если выключена предзагрузка карт, то команды событий карты кэшируются при загрузке этой карты.
 * Если выключена предзагрузка общих событий, то команды этого события кэшируются при его вызове.
 *
 * Если картинка курсора не отображается, попробуйте уменьшить её размер.
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

/*~struct~CursorDataStruct:ru
 * @param CursorPicture
 * @text Картинка курсора
 * @type file
 * @dir img/system/
 *
 * @param CursorPictureOnClick
 * @text Картинка курсора при клике
 * @type file
 * @dir img/system/
 * @desc Оставьте это поле пустым, чтобы курсор не менялся при клике
 *
 * @param CursorXOffset
 * @text Смещение по X
 * @number
 * @default 0
 * @min 0
 * @desc Отступ точки клика по горизонтали от верхнего левого угла в пикселях
 *
 * @param CursorYOffset
 * @text Смещение по Y
 * @number
 * @default 0
 * @min 0
 * @desc Отступ точки клика по вертикали от верхнего левого угла в пикселях
 *
 * @param CursorFramesNumber
 * @text Кол-во кадров
 * @type number
 * @default 1
 * @min 1
 * @desc Установите 1, если курсор не анимированный. Подробнее в описании плагина
 *
 * @param CursorClickFramesNumber
 * @text Кол-во кадров (клик)
 * @type number
 * @default 1
 * @min 1
 * @desc Установите 1, если курсор не анимированный. Подробнее в описании плагина
 */

/*~struct~CursorEventDataStruct:ru
 * @param CursorPicture
 * @text Картинка курсора
 * @type file
 * @dir img/system/
 *
 * @param CursorPictureOnClick
 * @text Картинка курсора при клике
 * @type file
 * @dir img/system/
 * @desc Оставьте это поле пустым, чтобы курсор не менялся при клике
 *
 * @param CursorXOffset
 * @text Смещение по X
 * @number
 * @default 0
 * @min 0
 * @desc Отступ точки клика по горизонтали от верхнего левого угла в пикселях
 *
 * @param CursorYOffset
 * @text Смещение по Y
 * @number
 * @default 0
 * @min 0
 * @desc Отступ точки клика по вертикали от верхнего левого угла в пикселях
 *
 * @param CursorFramesNumber
 * @text Кол-во кадров
 * @type number
 * @default 1
 * @min 1
 * @desc Установите 1, если курсор не анимированный. Подробнее в описании плагина
 *
 * @param CursorClickFramesNumber
 * @text Кол-во кадров (клик)
 * @type number
 * @default 1
 * @min 1
 * @desc Установите 1, если курсор не анимированный. Подробнее в описании плагина
 *
 * @param CursorStartOnClick
 * @text Включать при клике
 * @type boolean
 * @default false
 *
 * @param CursorStartOnHover
 * @text Включать при наведении
 * @type boolean
 * @default false
 */


(function () {

//--------MY CODE:

//-----------------------------------------------------------------------------
// Utils classes

    function getMeta(data) {
        const regExp = /<([^<>:]+)(:?)([^>]*)>/g;
        let meta = {};
        for (; ;) {
            const match = regExp.exec(data);
            if (match) {
                if (match[2] === ":") {
                    meta[match[1]] = match[3];
                } else {
                    meta[match[1]] = true;
                }
            } else {
                break;
            }
        }

        return meta;
    };

    function PhileasCursorData() {
        this.initialize(...arguments);
    }

    PhileasCursorData.prototype.initialize = function() {
        this.CursorPicture = "";
        this.CursorPictureOnClick = "";
        this.CursorFramesNumber = 1;
        this.CursorClickFramesNumber = 1;
        this.CursorXOffset = 1;
        this.CursorYOffset = 1;
    };

    PhileasCursorData.prototype.constructor = PhileasCursorData;

    PhileasCursorData.prototype.setFromJson = function(params) {
        if (params == undefined) {
            return;
        }

        this.CursorPicture = params["CursorPicture"] || "";
        this.CursorPictureOnClick = params["CursorPictureOnClick"] || "";
        this.CursorXOffset = Number(params["CursorXOffset"]);
        this.CursorYOffset = Number(params["CursorYOffset"]);
        this.CursorFramesNumber = Number(params["CursorFramesNumber"]);
        this.CursorClickFramesNumber = Number(params["CursorClickFramesNumber"]);
    }

    PhileasCursorData.prototype.setFromParams = function(params) {
        if (params == "" || params == undefined) {
            return;
        }

        params = JSON.parse(params);
        this.setFromJson(params);
    }

    PhileasCursorData.prototype.equals = function(cursorData) {
        if (cursorData instanceof PhileasEventCursorData) {
            return false;
        }

        return this.CursorPicture == cursorData.CursorPicture
            && this.CursorPictureOnClick == cursorData.CursorPictureOnClick
            && this.CursorXOffset == cursorData.CursorXOffset
            && this.CursorYOffset == cursorData.CursorYOffset
            && this.CursorFramesNumber == cursorData.CursorFramesNumber
            && this.CursorClickFramesNumber == cursorData.CursorClickFramesNumber;
    }

    function PhileasEventCursorData() {
        this.initialize(...arguments);
    }

    PhileasEventCursorData.prototype.initialize = function() {
        PhileasCursorData.prototype.initialize.call(this);
        this.CursorStartOnClick = false;
        this.CursorStartOnHover = false;
    };

    PhileasEventCursorData.prototype = Object.create(PhileasCursorData.prototype);
    PhileasEventCursorData.prototype.constructor = PhileasEventCursorData;

    PhileasEventCursorData.prototype.setFromNote = function(note) {
        const meta = getMeta(note);
        if (meta == undefined) {
            return;
        }

        for (let i in phileasCursorTags) {
            let tag = phileasCursorTags[i];
            if (meta[tag] != undefined) {
                this[tag] = meta[tag];
            }
        }

        this.CursorXOffset = Number(this.CursorXOffset);
        this.CursorYOffset = Number(this.CursorYOffset);
        this.CursorFramesNumber = Number(this.CursorFramesNumber);
        this.CursorClickFramesNumber = Number(this.CursorClickFramesNumber);
        this.CursorStartOnClick = this.CursorStartOnClick != undefined;
        this.CursorStartOnHover = this.CursorStartOnHover != undefined;
    };

    PhileasEventCursorData.prototype.setFromJson = function(params) {
        if (params == undefined) {
            return;
        }

        this.CursorPicture = params["CursorPicture"] || "";
        this.CursorPictureOnClick = params["CursorPictureOnClick"] || "";
        this.CursorXOffset = Number(params["CursorXOffset"]);
        this.CursorYOffset = Number(params["CursorYOffset"]);
        this.CursorFramesNumber = Number(params["CursorFramesNumber"]);
        this.CursorClickFramesNumber = Number(params["CursorClickFramesNumber"]);
        this.CursorStartOnClick = params["CursorStartOnClick"] == "true";
        this.CursorStartOnHover = params["CursorStartOnHover"] == "true";
    }

    PhileasEventCursorData.prototype.setFromParams = function(params) {
        if (params == "" || params == undefined) {
            return;
        }

        params = JSON.parse(params);
        this.setFromJson(params);
    }

    PhileasEventCursorData.prototype.equals = function(cursorData) {
        if (!(cursorData instanceof PhileasEventCursorData)) {
            return false;
        }

        return this.CursorPicture == cursorData.CursorPicture
            && this.CursorPictureOnClick == cursorData.CursorPictureOnClick
            && this.CursorXOffset == cursorData.CursorXOffset
            && this.CursorYOffset == cursorData.CursorYOffset
            && this.CursorFramesNumber == cursorData.CursorFramesNumber
            && this.CursorClickFramesNumber == cursorData.CursorClickFramesNumber
            && this.CursorStartOnClick == cursorData.CursorStartOnClick
            && this.CursorStartOnHover == cursorData.CursorStartOnHover;
    }


//-----------------------------------------------------------------------------
// Data

    const base_url = "./img/system/";
    const fallbackStyle = "pointer";
    const phileasMouseKeyMap = {
        "left": 0,
        "middle": 1,
        "right": 2
    }
    const phileasCursorTags = ["CursorPicture", "CursorPictureOnClick", "CursorXOffset", "CursorYOffset", "CursorFramesNumber", "CursorClickFramesNumber", "CursorStartOnClick", "CursorStartOnHover"];

    var parameters = PluginManager.parameters("Phileas_Cursor");
    var hideAtStartup = parameters["hideAtStartup"] == "true";
    var keyboardHideKey = parameters["keyboardHideKey"] || "";
    var keyboardHideKeyNumber = Number(parameters["keyboardHideKeyNumber"] || 0);
    var mouseHideKey = parameters["mouseHideKey"] || "";
    var mouseHideKeyNumber = Number(parameters["mouseHideKeyNumber"] || 0);
    var gamepadHideKey = parameters["gamepadHideKey"] || "";
    var gamepadHideKeyNumber = Number(parameters["gamepadHideKeyNumber"] || 0);
    var animationPeriod = Number(parameters["animationPeriod"] || 100);
    var mapsPreload = parameters["mapsPreload"] == "true";
    var commonEventsPreload = parameters["commonEventsPreload"] == "true";
    var isFrozenDefault = parameters["isFrozenDefault"] == "true";

    var defaultCursor = new PhileasCursorData();
    defaultCursor.setFromParams(parameters["defaultCursor"]);
    var battleCursor = new PhileasCursorData();
    battleCursor.setFromParams(parameters["battleCursor"]);
    var menuCursor = new PhileasCursorData();
    menuCursor.setFromParams(parameters["menuCursor"]);
    var titleCursor = new PhileasCursorData();
    titleCursor.setFromParams(parameters["titleCursor"]);
    var eventCursorsEnabled = true;
    var currentHidden = false;
    var currentClick = false;
    var lastFrameIncrementTime = 0; // milliseconds
    var currentFrame = 0;
    var currentClickFrame = 0;
    var currentCursor = new PhileasCursorData();
    var currentCursorSet = {
        "file": "",
        "x": -1,
        "y": -1
    }
    var isFrozen = false;
    setCurrentCursor(defaultCursor);

    PluginManager.registerCommand("Phileas_Cursor", "setDefaultCursor", setDefaultCursor);
    PluginManager.registerCommand("Phileas_Cursor", "setBattleCursor", setBattleCursor);
    PluginManager.registerCommand("Phileas_Cursor", "setMenuCursor", setMenuCursor);
    PluginManager.registerCommand("Phileas_Cursor", "setTitleCursor", setTitleCursor);
    PluginManager.registerCommand("Phileas_Cursor", "hide", hide);
    PluginManager.registerCommand("Phileas_Cursor", "show", show);
    PluginManager.registerCommand("Phileas_Cursor", "setEventCursorData", setEventCursorData);
    PluginManager.registerCommand("Phileas_Cursor", "setGlobalEventCursorData", setGlobalEventCursorData);
    PluginManager.registerCommand("Phileas_Cursor", "disableEventCursors", disableEventCursors);
    PluginManager.registerCommand("Phileas_Cursor", "enableEventCursors", enableEventCursors);
    PluginManager.registerCommand("Phileas_Cursor", "freezeCursor", freezeCursor);
    PluginManager.registerCommand("Phileas_Cursor", "unfreezeCursor", unfreezeCursor);

    // key - mapId, value = dictionary<eventId, PhileasEventCursorData>
    var phileasGlobalEventCursorData = {};

//-----------------------------------------------------------------------------
// Preloading

    var phileasCursorsCash = new Set();

    function preloadCursorImage(file) {
        if (phileasCursorsCash.has(file)) {
            return;
        }

        //ImageManager.loadSystem(filename);
        const img = new Image();
        img.src = `${base_url}${file}.png`;
        img.onload = () => phileasCursorsCash.add(file);
        img.onerror = () => console.log(`Failed to load cursor image ${file}.png`);
    }

    function preloadCursorData(cursorData) {
        if (cursorData.CursorPicture != "") {
            preloadCursorImage(cursorData.CursorPicture);
            for (let i = 1; i < cursorData.CursorFramesNumber; ++i) {
                preloadCursorImage(cursorData.CursorPicture + String(i));
            }
        }

        if (cursorData.CursorPictureOnClick != "") {
            preloadCursorImage(cursorData.CursorPictureOnClick);
            for (let i = 1; i < cursorData.CursorClickFramesNumber; ++i) {
                preloadCursorImage(cursorData.CursorPicture + String(i));
            }
        }
    }

    function preloadCursorDataFromCommandList(list) {
        let cursorCommandData = new PhileasEventCursorData();
        for (let i = 0; i < list.length; ++i) {
            if (list[i].code != 357 || list[i].parameters[0] != "Phileas_Cursor") {
                continue;
            }

            switch (list[i].parameters[1]) {
                case "setDefaultCursor":
                case "setBattleCursor":
                case "setMenuCursor":
                case "setTitleCursor":
                    cursorCommandData.setFromParams(list[i].parameters[3].cursorData);
                    break;
                case "setEventCursorData":
                case "setGlobalEventCursorData":
                    cursorCommandData.setFromParams(list[i].parameters[3].cursorEventData);
                    break;
                default:
                    continue;
            }

            preloadCursorData(cursorCommandData);
        }
    }

    function preloadCursorDataFromPages(pages) {
        for (let i = 0; i < pages.length; ++i) {
            preloadCursorDataFromCommandList(pages[i].list);
        }
    }

    function preloadCursorDataFromEvent(eventData) {
        let cursorNoteData = new PhileasEventCursorData();
        cursorNoteData.setFromNote(eventData.note);
        preloadCursorData(cursorNoteData);
        preloadCursorDataFromPages(eventData.pages);
    }

    function preloadCursorDataFromMaps() {
        let preloadCounter = 1;

        const Origin_onDataLoad = DataManager.onLoad;
        DataManager.onLoad = function(object) {
            Origin_onDataLoad.call(this, object);
            if (object.events) {
                for (let i = 1; i < object.events.length; ++i) {
                    if (object.events[i]) {
                        preloadCursorDataFromEvent(object.events[i]);
                    }
                }
            }

            ++preloadCounter;
            if (preloadCounter == $dataMapInfos.length) {
                DataManager.onLoad = Origin_onDataLoad;;
            }
        };

        for (let i = 1; i < $dataMapInfos.length; ++i) {
            if ($dataMapInfos[i]) {
                DataManager.loadMapData($dataMapInfos[i].id);
            }
        }
    }

    function preloadCursorDataFromCommonEvents() {
        for (let i = 1; i < $dataCommonEvents.length; ++i) {
            preloadCursorDataFromCommandList($dataCommonEvents[i].list);
        }
    }

    function preloadCursorImages() {
        preloadCursorData(defaultCursor);
        preloadCursorData(battleCursor);
        preloadCursorData(menuCursor);
        preloadCursorData(titleCursor);

        if (commonEventsPreload) {
            preloadCursorDataFromCommonEvents();
        }

        if (mapsPreload) {
            preloadCursorDataFromMaps();
        }
    }

//-----------------------------------------------------------------------------
// Main

    function setPhileasCursorConfiguration(data) {
        let file = "";

        if (currentClick && data.CursorPictureOnClick != "") {
            file = data.CursorPictureOnClick;
            if (currentClickFrame > 0) {
                file += String(currentClickFrame);
            }
        } else {
            file = data.CursorPicture;
            if (currentFrame > 0) {
                file += String(currentFrame);
            }
        }

        if (currentCursorSet.file == file
            && currentCursorSet.x == data.CursorXOffset
            && currentCursorSet.y == data.CursorYOffset) {
            return;
        }

        currentCursorSet.file = file;
        currentCursorSet.x = data.CursorXOffset;
        currentCursorSet.y = data.CursorYOffset;

        document.body.style.cursor = file == ""
            ? "default"
            : `url("${base_url}${file}.png") ${data.CursorXOffset} ${data.CursorYOffset}, ${fallbackStyle}`;
    }

    function updatePhileasCursor() {
        if (currentHidden) {
            return;
        }

        const now = Date.now();
        const passedTime = now - lastFrameIncrementTime;
        if (currentClick) {
            if (currentCursor.CursorClickFramesNumber > 1 && passedTime > animationPeriod) {
                currentClickFrame = (currentClickFrame + 1) % currentCursor.CursorClickFramesNumber;
                lastFrameIncrementTime = now;
            }
        } else if (currentCursor.CursorFramesNumber > 1 && passedTime > animationPeriod) {
            currentFrame = (currentFrame + 1) % currentCursor.CursorFramesNumber;
            lastFrameIncrementTime = now;
        }

        setPhileasCursorConfiguration(currentCursor);

        if (!isFrozen) {
            requestAnimationFrame(updatePhileasCursor);
        }
    }

    requestAnimationFrame(updatePhileasCursor);

    function setCurrentCursor(cursorData) {
        if (currentHidden || currentCursor.equals(cursorData)) {
            return;
        }

        currentCursor = cursorData;
        currentFrame = currentClickFrame = 0;
    }

    function setDefaultCursor(params) {
        defaultCursor.setFromParams(params["cursorData"]);
    }

    function setBattleCursor(params) {
        battleCursor.setFromParams(params["cursorData"]);
    }

    function setMenuCursor(params) {
        menuCursor.setFromParams(params["cursorData"]);
    }

    function setTitleCursor(params) {
        titleCursor.setFromParams(params["cursorData"]);
    }

    function changeCursorToBasic() {
        if (currentHidden) {
            return;
        }

        let scene = SceneManager._scene;

        if (battleCursor.CursorPicture != "" && scene instanceof Scene_Battle) {
            setCurrentCursor(battleCursor);
        } else if (menuCursor.CursorPicture != "" && scene instanceof Scene_MenuBase) {
            setCurrentCursor(menuCursor);
        } else if (setTitleCursor.CursorPicture != "" && scene instanceof Scene_Title) {
            setCurrentCursor(titleCursor);
        } else {
            setCurrentCursor(defaultCursor);
        }

        if (isFrozen) {
            requestAnimationFrame(updatePhileasCursor);
        }
    }

    function hide() {
        currentHidden = true;
        document.body.style.cursor = "none";
        currentCursorSet.file = null;
    }

    function show() {
        currentHidden = false;
        changeCursorToBasic();
        updatePhileasCursor();
    }

    function refreshEventCursor(eventId, cursorData) {
        let scene = SceneManager._scene;

        if (!(scene instanceof Scene_Map) || eventId < 1 || eventId > $gameMap.events().length) {
            return;
        }

        const event = $gameMap.event(eventId);
        event.phileasCursorData = cursorData;
    }

    function updateEventCursorData(mapId, params) {
        const eventId = Number(params["eventId"]);

        let cd = new PhileasEventCursorData();
        cd.setFromParams(params["cursorEventData"]);

        if (phileasGlobalEventCursorData[mapId] == undefined) {
            phileasGlobalEventCursorData[mapId] = {};
        }

        phileasGlobalEventCursorData[mapId][eventId] = cd;

        if ($gameMap.mapId() == mapId) {
            refreshEventCursor(eventId, cd);
        }
    }

    function setEventCursorData(params) {
        updateEventCursorData($gameMap.mapId(), params);
    }

    function setGlobalEventCursorData(params) {
        const mapId = Number(params["mapId"]);
        updateEventCursorData(mapId, params);
    }

    function disableEventCursors() {
        eventCursorsEnabled = false;
        changeCursorToBasic();
    }

    function enableEventCursors() {
        eventCursorsEnabled = true;
    }

    function freezeCursor() {
        isFrozen = true;
    }

    function unfreezeCursor() {
        isFrozen = false;
        requestAnimationFrame(updatePhileasCursor);
    }

    function switchHide() {
        if (currentHidden) {
            show();
        }
        else {
            hide();
        }
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function phileasCursorDownHandler(event) {
        if (event.keyCode == keyboardHideKeyNumber) {
            switchHide();
        }
    }

    function phileasCursorMouseDownHandler(event) {
        if (event.button == mouseHideKeyNumber) {
            switchHide();
        }
    }

    if (!DataManager.isBattleTest() && hideAtStartup) {
        hide();
    }
    if (keyboardHideKeyNumber == 0) {
        keyboardHideKeyNumber = getKeyByValue(Input.keyMapper, keyboardHideKey);
    }
    if (mouseHideKeyNumber == 0) {
        mouseHideKeyNumber = phileasMouseKeyMap[mouseHideKey];
    }
    if (gamepadHideKeyNumber == 0) {
        gamepadHideKeyNumber = getKeyByValue(Input.gamepadMapper, gamepadHideKey);
    }
    if (keyboardHideKeyNumber != 0) {
        document.addEventListener("keydown", phileasCursorDownHandler);
    }
    if (mouseHideKeyNumber != 0) {
        document.addEventListener("mousedown", phileasCursorMouseDownHandler);
    }

    function phileasCursorClickDownHandler(event) {
        if (event.button == 0) {
            currentClick = true;
        }
    }

    function phileasCursorClickUpHandler(event) {
        if (event.button == 0) {
            currentClick = false;
        }
    }

    document.addEventListener("mousedown", phileasCursorClickDownHandler);
    document.addEventListener("mouseup", phileasCursorClickUpHandler);


    Scene_Map.prototype.setupPhileasEventCursors = function() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
            return;
        }

        let events = SceneManager._scene._spriteset._characterSprites;
        SceneManager._scene.phileasLabelWindows = {};
        for (var i = 0; i < events.length; ++i) {
            if (!(events[i]._character instanceof Game_Event)) {
                continue;
            }

            const ch = events[i]._character;

            if (!mapsPreload) {
                preloadCursorDataFromPages(ch.event().pages);
            }

            if (phileasGlobalEventCursorData[$gameMap.mapId()] != undefined) {
                const cursorData = phileasGlobalEventCursorData[$gameMap.mapId()][ch.eventId()];
                if (cursorData != undefined) {
                    ch.phileasCursorData = cursorData;
                    continue;
                }
            }

            events[i]._character.phileasCursorData = new PhileasEventCursorData();
            events[i]._character.phileasCursorData.setFromNote(ch.event().note);
        }
    };

    Scene_Map.prototype.phileasCheckEventCursors = function(x, y) {
        if (!eventCursorsEnabled || isFrozen) {
            return;
        }

        const mapX = $gameMap.canvasToMapX(x);
        const mapY = $gameMap.canvasToMapY(y);
        const events = $gameMap.eventsXy(mapX, mapY);

        if (events.length === 0) {
            changeCursorToBasic();
            return;
        }

        for (let i = 0; i < events.length; ++i) {
            let cursorData = events[i].phileasCursorData;

            if (cursorData == undefined) {
                events[i].phileasCursorData = new PhileasEventCursorData();
                events[i].phileasCursorData.setFromNote(events[i].event().note);
                cursorData = events[i].phileasCursorData;
            }

            if (cursorData == undefined) {
                return;
            }

            if (cursorData.CursorStartOnHover) {
                events[i].start();
            }

            if (cursorData.CursorPicture) {
                setCurrentCursor(cursorData);
            }
        }
    };

    TouchInput.phileasCheckClickEventCursors = function(x, y) {
        if (!eventCursorsEnabled) {
            return;
        }

        const scene = SceneManager._scene;

        if (!(scene instanceof Scene_Map) || !scene.isActive() || $gameMessage.isBusy()) {
            return false;
        }

        const mapX = $gameMap.canvasToMapX(x);
        const mapY = $gameMap.canvasToMapY(y);
        const events = $gameMap.eventsXy(mapX, mapY);

        for (let i = 0; i < events.length; ++i) {
            if (events[i]._erased) {
                return false;
            }

            const cursorData = events[i].phileasCursorData;
            if (cursorData.CursorStartOnClick) {
                events[i].start();
                return true;
            }
        }

        return false;
    };

//--------MODIFIED CODE:

    const Origin_loaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        Origin_loaded.call(this);
        preloadCursorImages();
    };

    const Origin_Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        Origin_Scene_Title_create.call(this);
        changeCursorToBasic();
        isFrozen = isFrozenDefault;
    };

    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        changeCursorToBasic();
        isFrozen = isFrozenDefault;
    };

    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasDefaultCursor = defaultCursor;
        contents.phileasBattleCursor = battleCursor;
        contents.phileasMenuCursor = menuCursor;
        contents.phileasTitleCursor = titleCursor;
        contents.phileasCursorHidden = currentHidden;
        contents.eventCursorsEnabled = eventCursorsEnabled;
        contents.phileasGlobalEventCursorData = phileasGlobalEventCursorData;
        contents.phileasCursorIsFrozen = isFrozen;
        return contents;
    };

    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        defaultCursor = new PhileasCursorData();
        defaultCursor.setFromJson(contents.phileasDefaultCursor);
        battleCursor = new PhileasCursorData();
        battleCursor.setFromJson(contents.phileasBattleCursor);
        menuCursor = new PhileasCursorData();
        menuCursor.setFromJson(contents.phileasMenuCursor);
        titleCursor = new PhileasCursorData();
        titleCursor.setFromJson(contents.phileasTitleCursor);
        isFrozen = contents.phileasCursorIsFrozen;
        phileasGlobalEventCursorData = {};
        const data = contents.phileasGlobalEventCursorData || {};
        for (const mapId in data) {
            const localData = data[mapId];
            for (const eventId in localData) {
                var ecd = new PhileasEventCursorData();
                ecd.setFromJson(localData[eventId]);
                if (phileasGlobalEventCursorData[mapId] == undefined) {
                    phileasGlobalEventCursorData[mapId] = {};
                }

                phileasGlobalEventCursorData[mapId][eventId] = ecd;
            }
        }

        eventCursorsEnabled = contents.eventCursorsEnabled;
        changeCursorToBasic();
        if (contents.phileasCursorHidden || false) {
            hide();
        }
        else {
            show();
        }
    };

    if (gamepadHideKeyNumber != 0) {
        Origin_updateGamepadState = Input._updateGamepadState;
        Input._updateGamepadState = function(gamepad) {
            Origin_updateGamepadState.call(this, gamepad);
            const lastState = this._gamepadStates[gamepad.index] || [];
            let state = this._gamepadStates[gamepad.index];
            for (let i = 0; i < state.length; ++i) {
                if (state[i] == true && lastState[i] != true && i == gamepadHideKeyNumber) {
                    switchHide();
                }
            }
        };
    }

    const Origin_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        Origin_onMapLoaded.call(this);
        this.setupPhileasEventCursors();
    };

    const Origin_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        Origin_onMouseMove.call(this, event);

        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        const scene = SceneManager._scene;

        if (!currentHidden
            && Graphics.isInsideCanvas(x, y)
            && scene instanceof Scene_Map
            && scene.isActive()
            && !$gameMessage.isBusy()) {

            scene.phileasCheckEventCursors(this._x, this._y);
        }
    };

    const Origin_onTrigger = TouchInput._onTrigger;
    TouchInput._onTrigger = function(x, y) {
        if (this.phileasCheckClickEventCursors(x, y)) {
            $gameTemp.clearDestination();
            return;
        }

        Origin_onTrigger.call(this, x, y);
    };

    if (!commonEventsPreload) {
        const Origin_CommonEventInitialize = Game_CommonEvent.prototype.initialize;
        Game_CommonEvent.prototype.initialize = function(commonEventId) {
            preloadCursorDataFromCommandList($dataCommonEvents[commonEventId].list);
            Origin_CommonEventInitialize.call(this, commonEventId);
        };
    }

    const Origin_battleStart = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        Origin_battleStart.call(this);
        changeCursorToBasic();
    };

    const Origin_menuStart = Scene_MenuBase.prototype.start;
    Scene_MenuBase.prototype.start = function() {
        Origin_menuStart.call(this);
        changeCursorToBasic();
    };

    const Origin_mapStart = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        Origin_mapStart.call(this);
        changeCursorToBasic();
    };
}());
