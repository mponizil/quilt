var test = require('tape');
var Quilt = require('../quilt');
var Backbone = require('backbone');
Backbone.$ = require('jquery/dist/jquery')(window);

test('data-attrs', function(t) {
  var view = new Quilt.View({
    template: function() {
      return '<p><i data-attrs=\'{"title": "title"}\'></i></p>';
    },
    model: new Backbone.Model({title: 'x'})
  }).render();
  t.strictEqual(view.$('i').attr('title'), 'x');
  view.model.set({title: 'y'});
  t.strictEqual(view.$('i').attr('title'), 'y');
  t.end();
});

test('data-props', function(t) {
  var view = new Quilt.View({
    template: function() {
      return '<p><input type="checkbox" data-props=\'{"checked": "checked"}\'></p>';
    },
    model: new Backbone.Model({checked: true})
  }).render();
  t.ok(view.$('input').prop('checked'));
  view.model.set({checked: false});
  t.ok(!view.$('input').prop('checked'));
  t.end();
});

test('data-css', function(t) {
  var view = new Quilt.View({
    template: function() {
      return '<p><i data-css=\'{"display": "display"}\'></i></p>';
    },
    model: new Backbone.Model({display: 'block'})
  }).render();
  t.strictEqual(view.$('i').css('display'), 'block');
  view.model.set({display: 'inline'});
  t.strictEqual(view.$('i').css('display'), 'inline');
  t.end();
});

test('multiple attrs', function(t) {
  var view = new Quilt.View({
    template: function() {
      return '<p><i data-css=\'{"display": "display", "position": "position"}\'></i></p>';
    },
    model: new Backbone.Model({display: 'block', position: 'absolute'})
  }).render();
  view.model.set({display: 'inline', position: 'relative'});
  t.strictEqual(view.$('i').css('display'), 'inline');
  t.strictEqual(view.$('i').css('position'), 'relative');
  t.end();
});

test('missing model', 0, function(t) {
  new Quilt.View({
    template: function() {
      return '<p><i data-attrs=\'{"title": "title"}\'></i></p>';
    }
  }).render();
  t.end();
});
