import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import RadioButton from 'radio-button-react-native'

// Components
import DatePicker from './DatePicker'
import Results from './Results'

// Helpers
import {
  calculateDelayedDays,
  calculateTotalFine,
  calculateTotalInterest,
} from '../helpers/calculations'

// Constants
import { PER_DAY, PER_MONTH } from '../constants'

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#3C8CE2',
    marginBottom: 20,
    padding: 5,
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 10,
    alignItems: 'center',
  },
})

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: null,
      dueDate: null,
      finePercentage: null,
      interestPercentage: null,
      payday: null,
      totalFine: null,
      totalInterest: null,
      delayedDays: null,
      interestType: PER_DAY,
    }
  }

  update = (data) => {
    if ('payday' in data && this.state.dueDate) {
      const { payday } = data

      if (payday.isBefore(this.state.dueDate) || payday.isSame(this.state.dueDate)) {
        return null
      }
    }

    if ('dueDate' in data && this.state.payday) {
      const { dueDate } = data

      if (dueDate.isAfter(this.state.payday) || dueDate.isSame(this.state.payday)) {
        return null
      }
    }

    return this.setState(data, () => this.calculate())
  }

  calculate() {
    this.setState({
      delayedDays: calculateDelayedDays(this.state.payday, this.state.dueDate),
      totalFine: calculateTotalFine(this.state.amount, this.state.finePercentage),
      totalInterest: calculateTotalInterest(this.state.amount, this.state.delayedDays, this.state.interestPercentage, this.state.dueDate, this.state.interestType),
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            Calculadora de Juros
          </Text>

          <Text style={styles.label}>Valor</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            keyboardType="numeric"
            placeholder="R$"
            onChangeText={value => this.update({ amount: parseFloat(value) })}
          />

          <DatePicker
            label="Data de Vencimento"
            update={this.update}
            id="dueDate"
            value={this.state.dueDate}
          />

          <DatePicker
            label="Data de Pagamento"
            update={this.update}
            id="payday"
            value={this.state.payday}
          />

          <Text style={styles.label}>% Multa</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={value => this.update({ finePercentage: parseFloat(value) })}
            keyboardType="numeric"
          />

          <View style={styles.radioButtonsContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                currentValue={this.state.interestType}
                value={PER_DAY}
                onPress={value => this.update({ interestType: value })}
              />
              <Text style={styles.label}> Juros ao dia</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton
                currentValue={this.state.interestType}
                value={PER_MONTH}
                onPress={value => this.update({ interestType: value })}
              />
              <Text style={styles.label}> Juros ao mês</Text>
            </View>
          </View>

          <Text style={styles.label}>% Juros</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={value => this.update({ interestPercentage: parseFloat(value) })}
            keyboardType="numeric"
          />

          <Results
            totalFine={this.state.totalFine}
            delayedDays={this.state.delayedDays}
            totalInterest={this.state.totalInterest}
            amount={this.state.amount}
          />
        </View>
      </ScrollView>
    )
  }
}
