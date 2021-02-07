const POSITION_NAME_PATTERN = /[A-z]{4,50}/
const POSITION_TARIFF_NAME = /[A-z]{4,50}/

export const validPositionName = name => POSITION_NAME_PATTERN.test(name.trim())
export const validPositionItemName = tariffName => POSITION_TARIFF_NAME.test(tariffName.trim())
export const validNumber = number => !isNaN(number)