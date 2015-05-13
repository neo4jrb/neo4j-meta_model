`import Ember from 'ember'`

HasAssociationsIndexRoute = Ember.Route.extend
  model: (params) ->
    @store.find 'has_association'

  actions:
    delete: (has_association) ->
      has_association.destroyRecord()

`export default HasAssociationsIndexRoute`
