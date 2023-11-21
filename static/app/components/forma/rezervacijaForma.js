export default {
  props: ["dugme", "naslov", "hoteli", "turisti", "sobe"],
  emits: ["sacuvaj"],

  data() {
    return {
      novaRezervacija: [],
    };
  },

  computed: {
    Hoteli() {
      return this.hoteli.filter((hotel) => hotel["obrisan"] === 0);
    },

    Sobe() {
      return this.sobe.filter((soba) => soba["obrisan"] === 0);
    },
    Turisti() {
      return this.turisti.filter((turista) => turista["obrisan"] === 0);
    },
  },

  methods: {
    isBefore(d1, d2) {
      if ((d1 && d2) === undefined) {
        return;
      } else if (d1 < d2) {
        return;
      } else if (d1 > d2) {
        alert(
          "Datum isteka rezervacije ne sme biti stariji od datuma pocetka rezervacije"
        );
      }
    },
  },

  watch: {
    rezervacija: function (newValue, oldValue) {
      this.novaRezervacija = { ...this.rezervacija };
    },
  },
  template: `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaRezervacija})" class="w-85 p-3 container fade-in bg-image"
style="
background-image: url('./pictures/rezervacija.jpg');
height: auto;
">

<p id="naslov"><b>-{{naslov}}</b></p>

<div class="mb-3">
    <label class="form-label">Hotel ID: </label>
    <select class="form-select aler alert-danger" v-model="novaRezervacija.hotel_id" required>
    <option  v-for="hotel in Hoteli" :value="hotel.id" >{{hotel.naziv}}, {{hotel.broj_zvezdica}}</option>
    </select>
    <div class="form-text"><i>Izaberi hotel</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Soba ID: </label>
    <select class="form-select aler alert-danger" v-model="novaRezervacija.soba_id" required>
        <option v-for="soba in Sobe" :value="soba.id">{{soba.tip_sobe}}, {{soba.broj_lezaja}}, {{soba.broj_sobe}}</option>
    </select>
    <div class="form-text"><i>Izaberi Sobu</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Turista ID: </label>
    <select class="form-select aler alert-danger" v-model="novaRezervacija.turista_id" required>
        <option v-for="turista in Turisti" :value="turista.id">{{turista.ime}}, {{turista.prezime}}, {{turista.datum_rodjenja}}, {{turista.maticni_broj}}</option>
    </select>
    <div class="form-text"><i>Izaberi turistu</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Naziv rezervacije: </label>
    <input type="text" class="form-control aler alert-danger" v-model="novaRezervacija.naziv_rezervacije" required>
    <div class="form-text"><i>Uneti naziv rezervacije</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum rezervacije: </label>
    <input type="date" class="form-control aler alert-primary" v-model="novaRezervacija.datum_rezervacije" required>
    <div class="form-text"><i>Uneti datum rođenja</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum isteka rezervacije: </label>
    <input type="date" class="form-control aler alert-primary" v-model="novaRezervacija.datum_kraja_rezervacije" required>
    <div class="form-text"><i>Uneti datum isteka rezervacije</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success" :load="isBefore(novaRezervacija.datum_rezervacije,novaRezervacija.datum_kraja_rezervacije)">{{dugme}}</button>
</div>

</form>
    `,
};
