/**
 * Dependencies
 */

var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

  identity: 'thing',
  tableName: 'thingBaseline',
  connection: 'baseline2',

  attributes: {
    name: 'string',
    description: 'string'
  }

});
