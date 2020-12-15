import 'styled-components';
import { AppThemeColor } from '../theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: AppThemeColor;
  }
}