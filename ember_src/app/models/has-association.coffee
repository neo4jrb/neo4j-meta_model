`import DS from 'ember-data'`

HasAssociation = DS.Model.extend
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


  standardize_name: (->
    @set 'name', @standardized_name @get('name')
  ).observes('name')

  standardize_opposite_name: (->
    @set 'opposite_name', @standardized_name @get('opposite_name')
  ).observes('opposite_name')

  standardized_name: (name) ->
    name.replace(/^[\s0-9]/, '').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase()

  standardize_relationship_type: (->
    @set 'relationship_type', @get('relationship_type').replace(/[^a-zA-Z0-9]+/g, '_')
  ).observes('relationship_type')

`export default HasAssociation`
