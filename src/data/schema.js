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
 * Estructura principal por entidades para poder relacionar por ID.
 */
export const schema = {
  /** @type {Shirt[]} */
  shirts: [],
  /** @type {Player[]} */
  players: [],
  /** @type {Team[]} */
  teams: [],
  /** @type {NationalTeam[]} */
  nationalTeams: [],
  /** @type {Number[]} */
  numbers: [],
  /** @type {Championship[]} */
  championships: [],
  /** @type {Title[]} */
  titles: [],
  /** @type {Event[]} */
  events: [],
};

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
