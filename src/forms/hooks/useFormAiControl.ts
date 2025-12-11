import * as React from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useSubscribeAction } from '../../bus/hooks'
import type { ActionEvent } from '../../events/types'

export interface UseFormAiControlOptions<TFieldValues extends FieldValues> {
  instanceId: string
  methods: UseFormReturn<TFieldValues>
  formRef?: React.RefObject<HTMLFormElement>
}

const isTargetedToInstance = (event: ActionEvent, instanceId: string): boolean => {
  const target = (event.meta as any)?.target
  if (target?.instanceId && target.instanceId !== instanceId) {
    return false
  }
  const payloadInstanceId = (event.payload as any)?.instanceId
  if (payloadInstanceId && payloadInstanceId !== instanceId) {
    return false
  }
  return true
}

export function useFormAiControl<TFieldValues extends FieldValues>(
  options: UseFormAiControlOptions<TFieldValues>
) {
  const { instanceId, methods, formRef } = options

  useSubscribeAction(
    'AI.FORM.FILL_FIELDS',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const values = (event.payload as any)?.values as Partial<TFieldValues> | undefined
      if (!values) return

      ;(Object.entries(values) as [string, unknown][]).forEach(([name, value]) => {
        methods.setValue(name as Path<TFieldValues>, value as any, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        })
      })
    },
    [instanceId, methods]
  )

  useSubscribeAction(
    'AI.FORM.SET_FIELD',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const { name, value } = (event.payload as any) || {}
      if (!name) return

      methods.setValue(name as Path<TFieldValues>, value as any, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    },
    [instanceId, methods]
  )

  useSubscribeAction(
    'AI.FORM.RESET',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const values = (event.payload as any)?.values as TFieldValues | undefined
      if (values) {
        methods.reset(values)
      } else {
        methods.reset()
      }
    },
    [instanceId, methods]
  )

  useSubscribeAction(
    'AI.FORM.FOCUS_FIELD',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const { name } = (event.payload as any) || {}
      if (!name) return

      if (typeof (methods as any).setFocus === 'function') {
        ;(methods as any).setFocus(name as Path<TFieldValues>)
      }

      if (formRef?.current) {
        const element = formRef.current.querySelector<HTMLElement>(`[name="${name}"]`)
        if (element && typeof element.focus === 'function') {
          element.focus()
          if (typeof element.scrollIntoView === 'function') {
            element.scrollIntoView({ block: 'center', behavior: 'smooth' })
          }
        }
      }
    },
    [instanceId, methods, formRef]
  )

  useSubscribeAction(
    'AI.FORM.SUBMIT',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return

      if (formRef?.current && typeof formRef.current.requestSubmit === 'function') {
        formRef.current.requestSubmit()
      }
    },
    [instanceId, formRef]
  )
}
