`import DS from 'ember-data'`

Model = DS.Model.extend
  class_name: DS.attr 'string'
  superclass_model: DS.belongsTo 'Model'
  #superclass_model: DS.attr 'string'
  properties: DS.hasMany 'Property'
  id_property: DS.belongsTo 'Property'
  source_has_associations: DS.hasMany 'HasAssociation', inverse: 'to_model'
  destination_has_associations: DS.hasMany 'HasAssociation', inverse: 'from_model'

`export default Model`
