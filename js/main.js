import {offerContent} from './offer.js';
import {renderOffers} from './template.js';
import {switchOffForm, switchOnForm} from './form.js';

renderOffers(offerContent.slice(0,1));

switchOffForm();
switchOnForm();
