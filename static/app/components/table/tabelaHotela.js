export default {
  props: ["naslov", "hoteli"],
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
      if (this.currentPage * this.pageSize < this.filteredHotels.length)
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
    filteredHotels() {
      return this.hoteli.filter((hoteli) => {
        if (this.filter == "") {
          return true;
        } else {
          return (
            hoteli.naziv.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            hoteli.broj_zvezdica
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            hoteli.id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            hoteli.obrisan
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0
          );
        }
      });
    },
    sortedHotels() {
      return this.filteredHotels
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

<table class="table table-success table-striped">
<thead>
    <tr>
        <th @click="sort('id')">ID</th>
        <th @click="sort('naziv')">Naziv</th>
        <th @click="sort('broj_zvezdica')">Broj Zvezdica</th>
        <th @click="sort('obrisan')">Obrisan</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="hotel in sortedHotels">
        <td>{{hotel.id}}</td>
        <td>{{hotel.naziv}}</td>
        <td>{{hotel.broj_zvezdica}}</td>
        <td>{{hotel.obrisan}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', hotel.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...hotel})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `,
};
