`import MetaModelAdapter from './meta-model'`

AssociationAdapter = MetaModelAdapter.extend
  buildURL: (type, id, record) ->
    result = "/meta/has_associations"
    result += "/#{id}" if id
    mm_path result


`export default AssociationAdapter`
