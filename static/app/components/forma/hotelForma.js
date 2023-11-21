export default {
  props: ["dugme", "naslov"],
  emits: ["sacuvaj"],
  data() {
    return {
      noviHotel: [],
    };
  },
  template: `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviHotel})" class="w-85 m-3 container fade-in bg-image"
style="
background-image: url('./pictures/hotel.png');
height: auto;
">
<p id="naslov"><b>-{{naslov}}</b></p>

<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control aler alert-warning" v-model="noviHotel.naziv" required>
    <div class="form-text"><i>Uneti naziv</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Broj Zvezdica: </label>
    <input type="number" min="1" max="5" class="form-control aler alert-warning" v-model="noviHotel.broj_zvezdica" required>
    <div class="form-text"><i>Uneti broj zvezdica (min: 1 max: 5)</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `,
};
