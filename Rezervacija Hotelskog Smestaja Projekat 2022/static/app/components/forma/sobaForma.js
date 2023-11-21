export default {
  props: ["dugme", "naslov"],
  emits: ["sacuvaj"],
  data() {
    return {
      nova_soba: [],
    };
  },
  template: `
<form v-on:submit.prevent="$emit('sacuvaj', {...nova_soba})" class="w-85 p-3 container fade-in bg-image"
style="
background-image: url('./pictures/soba.jpg');
height: auto;
">
<p id="naslov"><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Tip Sobe: </label>
    <input type="text" class="form-control aler alert-secondary" v-model="nova_soba.tip_sobe" required>
    <div class="form-text"><i>Uneti tip sobe</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Broj Lezaja: </label>
    <input type="number" min="1" max="5" class="form-control aler alert-secondary" v-model="nova_soba.broj_lezaja" required>
    <div class="form-text"><i>Uneti Broj Lezaja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Broj Sobe: </label>
    <input type="number" class="form-control aler alert-secondary" v-model="nova_soba.broj_sobe" required>
    <div class="form-text"><i>Uneti broj sobe</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `,
};
