// Constants
import { PER_MONTH } from '../constants'

export function calculateDelayedDays(payday, dueDate) {
  if (!payday || !dueDate) { return null }
  if (payday.isBefore(dueDate)) { return null }

  return parseInt(payday.diff(dueDate, 'days'), 10)
}

export function calculateTotalFine(amount, finePercent) {
  if (!amount || !finePercent) { return null }

  return (amount * finePercent) / 100
}

export function calculateTotalInterest(amount, delayedDays, interestPercentage, dueDate, interestType) {
  if (!amount || !delayedDays || !interestPercentage || !dueDate) { return null }

  const daysInMonth = dueDate.daysInMonth()
  let interestPerDayPercentage

  if (interestType === PER_MONTH) {
    interestPerDayPercentage = (interestPercentage / daysInMonth) * delayedDays
  } else {
    interestPerDayPercentage = interestPercentage * delayedDays
  }

  return (amount * interestPerDayPercentage) / 100
}

export function calculateTotalToPay(amount, totalFine, totalInterest) {
  if (!amount) { return null }

  let total = amount

  if (totalFine) total += totalFine

  if (totalInterest) total += totalInterest

  return total
}
