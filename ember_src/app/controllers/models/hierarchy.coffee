`import Ember from 'ember'`

ModelsHierarchyController = Ember.Controller.extend
  new_model_name: ''

  actions:
    add_model: ->
      @store.createRecord('model', class_name: @new_model_name).save().then (record) =>
        console.log {queryParams: class_name: record.get('class_name')}
        @transitionToRoute 'models.edit', record.get('class_name')

`export default ModelsHierarchyController`
