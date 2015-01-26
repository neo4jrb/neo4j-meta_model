module Neo4j
  module MetaModel
    module ApplicationHelper
      def action_and_controller_javascript_include_tag
        capture do
          concat javascript_include_tag controller_path if Rails.root.join("app/assets/javascripts/#{controller_path}.js.coffee").exist?
          concat javascript_include_tag "#{controller_path}/#{action_name}" if Rails.root.join("app/assets/javascripts/#{controller_path}/#{action_name}.js.coffee").exist?
        end
      end
    end
  end
end
