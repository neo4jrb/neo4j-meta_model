module MetaModel
  class ModelsController < MetaModel::ApplicationController
    before_action :get_model
    before_action :get_meta_model
    before_action :get_record, only: [:show, :edit, :update]

    layout 'layouts/meta_model'
    def meta_index
      @hierarchy = Model.order(:class_name).hierarchically
    end

    def index
      @records = @model.all.to_a
      respond_to do |format|
        format.html
        format.json { render json: @records, root: :records }
      end
    end

    def show
    end

    def edit
    end

    def update
      @record.update_attributes(params[:data])

      redirect_to action: :show
    end

    def new
      @record = @model.new
    end

    def create
      record = @model.create(params[:data])

      redirect_to action: :show, id: record.id
    end

    def destroy
      @record.destroy

      redirect_to action: :index, model: params[:model]
    end

    private

    def get_record
      @record = @model.find(params[:id])
    end

    def get_meta_model
      @meta_model = Model.where(class_name: model_param_class_name).first if model_param_class_name
    end

    def get_model
      @model = "MetaModel::#{model_param_class_name}".constantize if model_param_class_name
    end

    def model_param_class_name
      if params[:model]
        @model_param_class_name ||= params[:model].classify
      end
    end
  end

end
