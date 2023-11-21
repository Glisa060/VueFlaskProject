import flask
from flask import Blueprint
from flask import session


from utils.db import mysql


logout_blueprint = Blueprint("logout_blueprint", __name__)


@logout_blueprint.route("", methods=["GET"])
def logout():
    session.clear()
    return "", 200
