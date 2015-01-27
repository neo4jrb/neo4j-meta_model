module Neo4j
  module MetaModel
    module Meta
      class ModelsController < ApplicationController
        before_action :get_model, only: [:edit, :show, :update, :destroy]

        def index
          respond_to do |format|
            format.html { @hierarchy = Model.all.hierarchically }
            format.json { render json: Model.all }
          end
        end

        def hierarchy
          respond_to do |format|
            format.json { render json: Model.all.hierarchically }
          end
        end

        def show
          respond_to do |format|
            format.json do
              render json: @model
            end
          end
        end

        def edit
          @models = Model.all.order(:name)
        end

        def create
          model = Model.create(model_params)

          create_models

          render json: model
        end

        def update
          model_params.each do |key, value|
            @model.send("#{key}=", value)
          end
          @model.save

          create_models

          render json: @model
        end

        def destroy
          @model.destroy

          create_models

          render json: nil
        end

        private

        def get_model
          @model = if model_param_class_name
                     Model.where(class_name: model_param_class_name).first
                   end || Model.find(params[:id])
        end

        def model_param_class_name
          if params[:id]
            @model_param_class_name ||= params[:id].classify
          end
        rescue NameError
        end

        def model_params
          superclass_model = params[:model].delete(:superclass_model_id)
          id_property = params[:model].delete(:id_property_id)
          params.require(:model).permit(:class_name, :superclass_model).merge(superclass_model: superclass_model, id_property: id_property)
        end
      end
    end
  end

end
