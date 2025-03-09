## EN :

Install : 
```bash
git clone https://github.com/luna-zx/discord-selftbot-vc-online.git
cd discord-selftbot-vc-online
```

> Go to `config.json` and put your token in `TOKEN`

> (How to get your discord token? : browse https://discord.com -> press `Ctrl+Shift+C` -> Application Tab -> Storage -> Local Storage -> Search "token" in filter bar -> Copy your token)

```json
{
    "TOKEN": "PASTE YOUR TOKEN",
    "GUILD_ID": "PASTE YOUR DISCORD SERVER ID",
    "VOICE_CHANNEL_ID": "",
    "DEAF": true,
    "MUTE": true
}
```

> In `VOICE_CHANNEL_ID` put your voice channel id that you wanna join.

> If you don't put a voice channel id, the script will randomly join a voice channel in the specified Discord server.

Running the script :
```bash
npm i
node index.js
```

## Thai : 

ติดตั้ง : 
```bash
git clone https://github.com/luna-zx/discord-selftbot-vc-online.git
cd discord-selftbot-vc-online
```

> ไปที่ไฟล์ `config.json` ใส่ token ลงไปใน `TOKEN` น้า

> (วิธีเอา discord token : เปิด https://discord.com -> กด `Ctrl+Shift+C` -> Application Tab -> Storage -> Local Storage -> ค้นหา "token" ในช่อง filter -> คัดลอก token)

```json
{
    "TOKEN": "ใส่ token",
    "GUILD_ID": "ใส่ id ของเซิฟเวอร์ดิสคอร์ดที่จะเข้า",
    "VOICE_CHANNEL_ID": "",
    "DEAF": true,
    "MUTE": true
}
```

> ใน `VOICE_CHANNEL_ID` ใส่ id ของห้องเสียงที่จะลงไปออนไลน์เด้อ

> แต่ถ้าไม่ใส่ก็ไม่เป็นไร เพราะมันจะสุ่มลงห้องที่ลงได้ในเซิฟเวอร์นั้นๆ

รันสคริปต์ :
```bash
npm i
node index.js
```