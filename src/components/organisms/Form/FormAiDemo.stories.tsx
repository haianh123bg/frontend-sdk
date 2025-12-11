import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { AiControlMessage } from '../../../core/ai-control/types'
import { AiControlProvider } from '../../../core/ai-control/AiControlProvider'
import { useAiControl } from '../../../core/ai-control/hooks'
import { SocketProvider } from '../../../core/socket/SocketProvider'
import type { GenericSocket, SocketMap } from '../../../core/socket/types'
import { Form } from './Form'
import { Input } from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button/Button'
import { useFormAiControl } from '../../../forms/hooks/useFormAiControl'
import { generateId } from '../../../utils/id'

interface DemoFormValues {
  name: string
  email: string
}

const createInMemorySocket = (onEmit: (event: string, payload: any) => void): GenericSocket => {
  const handlers = new Map<string, Set<(data: any) => void>>()

  const ensureSet = (event: string) => {
    let set = handlers.get(event)
    if (!set) {
      set = new Set()
      handlers.set(event, set)
    }
    return set
  }

  return {
    on(event, handler) {
      const set = ensureSet(event)
      set.add(handler)
    },
    off(event, handler) {
      const set = handlers.get(event)
      if (set) {
        set.delete(handler)
      }
    },
    emit(event, payload) {
      onEmit(event, payload)
      const set = handlers.get(event)
      if (set) {
        set.forEach((handler) => handler(payload))
      }
    },
  }
}

const DemoFormInner: React.FC = () => {
  const methods = useForm<DemoFormValues>({
    defaultValues: { name: '', email: '' },
  })
  const [submitted, setSubmitted] = React.useState<DemoFormValues | null>(null)
  const formRef = React.useRef<HTMLFormElement | null>(null)
  const instanceId = React.useMemo(() => generateId(), [])

  useFormAiControl({ instanceId, methods, formRef })

  const onSubmit: SubmitHandler<DemoFormValues> = (data) => {
    setSubmitted(data)
  }

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ minWidth: 320 }}>
        <Form methods={methods} onSubmit={onSubmit} formRef={formRef} formId="ai-demo-form" instanceId={instanceId}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span>Name</span>
              <Input name="name" placeholder="Your name" />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span>Email</span>
              <Input name="email" placeholder="you@example.com" />
            </label>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
        {submitted && (
          <pre style={{ marginTop: 16, fontSize: 12 }}>{JSON.stringify(submitted, null, 2)}</pre>
        )}
      </div>
      <AiPanel instanceId={instanceId} />
    </div>
  )
}

const AiPanel: React.FC<{ instanceId: string }> = ({ instanceId }) => {
  const { sendCommand } = useAiControl()

  const send = (type: string, payload: any = {}) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type,
      target: { component: 'Form', instanceId },
      payload,
      meta: {},
    }
    sendCommand(message)
  }

  const handleFill = () => {
    send('AI.FORM.FILL_FIELDS', {
      values: {
        name: 'Alice AI',
        email: 'alice.ai@example.com',
      },
    })
  }

  const handleFocusEmail = () => {
    send('AI.FORM.FOCUS_FIELD', { name: 'email' })
  }

  const handleSubmit = () => {
    send('AI.FORM.SUBMIT', {})
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 500 }}>AI Panel (mock)</div>
      <Button variant="secondary" onClick={handleFill}>
        AI: Fill name & email
      </Button>
      <Button variant="secondary" onClick={handleFocusEmail}>
        AI: Focus email field
      </Button>
      <Button variant="secondary" onClick={handleSubmit}>
        AI: Submit form
      </Button>
    </div>
  )
}

const AiFormDemoShell: React.FC = () => {
  const [uiEvents, setUiEvents] = React.useState<AiControlMessage[]>([])
  const [aiCommands, setAiCommands] = React.useState<AiControlMessage[]>([])

  const sockets: SocketMap = React.useMemo(() => {
    const uiSocket = createInMemorySocket((_event, payload) => {
      setUiEvents((prev) => [...prev, payload])
    })
    const aiSocket = createInMemorySocket((_event, payload) => {
      setAiCommands((prev) => [...prev, payload])
    })
    return {
      'ai-events': uiSocket,
      'ai-control': aiSocket,
    }
  }, [])

  return (
    <SocketProvider sockets={sockets}>
      <AiControlProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DemoFormInner />
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>UI → AI stream</div>
              <pre style={{ maxHeight: 200, overflow: 'auto', fontSize: 11 }}>
                {JSON.stringify(uiEvents, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>AI → UI commands</div>
              <pre style={{ maxHeight: 200, overflow: 'auto', fontSize: 11 }}>
                {JSON.stringify(aiCommands, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </AiControlProvider>
    </SocketProvider>
  )
}

const meta: Meta<typeof AiFormDemoShell> = {
  title: 'Forms/AiControl/FormAiDemo',
  component: AiFormDemoShell,
}

export default meta

type Story = StoryObj<typeof AiFormDemoShell>

export const Default: Story = {
  render: () => <AiFormDemoShell />,
}
