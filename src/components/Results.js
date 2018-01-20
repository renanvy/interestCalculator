import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import numeral from 'numeral'

// Helpers
import {
  calculateTotalToPay,
} from '../helpers/calculations'

numeral.register('locale', 'pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'mil',
    million: 'milhões',
    billion: 'b',
    trillion: 't',
  },
  ordinal: () => 'º',
  currency: {
    symbol: 'R$ ',
  },
})

numeral.locale('pt-br')

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})

const Results = (props) => {
  const totalToPay = () => calculateTotalToPay(props.amount, props.totalFine, props.totalInterest)

  return (
    <View style={styles.container}>
      <Text>Multa: {props.totalFine ? numeral(props.totalFine).format('$0,0.00') : '--'}</Text>
      <Text>Dias em Atraso: {props.delayedDays ? props.delayedDays : '--'}</Text>
      <Text>
        Juros: {props.totalInterest ? numeral(props.totalInterest).format('$0,0.00') : '--'}
      </Text>
      <Text>Total a Pagar: {totalToPay() ? numeral(totalToPay()).format('$0,0.00') : '--'}</Text>
    </View>
  )
}

Results.propTypes = {
  amount: PropTypes.number,
  totalFine: PropTypes.number,
  totalInterest: PropTypes.number,
  delayedDays: PropTypes.number,
}

Results.defaultProps = {
  amount: null,
  totalFine: null,
  totalInterest: null,
  delayedDays: null,
}

export default Results
