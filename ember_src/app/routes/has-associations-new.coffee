`import Ember from 'ember'`

HasAssociationsNewRoute = Ember.Route.extend
  model: (params) ->
    Ember.RSVP.hash
      has_association: @store.createRecord 'has_association'
      models: @store.find 'model'
      join_types: ['one_to_many', 'many_to_one', 'many_to_many']

  actions:
    create: (has_association) ->
      has_association.save().then (record) =>
       @transitionTo 'has_associations.index'

`export default HasAssociationsNewRoute`
