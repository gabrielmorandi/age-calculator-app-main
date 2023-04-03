import { useState } from 'react'
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns'

import Submit from './assets/icon-arrow.svg'

function App() {
  // useStates
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [years, setYears] = useState(null)
  const [months, setMonths] = useState(null)
  const [days, setDays] = useState(null)
  // erros
  const [dayError, setDayError] = useState(null)
  const [monthError, setMonthError] = useState(null)
  const [yearError, setYearError] = useState(null)
  // day validation
  function handleDayChange(e) {
    const target = e.target
    const p = target.parentNode.childNodes[0]
    const value = e.target.value
    if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 31) {
      setDayError('Must be a valid day')
      target.classList.add('error')
      p.classList.add('error')
    } else {
      setDayError(null)
      setDay(value)
      target.classList.remove('error')
      p.classList.remove('error')
    }
  }
  // month validation
  function handleMonthChange(e) {
    const target = e.target
    const p = target.parentNode.childNodes[0]
    const value = e.target.value
    if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 12) {
      setMonthError('Must be a valid month')
      target.classList.add('error')
      p.classList.add('error')
    } else {
      setMonthError(null)
      setMonth(value)
      target.classList.remove('error')
      p.classList.remove('error')
    }
  }
  // year validation
  function handleYearChange(e) {
    const target = e.target
    const p = target.parentNode.childNodes[0]
    const value = e.target.value
    const currentYear = new Date().getFullYear()
    if ((!/^\d+$/.test(value) || Number(value) < 1900 || Number(value) > currentYear) && value.length === 4) {
      setYearError(`Must be a valid year between 1900 and ${currentYear}`)
      target.classList.add('error')
      p.classList.add('error')
    } else {
      setYearError(null)
      setYear(value)
      target.classList.remove('error')
      p.classList.remove('error')
    }
  }
  // calc
  function handleResult(event) {
    if (dayError || monthError || yearError) {
      // 
    } else {
      event.preventDefault()
      const now = new Date()
      const birthday = new Date(`${year}-${month}-${day}`)
      setYears(differenceInYears(now, birthday))
      setMonths(differenceInMonths(now, birthday) % 12)
      setDays(differenceInDays(now, birthday) % 30)
    }
  }
  // pageview
  return (
    <main>
      <div className="container">
        <form onSubmit={handleResult} id="form">
          <label>
            <p>DAY</p>
            <input
              type="text"
              maxLength={2}
              onKeyDown={(e) => (e.key === 'e' || e.key === '+' || e.key === '-') && e.preventDefault()}
              onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}
              onChange={handleDayChange}
              name="day"
              placeholder='DD'
              autoComplete='none'
              required
            />
            <span className='dayError'>{dayError ? dayError : ''}</span>
          </label>
          <label>
            <p>MONTH</p>
            <input
              type="text"
              maxLength={2}
              onKeyDown={(e) => (e.key === 'e' || e.key === '+' || e.key === '-') && e.preventDefault()}
              onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}
              onChange={handleMonthChange}
              name="month"
              autoComplete='none'
              placeholder='MM'
              required
            />
            <span className='monthError'>{monthError}</span>
          </label>
          <label>
            <p>YEAR</p>
            <input
              type="text"
              maxLength={4}
              onKeyDown={(e) => {
                (e.key === 'e' || e.key === '+' || e.key === '-') && e.preventDefault()
                if (e.key === 'Enter') {
                  handleResult(e)
                }
              }}
              onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}
              onChange={handleYearChange}
              name="year"
              placeholder='YYYY'
              autoComplete='none'
              required
            />
            <span className='yearError'>{yearError}</span>
          </label>
        </form>
        <div className="submit">
          <button type="submit" form="form">
            <img src={Submit} alt="Submit" />
          </button>
        </div>
        <div className='result'>
          <p><span>{years ? years : '--'}</span> years</p>
          <p><span>{months ? months : '--'}</span> months</p>
          <p><span>{days ? days : '--'}</span> days</p>
        </div>
      </div>
    </main>
  )
}

export default App
