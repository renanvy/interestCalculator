import moment from 'moment'

import {
  calculateDelayedDays,
  calculateTotalFine,
  calculateTotalInterest,
  calculateTotalToPay,
} from '../../src/helpers/calculations'

import { PER_DAY, PER_MONTH } from '../../src/constants'

describe('calculateDelayedDays', () => {
  it('should returns two days', () => {
    const dueDate = moment('10/01/2018', 'DD/MM/YYYY')
    const payday = moment('12/01/2018', 'DD/MM/YYYY')

    expect(calculateDelayedDays(payday, dueDate)).toBe(2)
  })

  it('should return null if payday is before than duedate', () => {
    const dueDate = moment('12/01/2018', 'DD/MM/YYYY')
    const payday = moment('10/01/2018', 'DD/MM/YYYY')

    expect(calculateDelayedDays(payday, dueDate)).toBe(null)
  })
})

describe('calculateTotalFine', () => {
  it('should return fine for delay', () => {
    const amount = 500.0
    const finePercent = 2

    expect(calculateTotalFine(amount, finePercent)).toBe(10)
  })
})

describe('calculateTotalInterest', () => {
  it('should return interest per day', () => {
    const amount = 500.0
    const delayedDays = 2
    const interestPercentage = 0.33
    const dueDate = moment('10/01/2018', 'DD/MM/YYYY')
    const interestType = PER_DAY

    expect(calculateTotalInterest(amount, delayedDays, interestPercentage, dueDate, interestType)).toBe(3.3)
  })

  it('should return interest per month', () => {
    const amount = 500.0
    const delayedDays = 2
    const interestPercentage = 1
    const dueDate = moment('10/01/2018', 'DD/MM/YYYY')
    const interestType = PER_MONTH

    expect(calculateTotalInterest(amount, delayedDays, interestPercentage, dueDate, interestType)).toBe(0.3225806451612903)
  })
})

describe('calculateTotalToPay', () => {
  it('should sum amount + totalFine + totalInterest', () => {
    const amount = 500.0
    const totalFine = 5
    const totalInterest = 2

    expect(calculateTotalToPay(amount, totalInterest, totalFine)).toBe(507.0)
  })
})
