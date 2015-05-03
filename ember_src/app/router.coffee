`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend()
  #location: config.locationType

map_fn = ->
  @route 'index', path: "/"
  console.log 'defined index'

  @resource 'models', path: '/models', ->
    @route 'hierarchy', path: "/"
    @route 'edit', path: "/:class_name/edit"

  @resource 'has_associations', ->
    @route 'index', path: '/'
    @route 'new', path: '/new'


`export default Router.map(map_fn);`
