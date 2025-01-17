class ParksController < ApplicationController
    wrap_parameters format: []
    # before_action :authorize
    require 'rest-client'
    require_relative "../../app/.nps_api_key.rb"

    def get_parks
        url = "https://developer.nps.gov/api/v1/parks?limit=5&api_key=#{$nps_api_key}"
        response = RestClient.get(url)
        render json: response
    end


    def index
        # byebug
        parks = render json: Park.all
    end


    def activities
        parks = Park.all.select { |park| park.activities.downcase.include? params[:activityQuery].downcase}
        render json: parks
        # byebug
    end

    def create
        park = Park.create!(park_params)
        render json: park, status: :created
    end

    def show
        id = params[:id]
        url_id = "https://developer.nps.gov/api/v1/parks?id=#{id}&api_key=#{$nps_api_key}"
        response = RestClient.get(url_id)
        # park = find_park
        if response
        render json: response, status: :ok
        else
        render json: {error: "Park Not Found"}, status: :not_found
        end
    end

    def update
        park = find_park
        if park
            park.update(park_params)
            render json: park, status: :accepted
        else
            render json: {error: "Park Not Found"}, status: :not_found
        end
    end

    def destroy
        park = find_park
        if park
            park.destroy
            head :no_content
        else
            render json: {error: "Park Not Found"}, status: :not_found
        end
    end

    
    private

    
    def park_params
        params.permit(:id, :full_name, :state, :description, :activities, :image, :url)
    end

    def find_park
        Park.find(params[:id])
    end

    def authorize
        return render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
          # if our session includes the right id then we'll send the right thing else we'll send the error
    end

end
