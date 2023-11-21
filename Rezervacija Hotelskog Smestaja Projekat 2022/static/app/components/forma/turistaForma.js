export default {
  props: ["dugme", "naslov"],
  emits: ["sacuvaj"],
  data() {
    return {
      noviTurista: [],
    };
  },
  template: `

<form v-on:submit.prevent="$emit('sacuvaj', {...noviTurista})"  class="w-85 m-3 container fade-in bg-image"
style="
background-image: url('./pictures/turista.png');
height: auto;
">
<p id="naslov"><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control aler alert-primary" v-model="noviTurista.ime" required>
    <div class="form-text"><i>Uneti ime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control aler alert-primary" v-model="noviTurista.prezime" required>
    <div class="form-text"><i>Uneti prezime</i></div>
</div>

<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control aler alert-success" v-model="noviTurista.email" required>
    <div class="form-text"><i>Uneti e-mail adresu</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Lozinka: </label>
    <input type="password" class="form-control aler alert-success" minlenght="4" maxlength="10" v-model="noviTurista.lozinka" required>
    <div class="form-text"><i>Uneti lozinku</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum rođenja: </label>
    <input type="date" class="form-control aler alert-primary" v-model="noviTurista.datum_rodjenja" required>
    <div class="form-text"><i>Uneti datum rođenja</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Matični broj: </label>
    <input type="text" minlength="13" maxlenght="13" size="13" class="form-control aler alert-primary" v-model="noviTurista.maticni_broj" required>
    <div class="form-text"><i>Uneti maticni broj</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `,
};
