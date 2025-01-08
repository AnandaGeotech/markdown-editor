/* eslint-disable no-unused-vars */
import { CopyCheck, CopyIcon } from 'lucide-react';
import { FC, useState } from 'react';
import MarkdownIt from 'markdown-it';
import { COPY_TYPE_HTML } from '../constant/markdown.contant';
import { ICopyOptionProps } from '../type/markdown.type';
import { toast } from '@/common/hooks/use-toast';
import { useMarkdownContext } from '@/common/contexts/markdown.context';

const md = new MarkdownIt();
const handleCopyFn = ({ textFile, name }:{ name: string, textFile: string }) => {
  if (name === COPY_TYPE_HTML) {
    const renderedHTML = md.render(textFile);
    return navigator.clipboard.writeText(renderedHTML);
  }

  return navigator.clipboard.writeText(textFile);
};
const CopyOption: FC<ICopyOptionProps> = ({ textFile, name }) => {
  const { fileName } = useMarkdownContext();
  const [isCopy, setisCopy] = useState(false);

  const handleCopy = () => {
    handleCopyFn({ textFile, name })
      .then(() => {
        toast({ title: `${fileName}.md file is copied successfully!` });
        setisCopy(true);

        setTimeout(() => {
          setisCopy(false);
        }, 3000);
      })
      .catch((err:any) => {
        toast({ title: `${fileName}.md Failed to copy!`, variant: 'destructive' });
      });
  };

  return (
    !isCopy ? (
      <CopyIcon onClick={handleCopy} className="cursor-pointer" />
    ) : (
      <CopyCheck />
    )
  );
};

export default CopyOption;
