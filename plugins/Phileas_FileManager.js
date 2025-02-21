//=============================================================================
// Phileas_FileManager.js
//=============================================================================
// [Update History]
// 2025.February.16 Ver1.0.0 First Release
// 2025.February.17 Ver1.0.1 Added read/write file methods

/*:
 * @target MZ
 * @plugindesc 1.0.0 Cross-platform file manager
 * @author Phileas
 * 
 * @param updateStamp
 * @text Update files stamp at startup
 * @type boolean
 * @desc Disable this before deploying the game
 * @default true
 * 
 * 
 * @help
 * 
 * This is an auxiliary plugin that allows to work with files in any environment.
 * 
 * The plugin provides the following methods that can be used in other
 * plugins or scripts:
 * - Phileas_FileManager.fileExistsSync(path) - synchronously checks for file availability
 * - Phileas_FileManager.getFilesInDirectory(path) - synchronously returns a list of files
 *   in the specified directory, including nested directories of any level
 * - Phileas_FileManager.readFile(path) - asynchronously returns the contents of the file
 * - Phileas_FileManager.readJsonFile(path) - asynchronously returns the deserialized contents
 *   of the JSON file
 * - Phileas_FileManager.writeFile(path, data) - asynchronously saves the specified
 *   data to a file
 * - Phileas_FileManager.writeJsonFile(path, data) - serializes the specified data in JSON
 *   and asynchronously saves it to a file
 * - Phileas_FileManager.downloadFile(path) - downloads a file from the local storage.
 *   This method only works in a web environment and on mobile platforms.
 *   The method must be called after saving the file using Phileas_FileManager.writeFile
 *   or Phileas_FileManager.writeJsonFile
 * 
 * The path in all methods is the path to the file/directory relative to the root of the game.
 * 
 * Contact the author of the plugin if you need other methods or commands of the plugin.
 *
 * In order for the plugin to work in the browser and on mobile devices, it is necessary
 * the current data/FilesStamp.json file.
 * This file contains information about all the game files.
 * This file is automatically generated when the game starts, if enabled
 * the updateStamp parameter. This plugin parameter is recommended
 * disable it before deployment.
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
 * @plugindesc 1.0.0 Кроссплатформенный менеджер файлов
 * @author Phileas
 * 
 * @param updateStamp
 * @text Обновить штамп файлов при запуске
 * @type boolean
 * @desc Отключите перед деплоем игры
 * @default true
 * 
 * 
 * @help
 * 
 * Это вспомогательный плагин, который позволяет работать с файлами в любой среде.
 * 
 * Плагин предоставляет следующие методы, которые можно использовать в других
 * плагинах или в скриптах:
 * - Phileas_FileManager.fileExistsSync(path) - синхронно проверяет наличие файла
 * - Phileas_FileManager.getFilesInDirectory(path) - синхронно возвращает список файлов
 *   в указанной директории, включая вложенные директории любого уровня
 * - Phileas_FileManager.readFile(path) - асинхронно возвращает содержимое файла
 * - Phileas_FileManager.readJsonFile(path) - асинхронно возвращает десериализованное
 *   содержимое JSON-файла
 * - Phileas_FileManager.writeFile(path, data) - асинхронно сохраняет указанные
 *   данные в файл
 * - Phileas_FileManager.writeJsonFile(path, data) - сериализует указанные данные
 *   в JSON и асинхронно сохраняет их файл
 * - Phileas_FileManager.downloadFile(path) - скачивает файл из локального хранилища.
 *   Этот метод работает только в веб-среде и на мобильных платформах. Метод нужно
 *   вызывать после сохранения файла с помощью Phileas_FileManager.writeFile
 *   или Phileas_FileManager.writeJsonFile
 * 
 * path во всех методах - это путь к файлу/директории относительно корня игры
 * 
 * Обратитесь к автору плагина, если вам нужны другие методы или команды плагина.
 * 
 * Чтобы плагин работал в браузере и на мобильных устройствах, необходим
 * актуальный файл data/FilesStamp.json.
 * Этот файл содержит данные обо всех файлах игры.
 * Этот файл автоматически генерируется при запуске игры, если включён
 * параметр updateStamp. Этот параметр плагина рекомендуется
 * отключить перед деплоеем.
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

"use strict";


function Phileas_FileManager() {
    throw new Error("This is a static class");
}
 
Phileas_FileManager._stampFile = "data/FilesStamp.json";
Phileas_FileManager._cache = {};
 
Phileas_FileManager._parameters = PluginManager.parameters("Phileas_FileManager");
Phileas_FileManager._updateRequired = Phileas_FileManager._parameters["updateStamp"] == "true";
 
Phileas_FileManager.scanFileSystem = async function() {
    if (!Utils.isNwjs() || !Phileas_FileManager._updateRequired) {
        return;
    }
 
    const fs = require("fs");
    const path = require("path");
    const projectPath = path.dirname(process.mainModule.filename);
    const stampFile = path.join(projectPath, Phileas_FileManager._stampFile);
 
    function scanDir(dir) {
        let result = {};
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                result[file] = scanDir(fullPath);
            } else {
                result[file] = true;
            }
        });
 
        return result;
    }
 
    const fileTree = scanDir(projectPath);
    fs.writeFileSync(stampFile, JSON.stringify(fileTree, null, 2));
    console.log("Phileas_FileManager: file scanning completed");
};
 
Phileas_FileManager.loadCache = async function() {
    if (Utils.isNwjs()) {
        return;
    }
 
    try {
        const response = await fetch(Phileas_FileManager._stampFile);

        if (!response.ok) {
            throw new Error(`${Phileas_FileManager._stampFile} not found`);
        }
 
        Object.assign(Phileas_FileManager._cache, await response.json());
        console.log("Phileas_FileManager: cache loaded");
    } catch (error) {
        console.error("Phileas_FileManager: cache loading failed", error);
    }
};
 
Phileas_FileManager.fileExistsSync = function(path) {
    if (Utils.isNwjs()) {
        const fs = require("fs");
        return fs.existsSync(path);
    }
 
    const parts = path.split("/");
    let current = Phileas_FileManager._cache;
    for (const part of parts) {
        if (!current[part]) {
            return false;
        }
 
        current = current[part];
    }
 
    return true;
};
 
Phileas_FileManager.getFilesInDirectoryNwJs = function(path) {
    const fs = require("fs");
    const pathModule = require("path");
    const projectPath = pathModule.dirname(process.mainModule.filename);
    const fullPath = pathModule.join(projectPath, path);
 
    function scanDir(dir) {
        let files = [];
        fs.readdirSync(dir).forEach(file => {
            const filePath = pathModule.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                files = files.concat(scanDir(filePath).map(subFile => file + "/" + subFile));
            } else {
                files.push(file);
            }
        });
        return files;
    }
 
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
        console.warn("Path not found:", path);
        return [];
    }
 
    return scanDir(fullPath);
}
 
Phileas_FileManager.getFilesInDirectoryWeb = function(path) {
    const parts = path.split("/").filter(Boolean);
    let current = Phileas_FileManager._cache;
    for (const part of parts) {
        if (!current[part]) {
            return [];
        }

        current = current[part];
    }
 
    function collectFiles(node, prefix = "") {
        let files = [];
        for (const key in node) {
            if (typeof node[key] === "object") {
                files = files.concat(collectFiles(node[key], prefix + key + "/"));
            } else {
                files.push(prefix + key);
            }
        }

        return files;
    }
 
    return collectFiles(current);
}
 
Phileas_FileManager.getFilesInDirectory = function(path) {
    return Utils.isNwjs()
        ? Phileas_FileManager.getFilesInDirectoryNwJs(path)
        : Phileas_FileManager.getFilesInDirectoryWeb(path);
};

Phileas_FileManager.readFileNwJs = async function(path) {
    const fs = require("fs");
    const pathModule = require("path");
    const fullPath = pathModule.join(pathModule.dirname(process.mainModule.filename), path);
    return fs.readFileSync(fullPath, "utf8");
};

Phileas_FileManager.readFileWeb = async function(path) {
    const data = localStorage.getItem(path);
    return data;
};

Phileas_FileManager.readFile = async function(path) {
    if (Utils.isNwjs()) {
        return Phileas_FileManager.readFileNwJs(path);
    }

    return Phileas_FileManager.readFileWeb(path);
};

Phileas_FileManager.readJsonFile = async function(path) {
    const data = Phileas_FileManager.readFile(path);
    return data ? JSON.parse(data) : null;
};

Phileas_FileManager.writeFileNwJs = async function(path, data) {
    const fs = require("fs");
    const pathModule = require("path");
    const fullPath = pathModule.join(pathModule.dirname(process.mainModule.filename), path);
    fs.writeFileSync(fullPath, data);
    console.log(`Saved file: ${path}`);
};

Phileas_FileManager.writeFileWeb = async function(path, data) {
    localStorage.setItem(path, data);
    console.log(`Saved file to localStorage: ${path}`);
};

Phileas_FileManager.writeFile = async function(path, data) {
    if (Utils.isNwjs()) {
        Phileas_FileManager.writeFileNwJs(path, data);
        return;
    }

    Phileas_FileManager.writeFileWeb(path, data);
};

Phileas_FileManager.writeJsonFile = async function(path, data) {
    Phileas_FileManager.writeFile(path, JSON.stringify(data));
};

Phileas_FileManager.downloadFile = function(path) {
    if (Utils.isNwjs()) {
        console.warn("Phileas_FileManager.downloadFile method is only for the web environment");
        return;
    }

    const data = localStorage.getItem(path);
    if (!data) {
        console.warn(`File not found in localStorage: ${path}`);
        return;
    }

    const blob = new Blob([data], { type: "application/json" });
    const fileName = path.split("/").pop();

    if (navigator.userAgent.toLowerCase().includes("android")) {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const base64Data = fileReader.result.split(",")[1];
            if (window.Android && window.Android.saveBase64File) {
                window.Android.saveBase64File(fileName, base64Data);
                console.log(`File saved on Android: /storage/emulated/0/Download/${fileName}`);
            } else {
                console.warn("Android API not found");
            }
        };

        fileReader.readAsDataURL(blob);
        return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    console.log(`📂 File downloaded: ${a.download}`);
    console.log(`📂 Expected save location: Downloads/${a.download}`);
};

Phileas_FileManager.importSaveFileWeb = function() {
    if (Utils.isNwjs()) {
        console.warn("Phileas_FileManager.importSaveFile is only for the web environment");
        return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".rpgsave";

    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function() {
            const fileName = file.name;
            localStorage.setItem(fileName, reader.result);
            console.log(`📂 Save file imported: ${fileName} (stored in localStorage)`);
        };
        reader.readAsDataURL(file);
    };

    input.click();
};

Phileas_FileManager.importSaveFileAndroid = function() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".rpgsave";

    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function() {
            const base64Data = reader.result.split(",")[1];
            const fileName = file.name;

            if (window.Android && window.Android.saveBase64File) {
                window.Android.saveBase64File("save/" + fileName, base64Data);
                console.log(`📂 Save file imported: /data/data/com.yourgame.app/files/save/${fileName}`);
            } else {
                console.warn("Android API not found");
            }
        };
        reader.readAsDataURL(file);
    };

    input.click();
};

Phileas_FileManager.importSaveFile = function() {
    if (Utils.isNwjs()) {
        console.warn("Phileas_FileManager.importSaveFile is only for the web environment");
        return;
    }

    if (!navigator.userAgent.toLowerCase().includes("android")) {
        Phileas_FileManager.importSaveFileAndroid();
        return;
    }

    Phileas_FileManager.importSaveFileWeb();
};

 
Phileas_FileManager.scanFileSystem();
Phileas_FileManager.loadCache();
 