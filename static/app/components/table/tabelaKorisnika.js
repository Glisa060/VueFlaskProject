export default {
  props: ["naslov", "korisnici"],
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
      if (this.currentPage * this.pageSize < this.filteredKorisnici.length)
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
    filteredKorisnici() {
      return this.korisnici.filter((korisnici) => {
        if (this.filter == "") {
          return true;
        } else {
          return (
            korisnici.email.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            korisnici.lozinka
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0 ||
            korisnici.id
              .toString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0
          );
        }
      });
    },
    sortedKorisnici() {
      return this.filteredKorisnici
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
        <th @click="sort('email')">E-mail</th>
        <th @click="sort('lozinka')">Lozinka</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korisnik in sortedKorisnici">
        <td>{{korisnik.id}}</td>
        <td>{{korisnik.email}}</td>
        <td>{{korisnik.lozinka}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', korisnik.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...korisnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `,
};
