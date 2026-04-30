/**
 * Estados de compra explícitos de una camiseta.
 * @readonly
 * @enum {string}
 */
export const ShirtOwnershipStatus = Object.freeze({
  OWNED: 'owned',
  PLANNED: 'planned',
});

/**
 * @typedef {Object} Shirt
 * @property {string} id
 * @property {string} image
 * @property {string} season
 * @property {string | null} teamId
 * @property {string | null} nationalTeamId
 * @property {string} numberId
 * @property {string} playerId
 * @property {string[]} championshipIds
 * @property {string[]} titleIds
 * @property {'owned' | 'planned'} ownershipStatus
 * @property {string} notes
 * @property {string[]} extraEventIds
 */

/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Team
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} NationalTeam
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Number
 * @property {string} id
 * @property {number} value
 */

/**
 * @typedef {Object} Championship
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Title
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} name
 */

/**
 * Datos semilla listos para renderizar y relacionar por ID.
 *
 * Incluye:
 * - camisetas compradas y planificadas,
 * - casos con múltiples campeonatos y títulos,
 * - acontecimientos extra por camiseta.
 */
export const seedData = {
  /** @type {Shirt[]} */
  shirts: [
    {
      id: 'shirt-arg-1986-home-maradona',
      image: '/images/arg-1986-home-maradona.jpg',
      season: '1986',
      teamId: null,
      nationalTeamId: 'national-argentina',
      numberId: 'number-10',
      playerId: 'player-maradona',
      championshipIds: ['championship-fifa-world-cup-1986'],
      titleIds: ['title-world-cup-champion'],
      ownershipStatus: ShirtOwnershipStatus.OWNED,
      notes: 'Camiseta icónica del Mundial de México 1986.',
      extraEventIds: ['event-hand-of-god', 'event-goal-of-the-century'],
    },
    {
      id: 'shirt-barca-2008-2011-home-messi',
      image: '/images/barca-2008-2011-home-messi.jpg',
      season: '2008-2011',
      teamId: 'team-barcelona',
      nationalTeamId: null,
      numberId: 'number-10',
      playerId: 'player-messi',
      championshipIds: ['championship-la-liga', 'championship-uefa-champions-league'],
      titleIds: ['title-la-liga-champion', 'title-champions-league-winner'],
      ownershipStatus: ShirtOwnershipStatus.OWNED,
      notes: 'Etapa de máximo rendimiento con múltiples títulos.',
      extraEventIds: ['event-six-titles-2009'],
    },
    {
      id: 'shirt-real-madrid-2016-2017-home-ronaldo',
      image: '/images/real-madrid-2016-2017-home-ronaldo.jpg',
      season: '2016-2017',
      teamId: 'team-real-madrid',
      nationalTeamId: null,
      numberId: 'number-7',
      playerId: 'player-cristiano-ronaldo',
      championshipIds: ['championship-la-liga', 'championship-uefa-champions-league'],
      titleIds: ['title-la-liga-champion', 'title-champions-league-winner'],
      ownershipStatus: ShirtOwnershipStatus.PLANNED,
      notes: 'Objetivo de compra para completar colección moderna.',
      extraEventIds: ['event-cardiff-final-2017'],
    },
    {
      id: 'shirt-arg-2022-home-messi',
      image: '/images/arg-2022-home-messi.jpg',
      season: '2022',
      teamId: null,
      nationalTeamId: 'national-argentina',
      numberId: 'number-10',
      playerId: 'player-messi',
      championshipIds: ['championship-fifa-world-cup-2022'],
      titleIds: ['title-world-cup-champion'],
      ownershipStatus: ShirtOwnershipStatus.PLANNED,
      notes: 'Planificada como camiseta central de la colección de selecciones.',
      extraEventIds: ['event-lusail-final-2022'],
    },
  ],

  /** @type {Player[]} */
  players: [
    { id: 'player-maradona', name: 'Diego Maradona' },
    { id: 'player-messi', name: 'Lionel Messi' },
    { id: 'player-cristiano-ronaldo', name: 'Cristiano Ronaldo' },
  ],

  /** @type {Team[]} */
  teams: [
    { id: 'team-barcelona', name: 'FC Barcelona' },
    { id: 'team-real-madrid', name: 'Real Madrid CF' },
  ],

  /** @type {NationalTeam[]} */
  nationalTeams: [
    { id: 'national-argentina', name: 'Selección Argentina' },
  ],

  /** @type {Number[]} */
  numbers: [
    { id: 'number-7', value: 7 },
    { id: 'number-10', value: 10 },
  ],

  /** @type {Championship[]} */
  championships: [
    { id: 'championship-fifa-world-cup-1986', name: 'FIFA World Cup 1986' },
    { id: 'championship-fifa-world-cup-2022', name: 'FIFA World Cup 2022' },
    { id: 'championship-la-liga', name: 'LaLiga' },
    { id: 'championship-uefa-champions-league', name: 'UEFA Champions League' },
  ],

  /** @type {Title[]} */
  titles: [
    { id: 'title-world-cup-champion', name: 'Campeón del Mundo' },
    { id: 'title-la-liga-champion', name: 'Campeón de LaLiga' },
    { id: 'title-champions-league-winner', name: 'Ganador de UEFA Champions League' },
  ],

  /** @type {Event[]} */
  events: [
    { id: 'event-hand-of-god', name: 'Mano de Dios' },
    { id: 'event-goal-of-the-century', name: 'Gol del Siglo' },
    { id: 'event-six-titles-2009', name: 'Sextete 2009' },
    { id: 'event-cardiff-final-2017', name: 'Final de Cardiff 2017' },
    { id: 'event-lusail-final-2022', name: 'Final de Lusail 2022' },
  ],
};

/**
 * Estructura principal por entidades para poder relacionar por ID.
 */
export const schema = seedData;

/**
 * Consultas base por relaciones ID.
 */
export const queries = {
  /**
   * Qué jugador usó qué camiseta.
   * @param {Shirt[]} shirts
   * @param {Player[]} players
   */
  playerByShirt(shirts, players) {
    return shirts.map((shirt) => ({
      shirtId: shirt.id,
      player: players.find((player) => player.id === shirt.playerId) ?? null,
    }));
  },

  /**
   * En qué campeonatos se disputó una camiseta.
   * @param {Shirt} shirt
   * @param {Championship[]} championships
   */
  championshipsByShirt(shirt, championships) {
    return championships.filter((championship) => shirt.championshipIds.includes(championship.id));
  },

  /**
   * Qué títulos ganó una camiseta.
   * @param {Shirt} shirt
   * @param {Title[]} titles
   */
  titlesByShirt(shirt, titles) {
    return titles.filter((title) => shirt.titleIds.includes(title.id));
  },

  /**
   * Si la camiseta está comprada o planificada.
   * @param {Shirt} shirt
   */
  isOwned(shirt) {
    return shirt.ownershipStatus === ShirtOwnershipStatus.OWNED;
  },
};
