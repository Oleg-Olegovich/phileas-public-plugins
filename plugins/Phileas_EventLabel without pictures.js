//=============================================================================
// Phileas_EventLabel.js
//=============================================================================
// [Update History]
// 2023.July.05 Ver1.0.0 First Release
// 2023.July.07 Ver1.1.0 Added a player label and hiding invisible event labels
// 2023.July.07 Ver1.1.1 Fix
// 2024.April.20 Ver1.1.2 Fixed event command.

/*:
 * @target MZ
 * @plugindesc Labels above map events
 * @author Phileas
 *
 * @param Draw by default
 * @type boolean
 * @default true
 * @desc If true, the labels appear automatically after loading the map.
 *
 * @param Default x offset
 * @type number
 * @default 0
 * @desc Applies if the parameter is not specified via the tag.
 *
 * @param Default y offset
 * @type number
 * @default 25
 * @desc Applies if the parameter is not specified via the tag.
 *
 * @param Default font size
 * @type number
 * @default 26
 * @desc Applies if the parameter is not specified via the tag.
 *
 * @param Default distance
 * @type number
 * @default 500
 * @desc The distance beyond which the label is hidden. Applies if the parameter is not specified via the tag.
 *
 * @param Default check direction
 * @type boolean
 * @default false
 * @desc If true, the label is not shown if the player is not looking towards the event. Applies if the parameter is not specified via the tag.
 *
 * @param Minimum width
 * @type number
 * @default 130
 * @desc Minimum width of the label window. You hardly need to change that.
 *
 * @param Default player label
 * @type string
 * @desc The label that is displayed above the game character, unless another one has been set via the plugin command. Input an empty string so that the label is not displayed.
 *
 * @param Hide the invisible character label
 * @type boolean
 * @default true
 * @desc If the character is invisible, then its label will not be displayed.
 *
 * @command showAllLabels
 * @text Show all labels
 * @desc Displays all labels on the map. If the labels of invisible events are hidden, then you will not see the labels.
 *
 * @command hideAllLabels
 * @text Hide all labels
 * @desc Hides all labels on the map.
 *
 * @command redrawAllLabels
 * @text Redraw all labels
 * @desc Redraws the contents of the label windows without deleting the windows themselves.
 *
 * @command setLabelText
 * @text Set the label text by id
 * @desc Changes the text of the event label to an arbitrary one.
 * @arg eventId
 * @text Event ID
 * @type number
 * @desc Input a event ID (it is a positive number).
 * @default 1
 * @arg text
 * @text Text
 * @type string
 * @desc Input text. If you input an empty line, the label will not be displayed. It can be used to hide a label.
 * @default <LabelText:text>
 *
 * @command setPlayerLabelText
 * @text Set the player label text
 * @desc Changes the text of the player character label to an arbitrary one.
 * @arg text
 * @text Text
 * @type string
 * @desc Input text. If you input an empty line, the label will not be displayed. It can be used to hide a label.
 * @default <LabelText:text>
 *
 * @command showPlayerLabel
 * @text Show the player label
 * @desc Displays the player label. If the invisible player label is hidden, then you will not see the label.
 *
 * @command hidePlayerLabel
 * @text Hide the player label
 * @desc Hides the player label.
 *
 * 
 * @help
 * Boosty: https://boosty.to/phileas
 *
 * The plugin adds labels above map events.
 *
 * Use the note field. It is located to the right of the name field in the event editor. 
 * There you can enter one or more of the following tags:
 * <LabelText:Name> - shows the label "Name". Standard engine control symbols are supported here. This is a mandatory tag if you want to display the text above the event. The other tags are optional. If you don't write them, the default values that are configured in the plugin parameters will be used.
 * <LabelFontSize:26> - sets the font size for a specific label.
 * <LabelXOffset:0> - sets the horizontal offset for a specific label.
 * <LabelYOffset:25> - sets the vertical offset for a specific label.
 * <LabelDistance:50> - the distance beyond which the label is hidden.
 * <LabelCheckDirection:yes> - if "yes", the label is not shown if the player is not looking towards the event.
 * <LabelHideInvisible:no> - if "yes", the label will be hidden if the event is invisible.
 *
 * You can assign a label to the player character via the plugin parameter or command. Use the same tags as for map events.
 * 
 * Plugin Commands:
 * 0) Show all labels - displays all labels on the map; if the labels of invisible events are hidden, then you will not see their labels.
 * 1) Hide all labels - hides all labels on the map.
 * 2) Redraw all labels - redraws the contents of the label windows without deleting the windows themselves.
 * 3) Set the label text by id - changes the text of the event label to an arbitrary one.
 * 4) Set the player label text - changes the text of the player character label to an arbitrary one.
 * 5) Show the player label - displays the player label; if the invisible player label is hidden and the player is invisible, then you will not see the label.
 * 6) Hide the player label - hides the player label.
 *
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

//-----------------------------------------------------------------------------
// MY CODE  
    PluginManager.registerCommand("Phileas_EventLabel", "showAllLabels", showPhileasEventLabels);
    PluginManager.registerCommand("Phileas_EventLabel", "hideAllLabels", hidePhileasEventLabels);
    PluginManager.registerCommand("Phileas_EventLabel", "redrawAllLabels", redrawPhileasEventLabels);
    PluginManager.registerCommand("Phileas_EventLabel", "setLabelText", setPhileasEventLabelText);
    PluginManager.registerCommand("Phileas_EventLabel", "setPlayerLabelText", setPhileasPlayerLabelText);
    PluginManager.registerCommand("Phileas_EventLabel", "showPlayerLabel", showPhileasPlayerLabel);
    PluginManager.registerCommand("Phileas_EventLabel", "hidePlayerLabel", hidePhileasPlayerLabel);

    var parameters = PluginManager.parameters("Phileas_EventLabel");
    
    var PhileasEventLabelSettings = PhileasEventLabelSettings || {};
    PhileasEventLabelSettings.drawByDefault = (parameters["Draw by default"] || "true") == "true";
    PhileasEventLabelSettings.defaultXOffset = parameters["Default x offset"] || 0;
    PhileasEventLabelSettings.defaultYOffset = parameters["Default y offset"] || 25;
    PhileasEventLabelSettings.defaultFontSize = parameters["Default font size"] || 26;
    PhileasEventLabelSettings.defaultDistance = parameters["Default distance"] || 500;
    PhileasEventLabelSettings.defaultCheckDirection = (parameters["Default check direction"] || "false") == "true";
    PhileasEventLabelSettings.minWidth = parameters["Minimum width"] || 130;
    PhileasEventLabelSettings.defaultPlayerLabel = parameters["Default player label"] || "";
    PhileasEventLabelSettings.hideInvisibleCharacterLabel = (parameters["Hide the invisible character label"] || "true") == "true";
    PhileasEventLabelSettings.tags = ["LabelText", "LabelFontSize", "LabelXOffset", "LabelYOffset", "LabelDistance", "LabelCheckDirection", "LabelHideInvisible"];
    
    var playerLabelWindow = undefined;


    function PhileasEventLabelData() {
        this.LabelText = "";
        this.LabelXOffset = PhileasEventLabelSettings.defaultXOffset;
        this.LabelYOffset = PhileasEventLabelSettings.defaultYOffset;
        this.LabelFontSize = PhileasEventLabelSettings.defaultFontSize;
        this.LabelDistance = PhileasEventLabelSettings.defaultDistance;
        this.LabelCheckDirection = PhileasEventLabelSettings.defaultCheckDirection;
        this.LabelHideInvisible = PhileasEventLabelSettings.hideInvisibleCharacterLabel;
    }
    PhileasEventLabelData.prototype.constructor = PhileasEventLabelData;


    function Window_PhileasEventLabel() {
        this.initialize(...arguments);
    }
    
    Window_PhileasEventLabel.prototype = Object.create(Window_Base.prototype);
    Window_PhileasEventLabel.prototype.constructor = Window_PhileasEventLabel;

    Window_PhileasEventLabel.prototype.initialize = function(eventObject, isVisible, isEventVisible) {
        this.eventObject = eventObject;
        this.isVisible = isVisible;
        this.isEventVisible = isEventVisible;
        this.phileasEventLabelData = new PhileasEventLabelData();
        let width = PhileasEventLabelSettings.minWidth;
        Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, width, this.fittingHeight(1) + 10));
        this.opacity = this.contentsOpacity = 0;
        this.visible = false;
        this.setPhileasLabelData(eventObject.note);
        this.drawPhileasLabel();
        SceneManager._scene._spriteset.addChild(this);
    };
    
    Window_PhileasEventLabel.prototype.lineHeight = function() {
        return this.phileasEventLabelData.LabelFontSize;
    };
    
    function getMeta(data) {
        const regExp = /<([^<>:]+)(:?)([^>]*)>/g;
        let meta = {};
        for (;;) {
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
    
    Window_PhileasEventLabel.prototype.setPhileasLabelData = function(data) {
        let meta = getMeta(data);
        if (meta == undefined) {
            return;
        }
        
        for (let i in PhileasEventLabelSettings.tags) {
            let tag = PhileasEventLabelSettings.tags[i];
            if (meta[tag] != undefined) {
                this.phileasEventLabelData[tag] = meta[tag];
            }
        }
        
        this.phileasEventLabelData.LabelFontSize = Number(this.phileasEventLabelData.LabelFontSize);
        this.phileasEventLabelData.LabelXOffset = Number(this.phileasEventLabelData.LabelXOffset);
        this.phileasEventLabelData.LabelYOffset = Number(this.phileasEventLabelData.LabelYOffset);
        this.phileasEventLabelData.LabelDistance = Number(this.phileasEventLabelData.LabelDistance);
        this.phileasEventLabelData.LabelCheckDirection = this.phileasEventLabelData.LabelCheckDirection == true || this.phileasEventLabelData.LabelCheckDirection == "yes";
        this.phileasEventLabelData.LabelHideInvisible = this.phileasEventLabelData.LabelHideInvisible == true || this.phileasEventLabelData.LabelHideInvisible == "yes";
    }
    
    function isWrongDirection(pX, pY, eX, eY) {
        switch ($gamePlayer.direction()) {
            case 1:
                return pX >= eX && pY <= eY;
            case 2:
                return pY <= eY;
            case 3:
                return pX <= eX && pY <= eY;
            case 4:
                return pX >= eX;
            case 6:
                return pX <= eX;
            case 7:
                return pX >= eX && pY >= eY;
            case 8:
                return pY >= eY;
            case 9:
                return pX <= eX && pY >= eY;
        }
        return true;
    }
    
    Window_PhileasEventLabel.prototype.isPhileasEventLabelVisible = function() {
        if (this.phileasEventLabelData.LabelText == "" || !this.isVisible 
            || this.phileasEventLabelData.LabelHideInvisible && !this.isEventVisible) {
            return false;
        }
        
        let pX = $gamePlayer.x;
        let pY = $gamePlayer.y;
        if (this.phileasEventLabelData.LabelDistance < Math.abs(pX - this.eventObject.x) 
            || this.phileasEventLabelData.LabelDistance < Math.abs(pY - this.eventObject.y)
            || this.phileasEventLabelData.LabelCheckDirection && isWrongDirection(pX, pY, this.eventObject.x, this.eventObject.y)
            || SceneManager._scene._encounterEffectDuration > 0)
        {
            return false;
        }
          
        return true;
    };
    
    Window_PhileasEventLabel.prototype.show = function() {
        if (this.contentsOpacity >= 255) { 
            return;
        }
        
        this.contentsOpacity += 20;
        this.visible = true;
    };

    Window_PhileasEventLabel.prototype.hide = function() {
        if (this.contentsOpacity <= 0) {
          if (this.visible) { 
              this.visible = false;
          }
          return;
        }
        this.contentsOpacity -= 20;
    };
    
    Window_PhileasEventLabel.prototype.tryShow = function() {
        if (this.isPhileasEventLabelVisible()) {
            this.show();
            return;
        }
        
        this.hide();
    };
    
    Window_PhileasEventLabel.prototype.resetFontSettings = function() {
        Window_Base.prototype.resetFontSettings.call(this);
        this.contents.fontSize = this.phileasEventLabelData.LabelFontSize;
    };
    
    Window_PhileasEventLabel.prototype.drawPhileasLabel = function() {
        this.contents.clear();
        let textWidth = this.drawTextEx(this.phileasEventLabelData.LabelText, 0, this.contents.height);
        textWidth += this.itemPadding() * 2;
        let width = textWidth;
        this.width = Math.max(width, PhileasEventLabelSettings.minWidth);
        this.width += this.padding * 2;
        this.height = this.fittingHeight(1) + 10;
        this.createContents();
        var wx = (this.contents.width - textWidth) / 2;
        var wy = 0;
        this.drawTextEx(this.phileasEventLabelData.LabelText, wx + this.itemPadding(), wy, width);
        this.visible = true;
        if (this.isPhileasEventLabelVisible()) {
            this.contentsOpacity = 255;
        }
    }

    Scene_Map.prototype.drawPhileasEventLabels = function() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
            return;
        }

        //let events = $gameMap.events();
        let events = SceneManager._scene._spriteset._characterSprites;
        SceneManager._scene.phileasLabelWindows = {};
        for (var i = 0; i < events.length; ++i) {
            if (events[i]._character instanceof Game_Player) {
                $gamePlayer.note = PhileasEventLabelSettings.defaultPlayerLabel;
                playerLabelWindow = new Window_PhileasEventLabel($gamePlayer, true, events[i].visible);
                events[i].phileasEventLabelWindow = playerLabelWindow;
                continue;
            }
            
            if (!(events[i]._character instanceof Game_Event)) {
                continue;
            }

            let e = events[i]._character.event();
            if (e.meta.LabelText != undefined) {
                let label = new Window_PhileasEventLabel(e, PhileasEventLabelSettings.drawByDefault, events[i].visible);
                SceneManager._scene.phileasLabelWindows[e.id] = label;
                events[i].phileasEventLabelWindow = label;
            }
        }
    };
    
    Sprite_Character.prototype.setPhileasEventLabelPosition = function() {
        let scale = SceneManager._scene._spriteset.scale;
        let scaleX = 1 / scale.x;
        let scaleY = 1 / scale.y;
        let width = this.phileasEventLabelWindow.width * scaleX;
        this.phileasEventLabelWindow.x = this.x - width / 2 + this.phileasEventLabelWindow.phileasEventLabelData.LabelXOffset;
        let height = this.phileasEventLabelWindow.height * scaleY;
        let offset = this.phileasEventLabelWindow.phileasEventLabelData.LabelYOffset * scaleY;
        this.phileasEventLabelWindow.y = this.y - this.height - height + offset;
    };
    
    function iteratePhileasEventLabels(func) {
        let scene = SceneManager._scene;
        if (!(scene instanceof Scene_Map)) {
            return;
        }
        
        for (const [key, label] of Object.entries(scene.phileasLabelWindows)) {
            func(label);
        }
    }
    
    function showPhileasEventLabel(label) {
        label.isVisible = true;
    }
    
    function showPhileasEventLabels() {
        iteratePhileasEventLabels(showPhileasEventLabel);
    };
    
    function hidePhileasEventLabel(label) {
        label.isVisible = false;
    }
    
    function hidePhileasEventLabels() {
        iteratePhileasEventLabels(hidePhileasEventLabel);
    };
    
    function redrawPhileasEventLabel(label) {
        label.drawPhileasLabel();
    }
    
    function redrawPhileasEventLabels() {
        iteratePhileasEventLabels(redrawPhileasEventLabel);
    };
    
    function setPhileasEventLabelText(params) {
        let scene = SceneManager._scene;
        let eventId = Number(params["eventId"]);
        if (!(scene instanceof Scene_Map) || eventId < 1) {
            return;
        }
        
        let text = params["text"];
        if (text == undefined) {
            text = "";
        }
        
        let label = undefined;
        if (eventId in scene.phileasLabelWindows) {
            label = scene.phileasLabelWindows[eventId];
        }
        else {
            label = new Window_PhileasEventLabel($gameMap.event(eventId).event(), PhileasEventLabelSettings.drawByDefault);
            scene.phileasLabelWindows[eventId] = label;
            let sprites = scene._spriteset._characterSprites;
            for (let i = 0; i < sprites.length; ++i) {
                if (sprites[i]._character instanceof Game_Event && sprites[i]._character.event().id == eventId) {
                    sprites[i].phileasEventLabelWindow = label;
                    break;
                }
            }
            
        }
        
        label.setPhileasLabelData(text);
        label.drawPhileasLabel();
    }
    
    function setPhileasPlayerLabelText(params) {
        let text = params["text"];
        if (text == undefined) {
            text = "";
        }
        
        playerLabelWindow.setPhileasLabelData(text);
        playerLabelWindow.drawPhileasLabel();
    }

    function showPhileasPlayerLabel() {
        showPhileasEventLabel(playerLabelWindow);
    }
    
    function hidePhileasPlayerLabel() {
        hidePhileasEventLabel(playerLabelWindow);
    }

//-----------------------------------------------------------------------------
// MODIFIED CODE

    const Origin_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        Origin_onMapLoaded.call(this);
        this.drawPhileasEventLabels();
    };
    
    const Origin_eventUpdate = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        Origin_eventUpdate.call(this);
        if (this.phileasEventLabelWindow != undefined) {
            this.phileasEventLabelWindow.isEventVisible = this.visible;
            this.setPhileasEventLabelPosition();
            this.phileasEventLabelWindow.tryShow();
        }
    };
}());
