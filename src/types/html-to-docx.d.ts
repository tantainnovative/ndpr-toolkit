declare module 'html-to-docx' {
  export default function htmlToDocx(
    htmlString: string,
    options?: {
      title?: string;
      margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };
      header?: {
        default?: string;
        first?: string;
        even?: string;
      };
      footer?: {
        default?: string;
        first?: string;
        even?: string;
      };
      pageNumber?: boolean;
      orientation?: 'portrait' | 'landscape';
      font?: {
        family?: string;
        size?: number;
      };
    }
  ): Promise<Buffer>;
}
