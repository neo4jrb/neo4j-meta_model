`import ApplicationAdapter from './application'`

MetaModelAdapter = DS.RESTAdapter.extend
  namespace: mm_path('meta')[1..-1]

`export default MetaModelAdapter`
