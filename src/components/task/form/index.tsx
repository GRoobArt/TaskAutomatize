'use client'

import { use } from 'react'
import { ProjectContext } from '@/providers/projects'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TypeData } from '@/actions/database/types/types'

import { FormCustomTask } from './custom'
import { FormSocialTask } from './redes'
import { FormMailingTask } from './mailing'
import { FormCommentTask } from './comment'
import { FormWebTask } from './web'

export const FormTask = () => {
  const { types, type, setType } = use(ProjectContext)
  if (!types) return
  return (
    types && (
      <Tabs
        className='mt-4 px-4'
        value={type}
        defaultValue='custom'
        onValueChange={setType}>
        {types && (
          <TabsList className='w-full'>
            {types?.map((t: TypeData) => (
              <TabsTrigger
                key={t.id}
                value={t.name.toLowerCase()}
                className='capitalize w-full'>
                {t.name.toLowerCase()}
              </TabsTrigger>
            ))}
            <TabsTrigger value='comment' className='hidden'>
              Comments
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent value='custom'>
          <FormCustomTask />
        </TabsContent>
        <TabsContent value='redes'>
          <FormSocialTask />
        </TabsContent>
        <TabsContent value='web'>
          <FormWebTask />
        </TabsContent>
        <TabsContent value='mailing'>
          <FormMailingTask />
        </TabsContent>
        <TabsContent value='comment' id='comment'>
          <FormCommentTask />
        </TabsContent>
      </Tabs>
    )
  )
}
