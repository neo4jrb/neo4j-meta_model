/* jshint ignore:start */

/* jshint ignore:end */

define('ember-src/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	var ApplicationAdapter;

	ApplicationAdapter = DS['default'].ActiveModelAdapter.extend();

	exports['default'] = ApplicationAdapter;

});
define('ember-src/adapters/has-association', ['exports', 'ember-src/adapters/meta-model'], function (exports, MetaModelAdapter) {

  'use strict';

  var HasAssociationAdapter;

  HasAssociationAdapter = MetaModelAdapter['default'].extend({
    buildURL: function(type, id, record) {
      var result;
      result = "/meta/has_associations";
      if (id) {
        result += "/" + id;
      }
      return mm_path(result);
    }
  });

  exports['default'] = HasAssociationAdapter;

});
define('ember-src/adapters/meta-model', ['exports', 'ember-src/adapters/application'], function (exports, ApplicationAdapter) {

  'use strict';

  var MetaModelAdapter;

  MetaModelAdapter = DS.RESTAdapter.extend({
    namespace: mm_path('meta').slice(1)
  });

  exports['default'] = MetaModelAdapter;

});
define('ember-src/adapters/model', ['exports', 'ember-src/adapters/meta-model'], function (exports, MetaModelAdapter) {

	'use strict';

	var ModelAdapter;

	ModelAdapter = MetaModelAdapter['default'].extend();

	exports['default'] = ModelAdapter;

});
define('ember-src/adapters/property', ['exports', 'ember-src/adapters/meta-model'], function (exports, MetaModelAdapter) {

	'use strict';

	var PropertyAdapter;

	PropertyAdapter = MetaModelAdapter['default'].extend();

	exports['default'] = PropertyAdapter;

});
define('ember-src/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-src/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var MetaModelApp;

  window.mm_path = function(path) {
    var base_path, p;
    base_path = meta_model_root_path;
    if (base_path.slice(-1) === '/') {
      base_path = base_path.slice(0, -1);
    }
    p = path;
    if (p[0] === '/') {
      p = p.slice(1);
    }
    return base_path + '/' + p;
  };

  $(function() {
    var token;
    token = $('meta[name="csrf-token"]').attr('content');
    return $.ajaxPrefilter(function(options, originalOptions, xhr) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
    });
  });

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  MetaModelApp = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default'],
    rootElement: "#ember-application"
  });

  loadInitializers['default'](MetaModelApp, config['default'].modulePrefix);

  exports['default'] = MetaModelApp;

});
define('ember-src/components/focus-input', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var FocusInputComponent;

  FocusInputComponent = Ember['default'].TextField.extend({
    becomeFocused: (function() {
      return this.$().focus();
    }).on('didInsertElement')
  });

  exports['default'] = FocusInputComponent;

});
define('ember-src/components/model-list-item', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ModelListItemComponent;

  ModelListItemComponent = Ember['default'].Component.extend({
    action: 'meta_model_clicked',
    actions: {
      clicked: function() {
        return this.sendAction('action', this.get('model'));
      },
      goto_metamodel: function(model) {
        return this.sendAction('action', model);
      }
    }
  });

  exports['default'] = ModelListItemComponent;

});
define('ember-src/components/model-list', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ModelListComponent;

  ModelListComponent = Ember['default'].Component.extend({
    action: 'goto_metamodel',
    actions: {
      meta_model_clicked: function(model) {
        return this.sendAction('action', model);
      }
    }
  });

  exports['default'] = ModelListComponent;

});
define('ember-src/controllers/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var ApplicationController;

	ApplicationController = Ember['default'].Controller.extend();

	exports['default'] = ApplicationController;

});
define('ember-src/controllers/models/hierarchy', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ModelsHierarchyController;

  ModelsHierarchyController = Ember['default'].Controller.extend({
    new_model_name: '',
    actions: {
      add_model: function() {
        return this.store.createRecord('model', {
          class_name: this.new_model_name
        }).save().then((function(_this) {
          return function(record) {
            console.log({
              queryParams: {
                class_name: record.get('class_name')
              }
            });
            return _this.transitionToRoute('models.edit', record.get('class_name'));
          };
        })(this));
      }
    }
  });

  exports['default'] = ModelsHierarchyController;

});
define('ember-src/initializers/app-version', ['exports', 'ember-src/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('ember-src/initializers/export-application-global', ['exports', 'ember', 'ember-src/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-src/meta_model', function () {

  'use strict';


  /*

  #= require_tree ./templates

  ready = ->
    if $('#ember-application').length
      ## for more details see: http://emberjs.com/guides/application/
       * window.MetaModelApp = Ember.Application.create(rootElement: '#ember-application')





  $(document).ready ready
  $(document).on 'page:load', ready
   */
  var mm_path;

  mm_path = function() {
    var base_path, p;
    base_path = meta_model_root_path;
    if (base_path.slice(-1) === '/') {
      base_path = base_path.slice(0, -1);
    }
    p = path;
    if (p[0] === '/') {
      p = p.slice(1);
    }
    return base_path + '/' + p;
  };

});
define('ember-src/models/has-association', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var HasAssociation;

  HasAssociation = DS['default'].Model.extend({
    join_type: DS['default'].attr('string'),
    name: DS['default'].attr('string'),
    opposite_name: DS['default'].attr('string'),
    relationship_type: DS['default'].attr('string'),
    from_model: DS['default'].belongsTo('Model', {
      async: true
    }),
    to_model: DS['default'].belongsTo('Model', {
      async: true
    }),
    source_join_type: (function() {
      var ref;
      return (ref = this.get('join_type')) != null ? ref.split('_to_')[0] : void 0;
    }).property('join_type'),
    destination_join_type: (function() {
      var ref;
      return (ref = this.get('join_type')) != null ? ref.split('_to_')[1] : void 0;
    }).property('join_type'),
    source_is_defined: (function() {
      return this.get('source_join_type') && this.get('from_model');
    }).property('source_join_type', 'from_model'),
    destination_is_defined: (function() {
      return this.get('destination_join_type') && this.get('to_model');
    }).property('destination_join_type', 'to_model'),
    models_are_defined: (function() {
      return this.get('from_model') && this.get('to_model');
    }).property('from_model', 'to_model'),
    standardize_name: (function() {
      return this.set('name', this.standardized_name(this.get('name')));
    }).observes('name'),
    standardize_opposite_name: (function() {
      return this.set('opposite_name', this.standardized_name(this.get('opposite_name')));
    }).observes('opposite_name'),
    standardized_name: function(name) {
      return name.replace(/^[\s0-9]/, '').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase();
    },
    standardize_relationship_type: (function() {
      return this.set('relationship_type', this.get('relationship_type').replace(/[^a-zA-Z0-9]+/g, '_'));
    }).observes('relationship_type')
  });

  exports['default'] = HasAssociation;

});
define('ember-src/models/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Model;

  Model = DS['default'].Model.extend({
    class_name: DS['default'].attr('string'),
    superclass_model: DS['default'].belongsTo('Model'),
    properties: DS['default'].hasMany('Property'),
    id_property: DS['default'].belongsTo('Property'),
    source_has_associations: DS['default'].hasMany('HasAssociation', {
      inverse: 'to_model'
    }),
    destination_has_associations: DS['default'].hasMany('HasAssociation', {
      inverse: 'from_model'
    })
  });

  exports['default'] = Model;

});
define('ember-src/models/property', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Property;

  Property = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    type: DS['default'].attr('string'),
    model: DS['default'].belongsTo('Model', {
      inverse: 'properties'
    })
  });

  exports['default'] = Property;

});
define('ember-src/router', ['exports', 'ember', 'ember-src/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router, map_fn;

  Router = Ember['default'].Router.extend();

  map_fn = function() {
    this.route('index', {
      path: "/"
    });
    console.log('defined index');
    this.resource('models', {
      path: '/models'
    }, function() {
      this.route('hierarchy', {
        path: "/"
      });
      return this.route('edit', {
        path: "/:class_name/edit"
      });
    });
    return this.resource('has_associations', function() {
      this.route('index', {
        path: '/'
      });
      return this.route('new', {
        path: '/new'
      });
    });
  };

  exports['default'] = Router.map(map_fn);;

});
define('ember-src/routes/has-associations/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var HasAssociationsIndexRoute;

  HasAssociationsIndexRoute = Ember['default'].Route.extend({
    model: function(params) {
      return this.store.find('has_association');
    },
    actions: {
      "delete": function(has_association) {
        return has_association.destroyRecord();
      }
    }
  });

  exports['default'] = HasAssociationsIndexRoute;

});
define('ember-src/routes/has-associations/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var HasAssociationsNewRoute;

  HasAssociationsNewRoute = Ember['default'].Route.extend({
    model: function(params) {
      return Ember['default'].RSVP.hash({
        has_association: this.store.createRecord('has_association'),
        models: this.store.find('model'),
        join_types: ['one_to_many', 'many_to_one', 'many_to_many']
      });
    },
    actions: {
      create: function(has_association) {
        return has_association.save().then((function(_this) {
          return function(record) {
            return _this.transitionTo('has_associations.index');
          };
        })(this));
      }
    }
  });

  exports['default'] = HasAssociationsNewRoute;

});
define('ember-src/routes/models/edit', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ModelsEditRoute;

  ModelsEditRoute = Ember['default'].Route.extend({
    model: function(params) {
      return Ember['default'].RSVP.hash({
        model: this.store.find('model', params.class_name),
        models: this.store.find('model'),
        property_types: ['String', 'DateTime']
      });
    },
    actions: {
      add_property: function(model) {
        var property;
        property = model.get('properties').createRecord({
          name: '',
          type: 'String',
          model_id: model.id
        });
        return property.save();
      },
      delete_property: function(property) {
        return property.destroyRecord();
      },
      save: function(model) {
        console.log(1);
        model.save();
        console.log(2);
        return model.get('properties').forEach(function(property) {
          console.log(3);
          if (property.get('isDirty')) {
            return property.save();
          }
        });
      },
      "delete": function(model) {
        return model.destroyRecord().then((function(_this) {
          return function() {
            return _this.transitionTo('models.hierarchy');
          };
        })(this));
      }
    }
  });

  exports['default'] = ModelsEditRoute;

});
define('ember-src/routes/models/hierarchy', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ModelsHierarchyRoute;

  ModelsHierarchyRoute = Ember['default'].Route.extend({
    model: function() {
      return $.getJSON(mm_path('/meta/models/hierarchy.json')).then(function(data) {
        return data.models;
      });
    },
    actions: {
      goto_metamodel: function(model) {
        return this.transitionTo('models.edit', model.class_name);
      }
    }
  });

  exports['default'] = ModelsHierarchyRoute;

});
define('ember-src/serializers/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	var ApplicationSerializer;

	ApplicationSerializer = DS['default'].ActiveModelSerializer.extend();

	exports['default'] = ApplicationSerializer;

});
define('ember-src/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/components/has-association-diagram', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row has-associations-row");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","relationship");
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","source-join-type");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","source-association-name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(":");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","destination-join-type");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","destination-association-name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2,"class","glyphicon glyphicon-triangle-right");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(element0,0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element1, [0]),0,0);
        var morph2 = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        var morph3 = dom.createMorphAt(element1,3,3);
        var morph4 = dom.createMorphAt(dom.childAt(element1, [4]),0,0);
        var morph5 = dom.createMorphAt(dom.childAt(element1, [5]),0,0);
        var morph6 = dom.createMorphAt(element0,3,3);
        var morph7 = dom.createMorphAt(element0,4,4);
        content(env, morph0, context, "has_association.from_model.class_name");
        content(env, morph1, context, "has_association.source_join_type");
        content(env, morph2, context, "has_association.name");
        content(env, morph3, context, "has_association.relationship_type");
        content(env, morph4, context, "has_association.destination_join_type");
        content(env, morph5, context, "has_association.opposite_name");
        content(env, morph6, context, "has_association.to_model.class_name");
        content(env, morph7, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/components/model-list-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","list-group-item");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, content = hooks.content, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(element0,0,0);
        var morph1 = dom.createMorphAt(element0,1,1);
        var morph2 = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, null);
        element(env, element0, context, "action", ["clicked"], {"on": "click"});
        content(env, morph0, context, "model.class_name");
        content(env, morph1, context, "model.level");
        inline(env, morph2, context, "model-list", [], {"node": get(env, context, "sub_hierarchy")});
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/components/model-list', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "model-list-item", [], {"model": get(env, context, "child.0"), "sub_hierarchy": get(env, context, "child.1")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","list-group");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        block(env, morph0, context, "each", [get(env, context, "node")], {"keyword": "child"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/has-associations/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("New Association");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("a");
            dom.setAttribute(el1,"class","btn btn-danger pull-right");
            var el2 = dom.createTextNode("DELETE");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, element = hooks.element;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element0 = dom.childAt(fragment, [0]);
            element(env, element0, context, "action", ["delete", get(env, context, "has_association")], {"on": "click"});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "has-association-diagram", [], {"has_association": get(env, context, "has_association")}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","has-association-list");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, get = hooks.get;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        block(env, morph0, context, "link-to", ["has_associations.new"], {"class": "btn btn-primary"}, child0, null);
        block(env, morph1, context, "each", [get(env, context, "model")], {"keyword": "has_association"}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/has-associations/new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","help-block");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" has ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("...");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element2 = dom.childAt(fragment, [0]);
          var morph0 = dom.createMorphAt(element2,0,0);
          var morph1 = dom.createMorphAt(element2,2,2);
          content(env, morph0, context, "model.has_association.from_model.class_name");
          content(env, morph1, context, "model.has_association.source_join_type");
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","help-block");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" has ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("...");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element1 = dom.childAt(fragment, [0]);
          var morph0 = dom.createMorphAt(element1,0,0);
          var morph1 = dom.createMorphAt(element1,2,2);
          content(env, morph0, context, "model.has_association.to_model.class_name");
          content(env, morph1, context, "model.has_association.destination_join_type");
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","help-block");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ... ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0]);
          var morph0 = dom.createMorphAt(element0,0,0);
          var morph1 = dom.createMorphAt(element0,2,2);
          content(env, morph0, context, "model.has_association.from_model.class_name");
          content(env, morph1, context, "model.has_association.to_model.class_name");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","well well-sm");
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Here you can define an association between two models.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("First choose the join type and the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("source and destination");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Then give names to the associations.  These should finish the sentence \"SOURCE/DESTINATION MODEL has one/many...\" (e.g. Person has many ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("comments");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" / Comment has one ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("person");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(")");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Lastly give a relationship type.  This should complete the sentence \"SOURCE MODEL ... DESTINATION MODEL\" (e.g. Person ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("wrote_comment");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Comment)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Rules");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("For name, opposite name, and relationship type spaces will be converted to underscores (_)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Name and opposite name cannot start with numbers and cannot be upper case");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","form-horizontal");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createElement("label");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-2 control-label");
        var el5 = dom.createTextNode("Join Type");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-4");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-6");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createElement("label");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-2 control-label");
        var el5 = dom.createTextNode("Source Model");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-10");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createElement("label");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-2 control-label");
        var el5 = dom.createTextNode("Destination Model");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-10");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createElement("label");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-2 control-label");
        var el5 = dom.createTextNode("Name");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-10");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createElement("label");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-2 control-label");
        var el5 = dom.createTextNode("Opposite Name");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-10");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createElement("label");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-2 control-label");
        var el5 = dom.createTextNode("Relationship Type");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-10");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","form-group");
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","btn btn-primary");
        var el3 = dom.createTextNode("Create Association");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element3 = dom.childAt(fragment, [1]);
        var element4 = dom.childAt(element3, [0, 0]);
        var element5 = dom.childAt(element3, [3, 0]);
        var element6 = dom.childAt(element3, [4, 0]);
        var element7 = dom.childAt(element3, [5, 0]);
        var element8 = dom.childAt(fragment, [2, 0]);
        var morph0 = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element4, [2]),0,0);
        var morph2 = dom.createMorphAt(dom.childAt(element3, [1, 0, 1]),0,0);
        var morph3 = dom.createMorphAt(dom.childAt(element3, [2, 0, 1]),0,0);
        var morph4 = dom.createMorphAt(dom.childAt(element5, [0]),1,1);
        var morph5 = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
        var morph6 = dom.createMorphAt(dom.childAt(element6, [0]),1,1);
        var morph7 = dom.createMorphAt(dom.childAt(element6, [1]),0,0);
        var morph8 = dom.createMorphAt(dom.childAt(element7, [0]),1,1);
        var morph9 = dom.createMorphAt(dom.childAt(element7, [1]),0,0);
        inline(env, morph0, context, "view", ["select"], {"content": get(env, context, "model.join_types"), "selectionBinding": "model.has_association.join_type", "prompt": "Please Select", "class": "form-control"});
        inline(env, morph1, context, "has-association-diagram", [], {"has_association": get(env, context, "model.has_association")});
        inline(env, morph2, context, "view", ["select"], {"content": get(env, context, "model.models"), "optionValuePath": "content.id", "optionLabelPath": "content.class_name", "selectionBinding": "model.has_association.from_model", "prompt": "Please Select", "class": "form-control"});
        inline(env, morph3, context, "view", ["select"], {"content": get(env, context, "model.models"), "optionValuePath": "content.id", "optionLabelPath": "content.class_name", "selectionBinding": "model.has_association.to_model", "prompt": "Please Select", "class": "form-control"});
        block(env, morph4, context, "if", [get(env, context, "model.has_association.source_is_defined")], {}, child0, null);
        inline(env, morph5, context, "input", [], {"valueBinding": "model.has_association.name", "class": "form-control"});
        block(env, morph6, context, "if", [get(env, context, "model.has_association.destination_is_defined")], {}, child1, null);
        inline(env, morph7, context, "input", [], {"valueBinding": "model.has_association.opposite_name", "class": "form-control"});
        block(env, morph8, context, "if", [get(env, context, "model.has_association.models_are_defined")], {}, child2, null);
        inline(env, morph9, context, "input", [], {"valueBinding": "model.has_association.relationship_type", "class": "form-control"});
        element(env, element8, context, "action", ["create", get(env, context, "model.has_association")], {"on": "click"});
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"class","list-group");
        var el2 = dom.createElement("li");
        dom.setAttribute(el2,"class","list-group-item");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        dom.setAttribute(el2,"class","list-group-item");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        inline(env, morph0, context, "link-to", ["Models", "models.hierarchy"], {});
        inline(env, morph1, context, "link-to", ["Associations", "has_associations.index"], {});
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/models/edit', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2,"class","glyphicon glyphicon-remove-circle close pull-right");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","col-sm-2 control-label");
          var el4 = dom.createTextNode("Name");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","col-sm-10");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","col-sm-2 control-label");
          var el4 = dom.createTextNode("Type");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","col-sm-10");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(element0, [0]);
          var morph0 = dom.createMorphAt(dom.childAt(element0, [1, 1]),0,0);
          var morph1 = dom.createMorphAt(dom.childAt(element0, [2, 1]),0,0);
          element(env, element0, context, "bind-attr", [], {"class": ":well :property :col-sm-6 property.isDirty:has-warning:"});
          element(env, element1, context, "action", ["delete_property", get(env, context, "property")], {"on": "click"});
          inline(env, morph0, context, "focus-input", [], {"valueBinding": "property.name", "class": "form-control"});
          inline(env, morph1, context, "view", ["select"], {"content": get(env, context, "property_types"), "valueBinding": "property.type", "class": "form-control"});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","form-group");
        var el2 = dom.createElement("label");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-sm-2 control-label");
        var el4 = dom.createTextNode("Class Name");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-sm-10");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","form-group");
        var el2 = dom.createElement("label");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-sm-2 control-label");
        var el4 = dom.createTextNode("Inherits from");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-sm-10");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","properties row");
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Properties ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"class","add btn btn-default");
        var el4 = dom.createTextNode("Add Property");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createElement("label");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-2 control-label");
        var el5 = dom.createTextNode("ID Property");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-sm-10");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","form-group");
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","btn btn-danger pull-right");
        var el3 = dom.createTextNode("DELETE!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","form-group");
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","btn btn-primary");
        var el3 = dom.createTextNode("Update");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline, get = hooks.get, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element2 = dom.childAt(fragment, [2]);
        var element3 = dom.childAt(element2, [0, 1]);
        var element4 = dom.childAt(fragment, [3, 0]);
        var element5 = dom.childAt(fragment, [4, 0]);
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 0, 1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [1, 0, 1]),0,0);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [1, 0, 1]),0,0);
        var morph3 = dom.createMorphAt(element2,2,2);
        inline(env, morph0, context, "input", [], {"valueBinding": "model.model.class_name", "class": "form-control"});
        inline(env, morph1, context, "view", ["select"], {"content": get(env, context, "model.models"), "optionValuePath": "content.id", "optionLabelPath": "content.class_name", "selectionBinding": "model.model.superclass_model", "class": "form-control"});
        element(env, element3, context, "action", ["add_property", get(env, context, "model.model")], {"on": "click"});
        inline(env, morph2, context, "view", ["select"], {"content": get(env, context, "model.model.properties"), "selectionBinding": "model.model.id_property", "optionValuePath": "content.id", "optionLabelPath": "content.name", "prompt": "Auto", "class": "form-control"});
        block(env, morph3, context, "each", [get(env, context, "model.model.properties")], {"keyword": "property"}, child0, null);
        element(env, element4, context, "action", ["delete", get(env, context, "model.model")], {"on": "click"});
        element(env, element5, context, "action", ["save", get(env, context, "model.model")], {"on": "click"});
        return fragment;
      }
    };
  }()));

});
define('ember-src/templates/models/hierarchy', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","well well-sm");
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Here you can create new models and edit existing models.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("To create a model, enter the model name in the box below and click the button");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("To edit a model, simply click on a model from the list");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-11");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"class","btn btn-default add-model-btn col-sm-1");
        var el3 = dom.createTextNode("+");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        inline(env, morph0, context, "input", [], {"value": get(env, context, "new_model_name"), "placeholder": "Model Name", "class": "form-control"});
        element(env, element1, context, "action", ["add_model"], {"on": "click"});
        inline(env, morph1, context, "model-list", [], {"node": get(env, context, "model"), "id": "model-list", "class": "nested-list-group"});
        return fragment;
      }
    };
  }()));

});
define('ember-src/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-src/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-src/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-src/tests/helpers/start-app', ['exports', 'ember', 'ember-src/app', 'ember-src/router', 'ember-src/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-src/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-src/tests/test-helper', ['ember-src/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-src/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('ember-src/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'ApplicationAdapter', {});

  ember_qunit.test('it exists', function(assert) {
    var adapter;
    adapter = this.subject();
    return assert.ok(adapter);
  });

});
define('ember-src/tests/unit/adapters/association-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:association', 'AssociationAdapter', {});

  ember_qunit.test('it exists', function(assert) {
    var adapter;
    adapter = this.subject();
    return assert.ok(adapter);
  });

});
define('ember-src/tests/unit/adapters/meta-model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:meta-model', 'MetaModelAdapter', {});

  ember_qunit.test('it exists', function(assert) {
    var adapter;
    adapter = this.subject();
    return assert.ok(adapter);
  });

});
define('ember-src/tests/unit/adapters/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:model', 'ModelAdapter', {});

  ember_qunit.test('it exists', function(assert) {
    var adapter;
    adapter = this.subject();
    return assert.ok(adapter);
  });

});
define('ember-src/tests/unit/adapters/property-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:property', 'PropertyAdapter', {});

  ember_qunit.test('it exists', function(assert) {
    var adapter;
    adapter = this.subject();
    return assert.ok(adapter);
  });

});
define('ember-src/tests/unit/components/focus-input-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('focus-input', {});

  ember_qunit.test('it renders', function(assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('ember-src/tests/unit/components/model-list-item-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('model-list-item', {});

  ember_qunit.test('it renders', function(assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('ember-src/tests/unit/components/model-list-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('model-list', {});

  ember_qunit.test('it renders', function(assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('ember-src/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  ember_qunit.test('it exists', function(assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('ember-src/tests/unit/controllers/models-edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:models-edit', {});

  ember_qunit.test('it exists', function(assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('ember-src/tests/unit/controllers/models-hierarchy-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:models-hierarchy', {});

  ember_qunit.test('it exists', function(assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('ember-src/tests/unit/controllers/models-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:models', {});

  ember_qunit.test('it exists', function(assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('ember-src/tests/unit/helpers/mm-path-test', ['ember-src/helpers/mm-path', 'qunit'], function (mm_path, qunit) {

  'use strict';

  qunit.module('MmPathHelper');

  qunit.test('it works', function(assert) {
    var result;
    result = mm_path.mmPath(42);
    return assert.ok(result);
  });

});
define('ember-src/tests/unit/models/has-association-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('has-association', {
    needs: []
  });

  ember_qunit.test('it exists', function(assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('ember-src/tests/unit/models/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('model', {
    needs: []
  });

  ember_qunit.test('it exists', function(assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('ember-src/tests/unit/models/property-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('property', {
    needs: []
  });

  ember_qunit.test('it exists', function(assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('ember-src/tests/unit/routes/has-association-index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:has-association-index', {});

  ember_qunit.test('it exists', function(assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('ember-src/tests/unit/routes/has-associations-new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:has-associations-new', {});

  ember_qunit.test('it exists', function(assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('ember-src/tests/unit/routes/models-edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:models-edit', {});

  ember_qunit.test('it exists', function(assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('ember-src/tests/unit/routes/models-hierarchy-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:models-hierarchy', {});

  ember_qunit.test('it exists', function(assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('ember-src/tests/unit/serializers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('serializer:application', {});

  ember_qunit.test('it exists', function(assert) {
    var serializer;
    serializer = this.subject();
    return assert.ok(serializer);
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-src/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"ember-src","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"ember-src","version":"0.0.0.4cf858b7"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"exportApplicationGlobal":true}};
});

if (runningTests) {
  require("ember-src/tests/test-helper");
} else {
  require("ember-src/app")["default"].create({"name":"ember-src","version":"0.0.0.4cf858b7"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-src.map