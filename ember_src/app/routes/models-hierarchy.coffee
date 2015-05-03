`import Ember from 'ember'`

ModelsHierarchyRoute = Ember.Route.extend
  model: ->
    Ember.$.getJSON(mm_path '/meta/models/hierarchy.json').then (data) ->
      data.models
  actions:
    goto_metamodel: (model) ->
      @transitionTo 'models.edit', model.class_name

`export default ModelsHierarchyRoute`
