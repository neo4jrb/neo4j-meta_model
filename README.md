= Neo4j MetaModel

`neo4j-meta_model` is a [Rails engine](http://guides.rubyonrails.org/engines.html) for providing a web user interface for easily managing neo4j databases.  It can be included in your Rails app or used independently via the [neo4j-meta_model-app](http://github.com/neo4jrb/neo4j-meta_model-app) application.
 
== Concepts

The [neo4j gem](http://github.com/neo4jrb/neo4j) is used behind the scenes, and so the concepts of **Models** and **Associations** are exposed directly in `neo4j-meta_model`

 * **Models** Models correspond to Neo4j [Labels](http://neo4j.com/docs/stable/graphdb-neo4j-labels.html).  Models define which properties which we are concerned with as well as validations and business logic. Models also support [inheritance](https://github.com/neo4jrb/neo4j/wiki/Neo4j.rb-v3-Inheritance).  Currently `neo4j-meta_model` supports properties and inheritance but not validation or custom business logic.
 * **Associations** Associations specify which nodes are related to a node under consideration.  For example, if there are `Person` and `Article` models with a `WROTE_ARTICLE` relationship between them, one might define an `articles` association for the `Person` model and an `author` association for the `Article` model, both of which use the `WROTE_ARTICLE` relationship.  In `neo4j-meta_model`, both associations are always defined at the same time.

== Interface

`neo4j-meta_model` has two main sections: one for managing your domain model, and one for editing records in the domain model.

=== Domain Model Management (Admin)

==== Models

Models can be added by going to the section for *Models* and entering a new name for your model.  Once a model has been added, click it in the list to edit.

When editing models, you can define if the model inherits properties from other models and what properties the model has.  Properties are the slots where data is stored in records for those models.  The *ID Property* is a property which is unique across all records in the model.  If you do not choose an ID Property, a `uuid` property will be created automatically.

==== Associations

In `neo4j-meta_model`, opposite pair associations are always defined at the same time.  The following diagram is used in a couple of places to describe associations.  

![Association Diagram](http://blog.brian-underwood.codes/assets/neo4j-meta_model/association_diagram.png)

In this case it indicates a many-to-many relationship where:

 * the `Person` model has a `gists` association
 * the `Gist` model has a `writers` association
 * the `WRITER_OF` relationship type is used to query the associations


== Installation

`Gemfile`

    gem 'neo4j-meta_model', require: 'neo4j/meta_model'

In your environment (`config/application.rb` or `config/environments/development.rb` for example)

    config.neo4j.session_type = :server_db 
    config.neo4j.session_path = 'http://localhost:7474'

`config/routes.rb`

    mount Neo4j::MetaModel::Engine => "/mount/path"


This project rocks and uses MIT-LICENSE.
