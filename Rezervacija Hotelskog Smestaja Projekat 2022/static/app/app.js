import TabelaKorisnika from "./components/table/tabelaKorisnika.js";
import KorisnikForma from "./components/forma/korisnikForma.js";

import TabelaTurista from "./components/table/tabelaTurista.js";
import TuristaForma from "./components/forma/turistaForma.js";

import tabelaSobe from "./components/table/tabelaSobe.js";
import SobaForma from "./components/forma/sobaForma.js";

import TabelaRezervacije from "./components/table/tabelaRezervacije.js";
import RezervacijaForma from "./components/forma/rezervacijaForma.js";

import tabelaHotela from "./components/table/tabelaHotela.js";
import HotelForma from "./components/forma/hotelForma.js";

import Korisnici from "./components/main/korisnici.js";
import KorisnikId from "./components/main/korisnik_id.js";

import Turisti from "./components/main/turisti.js";
import TuristaId from "./components/main/turista_id.js";

import Sobe from "./components/main/sobe.js";
import SobaId from "./components/main/soba_id.js";

import Hoteli from "./components/main/hoteli.js";
import HotelId from "./components/main/hotel_id.js";

import Rezervacija from "./components/main/rezervacija.js";
import RezervacijaId from "./components/main/rezervacija_id.js";

import Login from "./components/login/login.js";
import Logout from "./components/login/logout.js";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/", component: Login },
    { path: "/logout", component: Logout },
    { path: "/korisnici", component: Korisnici },
    { path: "/korisnici/:id", component: KorisnikId },

    { path: "/turisti", component: Turisti },
    { path: "/turisti/:id", component: TuristaId },

    { path: "/sobe", component: Sobe },
    { path: "/sobe/:id", component: SobaId },

    { path: "/rezervacije", component: Rezervacija },
    { path: "/rezervacije/:id", component: RezervacijaId },

    { path: "/hoteli", component: Hoteli },
    { path: "/hoteli/:id", component: HotelId },
  ],
});

const app = Vue.createApp({});
app.component("tabela-korisnika", TabelaKorisnika);
app.component("korisnik-form", KorisnikForma);

app.component("tabela-turista", TabelaTurista);
app.component("turista-forma", TuristaForma);

app.component("tabela-soba", tabelaSobe);
app.component("soba-forma", SobaForma);

app.component("tabela-hotela", tabelaHotela);
app.component("hotel-forma", HotelForma);

app.component("tabela-rezervacije", TabelaRezervacije);
app.component("rezervacija-forma", RezervacijaForma);

app.use(router);
app.mount("#app");
