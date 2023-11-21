export default {
  template: `
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena sobe</b></p>

<div class="mb-3">
    <label class="form-label">Tip sobe: </label>
    <input type="text" class="form-control aler alert-danger" v-model="sobe.tip_sobe" required>
    <div class="form-text"><i>Izmeni tip sobe</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Broj lezaja: </label>
    <input type="number" min="1" max="5" class="form-control aler alert-danger" v-model="sobe.broj_lezaja" required>
    <div class="form-text"><i>Izmeni broj lezaja</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Broj sobe: </label>
    <input type="number"  class="form-control aler alert-danger" v-model="sobe.broj_sobe" required>
    <div class="form-text"><i>Izmeni broj sobe</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Obrisan </label>
    <input type="number" min="0" max="1" class="form-control aler alert-danger" v-model="sobe.obrisan" required>
    <div class="form-text"><i>Izmeni status</i></div>
</div>

<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
  data() {
    return {
      sobe: {},
      hoteli: {},
    };
  },
  methods: {
    refresh() {
      axios.get(`api/sobe/${this.$route.params["id"]}`).then((response) => {
        this.sobe = response.data;
        console.log(this.sobe);
      });
      axios.get("api/hoteli").then((response) => {
        this.hoteli = response.data;
      });
    },
    update() {
      axios
        .put(`api/sobe/${this.$route.params["id"]}`, this.sobe)
        .then((response) => {
          this.$router.push("/sobe");
        });
    },
  },

  created() {
    this.refresh();
  },
};
