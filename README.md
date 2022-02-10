
# td-project (to be named)

## Background

--------------------------------------------------------------------------------------------------------------------

The idea behind a typical 'tower defense' game is that players will build towers to defend against incoming waves/hordes of enemies every round. Enemies will generate at a defined starting point and try to reach a defined endpoint along a specified path. Along this path, players will build towers which will attack enemies and keep them from reaching the endpoint. Towers can be placed in defined areas, and the player is to strategically place the towers to best defend against incoming enemies. The enemies will have health points, which are reduced with tower attacks, and will despawn when their health points reach 0.

Players will have money which is spent to buy new towers or upgrade existing ones. Players will also have health points, which will drop whenever an enemy passes through and reaches the endpoint. The game ends when the player's health points reaches 0.

There are many variations to tower defense games, but this is the general idea behind them. The current theme of this game is yet to be determined, but should be easily implemented once the backbone is set up. Variations for this version will be more clearly outlined in the Functionality & MVP and Bonus Features section.

## Functionality & MVPs

--------------------------------------------------------------------------------------------------------------------

In this td-project, users will be able to:

1. Build, upgrade, and sell different types of towers
2. Choose the spot where they will be able to place towers
3. Start waves every round
4. Play on randomly generated maps

In addition, this project will include:

1. Instructions on how to play the game and rules
2. A production README

## Wireframes

--------------------------------------------------------------------------------------------------------------------

![wireframe](/assets/images/wireframe.png) 

- Nav links include links to project's Github repo and my LinkedIn.
- Legend will include information about the towers.
- Instructions will remind the player how to play the game should they forget.
- Controls will include a Start button to start wave.
- Towers will include all the towers the player can build and upgrade them.
- Player info will show the amount of money the player has and their health.

## Technologies, Libraries, APIs

--------------------------------------------------------------------------------------------------------------------

The following technologies are planned used for this project:

- ***Canvas API***: rendering the board
- ***Webpack***: bundling and transpiling JavaScript code
- ***npm***: managing project dependencies

## Timeline

--------------------------------------------------------------------------------------------------------------------

- ***Friday Afternoon & Weekend***: Setup project and get webpack going. Getting the board to show up on browser, or rather Canvas to work while familiarizing myself with Canvas. Create Board class and possibly the Tower and Mob classes. Get objects to show up on canvas and possibly interact with eachother. If time permits will also create the Player class.
- ***Monday***: Implement the logic to the game, finish creating classes if I have not done so already and testing interactions between the different classes, eg. Towers properly interacting with Mobs. If time permits will work on mouse interactions.
- ***Tuesday***: Make sure all the classes are interacting with each other properly and focus on making sure the basics of the game works. Then start on making the game look pretty, adding images or what nots depending on what theme is decided to be.
- ***Wednesday***: Make sure game has no bugs and runs, work on the actual browser page content (eg instructions, legends, etc) and make it look nice. If there is time, will consider bonus features.
- ***Thursday Morning***: Deploy to GitHub. Rewrite proposal as production README.

## Bonus Features

--------------------------------------------------------------------------------------------------------------------

Possible Updates:

- Adding more towers and mobs;
- Adding another aspect to game (eg. offer boons to players at the start of each round).
- If targetting is not as well made perhaps change it