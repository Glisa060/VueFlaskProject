export default {
  props: ["naslov", "rezervacije"],
  emits: ["izmena", "uklanjanje"],

  data() {
    return {
      currentSort: "",
      currentSortDir: "asc",
      pageSize: 5,
      currentPage: 1,
      filter: "",
    };
  },
  methods: {
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    nextPage: function () {
      if (this.currentPage * this.pageSize < this.filteredRezervacije.length)
        this.currentPage++;
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  watch: {
    filter() {
      this.currentPage = 1;
    },
  },
  computed: {
    filteredRezervacije() {
      return this.rezervacije.filter((rezervacije) => {
        if (this.filter == "") {
          return true;
        } else {
          return (
            rezervacije.hotel_id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            rezervacije.soba_id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            rezervacije.id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            rezervacije.turista_id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            rezervacije.naziv_rezervacije
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            rezervacije.datum_rezervacije
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            rezervacije.datum_kraja_rezervacije
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0
          );
        }
      });
    },
    sortedRezervacije() {
      return this.filteredRezervacije
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
  },
  template: `
<p><b>-{{naslov}}</b></p>

<form class="d-flex">
        <input class="form-control me-2" type="search" v-model="filter" placeholder="Unesite rec da pretrazite tabelu nazivu ili broju zvezdica" aria-label="Pretraga">
</form>

<table class="table table-success table-striped table-danger">
<thead>
    <tr>
        <th @click="sort('id')">ID</th>
        <th @click="sort('turista_id')">Turista ID</th>
        <th @click="sort('soba_id')">Turista ID</th>
        <th @click="sort('hotel_id')">Hotel ID</th>
        <th @click="sort('naziv_rezervacije')">Naziv Rezervacije</th>
        <th @click="sort('datum_rezervacije')">Datum Rezervacije</th>
        <th @click="sort('datum_kraja_rezervacije')">Datum Isteka Rezervacije</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="rezervacija in sortedRezervacije">
        <td>{{rezervacija.id}}</td>
        <td>{{rezervacija.turista_id}}</td>
        <td>{{rezervacija.soba_id}}</td>
        <td>{{rezervacija.hotel_id}}</td>
        <td>{{rezervacija.naziv_rezervacije}}</td>
        <td>{{rezervacija.datum_rezervacije}}</td>
        <td>{{rezervacija.datum_kraja_rezervacije}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', rezervacija.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...rezervacija})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `,
};
