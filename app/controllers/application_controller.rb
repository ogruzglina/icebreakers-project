class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response

  private
  def not_found_response(error)
      render json: {error: "#{error.model} not found"}, status: :not_found
  end

  def unprocessable_entity_response
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

end
