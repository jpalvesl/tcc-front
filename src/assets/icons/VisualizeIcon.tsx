import { MagnifyingGlass } from '@phosphor-icons/react';
import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const VisualizeIcon = styled(MagnifyingGlass)`
  color: ${themes.default.gray['600']};
  cursor: pointer;
`;