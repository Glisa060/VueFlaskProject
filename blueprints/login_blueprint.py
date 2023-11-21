import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


login_blueprint = Blueprint("login_blueprint", __name__)


@login_blueprint.route("", methods=["POST"])
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute(
        "SELECT * FROM korisnik WHERE email=%(email)s AND lozinka=%(lozinka)s",
        flask.request.json,
    )
    korisnik = cursor.fetchone()
    if korisnik is not None:
        cursor.execute(
            "SELECT * FROM turista WHERE email=%(email)s AND lozinka=%(lozinka)s",
            flask.request.json,
        )
        turista = cursor.fetchone()
        if turista is not None:
            session["turista"] = turista["email"]
        session["korisnik"] = korisnik["email"]
        return "", 200
    return "", 403
