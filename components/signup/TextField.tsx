import { Dispatch, SetStateAction } from 'react'
import LabelledRow from './LabelledRow'
import { Field, NameValue } from '../../hooks/useForm'

interface OptionsProps {
  groupName: string
  options: NameValue[]
  choice: string
  setChoice: Dispatch<SetStateAction<string>>
}

const RadioOptions = ({
  groupName,
  options,
  choice,
  setChoice,
}: OptionsProps) => (
  <div>
    {options.map(({ name, value }) => (
      <label key={value} onClick={() => setChoice(value)} className="text-xs">
        <input
          type="radio"
          name={groupName}
          value={value}
          defaultChecked={value === choice}
        />
        <span className="mx-1">{name}</span>
      </label>
    ))}
  </div>
)

export const TextField = ({
  id,
  label,
  placeholder,
  errorText,
  defaultValue,
  valid,
  onChange,
  onBlur,
  options = [],
  choice,
  setChoice,
  isRadioed,
}: Field) => (
  <LabelledRow
    key={id}
    id={id}
    label={label}
    valid={valid}
    errorText={errorText}
  >
    {isRadioed && options.length > 0 && (
      <RadioOptions
        groupName={`${id}-group`}
        options={options}
        choice={choice}
        setChoice={setChoice}
      />
    )}
    <input
      defaultValue={defaultValue}
      onBlur={onBlur}
      onChange={onChange}
      id={id}
      type="text"
      placeholder={placeholder}
    />
  </LabelledRow>
)
export default TextField
