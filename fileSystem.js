const fs = require('fs');
const readlineSync = require('readline-sync');

const fileName = 'notes.txt';

function writeToFile() {
    const userInput = readlineSync.question('Enter text to save to file (press Enter to save):\n');
    fs.appendFile(fileName, userInput + '\n', 'utf8', (err) => {
        if (err) throw err;
        console.log('Text saved to file successfully!');
        showMenu();
    });
}

function readFromFile() {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            showMenu();
            return;
        }
        console.log('Contents of notes.txt:\n');
        console.log(data);
        showMenu();
    });
}

function showMenu() {
    console.log('\nSelect an option:');
    console.log('1. Write to file');
    console.log('2. Read from file');
    console.log('3. Exit');

    const choice = readlineSync.question('> ');

    switch (choice) {
        case '1':
            writeToFile();
            break;
        case '2':
            readFromFile();
            break;
        case '3':
            console.log('Exiting program.');
            process.exit(0);
        default:
            console.log('Invalid choice. Please enter 1, 2, or 3.');
            showMenu();
            break;
    }
}

showMenu();