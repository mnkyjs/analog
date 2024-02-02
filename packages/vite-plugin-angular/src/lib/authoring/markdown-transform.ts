import { MarkedSetupService } from './marked-setup.service';

export type MarkdownTemplateTransform = (
  content: string,
  fileName: string
) => string | Promise<string>;

export const defaultMarkdownTemplateTransform: MarkdownTemplateTransform =
  async (content: string, fileName: string) => {
    if (fileName.includes('virtual-analog:')) {
      // read template sections, parse markdown
      const markedSetupService = new MarkedSetupService();
      const mdContent = markedSetupService
        .getMarkedInstance()
        .parse(content) as unknown as Promise<string>;

      return mdContent;
    }

    return content;
  };

export const defaultMarkdownTemplateTransforms: MarkdownTemplateTransform[] = [
  defaultMarkdownTemplateTransform,
];
