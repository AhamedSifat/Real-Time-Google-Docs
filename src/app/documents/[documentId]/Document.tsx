'use client';

import { Preloaded, usePreloadedQuery } from 'convex/react';
import Editor from './Editor';
import NavBar from './NavBar';
import { Room } from './room';
import Toolbar from './Toolbar';
import { api } from '../../../../convex/_generated/api';

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className='min-h-screen   bg-[#FAFBFD]'>
        <div className='flex flex-col px-4 pt-3 gap-y-3 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
          <NavBar data={document} />
          <Toolbar />
        </div>

        <div className='pt-[114px] print:pt-0'>
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};
