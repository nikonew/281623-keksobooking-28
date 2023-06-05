import { getData } from './api.js';
import { resetFilters } from './filter.js';
import { activateFiltres, activateForm } from './form.js';
import { getInitAds, getInitMap } from './map.js';
import { showAlert } from './util.js';

activateForm(false);
activateFiltres(false);
getInitMap();

getData()
  .then((ads) => {
    getInitAds(ads);
    activateFiltres(true);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
resetFilters();
