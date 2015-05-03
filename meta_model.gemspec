$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "neo4j/meta_model/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "neo4j-meta_model"
  s.version     = Neo4j::MetaModel::VERSION
  s.authors     = ["Brian Underwood"]
  s.email       = ["public@brian-underwood.codes"]
  s.homepage    = "http://github.com/neo4jrb/neo4j-meta_model"
  s.summary     = "A Rails Engine to administer Neo4j models"
  s.description = "A Rails Engine to administer Neo4j models"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency 'rails', '~> 4.2.0'
  s.add_dependency 'neo4j', '~> 4.1.0'
  s.add_dependency 'slim-rails'
  s.add_dependency 'active_model_serializers', '0.9.1'
end
