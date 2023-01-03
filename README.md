# **Wattson Bot**

Wattson Bot is a Discord music bot.

> **'Circuit's broken! Someone else is here.'**

<br/>

## **Add Wattson to your server**

> ### **Note**
>
> A text channel called 'welcome' is required for Wattson to send welcome messages.

<br/>

[![Wattson image](https://i.imgur.com/25XHUvF.jpg?1)](https://discord.com/api/oauth2/authorize?client_id=970358178975973376&permissions=2150877264&scope=bot%20applications.commands)

<br/>

# **Build**

## **Requirements**

- [Node.js](https://nodejs.dev/download)

<br/>

## **Installation**

> [How to create a Discord bot?](https://discord.com/developers/docs/getting-started)
>
> [How to enable developer mode and getting channel id on Discord?](https://beebom.com/how-enable-disable-developer-mode-discord/#:~:text=%28Android,%20iOS%29-,1.,And%20that%27s%20it.)

- Download [voice lines](https://1drv.ms/u/s!AsHdGflePryehtN7hq1YNtVv8G0Deg?e=fMDZH4) and extract to './{Project dir}/data/'
- Open terminal in project dir and enter **npm install**.
- Rename **.env.example** to **.env** and fill in your tokens.
- Enter your bot token to **TOKEN**.
- Enter your bot client to **CLIENT_ID**.
- Enter your welcome channel name to **WELCOME_CHANNEL_NAME**.
- Open terminal in project dir.
- Enter **node ./deployCommands.js**.
- After that, you can start Wattson with **node ./index.js**.
- Done! Wattson should be alive now!

<br/>

> ### **Note**
>
> Don't forget to give;
>
> - **'Send Messages'**,
> - **'Send Messages in Threads'**,
> - **'Embed Links'**,
> - **'Attach Files'**,
> - **'Read Message History'**,
> - **'Mention Everyone'**,
> - **'Use Slash Commands'**,
> - **'Connect'**,
> - **'Add Reactions'**,
> - **'Speak'**
>
> permissions to Wattson!

<br/>

# **Features**

## **Commands**

### **General**

- **/help** : Wattson replies with her commands.
- **/random**
  - parameters:
    - **text**: Wattson replies with random Wattson text quip.
    - **voice**: Wattson replies with random Wattson voice line.
- **/nessie** : Wattson replies with random Nessie image.
- **/author**: Wattson replies with Wattson bot contributors.

### **Music**

- **/play**

  - subcommands:
    - **song**: Wattson will play song with given url.
    - **search**: Wattson will find and play song with given keywords.
    - **playlist**: Wattson will play playlist with given url.

- **/pause**: Wattson displays the current song queue.
- **/resume**: Wattson found no songs in the queue.
- **/stop**: Wattson stops the plays songs and clears the queue.
- **/skip**: Wattson skips the current song.
- **/queue**: Wattson displays the current song queue.
- **/info**: Wattson displays info about the currently playing song.

<br/>

## **Other Feautures**

- Wattson says hello when she joins new channel.
- Wattson says welcome users who joined channel.
