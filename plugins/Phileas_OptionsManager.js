//=============================================================================
// Phileas_OptionsManager.js
//=============================================================================
// [Update History]
// 2023.July.23 Ver1.0.0 First Release
// 2023.July.24 Ver1.1.0 Fixed a bug hiding standard options
//                       Automatic correction of incorrect variable values
//                       Now you can specify the status text of the variable
// 2023.Oct.01 Ver1.2.0 Added message speed option
// 2023.Oct.06 Ver1.3.0 Added window state option
// 2023.November.22 Ver1.3.1 Fixed arrow keys
// 2024.January.29 Ver1.3.2 Fixed compatibility with PKD_ExtendedLoot
// 2024.May.8 Ver1.3.3 Switch labels
// 2024.November.10 Ver1.3.4 Added window width, status width and visible options max number parameters
// 2024.December.09 Ver1.3.5 Fixed switch option arrow keys
// 2024.December.30 Ver1.4.0 Added always dash custom option
// 2025.February.23 Ver1.4.1 Added fullscreen default value
// 2025.April.06 Ver1.4.2 Fixed compatibility with plugin Animated busts by Astfgl
// 2025.April.06 Ver1.5.0 Customizable names for different message speeds

/*:
 * @target MZ
 * @plugindesc Configures the options menu, adds an unlimited number of custom options
 * @author Phileas
 *
 * @param Options
 * @type struct<Option>[]
 * @default []
 *
 * @param Fullscreen option
 * @type struct<Fullscreen>
 * @default {"AddFullscreen":"false","Fullscreen option name":"Fullscreen","Position":"Top"}
 *
 * @param WindowStateOption
 * @text Window state option
 * @type struct<WindowState>
 * @default {"AddWindowState":"false","WindowStateOptionName":"Window state","Position":"Top"}
 *
 * @param MessageSpeedOption
 * @text Message speed option
 * @type struct<MessageSpeed>
 * @default {"AddMessageSpeed":"false","MessageSpeedOptionName":"Message speed","Position":"Top"}
 *
 * @param AlwaysDashOption
 * @text 'Always Dash' option
 * @type struct<AlwaysDash>
 * @default {"addAlwaysDash":"true","defaultStatusText":"true","switchOnText":"Dash","switchOffText":"Walk"}
 * 
 * @param Show 'Command Remember' option?
 * @type boolean
 * @default true
 * 
 * @param Show 'Touch UI' option?
 * @type boolean
 * @default true
 * 
 * @param Show 'BGM Volume' option?
 * @type boolean
 * @default true
 * 
 * @param Show 'BGS Volume' option?
 * @type boolean
 * @default true
 * 
 * @param Show 'ME Volume' option?
 * @type boolean
 * @default true
 * 
 * @param Show 'SE Volume' option?
 * @type boolean
 * @default true
 *
 * @param Volume offset
 * @type number
 * @default 20
 * @desc The value by which the volume changes in one click.
 *
 * @param optionsWindowWidth
 * @text Options window`s width
 * @type number
 * @default 0
 * @min 0
 * @desc Input 0 to use the default value.
 *
 * @param statusTextWidth
 * @text Option value width (status)
 * @type number
 * @default 0
 * @min 0
 * @desc Input 0 to use the default value.
 * 
 * @param optionsWindowMaxVisibleCommands
 * @text Max number of visible options
 * @type number
 * @default 0
 * @min 0
 * @desc Input 0 to use the default value.
 * 
 * @help
 * The plugin does not provide commands.
 * The options menu is configured via the plugin parameters.
 *
 * Custom options are set in the plugin parameters via the structure. Each option adjusts a switch or variable.
 * If a switch is selected in the option settings, the option will adjust it. Otherwise, you need to select a variable!
 * When selecting a variable, you can adjust the minimum and maximum values, as well as offset.
 * You can choose whether to place the new option at the beginning, middle or end of the menu.
 *
 * You can also add the Fullscreen command to the options menu and input any name for it.
 * If you enable the Remember option in the Fullscreen structure, the plugin will remember the state of the fullscreen (even if the option is hidden from the options menu).
 * That is, if the fullscreen was turned on, when restarting the game will start in fullscreen!
 *
 * The Window State option allows you to remember the size and state of the window: normal or maximized!
 *
 * The Message Speed option allows you to adjust the speed of text display in game messages: from slow to instant.
 * You choose the scale yourself!
 *
 * You can hide standard options with a number of options that start with the word Show.
 * You can also use Volume offset to adjust the step length when changing the volume of music and sounds.
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
 */
 
/*:ru
 * @target MZ
 * @plugindesc Настраивает меню опций, добавляет неограниченное количество пользовательских опций
 * @author Phileas
 *
 * @param Options
 * @text Опции
 * @type struct<Option>[]
 * @default []
 *
 * @param Fullscreen option
 * @text Опция полного экрана
 * @type struct<Fullscreen>
 * @default {"AddFullscreen":"false","Fullscreen option name":"Полный экран","Position":"Top"}
 *
 * @param WindowStateOption
 * @text Опция состояния окна
 * @type struct<WindowState>
 * @default {"AddWindowState":"false","WindowStateOptionName":"Состояние окна","Position":"Top"}
 *
 * @param MessageSpeedOption
 * @text Опция скорости сообщения
 * @type struct<MessageSpeed>
 * @default {"AddMessageSpeed":"false","MessageSpeedOptionName":"Скорость сообщения","Position":"Top"}
 *
 * @param AlwaysDashOption
 * @text Опция 'Бег по умолчанию'
 * @type struct<AlwaysDash>
 * @default {"addAlwaysDash":"true","defaultStatusText":"true","switchOnText":"Бег","switchOffText":"Шаг"}
 * 
 * @param Show 'Command Remember' option?
 * @text Показывать опцию 'Запоминать команду'?
 * @type boolean
 * @default true
 * 
 * @param Show 'Touch UI' option?
 * @text Показывать опцию 'Сенсорный UI'?
 * @type boolean
 * @default true
 * 
 * @param Show 'BGM Volume' option?
 * @text Показывать опцию 'Громкость BGM'?
 * @type boolean
 * @default true
 * 
 * @param Show 'BGS Volume' option?
 * @text Показывать опцию 'Громкость BGS'?
 * @type boolean
 * @default true
 * 
 * @param Show 'ME Volume' option?
 * @text Показывать опцию 'Громкость ME'?
 * @type boolean
 * @default true
 * 
 * @param Show 'SE Volume' option?
 * @text Показывать опцию 'Громкость SE'?
 * @type boolean
 * @default true
 *
 * @param Volume offset
 * @text Смещение громкости
 * @type number
 * @default 20
 * @desc Значение, на которое изменяется громкость за один клик.
 *
 * @param optionsWindowWidth
 * @text Ширина окна настроек
 * @type number
 * @default 0
 * @min 0
 * @desc Введите 0, чтобы использовать значение по умолчанию.
 *
 * @param statusTextWidth
 * @text Ширина значения опции
 * @type number
 * @default 0
 * @min 0
 * @desc Введите 0, чтобы использовать значение по умолчанию.
 * 
 * @param optionsWindowMaxVisibleCommands
 * @text Макс. кол-во видимых опций
 * @type number
 * @default 0
 * @min 0
 * @desc Введите 0, чтобы использовать значение по умолчанию.
 * 
 * @help
 * Плагин не предоставляет команд.
 * Меню опций настраивается с помощью параметров плагина.
 *
 * Пользовательские параметры задаются в параметрах плагина через структуру. Каждая опция настраивает переключатель или переменную.
 * Если в настройках опции выбран переключатель, опция настроит его. В противном случае вам нужно выбрать переменную!
 * При выборе переменной вы можете настроить минимальное и максимальное значения, а также смещение (то, насколько значение переменной будет меняться за один клик).
 * Вы можете выбрать, размещать новую опцию в начале, середине или конце меню.
 *
 * Вы также можете добавить опцию Полного экрана в меню настроек и ввести для неё любое название.
 * Если вы включите опцию Remember в структуре Полного экрана, плагин запомнит состояние полноэкранного режима (даже если опция скрыта в меню настроек).
 * То есть, если был включен полноэкранный режим, то при перезапуске игра запустится в полноэкранном режиме!
 *
 * Опция Состояния окна позволяет запоминать размеры и состояние окна: нормальный или максимизированный!
 *
 * Опция Скорости сообщения позволяет настроить скорость отображения текста в игровых сообщениях: от медленной до моментальной.
 * Вы сами выбираете шкалу!
 *
 * Вы можете скрыть стандартные параметры с помощью нескольких опций, которые начинаются со слова "Show".
 * Вы также можете использовать Volume offset для регулировки длины шага при изменении громкости музыки и звуков.
 * 
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Телеграм: olekolegovich
 * 
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 */
 
/*~struct~Option:
 * @param Option name
 * @type string
 * @default Option
 *
 * @param Option switch
 * @type switch
 * @desc If the option should control the switch, select it here. Otherwise, do not assign a switch to the option in any case.
 * 
 * @param switchOnText
 * @text Switch On Label
 * @desc Leave the field empty for the default value.
 * 
 * @param switchOffText
 * @text Switch Off Label
 * @desc Leave the field empty for the default value.
 * 
 * @param Option variable
 * @type variable
 * @desc If the option should control the variable, select it here.
 *
 * @param Variable min value
 * @type number
 * @desc If it is variable option.
 * @default 0
 *
 * @param Variable max value
 * @type number
 * @desc If it is variable option.
 * @default 100
 *
 * @param Variable offset
 * @type number
 * @desc If it is variable option. The value by which the variable changes in one click.
 * @default 20
 *
 * @param Variable status text
 * @desc The text that will be written to the right of the variable value. You can input an empty string.
 * @default %
 *
 * @param Position
 * @desc The position of the option in the options menu.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 */
 
/*~struct~Option:ru
 * @param Option name
 * @text Название опции
 * @type string
 * @default Option
 *
 * @param Option switch
 * @text Переключатель опции
 * @type switch
 * @desc Если опция должна управлять переключателем, выберите его здесь. Иначе ни в коем случае не назначайте переключатель для этой опции.
 * 
 * @param switchOnText
 * @text Переключатель включён
 * @desc Надпись состояния. Оставьте поле пустым для значения по умолчанию.
 * 
 * @param switchOffText
 * @text Переключателя выключен
 * @desc Надпись состояния. Оставьте поле пустым для значения по умолчанию.
 * 
 * @param Option variable
 * @text Переменная опции
 * @type variable
 * @desc Если опция должна управлять переменной, выберите её здесь.
 *
 * @param Variable min value
 * @text Минимальное значение переменной
 * @type number
 * @desc Если опция управляет переменной.
 * @default 0
 *
 * @param Variable max value
 * @text Максимальное значение переменной
 * @type number
 * @desc Если опция управляет переменной.
 * @default 100
 *
 * @param Variable offset
 * @text Измененеи переменной
 * @type number
 * @desc Если опция управляет переменной. Значение, на которое изменяется переменная за один клик.
 * @default 20
 *
 * @param Variable status text
 * @text Текст статуса переменной
 * @desc Текст, который будет писаться справа от значения переменной. Можно ввести пустую строку.
 * @default %
 *
 * @param Position
 * @text Положение
 * @desc Положение опции в меню опций.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 */
 
/*~struct~Fullscreen:
 * @param AddFullscreen
 * @text Add 'Fullscreen' option?
 * @type boolean
 * @default false
 * @desc Adds a fullscreen option to the Options window.
 *
 * @param Fullscreen option name
 * @default Fullscreen
 *
 * @param Position
 * @desc The position of the option in the options menu.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 *
 * @param Remember
 * @type boolean
 * @default true
 * @desc If the value is true, the option value will be restored when the game is restarted.
 *
 * @param Default
 * @text Default value
 * @type boolean
 * @default false
 */
 
/*~struct~Fullscreen:ru
 * @param AddFullscreen
 * @text Добавить опцию 'Полный экран'?
 * @type boolean
 * @default false
 * @desc Добавляет опцию полноэкранного режима в окно опций.
 *
 * @param Fullscreen option name
 * @text Название опции полного экрана
 * @default Полный экран
 *
 * @param Position
 * @text Положение
 * @desc Положение опции в меню опций.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 *
 * @param Remember
 * @text Запоминать
 * @type boolean
 * @default true
 * @desc Если значение равно true, значение параметра будет восстановлено при перезапуске игры.
 *
 * @param Default
 * @text Значение по умолчанию
 * @type boolean
 * @default false
 */
 
/*~struct~WindowState:
 * @param AddWindowState
 * @text Add 'Window state' option?
 * @type boolean
 * @default false
 * @desc Adds a window state option to the Options window.
 *
 * @param WindowStateOptionName
 * @text Option name
 * @default Save window state?
 *
 * @param Position
 * @desc The position of the option in the options menu.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 *
 * @param Remember
 * @type boolean
 * @default true
 * @desc If the value is true, the option value will be restored when the game is restarted.
 */
 
/*~struct~WindowState:ru
 * @param AddWindowState
 * @text Добавить опцию 'Состояние окна'?
 * @type boolean
 * @default false
 * @desc Добавляет опцию состояния окна в окно опций.
 *
 * @param WindowStateOptionName
 * @text Название опции
 * @default Сохранять состояние окна?
 *
 * @param Position
 * @text Положение
 * @desc Положение опции в меню опций.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 *
 * @param Remember
 * @text Запоминать
 * @type boolean
 * @default true
 * @desc Если значение равно true, значение параметра будет восстановлено при перезапуске игры.
 */
 
/*~struct~MessageSpeed:
 * @param AddMessageSpeed
 * @text Add 'Message speed' option?
 * @type boolean
 * @default false
 * @desc Adds a message speed option to the Options window.
 *
 * @param MessageSpeedOptionName
 * @text Message speed option name
 * @default Message speed
 *
 * @param MessageSpeedMax
 * @text Max number
 * @type number
 * @desc The speed scale will be divided into numbers from 1 to max. max is the instant speed. max >= 1.
 * @default 10
 *
 * @param DefaultSpeed
 * @text Default speed
 * @type number
 * @desc >= 1 and <= max.
 * @default 10
 *
 * @param SpeedNames
 * @text Text names of speeds
 * @type struct<MessageSpeedName>[]
 * @default ["{\"value\":10,\"name\":\"Instant\"}"]
 *
 * @param Position
 * @desc The position of the option in the options menu.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 *
 * @param Remember
 * @type boolean
 * @default true
 * @desc If the value is true, the option value will be restored when the game is restarted.
 */

/*~struct~MessageSpeedName:
 * @param value
 * @text Value
 * @type number
 * @desc Numeric value
 *
 * @param name
 * @text Name
 * @type string
 * @desc String value
 */
 
/*~struct~MessageSpeed:ru
 * @param AddMessageSpeed
 * @text Добавить опцию 'Скорость сообщения'?
 * @type boolean
 * @default false
 * @desc Добавляет опцию скорости сообщения в окно опций.
 *
 * @param MessageSpeedOptionName
 * @text Название опции скорости сообщения
 * @default Скорость сообщения
 *
 * @param MessageSpeedMax
 * @text Максимальное число
 * @type number
 * @desc Шкала скорости будет разбита на числа от 1 до max. max - это моментальная скорость. max >= 1
 * @default 10
 *
 * @param DefaultSpeed
 * @text Скорость по умолчанию
 * @type number
 * @desc >= 1 и <= max.
 * @default 10
 *
 * @param SpeedNames
 * @text Текстовые названия скоростей
 * @type struct<MessageSpeedName>[]
 * @default ["{\"value\":10,\"name\":\"Моментально\"}"]
 *
 * @param Position
 * @text Положение
 * @desc Положение опции в меню опций.
 * @type combo
 * @option Top
 * @option Middle
 * @option Bottom
 * @default Bottom
 *
 * @param Remember
 * @text Запоминать
 * @type boolean
 * @default true
 * @desc Если значение равно true, значение параметра будет восстановлено при перезапуске игры.
 */

/*~struct~MessageSpeedName:ru
 * @param value
 * @text Значение
 * @type number
 * @desc Числовое значение
 *
 * @param name
 * @text Название
 * @type string
 * @desc Строковое значение
 */

/*~struct~AlwaysDash:
 * @param addAlwaysDash
 * @text Add 'Always Dash' option?
 * @type boolean
 * @default true
 * @desc Adds a option to the Options window.
 *
 * @param defaultStatusText
 * @text Default status text
 * @type boolean
 * @default true
 * @desc Use the default values (ON/OFF)?
 *
 * @param switchOnText
 * @text Switch On Label
 * @default Dash
 * @desc Status text.
 * 
 * @param switchOffText
 * @text Switch Off Label
 * @default Walk
 * @desc Status text.
 */

/*~struct~AlwaysDash:ru
 * @param addAlwaysDash
 * @text Добавить опцию 'Бег по умолчанию'?
 * @type boolean
 * @default true
 * @desc Добавляет опцию в окно опций.
 *
 * @param defaultStatusText
 * @text Текст состояния по умолчанию
 * @type boolean
 * @default true
 * @desc Использовать надписи по умолчанию (ВКЛ/ВЫКЛ)?
 *
 * @param switchOnText
 * @text Текст ВКЛ
 * @default Бег
 * @desc Надпись состояния.
 * 
 * @param switchOffText
 * @text Текст ВЫКЛ
 * @default Шаг
 * @desc Надпись состояния.
 */

(function() {

//--------DATA:
    var parameters = PluginManager.parameters("Phileas_OptionsManager");
    var customOptions = parsePluginParamArray(parameters["Options"]) || [];
    var topCustomOptions = [];
    var middleCustomOptions = [];
    var bottomCustomOptions = [];
    var fullscreenOption = getFullsreenOptionArray(JSON.parse(parameters["Fullscreen option"]) || {"AddFullscreen":false,"Fullscreen option name":"Fullscreen","Position":"Top","Default":false});
    var windowStateOption = getWindowStateOptionArray(JSON.parse(parameters["WindowStateOption"]) || {"AddWindowState":"false","WindowStateOptionName":"Состояние окна","Position":"Top"});
    var messageSpeedOption = getMessageSpeedOptionArray(JSON.parse(parameters["MessageSpeedOption"]) || {"AddMessageSpeed":false,"MessageSpeedOptionName":"Message speed","Position":"Top","MessageSpeedMax":10,"DefaultSpeed":10, "SpeedNames":{10: "Instant"}});
    var alwaysDashOption = parseAlwaysDashOption(parameters["AlwaysDashOption"] || "{\"addAlwaysDash\":\"true\",\"defaultStatusText\":\"true\",\"switchOnText\":\"\",\"switchOffText\":\"\"}");
    var showCommandRemember = parameters["Show 'Command Remember' option?"] == "true";
    var showTouchUI = parameters["Show 'Touch UI' option?"] == "true";
    var showBGMVolume = parameters["Show 'BGM Volume' option?"] == "true";
    var showBGSVolume = parameters["Show 'BGS Volume' option?"] == "true";
    var showMEVolume = parameters["Show 'ME Volume' option?"] == "true";
    var showSEVolume = parameters["Show 'SE Volume' option?"] == "true";
    var volumeOffset = Number(parameters["Volume offset"]) || 20;
    var optionsWindowWidth = Number(parameters["optionsWindowWidth"]) || 0;
    var statusTextWidth = Number(parameters["statusTextWidth"]) || 0;
    var optionsWindowMaxVisibleCommands = Number(parameters["optionsWindowMaxVisibleCommands"]) || 0;
    
    var messageSpeedValue = messageSpeedOption[5];
    
    setCustomOptionsDictionaries();

//--------MY CODE:
    function getClamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }

    function parsePluginParamArray(data) {
        if (data == undefined) {
            return undefined;
        }
        
        let arr = JSON.parse(data);
        for (let i = 0; i < arr.length; ++i) {
            arr[i] = JSON.parse(arr[i]);
        }

        return arr;
    }

    function getFullsreenOptionArray(dict) {
        let pos = dict["Position"];
        switch (pos) {
            case "Top":
                pos = 0;
                break;
            case "Middle":
                pos = 1;
                break;
            default:
                pos = 2;
                break;
        }
        
        return [dict["AddFullscreen"] == "true", dict["Fullscreen option name"], pos, dict["Remember"] == "true", dict["Default"] == "true"];
    }
    
    function getWindowStateOptionArray(dict) {
        let pos = dict["Position"];
        switch (pos) {
            case "Top":
                pos = 0;
                break;
            case "Middle":
                pos = 1;
                break;
            default:
                pos = 2;
                break;
        }
        
        return [dict["AddWindowState"] == "true", dict["WindowStateOptionName"], pos, dict["Remember"] == "true"];
    }
    
    function getMessageSpeedOptionArray(dict) {
        let pos = dict["Position"];
        switch (pos) {
            case "Top":
                pos = 0;
                break;
            case "Middle":
                pos = 1;
                break;
            default:
                pos = 2;
                break;
        }
        
        let max = Number(dict["MessageSpeedMax"]) || 10;
        if (max < 1) {
            max = 1;
        }
        
        let def = Number(dict["DefaultSpeed"]) || 10;
        if (def < 1 || def > max + 1) {
            def = max;
        }

        const speedNamesArray = JSON.parse(dict["SpeedNames"]);
        const speedNames = {};
        for (let i = 0; i < speedNamesArray.length; ++i) {
            const pair = JSON.parse(speedNamesArray[i]);
            speedNames[Number(pair.value)] = pair.name;
        }
        
        return [dict["AddMessageSpeed"] == "true", dict["MessageSpeedOptionName"], pos, dict["Remember"] == "true", max, def, speedNames];
    }

    function parseAlwaysDashOption(par) {
        var opt = JSON.parse(par);
        opt.addAlwaysDash = opt.addAlwaysDash == "true";
        opt.defaultStatusText = opt.defaultStatusText == "true";
        return opt;
    }
    
    function setCustomOptionsDictionaries() {
        let dict = {};
        for (let i in customOptions) {
            let opt = customOptions[i];
            let tag = "phileasCustomOption" + i;
            let isSwitchOption = opt["Option switch"] != "" && opt["Option switch"] != "0";
            opt["Option switch"] = Number(opt["Option switch"]);
            opt["switchOnText"] = opt["switchOnText"] || "";
            opt["switchOffText"] = opt["switchOffText"] || "";
            opt["Option variable"] = Number(opt["Option variable"]);
            opt["Variable min value"] = Number(opt["Variable min value"]);
            opt["Variable max value"] = Number(opt["Variable max value"]);
            opt["Variable offset"] = Number(opt["Variable offset"]);
            if (isSwitchOption) {
                tag += "Switch";
                dict[tag] = [true, opt["Option switch"], opt["switchOnText"], opt["switchOffText"]];
            }
            else {
                tag += "Volume";
                dict[tag] = [false, opt["Option variable"], opt["Variable min value"], opt["Variable max value"], opt["Variable offset"], opt["Variable status text"]];
            }

            switch (opt["Position"]) {
                case "Top":
                    topCustomOptions.push([tag, opt["Option name"], isSwitchOption]);
                    break;
                case "Middle":
                    middleCustomOptions.push([tag, opt["Option name"], isSwitchOption]);
                    break;
                default:
                    bottomCustomOptions.push([tag, opt["Option name"], isSwitchOption]);
                    break;
            }
        }
        
        customOptions = dict;
    }

    Window_Options.prototype.addFullscreenOption = function(pos) {
        if (fullscreenOption[0] === true && fullscreenOption[2] == pos) {
            this.addCommand(fullscreenOption[1], "fullscreen");
        }
    }
    
    Window_Options.prototype.addWindowStateOption = function(pos) {
        if (windowStateOption[0] === true && windowStateOption[2] == pos) {
            this.addCommand(windowStateOption[1], "windowStateOption");
        }
    }
    
    Window_Options.prototype.addMessageSpeedOption = function(pos) {
        if (messageSpeedOption[0] === true && messageSpeedOption[2] == pos) {
            this.addCommand(messageSpeedOption[1], "messageSpeedVolume");
            this.changeValue("messageSpeedVolume", messageSpeedValue);
        }
    }
    
    Window_Options.prototype.changeMessageSpeed = function(symbol, forward, wrap) {
        const offset = 1;
        messageSpeedValue += (forward ? offset : -offset);
        if (messageSpeedValue > (messageSpeedOption[4]) && wrap) {
            messageSpeedValue = 1;
        } else {
            messageSpeedValue = getClamp(messageSpeedValue, 1, messageSpeedOption[4]);
        }
        
        this.changeValue("messageSpeedVolume", messageSpeedValue);
    }
    
    Window_Options.prototype.addCustomOptions = function(pos) {
        let arr = undefined;
        switch (pos) {
            case 0:
                arr = topCustomOptions;
                break;
            case 1:
                arr = middleCustomOptions;
                break;
            default:
                arr = bottomCustomOptions;
                break;
        }
        
        for (let i = 0; i < arr.length; ++i) {
            this.addCommand(arr[i][1], arr[i][0]);
            let co = customOptions[arr[i][0]];
            let n = co[1];
            let value = this.getConfigValue(arr[i][0]);
            if (value == undefined) {
                if (arr[i][2] === true) {
                    value = $gameSwitches.value(n);
                }
                else {
                    const varValue = $gameVariables.value(n);
                    if (varValue < co[2]) {
                        $gameVariables.setValue(n, co[2]);
                    }
                    else if (varValue > co[3]) {
                        $gameVariables.setValue(n, co[3]);
                    }
                    
                    value = $gameVariables.value(n);
                }
                
                this.changeValue(arr[i][0], value);
            }
        }
    }

    Window_Options.prototype.phileasProcessOk = function(method) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol == "fullscreen") {
            Graphics._switchFullScreen();
        }
        else {
            let opt = customOptions[symbol];
            if (opt != undefined && opt[0] == true) {
                $gameSwitches.setValue(opt[1], !$gameSwitches.value(opt[1]));
            }
            
            method.call(this);
        }
    }

//--------CHANGED CORE:

    const Origin_Scene_Option_optionsWindowRect = Scene_Options.prototype.optionsWindowRect;
    Scene_Options.prototype.optionsWindowRect = function() {
        if (optionsWindowWidth == 0) {
            return Origin_Scene_Option_optionsWindowRect.call(this);
        }

        const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
        const ww = optionsWindowWidth;
        const wh = this.calcWindowHeight(n, true);
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    const Origin_Scene_Options_maxVisibleCommands = Scene_Options.prototype.maxVisibleCommands;
    Scene_Options.prototype.maxVisibleCommands = function() {
        return optionsWindowMaxVisibleCommands == 0
            ? Origin_Scene_Options_maxVisibleCommands.call(this)
            : optionsWindowMaxVisibleCommands;
    };

    const Origin_Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return this.maxVisibleCommands();
    };

    Window_Options.prototype.makeCommandList = function() {
        this.addFullscreenOption(0);
        this.addWindowStateOption(0);
        this.addMessageSpeedOption(0);
        this.addCustomOptions(0);
        this.addGeneralOptions();
        this.addFullscreenOption(1);
        this.addWindowStateOption(1);
        this.addCustomOptions(1);
        this.addMessageSpeedOption(1);
        this.addVolumeOptions();
        this.addFullscreenOption(2);
        this.addWindowStateOption(2);
        this.addCustomOptions(2);
        this.addMessageSpeedOption(2);
    };

    Window_Options.prototype.addGeneralOptions = function() {
        if (alwaysDashOption.addAlwaysDash) {
            this.addCommand(TextManager.alwaysDash, "alwaysDash");
        }
        
        if (showCommandRemember) {
            this.addCommand(TextManager.commandRemember, "commandRemember");
        }
        
        if (showTouchUI) {
            this.addCommand(TextManager.touchUI, "touchUI");
        }
    };

    Window_Options.prototype.addVolumeOptions = function() {
        if (showBGMVolume) {
            this.addCommand(TextManager.bgmVolume, "bgmVolume");
        }
        
        if (showBGSVolume) {
            this.addCommand(TextManager.bgsVolume, "bgsVolume");
        }
        
        if (showMEVolume) {
            this.addCommand(TextManager.meVolume, "meVolume");
        }
        
        if (showSEVolume) {
            this.addCommand(TextManager.seVolume, "seVolume");
        }
    };
    
    const Origin_changeVolume = Window_Options.prototype.changeVolume;
    Window_Options.prototype.changeVolume = function(symbol, forward, wrap) {
        if (symbol == "messageSpeedVolume") {
            this.changeMessageSpeed(symbol, forward, wrap);
            return;
        }
        
        let opt = customOptions[symbol];
        if (opt == undefined || opt[0] == true) {
            Origin_changeVolume.call(this, symbol, forward, wrap);
            return;
        }
        
        const lastValue = this.getConfigValue(symbol);
        const offset = opt[4];
        let value = lastValue + (forward ? offset : -offset);
        if (value > opt[3] && wrap) {
            value = opt[2];
        } else {
            value = getClamp(value, opt[2], opt[3]);
        }
        
        this.changeValue(symbol, value);
        $gameVariables.setValue(opt[1], value);
    };
    
    Window_Options.prototype.volumeOffset = function() {
        return volumeOffset;
    };
    
    const Origin_Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        this.phileasProcessOk(Origin_Window_Options_processOk);
    };

    const Origin_Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function() {
        this.phileasProcessOk(Origin_Window_Options_cursorRight);
    };
    
    const Origin_Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function() {
        this.phileasProcessOk(Origin_Window_Options_cursorLeft);
    };
    
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (symbol == "messageSpeedVolume") {
            const speedName = messageSpeedOption[6][messageSpeedValue];
            return speedName ? speedName : messageSpeedValue;
        }

        const value = this.getConfigValue(symbol);

        if (symbol == "alwaysDash" && !alwaysDashOption.defaultStatusText) {
            return value
                ? alwaysDashOption.switchOnText
                : alwaysDashOption.switchOffText;
        }

        let opt = customOptions[symbol];

        if (this.isVolumeSymbol(symbol)) {
            return opt != undefined ? value + opt[5] : this.volumeStatusText(value);
        }

        if (opt == undefined) {
            return this.booleanStatusText(value);
        }

        if (value && opt[2] != "") {
            return opt[2];
        }

        if (!value && opt[3] != "") {
            return opt[3];
        }

        return this.booleanStatusText(value);
    };

    const Origin_Window_Options_statusWidth = Window_Options.prototype.statusWidth;
    Window_Options.prototype.statusWidth = function() {
        if (statusTextWidth == 0) {
            return Origin_Window_Options_statusWidth.call(this);
        }

        return statusTextWidth;
    };
    
    const Origin_switchFullscreen = Graphics._switchFullScreen;
    Graphics._switchFullScreen = function() {
        if (SceneManager._scene instanceof Scene_Options) {
            for (var i = 0; i < SceneManager._scene._windowLayer.children.length; ++i) {
                if (SceneManager._scene._windowLayer.children[i] instanceof Window_Options) {
                    SceneManager._scene._windowLayer.children[i].changeValue("fullscreen", !ConfigManager["fullscreen"]);
                    break;
                }
            }
        }
        else {
            ConfigManager["fullscreen"] = !ConfigManager["fullscreen"];
        }

        ConfigManager.save();
        Origin_switchFullscreen.call(this);
    };

    const Origin_onWindowResize = Graphics._onWindowResize;
    Graphics._onWindowResize = function() {
        Origin_onWindowResize.call(this);
        if (!Utils.isNwjs() || Utils.isMobileDevice()) {
            return;
        }
        
        const nwWindow = nw.Window.get();
        ConfigManager["windowWidth"] = nwWindow.width;
        ConfigManager["windowHeight"] = nwWindow.height;
        ConfigManager["windowState"] = nwWindow.cWindow.state;
        ConfigManager.save();
    };
    
    const Origin_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = Origin_makeData.call(this);
        config.fullscreen = fullscreenOption[3] === true ? ConfigManager["fullscreen"] : undefined;
        config.windowStateOption = windowStateOption[3] === true ? ConfigManager["windowStateOption"] : undefined;
        config.messageSpeed = messageSpeedOption[3] === true ? messageSpeedValue : undefined;
        config.screenWidth = ConfigManager["windowStateOption"] === true ? ConfigManager["windowWidth"] : undefined;
        config.screenHeight = ConfigManager["windowStateOption"] === true ? ConfigManager["windowHeight"] : undefined;
        config.windowState = ConfigManager["windowStateOption"] === true ? ConfigManager["windowState"] : undefined;

        for (tag in customOptions) {
            let opt = customOptions[tag];
            customOptions[tag].push(opt[0] ? $gameSwitches.value(opt[1]) : $gameVariables.value(opt[1]));
        }
        
        config.phileasCustomOption = customOptions;
        return config;
    };
    
    const Origin_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        if (config.fullscreen != undefined) {
            ConfigManager["fullscreen"] = config.fullscreen;
        }
        
        if (config.windowStateOption != undefined) {
            ConfigManager["windowStateOption"] = config.windowStateOption;
        }
        else {
            ConfigManager["windowStateOption"] = true;
        }
        
        if (config.messageSpeed != undefined) {
            messageSpeedValue = config.messageSpeed;
        }
        
        ConfigManager["windowWidth"] = config.screenWidth || $dataSystem.advanced.screenWidth;
        ConfigManager["windowHeight"] = config.screenHeight || $dataSystem.advanced.screenHeight;
        ConfigManager["windowState"] = config.windowState || "normal";
        
        if (config.phileasCustomOption != undefined) {
            for (tag in config.phileasCustomOption) {
                let opt = config.phileasCustomOption[tag];
                ConfigManager[tag] = opt[opt.length - 1];
            }
        }
        
        Origin_applyData.call(this, config);
    };
    
    const Origin_SceneBoot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        Origin_SceneBoot_start.call(this);
        if (ConfigManager["fullscreen"] == undefined) {
            ConfigManager["fullscreen"] = fullscreenOption[4];
        }

        if (ConfigManager["fullscreen"] === true) {
            Graphics._requestFullScreen();
        }
    };
    
    const Origin_SceneBoot_resizeScreen = Scene_Boot.prototype.resizeScreen;
    Scene_Boot.prototype.resizeScreen = function() {
        if (Utils.isNwjs() && !Utils.isMobileDevice()) {
            const screenWidth = Number(ConfigManager["windowWidth"]) || $dataSystem.advanced.screenWidth;
            const screenHeight = Number(ConfigManager["windowHeight"]) || $dataSystem.advanced.screenHeight;
            window.resizeTo(screenWidth, screenHeight);
            if (ConfigManager["windowState"] == "maximized") {
                nw.Window.get().maximize();
            }
        }
        
        Origin_SceneBoot_resizeScreen.call(this);
    };
    
    const Origin_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        Origin_createGameObjects.call(this);
        for (tag in customOptions) {
            let opt = customOptions[tag];
            if (opt[0] === true) {
                $gameSwitches.setValue(opt[1], ConfigManager[tag]);
            }
            else {
                $gameVariables.setValue(opt[1], ConfigManager[tag]);
            }
        }
    };

    const Origin_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function() {
        if (messageSpeedOption[4] == messageSpeedValue) {
            this._showFast = true;
        }
    
        Origin_updateShowFast.call(this);
        
        if (!this._anim && !this._showFast && messageSpeedValue < messageSpeedOption[4]) {
            this.startWait(messageSpeedOption[4] - messageSpeedValue);
        }
    };
    
}());
