class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        current_user = User.find(session[:user_id])
        render json: current_user, status: :ok
    end

    # def show
    #     user = find_user
    #     render json: user, status: :ok
    # end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = find_user
        user.update(user_params)
        render json: user, status: :ok
    end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :avatar, :hometown, :birthdate, :email)
    end

end
