export default {
  template: `
<div class="w-75 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <soba-forma v-bind:naslov="'Dodaj sobu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createsoba"></soba-forma>
</div>

<div class="w-75 p-3">
    <tabela-soba v-bind:naslov="'Tabela Soba'" v-bind:sobe="sobe" v-on:uklanjanje="removeSobu" v-on:izmena="setSobuZaIzmenu"></tabela-soba>
</div>

 <button v-on:click="navigate('dodaj')" v-if="stranicaZaPrikaz!='dodaj'" type="button" class="btn btn-outline-dark btn-lg btn-block m-3">Dodaj sobu</button>

`,
  data() {
    return {
      sobe: [],
      sobaZaIzmenu: {},

      stranicaZaPrikaz: "",
    };
  },
  methods: {
    setSobuZaIzmenu(soba) {
      this.$router.push(`/sobe/${soba.id}`);
    },

    refreshsoba() {
      axios.get("api/sobe").then((response) => {
        this.sobe = response.data;
      });
    },

    createsoba(soba) {
      axios.post("api/sobe", soba).then((response) => {
        this.refreshsoba();
      });
    },

    updatesoba(soba) {
      axios.put(`api/sobe/${soba.id}`, soba).then((response) => {
        this.refreshsoba();
      });
    },

    removeSobu(id) {
      axios.delete(`api/sobe/${id}`).then((response) => {
        this.refreshsoba();
      });
    },

    navigate(page) {
      this.stranicaZaPrikaz = page;
    },
  },
  created() {
    this.refreshsoba();
  },
};
