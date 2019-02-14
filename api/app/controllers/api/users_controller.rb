class Api::UsersController < ApplicationController
  before_action :authenticate_user, only: [:current]

  def current
    render json: current_user.as_json(only: %i(id email))
  end

  def all
  	    render json: User.select(:id, :email, :latitude , :longitude)
  end
end
