import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { string, func, number, object, oneOfType, bool } from 'prop-types'
import { Redirect } from 'react-router-dom'
import PrimeInput from '../PrimeInput'
import PrimeBtn from '../PrimeBtn'
import PrimeText from '../PrimeText'
import Logo from '../Logo'
import { changeField, clearFields, createEvent } from '../../store/actions'
import LoadSpinner from '../LoadSpinner'
import styles from './event.module.scss'

function EventForm({ eventname, place, date, time, desc, err, changeValue, creEvent,
  user, success, loading,
}) {
  const [formErr, setFormErr] = React.useState('')
  const handleClick = () => {
    if (!user) setFormErr('Для создания события необходимо авторизироваться')
    else {
      setFormErr('')
      const author = `${user.firstname} ${user.lastname}`
      creEvent({ eventname, place, date, time, desc, author })
    }
  }

  return (
    <form className={styles.eventForm}>
      <Logo />
      <Row>
        <Col xs={12} md={6} className="d-flex flex-column align-items-center">
          <PrimeInput
            id="eventname"
            type="text"
            placeholder="Название события"
            name="eventForm"
            value={eventname}
            onChange={(value) => changeValue('eventname', value)}
          />
          <PrimeInput
            id="place"
            type="text"
            placeholder="Место проведения"
            name="eventForm"
            value={place}
            onChange={(value) => changeValue('place', value)}
          />
          <PrimeInput
            id="date"
            type="date"
            name="eventForm"
            value={date}
            onChange={(value) => changeValue('date', value)}
          />
          <PrimeInput
            id="time"
            type="time"
            name="eventForm"
            value={time}
            onChange={(value) => changeValue('time', value)}
          />
        </Col>
        <Col>
          <PrimeText
            id="eventText"
            placeholder="Описание"
            name="eventForm"
            value={desc}
            onChange={(value) => changeValue('desc', value)}
          />
        </Col>
      </Row>
      <div className={styles.formErr}>
        {(err && user) ? err : formErr}
      </div>
      {loading && <LoadSpinner />}
      {success && <Redirect to="/event" />}
      <PrimeBtn text="Создать" onClick={handleClick} className={styles.btn} />
    </form>
  )
}

EventForm.propTypes = {
  eventname: oneOfType([string.isRequired, number.isRequired]),
  place: oneOfType([string.isRequired, number.isRequired]),
  date: oneOfType([string.isRequired, number.isRequired]),
  time: oneOfType([string.isRequired, number.isRequired]),
  desc: oneOfType([string.isRequired, number.isRequired]),
  err: string,
  clear: func,
  creEvent: func,
  changeValue: func,
  user: object,
  success: bool,
  loading: bool,
}

const mapStateToProps = (state) => ({
  eventname: state.fields.event.eventname,
  place: state.fields.event.place,
  date: state.fields.event.date,
  time: state.fields.event.time,
  desc: state.fields.event.desc,
  err: state.event.create.error,
  success: state.event.create.success,
  loading: state.event.create.loading,
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
  changeValue: (formField, value) => dispatch(changeField('event', formField, value)),
  creEvent: (body) => dispatch(createEvent(body)),
  clear: () => dispatch(clearFields()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)