# Crabada Bot

This script lets you run your own bot for Crabada, automating starting and closing game every 4 hours 

It includes an integration with a telegram bot that sends update but you can remove those if needed

## Running 
Just git clone and install dependencies.

```
git clone https://github.com/SavageCabbagee/Crabada-Bot.git
npm install
```

### Steps
1. Do a test start game txn and find your team id. Copy that data and paste it in the data line (line 37) for startGame()

```
async function startGame() {
    var transaction = {
        data: '<PASTE_HERE>', 
        to: Crabada_Game_Address,
        value: 0,
        from: My_Address,
    };
}
```

2. Create a .env file and fill in your private key and telebot API from BotFather

```
Wallet = <Private_Key>
telebot = <API>
```

3. Get your telegram id from @userinfobot and fill that up for the <YOUR_ID> field in bot.sendMessage

4. Paste your address in My_Address line.

5. Ensure you have approved TUS and CRA for trades on Trader Joe.

6. Run the bot and send /start to the bot.
```
ts-node bot.ts
```

## Issues

- Ideally, closeGame() is called via checking block timestamps but I'm lazy to implement

- Due to async functions(I think), when you swap, you receive the balance message before the swap goes through,
  should solve this via a .then but have not implemented

- Due to the .then in closeGame(), you get the start game message before close game
