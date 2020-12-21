import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { createGameState } from '../../config/initial_state';


export const useNewGame = () => {
  const firebase = useFirebase();
  const db = firebase.database();
  const games = useSelector(state => state.firebase.data.games);
  let gamePIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
  if (games) {
    while (gamePIN in games) {
      gamePIN = Math.floor(Math.random() * 8999 + 1000).toFixed();
    }
  }
  
  const newGameState = createGameState(gamePIN);
  const gameRef = db.ref(`games/${gamePIN}`);
  gameRef.set(newGameState, () => {
    const courtDeck = gameRef.child('court/courtDeck');
    ['ambassador', 'assassin', 'captain', 'contessa', 'duke'].forEach(character => {
      [1, 2, 3].forEach(_ => {
        const newCardKey = courtDeck.push().key;
        courtDeck.child(newCardKey).set(character);
      });
    });
  });
  return gamePIN
};

export const useGame = () => {
  const [game, setGame] = useState('');
  const { gamePIN } = useParams();
  const allGames = useSelector(state => state.firebase.data.games);
  useEffect(() => {
    if (allGames && gamePIN in allGames) setGame(allGames[gamePIN]);
  }, [allGames, gamePIN, game]);
  
  if (game) {
    return [game, true];
  } else {
    return [null, false];
  }
};

export const usePlayers = (game) => {
  const [players, setPlayers] = useState();
  const [arePlayersJoined, setArePlayersJoined] = useState(false);
  useEffect(() => {
    if (game && game.users) setArePlayersJoined(true);
  }, [game]);

  useEffect(() => {
    if (arePlayersJoined) setPlayers(game.users.players);
  }, [game, arePlayersJoined]);
  
  if (arePlayersJoined && players) {
    return [{
      playerEntries: Object.entries(players),
      playerKeys: Object.keys(players),
      playerNames: Object.values(players),
      numPlayers: Object.keys(players).length
    }, true];
  } else {
    return [{
      playerEntries: [],
      playerKeys: [],
      playerNames: [],
      numPlayers: 0,
    }, false];
  }
};

export const usePlayer = (game) => {
  const [player, setPlayer] = useState('');
  const { userKey } = useParams();
  useEffect(() => {
    if (game && userKey) setPlayer(game.users.allUsers[userKey]);
  }, [game, userKey, player]);

  if (player) {
    return [player, true];
  } else {
    return [null, false];
  }
};

// export const useGameRefs = (game) => {
//   const firebase = useFirebase();
//   const db = firebase.database();
//   const gameRef = db.ref(`games/${game.pin}`);
//   const refs = {
//     gameRef,
//     allPlayerLiveCards: gameRef.child('hands/liveCards'),
//     allPlayerDeadCards: gameRef.child('hands/deadCards'),
//     allPlayerCoins: gameRef.child('hands/coins'),
//     courtDeck: gameRef.child('court/courtDeck'),
//     treasury: gameRef.child('court/treasury'),
//   };
//   return refs;
// };

// export const usePlayerRefs = (game, player) => {
//   const { allPlayerLiveCards, allPlayerDeadCards, allPlayerCoins } = getGameRefs(game);
//   const playerRefs = {
//     playerLiveCards: allPlayerLiveCards.child(player),
//     playerDeadCards: allPlayerDeadCards.child(player),
//     playerCoins: allPlayerCoins.child(player)
//   };
//   return playerRefs;
// };

// export const setupCourtDeck = () => {
//   const { gamePIN } = useParams();
//   const firebase = useFirebase();
// // }


// export const setupCourtDeck = ({ firebase, gamePIN }) => {
//     ['ambassador', 'assassin', 'captain', 'contessa', 'duke'].forEach(character => {
//         [1, 2, 3].forEach(_ => {
//             let courtDeckPath = 'games/' + gamePIN + '/court/courtDeck/';
//             let newCardKey = firebase.database().ref(courtDeckPath).push().key;
//             firebase.database().ref(courtDeckPath + newCardKey).set(character);
//         });
//     });
// };

// export const dealHands = ({ firebase, players, gamePIN }) => {
//     let courtDeckRef = firebase.database().ref('games/' + gamePIN + '/court/courtDeck');
//     [1,2].forEach(_ => {
//         players.forEach(player => {
//             courtDeckRef.once('value', snapshot => {
//                 let courtDeck = snapshot.val();
//                 let courtDeckKeys = Object.keys(courtDeck);
//                 let randomCardKey = courtDeckKeys[Math.floor(Math.random() * courtDeckKeys.length)];
//                 let randomCard = courtDeck[randomCardKey];
//                 courtDeckRef.child(randomCardKey).remove();
//                 firebase.database().ref('games/' + gamePIN + '/hands/liveCards/' + player).update({ [randomCardKey]: randomCard })
//             });
//         });
//     });
// };

// export const dealCoins = ({ firebase, players, gamePIN }) => {
//     let treasuryRef = firebase.database().ref('games/' + gamePIN + '/court/treasury');
//     players.forEach(player => {
//         treasuryRef.set(firebase.database.ServerValue.increment(-2));
//         firebase.database().ref('games/' + gamePIN + '/hands/coins/' + player).set(2);
//     });
// };

// // export const dealPlayers = ({ firebase, players, gamePIN }) => {
// //   const gameRef = firebase.database().ref(`games/${gamePIN}`);
// //   const courtRef = gameRef.child('court');
// //   const handsRef = gameRef.child('hands/liveCards');
// //   const [deckRef, treasuryRef] = ['courtDeck', 'treasury'].map(ref => courtRef.child(ref));
// //   const dealPlayerCard = player => {
// //     deckRef.once('value', snapshot => {
// //       const courtDeck = snapshot.val();
// //       const courtDeckKeys = Object.keys(courtDeck);
// //       const randomCardKey = courtDeckKeys[Math.floor(Math.random() * courtDeck.length)];
// //       const randomCard = { ...courtDeck[randomCardKey] }
// //       courtDeck.child(randomCardKey).remove();
// //       handsRef.child(player).update(randomCard);
// //     })
// //   }
// // }