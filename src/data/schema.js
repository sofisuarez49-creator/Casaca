/**
 * Estados de compra explícitos de una camiseta.
 * @readonly
 * @enum {string}
 */
export const ShirtOwnershipStatus = Object.freeze({
  OWNED: 'owned',
  PLANNED: 'planned',
});

const TEAM_FALLBACK_LABEL = 'Sin equipo/selección';

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
 * @typedef {Object} ShirtViewModel
 * @property {Player | null} player
 * @property {Team | {id: null, name: string} | null} team
 * @property {NationalTeam | null} nationalTeam
 * @property {Number | null} number
 * @property {Championship[]} championships
 * @property {Title[]} titles
 * @property {Event[]} events
 * @property {'owned' | 'planned'} ownershipStatus
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
   * @returns {Championship[]}
   */
  championshipsByShirt(shirt, championships) {
    return championships.filter((championship) => shirt.championshipIds.includes(championship.id));
  },

  /**
   * Qué títulos ganó una camiseta.
   * @param {Shirt} shirt
   * @param {Title[]} titles
   * @returns {Title[]}
   */
  titlesByShirt(shirt, titles) {
    return titles.filter((title) => shirt.titleIds.includes(title.id));
  },

  /**
   * Qué eventos adicionales se asocian a una camiseta.
   * @param {Shirt} shirt
   * @param {Event[]} events
   * @returns {Event[]}
   */
  eventsByShirt(shirt, events) {
    return events.filter((event) => shirt.extraEventIds.includes(event.id));
  },

  /**
   * Construye un view model de camiseta listo para UI.
   * @param {Shirt} shirt
   * @param {typeof schema} schema
   * @returns {ShirtViewModel}
   */
  buildShirtViewModel(shirt, schema) {
    const team = schema.teams.find((candidate) => candidate.id === shirt.teamId) ?? null;
    const nationalTeam = schema.nationalTeams.find((candidate) => candidate.id === shirt.nationalTeamId) ?? null;

    return {
      player: schema.players.find((player) => player.id === shirt.playerId) ?? null,
      team: team ?? (!nationalTeam ? { id: null, name: TEAM_FALLBACK_LABEL } : null),
      nationalTeam,
      number: schema.numbers.find((number) => number.id === shirt.numberId) ?? null,
      championships: this.championshipsByShirt(shirt, schema.championships) ?? [],
      titles: this.titlesByShirt(shirt, schema.titles) ?? [],
      events: this.eventsByShirt(shirt, schema.events) ?? [],
      ownershipStatus: shirt.ownershipStatus,
    };
  },

  /**
   * Construye todas las tarjetas de camisetas listas para UI.
   * @param {typeof schema} schema
   * @returns {ShirtViewModel[]}
   */
  buildAllShirtCards(schema) {
    return schema.shirts.map((shirt) => this.buildShirtViewModel(shirt, schema));
  },

  /**
   * Si la camiseta está comprada o planificada.
   * @param {Shirt} shirt
   */
  isOwned(shirt) {
    return shirt.ownershipStatus === ShirtOwnershipStatus.OWNED;
  },
};
