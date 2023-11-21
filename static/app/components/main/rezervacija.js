export default {
  template: `
    <div class="w-50 p-3" v-if="stranicaZaPrikaz=='dodaj'">
        <rezervacija-forma v-bind:naslov="'Dodaj rezervaciju'" v-bind:dugme="'Dodaj'" v-bind:sobe="sobe" v-bind:turisti="turisti" v-bind:hoteli="hoteli" v-on:sacuvaj="createRezervacija"></rezervacija-forma>
    </div>

    <div class="w-75 p-3">
        <tabela-rezervacije v-bind:naslov="'Tabela rezervacije'" v-bind:rezervacije="rezervacije" v-on:uklanjanje="removeRezervacija" v-on:izmena="setRezervacijaZaIzmenu"></tabela-rezervacije>
    </div>
    
    <button v-on:click="navigate('dodaj')" v-if="stranicaZaPrikaz!='dodaj'" type="button" class="btn btn-outline-danger btn-lg btn-block m-3">Dodaj rezervaciju</button>
`,
  data() {
    return {
      turisti: [],
      sobe: [],
      rezervacije: [],
      hoteli: [],
      rezervacijaZaIzmenu: {},

      stranicaZaPrikaz: "",
    };
  },
  methods: {
    setRezervacijaZaIzmenu(rezervacija) {
      this.$router.push(`/rezervacije/${rezervacija.id}`);
    },

    refreshRezervacija() {
      axios
        .get("api/rezervacije")
        .then((response) => {
          for (let d of response.data) {
            d.datum_rezervacije = new Date(d.datum_rezervacije)
              .toLocaleDateString()
              .split("Z")[0];
            d.datum_kraja_rezervacije = new Date(d.datum_kraja_rezervacije)
              .toLocaleDateString()
              .split("Z")[0];
          }
          this.rezervacije = response.data;
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
      axios.get("api/sobe").then((response) => {
        this.sobe = response.data;
      });
      axios
        .get("api/turisti")
        .then((response) => {
          this.turisti = response.data;
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
      axios.get("api/hoteli").then((response) => {
        this.hoteli = response.data;
      });
    },

    createRezervacija(rezervacija) {
      axios
        .post("api/rezervacije", rezervacija)
        .then((response) => {
          this.refreshRezervacija();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    updateRezervacija(rezervacija) {
      axios
        .put(`api/rezervacije/${rezervacija.id}`, rezervacija)
        .then((response) => {
          this.refreshRezervacija();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/";
            alert("Nemate privilegije da pristupite! Ulogujte se");
          }
        });
    },

    removeRezervacija(id) {
      axios
        .delete(`api/rezervacije/${id}`)
        .then((response) => {
          this.refreshRezervacija();
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
    this.refreshRezervacija();
  },
};
