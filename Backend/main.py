from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get-user/<user_id>")
def get_user(user_id):
  
  params = user_id.split('-')

  import pandas as pd
  import pickle


  # Load the model from the .pkl file
  with open('model-1-3-2.sav', 'rb') as file:
      loaded_model = pickle.load(file)


  # Create a DataFrame with the new data in the same format as the training data
  new_data = pd.DataFrame([params], columns=['bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors', 'waterfront', 'view', 'condition', 'condition', 'condition', 'condition', 'condition', 'condition', 'condition', 'condition'])

  # Make predictions using the loaded model
  prediction = loaded_model.predict(new_data)

  if prediction[0] == 0:
    prediciton_text = "Home Maintenance Enthusiasts"
    description = "This cluster includes individuals with high incomes, advanced education, and no children or teenagers at home. They are likely to be interested in home maintenance services such as cleaning, plumbing, electrical work, car washes, and general home upkeep."

  elif prediction[0] == 1:
    prediciton_text = "Family-Centric Homeowners"
    description = "This cluster represents individuals with moderate incomes, advanced education, and a family-oriented lifestyle with children and teenagers at home. They may have a need for services related to family life and home maintenance, such as childcare, home cleaning, and general home repairs."

  elif prediction[0] == 2:
    prediciton_text = "Active & Independent Residents"
    description = "This cluster comprises individuals with high incomes, advanced education, and an independent lifestyle. They may be interested in various home services, including house cleaning, landscaping, and home security."

  elif prediction[0] == 3:
    prediciton_text = "Young & Energetic Urban Dwellers"
    description = "This cluster includes individuals with moderate incomes, advanced education, and a dynamic urban lifestyle. They may require services such as apartment cleaning, handyman repairs, and pet care, along with general home maintenance."

  elif prediction[0] == 4:
    prediciton_text = "Family-Centric Budgeters"
    description = "This cluster consists of individuals with moderate incomes, advanced education, and families with children. They might be interested in cost-effective home services like childcare, house cleaning, home maintenance, and general household support."

  elif prediction[0] == 5:
    prediciton_text = "Elite & Well-Established Homeowners"
    description = "This cluster represents individuals with high incomes, advanced education, and a well-established lifestyle. They could benefit from high-end home services, including home renovations, premium home security, and exclusive property upkeep."

  data = {
    "prediction" : prediciton_text,
    "description" : description,
  }
  
  datajson = jsonify(data) # .headers.add('Access-Control-Allow-Origin', '*')
  return datajson, 200


if __name__ == "__main__":
  app.run(debug=True)