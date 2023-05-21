var gameItems = [];
var playerHealth = 100;

function show(text, options) {
    $('#text').text(text);
    $('#options').empty();
    for (const option of options) {
        const button = $('<button>').text(option.text).on('click', option.action);
        $('#options').append(button);
    }
}

function restart() {
    gameItems = [];
    playerHealth = 100;
    start();
}

function start() {
    show('You wake up on a mysterious island. Your memory is hazy, and you have no idea how you got here.', [
        { text: 'Look around', action: lookAround }
    ]);
}

function lookAround() {
    show('You take a look around and see three potential paths:', [
        { text: 'Head towards the Beach', action: goBeach },
        { text: 'Venture into the Forest', action: goForest },
        { text: 'Explore the Cave', action: goCave }
    ]);
}

function goBeach() {
    show('You head towards the beach and find a small survival kit washed ashore.', [
        { text: 'Take the Survival Kit', action: () => { gameItems.push('Survival Kit'); goForest(); } },
        { text: 'Leave it and continue', action: goForest }
    ]);
}

function goForest() {
    if (gameItems.includes('Survival Kit')) {
        show('You enter the dense forest and come across a river blocking your way.', [
            { text: 'Build a Raft', action: buildRaft },
            { text: 'Find Another Path', action: findPath }
        ]);
    } else {
        show('You enter the forest and encounter a dangerous wild animal.', [
            { text: 'Fight the Animal', action: fightAnimal },
            { text: 'Run Away', action: runAway }
        ]);
    }
}

function buildRaft() {
    if (gameItems.includes('Wood') && gameItems.includes('Vines')) {
        show('You successfully build a raft and cross the river, moving deeper into the forest.', [
            { text: 'Continue Exploring', action: continueExploring }
        ]);
    } else {
        show('You try to build a raft, but you lack the necessary materials.', [
            { text: 'Find Wood', action: findWood },
            { text: 'Find Vines', action: findVines }
        ]);
    }
}

function findWood() {
    gameItems.push('Wood');
    show('You gather some wood to build the raft.', [
        { text: 'Continue Building Raft', action: buildRaft }
    ]);
}

function findVines() {
    gameItems.push('Vines');
    show('You find some strong vines that can be used to tie the raft together.', [
        { text: 'Continue Building Raft', action: buildRaft }
    ]);
}

function continueExploring() {
    show('As you explore deeper into the forest, you stumble upon an ancient temple.', [
        { text: 'Enter the Temple', action: enterTemple },
        { text: 'Return to the Beach', action: goBeach }
    ]);
}

function enterTemple() {
    if (gameItems.includes('Survival Kit')) {
        show('Inside the temple, you find a hidden chamber with valuable treasures.', [
            { text: 'Collect the Treasures', action: collectTreasures },
            { text: 'Leave the Temple', action: leaveTemple }
        ]);
    } else {
        show('You enter the temple but unfortunately it\'s booby-trapped! A sharp dart hits you.', [
            { text: 'Press on', action: pressOn },
            { text: 'Run Away', action: runAway }
        ]);
    }
}

function leaveTemple() {
    show('You decide it\'s safer to leave the temple and head back.', [
        { text: 'Continue Exploring', action: continueExploring }
    ]);
}

function pressOn() {
    playerHealth -= 30;
    if (playerHealth <= 0) {
        show('Your wounds are too severe. You have died on the island.', [
            { text: 'Restart', action: restart }
        ]);
    } else {
        show(`You press on despite your injury. Your current health is ${playerHealth}.`, [
            { text: 'Continue Exploring', action: continueExploring }
        ]);
    }
}

function runAway() {
    show('You run away as fast as you can and find yourself back at the start.', [
        { text: 'Look around', action: lookAround }
    ]);
}

function fightAnimal() {
    playerHealth -= 50;
    if (playerHealth <= 0) {
        show('You put up a valiant fight, but the animal overpowers you. You have died on the island.', [
            { text: 'Restart', action: restart }
        ]);
    } else {
        show(`You manage to fend off the animal but not without sustaining injuries. Your current health is ${playerHealth}.`, [
            { text: 'Continue Exploring', action: continueExploring }
        ]);
    }
}

function collectTreasures() {
    gameItems.push('Treasures');
    show('You collect the treasures. You\'re rich!', [
        { text: 'Find a Way Off the Island', action: tryEscape }
    ]);
}

function tryEscape() {
    if (gameItems.includes('Raft')) {
        show('Using the raft you built earlier, you paddle away from the island with your newfound treasures.', [
            { text: 'Start a New Adventure', action: restart }
        ]);
    } else {
        show('You have no means of leaving the island. You decide to settle down with your treasures.', [
            { text: 'Start a New Adventure', action: restart }
        ]);
    }
}

function findPath() {
    show('You decide to find an alternate path through the forest.', [
        { text: 'Navigate through the Swamp', action: navigateSwamp },
        { text: 'Climb the Tall Tree', action: climbTree }
    ]);
}

function goCave() {
    show('You decide to explore the dark and mysterious cave.', [
        { text: 'Enter the Cave', action: enterCave },
        { text: 'Turn Back', action: lookAround }
    ]);
}

function enterCave() {
    show('You enter the cave and discover hidden treasures.', [
        { text: 'Collect the Treasures', action: collectTreasures },
        { text: 'Leave the Cave', action: lookAround }
    ]);
}

$(document).ready(function() {
    restart();
});
