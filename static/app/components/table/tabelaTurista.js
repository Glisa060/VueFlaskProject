export default {
  props: ["naslov", "turisti"],
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
      if (this.currentPage * this.pageSize < this.filteredTuristi.length)
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
    filteredTuristi() {
      return this.turisti.filter((turisti) => {
        if (this.filter == "") {
          return true;
        } else {
          return (
            turisti.id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            turisti.ime.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 ||
            turisti.prezime.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            turisti.datum_rodjenja
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            turisti.email.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            turisti.lozinka.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            turisti.maticni_broj
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            turisti.obrisan
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0
          );
        }
      });
    },
    sortedTuristi() {
      return this.filteredTuristi
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

<table class="table table-success table-striped table-info table-bordered border-primary">
<thead>
    <tr>
        <th @click="sort('id')">ID</th>
        <th @click="sort('ime')">Ime</th>
        <th @click="sort('prezime')">Prezime</th>
        <th @click="sort('email')">Email</th>
        <th @click="sort('lozinka')">Lozinka</th>
        <th @click="sort('datum_rodjenja')">Datum rođenja</th>
        <th @click="sort('maticni_broj')">Matični broj</th>
        <th @click="sort('obrisan')">Obrisan</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="turista in sortedTuristi">
        <td>{{turista.id}}</td>
        <td>{{turista.ime}}</td>
        <td>{{turista.prezime}}</td>
        <td>{{turista.email}}</td>
        <td>{{turista.lozinka}}</td>
        <td>{{turista.datum_rodjenja}}</td>
        <td>{{turista.maticni_broj}}</td>
        <td>{{turista.obrisan}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', turista.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...turista})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `,
};
