import moment from 'moment';
import {format} from 'd3-format';

export function applyMetricFormat(func, metric) {
  if (_.isFunction(this[`${func}`])) {
    return this[`${func}`](metric);
  }
  else {
    return metric;
  }
}
export const upperFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
export const toID = (value) => value.toLowerCase().replace(/ /g, '_');
export const toDollars = (amount) => format('$,.2f')(amount);
export const toCommaAndPrecision = (amount) => format(`,.2f`)(amount);
export const calculateCostPerMetric = (cost, metric) => cost / metric;
export const compareBudget = (budget, revenue) => Number.parseFloat(budget) > Number.parseFloat(revenue);

export const divisionToCombo = (value) => {
  let selection = convertSelectionToComboPrefix(value);
  let comboStringArray = [];
  if (selection === "0-DSAGoogleDSADesktop" || selection === "9-OfficialSiteBingAdsDesktop") {
    comboStringArray = [selection];
  }
  else if (selection === ""){
    comboStringArray = selection;
  }
  else {
    comboStringArray = [
      selection + 'BingAdsBasketDesktop',
      selection + 'BingAdsBasketMobile',
      selection + 'BingAdsBasketTablet',
      selection + 'GoogleBasketDesktop',
      selection + 'GoogleBasketMobile',
      selection + 'GoogleBasketTablet'
    ]
  }
  return comboStringArray;
};

const convertSelectionToComboPrefix = (value) => {
  switch (value) {
    case "DSA":
      return "0-DSAGoogleDSADesktop";
      break;
    case "Womens Specialty":
      return "1-WomensSpecialty";
      break;
    case "Mens":
      return "2-MensDivision";
      break;
    case "Childrens":
      return "3-ChildrensDivision";
      break;
    case "Home":
      return "4-Home";
      break;
    case "Fine Jewelry":
      return "5-FineJewelryDivision";
      break;
    case "Shoes":
      return "7-Shoes";
      break;
    case "Womens Apparel":
      return "8-WomensApparel";
      break;
    case "Official Site":
      return "9-OfficialSiteBingAdsDesktop"
      break;
    default:
      return "";
      break;
  }
}

export function flattenArray(input) {
	const sections = input.slice();
	let section;
	let flattenedArray = [];

	if (!input.length || !input.isArray) {
		return flattenedArray;
	}

	section = sections.pop();

	do {
		if (Object.prototype.toString.call(section) === '[object Array]') {
			sections.push.apply(sections, section);
		} else {
			flattenedArray.push(section);
		}
	} while (sections.length && (section = sections.pop()) !== undefined);

	flattenedArray.reverse();
	return flattenedArray;
}

export function convertToCSV(objArray) {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str;
  if (array[0].CB) {
    str = 'Date,Cost Brand,Revenue Brand,Cost Non-Brand,Revenue Non-Brand,Total Cost,Total Revenue,Total CPR,\r\n';
  }
  else {
    str = 'BBID,Cost Non-Brand,Division,Date,Device,Combo,Engine,Revenue Non-Brand,\r\n';
  }

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in array[i]) {
      if (line != '') {
        line += ',';
      }
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}

export function compareDates(targetDate = '', startDate = '', endDate = '') {
  const formatTargetDate = moment(targetDate);
  const validStartDate = moment.isDate(startDate);
  const validEndDate = moment.isDate(endDate);

  if (validStartDate && validEndDate) {
    return moment(formatTargetDate).isBetween(startDate, endDate);
  }
  else if (validStartDate) {
    return moment(formatTargetDate).isSameOrAfter(startDate);
  }
  else if (validEndDate) {
    return moment(formatTargetDate).isSameOrBefore(endDate);
  }
}

export function renderCostPerClick(metric) {
  const {cost, clicks} = metric;
  return toDollars(calculateCostPerMetric(cost, clicks));
}

export function renderCPR(metric) {
  const {cost, conversions} = metric;
  return toDollars(calculateCostPerMetric(cost, conversions));
}

export const validMetric = (metric) => metric !== '' && metric !== null && metric !== undefined;

export default {
  applyMetricFormat,
  calculateCostPerMetric,
  compareBudget,
  compareDates,
  divisionToCombo,
  flattenArray,
  convertToCSV,
  renderCostPerClick,
  renderCPR,
  toCommaAndPrecision,
  toDollars,
  toID,
  upperFirstLetter,
  validMetric,
};
