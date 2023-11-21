export default {
  template: `

<div class="w-50 p-3">
    <korisnik-form v-on:sacuvaj="createKorisnik"  v-bind:naslov="'Dodaj korisnika'" v-bind:dugme="'Registruj se'"></korisnik-form>
</div>


<div class="w-75 p-3" >
    <tabela-korisnika v-bind:naslov="'Tabela korisnika'" v-on:uklanjanje="removeKorisnik" v-bind:korisnici="korisnici" v-on:izmena="setKorisnikZaIzmenu"></tabela-korisnika>
</div>

    `,
  data() {
    return {
      korisnici: [],
      korisnikZaIzmenu: {},
      stranicaZaPrikaz: "",
    };
  },
  methods: {
    setKorisnikZaIzmenu(korisnik) {
      this.$router.push(`/korisnici/${korisnik.id}`);
    },

    refreshKorisnik() {
      axios
        .get("api/korisnici")
        .then((response) => {
          this.korisnici = response.data;
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    createKorisnik(korisnik) {
      axios
        .post("api/korisnici", korisnik)
        .then((response) => {
          this.refreshKorisnik();
          this.$router.push("/korisnici");
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
          }
        });
    },

    updateKorisnik(korisnik) {
      axios
        .put(`api/korisnici/${korisnik.id}`, korisnik)
        .then((response) => {
          this.refreshKorisnik();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    removeKorisnik(id) {
      axios
        .delete(`api/korisnici/${id}`)
        .then((response) => {
          this.refreshKorisnik();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },
  },
  created() {
    this.refreshKorisnik();
  },
};
