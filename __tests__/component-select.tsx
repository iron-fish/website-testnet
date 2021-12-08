import Select from 'components/Form/Select'
import { makeRendererFor } from 'jest.utils'

const selectWithProps = makeRendererFor(Select)

it('renders a Select component', () => {
  const options = 'abcde'.split('').map(name => ({
    name,
    value: name,
  }))

  const { container } = selectWithProps({
    disabled: false,
    options,
    defaultValue: 'a',
    value: 'a',
    onChange: jest.fn(),
    setTouched: jest.fn(),
    className: 'test',
  })
  expect(container).toMatchSnapshot()
})
