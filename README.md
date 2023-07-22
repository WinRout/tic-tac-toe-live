# Tic Tac Toe Game (Node.js & Express)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints (on the way...)]
- [Technologies Used](#technologies-used)

## Introduction

This is a very simple Tic Tac Toe game built with Node.js and Express just for fun. It allows two players to play the classic Tic Tac Toe game online on a web interface. The game is designed to be interactive and easy to use, providing an enjoyable gaming experience.

## Features

- Two-player gameplay.
- Multiple games at the same time.
- Interactive and user-friendly interface.
- Real-time updates of the game board.
- Prevents invalid moves and checks for game over conditions.
- Option to leave game.
  
## Requirements

To run this application, you need the following installed on your system:

- Node.js (any version will do)
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/winrout/tic-tac-toe-live.git
   
2. Navigate to the project directory:
   ```bash
   cd tic-tac-toe-live
   
3. Install the required depedencies
   ```bash
   npm install

## Usage

1. Start the application. This will start the nodejs server on the port 3000 of your local machine.  
    ```bash
    npm run-script run

2. Open a web browser from any machine in your local network and visit `http://{your ip address}:3000` to access the game.
Attention: If you cannot access the game from a different machine, check your firewall settings.

3. First you choose a name and wait for an opponent to join the game. If you put a username that already is in the waiting list, you are alerted with a message.

4. When an opponent gets into the game, the game autoatically starts. The player who was waiting first gets the X's values and plays first.

5. To leave the game, press leave game and the opponent will be informed.

## Technologies Used
- Node.js
- Express.js
- HTML
- CSS
- JavaScript
  
