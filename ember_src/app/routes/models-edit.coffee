`import Ember from 'ember'`

ModelsEditRoute = Ember.Route.extend
  model: (params) ->
    Ember.RSVP.hash
      model: @store.find 'model', params.class_name
      models: @store.find 'model'
      property_types: ['String', 'DateTime']

  actions:
    add_property: (model) ->
      property = model.get('properties').createRecord name: '', type: 'String', model_id: model.id
      property.save()

    delete_property: (property) ->
      property.destroyRecord()

    save: (model) ->
      model.save() #if model.get 'isDirty'
      model.get('properties').forEach (property) ->
        property.save() if property.get 'isDirty'

    delete: (model) ->
      model.destroyRecord().then =>
       @transitionTo 'models.hierarchy'

`export default ModelsEditRoute`
