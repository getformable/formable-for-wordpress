import Connect from './Connect';
import Unlink from './Unlink';
import Shortcodes from './Shortcodes';

function bootstrap() {
  // prepare connect button
  Connect();

  // bind clicks on shortcodes
  Shortcodes();

  // bind confirm on unlink button
  Unlink();
}

bootstrap();
