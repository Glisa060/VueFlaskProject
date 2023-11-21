export default {
  template: `
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena rezervacije</b></p>
<div class="mb-3">
    <label class="form-label">Hotel ID: </label>
    <select class="form-select aler alert-danger" v-model="rezervacije.hotel_id" required>
        <option v-for="hotel in hoteli" :value="hotel.id">{{hotel.naziv}}, {{hotel.broj_zvezdica}}</option>
    </select>
    <div class="form-text"><i>Izmeni hotel</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Soba ID: </label>
    <select class="form-select aler alert-danger" v-model="rezervacije.soba_id" required>
        <option v-for="soba in sobe" :value="soba.id">{{soba.tip_sobe}}, {{soba.broj_lezaja}}, {{soba.broj_sobe}}</option>
    </select>
    <div class="form-text"><i>Izaberi Sobu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Turista ID: </label>
    <select class="form-select aler alert-danger" v-model="rezervacije.turista_id" required>
        <option v-for="turista in turisti" :value="turista.id">{{turista.ime}}, {{turista.prezime}}, {{turista.datum_rodjenja}}, {{turista.maticni_broj}}</option>
    </select>
    <div class="form-text"><i>Izmeni turistu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Naziv rezervacije: </label>
    <input type="text" class="form-control aler alert-danger" v-model="rezervacije.naziv_rezervacije" required>
    <div class="form-text"><i>Izmeni naziv rezervacije</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum rezervacije: </label>
    <input type="date" class="form-control aler alert-danger" v-model="rezervacije.datum_rezervacije" required>
    <div class="form-text"><i>Izmeni datum rezervacije</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum isteka rezervacije: </label>
    <input type="date" class="form-control aler alert-danger" v-model="rezervacije.datum_kraja_rezervacije" required>
    <div class="form-text"><i>Izmeni datum rezervacije</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info" :load="isBefore(rezervacije.datum_rezervacije,rezervacije.datum_kraja_rezervacije)">Izmeni</button>
</div>
</form>
    `,
  data() {
    return {
      rezervacije: {},
      turisti: {},
      sobe: [],
      hoteli: [],
    };
  },
  methods: {
    refresh() {
      axios
        .get(`api/rezervacije/${this.$route.params["id"]}`)
        .then((response) => {
          response.data.datum_rezervacije = new Date(
            response.data.datum_rezervacije
          )
            .toISOString()
            .split("T")[0];
          response.data.datum_kraja_rezervacije = new Date(
            response.data.datum_kraja_rezervacije
          )
            .toISOString()
            .split("T")[0];
          this.rezervacije = response.data;
        });
      axios.get("api/sobe").then((response) => {
        this.sobe = response.data;
      });
      axios.get("api/turisti").then((response) => {
        this.turisti = response.data;
      });
      axios.get("api/hoteli").then((response) => {
        this.hoteli = response.data;
      });
    },
    update() {
      axios
        .put(`api/rezervacije/${this.$route.params["id"]}`, this.rezervacije)
        .then((response) => {
          this.$router.push("/rezervacije");
        });
    },
    isBefore(d1, d2) {
      if ((d1 && d2) != undefined) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        if (date1 < date2) {
          return;
        } else if (date1 > date2) {
          alert(
            "Datum isteka rezervacije ne sme biti stariji od datuma pocetka rezervacije"
          );
        }
      } else {
        return;
      }
    },
    log(item) {
      console.log(item);
    },
  },

  created() {
    this.refresh();
  },
};
