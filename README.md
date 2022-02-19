# Crabada Bot
 
- Find your own team id and data via a test txn and replace that in startGame()

- The script lets you have a telegram bot that sends update but you can remove those if needed

- Ideally, closeGame() is called via checking block timestamps but I'm lazy to implement

- Due to async functions(I think), when you swap, you receive the balance message before the swap goes through,
  should solve this via a .then but have not implemented

- Same thing can also occur when games are ended and started. You can get the start game message before close game
