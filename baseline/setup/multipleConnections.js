/**
 * Module Dependencies
 */

var Waterline = require('waterline');
var _ = require('lodash');
var async = require('async');
var assert = require('assert');

// Require Fixtures
var fixtures = {
  UserFixture: require('../support/fixtures/crud.fixture'),
  ThingFixture: require('../support/fixtures/thing.fixture')
};

describe('Baseline', function() {
  
  describe('Adapter Setup', function() {
    
    describe('Multiple Connections', function() {
      
      /////////////////////////////////////////////////////
      // TEST SETUP
      ////////////////////////////////////////////////////
      
      var waterline, ontology;
      
      before(function(done) {
      
        waterline = new Waterline();
      
        Object.keys(fixtures).forEach(function(key) {
          waterline.loadCollection(fixtures[key]);
        });
      
        done();
      });
      
      after(function(done) {
      
        function dropCollection(item, next) {
          if(!Adapter.hasOwnProperty('drop')) return next();
          
          console.log('\n dropping item:', item);
          ontology.collections[item].drop(function(err) {
            if(err) return next(err);
            next();
          });
        }
      
        async.each(Object.keys(ontology.collections), dropCollection, function(err) {
          if(err) return done(err);
          waterline.teardown(done);
        });
      });
      
      
      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////
      
      it('should initialize successfully', function(done){
        var connections = { baseline: _.clone(Connections.test), baseline2: _.clone(Connections.test) };
        var defaults = { migrate: 'alter' };
        
        waterline.initialize({ adapters: { wl_tests: Adapter }, connections: connections, defaults: defaults }, function(err, _ontology) {
          assert(!err, err);
      
          ontology = _ontology;
      
          Object.keys(_ontology.collections).forEach(function(key) {
            var globalName = key.charAt(0).toUpperCase() + key.slice(1);
            global.Baseline[globalName] = _ontology.collections[key];
          });
          
          done();
        });
      });
      
    });
  });
});