export default {
  props: ["naslov", "sobe"],
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
      if (this.currentPage * this.pageSize < this.filteredSobe.length)
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
    filteredSobe() {
      return this.sobe.filter((sobe) => {
        if (this.filter == "") {
          return true;
        } else {
          return (
            sobe.id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            sobe.tip_sobe.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            sobe.broj_lezaja
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            sobe.broj_sobe
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            sobe.obrisan
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0
          );
        }
      });
    },
    sortedSobe() {
      return this.filteredSobe
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

<table class="table table-success table-striped table-dark">
<thead>
    <tr>
        <th @click="sort('id')">ID</th>
        <th @click="sort('tip_sobe')">Tip Sobe</th>
        <th @click="sort('broj_lezaja')">Broj Lezaja</th>
        <th @click="sort('broj_sobe')">Broj Sobe</th>
        <th @click="sort('obrisan')">Obrisan</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="soba in sortedSobe">
        <td>{{soba.id}}</td>
        <td>{{soba.tip_sobe}}</td>
        <td>{{soba.broj_lezaja}}</td>
        <td>{{soba.broj_sobe}}</td>
        <td>{{soba.obrisan}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', soba.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...soba})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `,
};
