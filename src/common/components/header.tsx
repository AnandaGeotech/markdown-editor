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
    <header className="h-[80px] relative bg-custom-dark1 text-white p-4 flex justify-between items-center">

      <div className="text-xl  font-bold flex gap-1 md:gap-4 items-center">
        <div className="w-[60px] h-[80px] bg-custom-dark2 flex items-center justify-center text-9xl absolute top-0 left-0 bottom-0">
          <Link to="/" className="text-custom-light1">
            <Menu />
          </Link>
        </div>

      </div>
      <div className="space-x-4 flex">

        <Link to="/markdown/markdown-add">
          <Button
            className="flex
              bg-custom-primary
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
