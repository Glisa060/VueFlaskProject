export default {
  template: `
<div class="w-75 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <turista-forma v-bind:naslov="'Dodaj turistu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createTurista"></turista-forma>
</div>

<div class="w-75 p-3">
    <tabela-turista v-bind:naslov="'Tabela turista'" v-on:uklanjanje="removeTurista"  v-bind:turisti="turisti" v-on:izmena="setTuristaZaIzmenu"></tabela-turista>
</div>

<button v-if="navigate('turisti')" v-if="stranicaZaPrikaz!='dodaj'" v-on:click="navigate('dodaj')" type="button" class="btn btn-warning btn-lg btn-block m-3">Dodaj turistu</button>
 `,
  data() {
    return {
      turisti: [],
      stranicaZaPrikaz: "",
    };
  },
  methods: {
    setTuristaZaIzmenu(turista) {
      this.$router.push(`/turisti/${turista.id}`);
    },

    refreshTurista() {
      axios
        .get("api/turisti")
        .then((response) => {
          for (let d of response.data) {
            d.datum_rodjenja = new Date(d.datum_rodjenja)
              .toDateString()
              .split("Z")[0];
          }
          this.turisti = response.data;
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });

      axios
        .get("api/korisnici")
        .then((response) => {
          this.korsisnici = response.data;
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    createTurista(turista) {
      axios
        .post("api/turisti", turista)
        .then((response) => {
          this.refreshTurista();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    updateTurista(turista) {
      axios
        .put(`api/turisti/${turista.id}`, turista)
        .then((response) => {
          this.refreshTurista();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    removeTurista(id) {
      axios
        .delete(`api/turisti/${id}`)
        .then((response) => {
          this.refreshTurista();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    navigate(page) {
      this.stranicaZaPrikaz = page;
    },
  },
  created() {
    this.refreshTurista();
  },
};
