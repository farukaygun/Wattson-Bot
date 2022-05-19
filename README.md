# **Wattson Bot**

> **'Circuit's broken! Someone else is here.'**

<br/>

### **Support**

Support Wattson Bot for server costs.

[![Kreosus](https://i.imgur.com/CXBYb6g.jpg?2)](https://kreosus.com/farukaygun)

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
- Open **.env** file and fill blank values.
- Enter your bot token to **TOKEN**.
- Enter your bot client to **CLIENT_ID**.
- Enter your welcome channel id to **WELCOME_CHANNEL_ID**.
- Open terminal in project dir and enter **node ./index.js**.
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
> - **'Speak'**
>
> permissions to Wattson!

<br/>

# **Features**

## **Commands**

### **General**

- **/random**
  - parameters:
    - **text**: Replies with random Wattson text quip.
    - **voice**: Replies with random Wattson voice line.
- **/nessie** : Replies with random Nessie image.
- **/author**: Replies with Wattson bot contributors.

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

- Wattson say welcome users who joined channel.
