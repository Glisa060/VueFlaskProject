export default {
  template: `
<legend>
<form v-on:submit.prevent="login()" class="w-85 m-3 container fade-in bg-image" id="boja2"  style="
background-image: url('./pictures/login.jpg');
height: auto;
width: auto;
">
<h1 style="text-align:center" class="alert alert-danger" role="alert"><em>Login </em></h1>
<div class="form-group">
    <label for="form-label">E-mail address</label>
    <input type="email" class="form-control aler alert-danger" v-model="korisnik.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-warning"><i>Unique e-mail address!</i></small>
</div>

<div class="form-group">
    <label for="form-label">Password</label>
    <input type="password" class="form-control aler alert-danger" v-model="korisnik.lozinka" placeholder="Password">
</div>

<div>
    <button type="submit" class="btn btn-outline-success">Sign in</button>
</div>

<div class="alert alert-danger" role="alert" v-if="neuspesanLogin">Neuspešna prijava na sistem!</div>

<div class="dropdown-divider"></div>
<router-link id="boja" class="nav-link active light" to="/korisnici"><em>Registruj se kao novi korisnik</em></router-link>

</form>
</legend>
    `,
  data: function () {
    return {
      korisnik: {
        email: "",
        lozinka: "",
      },
      neuspesanLogin: false,
    };
  },
  methods: {
    login: function () {
      axios.post(`api/login`, this.korisnik).then(
        (response) => {
          this.$router.push("/rezervacije");
        },
        (_) => {
          this.neuspesanLogin = true;
        }
      );
    },
  },
};
