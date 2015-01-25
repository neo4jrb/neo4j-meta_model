module MetaModel
  module Meta
    class HasAssociationsController < ApplicationController
      before_action :get_has_association, only: [:edit, :show, :update, :destroy]

      def index
        render json: HasAssociation.all
      end

      def show
        respond_to do |format|
          format.json { render json: @has_association }
        end
      end

      def create
        has_association = HasAssociation.create(has_association_params)

        create_models

        render json: has_association
      end

      def destroy
        @has_association.destroy

        create_models

        render json: nil
      end


      private

      def get_has_association
        @has_association = HasAssociation.find(params[:id])
      end

      def has_association_params
        params.require(:has_association).permit(:join_type, :name, :opposite_name, :relationship_type, :from_model_id, :to_model_id)
      end
    end
  end
end
