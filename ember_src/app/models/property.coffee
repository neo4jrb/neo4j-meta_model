`import DS from 'ember-data'`

Property = DS.Model.extend
  name: DS.attr 'string'
  type: DS.attr 'string'
  model: DS.belongsTo 'Model', inverse: 'properties'

`export default Property`
