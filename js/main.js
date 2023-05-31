import { getData } from './api.js';
import { resetFilters } from './filter.js';
import { activateFiltres, activateForm } from './form.js';
import { initMap, renderAdsOfferPins } from './map.js';
import { showAlert } from './util.js';

activateForm(false);
activateFiltres(false);
initMap();

getData()
  .then((ads) => {
    renderAdsOfferPins(ads);
    activateFiltres(true);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
resetFilters();
