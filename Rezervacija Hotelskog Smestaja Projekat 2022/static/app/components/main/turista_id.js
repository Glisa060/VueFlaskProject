export default {
  template: `
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena turiste</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control aler alert-danger" v-model="turista.ime" required>
    <div class="form-text"><i>Izmeni ime</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control aler alert-danger" v-model="turista.prezime" required>
    <div class="form-text"><i>Izmeni prezime</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum rođenja: </label>
    <input type="date" class="form-control aler alert-danger" v-model="turista.datum_rodjenja" required>
    <div class="form-text"><i>Izmeni datum rođenja</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Maticni broj: </label>
    <input type="text" minlength="13" maxlenght="13" size="13" class="form-control aler alert-danger" v-model="turista.maticni_broj" required>
    <div class="form-text"><i>Izmeni maticni broj</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Obrisan: </label>
    <input type="number" min="0" max="1" maxlenght="13" size="13" class="form-control aler alert-danger" v-model="turista.obrisan" required>
    <div class="form-text"><i>Izmeni maticni broj</i></div>
</div>

<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
  data() {
    return {
      turista: {},
    };
  },
  methods: {
    refresh() {
      axios.get(`api/turisti/${this.$route.params["id"]}`).then((response) => {
        response.data.datum_rodjenja = new Date(response.data.datum_rodjenja)
          .toISOString()
          .split("T")[0];
        this.turista = response.data;
      });
    },
    update() {
      axios
        .put(`api/turisti/${this.$route.params["id"]}`, this.turista)
        .then((response) => {
          this.$router.push("/turisti");
        });
    },
  },

  created() {
    this.refresh();
  },
};
