//=============================================================================
// Open Digital World - Multi-Language System Plugin v1.2.0-Phileas
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.2.0-Phileas] - Manage game texts in several languages.
 * @author Open Digital World
 * @url https://opendigitalworld.itch.io/rmmz-plugin-multi-language-system
 * 
 * @help
 *-----------------------------------------------------------------------------
 * Open Digital World - Multi-Language System Plugin
 *-----------------------------------------------------------------------------
 * 
 * This plugin lets you translate game texts to suit your needs. Texts are
 * simply written in JSON files, grouped in language-specific folders. It is
 * also possible to configure fonts specifically for each language. The active
 * language can be selected from the game options window.
 * 
 *-----------------------------------------------------------------------------
 * How to use
 *-----------------------------------------------------------------------------
 * 
 * 1. Install and configure your plugin. Please note that the first language
 * in the "Languages" settings list will be the default language of the game.
 * You can reorder them as you want in the option box.
 * 
 * 2. Place the font files for your languages in the "fonts" folder at the root
 * of your game project.
 * 
 *    RMMZ Project Folder
 *    |_ Fonts Folder
 *       |_ Font 0.woff
 *       |_ Font 1.woff
 * 
 * 3. Create the language folders and files according to your plugin settings,
 * as follows (folder and file names are case sensitive):
 * 
 *    RMMZ Project Folder
 *    |_ Root Folder
 *       |_ Language Folder => Language [0]
 *          |_ Language File [0].json
 *          |_ Language File [1].json
 *          |_ ...
 *       |_ Language Folder => Language [1]
 *          |_ Language File [0].json
 *          |_ Language File [1].json
 *          |_ ...
 * 
 * 4. Develop your game, and for each text you want to translate, make sure
 * you follow the correct syntax below:
 * 
 * => In a text field of the RMMZ editor (database, message, plugin settings):
 * 
 *    ${text code}
 * 
 * => In a language file (JSON syntax):
 * 
 *    "text code": "text to display"
 * 
 * => To use the the control characters in translated texts (like color, icon,
 * variable, ...), double escape them like this in the "text to display":
 * 
 *    \C[0] -> \\C[0] or \V[1] -> \\V[1] or \. -> \\.
 * 
 * => You can also nest translated texts like this in the "text to display":
 * 
 *    "Text1": "an example",
 *    "Text2": "My text 1 is ${Text1}."
 * 
 *    -> Displayed result = My text is an example.
 * 
 * 5. During a game play, you can change the current active language in the
 * game option window.
 * 
 * See also README.md for more information about settings, commands, ...
 * 
 *-----------------------------------------------------------------------------
 * Known incompatibilities with other plugins
 *-----------------------------------------------------------------------------
 * 
 * Possibly with plugins that translate texts on the fly, but also those that
 * customize fonts.
 * 
 * DISCLAIMER: This plugin offers no guarantee of compatibility with VisuStella
 * plugins or those of other creators. However, patches can be made available
 * on the itch.io download platform on request.
 * 
 *-----------------------------------------------------------------------------
 * Support and feedbacks
 *-----------------------------------------------------------------------------
 * 
 * For plugin support, please join us here:
 * 
 * https://forums.rpgmakerweb.com/index.php?threads/odw-multi-language-system-plugin.141442/
 * 
 * NOTE: This plugin is a full rewritten and extended version of the "Ignis
 * Text Database" plugin by Raizen. Also inspired by some features present in
 * the "DKTools Localization" plugin by DK.
 * 
 * Original sources:
 *   - https://github.com/comuns-rpgmaker/Ignis-Engine/blob/master/IgnisTextDatabase.js
 *   - https://dk-plugins.ru/mz/system/localization/
 * 
 *-----------------------------------------------------------------------------
 * Version history
 *-----------------------------------------------------------------------------
 * 
 * 21.10.2021 v1.0.0
 *   - Initial release.
 * 19.09.2022 v1.0.1
 *   - Fixed a processing bug when the text has the ${} pattern twice or more.
 * 03.08.2023 v1.0.2
 *   - Fixed a syntax error in the $.updateIndex() function.
 * 01.09.2023 v1.0.3
 *   - Rewrite the text database load process.
 * 19.11.2023 v1.0.4
 *   - Revert the changes made in v1.0.3, to load the text database later in the game boot process.
 * 25.05.2024 v1.1.0
 *   - Improved the documentation.
 *   - Improved the code for parsing language settings.
 *   - Added new font settings per language.
 *   - Added a new global parameter to display/hide the error log in the console.
 *   - Removed the $.getCodes() and $.getLabels() functions.
 *   - Removed the $._isDatabaseLoaded property and $.isDatabaseLoaded() function.
 *   - Removed the compatibility code for VisuStellaMZ plugins (replaced by a patch).
 * 25.06.2024 v1.2.0-Phileas
 *   - Added array and dictionaries.
 * 
 *-----------------------------------------------------------------------------
 * Terms of use - MIT License
 *-----------------------------------------------------------------------------
 * 
 * Copyright (c) 2024 Open Digital World
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 *-----------------------------------------------------------------------------
 * 
 * 
 * @param option
 * @text Option Label
 * @desc The label for the language selection option. Can be a translatable text ${<text code>}.
 * @type string
 * @default Languages
 * 
 * @param folder
 * @text Root Folder
 * @desc The folder containing the languages files stored in subdirectories per language.
 * @type string
 * @default languages
 * 
 * @param fonts
 * @text Fonts
 * @desc The list of custom fonts for languages.
 * @type struct<font>[]
 * @default []
 * 
 * @param languages
 * @text Languages
 * @desc The list of the languages used in the game.
 * @type struct<Language>[]
 * @default []
 * 
 * @param useErrorLog
 * @text Use Error Log
 * @desc Indicates whether the error log is displayed in the console or not.
 * @type boolean
 * @on Display
 * @off Hide
 * @default false
 * 
 */

/*~struct~font:
 * @param name
 * @text Font Name
 * @desc The name that'll be used to recognize the font.
 * @type string
 * 
 * @param file
 * @text Font File
 * @desc The font file in the /fonts folder.
 * @type string
 */

/*~struct~Language:
 * @param code
 * @text Language Code
 * @desc The code of this language, such as the ISO format.
 * @type string
 * @default en
 * 
 * @param label
 * @text Language Label
 * @desc The label of this language, in its original translation (displayed as a language selection option).
 * @type string
 * @default English
 * 
 * @param folder
 * @text Language Folder
 * @desc The folder containing the JSON files for this language, put inside the <Root Folder>.
 * @type string
 * @default eng
 * 
 * @param fontName
 * @text Language Font Name
 * @desc The font name used as the main font for this language, a value from the list of languages fonts.
 * @type string
 * @default rmmz-mainfont
 * 
 * @param fontSize
 * @text Language Font Size
 * @desc The font size used for the main font for this language, a value between 12 and 108.
 * @type number
 * @min 12
 * @max 108
 * @default 26
 * 
 * @param files
 * @text Language Files
 * @desc The list of the JSON files (without extension) for this language, put inside the <Language Folder>.
 * @type string[]
 * @default ["main"]
 * 
 * @param coreTexts
 * @text Core Texts
 * @desc Hardcoded game engine texts that cannot be translated from the database.
 * 
 * @param miss
 * @parent coreTexts
 * @text Miss Label
 * @desc The label of the "Miss" text, in its original translation.
 * @type string
 * @default Miss
 * 
 * @param on
 * @parent coreTexts
 * @text ON Label
 * @desc The "ON" wording of the option value, in its original translation.
 * @type string
 * @default ON
 * 
 * @param off
 * @parent coreTexts
 * @text OFF Label
 * @desc The "OFF" wording of the option value, in its original translation.
 * @type string
 * @default OFF
 * 
 */

var Imported = Imported || {};
Imported.ODW_MultiLanguageSystem = true;

var ODW = ODW || {};
ODW.MLS = ODW.MLS || {};
ODW.MLS.pluginName = "ODW_MultiLanguageSystem";
ODW.MLS.pluginVersion = [1, 1, 0];

(($) => {

	'use strict';

	/*
	 *-----------------------------------------------------------------------------
	 * PLUGIN SETTINGS
	 *-----------------------------------------------------------------------------
	 */

	const pluginParams = PluginManager.parameters(ODW.MLS.pluginName);

	// Declare plugin params.
	$._option = pluginParams.option;
	$._folder = pluginParams.folder;
	$._fonts = JSON.parse(pluginParams.fonts).map((e) => {return JSON.parse(e)});
	$._languages = JSON.parse(pluginParams.languages);
	$._useErrorLog = JSON.parse(pluginParams.useErrorLog);

	// Declare the language database.
	$._database = {};

	/*
	 *-----------------------------------------------------------------------------
	 * OPTION
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the label of the languages option.
	 *
	 * @return string
	 */
	$.getOption = function() {
		return this._option;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * FOLDER
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the root folder of the languages files.
	 *
	 * @return string
	 */
	$.getFolder = function() {
		return this._folder;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * FONTS
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the list of custom fonts.
	 *
	 * @return string
	 */
	$.getFonts = function() {
		return this._fonts;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * INDEX
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the current active language index.
	 *
	 * @return number
	 */
	$.getCurrentIndex = function() {
		return ConfigManager["mlsLanguageIndex"];
	};

	/*
	 * Return the previous language index in the list.
	 *
	 * @return number
	 */
	$.getPrevIndex = function() {
		let newIndex = ConfigManager["mlsLanguageIndex"] - 1;
		if (newIndex < 0) {
			newIndex = this._languages.length - 1;
		}
		return newIndex;
	};

	/*
	 * Return the next language index in the list.
	 *
	 * @return number
	 */
	$.getNextIndex = function() {
		let newIndex = ConfigManager["mlsLanguageIndex"] + 1;
		if (newIndex >= this._languages.length) {
			newIndex = 0;
		}
		return newIndex;
	};

	/*
	 * Update the current active language index.
	 *
	 * @param number The new language index
	 *
	 * @return void
	 */
	$.updateIndex = function(newIndex) {
		if (this._languages.length > 0) {
			if (newIndex < this._languages.length) {
				ConfigManager["mlsLanguageIndex"] = newIndex;
				ConfigManager.save();
			} else {
				this.logErrorIndex(newIndex, "New index not found in configured languages.");
			}
		} else {
			this.logError("No languages configured.");
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language object for a specific language index.
	 *
	 * @param number The language index
	 *
	 * @return object
	 */
	$.getLanguage = function(index) {
		let language = {
			index: index,
			code: "",
			label: "",
			folder: "",
			files: [],
			fontName: "",
			fontSize: 0,
			miss: "Miss",
			on: "ON",
			off: "OFF"
		};
		if (this._languages.length > 0) {
			if (index < this._languages.length) {
				const languageParsed = JSON.parse(this._languages[index]);
				if (languageParsed.code) {
					language.code = languageParsed.code;
				} else {
					this.logErrorIndex(index, "Language code is missing for this index.");
				}
				if (languageParsed.label) {
					language.label = languageParsed.label;
				} else {
					this.logErrorIndex(index, "Language label is missing for this index.");
				}
				if (languageParsed.folder) {
					language.folder = languageParsed.folder;
				} else {
					this.logErrorIndex(index, "Language folder is missing for this index.");
				}
				if (languageParsed.files) {
					language.files = JSON.parse(languageParsed.files);
				} else {
					this.logErrorIndex(index, "Language files is missing for this index.");
				}
				if (languageParsed.fontName) {
					language.fontName = languageParsed.fontName;
				} else {
					this.logErrorIndex(index, "Language font name is missing for this index. Using system default instead.");
				}
				if (languageParsed.fontSize) {
					language.fontSize = Number.parseInt(languageParsed.fontSize);
				} else {
					this.logErrorIndex(index, "Language font size is missing for this index. Using system default instead.");
				}
				if (languageParsed.miss) {
					language.miss = languageParsed.miss;
				} else {
					this.logErrorIndex(index, "Language <Miss> label is missing for this index.");
				}
				if (languageParsed.on) {
					language.on = languageParsed.on;
				} else {
					this.logErrorIndex(index, "Language <ON> label is missing for this index.");
				}
				if (languageParsed.off) {
					language.off = languageParsed.off;
				} else {
					this.logErrorIndex(index, "Language <OFF> label is missing for this index.");
				}
			} else {
				this.logErrorIndex(index, "No language configured for this index.");
			}
		} else {
			this.logError("No languages configured.");
		}
		return language;
	};

	/*
	 * Return the language object for the current active language index.
	 *
	 * @return object
	 */
	$.getCurrentLanguage = function() {
		return this.getLanguage(this.getCurrentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * CODE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language code for a specific language index.
	 *
	 * @param number The language index
	 *
	 * @return string
	 */
	$.getCode = function(index) {
		return this.getLanguage(index).code;
	};

	/*
	 * Return the language code for the current active language index.
	 *
	 * @return string
	 */
	$.getCurrentCode = function() {
		return this.getCurrentLanguage().code;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LABEL
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language label for a specific language index.
	 *
	 * @param number The language index
	 *
	 * @return string
	 */
	$.getLabel = function(index) {
		return this.getLanguage(index).label;
	};

	/*
	 * Return the language label for the current active language index.
	 *
	 * @return string
	 */
	$.getCurrentLabel = function() {
		return this.getCurrentLanguage().label;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * FONTS
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language font name for a specific language index.
	 *
	 * @param number The language index
	 *
	 * @return string
	 */
	$.getFontName = function(index) {
		return this.getLanguage(index).fontName;
	};

	/*
	 * Return the language main font for the current active language index.
	 *
	 * @return string
	 */
	$.getCurrentFontName = function() {
		return this.getCurrentLanguage().fontName;
	};

	/*
	 * Return the language font size for a specific language index.
	 *
	 * @param number The language index
	 *
	 * @return number
	 */
	$.getFontSize = function(index) {
		return this.getLanguage(index).fontSize;
	};

	/*
	 * Return the language font size for the current active language index.
	 *
	 * @return number
	 */
	$.getCurrentFontSize = function() {
		return this.getCurrentLanguage().fontSize;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * DATABASE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Load the database with the texts of the files corresponding to the current active language index.
	 *
	 * @return void
	 */
	$.loadDatabase = function() {
		this._database = {};
		const folder = this.getFolder();
		const language = this.getCurrentLanguage();
		if (language.files.length > 0) {
			for (const file of language.files) {
				DataManager.mlsLoadLanguageFile(language.index, folder.concat("/") + language.folder.concat("/") + file.concat(".json"));
			}
		} else {
			this.logErrorIndex(language.index, "No language database loaded for this index.");
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * TEXT
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the text corresponding to the code included in the language files for the current language.
	 *
	 * @param string The text code as set in the editor text field
	 *
	 * @return string
	 */
	$.getText = function(oldText) {
		const regex = /\${([\w|\.\[\]0-9]+)}/gm;
		let regexParts;
		let newText = oldText;
		while ((regexParts = regex.exec(oldText)) != null) {
			newText = newText.replace(regexParts[0], this.getTextDatabase(regexParts[1]));
		}
		return newText;
	};

	/*
	 * Return the text found in the databae corresponding to the text code.
	 *
	 * @param string The text code to find in the language file
	 *
	 * @return string
	 */
	$.getTextDatabase = function(textCode) {
		const arrayI = textCode.indexOf("[");
		const dictI = textCode.indexOf(".");

		if (arrayI == -1 && dictI == -1) {
			if (this._database.hasOwnProperty(textCode)) {
				return this._database[textCode];
			}
	
			return textCode;
		}

		const i = (dictI == -1 || arrayI < dictI)
			? arrayI
			: dictI;
		let baseTextCode = textCode.substring(0, i);
		if (this._database.hasOwnProperty(baseTextCode)) {
			const data = this._database[baseTextCode];
			textCode = textCode.substring(i);
			return this.getValueFromDatabase(textCode, data);
		}

		return textCode;
	};

	$.getValueFromDatabase = function(textCode, data) {
		if (textCode == "") {
			return data;
		}
		
		let arrayI = textCode.indexOf("[");

		if (arrayI == 0) {
			const j = textCode.indexOf("]");
			arrayI = textCode.substring(1, j);
			textCode = textCode.substring(j + 1);
			data = data[arrayI];
			return this.getValueFromDatabase(textCode, data);
		}

		if (arrayI == -1) {
			arrayI = textCode.length;
		}

		const dictKey = textCode.substring(1, arrayI);
		textCode = textCode.substring(arrayI);
		data = data[dictKey];
		return this.getValueFromDatabase(textCode, data);
	}

	/*
	 *-----------------------------------------------------------------------------
	 * TO REWRITE CORE SCRIPT
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Update the game title.
	 *
	 * @return void
	 */
	$.updateGameTitle = function() {
		document.title = this.getText($dataSystem.gameTitle);
	};

	/*
	 * Return the miss label for the current language index.
	 *
	 * @return string
	 */
	$.getMiss = function() {
		return this.getCurrentLanguage().miss;
	};

	/*
	 * Return the ON label for the current language index.
	 *
	 * @return string
	 */
	$.getOn = function() {
		return this.getCurrentLanguage().on;
	};

	/*
	 * Return the OFF label for the current language index.
	 *
	 * @return string
	 */
	$.getOff = function() {
		return this.getCurrentLanguage().off;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LOG
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Log the errors while processing a plugin parameters.
	 *
	 * @param string The error text
	 *
	 * @return void
	 */
	$.logError = function(error) {
		if (this._useErrorLog) {
			console.log("Plugin: " + this.pluginName + "\nError: " + error);
		}
	};

	/*
	 * Log the errors while processing a language index.
	 *
	 * @param number The language index that caused the error
	 * @param string The error text
	 *
	 * @return void
	 */
	$.logErrorIndex = function(index, error) {
		if (this._useErrorLog) {
			console.log("Plugin: " + this.pluginName + "\nIndex: " + index + "\nError: " + error);
		}
	};

	/*
	 * Log the errors while processing a language file.
	 *
	 * @param string The language file that caused the error
	 * @param string The error text
	 *
	 * @return void
	 */
	$.logErrorFile = function(file, error) {
		if (this._useErrorLog) {
			console.log("Plugin: " + this.pluginName + "\nFile: " + file + "\nError: " + error);
		}
	};

})(ODW.MLS);

//=============================================================================
//  00000    00000   000000   0000000
// 0     0  0     0  0     0  0
// 0        0     0  0     0  0
// 0        0     0  000000   00000
// 0        0     0  0   0    0
// 0     0  0     0  0    0   0
//  00000    00000   0     0  0000000
//=============================================================================

//=============================================================================
// Bitmap
//=============================================================================

ODW.MLS.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
	ODW.MLS.Bitmap_drawText.call(this, ODW.MLS.getText(text), x, y, maxWidth, lineHeight, align);
};

//=============================================================================
// DataManager
//=============================================================================

// New function.
DataManager.mlsLoadLanguageFile = function(index, src) {
	const xhr = new XMLHttpRequest();
	const url = src;
	xhr.open("GET", url);
	xhr.responseType = "json";
	xhr.onload = () => this.mlsOnXhrLanguageFileLoad(xhr, index, src, url);
	xhr.onerror = () => this.mlsOnXhrLanguageFileError(index, src, url, "File not found.");
	xhr.send();
};

// New function.
DataManager.mlsOnXhrLanguageFileLoad = function(xhr, index, src, url) {
	if (xhr.status < 400) {
		try {
			const languageDatabase = ODW.MLS._database;
			const languageDatafile = xhr.response;
			if (languageDatafile) {
				ODW.MLS._database = {...languageDatabase, ...languageDatafile};
			} else {
				this.mlsOnXhrLanguageFileError(index, src, url, "JSON file structure incorrect.");
			}
		} catch (e) {
			this.mlsOnXhrLanguageFileError(index, src, url, e);
		}
	} else {
		this.mlsOnXhrLanguageFileError(index, src, url, "Xhr status " + xhr.status);
	}
};

// New function.
DataManager.mlsOnXhrLanguageFileError = function(index, src, url, e) {
	ODW.MLS.logErrorFile(src, e);
	const error = {index: index, src: src, url: url};
	this._errors.push(error);
};

//=============================================================================
// ConfigManager
//=============================================================================

// New property.
ConfigManager.mlsLanguageIndex = 0;

ODW.MLS.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = ODW.MLS.ConfigManager_makeData.call(this);
	config.mlsLanguageIndex = this.mlsLanguageIndex;
	return config;
};

ODW.MLS.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	ODW.MLS.ConfigManager_applyData.call(this, config);
	this.mlsLanguageIndex = this.mlsReadLanguageIndex(config, "mlsLanguageIndex", 0);
};

// New function.
ConfigManager.mlsReadLanguageIndex = function(config, name, defaultValue) {
	if (name in config) {
		return config[name];
	} else {
		return defaultValue;
	}
};

//=============================================================================
// TextManager
//=============================================================================

ODW.MLS.TextManager_basic = TextManager.basic;
TextManager.basic = function(basicId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_basic.apply(this, arguments));
};

ODW.MLS.TextManager_param = TextManager.param;
TextManager.param = function(paramId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_param.apply(this, arguments));
};

ODW.MLS.TextManager_command = TextManager.command;
TextManager.command = function(commandId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_command.apply(this, arguments));
};

ODW.MLS.TextManager_message = TextManager.message;
TextManager.message = function(messageId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_message.apply(this, arguments));
};

// Rewrite.
Object.defineProperty( TextManager, "currencyUnit", {
	get: function() {
		return ODW.MLS.getText($dataSystem.currencyUnit);
	},
	configurable: true
});

//=============================================================================
//  00000   000000   0000000  0000000   00000   0000000
// 0     0  0     0        0  0        0     0     0
// 0     0  0     0        0  0        0           0
// 0     0  000000         0  00000    0           0
// 0     0  0     0        0  0        0           0
// 0     0  0     0  0     0  0        0     0     0
//  00000   000000    00000   0000000   00000      0
//=============================================================================

//=============================================================================
// Game_System
//=============================================================================

ODW.MLS.Game_System_mainFontFace = Game_System.prototype.mainFontFace;
Game_System.prototype.mainFontFace = function() {
	const languageFontName = ODW.MLS.getCurrentFontName();
	if (languageFontName) {
		return languageFontName + ", " + $dataSystem.advanced.fallbackFonts;
	} else {
		return ODW.MLS.Game_System_mainFontFace.call(this);
	}
};

ODW.MLS.Game_System_mainFontSize = Game_System.prototype.mainFontSize;
Game_System.prototype.mainFontSize = function() {
	const languageFontSize = ODW.MLS.getCurrentFontSize();
	if (languageFontSize > 0) {
		return languageFontSize;
	} else {
		return ODW.MLS.Game_System_mainFontSize.call(this);
	}
};

//=============================================================================
// Game_Message
//=============================================================================

ODW.MLS.Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
	ODW.MLS.Game_Message_add.call(this, ODW.MLS.getText(text));
};

ODW.MLS.Game_Message_setChoices = Game_Message.prototype.setChoices;
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
	choices = choices.map(choice => ODW.MLS.getText(choice));
	ODW.MLS.Game_Message_setChoices.call(this, choices, defaultType, cancelType);
};

//=============================================================================
//  00000    00000   0000000  0     0  0000000
// 0     0  0     0  0        00    0  0
// 0        0        0        0 0   0  0
//  00000   0        00000    0  0  0  00000
//       0  0        0        0   0 0  0
// 0     0  0     0  0        0    00  0
//  00000    00000   0000000  0     0  0000000
//=============================================================================

//=============================================================================
// Scene_Boot
//=============================================================================

ODW.MLS.Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
	ODW.MLS.Scene_Boot_loadGameFonts.call(this);
	const languageFonts = ODW.MLS.getFonts();
	for (const languageFont of languageFonts) {
		FontManager.load(languageFont.name, languageFont.file);
	}
};

ODW.MLS.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	ODW.MLS.Scene_Boot_start.call(this);
	ODW.MLS.loadDatabase();
	setTimeout(function(){
		ODW.MLS.updateGameTitle();
	}, 100);
};

// Rewrite.
Scene_Boot.prototype.updateDocumentTitle = function() {
	ODW.MLS.updateGameTitle();
};

//=============================================================================
//  00000   000000   000000   0000000  0000000  0000000
// 0     0  0     0  0     0     0        0     0
// 0        0     0  0     0     0        0     0
//  00000   000000   000000      0        0     00000
//       0  0        0   0       0        0     0
// 0     0  0        0    0      0        0     0
//  00000   0        0     0  0000000     0     0000000
//=============================================================================

//=============================================================================
// Sprite_Damage
//=============================================================================

// Rewrite.
Sprite_Damage.prototype.createMiss = function() {
	const h = this.fontSize();
	const w = Math.floor(h * 3.0);
	const sprite = this.createChildSprite(w, h);
	sprite.bitmap.drawText(ODW.MLS.getMiss(), 0, 0, w, h, "center");
	sprite.dy = 0;
};

//=============================================================================
// 0     0  0000000  0     0  000000    00000   0     0
// 0     0     0     00    0  0     0  0     0  0     0
// 0     0     0     0 0   0  0     0  0     0  0     0
// 0  0  0     0     0  0  0  0     0  0     0  0  0  0
// 0  0  0     0     0   0 0  0     0  0     0  0  0  0
// 0  0  0     0     0    00  0     0  0     0  0  0  0
//  00000   0000000  0     0  000000    00000    00000
//=============================================================================

//=============================================================================
// Window_Base
//=============================================================================

ODW.MLS.Window_Base_textWidth = Window_Base.prototype.textWidth;
Window_Base.prototype.textWidth = function(text) {
	return ODW.MLS.Window_Base_textWidth.call(this, ODW.MLS.getText(text));
};

ODW.MLS.Window_Base_createTextState = Window_Base.prototype.createTextState;
Window_Base.prototype.createTextState = function(text, x, y, width) {
	return ODW.MLS.Window_Base_createTextState.call(this, ODW.MLS.getText(text), x, y, width);
};

ODW.MLS.Window_Base_actorName = Window_Base.prototype.actorName;
Window_Base.prototype.actorName = function(n)  {
	return ODW.MLS.getText(ODW.MLS.Window_Base_actorName.apply(this, arguments));
};

ODW.MLS.Window_Base_partyMemberName = Window_Base.prototype.partyMemberName;
Window_Base.prototype.partyMemberName = function(n) {
	return ODW.MLS.getText(ODW.MLS.Window_Base_partyMemberName.apply(this, arguments));
};

ODW.MLS.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	return ODW.MLS.getText(ODW.MLS.Window_Base_convertEscapeCharacters.apply(this, arguments));
};

//=============================================================================
// Window_Options
//=============================================================================

// Rewrite.
Window_Options.prototype.booleanStatusText = function(value) {
	return value ? ODW.MLS.getOn() : ODW.MLS.getOff();
};

ODW.MLS.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	this.addCommand(ODW.MLS.getText(ODW.MLS.getOption()), "mlsLanguageIndex");
	ODW.MLS.Window_Options_addGeneralOptions.call(this);
};

ODW.MLS.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
	const symbol = this.commandSymbol(index);
	const value = this.getConfigValue(symbol);
	if (symbol === "mlsLanguageIndex") {
		return ODW.MLS.getLabel(value);
	} else {
		return ODW.MLS.Window_Options_statusText.apply(this, arguments);
	}
};

ODW.MLS.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol === "mlsLanguageIndex") {
		this.changeValue(symbol, ODW.MLS.getNextIndex());
		this.mlsRefreshLanguage();
	} else {
		ODW.MLS.Window_Options_processOk.apply(this);
	}
};

ODW.MLS.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol === "mlsLanguageIndex") {
		this.changeValue(symbol, ODW.MLS.getNextIndex());
		this.mlsRefreshLanguage();
	} else {
		ODW.MLS.Window_Options_cursorRight.apply(this);
	}
};

ODW.MLS.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol === "mlsLanguageIndex") {
		this.changeValue(symbol, ODW.MLS.getPrevIndex());
		this.mlsRefreshLanguage();
	} else {
		ODW.MLS.Window_Options_cursorLeft.apply(this);
	}
};

// New function.
Window_Options.prototype.mlsRefreshLanguage = function() {
	ODW.MLS.loadDatabase();
	this.resetFontSettings();
	setTimeout(() => {
		ODW.MLS.updateGameTitle();	
		if (SceneManager._scene._optionsWindow) {
			SceneManager._scene._optionsWindow.refresh();
		}
	}, 100);
};

//=============================================================================
// Window_NameEdit
//=============================================================================

ODW.MLS.Window_NameEdit_setup = Window_NameEdit.prototype.setup;
Window_NameEdit.prototype.setup = function(actor, maxLength) {
	ODW.MLS.Window_NameEdit_setup.apply(this, arguments);
	this._name = ODW.MLS.getText(this._name).slice(0, this._maxLength);
	this._index = this._name.length;
};
