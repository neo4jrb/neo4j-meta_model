`import Ember from 'ember'`

ModelListComponent = Ember.Component.extend
  action: 'goto_metamodel'
  actions:
    meta_model_clicked: (model) ->
      @sendAction 'action', model

`export default ModelListComponent`
