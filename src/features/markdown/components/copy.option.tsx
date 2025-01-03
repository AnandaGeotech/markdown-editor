import { CopyCheck, CopyIcon } from 'lucide-react';
import { FC, useState } from 'react';
import MarkdownIt from 'markdown-it';
import { COPY_TYPE_HTML } from '../constant/markdown.contant';
import { toast } from '@/common/hooks/use-toast';
import { useItemContext } from '@/common/contexts/markdown.context';

const md = new MarkdownIt();
// Props interface for the component
interface CopyOptionProps {
    textFile: string;
    name:string
}

const CopyOption: FC<CopyOptionProps> = ({ textFile, name }) => {
  const { fileName } = useItemContext();
  const [isCopy, setisCopy] = useState(false);
  const handleCopyFn = () => {
    if (name === COPY_TYPE_HTML) {
      const renderedHTML = md.render(textFile);
      return navigator.clipboard.writeText(renderedHTML);
    }

    return navigator.clipboard.writeText(textFile);
  };

  const handleCopy = () => {
    handleCopyFn()
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
