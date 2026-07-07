'use client';

import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodeTabsProps {
  cppBlock: ReactNode;
  pythonBlock: ReactNode;
}

export function CodeTabs({ cppBlock, pythonBlock }: CodeTabsProps) {
  return (
    <Tabs defaultValue="cpp">
      <TabsList>
        <TabsTrigger value="cpp">C++</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="cpp">{cppBlock}</TabsContent>
      <TabsContent value="python">{pythonBlock}</TabsContent>
    </Tabs>
  );
}
