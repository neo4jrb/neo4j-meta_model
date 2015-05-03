###

#= require_tree ./templates

ready = ->
  if $('#ember-application').length
    ## for more details see: http://emberjs.com/guides/application/
    # window.MetaModelApp = Ember.Application.create(rootElement: '#ember-application')





$(document).ready ready
$(document).on 'page:load', ready
###

mm_path = () ->
  base_path = meta_model_root_path

  base_path = base_path[0..-2] if base_path[-1..-1] is '/'

  p = path
  p = p[1..-1] if p[0] is '/'

  base_path + '/' + p
