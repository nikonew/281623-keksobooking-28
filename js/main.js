import { getData } from './api.js';
import { resetFilters } from './filter.js';
import { activateFiltres, activateForm } from './form.js';
import { initAds, initMap } from './map.js';
import { showAlert } from './util.js';

activateForm(false);
activateFiltres(false);
initMap();

getData()
  .then((ads) => {
    initAds(ads);
    activateFiltres(true);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
resetFilters();
