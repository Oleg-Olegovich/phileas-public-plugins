//=============================================================================
// Phileas_TitleCredits.js
//=============================================================================
// [Update History]
// 2025.Sep.06 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc v1.0.0 Adds a "Credits" command to the title screen
 * @author Phileas
 *
 * @param credits
 * @text Credits
 * 
 * @param Credits Command Name
 * @parent credits
 * @type string
 * @default Credits
 * @desc The text shown on the new button in the title screen.
 *
 * @param Credits Text
 * @parent credits
 * @type note
 * @default "Special thanks to:\n- Phileas\n- ZX_Lost_Soul\n- Peter\n\nThank you for playing!"
 * @desc The acknowledgements text shown in the credits scene. Supports line breaks (\n) and escape codes.
 * 
 * @param creditsWidth
 * @parent credits
 * @text Credits Window Width
 * @type number
 * @min 1
 * @default 650
 * 
 * @param creditsHeight
 * @parent credits
 * @text Credits Window Height
 * @type number
 * @min 1
 * @default 430
 *
 * @param exitButton
 * @text Game Exit Button
 * 
 * @param addExitButton
 * @parent exitButton
 * @text Add Exit Game Button?
 * @type boolean
 * @default false
 * 
 * @param exitCommandName
 * @text Exit Command Name
 * @parent exitButton
 * @type string
 * @default Exit
 * @desc The text shown on the new button in the title screen.
 *
 * @help
 * The plugin adds an extra command to the title menu. When pressed, it opens a
 * simple scrollable window containing your acknowledgements text.
 *
 * You can also add an exit button.
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

/*:ru
 * @target MZ
 * @plugindesc v1.0.0 Добавляет на титульный экран кнопку "Благодарности"
 * @author Phileas
 *
 * @param credits
 * @text Благодарности
 *
 * @param Credits Command Name
 * @parent credits
 * @text Текст кнопки
 * @type string
 * @default Благодарности
 * @desc Надпись на новой кнопке на титульном экране
 *
 * @param Credits Text
 * @parent credits
 * @text Текст благодарностей
 * @type note
 * @default "Особая благодарность:\n- Phileas\n- ZX_Lost_Soul\n- Пётр\n\nСпасибо за игру!"
 * @desc Текст, который показывается в сцене благодарностей. Поддерживает переносы строк (\n) и escape-коды.
 * 
 * @param creditsWidth
 * @parent credits
 * @text Ширина окна благодарностей
 * @type number
 * @min 1
 * @default 650
 * 
 * @param creditsHeight
 * @parent credits
 * @text Высота окна благодарностей
 * @type number
 * @min 1
 * @default 430
 *
 * @param exitButton
 * @text Кнопка выхода из игры
 * 
 * @param addExitButton
 * @parent exitButton
 * @text Добавить кнопку выхода из игры?
 * @type boolean
 * @default false
 * 
 * @param exitCommandName
 * @text Текст кнопки
 * @parent exitButton
 * @type string
 * @default Exit
 * @desc Надпись на новой кнопке на титульном экране
 * 
 *
 * @help
 * Плагин добавляет кнопку на титульном экране. По нажатию открывается простое
 * прокручиваемое окно с текстом благодарностей из параметров.
 * 
 * Также можно добавить кнопку выхода из игры.
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
 */

"use strict";

(function() {

//--------MY CODE:

//-----------------------------------------------------------------------------
// Data
    const $parameters = PluginManager.parameters("Phileas_TitleCredits");
    const $creditsCommandName = $parameters["Credits Command Name"] || "Credits";
    const $creditsTextRaw = $parameters["Credits Text"] || "";
    const $creditsWidth = Number($parameters["creditsWidth"] || "1");
    const $creditsHeight = Number($parameters["creditsHeight"] || "1");
    const $creditsText = parseNote($creditsTextRaw);
    const $addExitButton = $parameters["addExitButton"] === "true";
    const $exitCommandName = $parameters["exitCommandName"] || "Exit";


//-----------------------------------------------------------------------------
// Utils

    function parseNote(value) {
        try {
            const parsed = JSON.parse(value);
            return typeof parsed === "string" ? parsed : String(value);
        } catch {
            return String(value);
        }
    }


//-----------------------------------------------------------------------------
// Window_PhileasCredits

    function Window_PhileasCredits() {
        this.initialize(...arguments);
    }

    Window_PhileasCredits.prototype = Object.create(Window_Scrollable.prototype);
    Window_PhileasCredits.prototype.constructor = Window_PhileasCredits;

    Window_PhileasCredits.prototype.initialize = function(rect) {
        Window_Scrollable.prototype.initialize.call(this, rect);
        this._lines = $creditsText.split("\n");
        this._lineHeight = this.lineHeight();
        this.drawText();
        this.activate();
    };

    Window_PhileasCredits.prototype.scrollHeight = function() {
        return this._lines.length * this._lineHeight + this.itemPadding() * 2;
    };

    Window_PhileasCredits.prototype.drawText = function() {
        const padX = this.itemPadding();
        const padY = this.itemPadding();
        let y = padY;
        for (let i = 0; i < this._lines.length; ++i) {
            this.drawTextEx(this._lines[i], padX, y, this.innerWidth - padX * 2);
            y += this._lineHeight;
        }
    };


//-----------------------------------------------------------------------------
// Scene_PhileasCredits

    function Scene_PhileasCredits() {
        this.initialize(...arguments);
    }

    Scene_PhileasCredits.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_PhileasCredits.prototype.constructor = Scene_PhileasCredits;

    Scene_PhileasCredits.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCreditsWindow();
    };

    Scene_PhileasCredits.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_PhileasCredits.prototype.createCreditsWindow = function() {
        const rect = this.creditsWindowRect();
        this._creditsWindow = new Window_PhileasCredits(rect);
        this.addWindow(this._creditsWindow);
    };

    Scene_PhileasCredits.prototype.creditsWindowRect = function() {
        const wx = Math.floor((Graphics.boxWidth - $creditsWidth) / 2);
        const wy = Math.floor((Graphics.boxHeight - $creditsHeight) / 2);
        return new Rectangle(wx, wy, $creditsWidth, $creditsHeight);
    };

    Scene_PhileasCredits.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
            this.popScene();
        }

        if (Input.isTriggered("ok")) {
            this.popScene();
        }
    };

    Scene_Title.prototype.commandsNumber = function() {
        return $addExitButton
            ? 5
            : 4;
    };

    Scene_Title.prototype.commandPhileasCredits = function() {
        this._commandWindow.close();
        this._commandWindow.deactivate();
        SceneManager.push(Scene_PhileasCredits);
    };

    Scene_Title.prototype.commandExit = function() {
        SceneManager.exit();
    };


//-----------------------------------------------------------------------------
// Modified code

    const Origin_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        Origin_Window_TitleCommand_makeCommandList.call(this);
        this.addCommand($creditsCommandName, "phileasCredits", true);

        if ($addExitButton) {
            this.addCommand($exitCommandName, "exit", true);
        }
    };

    const Origin_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        Origin_Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler("phileasCredits", this.commandPhileasCredits.bind(this));

        if ($addExitButton) {
            this._commandWindow.setHandler("exit", this.commandExit.bind(this));
        }
    };

    Scene_Title.prototype.commandWindowRect = function() {
        const offsetX = $dataSystem.titleCommandWindow.offsetX;
        const offsetY = $dataSystem.titleCommandWindow.offsetY;
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(this.commandsNumber(), true);
        const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
        const wy = Graphics.boxHeight - wh - 96 + offsetY;
        return new Rectangle(wx, wy, ww, wh);
    };

}());
