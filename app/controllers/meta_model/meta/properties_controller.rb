module MetaModel
  module Meta
    class PropertiesController < ApplicationController
      before_action :get_property, only: [:edit, :show, :update, :destroy]

      def destroy
        @property.destroy

        render json: nil
      end

      def create
        property = Property.create(property_params)

        render json: property
      end

      def update
        @property.update_attributes(property_params)

        render json: @property
      end

      private

      def get_property
        @property = Property.find(params[:id])
      end

      def property_params
        model = params[:property].delete(:model_id)
        params.require(:property).permit(:name, :type).merge(model: model)
      end
    end
  end
end
