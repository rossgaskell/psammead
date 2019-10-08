import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape } from 'prop-types';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { grid } from '@bbc/psammead-styles/detection';

import Link from '../Link';

// Gets the number of grid rows, taking into account the
// first-child in the grid being separate, on its own row.
const getRowCount = (links, columns) => Math.ceil((links.length - 1) / columns);

const StyledList = styled.ul`
  border-bottom: 1px solid ${C_SHADOW};
  list-style-type: none;
  margin: 0;
  padding: 0 0 ${GEL_SPACING};

  @supports (${grid}) {
    display: grid;
    grid-auto-flow: column;
  }

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    grid-auto-flow: row;
  }
  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING};
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(${({ links }) => getRowCount(links, 2)}, auto);
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(${({ links }) => getRowCount(links, 3)}, auto);
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(${({ links }) => getRowCount(links, 4)}, auto);
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(${({ links }) => getRowCount(links, 5)}, auto);
  }
`;

const StyledListItem = styled.li`
  min-width: 50%;
  @supports not (${grid}) {
    display: inline-block;
  }
`;

const List = ({ links, trustProjectLink }) => (
  <StyledList role="list" trustProjectLink={trustProjectLink} links={links}>
    {trustProjectLink && (
      <StyledListItem key={trustProjectLink.text} role="listitem">
        <Link text={trustProjectLink.text} href={trustProjectLink.href} />
      </StyledListItem>
    )}
    {links.map(link => (
      <StyledListItem key={link.text} role="listitem">
        <Link text={link.text} href={link.href} />
      </StyledListItem>
    ))}
  </StyledList>
);

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

const trustProjectLinkPropTypes = shape({
  href: string,
  text: string,
});

List.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
  trustProjectLink: trustProjectLinkPropTypes,
};

List.defaultProps = { trustProjectLink: null };

export default List;
