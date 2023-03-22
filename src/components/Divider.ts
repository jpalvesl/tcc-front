import { Divider as Div } from 'antd';
import styled from 'styled-components';

import { themes } from '../styles/themes';

export const Divider = styled(Div)`
  background-color: ${themes.default.gray['600']};
`;