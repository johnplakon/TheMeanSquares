##################################################
# Import dependencies
##################################################
import os

import pandas as pd
import numpy as np
from config import password

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################
engine = create_engine('postgresql+psycopg2://postgres:'+ password + '@localhost:5432/videogames_db')
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Games = Base.classes.games

session = Session(engine)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/games")
def games():
    """Return a list of games"""
    
    # Use Pandas to perform the sql query
    stmt = db.session.query(Games).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    

    # Return a list of the column names (game names)
    return jsonify(list(df.columns) [1:])


if __name__ == "__main__":
    app.run()
