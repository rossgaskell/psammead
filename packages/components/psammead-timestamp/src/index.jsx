import React from 'react';
import styled from 'styled-components';
import { node, string, func, shape, bool } from 'prop-types';
import {
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import { getBrevier } from '@bbc/gel-foundations/typography';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_LUNAR, C_METAL } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

const PADDING = `
  padding-bottom: ${GEL_SPACING_HLF};
  &:last-child {
    padding-bottom: ${GEL_SPACING_DBL};
  }
`;

const StyledTimestamp = styled.time`
  ${({ script, typographyFunc }) =>
    script && typographyFunc && typographyFunc(script)}
  color: ${({ darkMode }) => (darkMode ? C_LUNAR : C_METAL)};
  display: block;
  ${({ service }) => getSansRegular(service)}
  ${props => props.padding && PADDING}
`;

const Timestamp = ({
  children,
  datetime,
  typographyFunc,
  script,
  padding,
  service,
  darkMode,
}) => (
  <StyledTimestamp
    dateTime={datetime}
    typographyFunc={typographyFunc}
    script={script}
    padding={padding}
    service={service}
    darkMode={darkMode}
  >
    {children}
  </StyledTimestamp>
);

Timestamp.defaultProps = {
  typographyFunc: getBrevier,
  padding: true,
  darkMode: false,
};

Timestamp.propTypes = {
  children: node.isRequired,
  datetime: string.isRequired,
  typographyFunc: func,
  padding: bool,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool,
};

export default Timestamp;
