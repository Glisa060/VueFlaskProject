import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


hotel_blueprint=Blueprint("hotel_blueprint", __name__)



@hotel_blueprint.route("")
def getAllHotel():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM hotel")
    hotel = cursor.fetchall()
    return flask.jsonify(hotel), 200
    

@hotel_blueprint.route("<int:hotel_id>")
def getHotel(hotel_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM hotel WHERE id=%s", (hotel_id,))
    hotel = cursor.fetchone()
    return flask.jsonify(hotel), 200

@hotel_blueprint.route("", methods=["POST"])
def dodajHotel():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO hotel(naziv, broj_zvezdica) VALUES (%(naziv)s, %(broj_zvezdica)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@hotel_blueprint.route("<int:hotel_id>", methods=["DELETE"])
def ukloniHotel(hotel_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE hotel SET obrisan=1 WHERE id=%s", (hotel_id, ))
    db.commit()
    return "200"

@hotel_blueprint.route("<int:hotel_id>", methods=["PUT"])
def izmeniHotel(hotel_id):
    hotel = dict(flask.request.json)
    hotel["hotel_id"] = hotel_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE hotel SET naziv=%(naziv)s, broj_zvezdica=%(broj_zvezdica)s, obrisan=%(obrisan)s  WHERE id=%(hotel_id)s", hotel)
    db.commit()
    cursor.execute("SELECT * FROM hotel WHERE id=%s", (hotel_id, ))
    hotel = cursor.fetchone()
    return flask.jsonify(hotel)
