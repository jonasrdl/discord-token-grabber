# discord-token-grabber

A tool that allows you to find out your Discord tokens using Javascript. The token is used e.g. for WebSocket requests during runtime.   
Discord stores the tokens in local storage. Since Discord runs on Electron, we can access it relatively easily.

For educational purposes only.

## Setup
```
git clone https://github.com/jonasrdl/discord-token-grabber
cd discord-token-grabber
npm i -g typescript
npm i
npm run build
node dist/grabber.js
```

And immediately you will receive your personal tokens. Warning: never give this token to anyone! 

If you notice mistakes or have suggestions for improvement, please open an issue or pr :).
