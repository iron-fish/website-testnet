// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Debug = (props: any) => (
  <pre>
    <code>{JSON.stringify(props, null, 2)}</code>
  </pre>
)

export default Debug
