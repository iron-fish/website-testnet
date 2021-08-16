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
  <div className="flex radio-group text-xs">
    {options.map(({ name, value }) => {
      const checked = value === choice
      const activeClass = checked ? 'active' : 'inactive'
      return (
        <label
          key={value}
          onClick={() => setChoice(value)}
          className={`radio-option ${activeClass} mr-2`}
        >
          <input
            className="radio-input"
            type="radio"
            name={groupName}
            value={value}
            defaultChecked={checked}
          />
          <span className={`radio-fake ${activeClass}`} />
          <span className={`radio-text`}>{name}</span>
        </label>
      )
    })}
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
