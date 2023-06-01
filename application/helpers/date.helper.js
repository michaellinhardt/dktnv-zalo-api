const moment = require('moment')

export const

	dateNowToShortString = () => moment().format('MM.DD HH:mm:ss'),
	dateGivenToShortString = date => moment(date).format('MM.DD HH:mm:ss'),

	timestampSc = () => parseInt(moment().format('X'), 10),
	timestampMs = () => Date.now()
