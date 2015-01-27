#= require lodash
#= require jquery
#= require jquery_ujs
#= require handlebars
#= require ember
#= require ember-data


#= require sightglass
#= require rivets
#= require backbone
#= require rivets-backbone


#= require ./store
#= require_tree ./templates
#= require ./router
#= require_self

mm_path = (path) ->
  base_path = meta_model_root_path

  base_path = base_path[0..-2] if base_path[-1..-1] is '/'

  p = path
  p = p[1..-1] if p[0] is '/'

  base_path + '/' + p

ready = ->
  if $('#ember-application').length
    # for more details see: http://emberjs.com/guides/application/
    window.MetaModel = Ember.Application.create(rootElement: '#ember-application')

    MetaModel.ApplicationController = Ember.Controller.extend()

    MetaModel.Model = DS.Model.extend()

    console.log {path: mm_path('meta')[1..-1]}
    MetaModel.MetaModelAdapter = DS.RESTAdapter.extend
      namespace: mm_path('meta')[1..-1]

    MetaModel.ModelAdapter = MetaModel.MetaModelAdapter.extend()
    MetaModel.PropertyAdapter = MetaModel.MetaModelAdapter.extend()

    MetaModel.HasAssociationAdapter = MetaModel.MetaModelAdapter.extend
      buildURL: (type, id, record) ->
        result = "/meta/has_associations"
        result += "/#{id}" if id
        mm_path result


    MetaModel.Router.map ->
      @route 'index', path: "/"

      @resource 'models', path: '/models', ->
        @route 'hierarchy', path: "/"
        @route 'edit', path: "/:class_name/edit"

      @resource 'has_associations', ->
        @route 'index', path: '/'
        @route 'new', path: '/new'



    MetaModel.ApplicationAdapter = DS.ActiveModelAdapter.extend()

    MetaModel.ApplicationSerializer = DS.ActiveModelSerializer.extend()

    # Components

    MetaModel.FocusInputComponent = Ember.TextField.extend
      becomeFocused: (->
        @$().focus()
      ).on('didInsertElement')



    MetaModel.ModelListItemComponent = Ember.Component.extend
      action: 'meta_model_clicked'
      actions:
        clicked: ->
          @sendAction 'action', @get('model')
        goto_metamodel: (model) ->
          @sendAction 'action', model

    MetaModel.ModelListComponent = Ember.Component.extend
      action: 'goto_metamodel'
      actions:
        meta_model_clicked: (model) ->
          @sendAction 'action', model


    # Models

    MetaModel.Property = DS.Model.extend
      name: DS.attr 'string'
      type: DS.attr 'string'
      model: DS.belongsTo 'Model', inverse: 'properties'

    MetaModel.Model = DS.Model.extend
      class_name: DS.attr 'string'
      superclass_model: DS.belongsTo 'Model'
      #superclass_model: DS.attr 'string'
      properties: DS.hasMany 'Property'
      id_property: DS.belongsTo 'Property'
      source_has_associations: DS.hasMany 'HasAssociation', inverse: 'to_model'
      destination_has_associations: DS.hasMany 'HasAssociation', inverse: 'from_model'

    MetaModel.HasAssociation = DS.Model.extend
      join_type: DS.attr 'string'
      name: DS.attr 'string'
      opposite_name: DS.attr 'string'
      relationship_type: DS.attr 'string'
      from_model: DS.belongsTo 'Model', async: true
      to_model: DS.belongsTo 'Model', async: true

      source_join_type: (->
        @get('join_type')?.split('_to_')[0]
      ).property('join_type')

      destination_join_type: (->
        @get('join_type')?.split('_to_')[1]
      ).property('join_type')

      source_is_defined: (->
        @get('source_join_type') and @get('from_model')
      ).property('source_join_type', 'from_model')

      destination_is_defined: (->
        @get('destination_join_type') and @get('to_model')
      ).property('destination_join_type', 'to_model')

      models_are_defined: (->
        @get('from_model') and @get('to_model')
      ).property('from_model', 'to_model')


      standardize_relationship_type: (->
        @set 'relationship_type', @get('relationship_type').replace(/[^a-zA-Z0-9]+/g, '_')
      ).observes('relationship_type')


    # Routes / Controllers


    MetaModel.ModelsHierarchyRoute = Ember.Route.extend
      model: ->
        Ember.$.getJSON(mm_path '/meta/models/hierarchy.json').then (data) ->
          data.models
      actions:
        goto_metamodel: (model) ->
          @transitionTo 'models.edit', model.class_name


    MetaModel.ModelsHierarchyController = Ember.Controller.extend
      new_model_name: ''

      actions:
        add: (class_name) ->
         @store.createRecord('model', class_name: @new_model_name).save().then (record) =>
           @transitionToRoute 'models.edit', queryParams: class_name: record.class_name


    MetaModel.ModelsEditRoute = Ember.Route.extend
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

    MetaModel.HasAssociationsIndexRoute = Ember.Route.extend
      model: (params) ->
        @store.find 'has_association'

      actions:
        delete: (has_association) ->
          has_association.destroyRecord()



    MetaModel.HasAssociationsNewRoute = Ember.Route.extend
      model: (params) ->
        Ember.RSVP.hash
          has_association: @store.createRecord 'has_association'
          models: @store.find 'model'
          join_types: ['one_to_many', 'many_to_one', 'many_to_many']

      actions:
        create: (has_association) ->
          console.log 'create!'
          has_association.save().then (record) =>
           @transitionToRoute 'has_associations.index'


$(document).ready ready
$(document).on 'page:load', ready
