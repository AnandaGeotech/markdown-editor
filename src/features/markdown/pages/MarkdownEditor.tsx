import { EyeIcon, EyeOff } from 'lucide-react';
import { FC } from 'react';

import { useItemContext } from '../../../common/contexts/markdown.context';
import useMarkdownUpsert from '../hooks/markdown.upsert';
import MarkdownPreview from '../components/markdown.preview';
import CopyOption from '../components/copy.option';
import { COPY_TYPE_HTML, COPY_TYPE_MARKDOWN } from '../constant/markdown.contant';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/common/components/resizable';

const MarkdownEditor: FC = () => {
  const { textFile, settextFile } = useItemContext();

  const {
    showMobileEditor, setshowMobileEditor, isFileNotFound,
  } = useMarkdownUpsert();

  const PreviewEyeIcon = !showMobileEditor ? EyeIcon : EyeOff;

  return (
    <div className="flex flex-grow bg-[#1e1f23] h-[calc(100vh-80px)]">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel className="hidden md:block">
          <div className="h-full flex flex-col overflow-hidden">
            <div className="p-4 flex justify-between">
              <h1 className="tracking-widest text-xl font-medium text-[#c8c9ce] ">
                MARKDOWN

              </h1>
              <div className="hidden md:block">

                <CopyOption textFile={textFile} name={COPY_TYPE_MARKDOWN} />
              </div>
              <div className="md:hidden block">

                <div className="flex gap-3">

                  <CopyOption textFile={textFile} name={COPY_TYPE_MARKDOWN} />
                  <PreviewEyeIcon
                    onClick={() => setshowMobileEditor((prev) => !prev)}
                    className="cursor-pointer text-[#c8c9ce]"
                  />
                </div>

              </div>
            </div>
            <div className="flex-grow overflow-auto">

              <textarea
                disabled={isFileNotFound}
                className="p-4 w-full h-[99%] bg-black text-[#c0c1c6] focus:outline-none resize-none overflow-auto scrollbar-none"
                value={textFile}
                onChange={(e) => settextFile(e.target.value)}
              />

            </div>
          </div>
        </ResizablePanel>

        {/* mobile view  */}
        <ResizablePanel className="md:hidden block">
          <div className="h-full flex flex-col overflow-hidden">
            <div className="p-4 flex justify-between">
              <h1 className="tracking-widest text-xl font-medium text-[#c8c9ce] ">
                {showMobileEditor ? 'MARKDOWN' : 'PREVIEW'}

              </h1>
              <div className="hidden md:block">

                <CopyOption textFile={textFile} name={COPY_TYPE_MARKDOWN} />
              </div>
              <div className="md:hidden block">
                {!showMobileEditor ? (
                  <div className="flex gap-3">
                    <CopyOption textFile={textFile} name={COPY_TYPE_HTML} />
                    <PreviewEyeIcon
                      onClick={() => setshowMobileEditor((prev) => !prev)}
                      className="cursor-pointer text-[#c8c9ce]"
                    />
                  </div>
                ) : (
                  <div className="flex gap-3">

                    <CopyOption textFile={textFile} name={COPY_TYPE_MARKDOWN} />
                    <PreviewEyeIcon
                      onClick={() => setshowMobileEditor((prev) => !prev)}
                      className="cursor-pointer text-[#c8c9ce]"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-grow overflow-auto">
              {!showMobileEditor ? (
                <MarkdownPreview content={textFile} />

              ) : (
                <textarea
                  disabled={isFileNotFound}
                  className="p-4 w-full h-[99%] bg-black text-[#c0c1c6] focus:outline-none resize-none overflow-auto scrollbar-none"
                  value={textFile}
                  onChange={(e) => settextFile(e.target.value)}
                />
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel className="hidden md:block">
          <div className="h-full">
            <div className="flex items-center justify-between pr-4">
              <h1 className="p-4 text-xl tracking-widest font-medium text-[#c8c9ce]">
                PREVIEW
              </h1>
              <CopyOption textFile={textFile} name={COPY_TYPE_HTML} />
            </div>
            <div className="p-4 h-full bg-black overflow-auto ">
              <MarkdownPreview content={textFile} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MarkdownEditor;
