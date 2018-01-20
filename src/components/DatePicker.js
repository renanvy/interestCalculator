import React from 'react'
import PropTypes from 'prop-types'
import ReactNativeDatePicker from 'react-native-datepicker'
import { StyleSheet, View, Text } from 'react-native'
import moment from 'moment'

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  datepicker: {
    marginBottom: 20,
  },
})

const DatePicker = props => (
  <View>
    <Text style={styles.label}>{props.label}</Text>
    <ReactNativeDatePicker
      showIcon={false}
      placeholder="--"
      style={styles.datepicker}
      customStyles={{
        dateInput: {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#3C8CE2',
          alignItems: 'flex-start',
        },
      }}
      date={props.value}
      mode="date"
      format="DD/MM/YYYY"
      confirmBtnText="Confirmar"
      cancelBtnText="Cancelar"
      onDateChange={value => props.update({ [props.id]: moment(value, 'DD/MM/YYYY') })}
    />
  </View>
)

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(moment),
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
}

DatePicker.defaultProps = {
  value: null,
}

export default DatePicker
