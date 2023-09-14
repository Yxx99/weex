
/**
 * 求小数点后的数据长度
 */
const deal = (arg) => {
	let t = 0;
	try {
		t = arg.toString().split(".")[1].length
	} catch (e) { }
	return t;
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
export const calcMul = (arg1, arg2) => {
	let m = 0;
	m += deal(arg1);
	m += deal(arg2);
	const r1 = Number(arg1.toString().replace(".", ""));
	const r2 = Number(arg2.toString().replace(".", ""));
	return (r1 * r2) / Math.pow(10, m)
}

/**
 * 除法函数，用来得到精确的除法结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
export const calcDiv = (arg1, arg2) => {
	const t1 = deal(arg1);
	const t2 = deal(arg2);
	const r1 = Number(arg1.toString().replace(".", ""))
	const r2 = Number(arg2.toString().replace(".", ""))
	return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * 加法函数，用来得到精确的加法结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
export const calcAdd = (arg1, arg2) => {
	const r1 = deal(arg1);
	const r2 = deal(arg2);
	const m = Math.pow(10, Math.max(r1, r2))
	return (calcMul(arg1, m) + calcMul(arg2, m)) / m
}

/**
 * 减法函数，用来得到精确的除法结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
export const calcSub = (arg1, arg2) => {
	const r1 = deal(arg1);
	const r2 = deal(arg2);
	const m = Math.pow(10, Math.max(r1, r2))
	const n = (r1 >= r2) ? r1 : r2;
	return ((calcMul(arg1, m) - calcMul(arg2, m)) / m).toFixed(n)
}

/**
 * 时间戳
 */
export const formatDate =(value) => {
	const
		date = new Date(value),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();
	return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`

}
