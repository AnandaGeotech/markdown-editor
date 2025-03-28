/* eslint-disable no-unused-vars */
import { CopyCheck, CopyIcon } from 'lucide-react';
import { FC, useState } from 'react';
import { ICopyOptionProps } from '../type/markdown.type';
import { handleCopyFn } from '../utils/copy-file';
import { toast } from '@/common/hooks/use-toast';
import { useMarkdownContext } from '@/common/contexts/markdown.context';

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
