begin
  require 'bundler/setup'
rescue LoadError
  puts 'You must `gem install bundler` and `bundle install` to run rake tasks'
end

require 'rdoc/task'

RDoc::Task.new(:rdoc) do |rdoc|
  rdoc.rdoc_dir = 'rdoc'
  rdoc.title    = 'MetaModel'
  rdoc.options << '--line-numbers'
  rdoc.rdoc_files.include('README.rdoc')
  rdoc.rdoc_files.include('lib/**/*.rb')
end

APP_RAKEFILE = File.expand_path("../test/dummy/Rakefile", __FILE__)
load 'rails/tasks/engine.rake'


load 'rails/tasks/statistics.rake'



Bundler::GemHelper.install_tasks

require 'rake/testtask'

Rake::TestTask.new(:test) do |t|
  t.libs << 'lib'
  t.libs << 'test'
  t.pattern = 'test/**/*_test.rb'
  t.verbose = false
end

namespace :ember do
  task :build do
    `cd ember_src && ember build`
    `mkdir -p app/assets/javascripts/meta_model`
    `cp ember_src/dist/assets/ember-src.js app/assets/javascripts/meta_model/app.js`
    `cp ember_src/dist/assets/ember-src.map app/assets/javascripts/meta_model/ember-src.map`

    `cp ember_src/dist/assets/vendor.js    app/assets/javascripts/meta_model/vendor.js`
    `cp ember_src/dist/assets/vendor.map    app/assets/javascripts/meta_model/vendor.map`
  end
end


task default: :test
