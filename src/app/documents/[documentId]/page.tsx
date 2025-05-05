import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';

import { Document } from './Document';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<'documents'> }>;
}

export type SessionClaims = {
  azp: string;
  exp: number;
  fva: number[];
  iat: number;
  iss: string;
  nbf: number;
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
  sid: string;
  sub: string;
  v: number;
};

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: 'convex' })) ?? undefined;

  if (!token) {
    throw new Error('Unauthorized');
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  );

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;
