declare module 'react-sparklines' {
  import * as React from 'react';
  
  export class Sparklines extends React.Component<{
    data: number[];
    limit?: number;
    width?: number;
    height?: number;
    margin?: number;
    min?: number;
    max?: number;
    children?: React.ReactNode;
  }> {}
  
  export class SparklinesLine extends React.Component<{
    color?: string;
    style?: React.CSSProperties;
  }> {}
} 