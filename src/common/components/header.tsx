import {
  Menu,
  PlusIcon,
} from 'lucide-react';
import {
  Link,
} from 'react-router-dom';
import { Button } from '@/common/components/button';

export default function Header() {
  return (
    <header className="h-[80px] relative bg-[#2c2d31] text-white p-4 flex justify-between items-center">
      sadsa
      <div className="text-xl  font-bold flex gap-1 md:gap-4 items-center">
        <div className="w-[60px] h-[80px] bg-[#35383f] flex items-center justify-center text-9xl absolute top-0 left-0 bottom-0">
          <Link to="/" className="text-[#f2f3f7]">
            <Menu />
          </Link>
        </div>

      </div>
      <div className="space-x-4 flex">

        <Link to="/markdown/markdown-add">
          <Button
            className="flex
              bg-[#e16841]
                 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
          >
            <PlusIcon />
            <p className="hidden md:block"> Add File</p>
          </Button>
        </Link>

      </div>
    </header>
  );
}
