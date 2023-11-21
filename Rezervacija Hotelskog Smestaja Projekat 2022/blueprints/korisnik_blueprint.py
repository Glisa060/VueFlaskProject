import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


korisnik_blueprint = Blueprint("korisnik_blueprint", __name__)


@korisnik_blueprint.route("")
def getAllKorisnici():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korisnik")
        korisnik = cursor.fetchall()
        return flask.jsonify(korisnik)
    return "", 401


@korisnik_blueprint.route("<int:korisnik_id>")
def getKorisnik(korisnik_id):
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
        korisnik = cursor.fetchone()
        return flask.jsonify(korisnik)
    return "", 404


@korisnik_blueprint.route("", methods=["POST"])
def dodajKorisnika():
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO korisnik(email, lozinka) VALUES (%(email)s, %(lozinka)s)",
            flask.request.json,
        )
        db.commit()
        return flask.request.json, 201
    return "", 401


@korisnik_blueprint.route("<int:korisnik_id>", methods=["DELETE"])
def ukloniKorisnika(korisnik_id):
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM korisnik WHERE id=%s", (korisnik_id,))
        db.commit()
        return "", 200
    return "", 401


@korisnik_blueprint.route("<int:korisnik_id>", methods=["PUT"])
def izmeniKorisnika(korisnik_id):
    if session.get("korisnik") is not None:
        korisnik = dict(flask.request.json)
        korisnik["korisnik_id"] = korisnik_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE korisnik SET email=%(email)s, lozinka=%(lozinka)s WHERE id=%(korisnik_id)s",
            korisnik,
        )
        db.commit()
        cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
        korisnik = cursor.fetchone()
        return flask.jsonify(korisnik)
    return "", 401


###Metoda za pretragu-Vezba
# @korisnik_trazi.route("", methods=['POST'])
# def trazi():
#     korisnik = dict(flask.request.json)
#     users = []
#     with mysql.get_db().cursor() as cursor:
#         sql = "SELECT * FROM users WHERE email LIKE %s"
#         cursor.execute(sql, ('%'+korisnik['email']+'%', ))
#         for el in cursor.fetchall():
#             el['spojeno'] = el['email']+'====='+el['password']
#             users.append(el)
#         return flask.request.json, 201
