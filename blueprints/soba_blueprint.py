import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


soba_blueprint = Blueprint("soba_blueprint", __name__)


@soba_blueprint.route("")
def getAllsoba():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM soba")
    soba = cursor.fetchall()
    return flask.jsonify(soba), 200


@soba_blueprint.route("<int:soba_id>")
def getsoba(soba_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM soba WHERE id=%s", (soba_id,))
    soba = cursor.fetchone()
    return flask.jsonify(soba), 200


@soba_blueprint.route("", methods=["POST"])
def dodajsoba():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO soba(tip_sobe, broj_lezaja, broj_sobe) VALUES (%(tip_sobe)s, %(broj_lezaja)s, %(broj_sobe)s)",
        flask.request.json,
    )
    db.commit()
    return flask.request.json, 201


@soba_blueprint.route("<int:soba_id>", methods=["DELETE"])
def uklonisoba(soba_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE soba SET obrisan=1 WHERE id=%s", (soba_id,))
    db.commit()
    return "200"


@soba_blueprint.route("<int:soba_id>", methods=["PUT"])
def izmenisoba(soba_id):
    soba = dict(flask.request.json)
    soba["soba_id"] = soba_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "UPDATE soba SET tip_sobe=%(tip_sobe)s, broj_lezaja=%(broj_lezaja)s, broj_sobe=%(broj_sobe)s, obrisan=%(obrisan)s WHERE id=%(soba_id)s",
        soba,
    )
    db.commit()
    cursor.execute("SELECT * FROM soba WHERE id=%s", (soba_id,))
    soba = cursor.fetchone()
    return flask.jsonify(soba)
