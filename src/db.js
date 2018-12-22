/**
 * @typedef  Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 */

/**
 * @typedef  LineItem
 * @property {string} productId
 * @property {string} name
 * @property {number} price
 * @property {number} qty
 */

/**
 * @typedef  Discount
 * @property {string} code
 * @property {number} amount
 * @property {string} type    Possible values: percent | nominal
 */

/**
 * @typedef  Cart
 * @property {Array<LineItem>} lineItems
 */
