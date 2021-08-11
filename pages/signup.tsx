import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Country, countries } from '../data/countries'

type FormRowProps = {
  className?: string
  children?: React.ReactNode
}

const FormRow = ({ className = '', children }: FormRowProps) => (
  <div
    className={`flex flex-col p-2 w-11/12 sm:w-7/12 mb-4 border-2 rounded-md border-solid border-black ${className}`}
  >
    {children}
  </div>
)

const FIELDS = [
  { label: 'Email', placeholder: 'Your email' },
  { label: 'Graffiti', placeholder: 'Your tag' },
  { label: 'Discord or Telegram', placeholder: 'Your proof' },
]

type LabelledRowProps = {
  id: string
  label: string
  required?: boolean
  children?: React.ReactNode
}

const LabelledRow = ({
  id,
  label,
  children,
  required = true,
}: LabelledRowProps) => (
  <FormRow>
    <label htmlFor={id} className="text-sm font-favorit">
      {label}
      {required && <span className="text-md text-gray-500">*</span>}
    </label>
    {children}
  </FormRow>
)

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>SignUp</title>
        <meta name="description" content="SignUp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-ifpink text-black" />

      <main className="bg-ifpink flex-1 font-extended">
        <section className="w-4/5 flex flex-col m-auto py-8 px-2 md:px-4 h-auto mb-16 border-opacity-100 border-2 border-solid border-black bg-white items-center">
          <h1 className="text-2xl text-center mb-8">
            Sign up and get incentivized.
          </h1>
          {FIELDS.map(({ label, placeholder }) => {
            const id = label.toLowerCase().replace(/\s/g, '-')
            return (
              <LabelledRow key={id} id={id} label={label}>
                <input
                  className="font-favorit"
                  id={id}
                  type="text"
                  placeholder={placeholder}
                />
              </LabelledRow>
            )
          })}
          <LabelledRow key="country" id="country" label="Country">
            <select>
              {countries.map(({ code, name }: Country) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </LabelledRow>
        </section>
      </main>
      <Footer />
    </div>
  )
}
