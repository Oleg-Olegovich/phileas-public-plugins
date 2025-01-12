//=============================================================================
// Phileas_TextWrap.js
//=============================================================================
// [Update History]
// 2023.July.02 Ver1.0.0 First Release
// 2023.July.03 Ver1.0.1 Fixed TAA bug
// 2023.July.03 Ver1.0.2 TAA_BookMenu standard padding

/*:
 * @target MZ
 * @plugindesc Automatic text wrapping.
 * @author Phileas
 *
 * @command getWrappedText
 * @text Writes the wrapped text to a variable.
 * @desc Inserts line breaks into the given text so that the width of the text does not exceed the specified one.
 *
 * @arg text
 * @text Text
 * @type string
 * @desc Input non-empty text
 * @default String
 *
 * @arg fontName
 * @text Font name
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc Text font.
 * @default GameFont
 *
 * @arg fontSize
 * @text Font size
 * @type number
 * @desc Input a positive number.
 * @default 26
 *
 * @arg maxWidth
 * @text Max text width
 * @type number
 * @desc Input a positive number.
 * @default 700
 *
 * @arg variableId
 * @text A variable id
 * @type variable
 * @desc The text will be written to this variable.
 * @default 1
 *
 *
 * @help
 * The plugin adds a line break to the text in such a way that the text does not go beyond the borders of the window.
 * The plugin works automatically for message windows and the TAA_BookMenu plugin.
 *  
 * Plugin Command: getWrappedText
 * This command will allow you to write the processed text to a variable.
 *
 * Feature of the plugin: the text color setting (\C[x]) is saved when the line is moved. Even if the new line is displayed in another window (which often happens when transferring text in the message window).
 *
 * You can always write to the author if you need support for other windows. Or if you need other features or even plugins.
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

(function() {

//--------MY CODE:    
    PluginManager.registerCommand("Phileas_TextWrap", "getWrappedText", getWrappedTextByCommand);
    
    function getColor(word) {
        for (let i = word.length - 2; i > -1; --i) {
            if (word[i] == "\\" && word[i + 1] == "C" && word[i + 2] == "[") {
                let tag = "\\C[";
                let j = i + 3;
                while (word[j] != ']' && j < word.length) {
                    tag += word[j];
                    ++j;
                }
                if (j == word.length) {
                    return "";
                }
                
                if (i > 0 && word[i - 1] == "\\") {
                    tag = "\\" + tag;
                }
                
                return tag + "]"
            }
        }
        
        return "";
    }
    
    Window_Base.prototype.phileasGetTextWidth = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };

    Window_Base.prototype.getWrappedText = function(text, maxWidth) {
        let wrapWindow = new Window_Base(new Rectangle(this.x, this.y, maxWidth, this.height));
        wrapWindow.contents.fontFace = this.contents.fontFace;
        wrapWindow.contents.fontSize = this.contents.fontSize;
        rect = wrapWindow.baseTextRect();
        let result = "";
        let word = "";
        let line = "";
        let lastIndex = 0;
        let currentColor = "";
        let nFlag = false;
        if (text[text.length - 1] != " ") {
            text += " ";
        }
        
        for (let i = 0; i < text.length; ++i) {
            if (text[i] == "\\" && i + 1 < text.length && text[i] == "n") {
                nFlag = true;
            }
            else if (text[i] != " ") {
                continue;
            }
            
            word = text.substring(lastIndex, i + 1);
            let newColor = getColor(word);
            if (newColor != "") {
                currentColor = newColor;
            }
            
            line += word;
            let currentWidth = wrapWindow.phileasGetTextWidth(line, rect.x, rect.y, rect.width);
            //console.log('parsed: ', [line, currentWidth]);
            if (currentWidth > maxWidth) {
                result += "\n";
                currentWidth = wrapWindow.textWidth(wrapWindow.convertEscapeCharacters(word));
                line = word = currentColor + word;
            }
            
            result += word;
            lastIndex = i + 1;
            if (nFlag) {
                result += "\n";
                line = word = currentColor;
                ++lastIndex;
                ++i;
                nFlag = false;
            }
        }
        
        return result;
    };
    
    function getWrappedText(text, maxWidth, mainWindow) {
        let wrapWindow = new Window_Base(new Rectangle(mainWindow.x, mainWindow.y, maxWidth, mainWindow.height));
        wrapWindow.contents.fontFace = mainWindow.contents.fontFace;
        wrapWindow.contents.fontSize = mainWindow.contents.fontSize;
        rect = wrapWindow.baseTextRect();
        let result = "";
        let word = "";
        let line = "";
        let lastIndex = 0;
        let currentColor = "";
        let nFlag = false;
        if (text[text.length - 1] != " ") {
            text += " ";
        }
        
        for (let i = 0; i < text.length; ++i) {
            if (text[i] == "\\" && i + 1 < text.length && text[i] == "n") {
                nFlag = true;
            }
            else if (text[i] != " ") {
                continue;
            }
            
            word = text.substring(lastIndex, i + 1);
            let newColor = getColor(word);
            if (newColor != "") {
                currentColor = newColor;
            }
            
            line += word;
            let currentWidth = wrapWindow.phileasGetTextWidth(line, rect.x, rect.y, rect.width);
            //console.log('parsed: ', [line, currentWidth]);
            if (currentWidth > maxWidth) {
                result += "\n";
                currentWidth = wrapWindow.textWidth(wrapWindow.convertEscapeCharacters(word));
                line = word = currentColor + word;
            }
            
            result += word;
            lastIndex = i + 1;
            if (nFlag) {
                result += "\n";
                line = word = currentColor;
                ++lastIndex;
                ++i;
                nFlag = false;
            }
        }
        
        return result;
    }
    
    function getWrappedTextByCommand(params) {
        let text = params['text'];
        let fontName = params['fontName'];
        let fontSize = Number(params['fontSize']);
        let maxWidth = Number(params['maxWidth']);
        let variableId = Number(params['variableId']);
        if (text == undefined || text == "" || fontName == undefined || fontName == ""
            || fontSize < 1 || maxWidth < 1 || variableId < 1) {
                console.log('Wrapping failed for these parameters: ', {'text':text, 'fontName':fontName, 'fontSize':fontSize, 'maxWidth':maxWidth, 'variableId':variableId});
                return;
        }
        
        let wrapWindow = new Window_Base(new Rectangle(0, 0, maxWidth, Graphics.boxHeight));
        wrapWindow.contents.fontFace = fontName;
        wrapWindow.contents.fontSize = fontSize;
        let wrappedText = getWrappedText(text, maxWidth, wrapWindow);
        $gameVariables.setValue(variableId, wrappedText);
    }
    
    Window_Message.prototype.phileasGetWindowMessageMargin = function() {
        const faceExists = $gameMessage.faceName() !== "";
        const spacing = 30;
        return faceExists ? ImageManager.faceWidth + spacing : 4;
    }

//--------CHANGED CORE:
    
    Origin_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        let text = $gameMessage.allText();
        let maxWidth = this.width - this.phileasGetWindowMessageMargin();
        let wrappedText = getWrappedText(text, maxWidth, this);
        $gameMessage._texts.length = 0;
        $gameMessage._texts = [wrappedText];
        Origin_startMessage.call(this);
    };
    
    if (typeof Window_BookText != "undefined") {
        Origin_TaaPreparePrintableObjects = Window_BookText.prototype.preparePrintableObjects;
        Window_BookText.prototype.preparePrintableObjects = function(text) {
            let wrappedText = getWrappedText(text, this.windowWidth() - this.standardPadding(), this);
            Origin_TaaPreparePrintableObjects.call(this, wrappedText);
        }
    }
}());
