import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Iframe } from './Iframe'

const meta = {
  title: 'Atoms/Iframe',
  component: Iframe,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    aspectRatio: '16/9',
    showLoading: true,
  },
} satisfies Meta<typeof Iframe>

export default meta

type Story = StoryObj<typeof meta>

export const WithSrcDoc: Story = {
  render: (args) => {
    const srcDoc = React.useMemo(
      () => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; }
      .wrap { display:flex; align-items:center; justify-content:center; height:100vh; background:#0f172a; color:white; }
      .card { padding: 24px 28px; border-radius: 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); }
      .muted { opacity: 0.8; font-size: 13px; margin-top: 8px; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div style="font-size:18px; font-weight:700">Iframe Preview</div>
        <div class="muted">Rendered via <code>srcDoc</code> for stable Storybook demo</div>
      </div>
    </div>
  </body>
</html>` ,
      []
    )

    return (
      <div className="w-[min(900px,calc(100vw-24px))]">
        <Iframe
          {...args}
          title="Iframe Demo"
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    )
  },
  args: {
    aspectRatio: '16/9',
  },
}

export const WithUrl: Story = {
  args: {
    aspectRatio: '16/9',
    src: 'https://example.com',
    referrerPolicy: 'no-referrer',
    sandbox: 'allow-scripts allow-same-origin allow-popups',
  },
}
