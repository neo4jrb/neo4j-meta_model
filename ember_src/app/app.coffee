`import Ember from 'ember'`
`import Resolver from 'ember/resolver'`
`import loadInitializers from 'ember/load-initializers'`
`import config from './config/environment'`

#= require lodash
#= require jquery
#= require jquery_ujs
  
#= require sightglass
#= require rivets
#= require backbone
#= require rivets-backbone


window.mm_path = (path) ->
  base_path = meta_model_root_path

  base_path = base_path[0..-2] if base_path[-1..-1] is '/'

  p = path
  p = p[1..-1] if p[0] is '/'

  base_path + '/' + p

# Send csrf-token on XHR calls
# From: http://discuss.emberjs.com/t/rails-cant-verify-csrf-token-authenticity-with-ember-data/4110/5
$(->
  token = $('meta[name="csrf-token"]').attr('content')
  $.ajaxPrefilter((options, originalOptions, xhr)->
    xhr.setRequestHeader('X-CSRF-Token', token)
  )
)

Ember.MODEL_FACTORY_INJECTIONS = true

MetaModelApp = Ember.Application.extend
  modulePrefix: config.modulePrefix
  podModulePrefix: config.podModulePrefix
  Resolver: Resolver
  rootElement: "#ember-application"


loadInitializers MetaModelApp, config.modulePrefix

`export default MetaModelApp`
