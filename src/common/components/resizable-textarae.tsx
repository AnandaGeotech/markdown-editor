import React, { useRef, useState } from 'react';

const ResizableTextarea: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto to calculate new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
    setValue(event.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleInput}
      placeholder="Type something..."
      className="w-full p-4  focus:outline-none resize-none bg-transparent" // Tailwind CSS for styling
      style={{ overflow: 'hidden' }} // Prevent scrollbars
    />
  );
};

export default ResizableTextarea;
