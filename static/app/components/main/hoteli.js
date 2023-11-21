export default {
  template: `
<div class="w-50 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <hotel-forma  v-bind:naslov="'Dodaj hotel'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createHotel"></hotel-forma>
</div>

<div class="w-75 p-3">
    <tabela-hotela v-bind:naslov="'Tabela hotela'" v-bind:hoteli="hoteli" v-on:uklanjanje="removeHotel" v-on:izmena="setHotelZaIzmenu"></tabela-hotela>
</div>

<button v-on:click="navigate('dodaj')" v-if="stranicaZaPrikaz!='dodaj'" type="button" class="btn btn-warning btn-lg btn-block m-3">Dodaj hotel</button>
    `,
  data() {
    return {
      hoteli: [],
      hotelZaIzmenu: {},
      stranicaZaPrikaz: "",
    };
  },
  methods: {
    setHotelZaIzmenu(hoteli) {
      this.$router.push(`/hoteli/${hoteli.id}`);
    },

    refreshHotel() {
      axios.get("api/hoteli").then((response) => {
        this.hoteli = response.data;
      });
    },

    createHotel(hoteli) {
      axios.post("api/hoteli", hoteli).then((response) => {
        this.refreshHotel();
      });
    },

    updateHotel(hoteli) {
      axios.put(`api/hoteli/${hoteli.id}`, hoteli).then((response) => {
        this.refreshHotel();
      });
    },

    removeHotel(id) {
      axios.delete(`api/hoteli/${id}`).then((response) => {
        this.refreshHotel();
      });
    },

    navigate(page) {
      this.stranicaZaPrikaz = page;
    },
  },
  created() {
    this.refreshHotel();
  },
};
