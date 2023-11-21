import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


turista_blueprint = Blueprint("turista_blueprint", __name__)


@turista_blueprint.route("")
def getAllTuriste():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM turista")
        turista = cursor.fetchall()
        return flask.jsonify(turista)
    return "", 401


@turista_blueprint.route("<int:turista_id>")
def getTurista(turista_id):
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM turista WHERE id=%s", (turista_id,))
        turista = cursor.fetchone()
        return flask.jsonify(turista), 200
    return "", 401


@turista_blueprint.route("", methods=["POST"])
def dodajTuristu():
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO turista(ime, prezime, email, lozinka, datum_rodjenja, maticni_broj) VALUES (%(ime)s, %(prezime)s, %(email)s, %(lozinka)s, %(datum_rodjenja)s, %(maticni_broj)s)",
            flask.request.json,
        )
        db.commit()
        return flask.request.json, 201
    return "", 401


@turista_blueprint.route("<int:turista_id>", methods=["DELETE"])
def ukloniTuristu(turista_id):
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE turista SET obrisan=1 WHERE id=%s", (turista_id,))
        db.commit()
        return "200"
    return "", 401


@turista_blueprint.route("<int:turista_id>", methods=["PUT"])
def izmeniTuristu(turista_id):
    if session.get("korisnik") is not None:
        turista = dict(flask.request.json)
        turista["turista_id"] = turista_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE turista SET ime=%(ime)s, prezime=%(prezime)s, datum_rodjenja=%(datum_rodjenja)s, maticni_broj=%(maticni_broj)s, obrisan=%(obrisan)s WHERE id=%(turista_id)s",
            turista,
        )
        db.commit()
        cursor.execute("SELECT * FROM turista WHERE id=%s", (turista_id,))
        turista = cursor.fetchone()
        return flask.jsonify(turista)
    return "", 401
