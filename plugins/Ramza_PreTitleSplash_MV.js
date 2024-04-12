//=============================================================================
// Ramza Plugins - Pre-Title Splash Events
// Ramza_PreTitleSplash_MV.js
// v1.12-Phileas
//=============================================================================

var Ramza = Ramza || {};
var Imported = Imported || {}
Ramza.PTS = Ramza.PTS || {};
Ramza.PTS.version = 1.12
Imported['Ramza_PreTitleSplash_MV'] = true

//=============================================================================
//=============================================================================
/*:
 * @target MV
 * @plugindesc v1.12-Phileas Disclaimer and splash screen (images, videos) prior to the title.
 * @author Ramza & Phileas
 *
 * @param SkipMode
 * @text Skip Mode
 * @type select
 * @option Current
 * @option All
 * @option Ignore
 * @desc When the player presses an input, what screen will be skipped?
 * @default Current
 *
 * @param Screens
 * @text Splash Screens
 * @type struct<splashscreens>[]
 * @desc List of splash screens that are shown in order.
 * @default []
 * 
 * @param WaitFrames
 * @text Wait Frames
 * @desc How many frames to wait between splash screens?
 * @type number
 * @default 120
 *
 * @param FadeInFrames
 * @text Fade In Frames
 * @desc How many frames it takes an image splash to fade in.
 * @type number
 * @default 90
 * 
 * @param FadeOutFrames
 * @text Fade Out Frames
 * @desc How many frames it takes an image splash to fade out.
 * @type number
 * @default 90
 *
 * @param AutomaticFadeOut
 * @text Automatic Fade Out
 * @desc Should splash screens disappear automatically?
 * @type boolean
 * @default true
 *
 * @param HoldFrames
 * @text Static Image Frames
 * @desc How many frames a static splash screen stays on screen for before fading out. Only if "Automatic Fade Out" is on.
 * @type number
 * @default 360
 *
 * @param Disclaimer
 * @text Disclaimer
 * @type struct<disclaimer>
 * @default {"Show":"false","After":"true","ShowMessage":"true","MessageText":"Disclaimer","MessagePosition":"Top","AcceptChoiceText":"Accept","CancelChoiceText":"Cancel","ChoicesPosition":"Right","MessageBackground":"Window","ScreenBackgroundPicture":""}
 *
 *
 * @help
 * ============================================================================
 * Description:
 * ============================================================================
 *
 * This is a modification of the original plugin created by Ramza.
 * The author of the modification is Phileas.
 *
 * This plugin allows you to show one or more splash screen before the title
 * screen loads. A screen can be a static image, or a video.
 *
 * If an image is used, the image is always loaded in the exact center of the 
 * screen. The image fades in for a configurable number of frames, then pauses
 * for another configurable number of frames, then fades out for a third
 * configurable number of frames. An individual image can have its hold time 
 * longer or shorter than the default, meaning you can specify on an individual
 * basis how long each image stays on the screen.
 *
 * A video will simply play in fullscreen mode until complete. It will maintain
 * aspect ratio automatically, so you may see black bars on the sides or top
 * and bottom of the video if the aspect ratio isn't the same as your project.
 * 
 * After a splash (image or video) plays, a configurable amount of time is 
 * waited before the next one. When there are no more, the titlescreen will 
 * load as normal.
 *
 * You can configure what happens if a player presses ok or cancel, or clicks 
 * the mouse during these splash screens. Either the current splash is skipped,
 * all remaining screens are skipped, and the title screen is shown, or nothing
 * happens at all.
 *
 * Phileas: You can also show the disclaimer before or after the screensavers.
 * The disclaimer has 2 options: one continues the game, the other closes it.
 * You can customize the disclaimer message, option names, and background image.
 *
 * ============================================================================
 * Terms of Use:
 * ============================================================================
 * 
 * -Free for commercial and non-commercial use, with credit to me, Ramza (and Phileas).
 * -Do not edit the header of this plugin, or claim sole ownership of it.
 * -Editing the plugin to add new features, or fix compatibility problems is 
 *  allowed.
 * -Redistributing this plugin is also allowed.
 *
 * ============================================================================
 * Changelog:
 * ============================================================================
 *
 * Version 1.12-Phileas:
 * - Audio.
 *
 * Version 1.11-Phileas:
 * - Compatible with HIME Hidden Choice Conditions.
 *
 * Version 1.1-Phileas:
 * - Fixed errors and typos in the description
 * - Added the ability to disable the automatic disappearing of splash screens
 * - A disclaimer has been added
 *
 * Version 1.02:
 * -Corrected an issue where I incorrectly declared a variable as a constant,
 *  which caused a crash error together with other plugins that did the same 
 *  thing in the same place which happened to have the same name. (like my 
 *  screen idle video plugin)
 *
 * Version 1.01:
 * -Corrected a Crash bug where left clicking anywhere other than the splash 
 *  screen could cause the engine to crash.
 *
 * Version 1.00:
 * -Initial release
 * 
 * **end of help file**
*/
/*~struct~splashscreens:
 * @param Type
 * @type select
 * @option Image
 * @option Video
 * @desc Is this an image or a video splash?
 * @param File
 * @desc The filename of the splash to show, include the folder
 * Eg: /movies/splash1.webm /img/pictures/splash2
 * @param CustomHold
 * @type number
 * @desc If this is an Image, how long will it stay on the screen for?
 *
 * @param Bgm
 * @text BGM
 * @type struct<bgmStruct>
 *
 * @param Bgs
 * @text BGS
 * @type struct<bgsStruct>
 *
 * @param Me
 * @text ME
 * @type struct<meStruct>
 *
 * @param Se
 * @text SE
 * @type struct<seStruct>
*/
/*~struct~disclaimer:
 * @param Show
 * @text Show a disclaimer?
 * @type boolean
 * @default false
 *
 * @param After
 * @text After the splash screens
 * @type boolean
 * @desc If true, the disclaimer will be displayed after splash screens, if false, before them.
 * @default true
 *
 * @param ShowMessage
 * @text Show a message?
 * @type boolean
 * @default true
 *
 * @param MessageText
 * @text Message text
 * @default Disclaimer
 *
 * @param MessagePosition
 * @text Message position
 * @type select
 * @option Top
 * @option Middle
 * @option Bottom
 *
 * @param AcceptChoiceText
 * @text The accept choice text
 * @default Accept
 *
 * @param CancelChoiceText
 * @text The cancel choice text
 * @default Cancel
 *
 * @param ChoicesPosition
 * @text Choices position
 * @type select
 * @option Right
 * @option Left
 * @option Middle
 *
 * @param DefaultAcceptChoice
 * @text Default choice is accept
 * @type boolean
 * @default true
 *
 * @param MessageBackground
 * @text Message and choices background
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 *
 * @param ScreenBackgroundPicture
 * @text Screen background picture
 * @type file
 * @dir img/pictures/
 * @desc Input picture file name. You can input nothing.
 *
 * @param Bgm
 * @text BGM
 * @type struct<bgmStruct>
 *
 * @param Bgs
 * @text BGS
 * @type struct<bgsStruct>
 *
 * @param Me
 * @text ME
 * @type struct<meStruct>
 *
 * @param Se
 * @text SE
 * @type struct<seStruct>
*/
/*~struct~bgmStruct:
 * @param Bgm
 * @text BGM
 * @type file
 * @dir audio/bgm/
 * @require 1
 * @desc The melody will play during the image display.
 *
 * @param BgmVolume
 * @text BGM Volume
 * @type number
 * @desc This will be the volume of the BGM played.
 * @default 90
 *
 * @param BgmPitch
 * @text BGM Pitch
 * @type number
 * @desc This will be the pitch of the BGM played.
 * @default 100
 *
 * @param BgmPan
 * @text BGM Pan
 * @desc This will be the pan of the BGM played.
 * @default 0
*/
/*~struct~bgsStruct:
 * @param Bgs
 * @text BGS
 * @type file
 * @dir audio/bgs/
 * @require 1
 * @desc The sound will play during the image display.
 *
 * @param BgsVolume
 * @text BGS Volume
 * @type number
 * @desc This will be the volume of the BGS played.
 * @default 90
 *
 * @param BgsPitch
 * @text BGS Pitch
 * @type number
 * @desc This will be the pitch of the BGS played.
 * @default 100
 *
 * @param BgsPan
 * @text BGS Pan
 * @desc This will be the pan of the BGS played.
 * @default 0
*/
/*~struct~meStruct:
 * @param Me
 * @text ME
 * @type file
 * @dir audio/me/
 * @require 1
 * @desc The effect is played when the image appears.
 *
 * @param MeVolume
 * @text ME Volume
 * @type number
 * @desc This will be the volume of the ME played.
 * @default 90
 *
 * @param MePitch
 * @text ME Pitch
 * @type number
 * @desc This will be the pitch of the ME played.
 * @default 100
 *
 * @param MePan
 * @text ME Pan
 * @desc This will be the pan of the ME played.
 * @default 0
*/
/*~struct~seStruct:
 * @param Se
 * @text SE
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc The sound is played when the image appears.
 *
 * @param SeVolume
 * @text SE Volume
 * @type number
 * @desc This will be the volume of the SE played.
 * @default 90
 *
 * @param SePitch
 * @text SE Pitch
 * @type number
 * @desc This will be the pitch of the SE played.
 * @default 100
 *
 * @param SePan
 * @text SE Pan
 * @desc This will be the pan of the SE played.
 * @default 0
*/
/*:ru
 * @target MV
 * @plugindesc v1.1-Phileas Дисклеймер, картинки и видео перед титульником.
 * @author Ramza & Phileas
 *
 * @param SkipMode
 * @text Режим пропуска
 * @type select
 * @option Current
 * @option All
 * @option Ignore
 * @desc Когда игрок нажимает кнопку ввода, какой экран будет пропущен?
 * @default Current
 *
 * @param Screens
 * @text Заставки
 * @type struct<splashscreens>[]
 * @desc Список заставок, которые отображаются по порядку.
 * @default []
 * 
 * @param WaitFrames
 * @text Ожидание (кадры)
 * @desc Сколько кадров нужно подождать между заставками?
 * @type number
 * @default 120
 *
 * @param FadeInFrames
 * @text Появление (кадры)
 * @desc Сколько кадров требуется, чтобы заставка появилась.
 * @type number
 * @default 90
 * 
 * @param FadeOutFrames
 * @text Исчезновение (кадры)
 * @desc Сколько кадров требуется, чтобы заставка исчезла.
 * @type number
 * @default 90
 *
 * @param AutomaticFadeOut
 * @text Автоматическое исчезновение
 * @desc Заставки должны исчезать автоматически?
 * @type boolean
 * @default true
 *
 * @param HoldFrames
 * @text Static Image Frames
 * @desc Сколько кадров статическая заставка остаётся на экране, прежде чем исчезнет. Только если включено "Автоматическое исчезновение".
 * @type number
 * @default 360
 *
 * @param Disclaimer
 * @text Дисклеймер
 * @type struct<disclaimer>
 * @default {"Show":"false","After":"true","ShowMessage":"true","MessageText":"Disclaimer","MessagePosition":"Top","AcceptChoiceText":"Accept","CancelChoiceText":"Cancel","ChoicesPosition":"Right","MessageBackground":"Window","ScreenBackgroundPicture":""}
 *
 *
 * @help
 * ============================================================================
 * Описание:
 * ============================================================================
 *
 * Это модификация оригинального плагина, созданного Ramza. 
 * Автор модификации - Phileas.
 * 
 * Локализация плагина на русский язык - Phileas.
 *
 * Этот плагин позволяет вам показывать одну или несколько заставок перед
 * загрузкой титульного экрана. Экраном может быть статичное изображение или видео.
 *
 * Если используется изображение, оно всегда загружается точно по центру экрана. 
 * Изображение исчезает на настраиваемое количество кадров, затем приостанавливается
 * на другое настраиваемое количество кадров, затем исчезает на третье настраиваемое
 * количество кадров. Время удержания отдельного изображения может быть больше или
 * меньше значения по умолчанию, что означает, что вы можете индивидуально указать,
 * как долго каждое изображение остается на экране.
 *
 * Видео будет просто воспроизводиться в полноэкранном режиме до завершения.
 * Оно автоматически сохранит соотношение сторон, поэтому вы можете увидеть черные
 * полосы по бокам или вверху и внизу видео, если соотношение сторон не
 * соответствует вашему проекту.
 * 
 * После воспроизведения заставки (изображения или видео) перед следующей следует
 * подождать настраиваемое количество времени. Когда их больше не будет,
 * титульный экран загрузится в обычном режиме.
 *
 * Вы можете настроить, что произойдет, если игрок нажмет "Ок" или "отмена" или
 * щелкнет мышью во время этих заставок. Либо текущая заставка будет пропущена,
 * все остальные экраны будут пропущены, и будет показан титульный экран,
 * либо вообще ничего не произойдет.
 *
 * Phileas: вы также можете показать дисклеймер до или после заставок.
 * У дисклеймера 2 опции: одна продолжает игру, другая её закрывает.
 * Вы можете настроить сообщение дисклеймера, названия опций и фоновую картинку.
 *
 * ============================================================================
 * Условия использования:
 * ============================================================================
 * 
 * -Бесплатно для коммерческого и некоммерческого использования, с упоминанием Ramza и Phileas.
 * -Не редактируйте заголовок этого плагина и не претендуйте на единоличное владение им.
 * -Допускается редактирование плагина для добавления новых функций 
 * или устранения проблем с совместимостью.
 * -Распространение этого плагина также разрешено.
 *
 * ============================================================================
 * Журнал изменений:
 * ============================================================================
 *
 * Version 1.12-Phileas:
 * - Аудио.
 *
 * Version 1.11-Phileas:
 * - Совместимость HIME Hidden Choice Conditions.
 *
 * Version 1.1-Phileas:
 * - Исправлены ошибки и опечатки в описании
 * - Добавлена возможность отключить автоматическое исчезновение заставок
 * - Был добавлен дисклеймер
 *
 * Version 1.02:
 * -Corrected an issue where I incorrectly declared a variable as a constant,
 *  which caused a crash error together with other plugins that did the same 
 *  thing in the same place which happened to have the same name. (like my 
 *  screen idle video plugin)
 *
 * Version 1.01:
 * -Corrected a Crash bug where left clicking anywhere other than the splash 
 *  screen could cause the engine to crash.
 *
 * Version 1.00:
 * -Initial release
 * 
 * **end of help file**
*/
/*~struct~splashscreens:ru
 * @param Type
 * @text Тип
 * @type select
 * @option Image
 * @option Video
 * @desc Картинка или видео?
 * @param File
 * @text Файл
 * @desc Имя файла заставки, которую нужно отобразить, включает папку
 * Например: /movies/splash1.webm /img/pictures/splash2
 * @param CustomHold
 * @text Удержание (кадры)
 * @type number
 * @desc Если это картинка, то как долго оно будет оставаться на экране?
 *
 * @param Bgm
 * @text BGM
 * @type struct<bgmStruct>
 *
 * @param Bgs
 * @text BGS
 * @type struct<bgsStruct>
 *
 * @param Me
 * @text ME
 * @type struct<meStruct>
 *
 * @param Se
 * @text SE
 * @type struct<seStruct>
*/
/*~struct~disclaimer:ru
 * @param Show
 * @text Показывать дисклеймер?
 * @type boolean
 * @default false
 *
 * @param After
 * @text После заставок
 * @type boolean
 * @desc Если значение true, дисклеймер будет отображаться после заставок, если значение false, то перед ними.
 * @default true
 *
 * @param ShowMessage
 * @text Показывать сообщение?
 * @type boolean
 * @default true
 *
 * @param MessageText
 * @text Текст сообщения
 * @default Disclaimer
 *
 * @param MessagePosition
 * @text Положение сообщения
 * @type select
 * @option Top
 * @option Middle
 * @option Bottom
 *
 * @param AcceptChoiceText
 * @text Текст варианта "Принять"
 * @default Accept
 *
 * @param CancelChoiceText
 * @text Текст варианта "Отклонить"
 * @default Cancel
 *
 * @param ChoicesPosition
 * @text Положение вариантов
 * @type select
 * @option Right
 * @option Left
 * @option Middle
 *
 * @param DefaultAcceptChoice
 * @text Вариант по умолчанию - "Принять"
 * @type boolean
 * @default true
 *
 * @param MessageBackground
 * @text Фон сообщения и вариантов
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 *
 * @param ScreenBackgroundPicture
 * @text Фоновая картинка экрана
 * @type file
 * @dir img/pictures/
 * @desc Введите имя файла изображения. Вы можете ничего не вводить.
 *
 * @param Bgm
 * @text BGM
 * @type struct<bgmStruct>
 *
 * @param Bgs
 * @text BGS
 * @type struct<bgsStruct>
 *
 * @param Me
 * @text ME
 * @type struct<meStruct>
 *
 * @param Se
 * @text SE
 * @type struct<seStruct>
*/
/*~struct~bgmStruct:ru
 * @param Bgm
 * @text BGM
 * @type file
 * @dir audio/bgm/
 * @require 1
 * @desc Мелодия будет воспроизводиться во время отображения изображения.
 *
 * @param BgmVolume
 * @text BGM Volume
 * @type number
 * @desc Громкость воспроизводимого BGM.
 * @default 90
 *
 * @param BgmPitch
 * @text BGM Pitch
 * @type number
 * @desc Темп воспроизводимого BGM.
 * @default 100
 *
 * @param BgmPan
 * @text BGM Pan
 * @desc Панорама воспроизводимого BGM.
 * @default 0
*/
/*~struct~bgsStruct:ru
 * @param Bgs
 * @text BGS
 * @type file
 * @dir audio/bgs/
 * @require 1
 * @desc Звук будет воспроизводиться во время отображения изображения.
 *
 * @param BgsVolume
 * @text BGS Volume
 * @type number
 * @desc Громкость воспроизводимого BGS.
 * @default 90
 *
 * @param BgsPitch
 * @text BGS Pitch
 * @type number
 * @desc Темп воспроизводимого BGS.
 * @default 100
 *
 * @param BgsPan
 * @text BGS Pan
 * @desc Панорама воспроизводимого BGS.
 * @default 0
*/
/*~struct~meStruct:ru
 * @param Me
 * @text ME
 * @type file
 * @dir audio/me/
 * @require 1
 * @desc Эффект будет воспроизводиться при появлении изображения.
 *
 * @param MeVolume
 * @text ME Volume
 * @type number
 * @desc Громкость воспроизводимого ME.
 * @default 90
 *
 * @param MePitch
 * @text ME Pitch
 * @type number
 * @desc Темп воспроизводимого ME.
 * @default 100
 *
 * @param MePan
 * @text ME Pan
 * @desc Панорама воспроизводимого ME.
 * @default 0
*/
/*~struct~seStruct:ru
 * @param Se
 * @text SE
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Звук будет воспроизводиться при появлении изображения.
 *
 * @param SeVolume
 * @text SE Volume
 * @type number
 * @desc Громкость воспроизводимого SE.
 * @default 90
 *
 * @param SePitch
 * @text SE Pitch
 * @type number
 * @desc Темп воспроизводимого SE.
 * @default 100
 *
 * @param SePan
 * @text SE Pan
 * @desc Панорама воспроизводимого SE.
 * @default 0
*/

//Initialize plugin params
var params = PluginManager.parameters('Ramza_PreTitleSplash_MV');
Ramza.PTS.params = {};
Ramza.PTS.params.skipMode = String(params['SkipMode']);
Ramza.PTS.params.waitFrames = Number(params['WaitFrames']);
Ramza.PTS.params.fadeInFrames = Number(params['FadeInFrames']);
Ramza.PTS.params.autoFadeOut = params['AutomaticFadeOut'] == "true";
Ramza.PTS.params.holdFrames = Number(params['HoldFrames']);
Ramza.PTS.params.fadeOutFrames = Number(params['FadeOutFrames']);
Ramza.PTS.params.splashList = JSON.parse(params['Screens']);
Ramza.PTS.params.splashList.forEach(function(ele, index){
	this[index] = JSON.parse(this[index])
    if (this[index].Type == "Image") {
        this[index].File = this[index].File.split("/");
        var file = this[index].File.pop();
        var folder = this[index].File.join('/') + "/";
        this[index].File = ImageManager.loadBitmap(folder, file);
        
        if (this[index].Bgm != undefined && this[index].Bgm != "") {
            const bgmStruct = JSON.parse(this[index].Bgm);
            this[index].Bgm = {
                name:   String(bgmStruct.Bgm),
                volume: Number(bgmStruct.BgmVolume),
                pitch:  Number(bgmStruct.BgmPitch),
                pan:    Number(bgmStruct.BgmPan)
            };
        }
        
        if (this[index].Bgs != undefined && this[index].Bgs != "") {
            const bgsStruct = JSON.parse(this[index].Bgs);
            this[index].Bgs = {
                name:   String(bgsStruct.Bgs),
                volume: Number(bgsStruct.BgsVolume),
                pitch:  Number(bgsStruct.BgsPitch),
                pan:    Number(bgsStruct.BgsPan)
            };
        }
        
        if (this[index].Me != undefined && this[index].Me != "") {
            const meStruct = JSON.parse(this[index].Me);
            this[index].Me = {
                name:   String(meStruct.Me),
                volume: Number(meStruct.MeVolume),
                pitch:  Number(meStruct.MePitch),
                pan:    Number(meStruct.MePan)
            };
        }
        
        if (this[index].Se != undefined && this[index].Se != "") {
            const seStruct = JSON.parse(this[index].Se);
            this[index].Se = {
                name:   String(seStruct.Se),
                volume: Number(seStruct.SeVolume),
                pitch:  Number(seStruct.SePitch),
                pan:    Number(seStruct.SePan)
            };
        }
	}
}, Ramza.PTS.params.splashList);

Ramza.PTS.params.disclaimer = {};
const disclaimerParams = JSON.parse(params['Disclaimer']);
Ramza.PTS.params.disclaimer.show = disclaimerParams['Show'] == "true";
Ramza.PTS.params.disclaimer.after = disclaimerParams['After'] == "true";
Ramza.PTS.params.disclaimer.showMessage = disclaimerParams['ShowMessage'] == "true";
Ramza.PTS.params.disclaimer.messageText = disclaimerParams['MessageText'];
Ramza.PTS.params.disclaimer.messagePosition = disclaimerParams['MessagePosition'];
Ramza.PTS.params.disclaimer.acceptChoiceText = disclaimerParams['AcceptChoiceText'];
Ramza.PTS.params.disclaimer.cancelChoiceText = disclaimerParams['CancelChoiceText'];
Ramza.PTS.params.disclaimer.choicesPosition = disclaimerParams['ChoicesPosition'];
Ramza.PTS.params.disclaimer.defaultAcceptChoice = disclaimerParams['DefaultAcceptChoice'] == "true";
Ramza.PTS.params.disclaimer.messageBackground = disclaimerParams['MessageBackground'];
Ramza.PTS.params.disclaimer.screenBackgroundPicture = disclaimerParams['ScreenBackgroundPicture'];

if (disclaimerParams['Bgm'] != undefined && disclaimerParams['Bgm'] != '') {
    const bgmStruct = JSON.parse(disclaimerParams['Bgm']);
    Ramza.PTS.params.disclaimer.Bgm = {
        name:   String(bgmStruct.Bgm),
        volume: Number(bgmStruct.BgmVolume),
        pitch:  Number(bgmStruct.BgmPitch),
        pan:    Number(bgmStruct.BgmPan)
    };
}

if (disclaimerParams['Bgs'] != undefined && disclaimerParams['Bgs'] != '') {
    const bgsStruct = JSON.parse(disclaimerParams['Bgs']);
    Ramza.PTS.params.disclaimer.Bgs = {
        name:   String(bgsStruct.Bgs),
        volume: Number(bgsStruct.BgsVolume),
        pitch:  Number(bgsStruct.BgsPitch),
        pan:    Number(bgsStruct.BgsPan)
    };
}

if (disclaimerParams['Me'] != undefined && disclaimerParams['Me'] != '') {
    const meStruct = JSON.parse(disclaimerParams['Me']);
    Ramza.PTS.params.disclaimer.Me = {
        name:   String(meStruct.Me),
        volume: Number(meStruct.MeVolume),
        pitch:  Number(meStruct.MePitch),
        pan:    Number(meStruct.MePan)
    };
}

if (disclaimerParams['Se'] != undefined && disclaimerParams['Se'] != '') {
    const seStruct = JSON.parse(disclaimerParams['Se']);
    Ramza.PTS.params.disclaimer.Se = {
        name:   String(seStruct.Se),
        volume: Number(seStruct.SeVolume),
        pitch:  Number(seStruct.SePitch),
        pan:    Number(seStruct.SePan)
    };
}

const phileas_musicDefaultStruct = {
    name:   "",
    volume: 0,
    pitch:  0,
    pan:    0
};

Ramza.PTS._go_to_scene = SceneManager.goto
SceneManager.goto = function(sceneClass) {
	if (this._scene && this._scene.constructor.name == "Scene_Boot" && sceneClass.name == "Scene_Title") {
        if (Ramza.PTS.params.disclaimer.show && !Ramza.PTS.params.disclaimer.after && !Ramza.PTS.params.disclaimer.showed) {
            sceneClass = Scene_Disclaimer;
        } else {
            sceneClass = Scene_PretitleSplash;
        }
	}
	Ramza.PTS._go_to_scene.call(this, sceneClass)
};

Ramza.PTS.createSplashList = function(){
	var list = []
	for (let i = 0; i < Ramza.PTS.params.splashList.length; i++){
		list.push(Ramza.PTS.params.splashList[i])
	}
	return list
};

Ramza.PTS._video_on_end = Graphics._onVideoEnd
Graphics._onVideoEnd = function (){
	if (SceneManager._scene.constructor.name === "Scene_PretitleSplash"){
		SceneManager._scene._dummyWindow._waiting = false
		Ramza.PTS._video_on_end.call(this)
	} else {
		Ramza.PTS._video_on_end.call(this)
	}
}

Ramza.PTS._on_left_button = TouchInput._onLeftButtonDown
TouchInput._onLeftButtonDown = function(event) {
	if (SceneManager._scene && SceneManager._scene.constructor && SceneManager._scene.constructor.name === "Scene_PretitleSplash"){
		SceneManager._scene._dummyWindow._mouseButtonPushed = true
	} else {
		Ramza.PTS._on_left_button.call(this, event)
	}
};

Ramza.PTS._on_right_button = TouchInput._onRightButtonDown
TouchInput._onRightButtonDown = function(event) {
	if (SceneManager._scene && SceneManager._scene.constructor && SceneManager._scene.constructor.name === "Scene_PretitleSplash"){
		SceneManager._scene._dummyWindow._mouseButtonPushed = true
	} else {
		Ramza.PTS._on_right_button.call(this, event)
	}
};

//================================
// Scene_PretitleSplash
//================================
// The scene shown on boot prior to moving to the title scene


function Scene_PretitleSplash() {
    this.initialize.apply(this, arguments);
}

Scene_PretitleSplash.prototype = Object.create(Scene_Base.prototype);
Scene_PretitleSplash.prototype.constructor = Scene_PretitleSplash;

Scene_PretitleSplash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_PretitleSplash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createWindowLayer();
	this.createDummyWindow();
	this.createSprite()
	this.centerSprite(this._splashSprite)
};

Scene_PretitleSplash.prototype.centerSprite = function(sprite) {
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
};

Scene_PretitleSplash.prototype.createSprite = function(){
	this._splashSprite = new Sprite(new Bitmap(0,0))
	this._splashSprite.opacity = 0
	this.addChild(this._splashSprite)
};

Scene_PretitleSplash.prototype.createDummyWindow = function(){
	var rect = new Rectangle(0,0,0,0)
    this._dummyWindow = new Window_DummyWindow(rect);
    this.addWindow(this._dummyWindow);
};

//=============================================================================
// Window_DummyWindow
//=============================================================================

function Window_DummyWindow() {
    this.initialize.apply(this, arguments);
}

Window_DummyWindow.prototype = Object.create(Window_Base.prototype);
Window_DummyWindow.prototype.constructor = Window_DummyWindow;

Window_DummyWindow.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this._frameCount = Ramza.PTS.params.waitFrames - 12
	this._waiting = false
};

Window_DummyWindow.prototype.update = function(){
	if (this._list == undefined){
		this._list = Ramza.PTS.createSplashList()
	}
	var okaypressed = (this._canRepeat) ? Input.isRepeated("ok") : Input.isTriggered("ok");
	var cancelpressed = (this._canRepeat) ? Input.isRepeated("cancel") : Input.isTriggered("cancel");
	if (okaypressed || cancelpressed || this._mouseButtonPushed){
		delete this._mouseButtonPushed
		if (Ramza.PTS.params.skipMode != "Ignore"){
			switch (Ramza.PTS.params.skipMode){
				case "Current":
				if (Graphics.isVideoPlaying()){
					Graphics._video.currentTime = Graphics._video.duration
				} else {
					delete this._fadeIn
					delete this._waitCounter
					delete this._customHold
					this._fadeOut = true
					this._fastFadeOut = true
				}
				break;
				case "All":
				if (Graphics.isVideoPlaying()){
					Graphics._video.currentTime = Graphics._video.duration
				} else {
					delete this._fadeIn
					delete this._waitCounter
					delete this._customHold
					this._fadeOut = true
					this._fastFadeOut = true
				}
				this._list = []
				this._frameCount = Ramza.PTS.params.waitFrames - 12
				break;
				default:
				break;
			}
		}
	}
	if (this._fadeIn){
		SceneManager._scene._splashSprite.opacity += (255/Ramza.PTS.params.fadeInFrames)
		if (SceneManager._scene._splashSprite.opacity >= 255) {
			delete this._fadeIn 
			this._waitCounter = 1
		}
	}
	
	if (this._waitCounter){
		this._waitCounter += 1
		if (this._customHold) {
			if (this._waitCounter >= this._customHold){
				delete this._waitCounter
				delete this._customHold
				this._fadeOut = true
			}
		} else if (Ramza.PTS.params.autoFadeOut && this._waitCounter >= Ramza.PTS.params.holdFrames) {
			delete this._waitCounter
			this._fadeOut = true
		}
	}
	if (this._fadeOut){
		var fastFade = (this._fastFadeOut) ? 10 : 1
		SceneManager._scene._splashSprite.opacity -= ((255/Ramza.PTS.params.fadeOutFrames) * fastFade )
		if (SceneManager._scene._splashSprite.opacity <= 0) {
			delete this._fadeOut
			this._waiting = false
		}
	}
	if (!this._waiting) this._frameCount += 1
	if (this._frameCount >= Ramza.PTS.params.waitFrames) {
		this._waiting = true
		if (this._list.length > 0 && this._list[0] && this._list[0].Type == "Video"){
			Graphics.playVideo(this._list[0].File)
		} else if (this._list.length > 0 && this._list[0] && this._list[0].Type == "Image") {
            console.log(this._list[0].Bgm);
            
            AudioManager.playBgm(this._list[0].Bgm || phileas_musicDefaultStruct);
            AudioManager.playBgs(this._list[0].Bgs || phileas_musicDefaultStruct);
            AudioManager.playMe(this._list[0].Me || phileas_musicDefaultStruct);
            AudioManager.playSe(this._list[0].Se || phileas_musicDefaultStruct);
            
			SceneManager._scene._splashSprite.bitmap = this._list[0].File
			this._fadeIn = true
			this._customHold = (this._list[0].CustomHold) ? Number(this._list[0].CustomHold) : 0
		} else {
            if (Ramza.PTS.params.disclaimer.after) {
                SceneManager.push(Scene_Disclaimer);
            } else {
                SceneManager.push(Scene_Title);
            }
		}
		this._list.shift()
		this._frameCount = 0
	}
	Window_Base.prototype.update.call(this)
};


//================================
// Scene_Disclaimer
//================================


function Scene_Disclaimer() {
    this.initialize.apply(this, arguments);
}

Scene_Disclaimer.prototype = Object.create(Scene_Base.prototype);
Scene_Disclaimer.prototype.constructor = Scene_Disclaimer;

Scene_Disclaimer.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Disclaimer.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    
    AudioManager.playBgm(Ramza.PTS.params.disclaimer.Bgm || phileas_musicDefaultStruct);
    AudioManager.playBgs(Ramza.PTS.params.disclaimer.Bgs || phileas_musicDefaultStruct);
    AudioManager.playMe(Ramza.PTS.params.disclaimer.Me || phileas_musicDefaultStruct);
    AudioManager.playSe(Ramza.PTS.params.disclaimer.Se || phileas_musicDefaultStruct);
    
    this.showBackground();
    this.createWindowLayer();
	this.createMessageWindow();
	this.showMessage();
	this.showChoices();
};

Scene_Disclaimer.prototype.createMessageWindow = function() {
    this._messageWindow = new Window_Message();
    this.addWindow(this._messageWindow);
    this._messageWindow.subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};

Scene_Disclaimer.prototype.showMessage = function() {
    if (Ramza.PTS.params.disclaimer.showMessage) {
        let msgBackground = 0;
        if (Ramza.PTS.params.disclaimer.messageBackground == "Dim") {
            msgBackground = 1;
        } else if (Ramza.PTS.params.disclaimer.messageBackground == "Transparent") {
            msgBackground = 2;
        }
        
        let msgPose = 0;
        if (Ramza.PTS.params.disclaimer.messagePosition == "Middle") {
            msgPose = 1;
        } else if (Ramza.PTS.params.disclaimer.messagePosition == "Bottom") {
            msgPose = 2;
        }
        
        $gameMessage.setBackground(msgBackground);
        $gameMessage.setPositionType(msgPose);
        $gameMessage.add(Ramza.PTS.params.disclaimer.messageText);
    }
};

Scene_Disclaimer.prototype.showChoices = function() {
    const choices = [Ramza.PTS.params.disclaimer.acceptChoiceText, Ramza.PTS.params.disclaimer.cancelChoiceText];
    const defaultChoice = Ramza.PTS.params.disclaimer.defaultAcceptChoice ? 0 : 1;
    const cancelType = 1;
    let choicesPose = 0;
    if (Ramza.PTS.params.disclaimer.choicesPosition == "Middle") {
        choicesPose = 1;
    } else if (Ramza.PTS.params.disclaimer.choicesPosition == "Right") {
        choicesPose = 2;
    }
    
    $gameMessage.setChoices(choices, defaultChoice, cancelType);
    $gameMessage.setChoiceBackground(Ramza.PTS.params.disclaimer.messageBackground);
    $gameMessage.setChoicePositionType(choicesPose);
    $gameMessage.setChoiceCallback(function(n) {
        if (n == 0) {
            if (Ramza.PTS.params.disclaimer.after) {
                SceneManager.push(Scene_Title);
            } else {
                SceneManager.push(Scene_PretitleSplash);
            }
        } else if (n == 1) {
            SceneManager.exit();
        }
    }.bind(this));
};

Scene_Disclaimer.prototype.showBackground = function() {
	if (Ramza.PTS.params.disclaimer.screenBackgroundPicture == undefined 
        || Ramza.PTS.params.disclaimer.screenBackgroundPicture == "") {
        return;
    }
    
    const name = Ramza.PTS.params.disclaimer.screenBackgroundPicture;
    this._backgroundPicture = new Sprite(ImageManager.loadPicture(name));
    this.addChild(this._backgroundPicture);
};

// Compatible with HIME Hidden Choice Conditions.
Origin_HIME_restoreChoices = Game_Message.prototype.restoreChoices;
Game_Message.prototype.restoreChoices = function() {
    if (SceneManager._scene.constructor.name != "Scene_Disclaimer") {
        Origin_HIME_restoreChoices.call(this);
    }
}
