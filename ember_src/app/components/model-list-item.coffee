`import Ember from 'ember'`

ModelListItemComponent = Ember.Component.extend
  action: 'meta_model_clicked'
  actions:
    clicked: ->
      @sendAction 'action', @get('model')
    goto_metamodel: (model) ->
      @sendAction 'action', model

`export default ModelListItemComponent`
