import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solidIcons, brandIcons } from './initIcons';
import { iconMap } from './iconMap';

library.add(...solidIcons, ...brandIcons);

export { FontAwesomeIcon, iconMap };
