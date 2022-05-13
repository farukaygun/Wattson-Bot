
# **Wattson Bot**

**'Circuit's broken! Someone else is here.'**
  
> Video:
> 
> [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/N7lgKbtZpOI/0.jpg)](https://www.youtube.com/watch?v=N7lgKbtZpOI)

<br/><br/>

# **Build**

<br/>

## Requirements
- [Node.js](https://nodejs.dev/download)

<br/>

## Installation

<br/>

> [How to create a Discord bot?](https://discord.com/developers/docs/getting-started)
> 
> [How to enable developer mode and getting channel id on Discord?](https://beebom.com/how-enable-disable-developer-mode-discord/#:~:text=%28Android,%20iOS%29-,1.,And%20that%27s%20it.)

- Download [voice lines](https://1drv.ms/u/s!AsHdGflePryehtN7hq1YNtVv8G0Deg?e=fMDZH4) and extract to './{Project dir}/data/'
- Open terminal in project dir and enter **npm install**.
- Open **.env** file and fill blank values.
- Enter your bot token to **TOKEN**.
- Enter your bot client to **CLIENT_ID**.
- Enter your welcome channel id to **WELCOME_CHANNEL_ID**.
- Open terminal in project dir and enter **node ./src/app.js**.
- Done! Wattson should be alive now!

> ### Note
Don't forget to give;
- **'Send Messages'**,
- **'Send Messages in Threads'**,
- **'Embed Links'**,
- **'Attach Files'**,
- **'Read Message History'**, 
- **'Mention Everyone'**,
- **'Use Slash Commands'**,
- **'Connect'**, 
- **'Speak'**
 
 permissions to Wattson!

<br/><br/>

# **Features**

## Commands
- **/random**
  - parameters: 
    - **text**: Replies with random Wattson text quip.
    - **voice**: Replies with random Wattson voice line.
- **/nessie** : Replies with random Nessie image.
- **/author**: Replies with Wattson bot contributors.

<br/>

## Other Feautures
- Wattson say welcome users who joined channel.

<br/>

## Planned
- I'm planning to add feature Wattson will play audio from youtube.
