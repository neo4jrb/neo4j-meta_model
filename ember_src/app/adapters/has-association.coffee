`import MetaModelAdapter from './meta-model'`

HasAssociationAdapter = MetaModelAdapter.extend
  buildURL: (type, id, record) ->
    result = "/meta/has_associations"
    result += "/#{id}" if id
    mm_path result


`export default HasAssociationAdapter`
