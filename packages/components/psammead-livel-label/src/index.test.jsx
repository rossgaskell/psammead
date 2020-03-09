import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { arabic } from '@bbc/gel-foundations/scripts';
import LiveLabel from './index';

describe('LiveLabel', () => {
  shouldMatchSnapshot(
    'should render correctly with english live text',
    <LiveLabel service="news" ariaHidden withOffScreenText />,
  );

  shouldMatchSnapshot(
    'should render correctly with localised live text',
    <LiveLabel service="news" liveText="AS E DE HAPPEN" />,
  );

  shouldMatchSnapshot(
    'should render correctly with custom offscreen text',
    <LiveLabel
      service="news"
      ariaHidden
      withOffScreenText
      offScreenText="Watch Live"
    />,
  );

  shouldMatchSnapshot(
    'should correctly render for RTL service',
    <LiveLabel service={arabic} ariaHidden withOffScreenText />,
  );
});
