from os import urandom
import flask
from flask import Flask


from utils.db import mysql

from blueprints.login_blueprint import login_blueprint
from blueprints.logout_blueprint import logout_blueprint

from blueprints.korisnik_blueprint import korisnik_blueprint

from blueprints.turisti_blueprint import turista_blueprint
from blueprints.soba_blueprint import soba_blueprint
from blueprints.rezervacija_blueprint import rezervacija_blueprint
from blueprints.hotel_blueprint import hotel_blueprint


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "model"
app.secret_key = urandom(24)


app.register_blueprint(login_blueprint, url_prefix="/api/login")
app.register_blueprint(logout_blueprint, url_prefix="/api/logout")
app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

app.register_blueprint(turista_blueprint, url_prefix="/api/turisti")
app.register_blueprint(soba_blueprint, url_prefix="/api/sobe")
app.register_blueprint(rezervacija_blueprint, url_prefix="/api/rezervacije")
app.register_blueprint(hotel_blueprint, url_prefix="/api/hoteli")


mysql.init_app(app)


@app.route("/")
def home():
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run()
