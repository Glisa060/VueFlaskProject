import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


rezervacija_blueprint = Blueprint("rezervacija_blueprint", __name__)


@rezervacija_blueprint.route("")
def getAllrezervacija():
    if session.get("korisnik") or session.get("turista") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM rezervacija")
        rezervacija = cursor.fetchall()
        return flask.jsonify(rezervacija)
    return "", 401


@rezervacija_blueprint.route("<int:rezervacija_id>")
def getrezervacija(rezervacija_id):
    if session.get("korisnik") or session.get("turista") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM rezervacija WHERE id=%s", (rezervacija_id,))
        rezervacija = cursor.fetchone()
        return flask.jsonify(rezervacija)
    return "", 401


@rezervacija_blueprint.route("", methods=["POST"])
def dodajProdaju():
    if session.get("korisnik") or session.get("turista") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO rezervacija(hotel_id, soba_id, turista_id, naziv_rezervacije, datum_rezervacije, datum_kraja_rezervacije) VALUES (%(hotel_id)s, %(soba_id)s, %(turista_id)s, %(naziv_rezervacije)s, %(datum_rezervacije)s, %(datum_kraja_rezervacije)s)",
            flask.request.json,
        )
        db.commit()
        return flask.request.json, 201
    return "", 401


@rezervacija_blueprint.route("<int:rezervacija_id>", methods=["DELETE"])
def ukloniProdaju(rezervacija_id):
    if session.get("korisnik") or session.get("turista") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM rezervacija WHERE id=%s", (rezervacija_id,))
        db.commit()
        return "200"
    return "", 401


@rezervacija_blueprint.route("<int:rezervacija_id>", methods=["PUT"])
def izmeniProdaju(rezervacija_id):
    if session.get("korisnik") or session.get("turista") is not None:
        rezervacija = dict(flask.request.json)
        rezervacija["rezervacija_id"] = rezervacija_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE rezervacija SET hotel_id=%(hotel_id)s, turista_id=%(turista_id)s, datum_rezervacije=%(datum_rezervacije)s, naziv_rezervacije=%(naziv_rezervacije)s WHERE id=%(rezervacija_id)s",
            rezervacija,
        )
        db.commit()
        cursor.execute("SELECT * FROM rezervacija WHERE id=%s", (rezervacija_id,))
        rezervacija = cursor.fetchone()
        return flask.jsonify(rezervacija)
    return "", 401
