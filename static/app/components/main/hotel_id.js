export default {
  template: `
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena hotela</b></p>

<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control aler alert-warning" v-model="hotel.naziv" required>
    <div class="form-text"><i>Izmeni naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Broj Zvezdica: </label>
    <input type="number" min="1" max="5" class="form-control aler alert-warning" v-model="hotel.broj_zvezdica" required>
    <div class="form-text"><i>Izmeni broj zvezdica</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Obrisan </label>
    <input type="number" min="0" max="1" class="form-control aler alert-warning" v-model="hotel.obrisan" required>
    <div class="form-text"><i>Izmeni status brisanja</i></div>
</div>

<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>

</form>
    `,
  data() {
    return {
      hotel: {},
    };
  },
  methods: {
    refresh() {
      axios.get(`api/hoteli/${this.$route.params["id"]}`).then((response) => {
        this.hotel = response.data;
      });
    },
    update() {
      axios
        .put(`api/hoteli/${this.$route.params["id"]}`, this.hotel)
        .then((response) => {
          this.$router.push("/hoteli");
        });
    },
  },

  created() {
    this.refresh();
  },
};
